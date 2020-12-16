/*
    Disjoing set data structure (Array representation).

    1. Initially instantiate the array with the number of vertices in the graph. Fill the array
    with -1, this indicates that each vertices is a set with itself as a parent.

    Performing a union
    set the parent of one set to point at the parent of the second set and adjust 
    the new parent weight.
*/

export class DisjointSet {
  constructor(length) {
    this.items = new Array(length).fill(-1);
  }

  setParent = (child, parent) => {
    const weight = this.getWeight(child);
    this.items[child] = parent;
    this.items[parent] += weight;
  };

  getWeight = (num) => this.items[num];

  findParent = (num) => {
    if (this.items[num] < 0) return num;
    return this.findParent(this.items[num]);
  };

  // If there exists a cycle return true
  // else unite the graph and return false
  hasCycle = (v1, v2) => {
    const p1 = this.findParent(v1);
    const p2 = this.findParent(v2);
    if (p1 === p2 && p1 > 0) return true;
    this.union(p1, p2);
    return false;
  };

  // Takes two parent nodes and merges them to
  // creates one set
  union(parent1, parent2) {
    const p1Weight = this.getWeight(parent1);
    const p2Weight = this.getWeight(parent2);
    p1Weight <= p2Weight
      ? this.setParent(parent2, parent1)
      : this.setParent(parent1, parent2);
  }
}
