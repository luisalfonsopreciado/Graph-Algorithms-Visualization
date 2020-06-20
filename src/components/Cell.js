import React, { useEffect } from "react";
import "./Cell.css";

const Cell = ({ node, onMouseEnter, onMouseDown, onMouseLeave, onMouseUp }) => {
  let classes = ["Cell"];

  useEffect(() => {
    console.log("Cell UseEffect");
    node.setClasses();
  }, [node]);

  if (node.row === 10 && node.col === 10) {
    classes.push("Filled");
  }
  if (node.row === 10 && node.col === 30) {
    classes.push("Target");
  }

  return (
    <div
      className={classes.join(" ")}
      id={`${node.row} ${node.col}`}
      onMouseDown={() => onMouseDown(node)}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseLeave={() => onMouseLeave(node)}
      onMouseUp={() => onMouseUp(node)}
    ></div>
  );
};

export default Cell;
