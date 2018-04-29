import {Interpolation} from './interpolation';
import {Point} from '../../models/point.model';

export class LagrangePolynomial extends Interpolation {

  constructor(points: Point[]) {
    super(points);
  }

  executeInterpolation(x: number, listX: number[], listY: number[]) {
    let result = 0;
    let size = listX.length;
    for (let i = 0; i < size; i++) {
      let basicsPol = 1;
      for (let j = 0; j < size; j++) {
        if (j != i) {
          basicsPol *= (x - listX[j]) / (listX[i] - listX[j]);
        }
      }
      result += basicsPol * listY[i];
    }
    return result;
  }
}
