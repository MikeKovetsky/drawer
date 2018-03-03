import {Injectable} from '@angular/core';
import {DrawerService} from "./drawer.service";
import {Point} from "../models/point.model";

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

}
