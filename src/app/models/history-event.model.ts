import {Point} from "./point.model";

export class HistoryEvent {
  points: Point[];

  constructor(points: Point[] = []) {
    this.points = points;
  }
}
