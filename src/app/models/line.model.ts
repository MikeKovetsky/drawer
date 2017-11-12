import {Point} from "./point.model";

export class Line {
  start: Point;
  end: Point;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}
