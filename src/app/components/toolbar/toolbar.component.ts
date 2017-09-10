import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {DrawerService} from "../../services/drawer.service";
import {SelectionService} from "../../services/selection.service";
import {SupportedLineType} from "../../configs/supported-lines";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  readonly lineTypes = SupportedLineType;
  lineType = this.lineTypes.Line;

  constructor(private drawer: DrawerService,
              private selection: SelectionService) {
  }

  ngOnInit() {

  }

  add(event: FormGroup, lineType: SupportedLineType) {
    const points = event.value;
    switch (lineType) {
      case (this.lineTypes.Line):
        this.drawer.drawLine(points.p1, points.p2);
        this.selection.set(points.p2);
        break;
      case (this.lineTypes.QuadraticCurve):
        this.drawer.drawLine(points.p1, points.p2, points.controlPoint);
        this.selection.set(points.p2);
        break;
      case (this.lineTypes.Circle):
        this.drawer.drawCircle(points.circleCenter, points.radius);
        this.selection.set(points.circleCenter);
        break;
    }
  }
}
