import React from "react";
import "./Cell.css";

const Cell = ({
  val,
  row,
  col,
  isMouseDown,
  isMovingKeyItem,
  setIsMovingKeyItem,
  setCoord,
  animationComplete,
  predecessors,
  drawShortestPath,
}) => {
  let classes = [];
  val === "s" && classes.push("Filled");
  val === "t" && classes.push("Target");

  const onMoveHandler = () => {
    const cell = document.getElementById(`${row} ${col}`);
    if (isMouseDown && !isMovingKeyItem[0]) {
      cell.classList.add("Wall");
    }
    if (isMovingKeyItem[0] && !animationComplete) {
      if(isMovingKeyItem[1] === "t"){
        cell.classList.add("Target")
      }else{
        cell.classList.add("Filled")
      }
    }
    if(isMovingKeyItem[0] && animationComplete){
      drawShortestPath(row, col, predecessors, 0, 0)
    }
  };

  const onLeaveHandler = () => {
    const cell = document.getElementById(`${row} ${col}`);
    if (isMouseDown && isMovingKeyItem[0]) {
      if(isMovingKeyItem[1] === "t"){
        cell.classList.remove("Target")
      }else{
        cell.classList.remove("Filled")
      }
    }
  }

  const onClickHandler = () => {
    if (val === "t" || val === "s") {
      
      setIsMovingKeyItem([true, val]);
    }
  };

  const onMouseUpHandler = () => {
    if(isMovingKeyItem[1]){
      // Set coord and set IsNotmoving key item
      setCoord(row, col, isMovingKeyItem[1])
      setIsMovingKeyItem(false);
    }
  }

  return (
    <td
      className={classes.join(" ")}
      id={`${row} ${col}`}
      onMouseDown={onClickHandler}
      onMouseEnter={onMoveHandler}
      onMouseLeave={onLeaveHandler}
      onMouseUp={onMouseUpHandler}
    ></td>
  );
};

const compare = (prevState, nextState) => {
  return (
    prevState.val === nextState.val &&
    prevState.isMouseDown === nextState.isMouseDown
  );
};

export default React.memo(Cell, compare);
