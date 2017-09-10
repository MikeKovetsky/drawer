import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectionService} from "../../../services/selection.service";
import {GRID_CONFIG} from "../../../configs/canvas-config";

@Component({
  selector: 'app-new-curve',
  templateUrl: './new-curve.component.html'
})
export class NewCurveComponent implements OnInit {
  @Output() newEvent = new EventEmitter<FormGroup>();
  newEventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private selection: SelectionService) {
  }

  ngOnInit() {
    this.newEventForm = this.fb.group({
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
    });

    this.selection.get().subscribe(pos => {
      if (!pos) return;
      this.newEventForm.patchValue({
        p1: {
          x: pos.x,
          y: pos.y
        }
      });
    });
  }

  submit(form: FormGroup) {
    this.newEvent.emit(form);
    this.newEventForm.controls.p1.setValue(this.newEventForm.controls.p2.value);
    this.newEventForm.controls.p2.reset();
  }

}
