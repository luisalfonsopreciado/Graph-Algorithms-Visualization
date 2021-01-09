import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import * as cts from "../../../utility";
import DropDown from "./Dropdown/DropDown";
import Subnav from "./Subnav/Subnav";
import DropItem from "./Dropdown/DropItem/DropItem";
import { useStore } from "../../../hooks-store/store";

const NavigationItems = ({
  reset,
  executeAlgorithm,
  algorithm,
  mazeGen,
  setSpeed,
  openDialog,
  clear,
  setUserAction,
  setNumRows,
}) => {
  const dispatch = useStore(false)[1];
  return (
    <>
      <NavigationItem clicked={openDialog}>ABOUT</NavigationItem>
      <Subnav title="Algorithms">
        <DropDown title={cts.DIJKSTRA}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.DIJKSTRA });
              dispatch("SET_ALGO", { algo: cts.DIJKSTRA });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_INFO", { info: cts.DIJKSTRA })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.ASTAR}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.ASTAR });
              dispatch("SET_ALGO", { algo: cts.ASTAR });
            }}
          >
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_INFO", { info: cts.ASTAR })}>
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.GREEDY_BFS}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.GREEDY_BFS });
              dispatch("SET_ALGO", { algo: cts.GREEDY_BFS });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_INFO", { info: cts.GREEDY_BFS })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.BFS}>
          <DropItem
            clicked={() => {
              dispatch("SET_ALGO", { algo: cts.BFS });
              dispatch("SET_INFO", { info: cts.BFS });
            }}
          >
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_INFO", { info: cts.BFS })}>
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.DFS}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.DFS });
              dispatch("SET_ALGO", { algo: cts.DFS });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.DFS });
            }}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.PRIMS}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.PRIMS });
              dispatch("SET_ALGO", { algo: cts.PRIMS });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.PRIMS });
            }}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.KRUSKAL}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.KRUSKAL });
              dispatch("SET_ALGO", { algo: cts.KRUSKAL });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.KRUSKAL });
            }}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.FLOYD_WARSHALL}>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.FLOYD_WARSHALL });
              dispatch("SET_ALGO", { algo: cts.FLOYD_WARSHALL });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.KRUSKAL });
            }}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.DSTAR}>
          <DropItem
            clicked={() => {
              dispatch("SET_ALGO", { algo: cts.DSTAR });
              dispatch("SET_INFO", { info: cts.DSTAR });
            }}
          >
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_INFO", { info: cts.DSTAR })}>
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.BELLMAN_FORD}>
          <DropItem
            clicked={() => {
              dispatch("SET_ALGO", { algo: cts.BELLMAN_FORD });
              dispatch("SET_INFO", { info: cts.BELLMAN_FORD });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_INFO", { info: cts.BELLMAN_FORD })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.BIDIRECTIONAL_BFS}>
          <DropItem
            clicked={() => {
              dispatch("SET_ALGO", { algo: cts.BIDIRECTIONAL_BFS });
              dispatch("SET_INFO", { info: cts.BIDIRECTIONAL_BFS });
            }}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() =>
              dispatch("SET_INFO", { info: cts.BIDIRECTIONAL_BFS })
            }
          >
            Learn More
          </DropItem>
        </DropDown>
      </Subnav>
      <Subnav title="Maze Generators">
        <DropDown title={cts.RAND_MAZE}>
          <DropItem clicked={() => mazeGen(cts.RAND_MAZE, cts.WALL)}>
            Generate Walls
          </DropItem>
          <DropItem clicked={() => mazeGen(cts.RAND_MAZE, cts.WEIGHT)}>
            Generate Weights
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_INFO", { info: cts.RAND_MAZE })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.PRIMS_ALGO}>
          <DropItem clicked={() => mazeGen(cts.PRIMS_ALGO, cts.WALL)}>
            Generate Walls (Vanilla)
          </DropItem>
          <DropItem clicked={() => mazeGen(cts.PRIMS_ALGO, cts.WEIGHT)}>
            Generate Weights (Vanilla)
          </DropItem>
          <DropItem clicked={() => mazeGen(cts.PRIMS_ALGO_531, cts.WALL)}>
            Generate Walls (5,0,3)
          </DropItem>
          <DropItem clicked={() => mazeGen(cts.PRIMS_ALGO_531, cts.WEIGHT)}>
            Generate Weights (5,0,3)
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_INFO", { info: cts.PRIMS_ALGO })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.RECURSIVE_DIVISON}>
          <DropItem clicked={() => mazeGen(cts.RECURSIVE_DIVISON, cts.WALL)}>
            Generate Walls
          </DropItem>
          <DropItem clicked={() => mazeGen(cts.RECURSIVE_DIVISON, cts.WEIGHT)}>
            Generate Weights
          </DropItem>
          <DropItem
            clicked={() => {
              dispatch("SET_INFO", { info: cts.RECURSIVE_DIVISON });
            }}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.DRAW_COUNTOUR}>
          <DropItem clicked={() => mazeGen(cts.DRAW_COUNTOUR, cts.WALL)}>
            Generate Walls
          </DropItem>
          <DropItem clicked={() => mazeGen(cts.DRAW_COUNTOUR, cts.WEIGHT)}>
            Generate Weights
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_INFO", { info: cts.DRAW_COUNTOUR })}
          >
            Learn More
          </DropItem>
        </DropDown>
      </Subnav>
      <Subnav title="Options">
        <DropDown title="Draw">
          <DropItem clicked={() => setUserAction(cts.DELETING)}>
            Delete Wall
          </DropItem>
          <DropItem clicked={() => setUserAction(cts.PLACING_WALLS)}>
            Draw Wall
          </DropItem>
        </DropDown>
        <DropDown title="Add Weight">
          <DropItem clicked={() => setUserAction(cts.ADDING_WEIGHT)}>
            Add Weight
          </DropItem>
          <DropItem clicked={() => setUserAction(cts.ADDING_N_WEIGHT)}>
            Add Negative Weight
          </DropItem>
          <DropItem clicked={() => setUserAction(cts.PLACING_WALLS)}>
            Draw Wall
          </DropItem>
        </DropDown>
        <DropDown title="Set Grid Size">
          <DropItem
            clicked={() => {
              setNumRows(10);
            }}
          >
            Small
          </DropItem>
          <DropItem
            clicked={() => {
              setNumRows(20);
            }}
          >
            Medium
          </DropItem>
          <DropItem clicked={() => setNumRows(30)}>
            Large (Beware of Lag)
          </DropItem>
        </DropDown>
        <DropDown title="Set Animation Speed">
          <DropItem
            clicked={() => {
              setSpeed(100);
            }}
          >
            Slow
          </DropItem>
          <DropItem
            clicked={() => {
              setSpeed(50);
            }}
          >
            Medium
          </DropItem>
          <DropItem clicked={() => setSpeed(10)}>Fast</DropItem>
        </DropDown>
      </Subnav>

      {/* <NavigationItem clicked={() => settingSecondTarget(true)}>Add Second Target</NavigationItem> */}
      <NavigationItem clicked={reset}>Reset</NavigationItem>
      <NavigationItem clicked={clear}>Clear Visualization</NavigationItem>
      <NavigationItem clicked={executeAlgorithm} style={{ color: "red" }}>
        Visualize {algorithm}!
      </NavigationItem>
    </>
  );
};
export default NavigationItems;
