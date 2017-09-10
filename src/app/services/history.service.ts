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

  add(points: Point[]) {
    if (!this.isRecording) return;
    const history = this.history$.getValue();
    history.push(new HistoryEvent(points));
    this.history$.next(history);
  }

  getPoints(): Point[] {
    const history = this.history$.getValue();
    if (!history.length) return [];
    let points = [];
    history.forEach(event => {
      event.points.forEach(point => {
        points.push(point);
      })
    });
    return points;
  }

  clear() {
    this.history$.next([]);
  }

}
