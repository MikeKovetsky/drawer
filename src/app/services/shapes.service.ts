import {Injectable} from '@angular/core';
import {DrawerService} from "./drawer.service";
import {Point} from "../models/point.model";
import {HelpersService} from "./helpers.service";

@Injectable()
export class ShapesService {

  constructor(private drawer: DrawerService,
              private helpers: HelpersService) {
  }

  drawTenth() {
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(-60, -120), new Point(60, -120));
    this.drawer.enableSizeLines = false;
    this.drawer.drawLine(new Point(-60, -120), new Point(-120, 40));
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(60, -120), new Point(120, 40));
    this.drawer.enableSizeLines = false;
    this.drawer.drawLine(new Point(-120, 40), new Point(-120, 100));
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(120, 40), new Point(120, 100));
    this.drawer.enableSizeLines = false;
    this.drawer.drawCircle(new Point(280, 100), 400, 1, 1.098);
    this.drawer.enableSizeLines = true;
    this.drawer.drawCircle(new Point(-280, 100), 400, 1.902, 2);
    this.drawer.enableSizeLines = false;
    this.drawer.drawLine(new Point(100, 220), new Point(60, 220));
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(-100, 220), new Point(-60, 220));
    this.drawer.enableSizeLines = false;
    this.drawer.drawLine(new Point(60, 220), new Point(40, 210));
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(-60, 220), new Point(-40, 210));
    this.drawer.enableSizeLines = false;
    this.drawer.drawLine(new Point(40, 210), new Point(40, 0));
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(-40, 210), new Point(-40, 0));
    this.drawer.drawCircle(new Point(0, 0), 40, 0, 1);

    this.drawer.enableSizeLines = false;
    this.drawer.drawLine(new Point(0, -60), new Point(-20, -80));
    this.drawer.drawLine(new Point(-20, -80), new Point(-0, -100));
    this.drawer.drawLine(new Point(0, -100), new Point(20, -80));
    this.drawer.enableSizeLines = true;
    this.drawer.drawLine(new Point(20, -80), new Point(0, -60));

    this.drawer.drawCircle(new Point(80, 120), 20);
    this.drawer.drawCircle(new Point(-80, 120), 20);
  }

  drawOvals(center: Point) {
    const a = 100;
    const b = 100;
    const points = [];
    for (let i = 0; i < 2 * Math.PI; i += 0.01){
      const r = Math.sqrt(Math.pow(b, 2) * Math.cos(2 * i) + Math.sqrt(Math.pow(b, 4) * Math.pow(Math.cos(2 * i), 2) + Math.pow(a, 4) - Math.pow(b, 4)));
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);
      points.push(new Point(center.x + x, center.y + y));
    }
    this.drawer.enableSizeLines = false;
    points.forEach((point, index) => {
      if (index === 0) return;
      this.drawer.drawLine(points[index - 1], point);
    });
    this.drawer.enableSizeLines = true;
    // this.drawer.drawTangent(new Point(122.74, 37.97));
  }

}
