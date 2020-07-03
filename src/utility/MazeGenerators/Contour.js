export const drawContourWalls = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    let classes = document.getElementById(`${i} ${0}`).classList;
    classes.add("Wall");
    classes = document.getElementById(`${i} ${grid[i].length - 1}`).classList;
    classes.add("Wall");
  }

  for (let j = 0; j < grid[0].length; j++) {
    let classes = document.getElementById(`${0} ${j}`).classList;
    classes.add("Wall");
    classes = document.getElementById(`${grid.length - 1} ${j}`).classList;
    classes.add("Wall");
  }
};
