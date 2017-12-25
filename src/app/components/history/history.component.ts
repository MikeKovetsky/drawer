import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {HistoryEvent} from "../../models/history-event.model";

@Component({
  selector: 'drawer-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: HistoryEvent[] = [];
  maxItems = 50;

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.historyService.history$.asObservable().subscribe((updated) => {
      this.history = updated;
    });
  }

  clear() {
    this.historyService.clear();
  }

}
