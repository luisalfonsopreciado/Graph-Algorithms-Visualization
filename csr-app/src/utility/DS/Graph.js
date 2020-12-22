import { Queue } from "./Queue";
import { DisjointSet } from "./DisjointSet";
import { MinHeap } from "../index";
import Node from "../Node";

/**
 * A graph ADT implementation
 */
export class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  /**
   * Adds a vertex object to the graph
   *
   * @param {*} v  Vertex Object
   */
  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  /**
   * Adds an Edge to the graph
   *
   * @param {*} v start Vertex
   * @param {*} w end Vertex
   */
  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);
    // Since graph is undirected,
    // add an edge from w to v also
    // this.AdjList.get(w).push(v);
  }

  /**
   * Print the current graph instance
   */
  printGraph() {
    // get all the vertices
    let get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (let i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      let get_values = this.AdjList.get(i);
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (let j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  /**
   * Perform Breadth First Search on the graph
   *
   * @param {*} startingNode Reference to the starting node
   * @param {*} withAnimation Boolean indicating if animations are needed
   */
  bfs(startingNode, withAnimation) {
    // Array to store the animations
    const animations = [];

    // Create a visited array
    let visited = [];
    for (let i = 0; i < this.noOfVertices; i++) visited[i] = false;

    // Create an object for queue
    let q = new Queue();

    // add the starting node to the queue
    visited[startingNode] = true;
    q.enqueue(startingNode);

    // loop until queue is element
    while (!q.isEmpty()) {
      // get the element from the queue
      let getQueueElement = q.dequeue();

      // passing the current vertex to callback funtion
      // get the adjacent list for current vertex
      let get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (let n in get_List) {
        let neigh = get_List[n];

        if (!visited[neigh]) {
          neigh.predecessor = getQueueElement;
          neigh.dist = 1 + getQueueElement.dist;
          if (!withAnimation) neigh.markSearched2Done();
          if (neigh.is("Target") && !withAnimation) neigh.markShortestPath();
          animations.push(neigh);
          visited[neigh] = true;
          q.enqueue(neigh);
        }
      }
    }

    return animations;
  }

  /**
   * Perform a Depth First Search on the graph
   *
   * @param {*} startingNode Reference to the starting node
   * @param {*} withAnimation Boolean indicating if animations are desired
   */
  dfs(startingNode, withAnimation) {
    if (!startingNode) return [];
    const animations = [];

    let visited = [];
    for (let i = 0; i < this.noOfVertices; i++) visited[i] = false;

    this.DFSUtil(startingNode, visited, animations, withAnimation);

    return withAnimation ? animations : [];
  }

  /**
   *
   * Depth First search recursive utility function: process and explore
   * all the adjacent vertices of the input vertex
   *
   * @param {*} vert Reference to the starting node
   * @param {*} visited Boolean of arrays indicating if a vertex has been visited
   * @param {*} animations Array that holds the algorithm's animations
   * @param {*} withAnimation Boolean indicating if animation is desired
   */
  DFSUtil(vert, visited, animations, withAnimation) {
    visited[vert] = true;

    let get_neighbours = this.AdjList.get(vert);

    for (let i in get_neighbours) {
      let get_elem = get_neighbours[i];
      get_elem.dist = vert.dist + 1;
      if (!visited[get_elem]) {
        get_elem.predecessor = vert;
        if (!withAnimation) get_elem.markSearched2Done();

        if (get_elem.is("Target") && !withAnimation) {
          get_elem.markShortestPath();
        }
        animations.push(get_elem);
        this.DFSUtil(get_elem, visited, animations, withAnimation);
      }
    }
  }

  /**
   *
   * Perform Dijkstra's Algorithm on the graph.
   *
   * @param {*} startNode Reference to the starting node
   * @param {*} animations Array that will store the algorithm's animations
   * @param {*} hasSecond Boolean indicating if there is targets in the graph
   * @param {*} withAnimation Boolean indicating if animation is desired
   */
  dijkstra(startNode, animations, hasSecond, withAnimation) {
    if (!startNode) return [];

    // Prioritize based on the node's distance
    const heap = new MinHeap((item) => item.dist);

    heap.push(startNode);

    while (!heap.isEmpty()) {
      // Get the node with lowest distance
      const currentNode = heap.pop();

      // If we have found the target return the animations
      if (currentNode.is("Target")) {
        if (!withAnimation) currentNode.markShortestPath();
        return animations;
      }

      // Get neighbors
      let neighbors = this.AdjList.get(currentNode);

      // For each of neighbors
      for (let adjacentNode of neighbors) {
        // Calculate distance via the neighbor
        let tentativeDistance = adjacentNode.getWeight() + currentNode.dist;

        if (tentativeDistance < adjacentNode.dist) {
          // Path via neighbor is better, so record it.

          // Handle animations
          if (!withAnimation) adjacentNode.markSearched2Done();
          animations.push(adjacentNode);

          heap.push(adjacentNode);

          // Update the parent
          adjacentNode.predecessor = currentNode;

          // Update the distance
          adjacentNode.dist = tentativeDistance;
        }
      }
    }

    // We did not find the target
    return animations;
  }

  /**
   * Perform A* Algorithm to the graph
   *
   * @param {*} startNode Reference to the starting node
   * @param {*} targetNode Reference to the target node
   * @param {*} withAnimation Boolean indicating if animations are desired
   */
  aStar(startNode, targetNode, withAnimation) {
    if (startNode === null) return [];
    if (targetNode === null) return [];

    // Array to store nodes to animate
    const animations = [];

    // Prioritize based on the f parameter
    const heap = new MinHeap((item) => item.f);

    // g is zero for the start and Infinity for the rest of nodes
    startNode.f = this.manhattanDistance(startNode, targetNode);

    heap.push(startNode);

    while (!heap.isEmpty()) {
      // Get node in the priority queue having the lowest f value
      const currentNode = heap.pop();

      // The current distance of the currentNode
      let currentdist = currentNode.dist;

      // Get neighbors
      let adj = this.AdjList.get(currentNode);

      // Handle animations
      if (!withAnimation) currentNode.markSearched2Done();
      animations.push(currentNode);

      if (currentNode.is("Target")) {
        if (!withAnimation) currentNode.markShortestPath();
        return animations;
      }

      //for each of its adjacent nodes...
      for (let adjacentNode of adj) {
        // distance(current,neighbor) is the weight of the edge from current to neighbor
        // tentativeGScore  is the distance from start to the neighbor through current
        let tentativeGScore = currentdist + adjacentNode.getWeight();

        if (tentativeGScore < adjacentNode.dist) {
          // This path to neighbor is better than any previous one. Record it!

          //reference parent
          adjacentNode.predecessor = currentNode;

          adjacentNode.dist = tentativeGScore;

          // Set f value
          const g = adjacentNode.dist;

          const h = this.manhattanDistance(adjacentNode, targetNode);

          adjacentNode.f = g + h;

          heap.push(adjacentNode);
        }
      }
    }

    // We did not find the target
    return animations;
  }

  /**
   * Returns the ManhattanDistance between two graph nodes
   *
   * @param {*} node first node
   * @param {*} targetNode second node
   */
  manhattanDistance(node, targetNode) {
    return (
      Math.abs(node.col - targetNode.col) + Math.abs(node.row - targetNode.row)
    );
  }
  /**
   * Perform Greedy Best First search on the graph
   *
   * @param {*} startNode Reference to the starting node
   * @param {*} targetNode Reference to the target node
   * @param {*} withAnimation Boolean indicating if animations are desired
   */
  bestFirstSearch(startNode, targetNode, withAnimation) {
    if (startNode === null) return [];
    if (targetNode === null) return [];

    // Map to store visited nodes
    const visited = {};

    // Array to store the animations
    const animations = [];

    // Create Empty Priority Queue
    const heap = new MinHeap((item) => item.f);

    startNode.g = 0;
    this.greedyHeuristic(startNode, targetNode);

    // Insert start in priority queue
    heap.push(startNode);

    while (!heap.isEmpty()) {
      // Remove vertex with smallest cost
      const currentNode = heap.pop();

      // Check if currentNode is target and handle animations
      if (currentNode.is("Target")) {
        animations.push(currentNode);
        if (!withAnimation) currentNode.markShortestPath();
        return animations;
      }

      let currentdist = currentNode.dist;

      // Get neighbors of currentNode
      let adj = this.AdjList.get(currentNode);

      // Handle animations
      if (!withAnimation) currentNode.markSearched2Done();
      animations.push(currentNode);

      //for each adjacent node
      for (let a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        let d = adjacentNode.getWeight() + currentdist;

        // if the vertex is unvisited and distance is improved
        if (!(adjacentNode.id in visited) && d < adjacentNode.dist) {
          this.greedyHeuristic(adjacentNode, targetNode);

          if (!heap.contains(adjacentNode)) heap.push(adjacentNode);

          // Update the parent and distance
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;

          // Mark as visited
          visited[adjacentNode.id] = true;
        }
      }
    }

    // We did not find the target
    return animations;
  }

  /**
   * Update Greedy Heurisitc on two input nodes
   *
   * @param {*} node
   * @param {*} targetNode
   */
  greedyHeuristic(node, targetNode) {
    // Calculate the Euclidean distance between the node and target
    const h = Math.sqrt(
      Math.pow(node.col - targetNode.col, 2) +
        Math.pow(node.row - targetNode.row, 2)
    );
    node.h = Math.floor(h);
    node.f = node.h;
  }

  /**
   * Update Euclidean distance between two nodes
   *
   * @param {*} node
   * @param {*} targetNode
   */
  euclideanDistance(node, targetNode) {
    const h = Math.sqrt(
      Math.pow(node.col - targetNode.col, 2) +
        Math.pow(node.row - targetNode.row, 2)
    );
    node.h = Math.floor(h);
    node.f = node.getWeight() + node.h;
  }

  /**
   * Perform D* Algorithm on the graph
   *
   * @param {*} startNode Reference to start node
   * @param {*} targetNode Reference to target node
   * @param {*} withAnimation Boolean indicating if animations are desired
   */
  dStar(startNode, targetNode, withAnimation) {
    if (targetNode === null) return [];

    const queue = new Queue();
    const animations = [];

    targetNode.dist = 0;
    queue.enqueue(targetNode);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();
      const adj = this.AdjList.get(currentNode); // get neighbors
      for (let neighbor of adj) {
        const dist = 1 + currentNode.dist;
        if (dist < neighbor.dist || neighbor.is("Start")) {
          if (!withAnimation) neighbor.markSearched2Done();
          animations.push(neighbor);
          neighbor.dist = dist;
          neighbor.predecessor = currentNode;
          if (neighbor === startNode) {
            if (!withAnimation) {
              neighbor.markShortestPath();
              return [];
            }
            return animations;
          }
          queue.enqueue(neighbor);
        }
      }
    }

    return animations;
  }

  /**
   * Perform Prim's Algorithm on the graph
   *
   * @param {*} startNode Reference to start node
   * @param {*} targetNode Reference to target node
   * @param {*} withAnimation Boolean indicating if animations are desired
   */
  Prims(startNode, targetNode, withAnimation) {
    if (startNode === null) return [];
    if (targetNode === null) return [];

    const heap = new MinHeap((node) => node.dist);
    const mst = {};
    const animations = [];
    startNode.dist = 0;
    heap.push(startNode);

    while (!heap.isEmpty()) {
      const currentNode = heap.pop();

      const adjacentNodes = this.AdjList.get(currentNode);

      animations.push(currentNode);

      for (let adj of adjacentNodes) {
        if (adj.dist > adj.getWeight()) {
          !withAnimation && adj.markSearched2Done();
          heap.push(adj);
          adj.dist = adj.getWeight();
        }
      }

      mst[currentNode.toString()] = currentNode;
    }

    if (!withAnimation) targetNode.markShortestPath();

    return withAnimation ? animations : [];
  }

  /**
   * Perform kruskal's algorithm
   */
  kruskal() {
    // Heap used to order the edges
    const heap = new MinHeap((el) => el.w);

    // Disjoint set to keep track of cycles
    const ds = new DisjointSet(5000);
    const mst = [];
    const edges = {};
    const animations = [];

    // Go thru all edges
    this.AdjList.forEach((arr, key) => {
      arr.forEach((adj) => {
        const edgeId = [key.id, adj.id];
        edgeId.sort((a, b) => a - b);

        // Add the edge to the heap
        if (!edges.hasOwnProperty(edgeId.toString())) {
          edges[edgeId] = true;
          heap.push({
            nodes: [key, adj],
            w: key.getWeight() + adj.getWeight() - 1,
            i: key.id,
            j: adj.id,
          });
        }
      });
    });

    // Go thru the heap contents
    while (!heap.isEmpty()) {
      const currentEdge = heap.pop();
      const hasCycle = ds.hasCycle(currentEdge.i, currentEdge.j);

      // If the edge does not cause a cycle add it to the MST
      if (!hasCycle) {
        animations.push(currentEdge.nodes[0]);
        animations.push(currentEdge.nodes[1]);
        mst.push(currentEdge);
      }
    }

    return animations;
  }

  /**
   * Perform Bellman Ford's Algorithm on the graph
   * @param {*} startNode Reference to start node
   * @param {*} nodeGrid Reference to node Grid
   * @param {*} withAnimation Boolean indicating if animations are desired
   */
  bellmanFord(startNode, nodeGrid, withAnimation) {
    if (startNode === null) return [];
    // Initialize startVertex by setting dist = 0
    startNode.dist = 0;

    // HashMap to store the nodes By their ID
    const nodes = {};

    // Calculate number of nodes
    const n = nodeGrid.length * nodeGrid[0].length;

    // Create a HashMap Of Id -> Node Obj
    for (let id = 1; id <= n; id++) {
      // get Node Given an Id
      const node = Node.getNode(id, nodeGrid);
      nodes[id] = node;
    }

    // Animate all nodes
    let animations = [...Object.values(nodes)];
    animations = animations.filter((node) => !node.is("Wall"));

    // Relax the edges
    for (let i = 1; i < this.noOfVertices; i++) {
      // Go thru all edges and relax them
      this.AdjList.forEach((arr, key) => {
        arr.forEach((adj) => {
          if (key.dist > adj.dist + adj.getWeight()) {
            key.dist = adj.dist + adj.getWeight();
            key.predecessor = adj;
          }
        });
      });
    }

    return animations;
  }

  /**
   * Perform a Bidirectional BFS starting at startNode and targetNode
   * @param {Node} startNode
   * @param {Node} targetNode
   */
  bidirectionalBFS(startNode, targetNode) {
    const animations = [];
    const visited = {};
    const queue = new Queue();
    queue.enqueue(startNode);
    queue.enqueue(targetNode);
    visited[startNode] = true;
    visited[targetNode] = true;

    while (!queue.isEmpty()) {
      const size = queue.size();
      for (let i = 0; i < size; i++) {
        const curr = queue.dequeue();
        const neighbors = this.AdjList.get(curr);

        for (let neigh of neighbors) {
          if (neigh in visited) {
            continue;
          }
          animations.push(neigh);
          neigh.predecessor = curr;
          visited[neigh] = true;
          queue.enqueue(neigh);
        }
      }
    }

    return animations;
  }
}
