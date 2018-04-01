import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Point} from '../../../models/point.model';
import {HistoryService} from '../../../services/history.service';

@Component({
  selector: 'drawer-new-point',
  templateUrl: './new-point.component.html'
})
export class NewPointComponent implements OnInit {
  @Output() newEvent = new EventEmitter<FormGroup>();
  newEventForm: FormGroup;

  constructor(private fb: FormBuilder, private history: HistoryService) {
  }

  ngOnInit() {
    this.newEventForm = this.fb.group({
      p: this.fb.group({
        x: [null, [Validators.required]],
        y: [null, [Validators.required]],
      }),
    });
  }

  drawPoint(form: FormGroup) {
    const p = new Point(form.value.p.x, form.value.p.y);
    this.history.addPoint(p, p);
  }

}
