import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransformationsService} from "./transformations.service";
import { Point3d } from '../../models/point3d.model';
import { Drawer3dService } from '../../services/drawer3d.service';
import { HistoryService } from '../../services/history.service';

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
              private drawer3d: Drawer3dService) { }

  ngOnInit() {
    this.moveGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      z: ['', Validators.required]
    });
    this.rotationGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      z: ['', Validators.required],
      angle: ['', Validators.required]
    });
  }

  move(delta: FormGroup) {
    const lines = this.history.history3d$.value;
    const controlPoint = new Point3d(delta.value.x, delta.value.y, delta.value.z);
    const movedLines = this.transformations.move(lines, controlPoint);
    this.history.clear();
    this.drawer3d.drawLines(movedLines);
  }

  // rotate(rotation: FormGroup) {
  //   const controlPoint = new Point3d(rotation.value.x, rotation.value.y, rotation.value.z);
  //   const rotatedLines = this.transformations.rotate(controlPoint, rotation.value.angle);
  //   const projectedVertices = rotatedLines.map(this.drawer.projectPointByCabinet);
  //   this.drawer.drawLines(projectedVertices);
  // }
}
