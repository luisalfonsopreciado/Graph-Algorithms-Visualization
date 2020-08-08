# Dijkstra Shortest Path Algorithm

Dijkstra's algorithm, considered as the father of pathfinding algorithms, is one of the most practical algorithms since it's widely used in networking and GIS (Geographic Information Systems).

#### Dijkstra's algorithm works as follows:

**Step 1**: Initialize all vertices with a starting distance of inifinity except for the starting vertex which will be assigned a distance of zero. Start at the beginning vertex, call this vertex your current vertex, and explore this node.

**Step 2**: Identify all of the vertices that are connected to the current vertex with an edge. Calculate their distance to the end by adding the weight of the edge to the mark on the current vertex. Mark each of the vertices with their corresponding distance, but only change a vertex's mark if it's less than a previous mark. Each time you mark the starting vertex with a mark, keep track of the path that resulted in that mark.

**Step 3**: Label the current vertex as visited. Once a vertex is visited, we won't look at it again.

**Step 4**: Of the visited vertices, find the one with the smallest mark, and make it your current vertex. Now, you can start again from step 2.

**Step 5**: Once you've labeled the beginning vertex as visited - stop. The distance of the shortest path is the mark of the starting vertex, and the shortest path is the path that resulted in that mark.

---

## PseudoCode

In this implementation of Dijsktra's, an adjacency list was used to represent the graph, while a Min Heap was constructed and used as the priority queue. The following is the pseudocode:

```
// This pseudocode is adapted from the source:
// https://www2.seas.gwu.edu/~simhaweb/alg/modules/module7/module7.html

Algorithm: Dijkstra-SPT (G, s)
Input: Graph G=(V,E) with edge weights and designated source vertex s.

     // Initialize priorities and place in priority queue. 
   Set priority[i] = infinity for each vertex i
   Insert vertices and priorities into priorityQueue

     // Source s has priority 0 and is placed in SPT 
   priorityQueue.decreaseKey (s, 0)
   Add s to SPT

     // Now process vertices one by one in order of priority (which 
     // may change during processing) 
   while priorityQueue.notEmpty()
         // Get "best" vertex out of queue. 
       v = priorityQueue.extractMin()
         // Place in current SPT. 
       Add v to SPT
         // Explore edges from v. 
       for each neighbor u of v
           w = weight of edge (v, u)
             // If there's a better way  to get to u (via v), then update. 
           if priority[u] > priority[v] + w
               priorityQueue.decreaseKey (u, priority[v] + w)
           endif
       endfor
   endwhile

   Build SPT
   return SPT

Output: Shortest Path Tree (SPT) rooted at s.
```

The Time complexity of Dijkstra's algorithm is
**O(E \* log(V))** where:

- V is the number of vertices
- E is the total number of edges

## Why is this true?

- Each vertex can be connected to V - 1 vertices, therefore the number of adjacent edges to each vertex is V - 1.

- Findind and Updating each adjacent vertex's weight in the min heap takes O(log(V)) + O(1) or
  O(log(V))

- For each edge, we find a update the adjacent vertex weight. With this, we conclude that the time complexity for the current implementation of Dijktra's is O(E \* log(V)).

---

# Exploring Different Scenarios

## Dijkstra's Analysis using an Adjacency matrix graph representation:

- Initializations: all are O(V).
- There are V iterations of the while-loop.
- Finding the lowest-priority: O(log(V)) (scan of priority array).
- Scan of neighbors: O(V)
- Total work in while-loop: O(V^2log(V))
- Note: just like in Prim's algorithm, a straightforward implementation (without a priority queue) takes O(V^2) time.

## Dijkstra's Analysis using an Adjacency list graph representation:

- Each each is processed just once (when explored): O(E) decreaseKey operations (worst-case)
- O(E log(V)) time for all decreaseKey operations.
- Loop is executed O(V) times
- O(V) extractMin operations
- O(V log(V)) cost.
- Total time: O(E log(V)) + O(V log(V)) = O(E log(V)).

---

## Some data structures that can be used to implement a Priority Queue:

| Data Structure             | extractMin            | decreaseKey          |
|----------------------------|-----------------------|----------------------|
| Binary heap                | O(log(V))  worst-case | O(log(V) worst-case  |
| Pairing heap               | O(log(V)) amortized   | O(1) amortized       |
| Binomial heap              | O(log(V))  worst-case | O(log(V)) worst-case |
| Fibonacci heap             | O(log(V)) amortized   | O(1) amortized       |
| Self-adjusting binary tree | O(log(V)) amortized   | O(log(V)) amortized  |
| Relaxed heap               | O(log(V)) amortized   | O(1) amortized       |
| Run-relaxed heap           | O(log(V)) worst-case  | O(1) worst-case      |

 The above table was taken from the following source:
 https://www2.seas.gwu.edu/~simhaweb/alg/modules/module8/module8.html