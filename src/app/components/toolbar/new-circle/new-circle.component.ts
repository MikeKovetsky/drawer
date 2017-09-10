import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GRID_CONFIG} from "../../../configs/canvas-config";
import {SelectionService} from "../../../services/selection.service";

@Component({
  selector: 'drawer-new-circle',
  templateUrl: './new-circle.component.html'
})
export class NewCircleComponent implements OnInit {
  @Output() newEvent = new EventEmitter<FormGroup>();
  newEventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private selection: SelectionService) {
  }

  ngOnInit() {
    this.newEventForm = this.fb.group({
      circleCenter: this.fb.group({
        x: [null, [Validators.required, Validators.min(GRID_CONFIG.minX), Validators.max(GRID_CONFIG.maxX)]],
        y: [null, [Validators.required, Validators.min(GRID_CONFIG.minY), Validators.max(GRID_CONFIG.maxY)]],
      }),
      radius: [null, [Validators.min(GRID_CONFIG.minY), Validators.max(GRID_CONFIG.maxY)]]
    });

    this.selection.get().subscribe(pos => {
      if (!pos) return;
      this.newEventForm.patchValue({
        circleCenter: {
          x: pos.x,
          y: pos.y
        }
      });
    });
  }

  submit(form: FormGroup) {
    this.newEvent.emit(form);
  }

}
