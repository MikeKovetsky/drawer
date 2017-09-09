export class DrawerCanvas {
  width: number;
  height: number;
  vectorLength: number;
  canvas;
  constructor(canvas, width: number, height: number, vectorLength: number) {
    this.width = width;
    this.height = height;
    this.vectorLength = vectorLength;
    this.canvas = canvas;
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
  }
  getContext(): CanvasRenderingContext2D | null {
    if (this.canvas.getContext) {
      return this.canvas.getContext('2d');
    } else {
      alert('Browser is too old');
    }
  }
}
