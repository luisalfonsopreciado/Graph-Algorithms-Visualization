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


## BFS Analysis using an adjacency matrix

Assume V vertices and E edges.
- Each vertex is processed V times (worst-case) in starting a tree.  O(V).
- Searching for a neighbor: O(V) (scan through matrix). All scans take O(V^2).
- Each queue operation is O(1).
- Each edge is processed once: O(E) queue operations and O(E) vertex manipulations.
**Total: O(V2 + E) = O(V^2).**

## BFS Analysis using an adjacency list

- Searching for a neighbor: O(# neighbors)
- Total neighbor searches is O(E) (Why?)
- Other operations are the same
- Total: O(V + E) = O(E).

## About O(V + E):

Note that O(V + E) = O(E)
- it is written as O(V + E) just for emphasis.
- O(V + E) is optimal because Every vertex and every edge must be examined.
- O(V + E)
- not possible to do better than O(V + E)

**BFS (with adjacency list) is an example of an optimal algorithm.**

## Some of the Applications of BFS include:

1. Connectivity:
    Breadth-first search identifies connected components.
    However, depth-first search is preferred (required for directed graphs).

2. Shortest paths:
    A path between two vertices in the tree is the shortest path in the graph.

3. Optimization algorithms:
    Various problems result in "graph search space".
    BFS together with "exploration rules" is often used to search for solutions (e.g., branch-and-bound exploration).