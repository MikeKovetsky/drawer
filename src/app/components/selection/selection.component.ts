import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Point} from "../../models/point.model";
import {CANVAS_CONFIG} from "../../configs/canvas-config";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnChanges {
  @Input() position: Point;
  absolutePosition: Point = new Point(0,0);

  constructor() { }

  ngOnChanges() {
    if (this.position) {
      this.absolutePosition.x = this.position.x + CANVAS_CONFIG.width / 2;
      this.absolutePosition.y = -this.position.y + CANVAS_CONFIG.height / 2;
    }
  }

}
