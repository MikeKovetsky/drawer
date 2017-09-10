import {Component, OnInit} from '@angular/core';
import {CursorPositionService} from "../../services/cursor-position.service";
import {Point} from "../../models/point.model";

@Component({
  selector: 'drawer-cursor-position',
  templateUrl: './cursor-position.component.html',
  styleUrls: ['./cursor-position.component.css'],
})
export class CursorPositionComponent implements OnInit {
  position = new Point();

  constructor(private cursorPosition: CursorPositionService) {
  }

  ngOnInit() {
    this.cursorPosition.coordinates$.asObservable().subscribe(pos => {
      this.position = pos;
    })
  }


}
