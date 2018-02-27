import {Component, OnInit} from '@angular/core';
import {CursorPositionService} from '../../services/cursor-position.service';
import {HistoryService} from '../../services/history.service';
import {HelpersService} from '../../services/helpers.service';
import {Point} from '../../models/point.model';
import {filter} from 'rxjs/operators';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'drawer-point-position',
  templateUrl: './point-position.component.html',
  styleUrls: ['./point-position.component.css']
})
export class PointPositionComponent implements OnInit {
  nearestPoint: Point = null;
  nearestCurvePoint = null;
  private readonly minDistanceToPoint = 10;

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
      this.nearestPoint = this.findNearestPoint(pos, allPoints);
    });
  }

  watchNearestCurvePoint() {
    this.cursorPosition.coordinates$.pipe(
      filter(() => this.tools.splitMode)
    ).subscribe(pos => {
      const allLines = this.history.getLines();
      allLines.forEach(line => {
        const linePoints = line.getPoints(100);
        const nearest = this.findNearestPoint(pos, linePoints);
        console.log(linePoints);
      });
    });
  }


  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

  private findNearestPoint(target: Point, allPoints: Point[]): Point | null {
    let nearest = null;
    const resultDistance = allPoints.reduce((distance, point) => {
      const newDistance = this.helpers.getDistance(point, target);
      const closeEnough = newDistance < this.minDistanceToPoint && newDistance < distance;
      if (closeEnough) {
        nearest = point;
      }
      return closeEnough ? newDistance : distance;
    }, Number.MAX_SAFE_INTEGER);

    if (resultDistance === Number.MAX_SAFE_INTEGER) {
      return null;
    }

    return nearest;
  }

}
