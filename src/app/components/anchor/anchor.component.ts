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
    this.drawer.drawCubicCurve(new Point(250, 150), new Point(240, 155), new Point(250, 160), new Point(220, 170));
    this.drawer.drawCubicCurve(new Point(220, 170), new Point(240, 180), new Point(280, 190), new Point(300, 220));
    this.drawer.drawCubicCurve(new Point(300, 220), new Point(340, 170), new Point(320, 130), new Point(300, 100));
    this.drawer.drawCubicCurve(new Point(300, 100), new Point(290, 120), new Point(285, 125), new Point(280, 130));
    this.drawer.drawCubicCurve(new Point(280, 130), new Point(220, -100), new Point(100, 0), new Point(80, -80));
    this.drawer.drawCubicCurve(new Point(80, -80), new Point(100, -20), new Point(-100, 80), new Point(-100, 160));
    this.drawer.drawCubicCurve(new Point(-100, 160), new Point(-110, 155), new Point(-120, 147), new Point(-130, 140));
    this.drawer.drawCubicCurve(new Point(-130, 140), new Point(-110, 180), new Point(-100, 200), new Point(-60, 230));
    this.drawer.drawCubicCurve(new Point(-60, 230), new Point(-70, 210), new Point(-60, 200), new Point(-40, 180));
    this.drawer.drawCubicCurve(new Point(-40, 180), new Point(-50, 175), new Point(-60, 170), new Point(-70, 165));
    this.drawer.drawCubicCurve(new Point(-70, 165), new Point(0, 70), new Point(40, 60), new Point(50, 125));
  }
}
