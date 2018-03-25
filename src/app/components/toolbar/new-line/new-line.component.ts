import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectionService} from '../../../services/selection.service';
import {DrawerService} from '../../../services/drawer.service';
import {Point} from '../../../models/point.model';

@Component({
  selector: 'drawer-new-line',
  templateUrl: './new-line.component.html'
})
export class NewLineComponent implements OnInit {
  @Output() newEvent = new EventEmitter<FormGroup>();
  newEventForm: FormGroup;

  constructor(private fb: FormBuilder,
              private drawer: DrawerService,
              private selection: SelectionService) {
  }

  ngOnInit() {
    this.newEventForm = this.fb.group({
      p1: this.fb.group({
        x: [null, [Validators.required]],
        y: [null, [Validators.required]],
      }),
      p2: this.fb.group({
        x: [null, [Validators.required]],
        y: [null, [Validators.required]],
      }),
    });

    this.selection.get().subscribe(pos => {
      if (!pos) return;
      this.newEventForm.patchValue({
        p1: {x: pos.x, y: pos.y},
        p2: {x: 0, y: 0}
      });
    });
  }

  drawLine(form: FormGroup) {
    const p1 = new Point(form.value.p1.x, form.value.p1.y);
    const p2 = new Point(form.value.p2.x, form.value.p2.y);
    this.drawer.drawLine(p1, p2);
    this.selection.set(p2);
  }

}
