import { Queue } from "./Queue";
import { DisjointSet } from "./DisjointSet";
import { MinHeap } from "../index";
import Node from "../Node";

export class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w

    this.AdjList.get(v).push(w);

    // Since graph is undirected,
    // add an edge from w to v also
    // this.AdjList.get(w).push(v);
  }

  printGraph() {
    // get all the vertices
    var get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (var i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  // bfs(v)
  // function to performs BFS
  bfs(startingNode, withAnimation) {
    // create a visited array
    const animations = [];

    var visited = [];
    for (var i = 0; i < this.noOfVertices; i++) visited[i] = false;

    // Create an object for queue
    var q = new Queue();

    // add the starting node to the queue
    visited[startingNode] = true;
    q.enqueue(startingNode);

    // loop until queue is element
    while (!q.isEmpty()) {
      // get the element from the queue
      var getQueueElement = q.dequeue();

      // passing the current vertex to callback funtion

      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (var n in get_List) {
        var neigh = get_List[n];

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

  // dfs(v)
  // Main DFS method
  dfs(startingNode, withAnimation) {
    if (!startingNode) return [];
    const animations = [];

    var visited = [];
    for (var i = 0; i < this.noOfVertices; i++) visited[i] = false;

    this.DFSUtil(startingNode, visited, animations, withAnimation);

    return withAnimation ? animations : [];
  }

  // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited, animations, withAnimation) {
    visited[vert] = true;

    var get_neighbours = this.AdjList.get(vert);

    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i];
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

  dijkstra(startNode, animations, hasSecond, withAnimation) {
    if (!startNode) return [];
    const heap = new MinHeap((item) => item.dist);

    heap.push(startNode);

    let finishedAnimating = false;

    while (!heap.isEmpty()) {
      //for each existing solution
      const currentNode = heap.pop();

      var currentdist = currentNode.dist;
      var adj = this.AdjList.get(currentNode); // get neighbors

      //for each of its adjacent nodes...
      for (var a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        var d = adjacentNode.getWeight() + currentdist;

        if (d < adjacentNode.dist) {
          if (!finishedAnimating) animations.push(adjacentNode);
          if (!withAnimation) adjacentNode.markSearched2Done();
          if (!heap.contains(adjacentNode)) heap.push(adjacentNode);

          //reference parent
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;
          if (adjacentNode.is("Target") || adjacentNode.is("SecondaryTarget")) {
            if (!withAnimation) {
              adjacentNode.markShortestPath();
              return [];
            }

            if (hasSecond) {
              this.dijkstra(adjacentNode, animations);
            } else {
              finishedAnimating = true;
            }
          }
        }
      }
    }
    return animations;
  }

  aStar(startNode, targetNode, withAnimation) {
    if (startNode === null) return [];
    if (targetNode === null) return [];

    const animations = [];

    const heap = new MinHeap((item) => item.f);

    startNode.f = this.manhattanDistance(startNode, targetNode);

    heap.push(startNode);

    while (!heap.isEmpty()) {
      const currentNode = heap.pop();

      var currentdist = currentNode.dist;
      var adj = this.AdjList.get(currentNode); // get neighbors

      animations.push(currentNode);
      if (!withAnimation) currentNode.markSearched2Done();

      if (currentNode.is("Target")) {
        if (!withAnimation) currentNode.markShortestPath();
        return animations;
      }

      //for each of its adjacent nodes...
      for (var a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        var d = adjacentNode.getWeight() + currentdist;

        if (d < adjacentNode.dist) {
          adjacentNode.f = this.manhattanDistance(adjacentNode, targetNode) + d;

          if (!heap.contains(adjacentNode)) heap.push(adjacentNode);

          //reference parent
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;
        }
      }
    }

    return animations;
  }

  manhattanDistance(node, targetNode) {
    return (
      Math.abs(node.col - targetNode.col) + Math.abs(node.row - targetNode.row)
    );
  }

  bestFirstSearch(startNode, targetNode, withAnimation) {
    if (startNode === null) return [];
    if (targetNode === null) return [];
    const animations = [];

    const heap = new MinHeap((item) => item.f);
    startNode.g = 0;
    this.greedyHeuristic(startNode, targetNode);

    heap.push(startNode);

    while (!heap.isEmpty()) {
      const currentNode = heap.pop();

      var currentdist = currentNode.dist;
      var adj = this.AdjList.get(currentNode); // get neighbors

      if (!withAnimation) currentNode.markSearched2Done();
      animations.push(currentNode);

      //for each of its adjacent nodes...
      for (var a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        var d = adjacentNode.getWeight() + currentdist;

        if (d < adjacentNode.dist && !heap.contains(adjacentNode)) {
          this.greedyHeuristic(adjacentNode, targetNode);

          heap.push(adjacentNode);

          //reference parent
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;
          if (adjacentNode.is("Target")) {
            animations.push(adjacentNode);
            if (!withAnimation) adjacentNode.markShortestPath();
            return animations;
          }
        }
      }
    }

    return animations;
  }

  greedyHeuristic(node, targetNode) {
    const h = Math.sqrt(
      Math.pow(node.col - targetNode.col, 2) +
        Math.pow(node.row - targetNode.row, 2)
    );
    node.h = Math.floor(h);
    node.f = node.h;
  }

  euclideanDistance(node, targetNode) {
    const h = Math.sqrt(
      Math.pow(node.col - targetNode.col, 2) +
        Math.pow(node.row - targetNode.row, 2)
    );
    node.h = Math.floor(h);
    node.f = node.getWeight() + node.h;
  }

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

  Prims(startNode, targetNode, withAnimation) {
    if (startNode === null) return [];
    if (targetNode === null) return [];

    const heap = new MinHeap((node) => node.dist);
    const mst = {};
    const animations = [];
    startNode.dist = 0;
    heap.push(startNode);

    // let prevNode = null;

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

      // currentNode.predecessor = prevNode;
      // prevNode = currentNode;
      mst[currentNode.toString()] = currentNode;
    }

    if (!withAnimation) targetNode.markShortestPath();

    console.log(mst);
    return withAnimation ? animations : [];
  }

  kruskal() {
    // Heap used to order the edges
    const heap = new MinHeap((el) => el.w);
    // Distjoint set to keep track of cycles
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

  bellmanFord(startNode, nodeGrid) {
    // Initialize startVertex by setting dist = 0
    startNode.dist = 0;
    const animations = [];

    // HashMap to store the nodes By their ID
    const nodes = {};

    // Create a HashMap Of Id -> Node Obj
    for (let i = 1; i <= this.noOfVertices; i++) {
      const node = Node.getNode(i, nodeGrid); // get Node Given an Id
      nodes[i] = node;
    }

    // Relax the edges
    for (let i = 1; i < this.noOfVertices; i++) {
      // Go thru all edges and relax them
      this.AdjList.forEach((arr, key) => {
        arr.forEach((adj) => {
          if (key.dist > adj.dist + adj.getWeight()) {
            key.dist = adj.dist + adj.getWeight();
          }
        });
      });
    }

    return animations;
  }
}
