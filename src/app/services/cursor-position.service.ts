import {Injectable} from '@angular/core';
import {Point} from "../models/point.model";
import {DrawerCanvas} from "../models/canvas.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CursorPositionService {
  coordinates$ = new BehaviorSubject<Point>(new Point());

  constructor() {}

  updatePosition(clientPosition: Point, canvas: DrawerCanvas) {
    const x = (clientPosition.x  - canvas.width / 2) * canvas.zoom;
    const y = -(clientPosition.y - canvas.height / 2) * canvas.zoom;
    this.coordinates$.next(new Point(x, y))
  }

}
