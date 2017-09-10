import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HistoryEvent} from "../models/history-event.model";
import {Point} from "../models/point.model";

@Injectable()
export class HistoryService {
  history$ = new BehaviorSubject<HistoryEvent[]>([]);
  isRecording = false;

  constructor() {
  }

  add(p1: Point, p2: Point) {
    if (!this.isRecording) return;
    const history = this.history$.getValue();
    history.push(new HistoryEvent(p1, p2));
    this.history$.next(history);
  }

  getPoints(): Point[] {
    const history = this.history$.getValue();
    if (!history.length) return [];
    let points = history.map(event => {
      return event.start;
    });
    points.push(history[history.length - 1].end);
    return points;
  }

  clear() {
    this.history$.next([]);
  }

}
