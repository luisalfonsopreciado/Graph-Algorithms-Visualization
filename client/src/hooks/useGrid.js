import { useState } from "react";

const createGrid = (numRows, numCols, startRow, startCol) => {
  let arr = [];
  for (let row = 0; row < numRows; row++) {
    arr[row] = [];
    for (let col = 0; col < numCols; col++) {
      arr[row][col] = " ";
    }
  }
  arr[startRow][startCol] = "s";
  arr[Math.floor(numRows / 2)][Math.floor((numCols * 2) / 3)] = "t";
  return arr;
};

const useGrid = (numRows, numCols, startRow, startCol) => {
  let initialRow = startRow;
  let initialCol = startCol;

  const [grid, setGrid] = useState(
    createGrid(numRows, numCols, initialRow, initialCol)
  );
  const [initialCoords, setInitialCoords] = useState({
    startRow, startCol
  })

  const setCoord = (row, col, val) => {
    let newGrid = [...grid];
    if (val === "s") {
      setInitialCoords({startCol : col,  startRow : row})
    }
    newGrid[row][col] = val;
    setGrid(newGrid);
  };

  const resetGrid = (numRows, numCols) => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cell = document.getElementById(`${row} ${col}`);
        cell.classList.remove("Wall", "Searched");
      }
    }
  };

  return { grid, setGrid, setCoord, resetGrid, initialCoords};
};

export default useGrid;
