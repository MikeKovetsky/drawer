import {filter} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {HelpersService} from '../../services/helpers.service';
import {Point} from '../../models/point.model';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'drawer-point-position',
  templateUrl: './point-position.component.html',
  styleUrls: ['./point-position.component.css']
})
export class PointPositionComponent implements OnInit {
  nearestPoint: Point = null;
  nearestCurvePoint = null;

  constructor(private cursorPosition: CursorPositionService,
              private history: HistoryService,
              private helpers: HelpersService,
              private tools: ToolsService) {
  }

  ngOnInit() {
    this.watchNearestPoint();
    this.watchNearestCurvePoint();
  }

  watchNearestPoint() {
    this.cursorPosition.coordinates$.subscribe(pos => {
      const allPoints = this.history.getPoints();
      this.nearestPoint = this.helpers.findNearestPoint(pos, allPoints, 10);
    });
  }

  watchNearestCurvePoint() {
    this.cursorPosition.coordinates$.pipe(
      filter(() => this.tools.splitMode)
    ).subscribe(pos => {
      const allLines = this.history.getLines();
      const nearestLinePoints = allLines.map(line => {
        const linePoints = line.getPoints(100);
        return this.helpers.findNearestPoint(pos, linePoints, 2);
      }).filter(l => !!l);
      this.nearestCurvePoint = this.helpers.findNearestPoint(pos, nearestLinePoints);
    });
  }


  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

}
