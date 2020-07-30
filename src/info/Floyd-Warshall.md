### Floyd-Warshall Algorithm

This algorithm finds the shortest path between any two vertices in a graph. Which is why it is also known as all-pairs
shortest path algorithm.

Pseudocode

```
Algorithm: Floyd-Warshall (adjMatrix)
Input: Adjacency matrix representation: adjMatrix[i][j] = weight of
       edge (i,j), if an edge exists; adjMatrix[i][j]=0 otherwise.

    for k=0 to numVertices-1
        for i=0 to numVertices-1
            for j=0 to numVertices-1
                if i != j 
                      // Use the same matrix. 
                    if D[i][k] + D[k][j] < D[i][j] 
                        D[i][j] = D[i][k] + D[k][j]
                    endif
                endif
            endfor
        endfor

    endfor
```

Time complexity of Floyd-Warshall

- There is a triple for loop in the above code that goes from 1 to the number of vertices. So it is simply O(V^3)