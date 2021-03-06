import { useState, useCallback } from "react";
import Node from "../utility/Node";
import * as cts from "../utility/constants";

const generateNodeGrid = (numRows, numCols) => {
  const nodesGrid = [];
  let id = 1;

  for (let row = 0; row < numRows; row++) {
    nodesGrid[row] = [];
    for (let col = 0; col < numCols; col++) {
      nodesGrid[row][col] = new Node(row, col, id);
      id++;
    }
  }

  return nodesGrid;
};

const useNodeGrid = (rows, cols) => {
  const [numRows, setNumRows] = useState(rows);
  const [numCols, setNumCols] = useState(cols);

  const nodeGrid = useCallback(generateNodeGrid(numRows, numCols), [
    numRows,
    numCols,
  ]);

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
        cell.remove([cts.START, cts.TARGET]);
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

  /**
   *  Resets the distance and predecessors of each node in the nodeGrid.
   */
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
