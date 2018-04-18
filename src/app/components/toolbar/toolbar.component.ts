import {Component} from '@angular/core';
import {SupportedLineType} from '../../configs/supported-lines';

@Component({
  selector: 'drawer-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  readonly lineTypes = SupportedLineType;
  lineType = this.lineTypes.Line;

  constructor() {
  }

}
