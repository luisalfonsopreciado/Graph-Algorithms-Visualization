import React, { useState } from "react";
import Cell from "./Cell/Cell";
import * as util from "../utility/index";
import "./Board.css";
import useNodeGrid from "../hooks/useNodeGrid";
import Navbar from "./Navigation/Toolbar/Toolbar";
import { useStore } from "../hooks-store/store";

const ROWS_INIT = 20;
const COLS_INIT = 50;

const Board = ({ openDialog }) => {
  const { algorithm } = useStore()[0];
  const {
    nodeGrid,
    resetGrid,
    removeVisuals,
    paintInDistance,
    resetDistance,
  } = useNodeGrid();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [animating, setIsAnimating] = useState(true);
  const [isMovingTarget, setIsMovingTarget] = useState(false);
  const [isMovingSecondTarget, setIsMovingSecondTarget] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [settingSecondTarget, setSettingSecondTarget] = useState(false);
  const [hasSecondTarget, setHasSecondTarget] = useState(false);
  const [numTargets, setNumTargets] = useState(1);
  const [prevAlgorithm, setPrevAlgorithm] = useState(util.DIJKSTRA);
  const [canPlaceWall, setCanPlaceWall] = useState(true);
  const [userAction, setUserAction] = useState(util.PLACING_WALLS);

  const handleTargetMove = (node) => {
    node.setAsTarget();
    switch (prevAlgorithm) {
      case util.DIJKSTRA:
        paintInDistance(node.dist);
        node.markShortestPath();
        break;
      case util.ASTAR:
        resetDistance();
        AStar(false);
        break;
      case util.GREEDY_BFS:
        resetDistance();
        bestFirstSearch(false);
        break;
      case util.BFS:
        paintInDistance(node.dist);
        node.markShortestPath();
        break;
      case util.DFS:
        resetDistance();
        DFS(false);
        node.markShortestPath();
        break;
      default:
    }
  };

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
      if (canPlaceWall) node.setWall();
    }
    if (isMouseDown && isMovingStart && !node.is("Target")) node.add("Start");
    if (isMouseDown && isMovingTarget && !node.is("Start")) {
      handleTargetMove(node);
    }
    if (isMouseDown && isMovingSecondTarget) node.setAsSecondTarget();
  };

  const onMouseDownHandler = (node) => {
    if (!animating) return;
    if (userAction === util.ADDING_WEIGHT) return !node.isKeyValue() && node.add("Weight");
    if (userAction === util.DELETING) return node.remove(["Wall", "Weight"]);
    setIsMouseDown(true);
    if (settingSecondTarget) {
      let num = numTargets;
      setNumTargets(num + 1);
      setHasSecondTarget(true);
      return setSettingSecondTarget(false);
    }
    if (!node.isKeyValue() && canPlaceWall) return node.setWall();
    if (node.is("Start") && canPlaceWall) return setIsMovingStart(true);
    if (node.is("Target")) return setIsMovingTarget(true);
    if (node.is("SecondaryTarget")) return setIsMovingSecondTarget(true);
  };

  const onMouseLeaveHandler = (node) => {
    if (!animating) return;
    if (
      isMovingStart ||
      isMovingTarget ||
      settingSecondTarget ||
      isMovingSecondTarget
    ) {
      if (isMovingStart) node.removeClass("Start");
      if (isMovingTarget) node.removeClass("Target");
    }
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
    setPrevAlgorithm(algorithm);
    setCanPlaceWall(false);
    setUserAction(util.VISUALIZING);

    let animations = [];
    switch (algorithm) {
      case util.BFS:
        animations = BFS();
        break;
      case util.DFS:
        animations = DFS(true);
        break;
      case util.ASTAR:
        animations = AStar(true);
        break;
      case util.DIJKSTRA:
        animations = Dijkstra();
        break;
      case util.GREEDY_BFS:
        animations = bestFirstSearch(true);
        break;
      case util.DSTAR:
        animations = DStar();
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

  const DFS = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.dfs(startNode, withAnimation);
    return animations;
  };

  const Dijkstra = () => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = [];
    graph.dijkstra(startNode, animations, hasSecondTarget);
    return animations;
  };

  const AStar = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.aStar(startNode, targetNode, withAnimation);
    return animations;
  };

  const DStar = () => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    console.log(startNode);
    const animations = graph.dStar(startNode, targetNode);
    return animations;
  };

  const bestFirstSearch = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.bestFirstSearch(
      startNode,
      targetNode,
      withAnimation
    );
    return animations;
  };

  const clear = () => {
    if (!animating) return;
    setCanPlaceWall(true);
    setHasSecondTarget(false);
    setPrevAlgorithm(null);
    resetGrid();
  };

  const removeVisualization = () => {
    if (!animating) return;
    setCanPlaceWall(true);
    setPrevAlgorithm(null);
    removeVisuals();
  };

  const generateMaze = (type) => {
    if (!animating) return;
    clear();

    switch (type) {
      case util.RECURSIVE_DIVISON:
        util.recursiveDivision(nodeGrid);
        break;
      case util.DRAW_COUNTOUR:
        util.drawContourWalls(nodeGrid);
        break;
      default:
        util.randomMaze(nodeGrid);
        break;
    }
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

      (node.is("Target") || node.is("SecondaryTarget")) &&
        node.markShortestPath();

      count++;

      if (count >= animations.length) {
        setIsAnimating(true);
        clearInterval(intervalId);
      }
    }, 10);
  };

  return (
    <>
      <Navbar
        openDialog={openDialog}
        reset={clear}
        algorithm={algorithm}
        executeAlgorithm={executeAlgorithm}
        clear={removeVisualization}
        mazeGen={generateMaze}
        settingSecondTarget={setSettingSecondTarget}
        setUserAction={setUserAction}
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
    </>
  );
};

export default Board;
