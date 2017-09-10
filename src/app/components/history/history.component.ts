import {Component, OnInit} from '@angular/core';
import {HistoryEvent} from "../../models/history-event.model";
import {HistoryService} from "../../services/history.service";
import {Point} from "../../models/point.model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: HistoryEvent[] = [];

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.historyService.history$.asObservable().subscribe((updated) => {
      this.history = updated;
    })
  }

}
