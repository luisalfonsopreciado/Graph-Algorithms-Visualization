/* 
  In a complete Binary Tree, For any ith node:
  Arr[(i -1) / 2] returns its parent node.
  Arr[(2 * i) + 1] returns its left child node.
  Arr[(2 * i) + 2] returns its right child node.
*/

/**
 * Min Heap implementation
 */
export class MinHeap {
  /**
   * function that return that value of two items
   */
  selector = null;

  constructor(selector) {
    this.items = [];
    this.selector = selector;
  }
  /**
   * Returns the Top most element from the Heap without removal
   * @return {Object} obj
   */
  peek() {
    return this.items[0];
  }

  /**
   * Insert an item into the Heap
   * @param {Object} item
   */
  push(item) {
    let i = this.items.length;
    this.items.push(item);

    let parentIndex = this.getParentIndex(i);

    let parentVal = this.selector(this.items[parentIndex]);
    const pushedVal = this.selector(this.items[i]);

    while (parentVal > pushedVal) {
      this.swap(i, parentIndex);

      i = parentIndex;
      parentIndex = this.getParentIndex(i);

      parentVal = this.selector(this.items[parentIndex]);
    }
  }

  /**
   * Returns parent index of an input index.
   * For index 0, the parent is 0.
   * @param {number} index
   * @returns {number} index - parent index
   */
  getParentIndex(index) {
    return Math.max(Math.floor((index - 1) / 2), 0);
  }

  /**
   * Returns the right child index
   * @param {number} index
   * @returns {number} index - right child index
   */
  getRightIndex(index) {
    return 2 * index + 2;
  }

  /**
   * Returns the left child index
   * @param {number} index
   * @returns {number} index - left child index
   */
  getLeftIndex(index) {
    return 2 * index + 1;
  }

  /**
   * Swap Two elements from the items list
   * @param {number} i index i
   * @param {number} j index j
   */
  swap(i, j) {
    let t = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = t;
  }

  /**
   * Remove an Element from the Heap
   * @returns {Object} obj - heap Element
   */
  pop() {
    if (this.items.length <= 1) return this.items.pop(); //If it is the last element pop it
    const ret = this.items[0]; // What we will return
    let temp = this.items.pop(); // Remove first item from items list
    this.items[0] = temp; // Place last element in array at front

    let i = 0; // We adjust heap from top to down

    while (true) {
      let rightChildIndex = this.getRightIndex(i);
      let leftChildIndex = this.getLeftIndex(i);
      // Hold the index of the lowest child
      let lowest = rightChildIndex;

      let leftIndexOB = leftChildIndex >= this.items.length;
      let rightIndexOB = rightChildIndex >= this.items.length;

      // If both children are non-existent, we have finished setting up the heap
      if (leftIndexOB && rightIndexOB) break;

      // If left child is OB set lowest equal to the rightChildIndex
      if (leftIndexOB) lowest = rightChildIndex;
      // If right child is OB set lowest equal to the leftChildIndex
      if (rightIndexOB) lowest = leftChildIndex;

      let bothChildrenInBounds = !leftIndexOB && !rightIndexOB;

      if (bothChildrenInBounds) {
        lowest =
          this.selector(this.items[rightChildIndex]) <
          this.selector(this.items[leftChildIndex])
            ? rightChildIndex
            : leftChildIndex;
      } // Find the smallest child

      // If the parent is greater than the smallest child: swap
      if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
        this.swap(i, lowest);
        i = lowest;
      } else {
        break;
      } // We have finished setting up the heap
    }

    // Return topmost element
    return ret;
  }

  /**
   * Return true if the heap contains the input item
   * @param {Object} item
   */
  contains(item) {
    return this.items.includes(item);
  }

  /**
   * Returns true if the heap is empty
   * @returns {boolean} boolean
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Remove an Item from the heap
   * @param {Object} item
   */
  delete(item) {
    let i = this.items.indexOf(item);
    // heapify
    this.items[i] = this.items.pop();
    while (true) {
      let lowest =
        this.selector(this.items[this.getRightIndex(i)]) <
        this.selector(this.items[(i + 1) * 2 - 1])
          ? (i + 1) * 2
          : (i + 1) * 2 - 1;
      if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
        let t = this.items[i];
        this.items[i] = this.items[lowest];
        this.items[lowest] = t;
        i = lowest;
      } else break;
    }
  }

  /**
   * Print the contents of the Heap
   */
  print() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i]);
    }
  }

  /**
   * Heapify
   * @param {Object[]} arr
   */
  heapify(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }
}
