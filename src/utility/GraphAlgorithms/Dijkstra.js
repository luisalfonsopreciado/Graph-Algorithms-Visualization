import { generateAdjList } from "../index";

// Dijkstra's
// 1. Create Shortest Path Tree (SPT)
// 2. Assign distance value to all vertices in the input graph: Inifinity if not the source else zero.
// 3. While SPT does not include all vertices
//  a) Pick vertex not in SPT that has minimum distance value
//  b) Include the vertex to SPT
//  c) Update distance value of all adjacent vertices of u

export const dijkstra = async (grid, startRow, startCol) => {
  const queue = [];
  queue.push({
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

  while (queue.length !== 0) {
    let item = queue.shift();
    const adjacent = neighbors[item.row][item.col];
    for (let i = 0; i < adjacent.length; i++) {
      if (adjacent[i].distance === null) {
        animations.push({ row: adjacent[i].row, col: adjacent[i].col });
        // Since this is an unweightes graph, no point in comparing the distances
        adjacent[i].distance = count;
        adjacent[i].predecesor = { row: item.row, col: item.col };
        predecessors[adjacent[i].row][adjacent[i].col] = ({ row: item.row, col: item.col });
        queue.push(adjacent[i]);
      }
    }
    count++;
  }
  return { animations, predecessors };
};
