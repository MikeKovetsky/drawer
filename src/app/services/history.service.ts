import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HistoryEvent} from "../models/history-event.model";
import {Point} from "../models/point.model";

const blankEvent = new HistoryEvent(new Point(), new Point(), false);

@Injectable()
export class HistoryService {
  history$ = new BehaviorSubject<HistoryEvent[]>([blankEvent]);
  isRecording = false;

  constructor() {
  }

  add(p1: Point, p2: Point) {
    if (!this.isRecording) return;
    const history = this.history$.getValue() || [];
    history.pop();
    history.push(new HistoryEvent(p1, p2, true));
    history.push(blankEvent);
    this.history$.next(history);
  }

  clear() {
    this.history$.next([]);
  }

}
