import {Injectable} from '@angular/core';
import {DrawerService} from "./drawer.service";
import {Point} from "../models/point.model";

@Injectable()
export class ShapesService {

  constructor(private drawer: DrawerService) {
  }

  drawTenth() {
    this.drawer.drawLine(new Point(-60, -120), new Point(60, -120));
    this.drawer.drawLine(new Point(-60, -120), new Point(-120, 40));
    this.drawer.drawLine(new Point(60, -120), new Point(120, 40));
    this.drawer.drawLine(new Point(-120, 40), new Point(-120, 100));
    this.drawer.drawLine(new Point(120, 40), new Point(120, 100));
    this.drawer.drawCircle(new Point(280, 100), 400, 1, 1.098);
    this.drawer.drawCircle(new Point(-280, 100), 400, 1.902, 2);
    this.drawer.drawLine(new Point(100, 220), new Point(60, 220));
    this.drawer.drawLine(new Point(-100, 220), new Point(-60, 220));
    this.drawer.drawLine(new Point(60, 220), new Point(40, 210));
    this.drawer.drawLine(new Point(-60, 220), new Point(-40, 210));
    this.drawer.drawLine(new Point(40, 210), new Point(40, 0));
    this.drawer.drawLine(new Point(-40, 210), new Point(-40, 0));
    this.drawer.drawCircle(new Point(0, 0), 40, 0, 1);

    this.drawer.drawLine(new Point(0, -60), new Point(-20, -80));
    this.drawer.drawLine(new Point(-20, -80), new Point(-0, -100));
    this.drawer.drawLine(new Point(0, -100), new Point(20, -80));
    this.drawer.drawLine(new Point(20, -80), new Point(0, -60));

    this.drawer.drawCircle(new Point(80, 120), 20);
    this.drawer.drawCircle(new Point(-80, 120), 20);
  }

}
