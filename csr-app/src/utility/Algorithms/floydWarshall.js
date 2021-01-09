import * as cts from "../constants";
/**
 * Run Floyd Warshall's All Pairs shortest paths algorithm on a nodeGrid
 * @param {Node[][]} nodeGrid
 */
export const floydWarshall = (nodeGrid) => {
  // calculate number of vertices
  const n = nodeGrid.length * nodeGrid[0].length;

  // distance matrix that holds distance from i -> j at mtrx[i][j]
  const mtrx = [];
  const animations = [];
  let distance = 1;

  // 2D array that stores the path from any pair of vertices
  const path = new Array(n);

  // HashMap to store the nodes By their ID id -> Node
  const nodes = {};

  // Variables to hold the startNode and targetNode id,
  // used to get the distance between the two at the conclusion of the algo.
  let startId = 0;
  let targetId = 0;

  // For each vertex ID
  for (let i = 1; i <= n; i++) {
    // Get node given ID : i
    const node = getNode(i, nodeGrid);

    // Save it to Hashmap for later use
    nodes[i] = node;

    path[i] = [];

    path[i][i] = i;

    // Get list of vertex neighbors
    const neighbors = node.getNeighbors(nodeGrid);

    // For Each neighbor
    for (let neighbor of neighbors) {
      path[i][neighbor.id] = neighbor.id;
    }

    // Record the id of start and target node
    if (node.is(cts.START)) startId = node.id;
    if (node.is(cts.TARGET)) targetId = node.id;

    // Handle animation
    if (!node.is(cts.WALL)) animations.push(node);
  }

  // Initialize the distance matrix
  for (let row = 1; row <= n; row++) {
    mtrx[row] = [];
    for (let col = 1; col <= n; col++) {
      // The node at row
      const start = nodes[row];

      // The node at col
      const end = nodes[col];

      if (!path[row][col]) path[row][col] = 0;

      // Distance from start to end
      mtrx[row][col] = start.getDistanceTo(end);
    }
  }

  // Update the mtrx
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        // Keep the code inside here lean so that it remains fast

        // If it is faster via node with id k
        if (mtrx[i][k] + mtrx[k][j] < mtrx[i][j]) {
          mtrx[i][j] = mtrx[i][k] + mtrx[k][j];
          path[i][j] = path[i][k];
        }
      }
    }
  }

  let containsNegativeCycle = false;

  // If distance of any verex from itself
  // becomes negative, then there is a negative
  // weight cycle.
  for (let i = 1; i <= n; i++) {
    if (mtrx[i][i] < 0) {
      containsNegativeCycle = true;
      break;
    }
  }

  if (containsNegativeCycle) {
    path.forEach((arr) => arr.fill(0));
  }

  // Update the distances on the start and target node so that the UI Updates
  distance = mtrx[startId][targetId];

  return { mtrx, animations, distance, path };
};

/**
 * Returns a reference to the node given the id
 * @param {*} id
 * @param {*} nodeGrid
 */
function getNode(id, nodeGrid) {
  const width = nodeGrid[0].length;
  const row = Math.floor((id - 1) / width);
  const col = (id - 1) % width;
  return nodeGrid[row][col];
}

/**
 * Return array of path given ID: u, v, and path matrix
 * @param {*} u
 * @param {*} v
 * @param {*} path
 */
export const getPath = (u, v, path) => {
  if (path[u][v] === 0) return [];
  const result = [];
  while (u !== v) {
    u = path[u][v];
    result.push(u);
  }
  return result;
};
