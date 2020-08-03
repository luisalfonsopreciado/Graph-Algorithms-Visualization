 // O(V^3)
export const floydWarshall = (nodeGrid, startNode) => {

  const n = nodeGrid.length * nodeGrid[0].length; // number of vertices
  const mtrx = [];
  const animations = [];
  let distance = 1;

  // HashMap to store the nodes By their ID
  const nodes = {};

  let startId = 0;
  let targetId = 0;

  for (let i = 1; i <= n; i++) {
    const node = getNode(i, nodeGrid);
    nodes[i] = node
    if(node.is("Start")) startId = node.id
    if(node.is("Target")) targetId = node.id
    if(!node.is("Wall")) animations.push(node);
  }

  // Create the mtrx with initial values
  for (let row = 1; row <= n; row++) {
    mtrx[row] = [];
    for (let col = 1; col <= n; col++) {
      const start = nodes[row];
      const end = nodes[col];

      mtrx[row][col] = start.getDistanceTo(end); // Distance from start to end
    }
  }

  // Update the mtrx 
  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        // Keep the code inside here lean so that it remains fast
        mtrx[i][j] = Math.min(mtrx[i][j], mtrx[i][k] + mtrx[k][j]);
      }
    }
  }

  // Update the distances on the start and target node so that the UI Updates
  nodes[startId].dist = mtrx[startId][targetId]
  distance = mtrx[startId][targetId]

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
