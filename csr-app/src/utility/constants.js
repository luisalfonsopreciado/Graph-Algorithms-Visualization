/* Algorithm Constants */
export const DIJKSTRA = "Dijkstra"
export const ASTAR = "A*"
export const GREEDY_BFS = "Greedy Best First Search"
export const BFS = "Breadth First Search"
export const DFS = "Depth First Search"
export const PRIMS = "Prim's Algorithm"
export const DSTAR = "D*"
export const KRUSKAL = "Kruskal's Algorithm"
export const FLOYD_WARSHALL = "Floyd-Warshall"
export const BELLMAN_FORD = "Bellman-Ford"
export const BIDIRECTIONAL_BFS = "Bidirectional BFS"

/* Maze Generator Constants */
export const RAND_MAZE = "Random Maze"
export const RECURSIVE_DIVISON = "Recursive Division"
export const DRAW_COUNTOUR = "Contour Walls"
export const PRIMS_ALGO = "Prim's Maze Generator"
export const PRIMS_ALGO_531 = "Prim's Maze Generator (5,1,3)"

/* Board State Constants */
export const ADDING_WEIGHT = "Adding Weight"
export const MOVING_TARGET = "Moving Target"
export const ADDING_N_WEIGHT = "Adding N Weight"
export const MOVING_START = "Moving Start"
export const MOVING_SECOND_TARGET = "Moving Second Target"
export const SETTING_SECOND_TARGET = "Moving Second Target"
export const DELETING = "Deleting"
export const PLACING_WALLS = "Placing Walls"
export const VISUALIZING = "Visualizing"

/* Board Element Constants */
export const CELL = "Cell"
export const WALL = "Wall"
export const WEIGHT = "Weight"
export const START = "Start"
export const TARGET = "Target"
export const N_WEIGHT = "NegativeWeight"
export const SHORTEST_PATH = "ShortestPath"
export const SEARCHED = "Searched"
export const SEARCHED_2 = "Searched2"
export const SEARCHED_DONE = "Searched2Done"
export const SECONDARY_TARGET = "SecondaryTarget"

/* Algorithm Introduction Constants */
export const ALG_TITLE = {}
ALG_TITLE[DIJKSTRA] = "Dijkstra's Algorithm is a weighted algorithm that guarantees the shortest path"
ALG_TITLE[ASTAR] = "A* Algorithm is a weighted algorithm that guarantees the shortest path"
ALG_TITLE[GREEDY_BFS] = "Greedy BFS Algorithm is a weighted algorithm that does not guarantee the shortest path"
ALG_TITLE[FLOYD_WARSHALL] = "Floyd-Warshall algorithm is a weighted algorithm that guarantees to find the minimum distance between ANY two nodes"
ALG_TITLE[BFS] = "BFS is an un-weighted algorithm, it guarantees the shortest path in an unweighted graph but not in a weighted one"
ALG_TITLE[DFS] = "DFS is an un-weighted algorithm with the purpose of traversing a graph, shortest path/distance is NOT guaranteed"
ALG_TITLE[PRIMS] = "Prim's algorithm is used to find the Minimum Spanning Tree of a weighted Graph, shortest path/distance is NOT guaranteed"
ALG_TITLE[KRUSKAL] = "Kruskal's algorithm is used to find the Minimum Spanning Tree of a weighted Graph, shortest path/distance is NOT guaranteed"

/* Miscellaneous */
export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";
export const UNK = "Unknown";

/**
 * Generate a random integer between a range [min, max] (inclusive).
 * Extracted from : https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 * @param {number} min must be less than max
 * @param {number} max must be greater than min
 */
export const randBetween = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };