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

  setAsSecondTarget() {
    this.classes.remove("Wall");
    this.classes.add("SecondaryTarget");
  }

  markSearched() {
    if (this.is("Target")) return;
    this.classes.add("Searched");
  }

  markSearched2() {
    if (this.is("Target")) return;
    this.classes.add("Searched2");
  }

  markSearched2Done() {
    if (this.is("Target") || this.is("Start")) return;
    this.classes.add("Searched2Done");
  }

  removeVisuals() {
    this.remove(["ShortestPath", "Searched", "Searched2", "Searched2Done"]);
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

  isKeyValue() {
    return this.is("Target") || this.is("Start") || this.is("SecondaryTarget");
  }

  markShortestPath() {
    if (!this.is("Target") && !this.is("Start")) {
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

  is(name) {
    return this.classes.contains(name);
  }

  add(name) {
    this.classes.add(name);
  }
}
