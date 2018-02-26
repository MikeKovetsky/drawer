import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
import {filter} from 'rxjs/operators';

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
              private cursorPosition: CursorPositionService,
              private tools: ToolsService) {
  }

  ngOnInit() {
    this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
    this.canvas = this.drawer.render(this.canvas);

    this.controlPoints.controls$.subscribe((points) => {
      setTimeout(() => this.controls = points);
    });

    this.history.needsRender$.subscribe(() => {
      this.canvas = new DrawerCanvas(this.domCanvas.nativeElement, CANVAS_CONFIG.width, CANVAS_CONFIG.height, CANVAS_CONFIG.vectorLength);
      this.canvas = this.drawer.render(this.canvas);
      const history = this.history.history$.value;
      this.history.history$.next([]);
      const lines = history.map((event) => event.line);
      this.drawer.drawLines(lines);
    });

    this.selection.get().subscribe((pos) => {
      this.selected = pos;
    });

    this.tools.chainMode.pipe(
      filter((modeEnabled) => !modeEnabled)
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
      const newVertexes = this.addSmooth(this.controlPoints.controls$.value, this.activeControl, clicked);
      const figure = this.helpers.nestArray(newVertexes, 4);
      this.history.clear();
      const controlPoints = this.drawer.drawFigure(figure);
      this.controlPoints.controls$.next(controlPoints);
      this.activeControl = void 0;
      return;
    }
    if (this.selected) {
      this.drawer.drawLine(this.selected, clicked);
      if (this.tools.chainMode.value === true) {
        this.selection.set(clicked);
      } else {
        this.selection.set(void 0);
      }
    } else {
      this.selection.set(this.cursorPosition.coordinates$.getValue());
    }
  }

  addSmooth(vertexes: Point[], currentPoint: Point, newPoint: Point): Point[] {
    for (let i = 0; i < vertexes.length; i++) {
      if (vertexes[i].equals(currentPoint)) {
        let prevIndex = 0;
        let prevPrevIndex = 0;
        if (i == 0) {
          prevIndex = vertexes.length - 2;
          prevPrevIndex = prevIndex - 1;
        } else if (i == 1) {
          prevIndex = 0;
          prevPrevIndex = vertexes.length - 2;
        } else {
          prevIndex = i - 1;
          prevPrevIndex = i - 2;
        }
        const prevVertex: Point = vertexes[prevIndex];
        const prevPrevVertex: Point = vertexes[prevPrevIndex];
        vertexes[i].x = newPoint.x;
        vertexes[i].y = newPoint.y;
        const firstAlpha: number = this.calculateVectorLength(prevPrevVertex, prevVertex);
        const secondAlpha: number = this.calculateVectorLength(prevVertex, vertexes[i]);
        const x: number = prevVertex.x - (firstAlpha * (vertexes[i].x - prevVertex.x) / secondAlpha);
        const y: number = prevVertex.y - (firstAlpha * (vertexes[i].y - prevVertex.y) / secondAlpha);
        prevPrevVertex.x = x;
        prevPrevVertex.y = y;
      }
    }
    return vertexes;
  }

  calculateVectorLength(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  startMovingControl(control: Point) {
    this.activeControl = control;
  }

  updateCursorPosition(ev: MouseEvent) {
    const rect = this.domCanvas.nativeElement.getBoundingClientRect();
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos, this.canvas, rect);
  }

  showPanel(panelName: TOOL_PANEL) {
    this.tools.openedPanel = panelName;
  }

  get openedPanel() {
    return this.tools.openedPanel;
  }
}
