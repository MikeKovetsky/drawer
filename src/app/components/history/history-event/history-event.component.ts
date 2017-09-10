import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {HistoryEvent} from "../../../models/history-event.model";
import {HistoryService} from "../../../services/history.service";
import {DrawerService} from "../../../services/drawer.service";

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css'],
})
export class HistoryEventComponent implements OnInit {
  @Input() event: HistoryEvent;
  newEvent: FormGroup;

  constructor(private fb: FormBuilder,
              private drawer: DrawerService) {
  }

  ngOnInit() {
    if (this.event.completed) return;

    this.newEvent = this.fb.group({
      p1: this.fb.group({
        x: ['', Validators.required],
        y: ['', Validators.required],
      }),
      p2: this.fb.group({
        x: ['', Validators.required],
        y: ['', Validators.required],
      })
    })
  }

  add(event: FormGroup) {
    this.drawer.drawLine(event.value.p1 , event.value.p2);
    this.newEvent.reset();
  }

}
