import { Graph } from "./index";

const getNeighbors = (grid, row, col) => {
  const cellNotInGraph = (row, col) => {
    return grid[row][col].isWall();
  };

  if (cellNotInGraph(row, col)) return [];
  let neighbors = [];

  if (row > 0 && !cellNotInGraph(row - 1, col)) {
    // N
    neighbors.push(grid[row - 1][col]);
  }
  if (col > 0 && !cellNotInGraph(row, col - 1)) {
    // W
    neighbors.push(grid[row][col - 1]);
  }
  if (row < grid.length - 1 && !cellNotInGraph(row + 1, col)) {
    // S
    neighbors.push(grid[row + 1][col]);
  }
  if (col < grid[row].length - 1 && !cellNotInGraph(row, col + 1)) {
    // E
    neighbors.push(grid[row][col + 1]);
  }

  return neighbors;
};

export const calculateNumVertices = () => {
  const numCells = document.getElementsByClassName("Cell").length;
  const numWalls = document.getElementsByClassName("Wall").length;
  return numCells - numWalls;
};

export const generateNodeGrid = (grid) => {
  const nodesGrid = [];
  const graph = new Graph(calculateNumVertices());

  for (let row in grid) {
    nodesGrid[row] = [];
    for (let col in grid[row]) {
      graph.addVertex(grid[row][col]);
    }
  }
  return graph;
};

export const generateGraph = (nodesGrid) => {
  let startNode = null;
  const graph = generateNodeGrid(nodesGrid);

  for (let row = 0; row < nodesGrid.length; row++) {
    for (let col = 0; col < nodesGrid[row].length; col++) {
      const currentNode = nodesGrid[row][col];

      if (!currentNode.isWall()) {
        if (currentNode.isStart()) startNode = currentNode;

        const neighbors = getNeighbors(nodesGrid, row, col);

        for (let i in neighbors) {
          graph.addEdge(currentNode, neighbors[i]);
        }
      }
    }
  }
  startNode.dist = 0;
  return { graph, startNode };
};
