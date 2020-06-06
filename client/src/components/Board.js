import React, { useState, Fragment } from "react";
import useGrid from "../hooks/useGrid";
import Cell from "./Cell";
import Button from "@material-ui/core/Button";
import { bfs, dfs } from "../utility/index";

const ROWS_INIT = 20;
const COLS_INIT = 50;
const START_ROW = Math.floor(ROWS_INIT / 2);
const START_COL = Math.floor(COLS_INIT / 3);

const Board = () => {
  const { grid, setCoord, resetGrid, initialCoords } = useGrid(
    ROWS_INIT,
    COLS_INIT,
    START_ROW,
    START_COL
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMovingKeyItem, setIsMovingKeyItem] = useState([false, null]);

  let Grid = grid.map((row, rowNum) => {
    return (
      <tr>
        {row.map((val, colNum) => {
          return (
            <Cell
              key={[rowNum, colNum]}
              val={val}
              row={rowNum}
              col={colNum}
              isMouseDown={isMouseDown}
              isMovingKeyItem={isMovingKeyItem}
              setIsMovingKeyItem={setIsMovingKeyItem}
              setCoord={setCoord}
            />
          );
        })}
      </tr>
    );
  });

  const doDFS = async () => {
    const animations = await dfs(
      grid,
      initialCoords.startRow,
      initialCoords.startCol
    );
    let count = 0;
    const intervalId = setInterval(() => {
      const cell = document.getElementById(
        `${animations[count].row} ${animations[count].col}`
      );

      cell.classList.add("Searched");

      count++;

      if (count >= animations.length) {
        clearInterval(intervalId);
      }
    }, 3);
  };

  const doBFS = async () => {
    const animations = await bfs(
      grid,
      initialCoords.startRow,
      initialCoords.startCol
    );
    let count = 0;
    const intervalId = setInterval(() => {
      const cell = document.getElementById(
        `${animations[count].row} ${animations[count].col}`
      );

      cell.classList.add("Searched");

      count++;
      if (count >= animations.length) {
        clearInterval(intervalId);
      }
    }, 3);
  };

  const clear = () => {
    resetGrid(ROWS_INIT, COLS_INIT, START_ROW, START_COL);
  };

  return (
    <Fragment>
      <div>
        <Button onClick={doDFS}>Do DFS</Button>
        <Button onClick={doBFS}>Do BFS</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
      <table
        onMouseDown={() => {
          setIsMouseDown(true);
        }}
        onMouseUp={() => {
          setIsMouseDown(false);
        }}
        draggable={false}
      >
        {Grid}
      </table>
    </Fragment>
  );
};

export default Board;
