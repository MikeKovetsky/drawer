
import {Point} from "./point.model";

export class Drawer {
  canvas;
  context;
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext();
    this.context.imageSmoothingQuality = "high";
    this.initGrid();
    this.initAxis();
  }

  initGrid() {
    this.context.globalAlpha = 0.2;
    for (let i = 0; i < this.canvas.width; i += this.canvas.vectorLength) {
      //vertical lines
      this.drawLine(new Point(i, 0), new Point(i, this.canvas.height));
    }
    for (let i = 0; i < this.canvas.height; i += this.canvas.vectorLength) {
      //horizontal lines
      this.drawLine(new Point(0, i) , new Point(this.canvas.width, i));
    }
  }
  initAxis() {
    this.context.globalAlpha = 1;
    //x and y axis
    this.drawLine(new Point(0, this.canvas.height / 2) , new Point(this.canvas.width, this.canvas.height / 2));
    this.drawLine(new Point(this.canvas.width / 2, 0) , new Point(this.canvas.width / 2, this.canvas.height));
    for (let i = 0; i < this.canvas.height; i += this.canvas.vectorLength) {
      const helperStrokeStart = new Point(this.canvas.width / 2 - this.canvas.vectorLength / 2, i);
      const helperStrokeEnd = new Point(this.canvas.width / 2 + this.canvas.vectorLength / 2, i);
      this.drawLine(helperStrokeStart, helperStrokeEnd);
    }
    for (let i = 0; i < this.canvas.width; i += this.canvas.vectorLength) {
      const helperStrokeStart  = new Point(i, this.canvas.height / 2 - this.canvas.vectorLength / 2);
      const helperStrokeEnd  = new Point(i, this.canvas.height / 2 + this.canvas.vectorLength / 2);
      this.drawLine(helperStrokeStart , helperStrokeEnd);
    }
    // set the canvas origin (0,0) to center canvas
    // All coordinates$ to the left of center canvas are negative
    // All coordinates$ below center canvas are negative
    this.context.translate(this.canvas.width/2, this.canvas.height/2);
  }

  drawLine(p1, p2) {
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
  }
}
