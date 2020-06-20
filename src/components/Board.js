import React, { useState, Fragment } from "react";
import Cell from "./Cell";
import Button from "@material-ui/core/Button";
import * as util from "../utility/index";
import "./Board.css";
import useNodeGrid from "../hooks/useNodeGrid";

const ROWS_INIT = 20;
const COLS_INIT = 50;

const Board = () => {
  const { nodeGrid, resetGrid } = useNodeGrid();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [animating, setIsAnimating] = useState(true);

  const onMouseEnterHandler = (node) => {
    if (isMouseDown) {
      node.setWall();
    }
  };

  const onMouseDownHandler = (node) => {
    setIsMouseDown(true);
    if (!node.isKeyValue()) node.setWall();
  };

  const onMouseLeaveHandler = () => {};

  const onMouseUpHandler = () => {
    setIsMouseDown(false);
    console.log("Cell on mouse up");
  };

  let Grid = nodeGrid.map((row, rowNum) => {
    return row.map((val, colNum) => {
      return (
        <Cell
          key={val}
          node={nodeGrid[rowNum][colNum]}
          onMouseEnter={onMouseEnterHandler}
          onMouseDown={onMouseDownHandler}
          onMouseUp={onMouseUpHandler}
          onMouseLeave={onMouseLeaveHandler}
        />
      );
    });
  });

  const BFS = () => {
    setIsAnimating(false);
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.bfs(startNode);
    animate(animations);
  };

  const DFS = () => {
    setIsAnimating(false);
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.dfs(startNode);
    animate(animations);
  };

  const Dijkstra = () => {
    setIsAnimating(false);
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.dijkstra(startNode);
    animate(animations);
  };

  const AStar = () => {
    setIsAnimating(false);
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.aStar(startNode, targetNode);
    animate(animations);
  };

  const bestFirstSearch = () => {
    setIsAnimating(false);
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.bestFirstSearch(startNode, targetNode);
    animate(animations);
  };

  const clear = () => {
    if (!animating) return;
    resetGrid();
  };

  const doRandomMaze = () => {
    if (!animating) return;
    clear();
    util.randomMaze(nodeGrid);
  };

  const doRecursiveDivision = () => {
    if (!animating) return;
    clear();
    util.recursiveDivision(nodeGrid);
  };

  const animate = (animations) => {
    let count = 0;

    const intervalId = setInterval(() => {
      const node = animations[count];

      node.markSearched();
      node.isTarget() && node.markShortestPath();

      count++;

      if (count >= animations.length) {
        setIsAnimating(true);
        clearInterval(intervalId);
      }
    }, 10);
  };

  

  return (
    <Fragment>
      <div style={{ margin: "auto" }}>
        <Button onClick={DFS}>Do DFS</Button>
        <Button onClick={BFS}>Do BFS</Button>
        <Button onClick={Dijkstra}>Dijkstra</Button>
        <Button onClick={doRandomMaze}>Random Maze</Button>
        <Button onClick={doRecursiveDivision}>Recursive Division</Button>
        <Button onClick={AStar}>A*</Button>
        <Button onClick={bestFirstSearch}>Greedy Best First Search</Button>
        <Button onClick={clear}>Clear</Button>
      </div>
      <div
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
