import {Component, Input} from '@angular/core';
import {SupportedLineType} from "../../../configs/supported-lines";
import {HistoryEvent} from "../../../models/history-event.model";

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
