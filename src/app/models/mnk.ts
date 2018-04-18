import {Point} from './point.model';
import {Matrix} from './matrix';

export class MNK_Class {
  private points: Point[];
  private listX: any[];
  private listY: any[];
  private aLine: number;
  private bLine: number;
  private aParabola: number;
  private bParabola: number;
  private cParabola: number;

  constructor(points: Point[]) {
    this.points = points;
    this.listX = [];
    this.listY = [];
    for (let point of points) {
      this.listX.push(point.x);
      this.listY.push(point.y);
    }
  }

  calculatePointsUsingOrdinaryLeastSquaresByLine(): Point[] {
    let points = [];
    let n = this.listX.length;
    const sumOfListX = this.calculateSum(this.listX);
    const sumOfListY = this.calculateSum(this.listY);
    const sumOfSquaredListX = this.calculateSum(this.multiplyItemsFromTheSameLists(2, this.listX));
    const sumOfMultipliedListXListY = this.calculateSum(this.multiplyItemsFromTwoLists(this.listX, this.listY));
    const mainMatrix = new Matrix([[sumOfListX, n], [sumOfSquaredListX, sumOfListX]]);
    const mainDeterminant = mainMatrix.calculateDeterminant(mainMatrix.matrix);
    this.aLine = this.calculateCoefficient(mainDeterminant, new Matrix([[sumOfListY, n], [sumOfMultipliedListXListY, sumOfListX]]));
    this.bLine = this.calculateCoefficient(mainDeterminant, new Matrix([[sumOfListX, sumOfListY], [sumOfSquaredListX, sumOfMultipliedListXListY]]));
    alert('Line a:' + this.aLine + 'b: ' + this.bLine);
    for (let x = -500; x <= 500; x += 1) {
      points.push(new Point(x, this.calculateYUsingOrdinaryLeastSquaresByLine(x)));
    }
    return points;
  }

  public calculatePointsUsingOrdinaryLeastSquaresByParabola(): Point[] {
    let points = [];
    let n = this.listX.length;
    const sumOfListX = this.calculateSum(this.listX);
    const sumOfListY = this.calculateSum(this.listY);
    const sumOfSquaredListX = this.calculateSum(this.multiplyItemsFromTheSameLists(2, this.listX));
    const sumOfCubedListX = this.calculateSum(this.multiplyItemsFromTheSameLists(3, this.listX));
    const sumOfListXInFourthDegree = this.calculateSum(this.multiplyItemsFromTheSameLists(4, this.listX));
    const sumOfMultipliedListXListY = this.calculateSum(this.multiplyItemsFromTwoLists(this.listX, this.listY));
    const sumOfMultipliedSquaredListXListY = this.calculateSum(this.multiplyItemsFromTwoLists(this.multiplyItemsFromTheSameLists(2, this.listX), this.listY));
    const mainMatrix = new Matrix([[sumOfSquaredListX, sumOfListX, n], [sumOfCubedListX, sumOfSquaredListX, sumOfListX], [sumOfListXInFourthDegree, sumOfCubedListX, sumOfSquaredListX]]);
    const mainDeterminant = mainMatrix.calculateDeterminant(mainMatrix.matrix);
    const matrixA = new Matrix([[sumOfListY, sumOfListX, n], [sumOfMultipliedListXListY, sumOfSquaredListX, sumOfListX], [sumOfMultipliedSquaredListXListY, sumOfCubedListX, sumOfSquaredListX]]);
    this.aParabola = this.calculateCoefficient(mainDeterminant, matrixA);
    const matrixB = new Matrix([[sumOfSquaredListX, sumOfListY, n], [sumOfCubedListX, sumOfMultipliedListXListY, sumOfListX], [sumOfListXInFourthDegree, sumOfMultipliedSquaredListXListY, sumOfSquaredListX]]);
    this.bParabola = this.calculateCoefficient(mainDeterminant, matrixB);
    const matrixC = new Matrix([[sumOfSquaredListX, sumOfListX, sumOfListY], [sumOfCubedListX, sumOfSquaredListX, sumOfMultipliedListXListY], [sumOfListXInFourthDegree, sumOfCubedListX, sumOfMultipliedSquaredListXListY]]);
    this.cParabola = this.calculateCoefficient(mainDeterminant, matrixC);
    alert('Parabola a:' + this.aParabola + 'b: ' + this.bParabola + 'c:' + this.cParabola);
    for (let x = -500; x <= 500; x += 1) {
      points.push(new Point(x, this.calculateYUsingOrdinaryLeastSquaresByParabola(x)));
    }
    return points;
  }

  calculateYUsingOrdinaryLeastSquaresByLine(x: number) {
    return this.aLine * x + this.bLine;
  }

  calculateYUsingOrdinaryLeastSquaresByParabola(x: number) {
    return this.aParabola * Math.pow(x, 2) + this.bParabola * x + this.cParabola;
  }

  multiplyItemsFromTwoLists(listX: number[], listY) {
    let resultList = [];
    for (let i = 0; i < listX.length; i++) {
      resultList.push(listX[i] * listY[i]);
    }
    return resultList;
  }

  multiplyItemsFromTheSameLists(power: number, list: number[]) {
    let resultList = [];
    for (let element of list) {
      resultList.push(Math.pow(element, power));
    }
    return resultList;
  }

  private calculateCoefficient(mainDeterminant: number, coefMatrix: Matrix) {
    return coefMatrix.calculateDeterminant(coefMatrix.matrix) / mainDeterminant;
  }

  private calculateSum(list: number[]) {
    let sum = 0;
    for (let element of list) {
      sum += element;
    }
    return sum;
  }
}
