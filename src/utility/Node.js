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

  setClasses() {
    this.cell = document.getElementById(`${this.row} ${this.col}`);
    this.classes = this.cell.classList;
  }

  toString() {
    return "(" + this.row + " " + this.col + ")";
  }

  setWall() {
    if (this.isTarget() || this.isStart()) return;
    this.classes.add("Wall");
  }

  setAsTarget() {
    this.classes.add("Target");
  }

  setAsStart() {
    this.classes.add("Filled");
  }

  markSearched() {
    if (this.isTarget()) return;
    this.classes.add("Searched");
  }

  removeVisuals(){
    this.classes.remove("ShortestPath");
    this.classes.remove("Searched");
    this.predecessor = null;
    this.dist = Infinity;
  }

  reset() {
    this.classes.remove("ShortestPath");
    this.classes.remove("Wall");
    this.classes.remove("Searched");
    this.predecessor = null;
    this.dist = Infinity;
  }

  clear() {
    this.classes.remove("Target");
    this.classes.remove("Filled");
  }

  isTarget() {
    return this.classes.contains("Target");
  }

  isStart() {
    return this.classes.contains("Filled");
  }

  isKeyValue(){
    return this.isTarget() || this.isStart()
  }

  isWall() {
    return this.classes.contains("Wall");
  }

  isPartOfGraph() {
    return !this.isWall();
  }

  markShortestPath() {
    if (!this.isTarget() && !this.isStart()) {
      this.classes.remove("Searched");
      this.classes.add("ShortestPath");
    }
    if (this.predecessor != null) {
      this.predecessor.markShortestPath();
    }
  }
}
