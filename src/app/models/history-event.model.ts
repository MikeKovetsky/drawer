import {Point} from "./point.model";

export class HistoryEvent {
  start: Point;
  end: Point;
  completed: boolean;

  constructor(start: Point, end: Point, completed = true) {
    this.start = start;
    this.end = end;
    this.completed = completed;
  }
}
