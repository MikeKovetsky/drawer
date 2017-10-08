import {Component, OnInit} from '@angular/core';
import {CursorPositionService} from "../../services/cursor-position.service";
import {HistoryService} from "../../services/history.service";
import {HelpersService} from "../../services/helpers.service";
import {Point} from "../../models/point.model";

@Component({
  selector: 'drawer-point-position',
  templateUrl: './point-position.component.html',
  styleUrls: ['./point-position.component.css']
})
export class PointPositionComponent implements OnInit {
  nearestPoint: Point = null;
  private readonly minDistanceToPoint = 10;

  constructor(private cursorPosition: CursorPositionService,
              private history: HistoryService,
              private helpers: HelpersService) {
  }

  ngOnInit() {
    this.cursorPosition.coordinates$.asObservable().subscribe(pos => {
      const position = pos;
      const allPoints = this.history.getPoints();
      const distance = allPoints.reduce((distance, point) => {
        const newDistance = this.helpers.getDistance(point, position);
        const closeEnough = newDistance < this.minDistanceToPoint && newDistance < distance;
        if (closeEnough) {
          this.nearestPoint = point;
        }
        return closeEnough ? newDistance : distance;
      }, Number.MAX_SAFE_INTEGER);

      if (distance === Number.MAX_SAFE_INTEGER) {
        this.nearestPoint = null;
      }
    })
  }


  toAbs(p: Point): Point {
    return this.helpers.toAbsoluteCoordinates(p);
  }

}
