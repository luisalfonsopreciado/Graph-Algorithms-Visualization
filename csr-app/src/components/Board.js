import React, { useState } from "react";
import Cell from "./Cell/Cell";
import * as util from "../utility/index";
import "./Board.css";
import useNodeGrid from "../hooks/useNodeGrid";
import Navbar from "./Navigation/Toolbar/Toolbar";
import { useStore } from "../hooks-store/store";
import { Paper, makeStyles } from "@material-ui/core";
import { getPath } from "../utility/Algorithms/floydWarshall";
import Node from "../utility/Node";
import { BELLMAN_FORD } from "../utility/index";

const ROWS_INIT = 10;
const COLS_INIT = 40;
let pathMtrx = null;

const useStyles = makeStyles({
  paper: {
    padding: "5px",
    margin: "auto",
    width: "1200px",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

/**
 * Board Component
 * @param {*} param0
 */
const Board = ({ openDialog }) => {
  const { algorithm } = useStore()[0];
  const classes = useStyles();

  console.log("Board");

  const {
    nodeGrid,
    resetGrid,
    removeVisuals,
    resetDistance,
    setNumRows,
    setNumCols,
    numRows,
    numCols,
  } = useNodeGrid(ROWS_INIT, COLS_INIT);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [animating, setIsAnimating] = useState(true);
  const [isMovingTarget, setIsMovingTarget] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [settingSecondTarget, setSettingSecondTarget] = useState(false);
  const [prevAlgorithm, setPrevAlgorithm] = useState();
  const [userAction, setUserAction] = useState(util.PLACING_WALLS);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [distance, setDistance] = useState(util.UNK);
  const [matrix, setMatrix] = useState(null);

  const handleKeyNodeMove = (node, type) => {
    if (type === util.TARGET) node.setAsTarget();
    if (type === util.START) node.add(util.START);
    if (prevAlgorithm !== util.FLOYD_WARSHALL) resetDistance();

    const { startNode, targetNode } = util.getKeyNodes(nodeGrid);

    switch (prevAlgorithm) {
      case util.DIJKSTRA:
        Dijkstra(false);
        break;
      case util.ASTAR:
        AStar(false);
        break;
      case util.GREEDY_BFS:
        bestFirstSearch(false);
        break;
      case util.BFS:
        BFS(false);
        break;
      case util.DFS:
        DFS(false);
        break;
      case util.DSTAR:
        DStar(false);
        break;
      case util.PRIMS:
        Prims(false);
        break;
      case util.FLOYD_WARSHALL:
        setDistance(matrix[startNode.id][targetNode.id]);
        drawPath(startNode.id, targetNode.id);
        break;
      case util.BELLMAN_FORD:
        bellmanFord(false);
        targetNode.markShortestPath();
        break;
      default:
    }

    if (
      prevAlgorithm !== util.FLOYD_WARSHALL &&
      prevAlgorithm !== util.BELLMAN_FORD
    )
      setDistance(targetNode.dist === Infinity ? util.UNK : targetNode.dist);
  };

  const onMouseEnterHandler = (node) => {
    if (!animating) return;
    if (settingSecondTarget) {
      return node.setAsSecondTarget();
    }
    if (isMouseDown && isMovingStart && !node.is(util.TARGET)) {
      return handleKeyNodeMove(node, util.START);
    }
    if (isMouseDown && isMovingTarget && !node.is(util.START)) {
      return handleKeyNodeMove(node, util.TARGET);
    }
    if (userAction === util.PLACING_WALLS && isMouseDown) {
      return node.setWall();
    }
  };

  const onMouseDownHandler = (node) => {
    setIsMouseDown(true);
    if (!animating) return;
    if (userAction === util.ADDING_WEIGHT)
      return !node.isKeyValue() && node.add(util.WEIGHT);
    if (userAction === util.ADDING_N_WEIGHT)
      return !node.isKeyValue() && node.add(util.N_WEIGHT);
    if (userAction === util.DELETING)
      return node.remove([util.WALL, util.WEIGHT]);
    if (!node.isKeyValue()) return node.setWall();
    if (node.is(util.START)) setIsMovingStart(true);
    if (node.is(util.TARGET)) setIsMovingTarget(true);
  };

  const onMouseLeaveHandler = (node) => {
    if (!animating) return;
    if (isMovingStart) node.removeClass(util.START);
    if (isMovingTarget) node.removeClass(util.TARGET);
  };

  const onMouseUpHandler = () => {
    // if (!animating) return;
    setIsMouseDown(false);
    setIsMovingStart(false);
    setIsMovingTarget(false);
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

  const executeAlgorithm = () => {
    removeVisualization();
    if (!animating) return;
    setIsAnimating(false);
    setPrevAlgorithm(algorithm);
    setUserAction(util.PLACING_WALLS);
    resetDistance();

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
      case util.PRIMS:
        animations = Prims(true);
        break;
      case util.KRUSKAL:
        animations = Kruskal();
        break;
      case util.FLOYD_WARSHALL:
        animations = floydWarshall(true);
        break;
      case util.BELLMAN_FORD:
        animations = bellmanFord(true);
        break;
      case util.BIDIRECTIONAL_BFS:
        animations = bidirectionalBFS(true);
        break;
      default:
        animations = BFS(true);
        break;
    }

    animate(animations, algorithm);
  };

  const BFS = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.bfs(startNode, withAnimation);
    return algExecInfo;
  };

  const DFS = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.dfs(startNode, withAnimation);
    return algExecInfo;
  };

  const Dijkstra = (withAnimation) => {
    const { startNode, graph } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.dijkstra(startNode, withAnimation);
    return algExecInfo;
  };

  const AStar = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.aStar(startNode, targetNode, withAnimation);
    return algExecInfo;
  };

  const DStar = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.dStar(startNode, targetNode, withAnimation);
    return algExecInfo;
  };

  const floydWarshall = () => {
    const algExecInfo = util.floydWarshall(nodeGrid);
    pathMtrx = algExecInfo.kwargs.path;
    setDistance(algExecInfo.distance);
    setMatrix(algExecInfo.kwargs.mtrx);
    return algExecInfo;
  };

  const bestFirstSearch = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.bestFirstSearch(
      startNode,
      targetNode,
      withAnimation
    );
    return algExecInfo;
  };

  const Prims = (withAnimation) => {
    const { startNode, graph, targetNode } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.Prims(startNode, targetNode, withAnimation);
    return algExecInfo;
  };

  const Kruskal = () => {
    const { graph } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.kruskal();
    return algExecInfo;
  };

  const bellmanFord = (withAnimation) => {
    const { graph, startNode, targetNode } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.bellmanFord(
      startNode,
      targetNode,
      nodeGrid,
      withAnimation
    );
    return algExecInfo;
  };

  const bidirectionalBFS = () => {
    const { graph, startNode, targetNode } = util.generateGraph(nodeGrid);
    const algExecInfo = graph.bidirectionalBFS(startNode, targetNode);
    return algExecInfo;
  };

  const drawPath = (startId, targetId) => {
    const finalPath = getPath(startId, targetId, pathMtrx);
    let prevNode = null;

    for (let nodeId of finalPath) {
      const node = Node.getNode(nodeId, nodeGrid);
      node.predecessor = prevNode;
      prevNode = node;
    }
    prevNode && prevNode.markShortestPath();
  };

  const clear = () => {
    if (!animating) return;
    setPrevAlgorithm(null);
    setDistance(util.UNK);
    setMatrix(null);
    pathMtrx = null;
    resetGrid();
  };

  const removeVisualization = () => {
    if (!animating) return;
    setPrevAlgorithm(null);
    setDistance(util.UNK);
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
      case util.PRIMS_ALGO:
        const { graph, startNode, targetNode } = util.generateGraph(nodeGrid);
        util.primsAlgorithm(nodeGrid, startNode, targetNode, graph, obj);
        break;
      case util.PRIMS_ALGO_531:
        const { graph: g, startNode: st, targetNode: t } = util.generateGraph(
          nodeGrid
        );
        util.primsAlgorithm531(nodeGrid, st, t, g, obj);
        break;
      default:
        util.randomMaze(nodeGrid, obj);
        break;
    }
  };

  /**
   * Animate the animations of the execution of an algorithm.
   * @param {AlgExecInfo} algExecInfo
   */
  const animate = (algExecInfo) => {
    const { animations, distance, withAnimation } = algExecInfo;
    if (!withAnimation) return;
    if (animations.length <= 0) return setIsAnimating(true);
    let count = 0;
    let targetNodeRef = null;

    const intervalId = setInterval(() => {
      const node = animations[count];

      // Weight nodes do not get colored when markSearched is called
      !node.is(util.WEIGHT) ? node.markSearched() : node.markSearched2Done();

      if (node.is(util.TARGET)) {
        if (algorithm !== util.FLOYD_WARSHALL) {
          setDistance(distance);
        }

        // Save the reference to the target node in Bellmand Ford's
        if (algorithm === util.BELLMAN_FORD) {
          targetNodeRef = node;
        } else {
          node.markShortestPath();
        }
      }

      if (node.is(util.START) && algorithm === util.DSTAR) {
        node.markShortestPath();
        setDistance(node.dist);
      }

      count++;

      if (count >= animations.length) {
        setIsAnimating(true);
        clearInterval(intervalId);
        if (algorithm === util.FLOYD_WARSHALL) {
          const { startNode, targetNode } = util.getKeyNodes(nodeGrid);
          drawPath(startNode.id, targetNode.id);
        }
        // Animate the final path after marking nodes as visited
        if (algorithm === BELLMAN_FORD) {
          targetNodeRef.markShortestPath();
        }
      }
    }, animationSpeed);
  };

  /**
   * Wrapper function for setNumRows in useNodeGrid Hook.
   * It's main purpose is to reset the previous algorithm so that
   * when user changes grid size, no animations are displayed.
   * Prevent's user from changing grid size while animation is taking place.
   * @param {number} numRows
   */
  const setRows = (n) => {
    if (!animating) return;
    setPrevAlgorithm(null);
    setNumRows(n);
  };

  return (
    <div className="text-center">
      <Navbar
        openDialog={openDialog}
        reset={clear}
        algorithm={algorithm}
        executeAlgorithm={executeAlgorithm}
        clear={removeVisualization}
        mazeGen={generateMaze}
        settingSecondTarget={setSettingSecondTarget}
        setUserAction={setUserAction}
        setNumRows={setRows}
        setNumCols={setNumCols}
        setSpeed={setAnimationSpeed}
      />
      <br />
      <Paper className={classes.paper}>
        <h2>
          Click on a Cell to add Walls! You can also drag the target/start!
        </h2>
        <h3 style={{ color: "red" }}>Distance: {distance} </h3>
        <p>{util.ALG_TITLE[algorithm]}</p>
      </Paper>
      <div
        className="Board"
        style={{
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        }}
      >
        {Grid}
      </div>
    </div>
  );
};

export default Board;
