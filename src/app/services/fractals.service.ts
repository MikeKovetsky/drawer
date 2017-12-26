import {Injectable} from '@angular/core';
import {Point} from "../models/point.model";
import {DrawerService} from "./drawer.service";

@Injectable()
export class FractalsService {
  MAX_ITERATION = 6;
  private readonly rules = [
    ['X', 'XFYFX+F+YFXFY-F-XFYFX'],
    ['Y', 'YFXFY-F-XFYFX+F+YFXFY']
  ];
  private readonly angle = 90;
  private readonly start = new Point(10, 10);

  constructor(private drawer: DrawerService) {
  }

  systemL(iteration: number) {

    let currentAxiom = 'X';
    let next = currentAxiom;
    let found: boolean;

    let depth = 0;
    while (depth < iteration) {
      currentAxiom = next;
      next = '';

      for (const step of currentAxiom) {
        found = false;
        for (const item of this.rules) {
          if (step === item[0]) {
            next += item[1];
            found = true;
          }
        }
        if (!found) {
          next += step;
        }
      }
      depth++;
    }
    this.drawLSystem(next, iteration);
  }

  private drawLSystem(lsystem: string, iteration: number) {
    let dx = Math.pow(2, this.MAX_ITERATION - iteration);
    let dy = 0;

    let rx, ry;

    let x = this.start.x;
    let y = this.start.y;
    let radian;

    for (const item of lsystem) {
      switch (item) {
        case 'F':
          this.drawer.drawLine(new Point(x, y), new Point(x + dx, y + dy));
          x += dx;
          y += dy;
          break;
        case '+':
          rx = dx;
          ry = dy;
          radian = Math.PI * this.angle / 180.0;
          dx = rx * Math.cos(radian) - ry * Math.sin(radian);
          dy = rx * Math.sin(radian) + ry * Math.cos(radian);
          break;
        case '-':
          rx = dx;
          ry = dy;
          radian = Math.PI * this.angle / 180.0;
          dx = rx * Math.cos(-radian) - ry * Math.sin(-radian);
          dy = rx * Math.sin(-radian) + ry * Math.cos(-radian);
          break;
        default:
          break;
      }
    }
  }
}
