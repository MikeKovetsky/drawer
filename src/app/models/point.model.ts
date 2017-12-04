export class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  round() {
    this.x = +(this.x).toFixed(2);
    this.y = +(this.y).toFixed(2);
  }
}
