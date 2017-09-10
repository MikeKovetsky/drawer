import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {SupportedLineType} from "../../configs/supported-lines";

import {DrawerService} from "../../services/drawer.service";
import {SelectionService} from "../../services/selection.service";
import {HistoryService} from "../../services/history.service";

@Component({
  selector: 'drawer-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  readonly lineTypes = SupportedLineType;
  lineType = this.lineTypes.Line;

  constructor(private drawer: DrawerService,
              private history: HistoryService,
              private selection: SelectionService) {
  }

  add(event: FormGroup, lineType: SupportedLineType) {
    const points = event.value;
    switch (lineType) {
      case (this.lineTypes.Line):
        this.drawer.drawLine(points.p1, points.p2);
        this.history.add([points.p1, points.p2], lineType);
        this.selection.set(points.p2);
        break;
      case (this.lineTypes.QuadraticCurve):
        this.drawer.drawLine(points.p1, points.p2, points.controlPoint);
        this.history.add([points.p1, points.p2, points.controlPoint], lineType);
        this.selection.set(points.p2);
        break;
      case (this.lineTypes.Circle):
        this.drawer.drawCircle(points.circleCenter, points.radius);
        this.history.add([points.circleCenter], lineType);
        this.selection.set(points.circleCenter);
        break;
    }
  }
}
