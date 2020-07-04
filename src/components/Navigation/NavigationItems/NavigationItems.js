import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import * as cts from "../../../utility";
import DropDown from "./Dropdown/DropDown";
import Subnav from "./Subnav/Subnav";
import DropItem from "./Dropdown/DropItem/DropItem";

const NavigationItems = ({
  setAlgorithm,
  reset,
  executeAlgorithm,
  algorithm,
  mazeGen,
  settingSecondTarget,
  openDialog,
  clear,
  setDeleting
}) => (
  <>
    <NavigationItem clicked={openDialog}>ABOUT</NavigationItem>
    <Subnav title="Algorithms">
      <DropDown title={cts.DIJKSTRA}>
        <DropItem clicked={() => setAlgorithm(cts.DIJKSTRA)}>Select</DropItem>
        <DropItem clicked={() => alert(cts.DIJKSTRA)}>Learn More</DropItem>
      </DropDown>
      <DropDown
        clicked={() => setAlgorithm(cts.ASTAR)}
        moreInfo={() => alert(cts.ASTAR)}
        title={cts.ASTAR}
      >
        <DropItem clicked={() => setAlgorithm(cts.ASTAR)}>Select</DropItem>
        <DropItem clicked={() => alert(cts.ASTAR)}>Learn More</DropItem>
      </DropDown>
      <DropDown
        clicked={() => setAlgorithm(cts.GREEDY_BFS)}
        moreInfo={() => alert(cts.GREEDY_BFS)}
        title={cts.GREEDY_BFS}
      >
        <DropItem clicked={() => setAlgorithm(cts.GREEDY_BFS)}>Select</DropItem>
        <DropItem clicked={() => alert(cts.GREEDY_BFS)}>Learn More</DropItem>
      </DropDown>
      <DropDown title={cts.BFS}>
        <DropItem clicked={() => setAlgorithm(cts.BFS)}>Select</DropItem>
        <DropItem clicked={() => alert(cts.BFS)}>Learn More</DropItem>
      </DropDown>
      <DropDown title={cts.DFS}>
        <DropItem clicked={() => setAlgorithm(cts.DFS)}>Select</DropItem>
        <DropItem clicked={() => alert(cts.DFS)}>Learn More</DropItem>
      </DropDown>
    </Subnav>
    <Subnav title="Maze Generators">
      <DropDown
        title={cts.RAND_MAZE}
        clicked={() => mazeGen(cts.RAND_MAZE)}
        moreInfo={() => alert(cts.DIJKSTRA)}
      >
        <DropItem clicked={() => mazeGen(cts.RAND_MAZE)}>Generate</DropItem>
        <DropItem clicked={() => alert(cts.RECURSIVE_DIVISON)}>
          Learn More
        </DropItem>
      </DropDown>
      <DropDown title={cts.RECURSIVE_DIVISON}>
        <DropItem clicked={() => mazeGen(cts.RECURSIVE_DIVISON)}>
          Generate
        </DropItem>
        <DropItem clicked={() => alert(cts.RECURSIVE_DIVISON)}>
          Learn More
        </DropItem>
      </DropDown>
      <DropDown title={cts.DRAW_COUNTOUR}>
        <DropItem clicked={() => mazeGen(cts.DRAW_COUNTOUR)}>
          Generate
        </DropItem>
        <DropItem clicked={() => alert(cts.DRAW_COUNTOUR)}>
          Learn More
        </DropItem>
      </DropDown>
    </Subnav>
    <Subnav title="Draw">
    <DropDown title="Options">
        <DropItem clicked={() => setDeleting(true)}>
          Delete Wall
        </DropItem>
        <DropItem clicked={() => setDeleting(false)}>
          Draw Wall
        </DropItem>
      </DropDown>
    </Subnav>
   
    {/* <NavigationItem clicked={() => settingSecondTarget(true)}>Add Second Target</NavigationItem> */}
    <NavigationItem clicked={reset}>Reset</NavigationItem>
    <NavigationItem clicked={clear}>Clear Visualization</NavigationItem>
    <NavigationItem clicked={executeAlgorithm} style={{color: "red"}}>
      Visualize {algorithm}!
    </NavigationItem>
  </>
);
export default NavigationItems;
