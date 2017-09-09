import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from "../services/drawer.service";
import {CursorPositionService} from "../services/cursor-position.service";
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
  context;

  private readonly CANVAS_CONFIG = {
    width: 1000,
    height: 600,
    vectorLength: 20
  };

  constructor(
    private drawer: DrawerService,
    private cursorPosition: CursorPositionService) { }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, this.CANVAS_CONFIG.width, this.CANVAS_CONFIG.height, this.CANVAS_CONFIG.vectorLength);
    this.context = this.canvas.getContext();
    this.drawer.initGrid(this.canvas, this.context);
    this.drawer.initAxis(this.canvas, this.context);
    this.drawer.invertYAxis(this.canvas, this.context);
    this.drawer.drawLine(this.context, new Point(0,0), new Point(200, 200));
  }

  updateCursorPosition(event) {
    const rect = this.domCanvas.nativeElement.getBoundingClientRect();
    this.cursorPosition.updatePosition(event, rect, this.canvas);
  }

}
