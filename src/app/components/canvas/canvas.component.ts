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
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MNK_Class} from '../../models/mnk';
import {LagrangePolynomial} from '../../services/interpolation/lagrange-polynomial';
import {Interpolation} from '../../services/interpolation/interpolation';
import {PieceLinear} from '../../services/interpolation/piece-linear-interpolation';

@Component({
  selector: 'drawer-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') domCanvas: ElementRef;
  controls: Point[][] = [];
  activeControl: Point;
  lagrange = new FormControl(true);
  piece = new FormControl(true);
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
      map((points) => this.scale.scalePoints(points)),
    ).subscribe(scaledPoints => {
      this.history.historyPoints$.next(scaledPoints);
      this.controls = Array.from(scaledPoints.entries());
    });
    const points = [
      new Point(1.61, 0.8947),
      new Point(1.63, 0.8972),
      new Point(1.65, 0.9001),
      new Point(1.67, 0.9033),
      new Point(1.69, 0.9068)
    ];
    points.forEach(p => this.history.addPoint(p, p))
  }

  scalethis() {
    this.findY();
    const realPoints = this.controls.map(p => p[0]);
    this.drawer.enableSizeLines = false;
    let movedLines = this.transformations.move(-290, -160);
    this.drawer.drawLines(movedLines);
    movedLines = this.transformations.scale(30);
    this.drawer.drawLines(movedLines);
    // const points = this.scale.zoomPointsList(realPoints);
    // points.forEach(p => this.history.addPoint(p, p))
  }

  draw() {
    const realPoints = this.controls.map(p => p[0]);
    if (realPoints.length < 1) {
      alert('Введите хотя бы 1 точку');
      return;
    }
    if (this.lagrange.value) {
      const method = new LagrangePolynomial(realPoints);
      this.drawPlot(method, realPoints);
    }
    if (this.piece.value) {
      const method = new PieceLinear(realPoints);
      this.drawPlot(method, realPoints);
    }
  }

  findY() {
    const realPoints = this.controls.map(p => p[0]);
    if (!this.controls.length) {
      alert('Введите хотя бы 1 точку');
    }
    if (!this.lagrange.value && !this.piece.value) {
      alert('Выбирайте метод интерполяции!');
    }
    const x = +this.nmkX.value;
    const xPoint = realPoints.map(p => p.x);
    const yPoint = realPoints.map(p => p.y);
    if (this.lagrange.value) {
      const method = new LagrangePolynomial(realPoints);
      const y = method.executeInterpolation(x, xPoint, yPoint);
      console.log('Y by lagrange interpolation: ' + y);
    }
    if (this.piece.value) {
      const method = new PieceLinear(realPoints);
      const y = method.executeInterpolation(x, xPoint, yPoint);
      console.log('Y by Piece interpolation: ' + y);
    }
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

  private drawPlot(method: Interpolation, realPoints: Point[]) {
    const xPoints = realPoints.map(p => p.x);
    const minX = this.scale.findMin(xPoints);
    const maxX = this.scale.findMax(xPoints);
    const points = this.scale.zoomPointsList(method.calculatePoints(minX, maxX));
    for (let i = 0; i < points.length - 1; i++) {
      this.drawer.drawLine(points[i], points[i + 1]);
    }
  }
}
