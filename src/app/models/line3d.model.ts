import { Point3d } from './point3d.model';

export class Line3d {
  start: Point3d;
  end: Point3d;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}
