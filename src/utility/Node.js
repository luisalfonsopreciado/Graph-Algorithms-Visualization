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
    if (this.isKeyValue()) return;
    this.classes.add("Wall");
  }

  setAsTarget() {
    this.classes.add("Target");
  }

  setAsStart() {
    this.classes.add("Filled");
  }

  setAsSecondTarget() {
    this.classes.add("SecondaryTarget")
  }

  markSearched() {
    if (this.isTarget()) return;
    this.classes.add("Searched");
  }

  markSearched2(){
    if (this.isTarget()) return;
    this.classes.add("Searched2");
  }

  removeVisuals() {
    this.classes.remove("ShortestPath");
    this.classes.remove("Searched");
    this.classes.remove("Searched2");
    this.predecessor = null;
    this.dist = Infinity;
  }

  reset() {
    this.classes.remove("ShortestPath");
    this.classes.remove("Wall");
    this.classes.remove("Searched");
    this.classes.remove("Searched2");
    this.classes.remove("SecondaryTarget");
    this.predecessor = null;
    this.dist = Infinity;
  }

  clear() {
    this.classes.remove("Target");
    this.classes.remove("Filled");
    this.classes.remove("SecondaryTarget");
  }

  isTarget() {
    return this.classes.contains("Target")
  }

  isStart() {
    return this.classes.contains("Filled");
  }

  isSecondTarget(){
    return this.classes.contains("SecondaryTarget");
  }

  isKeyValue() {
    return this.isTarget() || this.isStart() || this.isSecondTarget();
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
      this.classes.remove("Searched2");
      this.classes.add("ShortestPath");
    }
    if (this.predecessor != null) {
      this.predecessor.markShortestPath();
    }
  }
}
