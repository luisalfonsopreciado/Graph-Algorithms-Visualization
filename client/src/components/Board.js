import React, { useState, Fragment } from "react";
import useGrid from "../hooks/useGrid";
import Cell from "./Cell";
import Button from "@material-ui/core/Button";
import { bfs, dfs } from "../utility/index";
import './Board.css'

const ROWS_INIT = 20;
const COLS_INIT = 50;
const START_ROW = Math.floor(ROWS_INIT / 2);
const START_COL = Math.floor(COLS_INIT / 3);

const Board = () => {
  const { grid, setCoord, resetGrid, initialCoords, targetCoords } = useGrid(
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

  const doSearch = async (type) => {
    const rowStart = initialCoords.startRow;
    const colStart = initialCoords.startCol;
    const { animations, predecessors } = await type(grid, rowStart, colStart);

    let count = 0;
    const intervalId = setInterval(() => {
      let row = animations[count].row;
      let col = animations[count].col;
      const cell = document.getElementById(`${row} ${col}`);

      if (targetCoords.targetRow === row && targetCoords.targetCol === col) {
        drawShortestPath(row, col, predecessors, colStart, rowStart);
      } else {
        !cell.classList.contains("Filled") && cell.classList.add("Searched");
      }

      count++;

      if (count >= animations.length) {
        clearInterval(intervalId);
      }
    }, 3);
  };

  const drawShortestPath = (row, col, predecessors, colStart, rowStart) => {
    let nextObj = predecessors[row][col];
    let currentCol = nextObj.col;
    let currentRow = nextObj.row;
    while (currentCol !== colStart || currentRow !== rowStart) {
      const classes = document.getElementById(`${currentRow} ${currentCol}`)
        .classList;
      classes.remove("Searched");
      classes.add("ShortestPath");

      const nextObj = predecessors[currentRow][currentCol];
      currentCol = nextObj.col;
      currentRow = nextObj.row;
    }
  };

  const clear = () => {
    resetGrid(ROWS_INIT, COLS_INIT, START_ROW, START_COL);
  };

  return (
    <Fragment>
      <div style={{margin: "auto"}}>
        <Button onClick={() => doSearch(dfs)}>Do DFS</Button>
        <Button onClick={() => doSearch(bfs)}>Do BFS</Button>
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
        className="Board"
      >
        {Grid}
      </table>
    </Fragment>
  );
};

export default Board;
