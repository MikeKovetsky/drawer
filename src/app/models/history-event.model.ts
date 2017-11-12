import {SupportedLineType} from "../configs/supported-lines";
import {Line} from "./line.model";

export interface HistoryEvent {
  lineType: SupportedLineType;
  line: Line;
}
