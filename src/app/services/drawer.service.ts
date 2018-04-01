import {Injectable} from '@angular/core';
import {CircleDrawingMethod} from '../configs/canvas-config';
import {Point} from '../models/point.model';
import {HistoryService} from './history.service';
import {HelpersService} from './helpers.service';
import {Line} from '../models/line.model';
import {CanvasService, Config} from './canvas.service';
import {ScaleService} from './scale.service';

interface LineOptions {
  zoom?: number;
  color?: string;
}

@Injectable()
export class DrawerService {
  yAxisInverted = false;
  context: CanvasRenderingContext2D;
  circleDrawingMethod = CircleDrawingMethod.Custom;
  enableSizeLines = false;

  constructor(private canvas: CanvasService,
              private history: HistoryService,
              private scale: ScaleService,
              private helpers: HelpersService) {
  }

  render(canvasNativeEl: any, canvasConfig: Config) {
    this.canvas.buildCanvas(canvasNativeEl, canvasConfig);
    this.history.isRecording = false;
    this.enableSizeLines = false;
    // this.invertYAxis(canvas, true);
    this.setContext();
    this.invertYAxis(false);
    this.initGrid();
    this.initAxis();
    this.drawVectorLength();
    this.enableSizeLines = true;
    this.history.isRecording = true;
  }

  setContext() {
    this.context = this.canvas.getContext();
  }

  initGrid() {
    this.context.globalAlpha = 0.2;
    for (let i = -this.canvas.width / 2; i < this.canvas.width / 2; i += this.canvas.vectorLength) {
      // vertical lines
      this.drawLine(new Point(i, -this.canvas.height / 2), new Point(i, this.canvas.height / 2));
    }
    for (let i = -this.canvas.height / 2; i < this.canvas.height / 2; i += this.canvas.vectorLength) {
      // horizontal lines
      this.drawLine(new Point(-this.canvas.width / 2, i), new Point(this.canvas.width / 2, i));
    }
    this.context.globalAlpha = 1;
    this.context.textAlign = 'center';
  }

