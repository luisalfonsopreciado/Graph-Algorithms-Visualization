# Depth First Search

Depth First Search (DFS) along with Breadth First Search (BFS) comprise the two fundamental and must-know graph traversal algorithms. The code for each is similar. However, there exists a fundamental difference:

- Breadth First Search uses a **Queue** to store vertices.
- Depth First Search uses a **Stack** to store vertices.

This variation makes a significant difference, visualize DFS to see for yourself!

---

### Explanation

1. In Depth First Search we start by visiting the "start" node and adding it to a Stack data structure.

2. While the Stack is not empty repeat the following steps:

- Pop the first element from the stack and call it currentNode.
- Mark the currentNode as visited.
- Get the list of adjacent elements of currentNode.
- Add the adjacent elements to the Stack.

Another implementation of DFS using recursion would be:

1. Mark all vertices as "unvisited".
2. Visit first vertex.
3. Recursively visit its "unvisited" neighbors.

---

## DFS Pseudocode using an Adjacency Matrix:

```
// This pseudocode is adapted from the source:
// https://www2.seas.gwu.edu/~simhaweb/alg/modules/module7/module7.html

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

## DFS Pseudocode using an Adjacency Matrix (Recursion):

```
// This pseudocode is adapted from the source:
// https://www2.seas.gwu.edu/~simhaweb/alg/modules/module7/module7.html

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

## DFS Analysis using an adjacency matrix

Time complexity of DFS using adjacency matrix to store the graph would be: O(V^2)

Why?
It takes O(1) to process each vertex (except for identifying neighbors).

It takes O(V) to work for identifying neighbors.
⇒ O(V^2) overall.

---

## DFS Analysis using an adjacency list

The time complexity of DFS using an adjacency list to store the graph gives: O(V + E).
**Note: DFS with adjacency list is an optimal algorithm.**

---

## Applications of DFS:

1. Connectivity:

- identifying connected components.
- which earlier-stated problem would this solve?

2. Cycle existence.
3. Others:

- finding articulation edges, vertices,"bipartiteness".

4. Identifying equivalence classes
