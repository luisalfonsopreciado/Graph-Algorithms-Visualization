const generateNeighborsGrid = (rowNum, colNum) => {
  let arr = [];
  for (let row = 0; row < rowNum; row++) {
    arr[row] = [];
    for (let col = 0; col < colNum; col++) {
      arr[row][col] = {
        row,
        col,
        distance: null,
        predecesor: null,
      };
    }
  }
  return arr;
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

export const generateAdjList = (grid) => {
  let list = [];
  let neighborsGrid = generateNeighborsGrid(grid.length, grid[0].length);
  for (let row = 0; row < grid.length; row++) {
    list[row] = [];
    for (let col = 0; col < grid[row].length; col++) {
      list[row][col] = getNeighbors(grid, row, col, neighborsGrid);
    }
  }
  return list;
};
