import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {Point} from '../../models/point.model';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {HelpersService} from '../../services/helpers.service';
import {ToolsService} from '../../services/tools.service';
import {Line} from '../../models/line.model';
import {SplitService} from './split.service';

interface Nearest {
  line: Line, point: Point;
}

@Component({
  selector: 'drawer-split-point',
  templateUrl: './split-point.component.html',
  styleUrls: ['./split-point.component.scss'],
  providers: [SplitService]
})
export class SplitPointComponent implements OnInit {
  splitPoint: Point = null;
  hoveredLine: Line = null;

  constructor(private cursorPosition: CursorPositionService,
              private history: HistoryService,
              private helpers: HelpersService,
              private tools: ToolsService,
              private split: SplitService) {}

  ngOnInit() {
    this.cursorPosition.coordinates$.pipe(
      filter(() => this.tools.splitMode.get())
    ).subscribe(pos => {
      const allLines = this.history.getLines();
      const nearest: Nearest[] = allLines.map(line => {
        const linePoints = line.getPoints(100);
        const point = this.helpers.findNearestPoint(pos, linePoints, 2);
        return {line, point};
      }).filter(l => !!l.point);
      this.splitPoint = this.helpers.findNearestPoint(pos, nearest.map(a => a.point));
      const n = nearest.find(a => a.point.equals(this.splitPoint));
      if (n) {
        this.hoveredLine = n.line;
      }
    });
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

  splitLine(line: Line, splitPoint: Point) {
    this.split.splitLine(line, splitPoint);
  }

}
