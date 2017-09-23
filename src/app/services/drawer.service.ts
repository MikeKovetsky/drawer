import {Injectable} from '@angular/core';
import {HistoryService} from "./history.service";
import {DrawerCanvas} from "../models/canvas.model";
import {Point} from "../models/point.model";
import {CircleDrawingMethod} from "../configs/canvas-config";

@Injectable()
export class DrawerService {
  yAxisInverted = false;
  context: CanvasRenderingContext2D;
  circleDrawingMethod = CircleDrawingMethod.Custom;

  constructor(private history: HistoryService) {
  }

  render(canvas: DrawerCanvas): DrawerCanvas {
    this.history.isRecording = false;
    this.setContext(canvas);
    this.initGrid(canvas);
    this.initAxis(canvas);
    this.invertYAxis(canvas);
    this.history.isRecording = true;
    return canvas;
  }

  setContext(canvas: DrawerCanvas) {
    this.context = canvas.getContext();
  }

  initGrid(canvas: DrawerCanvas) {
    this.context.globalAlpha = 0.2;
    for (let i = 0; i < canvas.width; i += canvas.vectorLength) {
      //vertical lines
      this.drawLine(new Point(i, 0), new Point(i, canvas.height));
    }
    for (let i = 0; i < canvas.height; i += canvas.vectorLength) {
      //horizontal lines
      this.drawLine(new Point(0, i), new Point(canvas.width, i));
    }
    this.context.globalAlpha = 1;
    return canvas;
  }

  initAxis(canvas: DrawerCanvas) {
    //x and y axis
    this.drawLine(new Point(0, canvas.height / 2), new Point(canvas.width, canvas.height / 2));
    this.drawLine(new Point(canvas.width / 2, 0), new Point(canvas.width / 2, canvas.height));
    for (let i = 0; i < canvas.height; i += canvas.vectorLength) {
      const helperStrokeStart = new Point(canvas.width / 2 - canvas.vectorLength / 2, i);
      const helperStrokeEnd = new Point(canvas.width / 2 + canvas.vectorLength / 2, i);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
    for (let i = 0; i < canvas.width; i += canvas.vectorLength) {
      const helperStrokeStart = new Point(i, canvas.height / 2 - canvas.vectorLength / 2);
      const helperStrokeEnd = new Point(i, canvas.height / 2 + canvas.vectorLength / 2);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
  }

  invertYAxis(canvas) {
    // set the canvas origin (0,0) to center canvas
    // All coordinates to the left of center canvas are negative
    // All coordinates below center canvas are negative
    this.yAxisInverted = true;
    this.context.translate(canvas.width / 2, canvas.height / 2);
  }

  drawLine(p1: Point, p2: Point, controlPoint: Point = null) {
    if (this.yAxisInverted) {
      p1 = new Point(p1.x, -p1.y) ;
      p2 = new Point(p2.x, -p2.y) ;
    }

    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    if (controlPoint === null) {
      this.context.lineTo(p2.x, p2.y);
    } else {
      controlPoint = new Point(controlPoint.x, -controlPoint.y);
      this.context.quadraticCurveTo(controlPoint.x, controlPoint.y, p2.x, p2.y)
    }
    this.context.stroke();
  }

  drawCircle(p: Point, radius: number, start: number = 0, end: number = 2) {
    if (this.circleDrawingMethod === CircleDrawingMethod.Native) {
      if (this.yAxisInverted) {
        p = new Point(p.x, -p.y) ;
      }
      this.context.beginPath();
      this.context.arc(p.x, p.y, radius,start * Math.PI,end * Math.PI);
      this.context.stroke();
    }

    if (this.circleDrawingMethod === CircleDrawingMethod.Custom) {
      this.customCircleDraw(p, radius, start * Math.PI - Math.PI / 2, end * Math.PI - Math.PI / 2);
    }
  }

  private customCircleDraw(center: Point, radius: number, start: number = 0, end: number = 2, clockwise = true) {
    const stepSize = (end - start) / 50;
    let angle = start;
    let startPoint = this.getCirclePoint(center, angle, radius, clockwise);
    while (angle <= end) {
      angle = angle + stepSize;
      const endPoint = this.getCirclePoint(center, angle, radius, clockwise);
      this.drawLine(startPoint, endPoint);
      startPoint = endPoint;
    }
  }

  private getCirclePoint(center, angle, radius, clockwise = true): Point {
    const x = (Math.sin(angle) * radius) + (clockwise ? -center.x : center.x);
    const y = (-Math.cos(angle) * radius) + center.y;
    return new Point(x, y)
  }
}
