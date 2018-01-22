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
    this.drawScrew();

    this.history.needsRendering$.asObservable().subscribe((bool: Boolean) => {
      if (bool) {
        this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
        this.canvas = this.drawer.render(this.canvas);
      }
    });
  }

  drawCube() {
    this.drawer3d.drawPoints(CUBE);
  }

  // drawScrew() {
  //   const nsegments = 26;
  //   const points = [];
  //   const height = 200;
  //   const radiusX = 110;
  //   const radiusZ = 110;
  //   for (let i = -nsegments; i < (nsegments - 1); i++) {
  //     const theta_i = i / nsegments;
  //     const theta_ii = (i + 1) / nsegments;
  //     const xi = radiusX * Math.cos(Math.PI * theta_i);
  //     const zi = radiusZ * Math.sin(Math.PI * theta_i);
  //
  //     const xii = radiusX * Math.cos(Math.PI * theta_ii);
  //     const zii = radiusZ * Math.sin(Math.PI * theta_ii);
  //     points.push(new Point3d(xi, height, zi));
  //     points.push(new Point3d(xi, -height, zi));
  //     points.push(new Point3d(xii, -height, zii));
  //     points.push(new Point3d(xii, height, zii));
  //   }
  //   this.drawer3d.drawPoints(points)
  // }

  drawScrew() {
    const points = [];
    const unitVectorSizeInSurface = .3;
    const [a, b, c, s, h] = [100, 100, 100, 100, 100];
    for (let u = -10; u <= 10; u += unitVectorSizeInSurface) {
      for (let v = -10; v <= 10; v += unitVectorSizeInSurface) {
        points.push(new Point3d(b * v * Math.sinh(u), a * v * Math.cosh(u), c * Math.pow(v, 2)));
      }
    }
    for (let u = -10; u <= 10; u += unitVectorSizeInSurface) {
      for (let v = -10; v <= 10; v += unitVectorSizeInSurface) {
        points.push(new Point3d(b * v * Math.sinh(u), a * v * Math.cosh(u), c * Math.pow(v, 2)));
      }
    }
    this.drawer3d.drawPoints(points);

    const sharkLines = [];
    SHARK.forEach((line) => {
      const scale = 3;
      const offset = 400;
      const p1 = new Point(offset + line[0].x * scale, offset + line[0].y * scale);
      const p2 = new Point(offset + line[3].x * scale, offset + line[3].y * scale);
      sharkLines.push(new Line3d(p1, p2));
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
