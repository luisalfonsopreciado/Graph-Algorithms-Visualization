export const drawContourWalls = (grid) => {
  for (let i in grid) {
    grid[i][0].add("Wall");
    grid[i][grid[i].length - 1].add("Wall");
  }

  for (let j in grid[0]) {
    grid[0][j].add("Wall");
    grid[grid.length - 1][j].add("Wall");
  }
};
