import {Injectable} from '@angular/core';
import {HistoryService} from '../../services/history.service';
import {Line} from '../../models/line.model';
import {Point} from '../../models/point.model';
import {HistoryEvent} from '../../models/history-event.model';

@Injectable()
export class SplitService {

  constructor(private history: HistoryService) {
  }

  splitLine(line: Line, pointToSplit: Point) {
    const drawnLines = this.history.getLines();
    const found = drawnLines.find(l => l.equals(line));
    if (!found) {
      return;
    }
    const newLines = drawnLines.filter(l => !l.equals(line));
    newLines.push(new Line(found.start, pointToSplit));
    newLines.push(new Line(pointToSplit, found.end));
    const newHistory = newLines.map((line) => {
      return {line} as HistoryEvent;
    });
    this.history.history$.next(newHistory);
    this.history.needsRender$.next();
  }
}
