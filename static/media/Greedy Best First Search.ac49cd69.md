# Greedy Best First Search

Greedy Best-first search is a search algorithm which explores a graph by visiting the most promising node chosen according to a specified rule, in this case a heuristic function, or an "educated guess".

A* is not considered a greedy best-first search algorithm, as it incorporate the distance from the start in addition to the estimated distances to the goal.

---

## Step By Step Procedure:

Using a greedy algorithm, expand the first successor of the parent. After a successor is generated:

If the successor's heuristic is better than its parent, the successor is set at the front of the queue (with the parent reinserted directly behind it), and the loop restarts.
Else, the successor is inserted into the queue (in a location determined by its heuristic value). The procedure will evaluate the remaining successors (if any) of the parent.