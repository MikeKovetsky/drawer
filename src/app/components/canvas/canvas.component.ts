import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DrawerService } from "../../services/drawer.service";
import { HistoryService } from "../../services/history.service";
import { CANVAS_CONFIG } from "../../configs/canvas-config";

import { DrawerCanvas } from "../../models/canvas.model";
import { HelpersService } from "../../services/helpers.service";
import { Point3d } from '../../models/point3d.model';
import { Point } from '../../models/point.model';
import { CUBE } from '../../configs/cube';

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
              private history: HistoryService,
              private helpers: HelpersService) {
  }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);
    this.drawDodeca();

    this.history.needsRendering$.asObservable().subscribe((bool: Boolean) => {
      if (bool) {
        this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
        this.canvas = this.drawer.render(this.canvas);
      }
    });
  }

  drawDodeca() {
    const projectedVertices: Point[] = CUBE.map(this.projectPointByCabinet);
    this.drawer.drawPoints(projectedVertices);
  }

  projectPointByCabinet(point: Point3d): Point {
    const x = point.x + point.z * 0.5 * Math.cos(Math.PI / 4);
    const y = point.y + point.z * 0.5 * Math.sin(Math.PI / 4);
    return new Point(x * 100, y * 100);
  }
}
