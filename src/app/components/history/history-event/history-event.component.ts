import {Component, Input} from '@angular/core';
import {HistoryEvent} from "../../../models/history-event.model";

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css'],
})
export class HistoryEventComponent{
  @Input() event: HistoryEvent;

  constructor() {
  }

}
