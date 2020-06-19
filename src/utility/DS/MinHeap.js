export class MinHeap {
  constructor(selector) {
    this.items = [];
    this.selector = selector;
  }

  seek() {
    return this.items[0];
  }

  push(item) {
    let i = this.items.length;
    this.items.push(item);

    let parentIndex = Math.floor((i + 1) / 2 - 1);

    if (parentIndex < 0) parentIndex = 0;

    // console.log("ParentIndex", parentIndex);

    let parentVal = this.selector(this.items[parentIndex]);
    const pushedVal = this.selector(this.items[i]);

    // console.log("ParentVal, parentIndex:", parentVal, parentIndex);
    // console.log("PushedVal", pushedVal);

    while (i > 0 && parentVal > pushedVal) {
      parentIndex = Math.floor((i + 1) / 2 - 1);
      // console.log(
      //   "INSIDE LOOP ParentVal, parentIndex:",
      //   parentVal,
      //   parentIndex
      // );

      this.swap(i, parentIndex);

      i = parentIndex;
      // console.log(
      //   "New INSIDE LOOP parentIndex:",
      //   Math.max(Math.floor((i + 1) / 2 - 1), 0)
      // );

      parentVal = this.selector(
        this.items[Math.max(Math.floor((i + 1) / 2 - 1), 0)]
      );
    }

    // this.print();
  }

  swap(i, j) {
    let t = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = t;
  }

  pop() {
    // console.log("Items before pop:", this.items);
    if (this.items.length <= 1) return this.items.pop(); //If it is the last element pop it
    const ret = this.items[0]; // What we will return
    let temp = this.items.pop();
    this.items[0] = temp; // Place last element in array at front

    // console.log("Items after pop:", this.items); // Good till here
    let i = 0; // We adjust heap from top to down

    while (true) {
      let rightChildIndex = (i + 1) * 2;
      let leftChildIndex = (i + 1) * 2 - 1;

      // console.log("rightIndex", rightChildIndex);
      // console.log("rightValue", this.items[rightChildIndex]);
      // console.log("leftIndex", leftChildIndex);
      // console.log("leftValue", this.items[leftChildIndex]);
      let lowest = rightChildIndex;

      if (
        leftChildIndex >= this.items.length &&
        rightChildIndex >= this.items.length
      )
        break;
      if (leftChildIndex >= this.items.length) lowest = rightChildIndex;
      if (rightChildIndex >= this.items.length) lowest = leftChildIndex;

      if (
        !(leftChildIndex >= this.items.length) &&
        !(rightChildIndex >= this.items.length)
      ) {
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
      } else break; // We have finished setting up the heap
    }

    // Return topmost element
    return ret;
  }

  contains(item) {
    return this.items.includes(item);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  delete(item) {
    let i = this.items.indexOf(item);
    // heapify
    this.items[i] = this.items.pop();
    while (true) {
      let lowest =
        this.selector(this.items[(i + 1) * 2]) <
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

  print() {
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i]);
    }
  }

  heapify(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }
}

// const heap = new MinHeap((x) => x.dist);
// heap.heapify([6, 3, 6, 9, 43, 0, 8, 0, 8]);
// console.log(heap);
// console.log(heap.isEmpty());

// heap.heapify([1, 2, 7, 4, 8, 0, 4, 2, 7, 3]);

// heap.heapify([
//   { dist: 1 },
//   { dist: 2 },
//   { dist: 7 },
//   { dist: 4 },
//   { dist: 8 },
//   { dist: 0 },
//   { dist: 4 },
//   { dist: 2 },
//   { dist: 7 },
//   { dist: 3 },
// ]);

// heap.heapify([
//   { dist: 1 },
//   { dist: 2 },
//   { dist: 7 },
//   { dist: 4 },
//   { dist: 8 },
//   { dist: 0 },
//   { dist: 4 },
//   { dist: 2 },
//   { dist: 7 },
//   { dist: 3 },
//   { dist: 23 },
//   { dist: 200 },
//   { dist: -1 },
// ]);

// heap.print();
// // const a = heap.pop()
// // heap.pop()
// // heap.pop()

// console.log(heap.items);

// while (!heap.isEmpty()) {
//   // console.log("Length", heap.items.length);
//   const a = heap.pop();
//   console.log("Value:", a);
//   // console.log("Length", heap.items.length);
// }
