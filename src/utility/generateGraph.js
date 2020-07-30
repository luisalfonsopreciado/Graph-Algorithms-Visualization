import { Graph } from "./index";

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

export const getKeyNodes = (nodesGrid) => {
  let startNode = null;
  let targetNode = null;

  for (let row = 0; row < nodesGrid.length; row++) {
    for (let col = 0; col < nodesGrid[row].length; col++) {
      const currentNode = nodesGrid[row][col];
      if (currentNode.is("Start")) startNode = currentNode;
      if (currentNode.is("Target")) targetNode = currentNode;
    }
  }
  return { startNode, targetNode };
};

export const generateGraph = (nodesGrid) => {
  let startNode = null;
  let targetNode = null;

  const graph = generateNodeGrid(nodesGrid);

  for (let row = 0; row < nodesGrid.length; row++) {
    for (let col = 0; col < nodesGrid[row].length; col++) {
      const currentNode = nodesGrid[row][col];

      if (!currentNode.is("Wall")) {
        if (currentNode.is("Start")) startNode = currentNode;
        if (currentNode.is("Target")) targetNode = currentNode;
        const neighbors = currentNode.getNeighbors(nodesGrid);

        for (let i in neighbors) {
          graph.addEdge(currentNode, neighbors[i]);
        }
      }
    }
  }
  if (startNode) startNode.dist = 0;
  return { graph, startNode, targetNode };
};
