import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HistoryService} from "../../services/history.service";
import {Point} from "../../models/point.model";
import {DrawerService} from "../../services/drawer.service";
import {ShapesService} from "../../services/shapes.service";

@Component({
  selector: 'drawer-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit {
  tangentGroup: FormGroup;
  cassiniGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private drawer: DrawerService,
              private shapes: ShapesService,
              private history: HistoryService) {
  }

  ngOnInit() {
    this.cassiniGroup = this.fb.group({
      x: [0, Validators.required],
      y: [0, Validators.required],
      a: [100, Validators.required],
      b: [100, Validators.required],
    });

    this.tangentGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      length: [10000, Validators.required]
    });
  }

  drawTangent(tangentGroup: FormGroup) {
    const control: Point = new Point(tangentGroup.value.x, tangentGroup.value.y);
    const length = tangentGroup.value.length;
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

  drawNormal(tangentGroup: FormGroup) {
    const control: Point = new Point(tangentGroup.value.x, tangentGroup.value.y);
    const length = tangentGroup.value.length;
    const history = this.history.getPoints();
    const belongsToShape = history.some(point => point.x === control.x && point.y === control.y);
    if (belongsToShape) {
      const controlIndex = history.findIndex(point => point.x === control.x && point.y === control.y);
      const p1 = history[controlIndex - 1];
      const p2 = history[controlIndex];
      const p3 = history[controlIndex + 1];
      const k = ((p2.y - p1.y) * (p3.x - p1.x) - (p2.x - p1.x) * (p3.y - p1.y)) / (Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
      const p4 = new Point(p3.x - k * (p2.y - p1.y), p3.y + k * (p2.x - p1.x));
      this.drawer.drawEndlessLine(p3, p4, length * 100);
    } else {
      alert('Point on the figure was the found.');
    }
  }

  drawTenth() {
    this.shapes.drawTenth();
  }

  drawOvals(cassiniGroup: FormGroup) {
    const center = new Point(cassiniGroup.value.x, cassiniGroup.value.y);
    this.shapes.drawOvals(center, cassiniGroup.value.a, cassiniGroup.value.b);
  }

}
