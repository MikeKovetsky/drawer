import {Component, OnInit} from '@angular/core';
import {DrawerService} from '../../services/drawer.service';
import {Point} from '../../models/point.model';
import {HistoryService} from '../../services/history.service';
import {SHARK} from './shark';
import {ANCHOR} from './anchor';
import {ControlPointsService} from '../../services/control-points.service';
import {FractalsService} from '../../services/fractals.service';

@Component({
  selector: 'drawer-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.css']
})
export class AnchorComponent {

  constructor(private drawer: DrawerService,
              private fractals: FractalsService,
              private controlPoints: ControlPointsService,
              private history: HistoryService) {
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
      t += 0.05;

      if (t >= 1.05) {
        clearInterval(interval);
      }
    }, 100);
  }

  drawFigure(figure) {
    this.history.clear();
    this.history.currentFigure = figure;
    const controlPoints = this.drawer.drawFigure(figure);
    this.controlPoints.controls$.next(controlPoints);
  }

  getFigurePoints(figure) {
    const points = [];
    figure.forEach((curve) => {
      const vertexes = curve.map((point: Point) => new Point(point.x, point.y));
      vertexes.forEach(p => {
        points.push(p);
      });
    });
    return points;
  }

  drawFractal(iteration: number) {
    if (iteration < 1 || iteration > this.fractals.MAX_ITERATION) {
      alert('Invalid iteration!');
      return;
    }
    const prevSizeLinesMode = this.drawer.enableSizeLines;
    this.drawer.enableSizeLines = false;
    this.fractals.systemL(iteration);
    this.drawer.enableSizeLines = prevSizeLinesMode;
  }
}
