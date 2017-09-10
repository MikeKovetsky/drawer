import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GRID_CONFIG} from "../../configs/canvas-config";

import {DrawerService} from "../../services/drawer.service";
import {SelectionService} from "../../services/selection.service";
import {SupportedLineType} from "../../configs/supported-lines";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  readonly lineTypes = SupportedLineType;
  newEvent: FormGroup;

  constructor(private fb: FormBuilder,
              private drawer: DrawerService,
              private selection: SelectionService) {
  }

  ngOnInit() {
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
      lineType: this.lineTypes.Line
    });


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
    switch (points.lineTypes) {
      case (this.lineTypes.Line):
        this.drawer.drawLine(points.p1, points.p2);
        break;
      case (this.lineTypes.QuadraticCurve):
        this.drawer.drawLine(points.p1, points.p2, points.controlPoint);
        break;
      case (this.lineTypes.Circle):
        this.drawer.drawLine(points.p1, points.p2);
        break;
    }
    this.selection.set(points.p2);
    this.newEvent.reset();
  }
}
