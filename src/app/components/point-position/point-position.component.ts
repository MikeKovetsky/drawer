import {Component, OnInit} from '@angular/core';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {HelpersService} from '../../services/helpers.service';
import {Point} from '../../models/point.model';

@Component({
  selector: 'drawer-point-position',
  templateUrl: './point-position.component.html',
  styleUrls: ['./point-position.component.css']
})
export class PointPositionComponent implements OnInit {
  nearestPoint: Point = null;

  constructor(private cursorPosition: CursorPositionService,
              private history: HistoryService,
              private helpers: HelpersService) {
  }

  ngOnInit() {
    this.watchNearestPoint();
  }

  watchNearestPoint() {
    this.cursorPosition.coordinates$.subscribe(pos => {
      const allPoints = this.history.getPoints();
      this.nearestPoint = this.helpers.findNearestPoint(pos, allPoints, 10);
    });
  }

  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }
}
