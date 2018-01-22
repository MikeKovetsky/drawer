import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransformationsService} from "./transformations.service";
import { Point3d } from '../../models/point3d.model';
import { Drawer3dService } from '../../services/drawer3d.service';
import { HistoryService } from '../../services/history.service';
import { Line } from '../../models/line.model';
import { Point } from '../../models/point.model';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'drawer-transformations',
  templateUrl: './transformations.component.html',
  styleUrls: ['./transformations.component.css'],
  providers: [TransformationsService]
})
export class TransformationsComponent implements OnInit {
  moveGroup: FormGroup;
  rotationGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private history: HistoryService,
              private transformations: TransformationsService,
              private drawer: DrawerService) { }

  ngOnInit() {
    this.moveGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
    });
    this.rotationGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      axis: ['x', Validators.required],
      angle: ['', Validators.required]
    });
  }

  move(delta: FormGroup) {
    const moved = this.transformations.move(delta.value.x, delta.value.y);
    this.drawer.drawLines(moved);
  }

  rotate(rotation: FormGroup) {
    const controlPoint = new Point(rotation.value.x, rotation.value.y);
    const rotated = this.transformations.rotate(controlPoint, rotation.value.angle);
    this.drawer.drawLines(rotated);
  }

}
