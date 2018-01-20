import {Injectable} from '@angular/core';
import {SupportedLineType} from "../configs/supported-lines";
import {CircleDrawingMethod} from "../configs/canvas-config";
import {DrawerCanvas} from "../models/canvas.model";
import {Point} from "../models/point.model";
import {HistoryService} from "./history.service";
import {HelpersService} from "./helpers.service";
import {Line} from "../models/line.model";
import {forEach} from '@angular/router/src/utils/collection';
import { Point3d } from '../models/point3d.model';
import { CUBE } from '../configs/cube';
import { DrawerService } from './drawer.service';
import { Line3d } from '../models/line3d.model';

@Injectable()
export class Drawer3dService {

  constructor(private history: HistoryService, private drawer: DrawerService) {
  }

  drawLine(p1: Point3d, p2: Point3d) {
    this.appendToHistory(new Line3d(p1, p2));
    const start = this.projectPointByCabinet(p1);
    const end = this.projectPointByCabinet(p2);
    this.drawer.drawLine(start, end);
  }

  drawPoints(points: Point3d[]) {
    const lines: Line3d[] = [];
    for (let i = 1; i < points.length; i += 2) {
      lines.push(new Line3d(points[i - 1], points[i]));
    }
    this.drawLines(lines);
  }

  drawLines(lines: Line3d[]) {
    lines.forEach((line) => {
      this.drawLine(line.start, line.end);
    });
  }

  private projectPointByCabinet(point: Point3d): Point {
    const x = point.x + point.z * 0.5 * Math.cos(Math.PI / 4);
    const y = point.y + point.z * 0.5 * Math.sin(Math.PI / 4);
    return new Point(x, y);
  }

  private appendToHistory(line: Line3d) {
    const history = this.history.history3d$.value;
    this.history.history3d$.next(history.concat(line));
  }
}
