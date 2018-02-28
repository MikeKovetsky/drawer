import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {Point} from '../../models/point.model';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {HelpersService} from '../../services/helpers.service';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'drawer-split-point',
  templateUrl: './split-point.component.html',
  styleUrls: ['./split-point.component.scss']
})
export class SplitPointComponent implements OnInit {
  splitPoint: Point = null;

  constructor(private cursorPosition: CursorPositionService,
              private history: HistoryService,
              private helpers: HelpersService,
              private tools: ToolsService) {}

  ngOnInit() {
    this.cursorPosition.coordinates$.pipe(
      filter(() => this.tools.splitMode)
    ).subscribe(pos => {
      const allLines = this.history.getLines();
      const nearestLinePoints = allLines.map(line => {
        const linePoints = line.getPoints(100);
        return this.helpers.findNearestPoint(pos, linePoints, 2);
      }).filter(l => !!l);
      this.splitPoint = this.helpers.findNearestPoint(pos, nearestLinePoints);
    });
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

}
