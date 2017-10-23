import { Injectable } from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {DrawerService} from "../../services/drawer.service";
import {Point} from "../../models/point.model";

@Injectable()
export class TransformationsService {

  constructor(private history: HistoryService,
              private drawer: DrawerService) { }

  move(deltaX: number, deltaY: number) {
    const points = this.history.getPoints();
    this.history.clear();
    points.forEach((point, index, points) => {
      if (index === 0) return;
      const newStart = new Point(points[index-1].x + deltaX, points[index-1].y + deltaY);
      const newEnd = new Point(point.x + deltaX, point.y + deltaY);
      this.drawer.drawLine(newStart, newEnd);
    })
  }

}
