import { useRef } from "react";
import Node from "../utility/Node";

const generateNodeGrid = (numRows, numCols) => {
  const nodesGrid = [];

  for (let row = 0; row < numRows; row++) {
    nodesGrid[row] = [];
    for (let col = 0; col < numCols; col++) {
      const newNode = new Node(row, col);
      nodesGrid[row][col] = newNode;
    }
  }

  return nodesGrid;
};

const useNodeGrid = () => {
  const nodesGrid = generateNodeGrid(20, 50);
  const nodeGridRef = useRef(nodesGrid);
  const nodeGrid = nodeGridRef.current;

  const resetGrid = () => {
      for(let row in nodeGrid){
          for(let col in nodeGrid[row]){
              nodeGrid[row][col].reset();
          }
      }
  }
  return { nodeGrid, resetGrid };
};

export default useNodeGrid;
