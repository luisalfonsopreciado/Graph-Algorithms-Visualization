import { drawContourWalls } from "./Contour";

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

export const recursiveDivision = (grid) => {
  drawContourWalls(grid);
  const width = grid[0].length - 2; // Subtract 2 since we drew a contour
  const height = grid.length - 2;
  let prohibitedCells = [];
  let corners = [];
  corners.push({
    row: 1,
    col: 1,
    width,
    height,
    orientation: chooseOrientation(9, 18),
    prohibited: prohibitedCells,
    corners: corners,
  });

  while (corners.length !== 0) {
    const corner = corners.shift();
    const { row, col, width, height, orientation, prohibited } = corner;
    divide(row, col, width, height, orientation, prohibited, corners, grid);
  }

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
  corners,
  grid
) => {
  if (width <= 2 || height <= 2) return; //Maybe have a function that paints?
  // Is the wall to be drawn horizontal?
  const horizontal = orientation === HORIZONTAL;
  console.log("START")

  console.log("ROW COL", row, col);
  console.log("WIDTH HEIGHT", width, height);

  console.log("HORIZONTAL", horizontal);

  // Where will the wall be drawn from?
  let whereCol = col + (horizontal ? 0 : randBetween(2, width - 2)); // Rand number between the col and width
  let whereRow = row + (horizontal ? randBetween(2, height - 2) : 0); // Rand number between the row and height
  console.log("WHERECOL", whereCol);
  console.log("WHEREROW", whereRow);

  // Where will the passage through the wall exist?
  const passCol = whereCol + (horizontal ? randBetween(0, width - 1) : 0); // Rand number between the col and width

  const passRow = whereRow + (horizontal ? 0 : randBetween(0, height - 1)); // Rand number between the row and height

  console.log("PASSCOL", passCol);
  console.log("PASSROW", passRow);

  // How long will the wall be?
  const length = horizontal ? width : height;

  // Draw the walls
  drawWall(whereRow, whereCol, horizontal, length, grid);
  updateProhibitedCells(passRow, passCol, horizontal, prohibited);
  // grid[passRow][passCol].remove(["Wall"]);

  let newwidth = horizontal ? width : whereCol - col;
  let newheight = horizontal ? whereRow - row : height;
  console.log("newCol", row);
  console.log("newRow", col);
  console.log("newWidth", newwidth);
  console.log("newheight", newheight);

  corners.push({
    col,
    row,
    height: newheight,
    width: newwidth,
    orientation: chooseOrientation(newwidth, newheight),
    prohibited,
  });

  let newCol = horizontal ? col : whereCol + 1;
  let newRow = horizontal ? whereRow + 1 : row;

  newwidth = horizontal ? width : col + width - whereCol - 1;
  newheight = horizontal ? row + height - whereRow - 1: height;

  console.log("*newCol", newCol);
  console.log("*newRow", newRow);
  console.log("*newWidth", newwidth);
  console.log("*newheight", newheight);

  // grid[newRow][newCol].add("Red")

  corners.push({
    col: newCol,
    row: newRow,
    height: newheight,
    width: newwidth,
    orientation: chooseOrientation(newwidth, newheight),
    prohibited,
  });
};

const drawWall = (startRow, startCol, horizontal, length, grid) => {
  console.log("LENGTH", length);
  for (let i = 0; i < length; i++) {
    const row = startRow + (horizontal ? 0 : i);
    const col = startCol + (horizontal ? i : 0);
    console.log(row, col);

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

function randBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
