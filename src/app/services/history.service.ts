import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Point} from '../models/point.model';
import {SelectionService} from './selection.service';
import {Line} from '../models/line.model';
import {HistoryEvent} from '../models/history-event.model';
import {ControlPointsService} from './control-points.service';
import {Subject} from 'rxjs/Subject';
import {HelpersService} from './helpers.service';

@Injectable()
export class HistoryService {
  history$ = new BehaviorSubject<HistoryEvent[]>([]);
  needsRender$ = new Subject<boolean>();
  isRecording = false;
  currentFigure: Point[][];
  historyPoints$ = new BehaviorSubject<Map<Point, Point>>(new Map());

  constructor(private selection: SelectionService, private helpers: HelpersService) {
  }

  add(line: Line) {
    if (!this.isRecording) return;
    const history = this.history$.value;
    history.push({line});
    this.history$.next(history);
  }

  addPoint(realPoint: Point, viewPoint: Point) {
    if (!this.isRecording) return;
    const history = new Map(this.historyPoints$.value);
    history.set(realPoint, viewPoint);
    this.historyPoints$.next(history);
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

  replacePoint(prevRealPoint: Point, newRealPoint: Point) {
    const history = new Map(this.historyPoints$.value);
    history.delete(prevRealPoint);
    history.set(newRealPoint, newRealPoint);
    this.historyPoints$.next(history);
    this.needsRender$.next();
  }

  clear() {
    this.historyPoints$.next(new Map());
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
