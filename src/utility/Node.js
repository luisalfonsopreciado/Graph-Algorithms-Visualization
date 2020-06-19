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

  toString() {
    return "(" + this.row + " " + this.col + ")";
  }

  setWall() {
    if (this.isTarget() || this.isStart()) return;
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.add("Wall");
  }

  setAsTarget() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.add("Target");
  }

  setAsStart() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.add("Filled");
  }

  markSearched() {
    if (this.isTarget()) return;
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.add("Searched");
  }

  reset() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.remove("ShortestPath");
    cell.classList.remove("Wall");
    cell.classList.remove("Searched");
    this.predecessor = null;
    this.dist = Infinity;
  }

  isTarget() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    return cell.classList.contains("Target");
  }

  isStart() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    return cell.classList.contains("Filled");
  }

  isWall() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    return cell.classList.contains("Wall");
  }

  isPartOfGraph() {
    return !this.isWall();
  }

  markShortestPath() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    if (!this.isTarget() && !this.isStart()) {
      cell.classList.remove("Searched");
      cell.classList.add("ShortestPath");
    }
    if (this.predecessor != null) {
      this.predecessor.markShortestPath();
    }
  }
}
