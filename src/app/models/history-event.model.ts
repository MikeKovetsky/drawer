import {Point} from "./point.model";

export class HistoryEvent {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
}
