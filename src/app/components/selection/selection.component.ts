import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {Point} from '../../models/point.model';
import {HelpersService} from '../../services/helpers.service';

@Component({
  selector: 'drawer-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionComponent implements OnChanges {
  @Input() position: Point;
  absolutePosition: Point = new Point();

  constructor(private helpersService: HelpersService) {
  }

  ngOnChanges() {
    if (this.position) {
      this.absolutePosition = this.helpersService.toAbsoluteCoordinates(this.position);
    } else {
      this.absolutePosition = null;
    }
  }
}
