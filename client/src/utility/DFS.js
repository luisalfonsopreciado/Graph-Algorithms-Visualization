import { generateAdjList } from "./index";
// DFS
// 1. Set all nodes distance and predecessor equal to null EXCEPT the source
// which we will set the distance to 0
// 2. Add the source to the stack
// 3. While the stack is not Empty
// 4. Get the next Item in the stack
// 5. Loop thru all its neighbors if we have not isited the node set its distance and predecesor
// and add it to the stack

export const dfs = async (grid, startRow, startCol) => {
    const stack = [];
    stack.push({
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
    const animation = [];
  
    while (stack.length !== 0) {
      let item = stack.pop();
      const adjacent = neighbors[item.row][item.col];
      for (let i = 0; i < adjacent.length; i++) {
        if (adjacent[i].distance === null) {
          animation.push({ row: adjacent[i].row, col: adjacent[i].col });
          adjacent[i].distance = count;
          adjacent[i].predecesor = { row: item.row, col: item.col };
          stack.push(adjacent[i]);
        }
      }
      count++;
    }
    return animation;
  };