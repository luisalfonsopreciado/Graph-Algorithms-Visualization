import { generateAdjList } from "../index";
import { Queue } from "../DS/Queue";
import { generateGraph } from "../index";

// BFS
// 1. Set all nodes distance and predecessor equal to null EXCEPT the source
// which we will set the distance to 0
// 2. Add the source to the queue
// 3. While the Queue is not Empty
// 4. Get the next Item in the queue
// 5. Loop thru all its neighbors if we have not isited the node set its distance and predecesor
// and add it to the queue

export const bfs = async (grid, startRow, startCol) => {
  var queue = new Queue();
  queue.enqueue({
    row: startRow,
    col: startCol,
    distance: 0,
    predecesor: {
      row: startRow,
      col: startCol,
    },
  });
  let count = 1;
  const neighbors = generateAdjList(grid);
  const animations = [];
  const predecessors = [...grid];

  while (!queue.isEmpty()) {
    let item = queue.dequeue();
    const adjacent = neighbors[item.row][item.col];
    for (let i = 0; i < adjacent.length; i++) {
      if (adjacent[i].distance === null) {
        animations.push({ row: adjacent[i].row, col: adjacent[i].col });
        adjacent[i].distance = count;
        adjacent[i].predecesor = { row: item.row, col: item.col };
        predecessors[adjacent[i].row][adjacent[i].col] = {
          row: item.row,
          col: item.col,
        };
        queue.enqueue(adjacent[i]);
      }
    }
    count++;
  }
  return { animations, predecessors };
};
