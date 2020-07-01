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
    this.classes.add("Wall");
  }

  setAsTarget() {
    this.classes.add("Target");
    this.markShortestPath();
  }

  setAsStart() {
    this.classes.remove("Wall");
    this.classes.add("Filled");
  }

  setAsSecondTarget() {
    this.classes.remove("Wall");
    this.classes.add("SecondaryTarget");
  }

  markSearched() {
    if (this.isTarget()) return;
    this.classes.add("Searched");
  }

  markSearched2() {
    if (this.isTarget()) return;
    this.classes.add("Searched2");
  }

  markSearched2Done() {
    if (this.isTarget() || this.isStart()) return;
    this.classes.add("Searched2Done");
  }

  removeVisuals() {
    this.remove(["ShortestPath", "Searched", "Searched2", "Searched2Done"])
    this.predecessor = null;
    this.dist = Infinity;
  }

  removeClasses() {
    this.classes.forEach(
      (item) => item !== "Cell" && item !== "Wall" && this.classes.remove(item)
    );
  }

  reset() {
    this.remove(["ShortestPath", "Wall", "Searched"]);
    this.remove(["Searched2", "SecondaryTarget", "Searched2Done"]);
    this.predecessor = null;
    this.dist = Infinity;
  }

  isTarget() {
    return this.classes.contains("Target");
  }

  isStart() {
    return this.classes.contains("Filled");
  }

  isSecondTarget() {
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
      this.remove(["Searched", "Searched2", "Searched2Done"]);
      this.classes.add("ShortestPath");
    }
    if (this.predecessor != null) {
      this.predecessor.markShortestPath();
    }
  }

  remove(classes) {
    for (let i in classes) this.classes.remove(classes[i]);
  }
}
