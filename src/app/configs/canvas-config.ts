export const CANVAS_CONFIG = {
  width: 1000,
  height: 600,
  vectorLength: 20
};

export const GRID_CONFIG = {
  minX: -CANVAS_CONFIG.width / 2,
  maxX: CANVAS_CONFIG.width / 2,
  minY: -CANVAS_CONFIG.height / 2,
  maxY: CANVAS_CONFIG.width / 2
};


export enum CircleDrawingMethod {
  Custom, Native
}
