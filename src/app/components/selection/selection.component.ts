import {Component, Input, OnChanges} from '@angular/core';
import {Point} from "../../models/point.model";
import {HelpersService} from "../../services/helpers.service";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnChanges {
  @Input() position: Point;
  absolutePosition: Point = new Point(0,0);

  constructor(private helpersService: HelpersService) { }

  ngOnChanges() {
    if (this.position) {
      this.absolutePosition =
        this.helpersService.toAbsoluteCoordinates(this.position);
    }
  }

}
