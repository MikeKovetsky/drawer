import {Point} from './point.model';

export class Line {
  start: Point;
  end: Point;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  getPoints(pointsNumber = 100): Point[] {
    return Array.from(Array(pointsNumber)).map((_, i) => {
      const progress = i / 100;
      const x = this.start.x + (this.end.x - this.start.x) * progress;
      const y = this.start.y + (this.end.y - this.start.y) * progress;
      return new Point(x, y);
    });
  }
}
