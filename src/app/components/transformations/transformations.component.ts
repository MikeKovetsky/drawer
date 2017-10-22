import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransformationsService} from "./transformations.service";

@Component({
  selector: 'drawer-transformations',
  templateUrl: './transformations.component.html',
  styleUrls: ['./transformations.component.css'],
  providers: [TransformationsService]
})
export class TransformationsComponent implements OnInit {
  moveGroup: FormGroup;
  rotationGroup: FormGroup;
  affineGroup: FormGroup;
  homographyGroup: FormGroup;

  constructor(private fb: FormBuilder, private transformations: TransformationsService) { }

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
    this.homographyGroup = this.fb.group({
      w0: ['', Validators.required],
      wx: ['', Validators.required],
      wy: ['', Validators.required]
    })
  }

  move(delta: FormGroup) {
    this.transformations.move(delta.value.x, delta.value.y);
  }

}
