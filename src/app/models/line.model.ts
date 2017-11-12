import {Point} from "./point.model";

export class Line {
  start: Point;
  end: Point;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  static fromPoints(points: Point[]): Line[] {
    const lines = [];
    points.forEach((point, index, points) => {
      if (index === 0) return;
      const start = new Point(points[index - 1].x, points[index - 1].y);
      const end = new Point(point.x, point.y);
      lines.push(new Line(start, end));
    });
    return lines;
  }
}
