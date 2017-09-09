import {Injectable} from '@angular/core';
import {Point} from "../models/point.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CursorPositionService {
  coordinates$ = new Subject<Point>();

  constructor() {
  }

  updatePosition(event, rect, canvas) {
    const x = event.clientX - rect.left - canvas.width / 2;
    const y = -(event.clientY - rect.top - canvas.height / 2);
    this.coordinates$.next(new Point(x, y))
  }

}
