import {Injectable} from '@angular/core';
import {Point} from "../models/point.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CanvasService} from './canvas.service';

@Injectable()
export class CursorPositionService {
  coordinates$ = new BehaviorSubject<Point>(new Point());

  constructor(private canvas: CanvasService) {}

  updatePosition(clientPosition: Point) {
    const x = (clientPosition.x  - this.canvas.width / 2) * this.canvas.zoom;
    const y = -(clientPosition.y - this.canvas.height / 2) * this.canvas.zoom;
    this.coordinates$.next(new Point(x, y))
  }

}
