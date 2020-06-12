export const randomMaze = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === " ") {
        if (Math.random() <= 0.3) {
          const classes = document.getElementById(`${row} ${col}`).classList;
          classes.add("Wall");
        }
      }
    }
  }
};
