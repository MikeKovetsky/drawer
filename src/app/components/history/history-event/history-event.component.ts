import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {HistoryEvent} from "../../../models/history-event.model";
import {DrawerService} from "../../../services/drawer.service";
import {SelectionService} from "../../../services/selection.service";
import {CursorPositionService} from "../../../services/cursor-position.service";

import {Point} from "../../../models/point.model";

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.css'],
})
export class HistoryEventComponent implements OnInit {
  @Input() event: HistoryEvent;
  newEvent: FormGroup;

  constructor(private fb: FormBuilder,
              private drawer: DrawerService,
              private selection: SelectionService) {
  }

  ngOnInit() {
    if (this.event.completed) return;

    this.newEvent = this.fb.group({
      p1: this.fb.group({
        x: [null, Validators.required],
        y: [null, Validators.required],
      }),
      p2: this.fb.group({
        x: [null, Validators.required],
        y: [null, Validators.required],
      })
    });

    // let selection = new Point();

    // this.newEvent.valueChanges.subscribe((val) => {
    //   if (val.p1.x !== null && val.p1.y !== null && selection !== val.p1) {
    //     selection = val.p1;
    //     this.selection.set(selection);
    //   }
    // });

    this.selection.get().subscribe(pos => {
      if (!pos) return;
      this.newEvent.patchValue({
        p1: {
          x: pos.x,
          y: pos.y
        }
      });
    });
  }

  add(event: FormGroup) {
    this.drawer.drawLine(event.value.p1, event.value.p2);
    this.selection.set(event.value.p2);
    this.newEvent.reset();
  }

}
