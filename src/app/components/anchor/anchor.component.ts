import {Component, OnInit} from '@angular/core';
import {DrawerService} from '../../services/drawer.service';
import {Point} from '../../models/point.model';
import {HistoryService} from "../../services/history.service";
import {SHARK} from "./shark";
import {ANCHOR} from "./anchor";

@Component({
  selector: 'drawer-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.css']
})
export class AnchorComponent implements OnInit {
  constructor(private drawer: DrawerService,
              private history: HistoryService) {
  }

  ngOnInit() {
    this.drawFigure(ANCHOR);
  }

  drawAnchor() {
    this.drawFigure(ANCHOR);
  }

  drawShark() {
    this.drawFigure(SHARK);
  }

  animate() {
    let t = 0;
    const interval = setInterval(() => {
      const anchorPoints: Point[] = this.getFigurePoints(ANCHOR);
      const sharkPoints: Point[] = this.getFigurePoints(SHARK);
      this.history.clear();
      const intermediateValues: Point[] = [];
      for (let i = 0; i < anchorPoints.length; i++) {
        const x = anchorPoints[i].x * (1 - t) + sharkPoints[i].x * t;
        const y = anchorPoints[i].y * (1 - t) + sharkPoints[i].y * t;
        intermediateValues.push(new Point(x, y));
      }

      for (let i = 0; i < intermediateValues.length; i += 4) {
        this.drawer.drawCubicCurve(intermediateValues[i],
          intermediateValues[i + 1],
          intermediateValues[i + 2],
          intermediateValues[i + 3]
        );
      }
      t += 0.1;

      if (t > 1) {
        clearInterval(interval);
      }
    }, 300);
  }

  drawFigure(figure) {
    figure.forEach((curve) => {
      const points = curve.map((point: Point) => new Point(point.x, point.y));
      this.drawer.drawCubicCurve(points[0], points[1], points[2], points[3]);
    })
  }

  getFigurePoints(figure) {
    const points = [];
    figure.forEach((curve) => {
      const vertexes = curve.map((point: Point) => new Point(point.x, point.y));
      vertexes.forEach(p => {
        points.push(p);
      })
    })
    return points;
  }

}
