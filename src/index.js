module.exports = function solveSudoku(matrix) {
  const possibleNumbers = calculatePossibleNumbersForMatrix(matrix);

  if (!possibleNumbers.length) {
    return matrix;
  }

  if (!validatePossibleNumbers(possibleNumbers)) {
    return null;
  }

  const firstPossibleNumber = possibleNumbers[0];

  for (let i = 0; i < firstPossibleNumber.numbers.length; i++) {
    const newMatrix = cloneMatrix(matrix);
    newMatrix[firstPossibleNumber.i][firstPossibleNumber.j] = firstPossibleNumber.numbers[i];
    const solvedMatrix = solveSudoku(newMatrix);

    if (solvedMatrix !== null) {
      return solvedMatrix;
    }

  }

  return null;
}

function calculatePossibleNumbersForMatrix(matrix) {
  const result = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      
      if (matrix[i][j] === 0) {
        result.push({
          i,
          j,
          numbers: calculatePossibleNumbersForCell(matrix, i, j)
        });
      }
      
    }
  }

  return result;
}

function calculatePossibleNumbersForCell(matrix, i, j) {
  const row = matrix[i];
  const column = matrix.map(matrixRow => matrixRow[j]);
  const block = getBlock(matrix, i, j);
  const usedNumbers = [...row, ...column, ...block].filter((item, index, array) => item !== 0 && array.indexOf(item) === index);

  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => usedNumbers.indexOf(item) < 0);
}

function getBlock(matrix, i, j) {
  let blockWithZero = [],
    startRow = Math.floor(i / 3) * 3,
    endRow = startRow + 3,
    startColumn = Math.floor(j / 3) * 3,
    endColumn = startColumn + 3;

  for (let i = startRow; i < endRow; i++) {
    for (let j = startColumn; j < endColumn; j++) {
      blockWithZero.push(matrix[i][j]);
    }
  }

  return blockWithZero;
}

function cloneMatrix(matrix) {
  return matrix.map(row => row.slice());
}

function validatePossibleNumbers(possibleNumbers) {
  return !possibleNumbers.some(item => !item.numbers.length);
}