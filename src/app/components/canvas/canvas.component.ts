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
import {FormControl} from '@angular/forms';
import {MNK_Class} from '../../models/mnk';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  controls: Point[][] = [];
  activeControl: Point;
  drawNmkLine = new FormControl(true);
  drawNmkParabola = new FormControl(true);
  nmkX = new FormControl(0);
  nmk: MNK_Class;

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

    this.history.cleared$.subscribe(() => {
      this.controls = [];
      this.scale.zoom = 1;
      this.drawer.render(this.domCanvas.nativeElement, CANVAS_CONFIG);
    });

    this.history.historyPoints$.pipe(
      filter(points => !!points.size),
      distinctUntilChanged((a, b) => this.helpers.deepMapEqual(a, b)),
      map((points) =>  this.scale.scalePoints(points)),
    ).subscribe(scaledPoints => {
      this.history.historyPoints$.next(scaledPoints);
      this.controls = Array.from(scaledPoints.entries());
    });
  }

  drawNmk() {
    const viewPoints = this.controls.map(p => p[1]);
    if (viewPoints.length < 1) {
      alert('Введите хотя бы 1 точку');
      return;
    }
    this.nmk = new MNK_Class(viewPoints);
    if (this.drawNmkLine.value) {
      const points = this.nmk.calculatePointsUsingOrdinaryLeastSquaresByLine();
      for (let i = 0; i < points.length - 1; i++) {
        this.drawer.drawLine(points[i], points[i + 1]);
      }
    }
    if (this.drawNmkParabola.value) {
      const points = this.nmk.calculatePointsUsingOrdinaryLeastSquaresByParabola();
      for (let i = 0; i < points.length - 1; i++) {
        this.drawer.drawLine(points[i], points[i + 1]);
      }
    }
  }

  findY() {
    if (!this.controls.length) {
      alert('Введите хотя бы 1 точку');
    }
    if (!this.nmk) {
      alert('постройке МНК');
    }
    const x = +this.nmkX.value;
    const yByLine = this.nmk.calculateYUsingOrdinaryLeastSquaresByLine(x);
    const yByParabola = this.nmk.calculateYUsingOrdinaryLeastSquaresByParabola(x);
    alert('y by line:' + yByLine + ' y by parabola ' + yByParabola);
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

  removePoint(realPoint: Point) {
    this.history.removePoint(realPoint);
    this.activeControl = void 0;
  }

  clearHistory() {
    this.history.clear();
    this.activeControl = void 0;
  }

  moveControlPoint(realPoint: Point) {
    this.history.replacePoint(this.activeControl, realPoint);
    this.activeControl = void 0;
  }
}
