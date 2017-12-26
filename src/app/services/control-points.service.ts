import {Injectable} from '@angular/core';
import {Point} from "../models/point.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ControlPointsService {
  controls$ = new BehaviorSubject<Point[]>([]);

  constructor() {
  }
}
