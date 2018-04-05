export class Matrix {
  matrix: number[][];
  determinant: number;

  constructor(matrix: number[][]) {
    this.matrix = matrix;
  }

  calculateDeterminant(matrix: number[][]): number {
    let calcResult = 0.0;
    if (matrix.length == 2) {
      calcResult = matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
    } else {
      let coeff = 1;
      for (let i = 0; i < matrix.length; i++) {
        if (i % 2 == 1) {
          coeff = -1;
        } else {
          coeff = 1;
        }
        //собственно разложение:
        calcResult += coeff * matrix[0][i] * this.calculateDeterminant(this.getMinor(matrix, 0, i));
      }
    }
    //возвращаем ответ
    return calcResult;
  }

  private initWithZeros(length: number) {
    const matrix = [];
    for (let i = 0; i < length; i++) {
      matrix[i] = [];
      for (let j = 0; j < length; j++) {
        matrix[i][j] = 0;
      }
    }
    return matrix;
  }

  //функция, к-я возвращает нужный нам минор. На входе - определитель, из к-го надо достать минор и номера строк-столбцов, к-е надо вычеркнуть.
  private getMinor(matrix: number[][], row: number, column: number): number[][] {
    const minorLength = matrix.length - 1;
    const minor = this.initWithZeros(minorLength);
    let dI = 0;//эти переменные для того, чтобы "пропускать" ненужные строку и столбец
    let dJ = 0;
    for (let i = 0; i <= minorLength; i++) {
      dJ = 0;
      for (let j = 0; j <= minorLength; j++) {
        if (i == row) {
          dI = 1;
        } else {
          if (j == column) {
            dJ = 1;
          } else {
            minor[i - dI][j - dJ] = matrix[i][j];
          }
        }
      }
    }
    return minor;
  }
}
