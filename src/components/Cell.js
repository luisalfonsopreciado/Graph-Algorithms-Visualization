import React, { useEffect } from "react";
import "./Cell.css";

const Cell = ({ isMouseDown, animationComplete, node }) => {
  let classes = ["Cell"];

  useEffect(() => {
    console.log("Cell UseEffect")
    node.setClasses();
  }, []);

  if (node.row === 10 && node.col === 10) {
    classes.push("Filled");
  }
  if (node.row === 10 && node.col === 30) {
    classes.push("Target");
  }

  const onMouseEnterHandler = () => {
    if (isMouseDown) {
      node.setWall();
    }
  };

  const onMouseLeaveHandler = () => {};

  const onMouseDownHandler = () => {
    if (!node.isKeyValue()) node.setWall();
  };

  const onMouseUpHandler = () => {
    console.log("Cell on mouse up")
  };

  return (
    <div
      className={classes.join(" ")}
      id={`${node.row} ${node.col}`}
      onMouseDown={onMouseDownHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseUp={onMouseUpHandler}
    >
    </div>
  );
};

const compare = (prevProps, nextProps) => {
  return prevProps.isMouseDown === nextProps.isMouseDown;
}

export default React.memo(Cell, compare);
