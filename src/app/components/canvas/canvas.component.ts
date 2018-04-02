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
import {ShapesService} from '../../services/shapes.service';
import {ScaleService} from '../../services/scale.service';
import {CanvasService} from '../../services/canvas.service';
import {TransformationsService} from '../transformations/transformations.service';
import {distinct, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  controls: Point[][] = [];
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
      distinctUntilChanged((a, b) => this.helpers.deepMapEqual(a, b)),
      map((points) =>  this.scale.scalePoints(points))
    ).subscribe(scaledPoints => {
      this.history.historyPoints$.next(scaledPoints);
      this.controls = Array.from(scaledPoints.entries());
    });
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

  selectPoint() {
    const clicked = this.cursorPosition.coordinates$.value;
    const realPoint = this.revertPointZoom(clicked);
    if (this.activeControl) {
      this.moveControlPoint(realPoint);
      return;
    }
    this.history.addPoint(realPoint, realPoint);
  }

  revertPointZoom(p: Point): Point {
    const rx = new Point(1 / this.scale.zoom, 0);
    const ry = new Point(0, 1 / this.scale.zoom);
    return this.transformations.pointToAffine(new Point(0, 0), rx, ry, p);
  }

  updateCursorPosition(ev: MouseEvent) {
    const clientPos = new Point(ev.clientX, ev.clientY);
    this.cursorPosition.updatePosition(clientPos);
  }

  activateControl(realPoint: Point) {
    this.activeControl = realPoint;
  }

  moveControlPoint(realPoint: Point) {
    this.history.replacePoint(this.activeControl, realPoint);
    this.activeControl = void 0;
  }
}
