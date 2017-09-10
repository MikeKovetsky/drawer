import {Component, Input} from '@angular/core';
import {HistoryEvent} from "../../../models/history-event.model";
import {SupportedLineType} from "../../../configs/supported-lines";

@Component({
  selector: 'drawer-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css'],
})
export class HistoryEventComponent{
  @Input() event: HistoryEvent;
  readonly lineTypes = SupportedLineType;

  constructor() {
  }

}
