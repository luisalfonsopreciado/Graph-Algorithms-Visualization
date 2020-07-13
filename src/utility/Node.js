export default class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.predecessor = null;
    this.dist = Infinity;
    this.g = 1;
    this.h = null;
    this.f = null;
  }

  getNeighbors(grid) {
    const cellNotInGraph = (row, col) => {
      return grid[row][col].is("Wall");
    };

    if (this.is("Wall")) return [];
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
    if (this.col < grid[this.row].length - 1 && !cellNotInGraph(this.row, this.col + 1)) {
      // E
      neighbors.push(grid[this.row][this.col + 1]);
    }

    return neighbors;
  }

  getWeight(){
    return this.is("Weight") ? 15 : 1;
  }

  removeClass(s) {
    this.classes.remove(s);
  }

  setClasses() {
    this.cell = document.getElementById(`${this.row} ${this.col}`);
    this.classes = this.cell.classList;
  }

  toString() {
    return "(" + this.row + " " + this.col + ")";
  }

  setWall() {
    if (this.isKeyValue()) return;
    this.remove(["Searched", "Searched2"])
    this.add("Wall");
  }

  setAsTarget() {
    this.add("Target");
    this.markShortestPath();
  }

  setAsSecondTarget() {
    this.remove("Wall");
    this.add("SecondaryTarget");
  }

  markSearched() {
    if (this.is("Target")) return;
    this.add("Searched");
  }

  markSearched2() {
    if (this.is("Target")) return;
    this.add("Searched2");
  }

  markSearched2Done() {
    if (this.is("Target") || this.is("Start")) return;
    this.add("Searched2Done");
  }

  removeVisuals() {
    this.remove(["ShortestPath", "Searched", "Searched2", "Searched2Done"]);
    this.predecessor = null;
    this.dist = Infinity;
  }

  removeClasses() {
    this.classes.forEach(
      (item) => item !== "Cell" && item !== "Wall" && item !== "Weight"&& this.classes.remove(item)
    );
  }

  reset() {
    this.remove(["ShortestPath", "Wall", "Searched"]);
    this.remove(["Searched2", "SecondaryTarget", "Searched2Done"]);
    this.remove(["Weight"])
    this.predecessor = null;
    this.dist = Infinity;
  }

  isKeyValue() {
    return this.is("Target") || this.is("Start") || this.is("SecondaryTarget");
  }

  markShortestPath() {
    if (!this.is("Target") && !this.is("Start")) {
      this.remove(["Searched", "Searched2", "Searched2Done"]);
      this.add("ShortestPath");
    }
    if (this.predecessor != null) {
      this.predecessor.markShortestPath();
    }
  }

  remove(classes) {
    for (let i in classes) this.classes.remove(classes[i]);
  }

  is(name) {
    return this.classes.contains(name);
  }

  add(name) {
    this.classes.add(name);
  }

  clear(){
    this.classes = ["Cell"]
  }
}
