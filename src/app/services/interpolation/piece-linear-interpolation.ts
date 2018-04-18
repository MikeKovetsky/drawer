import {Interpolation} from './interpolation';
import {Point} from '../../models/point.model';

class PieceLinearInterpolation extends Interpolation {

  constructor(points: Point[]) {
    super(points);
  }

  executeInterpolation(x: number, listX: number[], listY: number[]) {
    let y = 0;
    for (let i = 1; i < listX.length; i++) {
      y = listY[i - 1] + (x - listX[i - 1]) * ((listY[i] - listY[i - 1]) / (listX[i] - listX[i - 1]));
    }
    return y;
  }
}
