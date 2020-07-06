### Dijkstra Shortest Path Algorithm

Dijkstra's algorithms is a set of steps we can use to find the shortest path between two verices in a weighted graph.

**Step 1**: Start at the beginning vertex by marking it with a distance of 0, because it's 0 units from the start. Call this vertex your current vertex, and put a circle around it indicating as such.

**Step 2**: Identify all of the vertices that are connected to the current vertex with an edge. Calculate their distance to the end by adding the weight of the edge to the mark on the current vertex. Mark each of the vertices with their corresponding distance, but only change a vertex's mark if it's less than a previous mark. Each time you mark the starting vertex with a mark, keep track of the path that resulted in that mark.

**Step 3**: Label the current vertex as visited by putting an X over it. Once a vertex is visited, we won't look at it again.

**Step 4**: Of the vertices you just marked, find the one with the smallest mark, and make it your current vertex. Now, you can start again from step 2.

**Step 5**: Once you've labeled the beginning vertex as visited - stop. The distance of the shortest path is the mark of the starting vertex, and the shortest path is the path that resulted in that mark.

The Time complexity of Dijkstra's algorithm is
**O(E * log(V))** where:

- V is the number of vertices
- E is the total number of edges

But why is this true?

- Each vertex can be connect to V - 1 vertices, therefore the number of adjacent edges to each vertex is V - 1.

- Find and Updating each adjacent vertex's weight in the min heap is O(log(V)) + O(1) or 
O(log(V))

- For each edge we find a update the adjacent vertex weight. With this we conclude that the time complexity for the current implementation of Dijktra's is O(E * log(V)).

