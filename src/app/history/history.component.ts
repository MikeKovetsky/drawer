import {Component, OnInit} from '@angular/core';
import {HistoryEvent} from "../models/history-event.model";
import {Point} from "../models/point.model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: HistoryEvent[] = [];

  constructor() {
  }

  ngOnInit() {
    const canvasCenter = new Point(0, 0);
    this.history.push(new HistoryEvent(canvasCenter, canvasCenter))
  }

}
