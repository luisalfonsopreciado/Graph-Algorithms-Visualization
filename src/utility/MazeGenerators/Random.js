export const randomMaze = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
        if (Math.random() <= 0.3) {
          const node = board[row][col];
          node.setWall()
        }
    }
  }
};
