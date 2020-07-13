## Depth First Search

Depth First Search (DFS) along with Breadth First Search (BFS), comprise the two fundamental and must know graph traversal algorithms. They are very similar to each other. In fact, the code for the two could be almost identical.
However, there exists a fundamental difference: 

- Breadth First Search uses a **Queue**.
- Depth First Search uses a **Stack**.

This variation makes a significant difference, visualize DFS to see for yourself!

### Explanation

1. In Depth First Search we start by visiting the "start" node and adding it to a Stack data structure.

2. While the Stack is not empty repeat the following:
- Pop the first element from the Stack and call it currentNode.
- Mark the currentNode as visited.
- Get the list of adjacent elements of currentNode.
- Add the adjacent elements to the Stack.

#### Click on Algorithms -> Depth First Search -> Select