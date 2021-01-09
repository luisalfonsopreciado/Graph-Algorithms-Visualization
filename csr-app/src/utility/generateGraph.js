import { Graph } from "./index";
import * as cts from "./constants";

export const calculateNumVertices = () => {
  const numCells = document.getElementsByClassName(cts.CELL).length;
  const numWalls = document.getElementsByClassName(cts.WALL).length;
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
      if (currentNode.is(cts.SHORTEST_PATH)) {
        currentNode.remove([cts.SHORTEST_PATH]);
        currentNode.add(cts.SEARCHED_DONE);
      }
      if (currentNode.is(cts.START)) startNode = currentNode;
      if (currentNode.is(cts.TARGET)) targetNode = currentNode;
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

      if (!currentNode.is(cts.WALL)) {
        if (currentNode.is(cts.START)) startNode = currentNode;
        if (currentNode.is(cts.TARGET)) targetNode = currentNode;
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
