# A\* Search Algorithm

A\* is one of the most efficient and "popular" algorithms used in path-finding and graph traversal.

A* improves upon Dijkstra's algorithm because it uses *heuristics*. In other words, it knows where the target lies and implements an educated guess for picking the next node to search.

## Explanation

What the A\* Search Algorithm does is that at each step it picks the node according to a value **f** which is a parameter equal to the sum of two other parameters **g** and **h**.

At each step it picks the node/cell having the lowest **f**, and explores that node/cell.

## But what does **g** and **h** denote? What do they have to do with heuristics?

**g** : Represents the cost to move from the starting point to a given square on the grid, following the path generated to get there.

**h** : the estimated movement cost to move from a given square on the grid to the final destination. This is referred to as the _heuristic_ mentioned previously, or the "educated guess". We really don’t know the actual distance until we find the path, because all sorts of things can be in the way (walls, water, etc.). There exist different approaches to calculate **h**.

### How do we calculate the parameter h (heuristic)?

In this application, h is calculated using the **Manhattan Distance**. Which is nothing but the sum of absolute values of differences in the goal’s x and y coordinates and the current cell’s x and y coordinates respectively.

As a reminder, there are other ways to calculate h. For instance, we could calculate the **Euclidean Distance**. This is simply the distance between the current cell and the goal cell using the distance formula.

<img src="%PUBLIC_URL%/images/h.jpg" />
