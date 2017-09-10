import { Injectable } from '@angular/core';
import {Point} from "../models/point.model";
import {CANVAS_CONFIG} from "../configs/canvas-config";

@Injectable()
export class HelpersService {

  constructor() { }

  toAbsoluteCoordinates(p: Point): Point {
    return new Point(p.x + CANVAS_CONFIG.width / 2, -p.y + CANVAS_CONFIG.height / 2);
  }

}
