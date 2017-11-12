import {Injectable} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {DrawerService} from "../../services/drawer.service";
import {Point} from "../../models/point.model";

class Line {
  start: Point;
  end: Point;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

@Injectable()
export class TransformationsService {

  constructor(private history: HistoryService,
              private drawer: DrawerService) {
  }

  move(deltaX: number, deltaY: number) {
    const points = this.history.getPoints();
    this.history.clear();
    this.toLines(points).forEach((line) => {
      const start = new Point(line.start.x + deltaX, line.start.y + deltaY);
      const end = new Point(line.end.x + deltaX, line.end.y + deltaY);
      this.drawer.drawLine(start, end);
    })
  }

  rotate(controlPoint: Point, angle: number) {
    const points = this.history.getPoints();
    this.history.clear();
    const alpha = -(angle * Math.PI / 180);
    this.toLines(points).forEach((line: Line) => {
      const start = new Point(
        (line.start.x - controlPoint.x) * Math.cos(alpha) - (line.start.y - controlPoint.y) * Math.sin(alpha) + controlPoint.x,
        (line.start.x - controlPoint.x) * Math.sin(alpha) + (line.start.y - controlPoint.y) * Math.cos(alpha) + controlPoint.y
      );
      const end = new Point(
        (line.end.x - controlPoint.x) * Math.cos(alpha) - (line.end.y - controlPoint.y) * Math.sin(alpha) + controlPoint.x,
        (line.end.x - controlPoint.x) * Math.sin(alpha) + (line.end.y - controlPoint.y) * Math.cos(alpha) + controlPoint.y
      );
      this.drawer.drawLine(start, end);
    })
  }

  toAffine(r0: Point, rx: Point, ry: Point) {
    const points = this.history.getPoints();
    this.history.clear();
    this.toLines(points).forEach((line: Line) => {
      const start = new Point(
        r0.x + rx.x * line.start.x + rx.y * line.start.y,
        r0.y + ry.x * line.start.x + ry.y * line.start.y
      );
      const end = new Point(
        r0.x + rx.x * line.end.x + rx.y * line.end.y,
        r0.y + ry.x * line.end.x + ry.y * line.end.y
      );
      this.drawer.drawLine(start, end);
    });
  }

  private toLines(points: Point[]): Line[] {
    const lines = [];
    points.forEach((point, index, points) => {
      if (index === 0) return;
      const start = new Point(points[index - 1].x, points[index - 1].y);
      const end = new Point(point.x, point.y);
      lines.push(new Line(start, end));
    });
    return lines;
  }
}
