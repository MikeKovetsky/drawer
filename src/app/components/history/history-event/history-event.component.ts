import {Component, Input} from '@angular/core';
import {SupportedLineType} from "../../../configs/supported-lines";
import {HistoryEvent} from "../../../models/history-event.model";
import {Point} from '../../../models/point.model';

@Component({
  selector: 'drawer-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css'],
})
export class HistoryEventComponent{
  @Input() event: Point;
  readonly lineTypes = SupportedLineType;

  constructor() {
  }

}
