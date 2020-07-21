### Prim's Algorithm

Algorithm that finds a minimum spanning tree of a graph.

Key ideas:

- Set the initial vertex as the Minimum Spanning Tree.

- At each step, find lowest-weight edge from an MST vertex to a non-MST vertex and add it to MST.

- To record the weight of each edge, we will associate edge weight with the vertex that's outside the MST.

- We will associate a priority with each vertex:
  a) intuitively, priority of vertex v = "currently known cost of adding v to MST"

PseudoCode

```
Algorithm: Prim-MST (G)
Input: Graph G=(V,E) with edge-weights.

1.   Initialize MST to vertex 0.
2.   priority[0] = 0
3.   For all other vertices, set priority[i] = infinity
4.   Initialize prioritySet to all vertices;
5.   while prioritySet.notEmpty()
6.       v = remove minimal-priority vertex from prioritySet;
7.       for each neighbor u of v
             // See if the priority of u changes because of v.
9.           w = weight of edge (v, u)
8.           if w < priority[u]
9.               priority[u] = w
10.          endif
11.      endfor
12.  endwhile

Output: A minimum spanning tree of the graph G.
```

Time Complexity Analysis:

- Initializations: all are O(V).
- There are V iterations of the while-loop.
- Finding the lowest-priority: O(V) (scan of priority array).
- Scan of neighbors: O(V)
- Total work in while-loop: O(V2).
- Total time: O(V2)
