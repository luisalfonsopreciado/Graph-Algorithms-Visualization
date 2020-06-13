const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

export const recursiveDivision = async (grid) => {
  drawContourWalls(grid);
  const width = grid[0].length - 2; // Subtract 1 since we drew a contour
  const height = grid.length - 2;
  await divide(1, 1, width, height, chooseOrientation(width, height));
};

const divide = async (col, row, width, height, orientation) => {
  console.log("divide with starting coords", row, col);
  console.log("divide with width and height", width, height);
  if (width < 2 || height < 2) return;

  const horizontal = orientation === HORIZONTAL;

  // Where will the wall be drawn from?
  let whereCol =
    col + (horizontal ? 0 : Math.ceil(Math.random() * (width - 2))); // Rand number between the col and width
  //   if (whereCol === col && !horizontal) ++whereCol;

  let whereRow =
    row + (horizontal ? Math.ceil(Math.random() * (height - 2)) : 0); // Rand number between the row and height
  //   if (whereRow === row && horizontal) ++whereRow;

  // Where will the passage through the wall exist?
  const passCol =
    whereCol + (horizontal ? Math.ceil(Math.random() * (width - 1)) : 0); // Rand number between the col and width
  const passRow =
    whereRow + (horizontal ? 0 : Math.ceil(Math.random() * (height - 1))); // Rand number between the row and height

  // How long will the wall be?
  const length = horizontal ? width : height;

  // Draw the walls
  drawWall(whereRow, whereCol, passRow, passCol, horizontal, length);

  let newCol = row;
  let newRow = col;

  let oldwidth = width;
  let oldheight = height;

  width = horizontal ? width : whereCol - col;
  height = horizontal ? whereRow - row : height;
//   await divide(newCol, newRow, width, height, chooseOrientation(width, height));

  newCol = horizontal ? col : whereCol + 1;
  newRow = horizontal ? whereRow + 1 : row;

  width = horizontal ? width : col + oldwidth - whereCol - 1;
  height = horizontal ? row + oldheight - whereRow - 1 : height;
  await divide(newCol, newRow, width, height, chooseOrientation(width, height));
};

const drawWall = (startRow, startCol, passRow, passCol, horizontal, length) => {
  console.log("drawing with coords and length", startRow, startCol, length);
  for (let i = 0; i < length; i++) {
    const classes = document.getElementById(
      `${startRow + (horizontal ? 0 : i)} ${startCol + (horizontal ? i : 0)}`
    ).classList;
    if (!classes.contains("Target") && !classes.contains("Filled")) {
      classes.add("Wall");
    }
  }
  const cell = document.getElementById(`${passRow} ${passCol}`);
  if (cell) {
    cell.classList.remove("Wall");
  } else {
    console.log("INVALID PASS COORDS");
  }
};

const chooseOrientation = (width, height) => {
  if (width < height) {
    return HORIZONTAL;
  }
  return VERTICAL;
};

const drawContourWalls = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    let classes = document.getElementById(`${i} ${0}`).classList;
    classes.add("Wall");
    classes = document.getElementById(`${i} ${grid[i].length - 1}`)
    classes.add("Wall");
  }

  for (let j = 0; j < grid[0].length; j++) {
    let classes = document.getElementById(`${0} ${j}`).classList;
    classes.add("Wall");
    classes = document.getElementById(`${grid.length - 1} ${j}`).classList;
    classes.add("Wall");
  }
};
