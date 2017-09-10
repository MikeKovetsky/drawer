import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Point} from "../models/point.model";

@Injectable()
export class SelectionService {
  position$ = new BehaviorSubject<Point>(null);

  constructor() { }

  set(pos: Point) {
    this.position$.next(pos);
  }

  get(): Observable<Point> {
    return this.position$.asObservable();
  }
}
