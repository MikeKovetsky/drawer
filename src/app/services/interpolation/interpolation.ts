import {Point} from '../../models/point.model';

export abstract class Interpolation {
  points: Point[];
  listX: number[];
  listY: number[];

  constructor(points: Point[]) {
    this.points = points;
    this.listX = [];
    this.listY = [];
    for (let point of points) {
      this.listX.push(point.x);
      this.listY.push(point.y);
    }
  }

  abstract executeInterpolation(x: number, listX: number[], listY: number[]): number;

  calculatePoints(minValue, maxValue): Point[] {
    const resultPoints = [];
    for (let x = minValue; x <= maxValue; x += 0.01) {
      resultPoints.push(new Point(x, this.executeInterpolation(x, this.listX, this.listY)));
    }
    return resultPoints;
  }
}
