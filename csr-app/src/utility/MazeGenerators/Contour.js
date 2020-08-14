export const drawContourWalls = (grid, type) => {
  for (let i in grid) {
    grid[i][0].add(type);
    grid[i][grid[i].length - 1].add(type);
  }

  for (let j in grid[0]) {
    grid[0][j].add(type);
    grid[grid.length - 1][j].add(type);
  }
};
