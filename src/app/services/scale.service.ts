import {Injectable} from '@angular/core';
import {Line} from '../models/line.model';
import {HelpersService} from './helpers.service';
import {Point} from '../models/point.model';
import {GRID_CONFIG} from '../configs/canvas-config';
import {DrawerService} from './drawer.service';
import {DrawerCanvas} from '../models/canvas.model';

@Injectable()
export class ScaleService {
  maxCoordinate: Point;

  constructor(private drawer: DrawerService, private helpers: HelpersService) {
    this.maxCoordinate = new Point(GRID_CONFIG.maxX, GRID_CONFIG.maxY);
  }

  autoScale(lines: Line[], canvas: DrawerCanvas): DrawerCanvas {
    const maxPoint = this.findMaxPoint(lines);
    const delta = this.calculateScaleDelta(maxPoint);
    console.log(delta);
    const initialZoom = 1;
    const zoom = initialZoom + delta;
    this.setMaxCoordinate(maxPoint);
    return this.zoomCanvas(canvas, zoom);
  }

  zoomLine(line: Line, zoom: number): Line {
    const start = new Point(line.start.x / zoom, line.start.y / zoom);
    const end = new Point(line.end.x / zoom, line.end.y / zoom);
    return new Line(start, end)
  }

  private zoomCanvas(canvas: DrawerCanvas, zoom: number) {
    const config = {
      width: canvas.width,
      height: canvas.height,
      vectorLength: canvas.vectorLength,
      zoom: zoom
    };
    return new DrawerCanvas(canvas.canvas, config);
  }

  private calculateScaleDelta(maxPoint): number {
    const offsetX = (maxPoint.x - this.maxCoordinate.x) / this.maxCoordinate.x;
    const offsetY = (maxPoint.y - this.maxCoordinate.y) / this.maxCoordinate.y;
    return Math.max(offsetX, offsetY);
  }

  private findMaxPoint(lines: Line[]) {
    const points = this.helpers.toPoints(lines);
    const maxX = this.findMax(points.map(p => Math.abs(p.x)));
    const maxY = this.findMax(points.map(p => Math.abs(p.y)));
    return new Point(maxX, maxY);
  }

  private setMaxCoordinate(newPoint: Point) {
    this.maxCoordinate.x = newPoint.x;
    this.maxCoordinate.y = newPoint.y;
  }

  private findMax<T>(a: T[]): T {
    return Math.max.apply(null, a);
  }
}
