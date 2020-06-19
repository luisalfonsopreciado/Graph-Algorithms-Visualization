import React from "react";
import "./Cell.css";

const Cell = ({
  val,
  row,
  col,
  isMouseDown,
  isMovingKeyItem,
  setIsMovingKeyItem,
  animationComplete,
  node,
}) => {
  let classes = ["Cell"];

  if (node.row === 10 && node.col === 10) {
    classes.push("Filled");
  }
  if (node.row === 10 && node.col === 30) {
    classes.push("Target");
  }

  const onMoveHandler = () => {
    if (isMouseDown && !isMovingKeyItem[0]) {
      node.setWall();
    }
    if (isMovingKeyItem[0] && !animationComplete) {
      if (isMovingKeyItem[1] === "t") {
        node.setAsTarget();
      } else {
        node.setAsStart();
      }
    }
    if (isMovingKeyItem[0] && animationComplete) {
      node.markShortestPath();
    }
  };

  const onLeaveHandler = () => {
    const cell = document.getElementById(`${row} ${col}`);
    if (isMouseDown && isMovingKeyItem[0]) {
      if (isMovingKeyItem[1] === "t") {
        cell.classList.remove("Target");
      } else {
        cell.classList.remove("Filled");
      }
    }
  };

  const onClickHandler = () => {
    if (node.isTarget()) {
      setIsMovingKeyItem([true, "t"]);
    }
    if(node.isStart()){
      setIsMovingKeyItem([true, "s"]);
    }
  };

  const onMouseUpHandler = () => {
    if (isMovingKeyItem[1]) {
      // Set coord and set IsNotmoving key item
      // setCoord(row, col, isMovingKeyItem[1]);
      setIsMovingKeyItem(false);
    }
  };

  return (
    <div
      className={classes.join(" ")}
      id={`${row} ${col}`}
      onMouseDown={onClickHandler}
      onMouseEnter={onMoveHandler}
      onMouseLeave={onLeaveHandler}
      onMouseUp={onMouseUpHandler}
      draggable={false}
    ></div>
  );
};

const compare = (prevState, nextState) => {
  return (
    prevState.val === nextState.val &&
    prevState.isMouseDown === nextState.isMouseDown
  );
};

export default React.memo(Cell, compare);
