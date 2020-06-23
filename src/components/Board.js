import React, { useState } from "react";
import Cell from "./Cell";
import * as util from "../utility/index";
import "./Board.css";
import useNodeGrid from "../hooks/useNodeGrid";
import Navbar from "./Navigation/Toolbar/Toolbar";

const ROWS_INIT = 20;
const COLS_INIT = 50;

const Board = () => {
  const [algorithm, setAlgorithm] = useState(util.DIJKSTRA);
  const { nodeGrid, resetGrid, removeVisuals } = useNodeGrid();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [animating, setIsAnimating] = useState(true);
  const [isMovingTarget, setIsMovingTarget] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);

  const onMouseEnterHandler = (node) => {
    if (isMouseDown && !isMovingStart && !isMovingTarget) {
      node.setWall();
    }
    if (isMouseDown && isMovingStart) node.setAsStart();
    if (isMouseDown && isMovingTarget) node.setAsTarget();
  };

  const onMouseDownHandler = (node) => {
    setIsMouseDown(true);
    if (!node.isKeyValue()) return node.setWall();
    if (node.isStart()) return setIsMovingStart(true);
    setIsMovingTarget(true);
  };

  const onMouseLeaveHandler = (node) => {
    if (isMovingStart || isMovingTarget) node.clear();
  };

  const onMouseUpHandler = () => {
    setIsMouseDown(false);
    setIsMovingStart(false);
    setIsMovingTarget(false);
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

  const executeAlgorithm = (type) => {
    removeVisualization();
    if (!animating) return;
    setIsAnimating(false);

    let animations = [];
    switch (algorithm) {
      case util.BFS:
        animations = BFS();
        break;
      case util.DFS:
        animations = DFS();
        break;
      case util.ASTAR:
        animations = AStar();
        break;
      case util.DIJKSTRA:
        animations = Dijkstra();
        break;
      case util.GREEDY_BFS:
        animations = bestFirstSearch();
        break;
      default:
        animations = BFS();
        break;
    }
    animate(animations);
  };

  const BFS = () => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.bfs(startNode);
    return animations;
  };

  const DFS = () => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.dfs(startNode);
    return animations;
  };

  const Dijkstra = () => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.dijkstra(startNode);
    return animations;
  };

  const AStar = () => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.aStar(startNode, targetNode);
    return animations;
  };

  const bestFirstSearch = () => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.bestFirstSearch(startNode, targetNode);
    return animations;
  };

  const clear = () => {
    if (!animating) return;
    resetGrid();
  };

  const removeVisualization = () => {
    if (!animating) return;
    removeVisuals();
  };

  const generateMaze = (type) => {
    switch (type) {
      case util.RECURSIVE_DIVISON:
        doRecursiveDivision();
        break;
      default:
        doRandomMaze();
        break;
    }
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
    if (animations.length <= 0) {
      setIsAnimating(true);
      return;
    }
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
    <div className="MainContainer">
      <Navbar
        setAlgorithm={setAlgorithm}
        reset={clear}
        algorithm={algorithm}
        executeAlgorithm={executeAlgorithm}
        clear={removeVisualization}
        mazeGen={generateMaze}
      />
      <br />
      <div
        className="Board"
        style={{
          gridTemplateRows: `repeat(${ROWS_INIT}, 1fr)`,
          gridTemplateColumns: `repeat(${COLS_INIT}, 1fr)`,
        }}
      >
        {Grid}
      </div>
    </div>
  );
};

export default Board;
