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
    this.drawShark();
  }

  drawAnchor() {
    this.drawer.drawCubicCurve(new Point(250, 150), new Point(240, 155), new Point(250, 160), new Point(220, 170));
    this.drawer.drawCubicCurve(new Point(220, 170), new Point(250, 180), new Point(280, 190), new Point(300, 220));
    this.drawer.drawCubicCurve(new Point(300, 220), new Point(340, 170), new Point(320, 130), new Point(300, 100));
    this.drawer.drawCubicCurve(new Point(300, 100), new Point(290, 120), new Point(285, 125), new Point(280, 130));
    this.drawer.drawCubicCurve(new Point(280, 130), new Point(150, -100), new Point(80, 0), new Point(30, -60));
    this.drawer.drawCubicCurve(new Point(30, -60), new Point(30, 20), new Point(-100, 80), new Point(-100, 160));
    this.drawer.drawCubicCurve(new Point(-100, 160), new Point(-110, 155), new Point(-120, 147), new Point(-130, 140));
    this.drawer.drawCubicCurve(new Point(-130, 140), new Point(-110, 180), new Point(-100, 200), new Point(-60, 230));
    this.drawer.drawCubicCurve(new Point(-60, 230), new Point(-70, 210), new Point(-60, 200), new Point(-40, 180));
    this.drawer.drawCubicCurve(new Point(-40, 180), new Point(-50, 175), new Point(-60, 170), new Point(-70, 165));
    this.drawer.drawCubicCurve(new Point(-70, 165), new Point(0, 70), new Point(40, 60), new Point(60, 130));
    this.drawer.drawCubicCurve(new Point(60, 130), new Point(70, 160), new Point(80, 200), new Point(90, 240));
    this.drawer.drawCubicCurve(new Point(90, 240), new Point(100, 242), new Point(110, 240), new Point(120, 238));
    this.drawer.drawCubicCurve(new Point(120, 238), new Point(110, 200), new Point(100, 160), new Point(90, 100));
    this.drawer.drawCubicCurve(new Point(90, 100), new Point(90, 50), new Point(130, 55), new Point(180, 80));
    this.drawer.drawCubicCurve(new Point(180, 80), new Point(230, 120), new Point(250, 130), new Point(250, 150));
    this.drawer.drawCubicCurve(new Point(90, 240), new Point(70, 242), new Point(50, 244), new Point(30, 246));
    this.drawer.drawCubicCurve(new Point(30, 246), new Point(32, 252), new Point(34, 258), new Point(36, 264));
    this.drawer.drawCubicCurve(new Point(36, 266), new Point(96, 262), new Point(166, 258), new Point(226, 254));
    this.drawer.drawCubicCurve(new Point(226, 254), new Point(224, 248), new Point(222, 242), new Point(218, 234));
    this.drawer.drawCubicCurve(new Point(218, 234), new Point(200, 235), new Point(180, 236), new Point(117, 238));
    this.drawer.drawCubicCurve(new Point(92, 264), new Point(110, 300), new Point(130, 300), new Point(128, 259));
    this.drawer.drawCubicCurve(new Point(170, 236), new Point(170, 236), new Point(180, 257), new Point(180, 257));
    this.drawer.drawCubicCurve(new Point(190, 235), new Point(190, 235), new Point(200, 256), new Point(200, 256));
    this.drawer.drawCubicCurve(new Point(40, 245), new Point(40, 245), new Point(46, 264), new Point(46, 264));
    this.drawer.drawCubicCurve(new Point(56, 244), new Point(56, 244), new Point(63, 264), new Point(63, 264));
    this.drawer.drawCubicCurve(new Point(110, 288), new Point(58, 264), new Point(40, 242), new Point(76, 189));
    this.drawer.drawCubicCurve(new Point(110, 288), new Point(78, 264), new Point(60, 242), new Point(80, 200));
    this.drawer.drawCubicCurve(new Point(104, 175), new Point(148, 163), new Point(117, 133), new Point(95, 125));
    this.drawer.drawCubicCurve(new Point(108, 189), new Point(158, 173), new Point(154, 118), new Point(90, 107));
    this.drawer.drawCubicCurve(new Point(59, 127), new Point(-18, 105), new Point(-50, 69), new Point(-126, 24));
    this.drawer.drawCubicCurve(new Point(50, 107), new Point(1, 84), new Point(-62.00, 40.00), new Point(-112, 16));
    this.drawer.drawCubicCurve(new Point(-126, 24), new Point(-126, 24), new Point(-112, 16), new Point(-112, 16));
    this.drawer.drawCubicCurve(new Point(119, 142), new Point(119, 142), new Point(137, 134), new Point(137, 134));
  }

  drawShark() {
    this.drawer.drawCubicCurve(new Point(327, 223), new Point(295, 116), new Point(255, 44), new Point(297, -50));
    this.drawer.drawCubicCurve(new Point(297, -50), new Point(266, -64), new Point(277, -16), new Point(196, 43));
    this.drawer.drawCubicCurve(new Point(196, 43), new Point(196, 43), new Point(148, 33), new Point(148, 33));
    this.drawer.drawCubicCurve(new Point(148, 33), new Point(154, 4), new Point(138, 2), new Point(120, 26));
    this.drawer.drawCubicCurve(new Point(120, 26), new Point(120, 26), new Point(38, 12), new Point(38, 12));
    this.drawer.drawCubicCurve(new Point(38, 12), new Point(61, -114), new Point(37, -108), new Point(-25, -8));
    this.drawer.drawCubicCurve(new Point(-25, -8), new Point(-145, 13), new Point(-209, 50), new Point(-217, 79));
    this.drawer.drawCubicCurve(new Point(-217, 79), new Point(-205, 104), new Point(-166, 135), new Point(-94, 154));
    this.drawer.drawCubicCurve(new Point(-94, 154), new Point(-113, 190), new Point(-120, 233), new Point(-118, 267));
    this.drawer.drawCubicCurve(new Point(-118, 267), new Point(-90, 250), new Point(-66, 219), new Point(-39, 182));
    this.drawer.drawCubicCurve(new Point(-39, 182), new Point(-2, 200), new Point(41, 235), new Point(98, 258));
    this.drawer.drawCubicCurve(new Point(98, 258), new Point(111, 240), new Point(90, 206), new Point(72, 134));
    this.drawer.drawCubicCurve(new Point(72, 134), new Point(72, 134), new Point(96, 126), new Point(96, 126));
    this.drawer.drawCubicCurve(new Point(96, 126), new Point(107, 143), new Point(107, 143), new Point(141, 172));
    this.drawer.drawCubicCurve(new Point(141, 172), new Point(162, 162), new Point(152, 134), new Point(145, 105));
    this.drawer.drawCubicCurve(new Point(145, 105), new Point(145, 105), new Point(190, 90), new Point(190, 90));
    this.drawer.drawCubicCurve(new Point(190, 90), new Point(224, 102), new Point(288, 151), new Point(323, 222));

    this.drawer.drawCubicCurve(new Point(327, 223), new Point(295, 116), new Point(255, 44), new Point(297, -50));
    this.drawer.drawCubicCurve(new Point(297, -50), new Point(266, -64), new Point(277, -16), new Point(196, 43));
    this.drawer.drawCubicCurve(new Point(196, 43), new Point(196, 43), new Point(148, 33), new Point(148, 33));
    this.drawer.drawCubicCurve(new Point(148, 33), new Point(154, 4), new Point(138, 2), new Point(120, 26));
    this.drawer.drawCubicCurve(new Point(120, 26), new Point(120, 26), new Point(38, 12), new Point(38, 12));
    this.drawer.drawCubicCurve(new Point(38, 12), new Point(61, -114), new Point(37, -108), new Point(-25, -8));
    this.drawer.drawCubicCurve(new Point(-25, -8), new Point(-145, 13), new Point(-209, 50), new Point(-217, 79));
    this.drawer.drawCubicCurve(new Point(-217, 79), new Point(-205, 104), new Point(-166, 135), new Point(-94, 154));
    this.drawer.drawCubicCurve(new Point(-94, 154), new Point(-113, 190), new Point(-120, 233), new Point(-118, 267));
    this.drawer.drawCubicCurve(new Point(-118, 267), new Point(-90, 250), new Point(-66, 219), new Point(-39, 182));
    this.drawer.drawCubicCurve(new Point(-39, 182), new Point(-2, 200), new Point(41, 235), new Point(98, 258));
    this.drawer.drawCubicCurve(new Point(98, 258), new Point(111, 240), new Point(90, 206), new Point(72, 134));
    this.drawer.drawCubicCurve(new Point(72, 134), new Point(72, 134), new Point(96, 126), new Point(96, 126));
    this.drawer.drawCubicCurve(new Point(96, 126), new Point(107, 143), new Point(107, 143), new Point(141, 172));
    this.drawer.drawCubicCurve(new Point(141, 172), new Point(162, 162), new Point(152, 134), new Point(145, 105));
    this.drawer.drawCubicCurve(new Point(145, 105), new Point(145, 105), new Point(190, 90), new Point(190, 90));
    this.drawer.drawCubicCurve(new Point(190, 90), new Point(224, 102), new Point(288, 151), new Point(323, 222));

    // this.drawer.drawCubicCurve(new Point(30, 246), new Point(32, 252), new Point(34, 258), new Point(36, 264));
    // this.drawer.drawCubicCurve(new Point(36, 266), new Point(96, 262), new Point(166, 258), new Point(226, 254));
    // this.drawer.drawCubicCurve(new Point(226, 254), new Point(224, 248), new Point(222, 242), new Point(218, 234));
    // this.drawer.drawCubicCurve(new Point(218, 234), new Point(200, 235), new Point(180, 236), new Point(117, 238));
    // this.drawer.drawCubicCurve(new Point(92, 264), new Point(110, 300), new Point(130, 300), new Point(128, 259));
    // this.drawer.drawCubicCurve(new Point(170, 236), new Point(170, 236), new Point(180, 257), new Point(180, 257));
    // this.drawer.drawCubicCurve(new Point(190, 235), new Point(190, 235), new Point(200, 256), new Point(200, 256));
    // this.drawer.drawCubicCurve(new Point(40, 245), new Point(40, 245), new Point(46, 264), new Point(46, 264));
    // this.drawer.drawCubicCurve(new Point(56, 244), new Point(56, 244), new Point(63, 264), new Point(63, 264));
    // this.drawer.drawCubicCurve(new Point(110, 288), new Point(58, 264), new Point(40, 242), new Point(76, 189));
    // this.drawer.drawCubicCurve(new Point(110, 288), new Point(78, 264), new Point(60, 242), new Point(80, 200));
    // this.drawer.drawCubicCurve(new Point(104, 175), new Point(148, 163), new Point(117, 133), new Point(95, 125));
    // this.drawer.drawCubicCurve(new Point(108, 189), new Point(158, 173), new Point(154, 118), new Point(90, 107));
    // this.drawer.drawCubicCurve(new Point(59, 127), new Point(-18, 105), new Point(-50, 69), new Point(-126, 24));
    // this.drawer.drawCubicCurve(new Point(50, 107), new Point(1, 84), new Point(-62.00, 40.00), new Point(-112, 16));
    // this.drawer.drawCubicCurve(new Point(-126, 24), new Point(-126, 24), new Point(-112, 16), new Point(-112, 16));
    // this.drawer.drawCubicCurve(new Point(119, 142), new Point(119, 142), new Point(137, 134), new Point(137, 134));
  }
}
