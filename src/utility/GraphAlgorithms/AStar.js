export const AStar = (startRow, startCol, targetRow, targetCol, grid) => {
  const openList = initializeClosedList(grid, targetRow, targetCol); // generates a list of all nodes with their respective f values
  const animations = [];
  //   const closedList = [];
  let currentNode = getNeighbors(grid, startRow, startCol, openList);
  currentNode = getMinF(currentNode);

  while (openList.length !== 0) {
    // Find the node with the least f on the open list call it "q"

    // Pop q off the open list
    // generate q neighbors and set their parents to q
    const neighbors = getNeighbors(
      grid,
      currentNode.row,
      currentNode.col,
      openList
    );
    console.log(neighbors);
    // for each neighbor

    for (let i = 0; i < neighbors.length; i++) {
      // A) if it is the goal, stop search
      if (neighbors[i].row === targetRow && neighbors[i].col === targetCol)
        return animations;
      // succesor.g = q.g + distance between neighbor and q;
      neighbors[i].g = neighbors[i].g + 1;

      // successor.h = distance from goal to successor (heuristics)
      // successor.f = successor.g + successor.h
      
      // B) if a node with the same position as neighbotr is in the open list with lower f skip it.
      // C) if a node with same position as neighbor is in the closed list with lower f, skip
      // else add node to open list
      // EndFor
    }

    currentNode = getMinF(neighbors);
    console.log("new currentnode", currentNode);

    // Push Q on the closed list
    // EndWhile
  }
};

const getNeighbors = (grid, row, col, neighborsGrid) => {
  const cellNotInGraph = (row, col) => {
    const cellClasses = document.getElementById(`${row} ${col}`).classList;
    return cellClasses.contains("Wall");
  };
  if (cellNotInGraph(row, col)) return [];
  let neighbors = [];

  if (row > 0 && !cellNotInGraph(row - 1, col)) {
    // N
    neighbors.push(neighborsGrid[row - 1][col]);
  }
  if (col > 0 && !cellNotInGraph(row, col - 1)) {
    // W
    neighbors.push(neighborsGrid[row][col - 1]);
  }
  if (row < grid.length - 1 && !cellNotInGraph(row + 1, col)) {
    // S
    neighbors.push(neighborsGrid[row + 1][col]);
  }
  if (col < grid[row].length - 1 && !cellNotInGraph(row, col + 1)) {
    // E
    neighbors.push(neighborsGrid[row][col + 1]);
  }
  if (row > 0 && col > 0 && !cellNotInGraph(row - 1, col - 1)) {
    // NW
    neighbors.push(neighborsGrid[row - 1][col - 1]);
  }
  if (
    row > 0 &&
    col < grid[row].length - 1 &&
    !cellNotInGraph(row - 1, col + 1)
  ) {
    // NE
    neighbors.push(neighborsGrid[row - 1][col + 1]);
  }
  if (row < grid.length - 1 && col > 0 && !cellNotInGraph(row + 1, col - 1)) {
    // SW
    neighbors.push(neighborsGrid[row + 1][col - 1]);
  }
  if (
    row < grid.length - 1 &&
    col < grid[row].length - 1 &&
    !cellNotInGraph(row + 1, col + 1)
  ) {
    // SE
    neighbors.push(neighborsGrid[row + 1][col + 1]);
  }

  return neighbors;
};

const initializeClosedList = (grid, targetRow, targetCol) => {
  let arr = {};
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const g = manhattanDistance(row, col, targetRow, targetCol);
      const h = 0;
      const f = g + h;
      arr[`${row} ${col}`] = {
        row,
        col,
        g,
        h,
        f,
        predecesor: null,
      };
    }
  }
  return arr;
};

const manhattanDistance = (rowOne, colOne, rowTwo, colTwo) => {
  let xChange = Math.abs(colOne - colTwo);
  let yChange = Math.abs(rowOne - rowTwo);
  return xChange + yChange;
};

const getMinF = (openList) => {
  // Takes O(n^2) in future use another DS
  let min = Infinity;
  let result = {};
  for (let i = 0; i < openList.length; i++) {
    if (openList[i].f < min) {
      min = openList[i].f;
      result = openList[i];
    }
  }
  return result;
};
