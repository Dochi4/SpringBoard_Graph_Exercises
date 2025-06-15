class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertext of vertexArray) {
      this.nodes.add(vertext);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let v of this.nodes) {
      v.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let seen = new Set([start]);
    let results = [];

    function dfsRecursive(node) {
      results.push(node.value);

      for (let neighbor of node.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          dfsRecursive(neighbor);
        }
      }
    }

    dfsRecursive(start);
    return results;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set(queue);
    let results = [];

    while (queue.length > 0) {
      let node = queue.shift();
      results.push(node.value);

      for (let neighbor of node.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return results;
  }
}

module.exports = { Graph, Node };
