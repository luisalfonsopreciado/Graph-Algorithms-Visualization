# A\* Search Algorithm

A\* is one of the most efficient and "popular" algorithms used in path-finding and graph traversal.

A* improves upon Dijkstra's algorithm because it uses *heuristics\*. In other words, it knows where the target lies and implements an educated guess for picking the next node to search.

## Explanation

What the A\* Search Algorithm does is that at each step it picks the node according to a value **f** which is a parameter equal to the sum of two other parameters **g** and **h**.

At each step it picks the node/cell having the lowest **f**, and explores that node/cell.

## But what does **g** and **h** denote? What do they have to do with heuristics?

**g** : Represents the cost to move from the starting point to a given square on the grid, following the path generated to get there.

**h** : the estimated movement cost to move from a given square on the grid to the final destination. This is referred to as the _heuristic_ mentioned previously, or the "educated guess". We really don’t know the actual distance until we find the path, because all sorts of things can be in the way (walls, water, etc.). There exist different approaches to calculate **h**.

### How do we calculate the parameter h (heuristic)?

In this application, h is calculated using the **Manhattan Distance**. Which is nothing but the sum of absolute values of differences in the goal’s x and y coordinates and the current cell’s x and y coordinates respectively.

As a reminder, there are other ways to calculate h. For instance, we could calculate the **Euclidean Distance**. This is simply the distance between the current cell and the goal cell using the distance formula.

<img src="https://iq.opengenus.org/content/images/2018/12/distance.jpg" />

---

## PseudoCode

```
// This pseudocode is adapted from the source:
// https://en.wikipedia.org/wiki/A*_search_algorithm

Algorithm: A* (G, s)
Input: Graph G=(V,E) with edge weights and designated source vertex s.

    // Initialize priorities based on f and place in priority queue.
    Set priority[n] = For node n, fScore[n] = gScore[n] + h(n).

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
    // to n currently known.
    cameFrom = an empty map

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    gScore = map with default value of Infinity
    gScore[start] = 0

    // For node n, fScore[n] = gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how short a path from start to finish can be if it goes through n.
    fScore = map with default value of Infinity
    fScore[start] = h(start)

    while priority is not empty

        // This operation occurs in O(log(V)) since a binary-heap is used
        current = get node in the priority queue having the lowest fScore[] value

        // We have found the target
        if current = goal
            return reconstruct_path(cameFrom, current)

        for each neighbor of current
            // distance(current,neighbor) is the weight of the edge from current to neighbor
            // tentative_gScore is the distance from start to the neighbor through current
            tentative_gScore = gScore[current] + d(current, neighbor)

            if tentative_gScore < gScore[neighbor]
                // This path to neighbor is better than any previous one. Record it!
                cameFrom[neighbor] = current
                gScore[neighbor] = tentative_gScore
                fScore[neighbor] = gScore[neighbor] + h(neighbor)

                if neighbor not in priority queue
                    priority.add(neighbor)

    // Open set is empty but goal was never reached
    return failure
```

**Note**: In the above pseudocode, if a node is reached by one path, removed from the priority queue and subsequently reached by a cheaper path, it will be added to the priority queue again. This fact guarantees that the shortest path is found, given that the heuristic function is **admissible** but not **consistent**.

**Admissible**: The heuristic never overestimates the cost of reaching the goal. In other words, the cost it estimates to reach the goal is not higher than the lowest possible cost from the current point in the path.

**Consistent**: The heuristic estimate is always less than or equal to the estimated distance from any neighbouring vertex to the goal, plus the cost of reaching that neighbour.
