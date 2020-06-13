import React, { useState, Fragment } from "react";
import useGrid from "../hooks/useGrid";
import Cell from "./Cell";
import Button from "@material-ui/core/Button";
import {
  bfs,
  dfs,
  clone,
  dijkstra,
  randomMaze,
  recursiveDivision,
} from "../utility/index";
import "./Board.css";

const ROWS_INIT = 20;
const COLS_INIT = 50;
const START_ROW = Math.floor(ROWS_INIT / 2);
const START_COL = Math.floor(COLS_INIT / 3);

const drawShortestPath = (row, col, predecessors, colStart, rowStart) => {
  let nextObj = predecessors[row][col];
  let currentCol = nextObj.col;
  let currentRow = nextObj.row;
  for (let row = 0; row < predecessors.length; row++) {
    for (let col = 0; col < predecessors[row].length; col++) {
      const cell = document.getElementById(`${row} ${col}`);

      if (cell) {
        const classes = cell.classList;
        if (classes.contains("ShortestPath")) {
          classes.remove("ShortestPath");
          // classes.add("FinalSearched");
        }
      }
    }
  }
  while (currentCol !== colStart || currentRow !== rowStart) {
    const cell = document.getElementById(`${currentRow} ${currentCol}`);
    if (cell) {
      const classes = cell.classList;
      classes.remove("Searched");
      classes.add("ShortestPath");

      const nextObj = predecessors[currentRow][currentCol];
      currentCol = nextObj.col;
      currentRow = nextObj.row;
    } else {
      break;
    }
  }
};

const Board = () => {
  const { grid, setCoord, resetGrid, initialCoords, targetCoords } = useGrid(
    ROWS_INIT,
    COLS_INIT,
    START_ROW,
    START_COL
  );

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMovingKeyItem, setIsMovingKeyItem] = useState([false, null]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [predecessors, setPredecessors] = useState(null);

  let Grid = grid.map((row, rowNum) => {
    return row.map((val, colNum) => {
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
          animationComplete={animationComplete}
          predecessors={predecessors}
          drawShortestPath={() =>
            drawShortestPath(
              rowNum,
              colNum,
              predecessors,
              initialCoords.startCol,
              initialCoords.startRow
            )
          }
        />
      );
    });
  });

  const doSearch = async (type) => {
    const rowStart = initialCoords.startRow;
    const colStart = initialCoords.startCol;

    const { animations, predecessors } = await type(
      clone(grid),
      rowStart,
      colStart
    );

    setPredecessors(predecessors);

    let count = 0;

    const intervalId = setInterval(() => {
      let row = animations[count].row;
      let col = animations[count].col;
      const cell = document.getElementById(`${row} ${col}`);

      if (targetCoords.targetRow === row && targetCoords.targetCol === col) {
        drawShortestPath(row, col, predecessors, colStart, rowStart);
      } else {
        !cell.classList.contains("Filled") &&
          !cell.classList.contains("Target") &&
          cell.classList.add("Searched");
      }

      count++;

      if (count >= animations.length) {
        setAnimationComplete(true);
        clearInterval(intervalId);
      }
    }, 3);
  };

  const clear = () => {
    setAnimationComplete(false);
    resetGrid(ROWS_INIT, COLS_INIT, START_ROW, START_COL);
  };

  const doRandomMaze = () => {
    clear();
    randomMaze(grid);
  };

  const doRecursiveDivision = () => {
    clear();
    recursiveDivision(grid);
  };

  return (
    <Fragment>
      <div style={{ margin: "auto" }}>
        <Button onClick={() => doSearch(dfs)}>Do DFS</Button>
        <Button onClick={() => doSearch(bfs)}>Do BFS</Button>
        <Button onClick={() => doSearch(dijkstra)}>Dijkstra</Button>
        <Button onClick={doRandomMaze}>Random Maze</Button>
        <Button onClick={doRecursiveDivision}>Recursive Division</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
      <div
        onMouseDown={() => {
          setIsMouseDown(true);
        }}
        onMouseUp={() => {
          setIsMouseDown(false);
        }}
        className="Board"
        style={{
          gridTemplateRows: `repeat(${ROWS_INIT}, 1fr)`,
          gridTemplateColumns: `repeat(${COLS_INIT}, 1fr)`,
        }}
      >
        {Grid}
      </div>
    </Fragment>
  );
};

export default Board;
