## Breadth First Search

Breadth First Search (BFS) along with Depth First Search (DFS) comprise the two fundamental and must know graph traversal algorithms. They are very similar to each other. In fact, the code for the two could be almost identical.
However, there exists a fundamental difference: 

- Breadth First Search uses a **Queue**.
- Depth First Search uses a **Stack**.

This variation makes a significant difference, visualize BFS to see for yourself!

### Explanation

1. In Breadth First Search we start by visiting the "start" node and adding it to a Queue data structure.

2. While the Queue is not empty repeat the following:
- Pop the first element from the queue and call it currentNode.
- Mark the currentNode as visited.
- Get the list of adjacent elements of currentNode.
- Add the adjacent elements to the queue.

## Click on Algorithms -> Breadth First Search -> Select