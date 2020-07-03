export const randomMaze = (board) => {
  for (let row in board) {
    for (let col in board[row]) {
      Math.random() <= 0.3 && board[row][col].setWall();
    }
  }
};
