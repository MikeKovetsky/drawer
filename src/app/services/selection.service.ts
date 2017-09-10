import { Injectable } from '@angular/core';
import {Point} from "../models/point.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SelectionService {
  position$ = new BehaviorSubject<Point>(null);

  constructor() { }

  set(pos: Point) {
    this.position$.next(pos);
  }
}
