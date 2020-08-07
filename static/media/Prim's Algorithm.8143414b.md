### Prim's Algorithm

Algorithm that finds a minimum spanning tree of a graph.

What is a Minimum Spanning Tree?

1. A **Spanning tree** is a subgraph of G that has the same set of vertices as G and is also a tree.

2. The minimum spanning tree of the weighted graph G is the spanning tree G whose sum of edges is minimum.

## Note: There can be more than one minimum spanning tree in a graph

## Why should I care about minimum spanning trees?

1. Useful for constructing networks : How can I connect all of my nodes using the smallest amount of wire?

2. They are useful for clustering items into natural groups.

---

## Explanation

- Set the initial vertex as the Minimum Spanning Tree.

- At each step, find lowest-weight edge from an MST vertex to a non-MST vertex and add it to MST.

- To record the weight of each edge, we will associate edge weight with the vertex that's outside the MST.

- We will associate a priority with each vertex:
  a) intuitively, priority of vertex v = "currently known cost of adding v to MST"

PseudoCode (Bird's Eye View)

```
Algorithm: Prim-MST (G)
  Select any vertex to start building the tree

  while we haven't connected the graph
    select the edge of minimum weight that is connected to our tree
    add the edge to the Tree
```

---

## PseudoCode

```
Algorithm: Prim-MST (G)
Input: Graph G=(V,E) with edge-weights.

   Initialize MST to vertex 0.
   priority[0] = 0
   For all other vertices, set priority[i] = infinity
   Initialize prioritySet to all vertices;
   while prioritySet.notEmpty()
       v = remove minimal-priority vertex from prioritySet;
       for each neighbor u of v
             // See if the priority of u changes because of v.
           w = weight of edge (v, u)
           if w < priority[u]
               priority[u] = w
           endif
       endfor
   endwhile

Output: A minimum spanning tree of the graph G.
```

---

Time Complexity Analysis:

- Initializations: all are O(V).
- There are V iterations of the while-loop.
- Finding the lowest-priority: O(V) (scan of priority array).
- Scan of neighbors: O(V)
- Total work in while-loop: O(V2).
- Total time: O(V2)