  initAxis() {
    // x and y axis
    this.drawLine(new Point(-this.canvas.width / 2, 0), new Point(this.canvas.width / 2, 0));
    this.drawLine(new Point(0, -this.canvas.height / 2), new Point(0, this.canvas.height));
    for (let i = -this.canvas.height / 2; i < this.canvas.height / 2; i += this.canvas.vectorLength) {
      const helperStrokeStart = new Point(-this.canvas.vectorLength / 2, i);
      const helperStrokeEnd = new Point(this.canvas.vectorLength / 2, i);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
    for (let i = -this.canvas.width / 2; i < this.canvas.width / 2; i += this.canvas.vectorLength) {
      const helperStrokeStart = new Point(i, -this.canvas.vectorLength / 2);
      const helperStrokeEnd = new Point(i, this.canvas.vectorLength / 2);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
  }

  invertYAxis(initial: boolean) {
    // set the canvas origin (0,0) to center canvas
    // All coordinates to the left of center canvas are negative
    // All coordinates below center canvas are negative
    this.yAxisInverted = !initial;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    this.context.translate(x, y);
  }

  drawLine(p1: Point, p2: Point, opts: LineOptions = {zoom: 1, color: 'black'}) {
    p1.round();
    p2.round();
    this.context.strokeStyle = opts.color;
    this.invertPointsY(p1, p2);
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.invertPointsY(p1, p2);
    this.context.stroke();
    this.drawLineSize(p1, p2);
    this.history.add(new Line(p1, p2));
  }

  drawEndlessLine(p1: Point, p2: Point, pixels: number) {
    const d = new Point(p2.x - p1.x, p2.y - p2.x);
    const length = Math.sqrt(d.x * d.x + d.y * d.y);
    const delta = pixels / length;
    const a = new Point(p1.x + (p2.x - p1.x) * -delta, p1.y + (p2.y - p1.y) * -delta);
    const b = new Point(p1.x + (p2.x - p1.x) * (1 + delta), p1.y + (p2.y - p1.y) * (1 + delta));
    this.drawLine(a, b);
  }

  drawLines(lines: Line[], opts: LineOptions = {zoom: 1, color: 'black'}) {
    lines.forEach(line => this.drawLine(line.start, line.end, opts));
  }

  invertPointsY(p1: Point, p2: Point) {
    if (this.yAxisInverted) {
      p1.y = -p1.y;
      p2.y = -p2.y;
    }
  }

  drawCircle(p: Point, radius: number, start: number = 0, end: number = 2) {
    if (this.circleDrawingMethod === CircleDrawingMethod.Native) {
      // deprecation
      if (this.yAxisInverted) {
        p = new Point(p.x, -p.y);
      }
      this.context.beginPath();
      this.context.arc(p.x, p.y, radius, start * Math.PI, end * Math.PI);
      this.context.stroke();
    }

    if (this.circleDrawingMethod === CircleDrawingMethod.Custom) {
      this.drawCustomCircle(p, radius, start * Math.PI - Math.PI / 2, end * Math.PI - Math.PI / 2);
    }
  }

  private getBezierPoint(n1: number, n2: number, perc: number): number {
    const diff = n2 - n1;
    return n1 + (diff * perc);
  }

  drawCubicCurve(start: Point, end: Point, c1: Point, c2: Point) {
    const prevSizeLineStatus = this.enableSizeLines;
    this.enableSizeLines = false;
    const points = this.calculateCubicCurvePoints(start, end, c1, c2);
    points.forEach((point, index) => {
      if (index !== 0) {
        this.drawLine(points[index - 1], point);
      }
    });
    this.enableSizeLines = prevSizeLineStatus;
  }

  drawFigure(figure: Point[][]): Point[] {
    const ctrls = [];
    figure.forEach((curve) => {
      const points = curve.map((point: Point) => new Point(point.x, point.y));
      this.drawCubicCurve(points[0], points[1], points[2], points[3]);
      for (let i = 0; i < points.length; i++) {
        // const ctrls = this.controlPoints.controls$.value;
        ctrls.push(points[i]);
        if (i) {
          const prevSizeLinesMode = this.enableSizeLines;
          this.enableSizeLines = false;
          const opts = {color: 'rgba(255, 0, 0, 0.4)'}
          this.drawLine(points[i - 1], points[i], opts);
          this.enableSizeLines = prevSizeLinesMode;
        }
      }
    });
    return ctrls;
  }

  calculateCubicCurvePoints(start: Point, end: Point, c1: Point, c2: Point): Point[] {
    const points: Point[] = [];
    for (let i = 0; i < 1; i += 0.1) {
      const xa = this.getBezierPoint(start.x, end.x, i);
      const ya = this.getBezierPoint(start.y, end.y, i);
      const xb = this.getBezierPoint(end.x, c1.x, i);
      const yb = this.getBezierPoint(end.y, c1.y, i);
      const xc = this.getBezierPoint(c1.x, c2.x, i);
      const yc = this.getBezierPoint(c1.y, c2.y, i);

      const xm = this.getBezierPoint(xa, xb, i);
      const ym = this.getBezierPoint(ya, yb, i);
      const xn = this.getBezierPoint(xb, xc, i);
      const yn = this.getBezierPoint(yb, yc, i);

      const p = new Point(this.getBezierPoint(xm, xn, i), this.getBezierPoint(ym, yn, i));
      points.push(p);
    }
    return points;
  }

  private drawCustomCircle(center: Point, radius: number, start: number = 0, end: number = 2, clockwise = true) {
    const prevSizeLineStatus = this.enableSizeLines;
    this.enableSizeLines = false;
    const stepSize = (end - start) / 50;
    let angle = start;
    let startPoint = this.getCirclePoint(center, angle, radius, clockwise);
    while (angle <= end) {
      angle = angle + stepSize;
      const endPoint = this.getCirclePoint(center, angle, radius, clockwise);
      this.drawLine(startPoint, endPoint);
      startPoint = endPoint;
    }
    this.enableSizeLines = prevSizeLineStatus;
  }

  private drawVectorLength() {
    this.context.font = '10px Arial';
    const v = (this.canvas.vectorLength / this.scale.zoom).toFixed(2).toString();
    this.context.fillText(v, this.canvas.vectorLength, -this.canvas.vectorLength);
    this.context.fillText(v, this.canvas.vectorLength, this.canvas.vectorLength);
  }

  private getCirclePoint(center, angle, radius, clockwise = true): Point {
    const x = -Math.sin(angle) * radius - (clockwise ? -center.x : center.x);
    const y = -Math.cos(angle) * radius + center.y;
    return new Point(x, y);
  }

  private drawLineSize(p1: Point, p2: Point) {
    if (!this.enableSizeLines) {
      return;
    }
    const distance = Math.round(this.helpers.getDistance(p1, p2));
    if (distance > 10) {
      const lineCenter = this.helpers.getLineCenter(p1, p2);
      this.context.fillText(distance.toString(), lineCenter.x, -lineCenter.y);
    }
  }
}
