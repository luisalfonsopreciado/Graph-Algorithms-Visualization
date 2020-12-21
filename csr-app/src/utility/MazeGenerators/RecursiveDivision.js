import { drawContourWalls } from "./Contour";
import * as cts from "../constants";

export const recursiveDivision = (grid, type) => {
  drawContourWalls(grid, type);
  // Subtract 2 accounting for drawn contour
  const width = grid[0].length - 2;
  const height = grid.length - 2;
  // An array that contains the nodes that would clot the maze
  let prohibitedCells = [];

  divide(
    1,
    1,
    width,
    height,
    chooseOrientation(width, height),
    prohibitedCells,
    grid,
    type
  );

  // Remove prohibited cells so that all of the board is reachable
  for (let i in prohibitedCells) {
    const row = prohibitedCells[i][0];
    const col = prohibitedCells[i][1];
    grid[row][col].remove([type]);
  }
};

/**
 * Perform a single division on an input grid.
 *
 * @param {number} row - top left corner row
 * @param {number} col - top left corner column
 * @param {number} width - width of the grid (inclusive)
 * @param {number} height - height of the grid (inclusive)
 * @param {string} orientation - the orientation to split the grid
 * @param {Node[]} prohibited - array that holds the cells that are restricted,
 * used to avoid clots.
 * @param {Node[][]} grid - inputGrid
 * @param {*} type - the type of division (Walls or Weight)
 */
const divide = (
  row,
  col,
  width,
  height,
  orientation,
  prohibited,
  grid,
  type
) => {
  if (width <= 2 || height <= 2) return;

  // Is the wall to be drawn horizontal?
  const isCutHorizontal = orientation === cts.HORIZONTAL;

  // Where will the wall be drawn from?
  let whereCol = col + (isCutHorizontal ? 0 : randBetween(2, width - 2)); // Rand number between the col and width
  let whereRow = row + (isCutHorizontal ? randBetween(2, height - 2) : 0); // Rand number between the row and height

  // Where will the passage through the wall exist?
  const passCol = whereCol + (isCutHorizontal ? randBetween(0, width - 1) : 0); // Rand number between the col and width

  const passRow = whereRow + (isCutHorizontal ? 0 : randBetween(0, height - 1)); // Rand number between the row and height

  // How long will the wall be?
  const length = isCutHorizontal ? width : height;

  // Draw the walls
  drawWall(whereRow, whereCol, isCutHorizontal, length, grid, type);
  updateProhibitedCells(passRow, passCol, isCutHorizontal, prohibited);

  // get first recursive call data
  let newWidth = isCutHorizontal ? width : whereCol - col;
  let newHeight = isCutHorizontal ? whereRow - row : height;
  let newOrientation = chooseOrientation(newWidth, newHeight);

  divide(row, col, newWidth, newHeight, newOrientation, prohibited, grid, type);

  // get second recursive call data
  let newCol = isCutHorizontal ? col : whereCol + 1;
  let newRow = isCutHorizontal ? whereRow + 1 : row;

  newWidth = isCutHorizontal ? width : col + width - whereCol - 1;
  newHeight = isCutHorizontal ? row + height - whereRow - 1 : height;
  newOrientation = chooseOrientation(newWidth, newHeight);

  divide(
    newRow,
    newCol,
    newWidth,
    newHeight,
    newOrientation,
    prohibited,
    grid,
    type
  );
};

/**
 * Draw a wall on the grid
 * @param {number} startRow
 * @param {number} startCol
 * @param {boolean} isCutHorizontal
 * @param {number} length - The length of the wall
 * @param {Node[][]} grid - Reference to the Node Grid
 * @param {string} type - Type of impediment to draw: Wall or Weight
 */
const drawWall = (startRow, startCol, isCutHorizontal, length, grid, type) => {
  for (let i = 0; i < length; i++) {
    const row = startRow + (isCutHorizontal ? 0 : i);
    const col = startCol + (isCutHorizontal ? i : 0);

    const cell = grid[row][col];
    if (!cell.isKeyValue()) cell.add([type]);
  }
};

/**
 * Helper Method that determines if the cut should be horizontal or vertical
 * based on the input dimensions.
 * If the width is less than the height return horizontal else vertical.
 * @param {number} width
 * @param {number} height
 */
const chooseOrientation = (width, height) => {
  if (width < height) return cts.HORIZONTAL;
  return cts.VERTICAL;
};

const updateProhibitedCells = (row, col, horizontal, prohibited) => {
  prohibited.push([row, col]);
  if (!horizontal) {
    prohibited.push([row, col + 1]);
    prohibited.push([row, col - 1]);
  } else {
    prohibited.push([row + 1, col]);
    prohibited.push([row - 1, col]);
  }
};

/**
 * Generate a random integer between a range [min, max] (inclusive).
 * Extracted from : https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 * @param {number} min must be less than max
 * @param {number} max must be greater than min
 */
function randBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
