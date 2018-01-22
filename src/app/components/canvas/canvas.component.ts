import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DrawerService } from "../../services/drawer.service";
import { HistoryService } from "../../services/history.service";
import { CANVAS_CONFIG } from "../../configs/canvas-config";

import { DrawerCanvas } from "../../models/canvas.model";
import { HelpersService } from "../../services/helpers.service";
import { CUBE } from '../../configs/cube';
import { Drawer3dService } from '../../services/drawer3d.service';
import { Point } from '../../models/point.model';
import { Point3d } from '../../models/point3d.model';
import { Line } from '../../models/line.model';
import { Line3d } from '../../models/line3d.model';
import { SHARK } from './shark';
import { TransformationsService } from '../transformations/transformations.service';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  canvas: DrawerCanvas;
  transformationsShown = false;

  constructor(private drawer: DrawerService,
              private drawer3d: Drawer3dService,
              private history: HistoryService) {
  }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);
    this.drawShark();
    this.history.needsRendering$.asObservable().subscribe((bool: Boolean) => {
      if (bool) {
        this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
        this.canvas = this.drawer.render(this.canvas);
        this.drawPolyhedron();
      }
    });
    this.drawPolyhedron();
  }

  drawCube() {
    this.drawer3d.drawPoints(CUBE);
  }

  drawPolyhedron() {
    const points = [];
    const unitVectorSizeInSurface = .1;
    this.history.isRecording = false;
    const [a, b, c, s, h] = [100, 100, 100, 100, 100];
    for (let u = -10; u <= 5; u += unitVectorSizeInSurface) {
      for (let v = -10; v <= 5; v += unitVectorSizeInSurface) {
        points.push(new Point3d(b * v * Math.sinh(u), a * v * Math.cosh(u), c * Math.pow(v, 2)));
      }
    }
    for (let u = -10; u <= 5; u += unitVectorSizeInSurface) {
      for (let v = -10; v <= 5; v += unitVectorSizeInSurface) {
        points.push(new Point3d(b * v * Math.sinh(u), a * v * Math.cosh(u), c * Math.pow(v, 2)));
      }
    }
    this.drawer3d.drawPoints(points);
    this.history.isRecording = true;
  }

  drawShark() {
    const sharkLines: Line[] = SHARK.map((line) => {
      const scale = 3;
      const offset = 200;
      const p1 = new Point(offset + line[0].x * scale, offset + line[0].y * scale);
      const p2 = new Point(offset + line[3].x * scale, offset + line[3].y * scale);
      return new Line(p1, p2);
    });
    sharkLines.forEach((line) => this.drawCurve(line));
  }

  private calculatePointsOnTheCurve(line: Line): Point3d[] {
    const u = 0.1;
    const pointsOfTheCurve: Point[] = [];
    for (let t = 0; t < 1 + u; t += u) {
      const x = line.start.x * Math.pow(1 - t, 2) + line.end.x * Math.pow(t, 2);
      const y = line.start.y * Math.pow(1 - t, 2) + line.end.y * Math.pow(t, 2);
      pointsOfTheCurve.push(new Point(x, y));
    }
    return this.transformVertexesFromUVToXYZ(20, 15, 20, this.createVertexes(pointsOfTheCurve));
  }

  createVertexes(intermediatePoints: Point[]): Point[] {
    const points: Point[] = [];
    for (const point of intermediatePoints) {
      points.push(new Point((point.x / 20) * 0.08, (point.y / 20) * 0.08));
    }
    return points;
  }

  private drawCurve(curve: Line) {
    const lines: Line3d[] = this.calculateLinesOnTheCurve(curve);
    this.drawer3d.drawLines(lines)
  }

  calculateLinesOnTheCurve(line: Line): Line3d[] {
    const linesOfTheCurve: Line3d[] = [];
    const pointsOfTheCurve: Point3d[] = this.calculatePointsOnTheCurve(line);
    for (let i = 0; i < pointsOfTheCurve.length - 2; i++) {
      linesOfTheCurve.push(new Line3d(pointsOfTheCurve[i], pointsOfTheCurve[i + 1]));
    }
    return linesOfTheCurve;
  }

  transformVertexesFromUVToXYZ(a, b, c, intermediatePoints: Point[]): Point3d[] {
    const points: Point3d[] = [];
    for (const point of intermediatePoints) {
      points.push(new Point3d(b * point.y * Math.sinh(point.x), a * point.y * Math.cosh(point.x), c * Math.pow(point.y, 2)));
    }
    return points;
  }

}
