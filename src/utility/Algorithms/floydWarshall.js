export const floydWarshall = (nodeGrid, startNode) => {
  // O(V^3)
  const n = nodeGrid.length * nodeGrid[0].length; // number of vertices
  const mtrx = [];
  const animations = [];
  let distance = 1;

  // Create the mtrx with initial values
  for (let row = 1; row <= n; row++) {
    mtrx[row] = [];
    for (let col = 1; col <= n; col++) {
      const start = getNode(row, nodeGrid);
      const end = getNode(col, nodeGrid);

      mtrx[row][col] = start.getDistanceTo(end); // Distance from start to end
    }
  }

  // Update the mtrx
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        mtrx[i][j] = Math.min(mtrx[i][j], mtrx[i][k] + mtrx[k][j]);

        if (getNode(i, nodeGrid).is("Start")|| getNode(j, nodeGrid).is("Start"))
          getNode(i, nodeGrid).dist = mtrx[i][j];
      }
    }
  }

  return { mtrx, animations, distance };
};

function getNode(id, nodeGrid) {
  // O(1)
  // returns a reference to the node given the id
  const width = nodeGrid[0].length;
  const row = Math.floor((id - 1) / width);
  const col = (id - 1) % width;
  return nodeGrid[row][col];
}
