import {Component, Input, OnInit} from '@angular/core';
import {HistoryEvent} from "../../models/history-event.model";

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css'],
})
export class HistoryEventComponent implements OnInit {
  @Input() event: HistoryEvent;

  constructor() {
  }

  ngOnInit() {
  }

}
