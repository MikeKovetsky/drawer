import {Injectable} from '@angular/core';
import {HistoryService} from "./history.service";
import {Point} from "../models/point.model";
import {DrawerCanvas} from "../models/canvas.model";

@Injectable()
export class DrawerService {
  yAxisInverted = false;
  context: CanvasRenderingContext2D;

  constructor(private history: HistoryService) {
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
    // All coordinates$ to the left of center canvas are negative
    // All coordinates$ below center canvas are negative
    this.yAxisInverted = true;
    this.context.translate(canvas.width / 2, canvas.height / 2);
  }

  drawLine(p1: Point, p2: Point) {
    this.context.beginPath();
    this.context.moveTo(p1.x, this.yAxisInverted ? -p1.y : p1.y);
    this.context.lineTo(p2.x, this.yAxisInverted ? -p2.y : p2.y);
    this.context.stroke();
    this.history.add(p1, p2);
  }
}
