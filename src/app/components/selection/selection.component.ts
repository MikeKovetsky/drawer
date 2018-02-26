import {Component, Input, OnChanges} from '@angular/core';
import {Point} from '../../models/point.model';
import {HelpersService} from '../../services/helpers.service';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'drawer-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnChanges {
  @Input() position: Point;
  absolutePosition: Point = new Point();

  constructor(private helpersService: HelpersService, private tools: ToolsService) {
  }

  ngOnChanges() {
    if (this.position) {
      this.absolutePosition = this.helpersService.toAbsoluteCoordinates(this.position);
    } else {
      this.absolutePosition = null;
    }
  }

  get splitMode() {
    return this.tools.splitMode;
  }

}
