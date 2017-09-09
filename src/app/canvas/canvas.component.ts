import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from "../services/drawer.service";
import {CursorPositionService} from "../services/cursor-position.service";
import {HistoryService} from "../services/history.service";

import {DrawerCanvas} from "../models/canvas.model";
import {Point} from "../models/point.model";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  canvas: DrawerCanvas;

  private readonly CANVAS_CONFIG = {
    width: 1000,
    height: 600,
    vectorLength: 20
  };

  constructor(
    private drawer: DrawerService,
    private history: HistoryService,
    private cursorPosition: CursorPositionService) { }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, this.CANVAS_CONFIG.width, this.CANVAS_CONFIG.height, this.CANVAS_CONFIG.vectorLength);
    this.drawer.setContext(this.canvas);
    this.drawer.initGrid(this.canvas);
    this.drawer.initAxis(this.canvas);
    this.drawer.invertYAxis(this.canvas);
    this.history.isRecording = true;
    this.drawer.drawLine(new Point(0,0), new Point(200, 200));
  }

  updateCursorPosition(ev: MouseEvent) {
    const rect = this.domCanvas.nativeElement.getBoundingClientRect();
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos, this.canvas, rect);
  }

}
