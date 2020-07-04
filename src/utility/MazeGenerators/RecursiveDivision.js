import { drawContourWalls } from "./Contour";

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

export const recursiveDivision = (grid) => {
  drawContourWalls(grid);
  const width = grid[0].length - 2; // Subtract 2 since we drew a contour
  const height = grid.length - 2;
  let prohibitedCells = []; // Walls that clot the maze

  divide(1,1,width, height, chooseOrientation(width, height), prohibitedCells, grid)

  // Remove prohibited cells so that all of the board is reachable
  for (let i in prohibitedCells) {
    const row = prohibitedCells[i][0];
    const col = prohibitedCells[i][1];
    grid[row][col].remove(["Wall"]);
  }
};

const divide = (
  row,
  col,
  width,
  height,
  orientation,
  prohibited,
  grid
) => {
  if (width <= 2 || height <= 2) return; //Maybe have a function that paints?
  // Is the wall to be drawn horizontal?
  const horizontal = orientation === HORIZONTAL;

  // Where will the wall be drawn from?
  let whereCol = col + (horizontal ? 0 : randBetween(2, width - 2)); // Rand number between the col and width
  let whereRow = row + (horizontal ? randBetween(2, height - 2) : 0); // Rand number between the row and height

  // Where will the passage through the wall exist?
  const passCol = whereCol + (horizontal ? randBetween(0, width - 1) : 0); // Rand number between the col and width

  const passRow = whereRow + (horizontal ? 0 : randBetween(0, height - 1)); // Rand number between the row and height

  // How long will the wall be?
  const length = horizontal ? width : height;

  // Draw the walls
  drawWall(whereRow, whereCol, horizontal, length, grid);
  updateProhibitedCells(passRow, passCol, horizontal, prohibited);

  // get first recursive call data
  let newwidth = horizontal ? width : whereCol - col;
  let newheight = horizontal ? whereRow - row : height;
  let neworientation = chooseOrientation(newwidth, newheight);
  
  divide(row, col, newwidth, newheight, neworientation, prohibited,grid);
  
  // get second recursive call data
  let newCol = horizontal ? col : whereCol + 1;
  let newRow = horizontal ? whereRow + 1 : row;

  newwidth = horizontal ? width : col + width - whereCol - 1;
  newheight = horizontal ? row + height - whereRow - 1: height;
  neworientation = chooseOrientation(newwidth, newheight);

  divide(newRow, newCol, newwidth, newheight, neworientation, prohibited,grid);
};

const drawWall = (startRow, startCol, horizontal, length, grid) => {
  for (let i = 0; i < length; i++) {
    const row = startRow + (horizontal ? 0 : i);
    const col = startCol + (horizontal ? i : 0);

    const cell = grid[row][col];
    if (!cell.isKeyValue()) cell.add("Wall");
  }
};

const chooseOrientation = (width, height) => {
  if (width < height) return HORIZONTAL;
  return VERTICAL;
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

// stack overflow https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
