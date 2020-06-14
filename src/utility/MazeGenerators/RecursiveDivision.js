const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

export const recursiveDivision = async (grid) => {
  drawContourWalls(grid);
  const width = grid[0].length - 2; // Subtract 2 since we drew a contour
  const height = grid.length - 2;
  let prohibitedCells = [];
  divide(
    1,
    1,
    width,
    height,
    chooseOrientation(width, height),
    prohibitedCells
  );
  // console.log(prohibitedCells);
  // for (let i = 0; i < prohibitedCells.length; i++) {
  //   const cell = document.getElementById(
  //     `${prohibitedCells[i][0]} ${prohibitedCells[i][1]}`
  //   );
  //   if (cell) {
  //     cell.classList.add("Filled");
  //   }
  // }
  // for (let i = 0; i < grid.length; i++) {
  //   for (let j = 0; j < grid[i].length; j++) {
  //     if (isProhibitedCoord(i, j, prohibitedCells)) {
  //       console.log(i, j);
  //     }
  //   }
  // }
};

const divide = (col, row, width, height, orientation, prohibited) => {
  //   console.log("divide with starting coords", row, col);
  //   console.log("divide with width and height", width, height);
  if (width <= 2 || height <= 2 ) return;

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
  drawWall(
    whereRow,
    whereCol,
    passRow,
    passCol,
    horizontal,
    length,
    prohibited
  );

  let newCol = row;
  let newRow = col;

  let newwidth = horizontal ? width : whereCol - col;
  let newheight = horizontal ? whereRow - row : height;
  divide(
    newCol,
    newRow,
    newwidth,
    newheight,
    chooseOrientation(newwidth, newheight),
    prohibited
  );

  let newCol2 = horizontal ? col : whereCol + 1;
  let newRow2 = horizontal ? whereRow + 1 : row;

  let newwidth2 = horizontal ? width : col + width - whereCol - 1;
  let newheight2 = horizontal ? row + height - whereRow - 1 : height;
  // console.log(
  //   "divide to be called with col row width height",
  //   newCol,
  //   newRow,
  //   newwidth,
  //   newheight
  // );
  divide(
    newCol2,
    newRow2,
    newwidth2,
    newheight2,
    chooseOrientation(newwidth2, newheight2),
    prohibited
  );
};

const drawWall = (
  startRow,
  startCol,
  passRow,
  passCol,
  horizontal,
  length,
  prohibited
) => {
  // console.log("drawing with coords and length", startRow, startCol, length);
  for (let i = 0; i < length; i++) {
    const row = startRow + (horizontal ? 0 : i);
    const col = startCol + (horizontal ? i : 0);

    const cell = document.getElementById(`${row} ${col}`);

    if (
      cell &&
      !cell.classList.contains("Target") &&
      !cell.classList.contains("Filled") &&
      !isProhibitedCoord(row, col, prohibited)
    ) {
      cell.classList.add("Wall");
    }
  }

  const cell = document.getElementById(`${passRow} ${passCol}`);
  if (cell && !isBorder(passRow, passCol)) {
    // console.log(
    //   isProhibitedCoord(passRow, passCol, prohibited),
    //   passRow,
    //   passCol
    // );
    cell.classList.remove("Wall");
  }
  updateProhibitedCells(passRow, passCol, horizontal, prohibited);
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

const updateProhibitedCells = (row, col, horizontal, prohibited) => {
  // console.log("updateProhibited passCoords", row, col);
  if (!horizontal) {
    prohibited.push([row, col + 1]);
    prohibited.push([row, col - 1]);
  } else {
    prohibited.push([row + 1, col]);
    prohibited.push([row - 1, col]);
  }
};

const isProhibitedCoord = (row, col, prohibited) => {
  for (let i = 0; i < prohibited.length; i++) {
    if (prohibited[i][0] === row && prohibited[i][1] === col) return true;
  }
  return false;
};

const isBorder = (row, col) => {
  return row === 0 || row === 19 || col === 0 || col === 49;
}
