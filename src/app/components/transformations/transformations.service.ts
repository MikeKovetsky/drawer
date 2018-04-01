import {Injectable} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {Point} from "../../models/point.model";
import {Line} from "../../models/line.model";
import { DrawerService } from '../../services/drawer.service';
import { CANVAS_CONFIG } from '../../configs/canvas-config';

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

  scale(zoom: number): Line[] {
    const lines = this.history.reset();
    return lines.map((line: Line) => {
      return this.lineToAffine(new Point(0, 0), new Point(zoom, 0), new Point(0, zoom), line);
    });
  }

  pointToAffine(r0: Point, r_x: Point, r_y: Point, point: Point): Point {
    return new Point(r0.x + r_x.x * point.x + r_x.y * point.y, r0.y + r_y.x * point.x + r_y.y * point.y);
  }

  private lineToAffine(r0: Point, rx: Point, ry: Point, line: Line): Line {
    const start = new Point(
      r0.x + rx.x * line.start.x + rx.y * line.start.y,
      r0.y + ry.x * line.start.x + ry.y * line.start.y
    );
    const end = new Point(
      r0.x + rx.x * line.end.x + rx.y * line.end.y,
      r0.y + ry.x * line.end.x + ry.y * line.end.y
    );
    return new Line(start, end);
  }
}
