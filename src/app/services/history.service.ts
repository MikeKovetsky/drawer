import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HistoryEvent} from "../models/history-event.model";
import {Point} from "../models/point.model";

@Injectable()
export class HistoryService {
  history$ = new BehaviorSubject<HistoryEvent[]>(null);
  isRecording = false;

  constructor() {
  }

  add(p1: Point, p2: Point) {
    if (!this.isRecording) return;
    const history = this.history$.getValue() || [];
    history.push(new HistoryEvent(p1, p2));
    this.history$.next(history);
  }

}
