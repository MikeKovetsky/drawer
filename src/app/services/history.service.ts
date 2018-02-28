import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Point} from '../models/point.model';
import {SelectionService} from './selection.service';
import {Line} from '../models/line.model';
import {HistoryEvent} from '../models/history-event.model';
import {ControlPointsService} from './control-points.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HistoryService {
  history$ = new BehaviorSubject<HistoryEvent[]>([]);
  needsRender$ = new Subject<boolean>();
  isRecording = false;
  currentFigure: Point[][];

  constructor(private selection: SelectionService,
              private controls: ControlPointsService) {
  }

  add(line: Line) {
    if (!this.isRecording) return;
    const history = this.history$.value;
    history.push({line});
    this.history$.next(history);
  }

  getPoints(): Point[] {
    const lines = this.history$.value.map(events => events.line);
    const startPoints = lines.map(l => l.start);
    const endPoints = lines.map(l => l.end);
    return startPoints.concat(endPoints);
  }

  getLines(): Line[] {
    const events: HistoryEvent[] = this.history$.value;
    return events.map(event => event.line);
  }

  replacePoint(prevPoint: Point, point: Point) {
    const historyLines = this.getLines();
    const newlines = historyLines.map(line => {
      if (line.start.equals(prevPoint)) {
        line.start = point;
      }
      if (line.end.equals(prevPoint)) {
        line.end = point;
      }
      return line;
    });
    const newHistory = newlines.map((line) => {
      return {line} as HistoryEvent;
    });
    this.history$.next(newHistory);
    this.needsRender$.next();
  }

  clear() {
    this.selection.set(null);
    this.history$.next([]);
    this.controls.controls$.next([]);
    this.needsRender$.next();
  }

  back() {
    const newHistory = this.history$.value;
    newHistory.pop();
    this.history$.next(newHistory);
    this.selection.set(null);
    this.needsRender$.next();
  }

  reset(): Line[] {
    const removedLines = this.getLines();
    this.clear();
    return removedLines;
  }

}
