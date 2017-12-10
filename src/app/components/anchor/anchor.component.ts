import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import { Point } from '../../models/point.model';

@Component({
  selector: 'drawer-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.css']
})
export class AnchorComponent implements OnInit {

  constructor(private drawer: DrawerService) { }

  ngOnInit() {
    this.drawAnchor();
  }

  drawAnchor() {
    this.drawer.drawCubicCurve(new Point(1,2), new Point(100, 100), new Point(60, 60), new Point(20,20));
  }
}
