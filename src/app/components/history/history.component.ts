import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {HistoryEvent} from "../../models/history-event.model";

@Component({
  selector: 'drawer-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyEvents: HistoryEvent[] = [];
  readonly maxItems = 50;

  constructor(private history: HistoryService) {
  }

  ngOnInit() {
    this.history.history$.subscribe((updated) => {
      this.historyEvents = updated;
    });
  }
}
