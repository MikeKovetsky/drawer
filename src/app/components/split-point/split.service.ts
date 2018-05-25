import {Injectable} from '@angular/core';
import {HistoryService} from '../../services/history.service';
import {Line} from '../../models/line.model';
import {Point} from '../../models/point.model';
import {HistoryEvent} from '../../models/history-event.model';
import {HelpersService} from '../../services/helpers.service';
import {PavementService} from '../../services/pave.service';
import {ToolsService} from '../../services/tools.service';

@Injectable()
export class SplitService {

  constructor(private history: HistoryService,
              private pavement: PavementService,
              private tools: ToolsService,
              private helpers: HelpersService) {
  }

  splitLine(line: Line, pointToSplit: Point) {
    const lines = this.tools.realTimePaving.get() ? this.pavement.pavementBase : this.history.getLines();
    const lineIndex = lines.findIndex((l) => this.helpers.pointBelongsToLine(pointToSplit, l));
    if (lineIndex === -1) {
      return lines;
    }
    const outdatedLine = lines[lineIndex];
    const newLine1 = new Line(outdatedLine.start, pointToSplit);
    const newLine2 = new Line(pointToSplit, outdatedLine.end);
    lines[lineIndex] = newLine1;
    lines.splice(lineIndex, 0, newLine2);
    if (this.tools.realTimePaving.get()) {
      this.pavement.pavementBase = lines;
      this.pavement.tile(3);
    }
    const newHistory = lines.map((line) => {
      return {line} as HistoryEvent;
    });
    this.history.history$.next(newHistory);
    this.history.needsRender$.next();
  }
}
