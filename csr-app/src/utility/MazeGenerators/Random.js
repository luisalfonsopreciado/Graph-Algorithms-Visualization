const WALL_PROBABILITY = 0.3

export const randomMaze = (board, type) => {
  for (let row in board) {
    for (let col in board[row]) {
      const node = board[row][col]
      if(!node.isKeyValue()) Math.random() <= WALL_PROBABILITY && node.add([type]);
    }
  }
};
