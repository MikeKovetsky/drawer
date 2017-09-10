import {Point} from "./point.model";
import {SupportedLineType} from "../configs/supported-lines";

export class HistoryEvent {
  points: Point[];
  lineType: SupportedLineType;

  constructor(lineType, points: Point[] = []) {
    this.points = points;
    this.lineType = lineType;
  }
}
