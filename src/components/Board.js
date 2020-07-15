import React, { useState } from "react";
import Cell from "./Cell/Cell";
import * as util from "../utility/index";
import "./Board.css";
import useNodeGrid from "../hooks/useNodeGrid";
import Navbar from "./Navigation/Toolbar/Toolbar";
import { useStore } from "../hooks-store/store";

const ROWS_INIT = 10;
const COLS_INIT = 40;

const Board = ({ openDialog }) => {
  const { algorithm } = useStore()[0];

  const {
    nodeGrid,
    resetGrid,
    removeVisuals,
    resetDistance,
    setNumRows,
    setNumCols,
    numRows,
    numCols
  } = useNodeGrid(ROWS_INIT, COLS_INIT);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [animating, setIsAnimating] = useState(true);
  const [isMovingTarget, setIsMovingTarget] = useState(false);
  const [isMovingSecondTarget, setIsMovingSecondTarget] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [settingSecondTarget, setSettingSecondTarget] = useState(false);
  const [hasSecondTarget, setHasSecondTarget] = useState(false);
  const [numTargets, setNumTargets] = useState(1);
  const [prevAlgorithm, setPrevAlgorithm] = useState();
  const [userAction, setUserAction] = useState(util.PLACING_WALLS);

  const handleKeyNodeMove = (node, type) => {
    if (type === "Target") node.setAsTarget();
    if (type === "Start") node.add("Start");
    switch (prevAlgorithm) {
      case util.DIJKSTRA:
        resetDistance();
        Dijkstra(false);
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
        resetDistance();
        BFS(false);
        break;
      case util.DFS:
        resetDistance();
        DFS(false);
        break;
      case util.DSTAR:
        resetDistance();
        DStar(false);
        break;
      default:
    }
  };

  const onMouseEnterHandler = (node) => {
    if (!animating) return;
    if (settingSecondTarget) {
      return node.setAsSecondTarget();
    }
    if (isMouseDown && isMovingStart && !node.is("Target")) {
      return handleKeyNodeMove(node, "Start");
    }
    if (isMouseDown && isMovingTarget && !node.is("Start")) {
      return handleKeyNodeMove(node, "Target");
    }
    if (isMouseDown && isMovingSecondTarget) return node.setAsSecondTarget();
    if (userAction === util.PLACING_WALLS && isMouseDown) {
      return node.setWall();
    }
  };

  const onMouseDownHandler = (node) => {
    if (!animating) return;
    if (userAction === util.ADDING_WEIGHT)
      return !node.isKeyValue() && node.add("Weight");
    if (userAction === util.DELETING) return node.remove(["Wall", "Weight"]);
    setIsMouseDown(true);
    if (settingSecondTarget) {
      let num = numTargets;
      setNumTargets(num + 1);
      setHasSecondTarget(true);
      return setSettingSecondTarget(false);
    }
    if (!node.isKeyValue()) return node.setWall();
    if (node.is("Start")) return setIsMovingStart(true);
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
          mouse={{
            onMouseEnter: onMouseEnterHandler,
            onMouseDown: onMouseDownHandler,
            onMouseUp: onMouseUpHandler,
            onMouseLeave: onMouseLeaveHandler,
          }}
          numRows={numRows}
          numCols={numCols}
        />
      );
    });
  });

  const executeAlgorithm = (type) => {
    removeVisualization();
    if (!animating) return;
    setIsAnimating(false);
    setPrevAlgorithm(algorithm);
    setUserAction(util.PLACING_WALLS);

    let animations = [];
    switch (algorithm) {
      case util.BFS:
        animations = BFS(true);
        break;
      case util.DFS:
        animations = DFS(true);
        break;
      case util.ASTAR:
        animations = AStar(true);
        break;
      case util.DIJKSTRA:
        animations = Dijkstra(true);
        break;
      case util.GREEDY_BFS:
        animations = bestFirstSearch(true);
        break;
      case util.DSTAR:
        animations = DStar(true);
        break;
      default:
        animations = BFS(true);
        break;
    }
    animate(animations, algorithm);
  };

  const BFS = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.bfs(startNode, withAnimation);
    return animations;
  };

  const DFS = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = graph.dfs(startNode, withAnimation);
    return animations;
  };

  const Dijkstra = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const animations = [];
    graph.dijkstra(startNode, animations, hasSecondTarget, withAnimation);
    return animations;
  };

  const AStar = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.aStar(startNode, targetNode, withAnimation);
    return animations;
  };

  const DStar = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const animations = graph.dStar(startNode, targetNode, withAnimation);
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
    setHasSecondTarget(false);
    setPrevAlgorithm(null);
    resetGrid();
  };

  const removeVisualization = () => {
    if (!animating) return;
    setPrevAlgorithm(null);
    removeVisuals();
  };

  const generateMaze = (type, obj) => {
    if (!animating) return;
    clear();

    switch (type) {
      case util.RECURSIVE_DIVISON:
        util.recursiveDivision(nodeGrid, obj);
        break;
      case util.DRAW_COUNTOUR:
        util.drawContourWalls(nodeGrid, obj);
        break;
      default:
        util.randomMaze(nodeGrid, obj);
        break;
    }
  };

  const animate = (animations, algorithm) => {
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

      node.is("Start") && algorithm === util.DSTAR && node.markShortestPath();

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
        setNumRows={setNumRows}
        setNumCols={setNumCols}
      />
      <br />
      <div
        className="Board"
        style={{
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        }}
      >
        {Grid}
      </div>
    </>
  );
};

const compare = (prevProps, nextProps) => {
  return true;
};

export default React.memo(Board, compare);
