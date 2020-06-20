import React, { useEffect } from "react";
import "./Cell.css";

const Cell = ({ isMouseDown, animationComplete, node }) => {
  let classes = ["Cell"];

  useEffect(() => {
    node.setClasses();
  },[node])

  console.log("Cell rendered");

  if (node.row === 10 && node.col === 10) {
    classes.push("Filled");
  }
  if (node.row === 10 && node.col === 30) {
    classes.push("Target");
  }

  const onMouseEnterHandler = () => {
    if (isMouseDown) node.setWall();
  };

  const onMouseLeaveHandler = () => {};

  const onMouseDownHandler = () => {
    node.setWall();
  };

  const onMouseUpHandler = () => {};

  return (
    <div
      className={classes.join(" ")}
      id={`${node.row} ${node.col}`}
      onMouseDown={onMouseDownHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseUp={onMouseUpHandler}
    ></div>
  );
};

export default React.memo(Cell, () => true);
