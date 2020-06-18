export default class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.predecessor = null;
  }

  toString() {
    return "(" + this.row + " " + this.col + ")";
  }

  markSearched() {
    if (this.isTarget()) return;
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.add("Searched");
  }

  reset(){
    const cell = document.getElementById(`${this.row} ${this.col}`);
    cell.classList.remove("Wall")
    cell.classList.remove("Searched")
  }

  isTarget() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    return cell.classList.contains("Target");
  }

  isStart() {
    const cell = document.getElementById(`${this.row} ${this.col}`);
    return cell.classList.contains("Filled");
  }

  markShortestPath() {
    console.log(this.predecessor);
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
