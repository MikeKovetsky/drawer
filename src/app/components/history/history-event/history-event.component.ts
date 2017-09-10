import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GRID_CONFIG} from "../../../configs/canvas-config";

import {HistoryEvent} from "../../../models/history-event.model";
import {DrawerService} from "../../../services/drawer.service";
import {SelectionService} from "../../../services/selection.service";

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
        x: [null, [Validators.required, Validators.min(GRID_CONFIG.minX), Validators.max(GRID_CONFIG.maxX)]],
        y: [null, [Validators.required, Validators.min(GRID_CONFIG.minY), Validators.max(GRID_CONFIG.maxY)]],
      }),
      p2: this.fb.group({
        x: [null, [Validators.required, Validators.min(GRID_CONFIG.minX), Validators.max(GRID_CONFIG.maxX)]],
        y: [null, [Validators.required, Validators.min(GRID_CONFIG.minY), Validators.max(GRID_CONFIG.maxY)]],
      }),
      controlPoint: this.fb.group({
        x: [null, [Validators.min(GRID_CONFIG.minX), Validators.max(GRID_CONFIG.maxX)]],
        y: [null, [Validators.min(GRID_CONFIG.minY), Validators.max(GRID_CONFIG.maxY)]],
      }),
      arc: false
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
    const points = event.value;
    this.drawer.drawLine(points.p1, points.p2, points.arc ? points.controlPoint : null);
    this.selection.set(points.p2);
    this.newEvent.reset();
  }

}
