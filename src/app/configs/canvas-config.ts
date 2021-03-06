export const CANVAS_CONFIG = {
  width: 600,
  height: 600,
  vectorLength: 20,
  zoom: 1
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
