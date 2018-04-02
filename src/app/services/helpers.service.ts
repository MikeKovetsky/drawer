import {Injectable} from '@angular/core';
import {Point} from '../models/point.model';
import {CANVAS_CONFIG} from '../configs/canvas-config';
import {Line} from '../models/line.model';
import {CanvasService} from './canvas.service';

type ReferenceType = any[] | object;

@Injectable()
export class HelpersService {

  constructor(private canvas: CanvasService) {
  }

  toAbsoluteCoordinates(p: Point): Point {
    const x = p.x + CANVAS_CONFIG.width / 2;
    const y = -p.y + CANVAS_CONFIG.height / 2;
    return new Point(x, y);
  }

  getLineCenter(p1: Point, p2: Point): Point {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  }

  deepEqual(a: ReferenceType, b: ReferenceType) {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  getDistance(p1: Point, p2: Point): number {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
  }

  deepMapEqual<M, K>(a: Map<M, K>, b: Map<M, K>): boolean {
    const aEntries = Array.from(a.entries());
    const bEntries = Array.from(b.entries());
    return this.deepEqual(aEntries, bEntries);
  }

  deepCopy<T>(a: T): T {
    return JSON.parse(JSON.stringify(a));
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
