import {Injectable} from '@angular/core';
import {Point} from '../models/point.model';
import {Line} from '../models/line.model';
import {HistoryService} from './history.service';
import {DrawerService} from './drawer.service';

@Injectable()
export class PavementService {

  constructor(private history: HistoryService, private drawer: DrawerService) {
  }

  pave(pavementSize: number) {
    const points = this.history.getPoints();
    const borders = this.findBorders(points);
    const offsetX = Math.abs(borders.maxX - borders.minX);
    const offsetY = Math.abs(borders.maxY - borders.minY);
    const lines = this.history.getLines();
    for (let x = -pavementSize; x < pavementSize; x++) {
      for (let y = -pavementSize; y < pavementSize; y++) {
        if (!y && !x) continue; // skip self
        const newLines = this.offsetLines(lines, offsetX * x, offsetY* y);
        this.drawer.drawLines(newLines);
      }
    }
  }

  private offsetLines(lines: Line[], offsetX, offsetY) {
    return lines.map(l => {
      const start = new Point(l.start.x + offsetX, l.start.y + offsetY);
      const end = new Point(l.end.x + offsetX, l.end.y + offsetY);
      return new Line(start, end);
    });
  }

  private findBorders(points: Point[]) {
    return {
      maxX: Math.max.apply(null, points.map(p => p.x)),
      minX: Math.min.apply(null, points.map(p => p.x)),
      maxY: Math.max.apply(null, points.map(p => p.y)),
      minY: Math.min.apply(null, points.map(p => p.y))
    };
  }

}
