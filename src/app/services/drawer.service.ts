import { Injectable } from '@angular/core';
import { SupportedLineType } from "../configs/supported-lines";
import { CircleDrawingMethod } from "../configs/canvas-config";
import { DrawerCanvas } from "../models/canvas.model";
import { Point } from "../models/point.model";
import { HistoryService } from "./history.service";
import { HelpersService } from "./helpers.service";
import {Line} from "../models/line.model";

@Injectable()
export class DrawerService {
  yAxisInverted = false;
  context: CanvasRenderingContext2D;
  circleDrawingMethod = CircleDrawingMethod.Custom;
  enableSizeLines = false;

  constructor(private history: HistoryService, private helpers: HelpersService) {
  }

  render(canvas: DrawerCanvas): DrawerCanvas {
    this.history.isRecording = false;
    this.enableSizeLines = false;
    // this.invertYAxis(canvas, true);
    this.setContext(canvas);
    this.invertYAxis(canvas, false);
    this.initGrid(canvas);
    this.initAxis(canvas);
    this.drawVectorLength(canvas);
    this.enableSizeLines = true;
    this.history.isRecording = true;
    return canvas;
  }

  setContext(canvas: DrawerCanvas) {
    this.context = canvas.getContext();
  }

  initGrid(canvas: DrawerCanvas) {
    this.context.globalAlpha = 0.2;
    for (let i = -canvas.width / 2; i < canvas.width / 2; i += canvas.vectorLength) {
      //vertical lines
      this.drawLine(new Point(i, -canvas.height / 2), new Point(i, canvas.height / 2));
    }
    for (let i = -canvas.height / 2; i < canvas.height / 2; i += canvas.vectorLength) {
      //horizontal lines
      this.drawLine(new Point(-canvas.width / 2, i), new Point(canvas.width / 2, i));
    }
    this.context.globalAlpha = 1;
    this.context.textAlign = "center";
    return canvas;
  }

  initAxis(canvas: DrawerCanvas) {
    //x and y axis
    this.drawLine(new Point(-canvas.width / 2, 0), new Point(canvas.width / 2, 0));
    this.drawLine(new Point(0, -canvas.height / 2), new Point(0, canvas.height));
    for (let i = -canvas.height / 2; i < canvas.height / 2; i += canvas.vectorLength) {
      const helperStrokeStart = new Point(-canvas.vectorLength / 2, i);
      const helperStrokeEnd = new Point(canvas.vectorLength / 2, i);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
    for (let i = -canvas.width / 2; i < canvas.width / 2; i += canvas.vectorLength) {
      const helperStrokeStart = new Point(i, -canvas.vectorLength / 2);
      const helperStrokeEnd = new Point(i, canvas.vectorLength / 2);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
  }

  invertYAxis(canvas, initial: boolean) {
    // set the canvas origin (0,0) to center canvas
    // All coordinates to the left of center canvas are negative
    // All coordinates below center canvas are negative
    this.yAxisInverted = !initial;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    this.context.translate(x, y);
  }

  drawLine(p1: Point, p2: Point, controlPoint: Point = null) {
    this.invertPointsY(p1, p2);
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.invertPointsY(p1, p2);
    this.history.add([p1, p2], SupportedLineType.Line);
    this.drawLineSize(p1, p2);
    this.context.stroke();
  }

  drawLines(lines: Line[]) {
    lines.forEach((line) => {
      this.drawLine(line.start, line.end);
    })
  }

  invertPointsY(p1: Point, p2: Point) {
    if (this.yAxisInverted) {
      p1.y = -p1.y;
      p2.y = -p2.y;
    }
  }

  drawCircle(p: Point, radius: number, start: number = 0, end: number = 2) {
    if (this.circleDrawingMethod === CircleDrawingMethod.Native) {
      if (this.yAxisInverted) {
        p = new Point(p.x, -p.y);
      }
      this.context.beginPath();
      this.context.arc(p.x, p.y, radius, start * Math.PI, end * Math.PI);
      this.context.stroke();
    }

    if (this.circleDrawingMethod === CircleDrawingMethod.Custom) {
      this.customCircleDraw(p, radius, start * Math.PI - Math.PI / 2, end * Math.PI - Math.PI / 2);
    }
    this.history.add([p], SupportedLineType.Circle);
  }

  private customCircleDraw(center: Point, radius: number, start: number = 0, end: number = 2, clockwise = true) {
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

  private drawVectorLength(canvas) {
    this.context.font = "10px Arial";
    this.context.fillText(canvas.vectorLength.toString(), canvas.vectorLength, -canvas.vectorLength);
    this.context.fillText(canvas.vectorLength.toString(), canvas.vectorLength, canvas.vectorLength);
  }

  private getCirclePoint(center, angle, radius, clockwise = true): Point {
    const x = (Math.sin(angle) * radius) + (clockwise ? -center.x : center.x);
    const y = (-Math.cos(angle) * radius) + center.y;
    return new Point(x, y)
  }

  private drawLineSize(p1: Point, p2: Point) {
    if (!this.enableSizeLines) return;
    const distance = Math.round(this.helpers.getDistance(p1, p2));
    const lineCenter = this.helpers.getLineCenter(p1, p2);
    this.context.fillText(distance.toString(), lineCenter.x, -lineCenter.y);
  }
}
