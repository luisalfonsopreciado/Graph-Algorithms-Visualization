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
  const [isMovingSecondTarget, setIsMovingSecondTarget] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [settingSecondTarget, setSettingSecondTarget] = useState(false);
  const [hasSecondTarget, setHasSecondTarget] = useState(false);
  const [numTargets, setNumTargets] = useState(1);

  const onMouseEnterHandler = (node) => {
    if (!animating) return;
    if (settingSecondTarget) {
      node.setAsSecondTarget();
    }
    if (
      isMouseDown &&
      !isMovingStart &&
      !isMovingTarget &&
      !isMovingSecondTarget
    ) {
      node.setWall();
    }
    if (isMouseDown && isMovingStart) node.setAsStart();
    if (isMouseDown && isMovingTarget) node.setAsTarget();
    if (isMouseDown && isMovingSecondTarget) node.setAsSecondTarget();
  };

  const onMouseDownHandler = (node) => {
    if (!animating) return;
    setIsMouseDown(true);
    if (settingSecondTarget) {
      let num = numTargets;
      setNumTargets(num + 1);
      setHasSecondTarget(true);
      return setSettingSecondTarget(false);
    }
    if (!node.isKeyValue()) return node.setWall();
    if (node.isStart()) return setIsMovingStart(true);
    if (node.isTarget()) return setIsMovingTarget(true);
    if (node.isSecondTarget()) return setIsMovingSecondTarget(true);
  };

  const onMouseLeaveHandler = (node) => {
    if (!animating) return;
    if (
      isMovingStart ||
      isMovingTarget ||
      settingSecondTarget ||
      isMovingSecondTarget
    )
      node.clear();
  };

  const onMouseUpHandler = () => {
    if (!animating) return;
    setIsMouseDown(false);
    setIsMovingStart(false);
    setIsMovingTarget(false);
    setIsMovingSecondTarget(false);
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
    const animations = [];
    graph.dijkstra(startNode, animations, hasSecondTarget);
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
    setHasSecondTarget(false);
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
    let targetNum = 1;

    const intervalId = setInterval(() => {
      const node = animations[count];

      targetNum % 2 === 0 ? node.markSearched() : node.markSearched2();
      
      (node.isTarget() || node.isSecondTarget()) && node.markShortestPath(); 

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
        settingSecondTarget={setSettingSecondTarget}
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
