import {Injectable} from '@angular/core';
import {Point} from '../models/point.model';
import {GRID_CONFIG} from '../configs/canvas-config';
import {CanvasService} from './canvas.service';
import {HistoryService} from './history.service';
import {TransformationsService} from '../components/transformations/transformations.service';

@Injectable()
export class ScaleService {
  zoom = 1;

  constructor(private canvas: CanvasService,
              private history: HistoryService,
              private transformations: TransformationsService) {
  }

  scalePoints(points: Map<Point, Point>) {
    if (points.size === 0) {
      return points;
    }
    const maxPoint = this.findMaxPoint(points);
    const unitVectorSizeX = maxPoint.x / (GRID_CONFIG.maxX / this.zoom);
    const unitVectorSizeY = maxPoint.y / (GRID_CONFIG.maxY / this.zoom);
    const longestVector = Math.max(unitVectorSizeX, unitVectorSizeY);
    this.zoom = this.zoom / longestVector;
    const center = new Point(0, 0);
    const rx = new Point(this.zoom, center.y);
    const ry = new Point(center.x, this.zoom);
    points.forEach((view, realPoint) => {
      const viewPoints = this.transformations.pointToAffine(center, rx, ry, realPoint);
      points.set(realPoint, viewPoints);
    });
    this.history.clear(true);
    return points;
  }

  zoomPointsList(points: Point[]): Point[] {
    const center = new Point(0, 0);
    const rx = new Point(this.zoom, center.y);
    const ry = new Point(center.x, this.zoom);
    return points.map(p => this.transformations.pointToAffine(center, rx, ry, p))
  }

  findMin<T>(a: T[]): T {
    return Math.min.apply(null, a);
  }

  findMax<T>(a: T[]): T {
    return Math.max.apply(null, a);
  }

  private findMaxPoint(pointsMap: Map<Point, Point>) {
    const realPoints = Array.from(pointsMap.keys());
    const maxX = this.findMax(realPoints.map(p => Math.abs(p.x)));
    const maxY = this.findMax(realPoints.map(p => Math.abs(p.y)));
    return new Point(maxX, maxY);
  }
}
