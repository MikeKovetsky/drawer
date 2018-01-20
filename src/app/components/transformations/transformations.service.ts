import { Injectable } from '@angular/core';
import { HistoryService } from "../../services/history.service";
import { Point } from "../../models/point.model";
import { Line } from "../../models/line.model";
import { Point3d } from '../../models/point3d.model';
import { Line3d } from '../../models/line3d.model';
import { Axis } from '../../models/axis.type';

@Injectable()
export class TransformationsService {

  move(lines: Line3d[], control: Point3d): Line3d[] {
    return lines.map((line) => {
      const start = new Point3d(line.start.x + control.x, line.start.y + control.y, line.start.z + control.z);
      const end = new Point3d(line.end.x + control.x, line.end.y + control.y, line.start.z + control.z);
      return new Line3d(start, end);
    })
  }

  rotate(lines: Line3d[], controlPoint: Point3d, axis: Axis, angle: number): Line3d[] {
    return lines.map((line: Line3d) => {
      const start = this.rotatePoint(line.start, controlPoint, angle, axis);
      const end = this.rotatePoint(line.end, controlPoint, angle, axis);
      return new Line3d(start, end);
    })
  }

  private rotatePoint(point: Point3d, control: Point3d, angle: number, axis: Axis) {
    switch (axis) {
      case 'x':
        return this.rotateCoordinateByX(point, control, angle);
      case 'y':
        return this.rotateCoordinateByY(point, control, angle);
      case 'z':
        return this.rotateCoordinateByZ(point, control, angle);
    }
  }

  private rotateCoordinateByZ(currentPoint: Point3d, controlPoint: Point3d, angle: number) {
    const x: number = currentPoint.x * Math.cos(angle) - currentPoint.y * Math.sin(angle) - controlPoint.x * Math.cos(angle) + controlPoint.y * Math.sin(angle) + controlPoint.x;
    const y: number = currentPoint.x * Math.sin(angle) + currentPoint.y * Math.cos(angle) - controlPoint.x * Math.sin(angle) - controlPoint.y * Math.cos(angle) + controlPoint.y;
    const z: number = currentPoint.z;
    return new Point3d(x, y, z);
  }

  private rotateCoordinateByX(currentPoint: Point3d, controlPoint: Point3d, angle: number) {
    const x: number = currentPoint.x;
    const y: number = currentPoint.y * Math.cos(angle) - currentPoint.z * Math.sin(angle) - controlPoint.y * Math.cos(angle) + controlPoint.z * Math.sin(angle) + controlPoint.y;
    const z: number = currentPoint.y * Math.sin(angle) + currentPoint.z * Math.cos(angle) - controlPoint.y * Math.sin(angle) - controlPoint.z * Math.cos(angle) + controlPoint.z;
    return new Point3d(x, y, z);
  }

  private rotateCoordinateByY(currentPoint: Point3d, controlPoint: Point3d, angle: number) {
    const x: number = currentPoint.x * Math.cos(angle) + currentPoint.z * Math.sin(angle) - controlPoint.x * Math.cos(angle) - controlPoint.z * Math.sin(angle) + controlPoint.x;
    const y: number = currentPoint.y;
    const z: number = -currentPoint.x * Math.sin(angle) + currentPoint.z * Math.cos(angle) + controlPoint.x * Math.sin(angle) - controlPoint.z * Math.cos(angle) + controlPoint.z;
    return new Point3d(x, y, z);
  }
}
