import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Point} from "../models/point.model";
import {DrawerCanvas} from "../models/canvas.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CursorPositionService {
  coordinates$ = new BehaviorSubject<Point>(null);

  constructor() {
    this.coordinates$.next(new Point(0, 0));
  }

  updatePosition(clientPosition: Point, canvas: DrawerCanvas, rect) {
    const x = clientPosition.x - rect.left - canvas.width / 2;
    const y = -(clientPosition.y - rect.top - canvas.height / 2);
    this.coordinates$.next(new Point(x, y))
  }

}
