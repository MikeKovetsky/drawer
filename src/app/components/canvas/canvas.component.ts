import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {DrawerService} from '../../services/drawer.service';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {CANVAS_CONFIG} from '../../configs/canvas-config';

import {Point} from '../../models/point.model';
import {SelectionService} from '../../services/selection.service';
import {HelpersService} from '../../services/helpers.service';
import {ControlPointsService} from '../../services/control-points.service';
import {ToolsService} from '../../services/tools.service';
import {Line} from '../../models/line.model';
import {ShapesService} from '../../services/shapes.service';
import {ScaleService} from '../../services/scale.service';
import {CanvasService} from '../../services/canvas.service';
import {TransformationsService} from '../transformations/transformations.service';
import {distinct, filter} from 'rxjs/operators';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  controls: Point[] = [];
  selected: Point;
  activeControl: Point;

  constructor(private drawer: DrawerService,
              private history: HistoryService,
              private canvas: CanvasService,
              private selection: SelectionService,
              private controlPoints: ControlPointsService,
              private helpers: HelpersService,
              private shapes: ShapesService,
              private transformations: TransformationsService,
              private scale: ScaleService,
              private cursorPosition: CursorPositionService,
              public tools: ToolsService) {
  }

  ngOnInit() {
    this.drawer.render(this.domCanvas.nativeElement, CANVAS_CONFIG);

    this.history.needsRender$.subscribe(() => {
      this.drawer.render(this.domCanvas.nativeElement, CANVAS_CONFIG);
    });

    this.history.historyPoints$.pipe(
      filter(points => !!points.size),
      distinct((points) => points.size)
    ).subscribe(points => {
      const scaledPoints = this.scale.scalePoints(points);
      this.history.historyPoints$.next(scaledPoints);
      this.controls = Array.from(scaledPoints.values());
    });
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

  selectPoint() {
    const clicked = this.cursorPosition.coordinates$.value;
    const rx = new Point(1 / this.scale.zoom, 0);
    const ry = new Point(0, 1 / this.scale.zoom);
    const pos = this.transformations.pointToAffine(new Point(0, 0), rx, ry, clicked);
    this.history.addPoint(pos, pos);
  }

  updateCursorPosition(ev: MouseEvent) {
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos);
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
    this.drawer.drawLine(this.selected, target);
    const selected = this.tools.chainMode.get() === true ? target : void 0;
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
