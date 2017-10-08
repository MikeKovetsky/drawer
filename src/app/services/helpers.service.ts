import { Injectable } from '@angular/core';
import {Point} from "../models/point.model";
import {CANVAS_CONFIG} from "../configs/canvas-config";

@Injectable()
export class HelpersService {

  constructor() { }

  toAbsoluteCoordinates(p: Point): Point {
    return new Point(p.x + CANVAS_CONFIG.width / 2, -p.y + CANVAS_CONFIG.height / 2);
  }

  getLineCenter(p1: Point, p2: Point): Point {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  }


  getDistance(p1: Point, p2: Point): number {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
  }
}
