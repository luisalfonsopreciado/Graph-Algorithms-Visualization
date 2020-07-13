import { useState } from "react";
import Node from "../utility/Node";

const generateNodeGrid = (numRows, numCols) => {
  const nodesGrid = [];

  for (let row = 0; row < numRows; row++) {
    nodesGrid[row] = [];
    for (let col = 0; col < numCols; col++) {
      nodesGrid[row][col] = new Node(row, col);
    }
  }

  return nodesGrid;
};

const useNodeGrid = (rows, cols) => {
  const [numRows, setNumRows] = useState(rows);
  const [numCols, setNumCols] = useState(cols);

  const nodeGrid = generateNodeGrid(numRows, numCols);

  const resetGrid = () => {
    for (let row in nodeGrid) {
      for (let cell of nodeGrid[row]) {
        cell.reset();
      }
    }
  };

  const clearGrid = () => {
    for (let row in nodeGrid) {
      for (let cell of nodeGrid[row]) {
        cell.reset();
        cell.remove(["Start", "Target"]);
      }
    }
  };

  const removeVisuals = () => {
    for (let row in nodeGrid) {
      for (let node of nodeGrid[row]) {
        node.removeVisuals();
      }
    }
  };

  const paintInDistance = (dist) => {
    if (dist === Infinity) return;
    for (let row in nodeGrid) {
      for (let node of nodeGrid[row]) {
        if (node.dist <= dist) {
          node.markSearched2Done();
        } else {
          node.removeClasses();
        }
      }
    }
  };

  const resetDistance = () => {
    for (let row in nodeGrid) {
      for (let node of nodeGrid[row]) {
        node.dist = Infinity;
        node.predecessor = null;
        if (!node.isKeyValue()) {
          node.removeClasses();
        }
      }
    }
  };

  return {
    nodeGrid,
    resetGrid,
    removeVisuals,
    paintInDistance,
    resetDistance,
    clearGrid,
    setNumRows: (numRows) => {
      clearGrid();
      setNumRows(numRows);
    },
    setNumCols: (numCols) => {
      clearGrid();
      setNumCols(numCols);
    },
    numRows,
    numCols,
  };
};

export default useNodeGrid;
