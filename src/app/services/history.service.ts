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
    const history = this.history$.value;
    if (!history.length) return [];
    const points = [this.history$.value[0].line.start];
    history.forEach((event) => {
      points.push(event.line.end);
    });
    return points;
  }

  getLines(): Line[] {
    const events: HistoryEvent[] = this.history$.value;
    return events.map(event => event.line);
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
