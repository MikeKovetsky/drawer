import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {HistoryEvent} from "../../models/history-event.model";
import {Point} from '../../models/point.model';

@Component({
  selector: 'drawer-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  viewPoints: Point[] = [];
  readonly maxItems = 50;

  constructor(private history: HistoryService) {
  }

  ngOnInit() {
    this.history.historyPoints$.subscribe((updated) => {
      this.viewPoints = Array.from(updated.keys());
    });
  }
}
