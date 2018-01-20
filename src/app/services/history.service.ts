import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SupportedLineType } from "../configs/supported-lines";
import { Point } from "../models/point.model";
import { Line } from "../models/line.model";
import { HistoryEvent } from "../models/history-event.model";
import { Line3d } from '../models/line3d.model';

@Injectable()
export class HistoryService {
  history3d$ = new BehaviorSubject<Line3d[]>([]);
  history$ = new BehaviorSubject<HistoryEvent[]>([]);
  needsRendering$ = new BehaviorSubject<boolean>(false);
  isRecording = false;

  constructor() {
  }

  add(line: Line, lineType: SupportedLineType) {
    if (!this.isRecording) return;
    const history = this.history$.value;
    history.push({line, lineType});
    this.history$.next(history);
  }

  getPoints(): Point[] {
    const history = this.history$.value;
    if (!history.length) return [];
    const points = [this.history$.value[0].line.start];
    history.forEach((event, index) => {
      points.push(event.line.end);
    });
    return points;
  }

  getLines(): Line[] {
    const events: HistoryEvent[] = this.history$.value;
    return events.map(event => event.line);
  }

  clear() {
    this.history3d$.next([]);
    this.history$.next([]);
    this.needsRendering$.next(true);
  }

  reset(): Line[] {
    const removedLines = this.getLines();
    this.clear();
    return removedLines;
  }

}
