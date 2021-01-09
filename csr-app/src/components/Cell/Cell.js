import React, { useEffect } from "react";
import * as cts from "../../utility/constants";
import "./Cell.css";

const Cell = ({ node, mouse, numRows, numCols }) => {
  let classes = [cts.CELL];
  let icon = null;

  useEffect(() => node.setClasses(), [node]);

  if (
    node.row === Math.floor(numRows / 2) &&
    node.col === Math.floor((numCols * 1) / 3)
  ) {
    classes.push(cts.START);
  }
  if (
    node.row === Math.floor(numRows / 2) &&
    node.col === Math.floor((numCols * 2) / 3)
  ) {
    classes.push(cts.TARGET);
  }

  return (
    <div
      className={classes.join(" ")}
      id={`${node.row} ${node.col}`}
      onMouseDown={() => mouse.onMouseDown(node)}
      onMouseEnter={() => mouse.onMouseEnter(node)}
      onMouseLeave={() => mouse.onMouseLeave(node)}
      onMouseUp={() => mouse.onMouseUp(node)}
    >
      {icon}
    </div>
  );
};

export default Cell;
