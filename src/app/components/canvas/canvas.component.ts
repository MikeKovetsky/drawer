import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {filter} from 'rxjs/operators';

import {DrawerService} from '../../services/drawer.service';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {CANVAS_CONFIG} from '../../configs/canvas-config';

import {DrawerCanvas} from '../../models/canvas.model';
import {Point} from '../../models/point.model';
import {SelectionService} from '../../services/selection.service';
import {HelpersService} from '../../services/helpers.service';
import {ControlPointsService} from '../../services/control-points.service';
import {TOOL_PANEL, ToolsService} from '../../services/tools.service';
import {Line} from '../../models/line.model';
import {ShapesService} from '../../services/shapes.service';
import {merge} from 'rxjs/observable/merge';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  controls: Point[] = [];
  canvas: DrawerCanvas;
  selected: Point;
  activeControl: Point;

  constructor(private drawer: DrawerService,
              private history: HistoryService,
              private selection: SelectionService,
              private controlPoints: ControlPointsService,
              private helpers: HelpersService,
              private shapes: ShapesService,
              private cursorPosition: CursorPositionService,
              public tools: ToolsService) {
  }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);

    merge(
      this.history.history$,
      this.tools.controlPointsShown.watch()
    ).subscribe(() => {
      this.controls = this.tools.controlPointsShown.get() ? this.history.getPoints() : [];
    });

    this.history.needsRender$.subscribe(() => {
      this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
      this.canvas = this.drawer.render(this.canvas);
      const history = this.history.history$.value;
      this.history.history$.next([]);
      const lines = history.map((event) => event.line);
      this.drawer.drawLines(lines);
      this.selectLastPoint(lines);
    });

    this.shapes.drawPegasus();

    this.selection.get().subscribe((pos) => {
      this.selected = pos;
    });

    this.tools.chainMode.watch().pipe(
      filter((chainModeEnabled) => !chainModeEnabled)
    ).subscribe(() =>
      this.selected = void 0
    );
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

  selectPoint() {
    const clicked: Point = this.cursorPosition.coordinates$.getValue();
    if (this.activeControl) {
      this.moveControlPoint(clicked);
      return;
    }
    if (this.selected) {
      this.finishLine(clicked);
      return;
    }
    const selection = this.cursorPosition.coordinates$.value;
    this.startLine(selection);
  }

  updateCursorPosition(ev: MouseEvent) {
    const rect = this.domCanvas.nativeElement.getBoundingClientRect();
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos, this.canvas, rect);
  }

  activateControl(p: Point) {
    this.activeControl = p;
  }

  moveControlPoint(target: Point) {
    this.history.replacePoint(this.activeControl, target);
    this.activeControl = void 0;
  }

  private startLine(selection: Point) {
    this.selection.set(selection);
  }

  private finishLine(target: Point) {
    const selected = this.tools.chainMode.get() === true ? target : void 0;
    this.drawer.drawLine(this.selected, target);
    this.selection.set(selected);
  }

  private selectLastPoint(lines: Line[]) {
    if (lines.length && this.tools.chainMode.get() === true) {
      const lastPoint = lines[lines.length - 1].end;
      if (lastPoint) {
        this.selection.set(lastPoint);
      }
    }
  }
}
