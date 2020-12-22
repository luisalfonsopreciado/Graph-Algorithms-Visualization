import { drawContourWalls } from "./Contour";
import { randBetween } from "../constants";

/**
 * Generate a Random Maze Using Prim's Algorithm
 * @param {Node[][]} grid
 * @param {Node} startNode
 * @param {Node} targetNode
 * @param {Graph} graph
 * @param {string} type
 */
export const primsAlgorithm = (grid, startNode, targetNode, graph, type) => {
  drawContourWalls(grid, type);
  const closedWalls = {};
  const openWalls = {};
  const rooms = {};
  const pillars = [];

  // Mark all walls as closed
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (row === startNode.row && col === startNode.col) continue;
      if (row === targetNode.row && col === targetNode.col) continue;
      const curr = grid[row][col];
      if (isWall(row, col)) {
        closedWalls[curr] = curr;
      } else if (isRoom(row, col)) {
        rooms[curr] = true;
      } else if (isPillar(row, col)) {
        pillars.push(curr);
      }
    }
  }

  const wallList = [];
  const path = {};

  // Add startNode and targetNode to the path
  let isStartNodeRoom = isRoom(startNode.row, startNode.col);
  let isTargetNodeRoom = isRoom(targetNode.row, targetNode.col);
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
        wallList.push(node);
      }
    }
  } else if (isStartNodeRoom) {
    for (let node of graph.AdjList.get(startNode)) {
      if (isWall(node.row, node.col)) {
        wallList.push(node);
      }
    }
  } else if (isTargetNodeRoom) {
    for (let node of graph.AdjList.get(targetNode)) {
      if (isWall(node.row, node.col)) {
        wallList.push(node);
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
    for (let cell of graph.AdjList.get(currentRandomWall)) {
      if (isRoom(cell.row, cell.col)) {
        roomsAdjacentToCurrWall.push(cell);
        if (!(cell in path)) {
          numNotInPath++;
          unvisitedRoom = cell;
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

      // Add the walls adjacent to the unvisited room to the wall list
      for (let node of graph.AdjList.get(unvisitedRoom)) {
        if (isWall(node.row, node.col)) {
          wallList.push(node);
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
    wall.add(type);
  }
};

/**
 * Returns true if the input location is initially a room
 * @param {number} row
 * @param {number} col
 */
const isRoom = (row, col) => {
  return row % 2 !== 0 && col % 2 !== 0;
};

/**
 * Returns true if the input location is initially a wall
 * @param {number} row
 * @param {number} col
 */
const isWall = (row, col) => {
  if (row % 2 === 0) {
    return col % 2 !== 0;
  }
  return col % 2 === 0;
};

/**
 * Returns true if the input location is a pilar
 * @param {number} row
 * @param {number} col
 */
const isPillar = (row, col) => {
  return row % 2 === 0 && col % 2 === 0;
};
