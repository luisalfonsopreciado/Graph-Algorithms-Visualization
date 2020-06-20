import { Queue } from "./Queue";
import { MinHeap } from "../index";

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
  bfs(startingNode) {
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
      // console.log(getQueueElement);

      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (var n in get_List) {
        var neigh = get_List[n];

        if (!visited[neigh]) {
          neigh.predecessor = getQueueElement;
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
  dfs(startingNode) {
    const animations = [];

    var visited = [];
    for (var i = 0; i < this.noOfVertices; i++) visited[i] = false;

    this.DFSUtil(startingNode, visited, animations);

    return animations;
  }

  // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited, animations) {
    visited[vert] = true;
    console.log(vert);

    var get_neighbours = this.AdjList.get(vert);

    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i];
      if (!visited[get_elem]) {
        get_elem.predecessor = vert;
        animations.push(get_elem);
        this.DFSUtil(get_elem, visited, animations);
      }
    }
  }

  //dijkstra solve graph starting at s
  dijkstra(startNode) {
    const animations = [];

    const heap = new MinHeap((item) => item.dist);

    heap.push(startNode);

    while (!heap.isEmpty()) {
      //for each existing solution
      const currentNode = heap.pop();

      var currentdist = currentNode.dist;
      var adj = this.AdjList.get(currentNode); // get neighbors

      //for each of its adjacent nodes...
      for (var a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        var d = 1 + currentdist;

        if (d < adjacentNode.dist && !heap.contains(adjacentNode)) {
          animations.push(adjacentNode);
          heap.push(adjacentNode);
          //reference parent
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;
        }
      }
    }
    return animations;
  }

  aStar(startNode, targetNode) {
    const animations = [];

    const heap = new MinHeap((item) => item.f);
    startNode.g = 0;
    this.manhattanDistance(startNode, targetNode);

    heap.push(startNode);

    heap.print();

    while (!heap.isEmpty()) {
      const currentNode = heap.pop();

      var currentdist = currentNode.dist;
      var adj = this.AdjList.get(currentNode); // get neighbors

      //for each of its adjacent nodes...
      for (var a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        var d = 1 + currentdist;

        if (d < adjacentNode.dist && !heap.contains(adjacentNode)) {
          animations.push(adjacentNode);
          this.manhattanDistance(adjacentNode, targetNode);
          heap.push(adjacentNode);
          //reference parent
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;
          if (adjacentNode.isTarget()) return animations;
        }
      }
    }

    return animations;
  }

  manhattanDistance(node, targetNode) {
    const h =
      Math.abs(node.col - targetNode.col) + Math.abs(node.row - targetNode.row);
    node.h = h;
    node.f = node.g + node.h;
  }

  bestFirstSearch(startNode, targetNode) {
    const animations = [];

    const heap = new MinHeap((item) => item.f);
    startNode.g = 0;
    this.euclideanDistance(startNode, targetNode);

    heap.push(startNode);

    heap.print();

    while (!heap.isEmpty()) {
      const currentNode = heap.pop();

      var currentdist = currentNode.dist;
      var adj = this.AdjList.get(currentNode); // get neighbors

      //for each of its adjacent nodes...
      for (var a in adj) {
        const adjacentNode = adj[a];

        //choose nearest node with lowest *total* cost
        var d = 1 + currentdist;

        if (d < adjacentNode.dist && !heap.contains(adjacentNode)) {
          animations.push(adjacentNode);

          this.euclideanDistance(adjacentNode, targetNode);

          heap.push(adjacentNode);

          //reference parent
          adjacentNode.predecessor = currentNode;
          adjacentNode.dist = d;
          if (adjacentNode.isTarget()) return animations;
        }
      }
    }

    return animations;
  }

  euclideanDistance(node, targetNode) {
    const h = Math.sqrt(
      Math.pow(node.col - targetNode.col, 2) +
        Math.pow(node.row - targetNode.row, 2)
    );
    node.h = Math.floor(h);
    node.f = node.g + node.h;
  }
}