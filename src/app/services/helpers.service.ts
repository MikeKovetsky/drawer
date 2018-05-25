import {Injectable} from '@angular/core';
import {Point} from '../models/point.model';
import {CANVAS_CONFIG} from '../configs/canvas-config';
import {Line} from '../models/line.model';

@Injectable()
export class HelpersService {

  constructor() {
  }

  toAbsoluteCoordinates(p: Point): Point {
    // TODO: add canvas zoom
    return new Point(p.x + CANVAS_CONFIG.width / 2, -p.y + CANVAS_CONFIG.height / 2);
  }

  getLineCenter(p1: Point, p2: Point): Point {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  }

  toLines(points: Point[]): Line[] {
    const lines: Line[] = [];
    points.forEach((point, index) => {
      if (!index) {
        return;
      }
      lines.push(new Line(points[index - 1], point));
    });
    return lines;
  }

  toPoints(lines: Line[]): Point[] {
    const points = [];
    lines.forEach((l) => {
      points.push(l.start);
      points.push(l.end);
    });
    return points;
  }


  getDistance(p1: Point, p2: Point): number {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
  }

  nestArray<T>(arr: T[], nestedLength: number): T[][] {
    const newArr = [];
    for (let i = 0; i < arr.length; i += nestedLength) {
      const nested = [];
      for (let j = 0; j < nestedLength; j++) {
        nested.push(arr[i + j]);
      }
      newArr.push(nested);
    }
    return newArr;
  }

  flattenArray<T>(array: T[][]): T[] {
    const newArray: T[] = [];

    // recursive function
    function flatten(arr, newArr) {
      // go through array
      for (let i = 0; i < arr.length; i++) {
        // if element i of the current array is a non-array value push it
        if (Array.isArray(arr[i]) === false) {
          newArr.push(arr[i]);
        } else {
          flatten(arr[i], newArr);
        }
      }
    }

    flatten(array, newArray);
    return newArray;
  }

  pointBelongsToLine(p: Point, line: Line): boolean {
    const dxc = p.x - line.start.x;
    const dyc = p.y - line.start.y;

    const dxl = line.end.x - line.start.x;
    const dyl = line.end.y - line.start.y;

    const cross = dxc * dyl - dyc * dxl;
    if (cross != 0)
      return false;
    if (Math.abs(dxl) >= Math.abs(dyl))
      return dxl > 0 ?
        line.start.x <= p.x && p.x <= line.end.x :
        line.end.x <= p.x && p.x <= line.start.x;
    else
      return dyl > 0 ?
        line.start.y <= p.y && p.y <= line.end.y :
        line.end.y <= p.y && p.y <= line.start.y;
  }

  findNearestPoint(target: Point, allPoints: Point[], accuracyPx = Number.MAX_SAFE_INTEGER): Point | null {
    let nearest = null;
    const resultDistance = allPoints.reduce((distance, point) => {
      const newDistance = this.getDistance(point, target);
      const closeEnough = newDistance < accuracyPx && newDistance < distance;
      if (closeEnough) {
        nearest = point;
      }
      return closeEnough ? newDistance : distance;
    }, Number.MAX_SAFE_INTEGER);

    if (resultDistance === Number.MAX_SAFE_INTEGER) {
      return null;
    }

    return nearest;
  }
}
