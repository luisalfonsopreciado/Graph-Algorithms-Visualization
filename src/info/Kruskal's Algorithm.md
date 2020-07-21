### Kruskal's Algorithm

Algorithm that finds a minimum spanning tree of a graph.

Key Ideas:

- Sort edges by (increasing) weight.

- Initially, each vertex is a solitary sub-graph (MST-component).

- Add the edges to the graph in ascending order if they do not form a cycle.

A heap can be used to extract the edges in ascending order.

A Disjoint Set can be used to determine if an edge would form a cycle.

Pseudocode:

```
Algorithm: Kruskal-MST (G)
Input: A Weighted Graph G=(V,E)

1.   Initialize MST to be empty;
2.   Place each vertex in its own set;
3.   add all edges G to a min heap;
4.   while the heap is not empty
5.       e = (u,v)
5.       if u and v are not in the same set
6.           Add e to MST;
7.           Compute the union of the two sets;
8.       endif
9.   endwhile
10.  return MST

Output: A minimum spanning tree for the graph G.
```

Time Complexity Analysis using an adjacency matrix to represent the graph:

- Placing edges in list requires scanning the adjacency matrix O(V2).
- Sorting edges: O(E log(E)).
- One union-find operation for each edge: O(E log(V)).
- Total: O(V2) + O(E log(E)) + O(E log(V))
  a) O(V2), for sparse graphs
  b) O(V2)log V, for dense graphs

Time Complexity Analysis using an adjacency list to represent the graph:

- When Placing edges in list, the algorithm scans each vertex list once. O(E) time.

- Total: O(E)+ O(E log(E)) + O(E log(V))
  a) O(E log(E))
  b) O(E log(V)) (same for sparse or dense)
