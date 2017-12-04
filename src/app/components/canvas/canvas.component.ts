import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {DrawerService} from "../../services/drawer.service";
import {CursorPositionService} from "../../services/cursor-position.service";
import {HistoryService} from "../../services/history.service";
import {CANVAS_CONFIG} from "../../configs/canvas-config";

import {DrawerCanvas} from "../../models/canvas.model";
import {Point} from "../../models/point.model";
import {SelectionService} from "../../services/selection.service";
import {ShapesService} from "../../services/shapes.service";

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  canvas: DrawerCanvas;
  selected: Point;

  transformationsShown = false;
  specificShown = false;

  constructor(
    private drawer: DrawerService,
    private history: HistoryService,
    private selection: SelectionService,
    private shapes: ShapesService,
    private cursorPosition: CursorPositionService) { }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);

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

  showTransformations() {
    this.transformationsShown = !this.transformationsShown;
    this.specificShown = false;
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
  }

  updateCursorPosition(ev: MouseEvent) {
    const rect = this.domCanvas.nativeElement.getBoundingClientRect();
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos, this.canvas, rect);
  }

}
