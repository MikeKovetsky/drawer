import {Injectable} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {Point} from "../../models/point.model";
import {Line} from "../../models/line.model";
import { Point3d } from '../../models/point3d.model';
import { Line3d } from '../../models/line3d.model';

@Injectable()
export class TransformationsService {

  move(lines: Line3d[], control: Point3d): Line3d[] {
    return lines.map((line) => {
      const start = new Point3d(line.start.x + control.x, line.start.y + control.y, line.start.z + control.z);
      const end = new Point3d(line.end.x + control.x, line.end.y + control.y, line.start.z + control.z);
      return new Line3d(start, end);
    })
  }

  // rotate(controlPoint: Point3d, angle: number): Line[] {
  //   const lines = this.history.reset();
  //   const alpha = -(angle * Math.PI / 180);
  //   return lines.map((line: Line) => {
  //     const start = new Point3d(
  //       (line.start.x - controlPoint.x) * Math.cos(alpha) - (line.start.y - controlPoint.y) * Math.sin(alpha) + controlPoint.x,
  //       (line.start.x - controlPoint.x) * Math.sin(alpha) + (line.start.y - controlPoint.y) * Math.cos(alpha) + controlPoint.y,
  //     );
  //     const end = new Point(
  //       (line.end.x - controlPoint.x) * Math.cos(alpha) - (line.end.y - controlPoint.y) * Math.sin(alpha) + controlPoint.x,
  //       (line.end.x - controlPoint.x) * Math.sin(alpha) + (line.end.y - controlPoint.y) * Math.cos(alpha) + controlPoint.y,
  //     );
  //     return new Line(start, end);
  //   })
  // }
}
