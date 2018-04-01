import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransformationsService} from './transformations.service';
import {Point} from '../../models/point.model';
import {DrawerService} from '../../services/drawer.service';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'drawer-transformations',
  templateUrl: './transformations.component.html',
  styleUrls: ['./transformations.component.css'],
})
export class TransformationsComponent implements OnInit {
  moveGroup: FormGroup;
  rotationGroup: FormGroup;
  affineGroup: FormGroup;
  projectiveGroup: FormGroup;
  zoomDelta = .1;

  private center = new Point(0, 0);
  private readonly initialZoom = 1;

  constructor(private fb: FormBuilder,
              private transformations: TransformationsService,
              private drawer: DrawerService) { }

  ngOnInit() {
    this.moveGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required]
    });
    this.rotationGroup = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      angle: ['', Validators.required]
    });
    this.affineGroup = this.fb.group({
      r0x: ['', Validators.required],
      r0y: ['', Validators.required],
      r1x: ['', Validators.required],
      r1y: ['', Validators.required],
      r2x: ['', Validators.required],
      r2y: ['', Validators.required]
    });
    this.projectiveGroup = this.fb.group({
      r0x: [0, Validators.required],
      r0y: [0, Validators.required],
      r1x: [1, Validators.required],
      r1y: [100, Validators.required],
      r2x: [100, Validators.required],
      r2y: [100, Validators.required],
      w0: [100, Validators.required],
      wx: [1, Validators.required],
      wy: [1, Validators.required]
    });
  }

  move(delta: FormGroup) {
    const movedLines = this.transformations.move(delta.value.x, delta.value.y);
    this.drawer.drawLines(movedLines);
  }

  rotate(rotation: FormGroup) {
    const controlPoint = new Point(rotation.value.x, rotation.value.y);
    const rotatedLines = this.transformations.rotate(controlPoint, rotation.value.angle);
    this.drawer.drawLines(rotatedLines);
  }

  scale(zoom: number) {
    const scaledLines = this.transformations.scale(this.initialZoom + zoom);
    this.drawer.drawLines(scaledLines);
  }
}
