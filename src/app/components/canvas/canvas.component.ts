import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {DrawerService} from "../../services/drawer.service";
import {CursorPositionService} from "../../services/cursor-position.service";
import {HistoryService} from "../../services/history.service";
import {CANVAS_CONFIG} from "../../configs/canvas-config";

import {DrawerCanvas} from "../../models/canvas.model";
import {Point} from "../../models/point.model";
import {SelectionService} from "../../services/selection.service";
import {ShapesService} from "../../services/shapes.service";
import {HelpersService} from "../../services/helpers.service";

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  controlPoints: Point[] = [];
  canvas: DrawerCanvas;
  selected: Point;

  transformationsShown = false;
  specificShown = false;
  anchorShown = true;

  constructor(private drawer: DrawerService,
              private history: HistoryService,
              private selection: SelectionService,
              private shapes: ShapesService,
              private helpers: HelpersService,
              private cursorPosition: CursorPositionService) {
  }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);

    this.shapes.controlPoints.subscribe((points) => {
      this.controlPoints = points;
    });

    this.history.needsRendering$.asObservable().subscribe((bool: Boolean) => {
      if (bool) {
        this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
        this.canvas = this.drawer.render(this.canvas);
      }
    });

    this.selection.get().subscribe((pos) => {
      this.selected = pos;
    });
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

  selectPoint() {
    const clicked: Point = this.cursorPosition.coordinates$.getValue();
    if (this.selected) {
      this.drawer.drawLine(this.selected, clicked);
      this.selection.set(clicked);
    } else {
      this.selection.set(this.cursorPosition.coordinates$.getValue())
    }
  }

  showSpecific() {
    this.specificShown = !this.specificShown;
    this.transformationsShown = false;
    this.anchorShown = false;
  }

  showAnchor() {
    this.anchorShown = !this.anchorShown;
    this.transformationsShown = false;
    this.specificShown = false;
  }

  showTransformations() {
    this.transformationsShown = !this.transformationsShown;
    this.specificShown = false;
    this.anchorShown = false;
  }

  updateCursorPosition(ev: MouseEvent) {
    const rect = this.domCanvas.nativeElement.getBoundingClientRect();
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos, this.canvas, rect);
  }

}
