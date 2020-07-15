## Depth First Search

Depth First Search (DFS) along with Breadth First Search (BFS), comprise the two fundamental and must know graph traversal algorithms. They are very similar to each other. In fact, the code for the two could be almost identical.
However, there exists a fundamental difference:

- Breadth First Search uses a **Queue**.
- Depth First Search uses a **Stack**.

This variation makes a significant difference, visualize DFS to see for yourself!

---

### Explanation

1. In Depth First Search we start by visiting the "start" node and adding it to a Stack data structure.

2. While the Stack is not empty repeat the following:

- Pop the first element from the Stack and call it currentNode.
- Mark the currentNode as visited.
- Get the list of adjacent elements of currentNode.
- Add the adjacent elements to the Stack.

Another implementation of DFS would be:

1. Mark all vertices as "unvisited".
2. Visit first vertex.
3. Recursively visit its "unvisited" neighbors.

---

DFS Pseudocode using an Adjacency Matrix:

```
Algorithm: depthFirstMatrix (adjMatrix, n)
Input: A graph's adjacency matrix, # of vertices n.

    // Visit order will start with "0", so initialize to -1.
     for i=0 to n-1
         visitOrder[i] = -1
     endfor

     // A counter for the order:
     visitCount = -1

     // Look for an unvisited vertex and explore its tree.
     // We need this because the graph may have multiple components.
     for i=0 to n-1
         if visitOrder[i] < 0
           depthFirstMatrixRecursive (i)
         endif
     endfor
```

```
    Algorithm: depthFirstMatrixRecursive (v)
    Input: vertex v, adjMatrix is assumed to be global.

     // Mark vertex v as visited.
     visitCount = visitCount + 1
     visitOrder[v] = visitCount

     // Look for first unvisited neighbor.
     for i=0 to n-1
         if adjMatrix[v][i] > 0 and i != v
             if visitOrder[i] < 0
                 // If unvisited visit recursively.
                 depthFirstMatrixRecursive (i)
             endif
         endif
     endfor
```

---

DFS Analysis using an adjacency matrix

Same as breadth-first search: O(V^2)

Why?
O(1) work for processing each vertex (except for identifying neighbors).

O(V) work for identifying neighbors.
⇒ O(V^2) overall.

---

DFS Analysis using an adjacency list

Similar analysis (to breadth-first search) gives: O(V + E).
**DFS with adjacency list is optimal.**
 
Applications:

1. Connectivity: 
- identifying connected components.
- which earlier-stated problem would this solve?
2. Cycle existence.
3. Others: 
- finding articulation edges, vertices,"bipartiteness".

4.Identifying equivalence classes

#### Click on Algorithms -> Depth First Search -> Select
