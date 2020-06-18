import { Graph } from "./index";
import Node from "./Node";

const getNeighbors = (grid, row, col) => {
  const cellNotInGraph = (row, col) => {
    const cellClasses = document.getElementById(`${row} ${col}`).classList;
    return cellClasses.contains("Wall");
  };

  if (cellNotInGraph(row, col)) return [];
  let neighbors = [];

  if (row > 0 && !cellNotInGraph(row - 1, col)) {
    // N
    neighbors.push({ row: row - 1, col });
  }
  if (col > 0 && !cellNotInGraph(row, col - 1)) {
    // W
    neighbors.push({ row, col: col - 1 });
  }
  if (row < grid.length - 1 && !cellNotInGraph(row + 1, col)) {
    // S
    neighbors.push({ row: row + 1, col });
  }
  if (col < grid[row].length - 1 && !cellNotInGraph(row, col + 1)) {
    // E
    neighbors.push({ row, col: col + 1 });
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
      const newNode = new Node(row, col);
      nodesGrid[row][col] = newNode;
      graph.addVertex(newNode);
    }
  }
  return { nodesGrid, graph };
};

export const generateGraph = (grid) => {
  let startNode = null;

  const { nodesGrid, graph } = generateNodeGrid(grid);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const classes = document.getElementById(`${row} ${col}`).classList;

      if (!classes.contains("Wall")) {
        const currentNode = nodesGrid[row][col];

        if (classes.contains("Filled")) startNode = currentNode;

        const neighbors = getNeighbors(grid, row, col);

        for (let i in neighbors) {
          const neighborCell = nodesGrid[neighbors[i].row][neighbors[i].col];
          graph.addEdge(currentNode, neighborCell);
        }
      }
    }
  }

  return { graph, startNode };
};
