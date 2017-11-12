import {Injectable} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {Point} from "../../models/point.model";
import {Line} from "../../models/line.model";

@Injectable()
export class TransformationsService {

  constructor(private history: HistoryService) {
  }

  move(deltaX: number, deltaY: number): Line[] {
    const points = this.history.getPoints();
    this.history.clear();
    return Line.fromPoints(points).map((line) => {
      const start = new Point(line.start.x + deltaX, line.start.y + deltaY);
      const end = new Point(line.end.x + deltaX, line.end.y + deltaY);
      return new Line(start, end);
    })
  }

  rotate(controlPoint: Point, angle: number): Line[] {
    const points = this.history.getPoints();
    this.history.clear();
    const alpha = -(angle * Math.PI / 180);
    return Line.fromPoints(points).map((line: Line) => {
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

  toAffine(r0: Point, rx: Point, ry: Point): Line[] {
    const points = this.history.getPoints();
    this.history.clear();
    return Line.fromPoints(points).map((line: Line) => {
      const start = new Point(
        r0.x + rx.x * line.start.x + rx.y * line.start.y,
        r0.y + ry.x * line.start.x + ry.y * line.start.y
      );
      const end = new Point(
        r0.x + rx.x * line.end.x + rx.y * line.end.y,
        r0.y + ry.x * line.end.x + ry.y * line.end.y
      );
      return new Line(start, end);
    });
  }

  toProjective(r0: Point, rx: Point, ry: Point, w: Point, w0: number): Line[] {
    const points = this.history.getPoints();
    this.history.clear();
    return Line.fromPoints(points).map((line: Line) => {
      const start = new Point(
        (r0.x * w0 + rx.x * line.start.x * w.x + rx.y * line.start.y * w.y) / (w0 + line.start.x * w.x + line.start.y * w.y),
        (r0.y * w0 + rx.y * line.start.x * w.x + ry.y * line.start.y * w.y) / (w0 + line.start.x * w.x + line.start.y * w.y)
      );
      const end = new Point(
        (r0.x * w0 + rx.x * line.end.x * w.x + rx.y * line.end.y * w.y) / (w0 + line.end.x * w.x + line.end.y * w.y),
        (r0.y * w0 + rx.y * line.end.x * w.x + ry.y * line.end.y * w.y) / (w0 + line.end.x * w.x + line.end.y * w.y)
      );
      return new Line(start, end);
    });
  }
}
