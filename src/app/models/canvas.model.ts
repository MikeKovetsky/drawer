interface Config {
  width: number;
  height: number;
  vectorLength: number;
  zoom: number;
}

export class DrawerCanvas {
  width: number;
  height: number;
  vectorLength: number;
  zoom: number;
  canvas;

  constructor(canvas, config: Config) {
    this.width = config.width;
    this.height = config.height;
    this.vectorLength = config.vectorLength;
    this.zoom = config.zoom;
    this.canvas = canvas;
    this.canvas.setAttribute('width', config.width);
    this.canvas.setAttribute('height', config.height);
  }

  getContext(): CanvasRenderingContext2D | null {
    if (this.canvas.getContext) {
      return this.canvas.getContext('2d');
    } else {
      alert('Browser is too old');
    }
  }
}
