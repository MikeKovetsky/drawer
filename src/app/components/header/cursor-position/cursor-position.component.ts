import {Component, OnInit} from '@angular/core';
import {CursorPositionService} from "../../../services/cursor-position.service";
import {Point} from "../../../models/point.model";
import {ScaleService} from '../../../services/scale.service';

@Component({
  selector: 'drawer-cursor-position',
  templateUrl: './cursor-position.component.html',
  styleUrls: ['./cursor-position.component.css'],
})
export class CursorPositionComponent implements OnInit {
  position = new Point();

  constructor(private cursorPosition: CursorPositionService, private scale: ScaleService) {
  }

  ngOnInit() {
    this.cursorPosition.coordinates$.asObservable().subscribe(pos => {
      this.position = new Point(pos.x / this.scale.zoom, pos.y / this.scale.zoom);
    })
  }


}
