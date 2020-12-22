export const drawContourWalls = (grid, type) => {
  for (let i in grid) {
    if (!grid[i][0].isKeyValue()) {
      grid[i][0].add(type);
    }

    if (!grid[i][grid[i].length - 1].isKeyValue()) {
      grid[i][grid[i].length - 1].add(type);
    }
  }

  for (let j in grid[0]) {
    if (!grid[0][j].isKeyValue()) {
      grid[0][j].add(type);
    }

    if (!grid[grid.length - 1][j].isKeyValue()) {
      grid[grid.length - 1][j].add(type);
    }
  }
};
