import {Injectable} from '@angular/core';
import {SupportedLineType} from "../configs/supported-lines";
import {CircleDrawingMethod} from "../configs/canvas-config";
import {DrawerCanvas} from "../models/canvas.model";
import {Point} from "../models/point.model";
import {HistoryService} from "./history.service";
import {HelpersService} from "./helpers.service";
import {Line} from "../models/line.model";
import {forEach} from '@angular/router/src/utils/collection';
import { Point3d } from '../models/point3d.model';

@Injectable()
export class DrawerService {
  yAxisInverted = false;
  context: CanvasRenderingContext2D;

  constructor(private history: HistoryService, private helpers: HelpersService) {
  }

  render(canvas: DrawerCanvas): DrawerCanvas {
    this.history.isRecording = false;
    this.setContext(canvas);
    this.invertYAxis(canvas, false);
    this.initGrid(canvas);
    this.initAxis(canvas);
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
    this.drawLine(new Point(0, -canvas.height / 2), new Point(0, canvas.height / 2));
    this.drawLine(new Point(-canvas.width / 2, -canvas.height / 2), new Point(canvas.width / 2, canvas.height / 2));
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

    for (let i = -canvas.width / 2; i < canvas.width / 2; i += canvas.vectorLength) {
      const helperStrokeStart = new Point(i + canvas.vectorLength / 4, i - canvas.vectorLength / 4);
      const helperStrokeEnd = new Point(i - canvas.vectorLength / 4, i + canvas.vectorLength / 4);
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

  drawLine(p1: Point, p2: Point, color = 'black') {
    p1.round();
    p2.round();
    this.context.strokeStyle = color;
    this.invertPointsY(p1, p2);
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.invertPointsY(p1, p2);
    this.context.stroke();
    this.history.add(new Line(p1, p2), SupportedLineType.Line);
  }

  drawPoints(points: Point[]) {
    const lines: Line[] = [];
    for (let i = 1; i < points.length; i += 2) {
      lines.push(new Line(points[i - 1], points[i]));
    }
    this.drawLines(lines);
  }

  drawLines(lines: Line[]) {
    lines.forEach((line) => {
      this.drawLine(line.start, line.end);
    });
  }

  invertPointsY(p1: Point, p2: Point) {
    if (this.yAxisInverted) {
      p1.y = -p1.y;
      p2.y = -p2.y;
    }
  }
}
