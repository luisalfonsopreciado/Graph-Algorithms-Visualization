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
  settingSecondTarget,
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
            clicked={() => dispatch("SET_ALGO", { algo: cts.DIJKSTRA })}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_ALGO", { algo: cts.DIJKSTRA })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.ASTAR}>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.ASTAR })}>
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.ASTAR })}>
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.GREEDY_BFS}>
          <DropItem
            clicked={() => dispatch("SET_ALGO", { algo: cts.GREEDY_BFS })}
          >
            Select
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_ALGO", { algo: cts.GREEDY_BFS })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.BFS}>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.BFS })}>
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.BFS })}>
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.DFS}>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.DFS })}>
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.DFS })}>
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.DSTAR}>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.DSTAR })}>
            Select
          </DropItem>
          <DropItem clicked={() => dispatch("SET_ALGO", { algo: cts.DSTAR })}>
            Learn More
          </DropItem>
        </DropDown>
      </Subnav>
      <Subnav title="Maze Generators">
        <DropDown title={cts.RAND_MAZE}>
          <DropItem clicked={() => mazeGen(cts.RAND_MAZE)}>Generate</DropItem>
          <DropItem
            clicked={() => dispatch("SET_ALGO", { algo: cts.RAND_MAZE })}
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.RECURSIVE_DIVISON}>
          <DropItem clicked={() => mazeGen(cts.RECURSIVE_DIVISON)}>
            Generate
          </DropItem>
          <DropItem
            clicked={() =>
              dispatch("SET_ALGO", { algo: cts.RECURSIVE_DIVISON })
            }
          >
            Learn More
          </DropItem>
        </DropDown>
        <DropDown title={cts.DRAW_COUNTOUR}>
          <DropItem clicked={() => mazeGen(cts.DRAW_COUNTOUR)}>
            Generate
          </DropItem>
          <DropItem
            clicked={() => dispatch("SET_ALGO", { algo: cts.DRAW_COUNTOUR })}
          >
            Learn More
          </DropItem>
        </DropDown>
      </Subnav>
      <Subnav title="Draw">
        <DropDown title="Options">
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
          <DropItem clicked={() => setNumRows(30)}>Large</DropItem>
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
