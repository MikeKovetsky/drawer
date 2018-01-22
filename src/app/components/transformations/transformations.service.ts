import { Injectable } from '@angular/core';
import { HistoryService } from "../../services/history.service";
import { Point } from "../../models/point.model";
import { Line } from "../../models/line.model";

@Injectable()
export class TransformationsService {

  constructor(private history: HistoryService) {
  }

  move(deltaX: number, deltaY: number): Line[] {
    const lines = this.history.reset();
    return lines.map((line) => {
      const start = new Point(line.start.x + deltaX, line.start.y + deltaY);
      const end = new Point(line.end.x + deltaX, line.end.y + deltaY);
      return new Line(start, end);
    })
  }

  rotate(controlPoint: Point, angle: number): Line[] {
    const lines = this.history.reset();
    const alpha = -(angle * Math.PI / 180);
    return lines.map((line: Line) => {
      const start = new Point(
        (line.start.x - controlPoint.x) * Math.cos(alpha) - (line.start.y - controlPoint.y) * Math.sin(alpha) + controlPoint.x,
        (line.start.x - controlPoint.x) * Math.sin(alpha) + (line.start.y - controlPoint.y) * Math.cos(alpha) + controlPoint.y
      );
      const end = new Point(
        (line.end.x - controlPoint.x) * Math.cos(alpha) - (line.end.y - controlPoint.y) * Math.sin(alpha) + controlPoint.x,
        (line.end.x - controlPoint.x) * Math.sin(alpha) + (line.end.y - controlPoint.y) * Math.cos(alpha) + controlPoint.y
      );
      return new Line(start, end);
    })
  }
}
