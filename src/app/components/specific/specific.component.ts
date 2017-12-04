import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HistoryService} from "../../services/history.service";
import {Point} from "../../models/point.model";
import {DrawerService} from "../../services/drawer.service";

@Component({
  selector: 'drawer-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {
  tangentGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private drawer: DrawerService,
              private history: HistoryService) { }

  ngOnInit() {
    this.tangentGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      length: [10000, Validators.required]
    });
  }

  draw() {
    const control: Point  = new Point(this.tangentGroup.value.x, this.tangentGroup.value.y);
    const length = this.tangentGroup.value.length;
    const history = this.history.getPoints();
    const belongsToShape = history.some(point => point.x === control.x && point.y === control.y);
    if (belongsToShape) {
      const controlIndex = history.findIndex(point => point.x === control.x && point.y === control.y);
      const nextIndex = controlIndex ? controlIndex - 1 : controlIndex + 1;
      this.drawer.drawEndlessLine(history[controlIndex], history[nextIndex], length);
    } else {
      alert('Point on the figure was the found.');
    }
  }

}
