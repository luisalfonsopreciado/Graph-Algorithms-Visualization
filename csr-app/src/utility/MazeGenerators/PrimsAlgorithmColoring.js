/**
 * Generate a Random Maze Using Prim's Algorithm on a (x,y,z) Colored Grid
 * @param {Node[][]} grid
 * @param {Node} startNode
 * @param {Node} targetNode
 * @param {Graph} graph
 * @param {string} type
 */
export const primsAlgorithm531 = (grid, startNode, targetNode, graph, type) => {
  drawContourWalls(grid, type);
  const closedWalls = {};
  const openWalls = {};
  const rooms = {};
  const pillars = [];
  const nodesConsideredAsWalls = {};

  // Mark all walls as closed
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (row === startNode.row && col === startNode.col) continue;
      if (row === targetNode.row && col === targetNode.col) continue;
      const curr = grid[row][col];
      if (curr in nodesConsideredAsWalls) continue;
      if (isWall531(row, col)) {
        const newWall = new Wall(curr, graph, nodesConsideredAsWalls);
        closedWalls[newWall] = newWall;
      } else if (isRoom531(row, col)) {
        rooms[curr] = true;
      } else if (isPillar531(row, col)) {
        pillars.push(curr);
      }
    }
  }

  const wallList = [];
  const path = {};

  // Add startNode and targetNode to the path
  let isStartNodeRoom = isRoom531(startNode.row, startNode.col);
  let isTargetNodeRoom = isRoom531(targetNode.row, targetNode.col);
  let neitherRooms = !isStartNodeRoom && !isTargetNodeRoom;

  // If neither StartNode nor TargetNode is a room add a default room
  if (neitherRooms) {
    const firstRoom = grid[1][1];
    path[firstRoom] = true;
  } else if (isStartNodeRoom) {
    path[startNode] = true;
  } else if (isTargetNodeRoom) {
    path[targetNode] = true;
  }

  // Add The Adjacent walls of the room to the wall list
  if (neitherRooms) {
    for (let node of graph.AdjList.get(grid[1][1])) {
      if (isWall(node.row, node.col)) {
        wallList.push(new Wall(node, graph, nodesConsideredAsWalls));
      }
    }
  } else if (isStartNodeRoom) {
    for (let node of graph.AdjList.get(startNode)) {
      if (isWall(node.row, node.col)) {
        wallList.push(new Wall(node, graph, nodesConsideredAsWalls));
      }
    }
  } else if (isTargetNodeRoom) {
    for (let node of graph.AdjList.get(targetNode)) {
      if (isWall(node.row, node.col)) {
        wallList.push(new Wall(node, graph, nodesConsideredAsWalls));
      }
    }
  }

  // While the Wall List is not empty
  while (wallList.length !== 0) {
    // Select a wall from the list
    const randIndex = randBetween(0, wallList.length - 1);
    const currentRandomWall = wallList[randIndex];
    // Remove the wall from the wall list
    wallList.splice(randIndex, 1);

    const roomsAdjacentToCurrWall = [];
    let numNotInPath = 0;
    let unvisitedRoom = null;

    // Find the rooms adjacent to the wall.
    for (let cellInWall of Object.values(currentRandomWall.locations)) {
      for (let cell of graph.AdjList.get(cellInWall)) {
        if (isRoom531(cell.row, cell.col)) {
          roomsAdjacentToCurrWall.push(cell);
          if (!(cell in path)) {
            numNotInPath++;
            unvisitedRoom = cell;
          }
        }
      }
    }

    // If there are two adjacent rooms, and only one of them is not in path
    if (roomsAdjacentToCurrWall.length === 2 && numNotInPath === 1) {
      // Mark the wall as open
      openWalls[currentRandomWall] = true;
      closedWalls[currentRandomWall] = null;
      // delete closedWalls.currentRandomWall;

      // Add the unvisited room to the path
      path[unvisitedRoom] = true;

      const addedWalls = {};

      // Add the walls adjacent to the unvisited room to the wall list
      for (let node of graph.AdjList.get(unvisitedRoom)) {
        if (node in addedWalls) continue;
        if (isWall531(node.row, node.col)) {
          wallList.push(new Wall(node, graph, addedWalls));
        }
      }
    }
  }

  // Finally Add the Walls
  for (let pillar of pillars) {
    pillar.add(type);
  }

  for (let wall of Object.values(closedWalls)) {
    if (wall == null) continue;
    if (wall in openWalls) continue;

    for (let node of Object.values(wall.locations)) {
      if (node === startNode || node === targetNode) continue;
      node.add(type);
    }
  }
};

const isRoom531 = (row, col) => {
  return getColorCode(row, col, lookupTable531) === WHITE;
};

const isWall531 = (row, col) => {
  const colorCode = getColorCode(row, col, lookupTable531);
  return (
    colorCode === DARK_YELLOW ||
    colorCode === LIGHT_YELLOW ||
    colorCode === LIGHT_BLUE ||
    colorCode === DARK_BLUE
  );
};

const isPillar531 = (row, col) => {
  return false;
};

const getColorCode = (row, col, lookupTable) => {
  const m = lookupTable[0].length - 1;
  const n = lookupTable.length - 1;
  const lookupColor = lookupTable[row % n][col % m];
  return lookupColor;
};

const isRoom531 = (row, col) => {
  return getColorCode(row, col, lookupTable531) === WHITE;
};

const isWall531 = (row, col) => {
  const colorCode = getColorCode(row, col, lookupTable531);
  return (
    colorCode === DARK_YELLOW ||
    colorCode === LIGHT_YELLOW ||
    colorCode === LIGHT_BLUE ||
    colorCode === DARK_BLUE
  );
};

const isPillar531 = (row, col) => {
  return false;
};

const getColorCode = (row, col, lookupTable) => {
  const m = lookupTable[0].length - 1;
  const n = lookupTable.length - 1;
  const lookupColor = lookupTable[row % n][col % m];
  return lookupColor;
};

/**
 * Lookup Table for a (5, 3, 1) Grid coloring
 */
const lookupTable531 = [
  [0, 1, 2, 3, 4, 0],
  [3, 4, 0, 1, 2, 3],
  [1, 2, 3, 4, 0, 1],
  [4, 0, 1, 2, 3, 4],
  [2, 3, 4, 0, 1, 2],
  [0, 1, 2, 3, 4, 0],
];

/**
 * Color codes
 */
const DARK_BLUE = 0;
const LIGHT_YELLOW = 1;
const DARK_YELLOW = 2;
const LIGHT_BLUE = 3;
const WHITE = 4;

/* References : https://www.gamasutra.com/blogs/HermanTulleken/20161005/282629/Algorithms_for_making_more_interesting_mazes.php */
