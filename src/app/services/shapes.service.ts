import {Injectable} from '@angular/core';
import {DrawerService} from "./drawer.service";
import {Point} from "../models/point.model";
import {Line} from '../models/line.model';

@Injectable()
export class ShapesService {
  private readonly FLOAT_PRECISION = 2;


  constructor(private drawer: DrawerService) {
  }

  drawOvals(center: Point, a: number, b: number, precision = 0.01) {
    const points = [];
    for (let i = 0; i < 2 * Math.PI; i += precision) {
      const r = Math.sqrt(
        Math.pow(b, 2) * Math.cos(2 * i) + Math.sqrt(Math.pow(b, 4) *
        Math.pow(Math.cos(2 * i), 2) + Math.pow(a, 4) - Math.pow(b, 4))
      );
      const x = +(r * Math.cos(i)).toFixed(this.FLOAT_PRECISION);
      const y = +(r * Math.sin(i)).toFixed(this.FLOAT_PRECISION);
      points.push(new Point(center.x + x, center.y + y));
    }
    this.drawer.enableSizeLines = false;
    points.forEach((point, index) => {
      if (index === 0) {
        return;
      }
      this.drawer.drawLine(points[index - 1], point);
    });
    this.drawer.enableSizeLines = true;
  }

  drawCube(height: number) {
    this.drawer.drawLine(new Point(-height, -height), new Point(-height, height));
    this.drawer.drawLine(new Point(-height, -height), new Point(height, -height));
    this.drawer.drawLine(new Point(height, height), new Point(-height, height));
    this.drawer.drawLine(new Point(height, height), new Point(height, -height));
  }

  drawPegasus() {
    this.drawer.enableSizeLines = false;
    const points = [
      new Point(0, 60),
      new Point(4, 75),
      new Point(30, 80),
      new Point(50, 150),
      new Point(25, 148),
      new Point(35, 154),
      new Point(30, 166),
      new Point(38, 176),
      new Point(80, 180),
      new Point(130, 170),
      new Point(150, 140),
      new Point(120, 90),
      new Point(140, 85),
      new Point(148, 110),
      new Point(200, 140),
      new Point(225, 142),
      new Point(215, 80),
      new Point(190, 80),
      new Point(187, 70),
      new Point(220, 50),
      new Point(230, 54),
      new Point(205, 70),
      new Point(266, 60),
      new Point(220, 40),
      new Point(200, 10),
      new Point(220, -20),
      new Point(170, -60),
      new Point(165, -80),
      new Point(150, -75),
      new Point(180, -20),
      new Point(150, 20),
      new Point(100, 30),
      new Point(50, 10),
      new Point(40, 0),
      new Point(60, -10),
      new Point(0, -50),
      new Point(-10, -35),
      new Point(10, -10),
      new Point(40, 10),
      new Point(20, 20),
    ];
    for (let i = 0; i < points.length; i++) {
      if (!i) continue;
      this.drawer.drawLine(points[i-1], points[i]);
    }
  }

}
