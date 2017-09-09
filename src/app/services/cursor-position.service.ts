import {Injectable} from '@angular/core';
import {Point} from "../models/point.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CursorPositionService {
  coordinates$ = new Subject<Point>();

  constructor() {
  }

}
