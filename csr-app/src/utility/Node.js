import * as cts from "./constants";

/**
 * Node class defines the properties and behaviour of a vertex in the graph
 */
export default class Node {
  /**
   * Each Node is initialized with a row, column and id
   * @param {Number} row
   * @param {Number} col
   * @param {Number} id
   */
  constructor(row, col, id) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.predecessor = null;
    this.dist = Infinity;
    this.g = 1;
    this.h = null;
    this.f = Infinity;
  }

  /**
   * Returns a list of neighbors for the node
   * @param {Node[][]} grid
   * @returns {Number[]} neighbors
   */
  getNeighbors(grid) {
    const cellNotInGraph = (row, col) => {
      return grid[row][col].is(cts.WALL);
    };

    if (this.is(cts.WALL)) return [];
    let neighbors = [];

    if (this.row > 0 && !cellNotInGraph(this.row - 1, this.col)) {
      // N
      neighbors.push(grid[this.row - 1][this.col]);
    }
    if (this.col > 0 && !cellNotInGraph(this.row, this.col - 1)) {
      // W
      neighbors.push(grid[this.row][this.col - 1]);
    }
    if (this.row < grid.length - 1 && !cellNotInGraph(this.row + 1, this.col)) {
      // S
      neighbors.push(grid[this.row + 1][this.col]);
    }
    if (
      this.col < grid[this.row].length - 1 &&
      !cellNotInGraph(this.row, this.col + 1)
    ) {
      // E
      neighbors.push(grid[this.row][this.col + 1]);
    }

    return neighbors;
  }

  /**
   * Returns true if the input Node is a neighbor to the node
   * @param {Node} node
   * @returns {boolean}
   */
  isNeighbor(node) {
    // O(1)
    if (this.row === node.row)
      return this.col + 1 === node.col || this.col - 1 === node.col;
    if (this.col === node.col)
      return this.row + 1 === node.row || this.row - 1 === node.row;
    return false;
  }

  /**
   * Returns a distance to input node
   * @param {Node} end
   */
  getDistanceTo(end) {
    if (this === end) return 0;
    if (!this.isNeighbor(end)) return Infinity;
    return end.getWeight();
  }

  /**
   * Get weight of current Node
   */
  getWeight() {
    if (this.is(cts.WEIGHT)) return 15;
    if (this.is(cts.WALL)) return Infinity;
    if (this.is(cts.N_WEIGHT)) return -1;
    return 1;
  }
  /**
   * Remove a CSS class from the Node
   * @param {string} s
   */
  removeClass(s) {
    this.classes.remove(s);
  }

  /**
   * Initialize the Node classes
   */
  setClasses() {
    this.cell = document.getElementById(`${this.row} ${this.col}`);
    this.classes = this.cell.classList;
  }

  /**
   * Return string representation of Node: (row, col)
   */
  toString() {
    return "(" + this.row + " " + this.col + ")";
  }

  /**
   * Sets the Node as a Wall
   */
  setWall() {
    if (this.isKeyValue()) return;
    this.remove(["Searched", "Searched2"]);
    this.add(cts.WALL);
  }

  /**
   * Assign the Node as the Target Node
   */
  setAsTarget() {
    this.add(cts.TARGET);
    this.markShortestPath();
  }

  /**
   * Assign the Node as the Second Target
   */
  setAsSecondTarget() {
    this.remove(cts.WALL);
    this.add("SecondaryTarget");
  }

  /**
   * Mark the Node as searched by adding "Searched" CSS class
   */
  markSearched() {
    if (this.is(cts.TARGET)) return;
    this.add("Searched");
  }

  /**
   * Mark the Node as searched by adding "Searched2" CSS class
   */
  markSearched2() {
    if (this.is(cts.TARGET)) return;
    this.add("Searched2");
  }

  /**
   * Mark the Node as searched by adding Searched2Done CSS class
   */
  markSearched2Done() {
    if (this.is(cts.TARGET) || this.is("Start")) return;
    this.add("Searched2Done");
  }

  /**
   * Remove CSS classes that have visuals
   */
  removeVisuals() {
    this.remove(["ShortestPath", "Searched", "Searched2", "Searched2Done"]);
    this.predecessor = null;
    this.dist = Infinity;
  }

  /**
   * Remove all CSS classes for the Node except "Cell", cts.WALL and cts.WEIGHT
   */
  removeClasses() {
    this.classes.forEach(
      (item) =>
        item !== "Cell" &&
        item !== cts.WALL &&
        item !== cts.WEIGHT &&
        item !== cts.N_WEIGHT &&
        this.classes.remove(item)
    );
  }

  reset() {
    this.remove(["ShortestPath", cts.WALL, "Searched", cts.N_WEIGHT]);
    this.remove(["Searched2", "SecondaryTarget", "Searched2Done"]);
    this.remove([cts.WEIGHT]);
    this.predecessor = null;
    this.dist = Infinity;
  }

  /**
   * Return true if the node is the Target, Start or SecondaryTarget
   */
  isKeyValue() {
    return (
      this.is(cts.TARGET) || this.is("Start") || this.is("SecondaryTarget")
    );
  }

  /**
   * Adds CSS class to mark as shortest path and calls markShortestPath on predecessor
   */
  markShortestPath() {
    if (!this.is(cts.TARGET) && !this.is("Start")) {
      this.remove(["Searched", "Searched2", "Searched2Done"]);
      this.add("ShortestPath");
    }
    if (this.predecessor === null) return;
    this.predecessor.markShortestPath();
  }

  /**
   * Removes a list of CSS classes
   * @param {string[]} classes
   */
  remove(classes) {
    for (let i in classes) this.classes.remove(classes[i]);
  }

  /**
   * Returns true if the Node contains input CSS class
   * @param {string} name
   */
  is(name) {
    return this.classes.contains(name);
  }

  /**
   * Add CSS class to Node
   * @param {string} name
   */
  add(name) {
    this.classes.add(name);
  }

  /**
   * Remove all CSS classes from the Node except Cell
   */
  clear() {
    this.classes = ["Cell"];
  }
}

/**
 * Returns a reference to the node given the id
 * @param {Number} id
 * @param {Node[][]} nodeGrid
 */
Node.getNode = (id, nodeGrid) => {
  const width = nodeGrid[0].length;
  const row = Math.floor((id - 1) / width);
  const col = (id - 1) % width;
  return nodeGrid[row][col];
};
