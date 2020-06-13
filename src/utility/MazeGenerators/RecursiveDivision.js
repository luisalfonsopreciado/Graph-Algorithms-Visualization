const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

// let prohibitedCells = [];

export const recursiveDivision = (grid) => {
  drawContourWalls(grid);
  const width = grid[0].length - 2; // Subtract 2 since we drew a contour
  const height = grid.length - 2;
  divide(1, 1, width, height, chooseOrientation(width, height));
};

const divide = async (col, row, width, height, orientation) => {
  //   console.log("divide with starting coords", row, col);
  //   console.log("divide with width and height", width, height);
  if (width < 2 || height < 2) return;

  const horizontal = orientation === HORIZONTAL;

  // Where will the wall be drawn from?
  let whereCol =
    col + (horizontal ? 0 : Math.ceil(Math.random() * (width - 2))); // Rand number between the col and width

  let whereRow =
    row + (horizontal ? Math.ceil(Math.random() * (height - 2)) : 0); // Rand number between the row and height

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

  let newwidth = horizontal ? width : whereCol - col;
  let newheight = horizontal ? whereRow - row : height;
  await divide(newCol, newRow, newwidth, newheight, chooseOrientation(newwidth, newheight));

  newCol = horizontal ? col : whereCol + 1;
  newRow = horizontal ? whereRow + 1 : row;

  newwidth = horizontal ? width : col + width - whereCol - 1;
  newheight = horizontal ? row + height - whereRow - 1 : height;
  console.log(
    "divide to be called with col row width height",
    newCol,
    newRow,
    newwidth,
    newheight
  );
  divide(newCol, newRow, newwidth, newheight, chooseOrientation(newwidth, newheight));
};

const drawWall = (startRow, startCol, passRow, passCol, horizontal, length) => {
  // console.log("drawing with coords and length", startRow, startCol, length);
  for (let i = 0; i < length; i++) {
    const row = startRow + (horizontal ? 0 : i);
    const col = startCol + (horizontal ? i : 0);

    const cell = document.getElementById(`${row} ${col}`);

    if (
      cell &&
      !cell.classList.contains("Target") &&
      !cell.classList.contains("Filled")
    ) {
      cell.classList.add("Wall");
    }
  }
  const cell = document.getElementById(`${passRow} ${passCol}`);
  if (cell) {
    cell.classList.remove("Wall");
  } else {
    console.log("INVALID PASS COORDS", passRow, passCol);
  }
  //   updateProhibitedCells(passRow, passCol, horizontal);
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
    classes = document.getElementById(`${i} ${grid[i].length - 1}`).classList;
    classes.add("Wall");
  }

  for (let j = 0; j < grid[0].length; j++) {
    let classes = document.getElementById(`${0} ${j}`).classList;
    classes.add("Wall");
    classes = document.getElementById(`${grid.length - 1} ${j}`).classList;
    classes.add("Wall");
  }
};

// const updateProhibitedCells = (row, col, horizontal) => {
//   if (horizontal) {
//     prohibitedCells.push([row, col + 1]);
//     prohibitedCells.push([row, col - 1]);
//   } else {
//     prohibitedCells.push([row + 1, col]);
//     prohibitedCells.push([row - 1, col]);
//   }
// };

// const isProhibitedCoord = (row, col) => {
//   for (let i = 0; i < prohibitedCells.length; i++) {
//     if (prohibitedCells[i][0] === row && prohibitedCells[i][1] === col)
//       return true;
//   }
//   return false;
// };
