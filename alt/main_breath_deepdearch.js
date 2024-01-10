"use strict";
// const adjacencyList = new Map();
// adjacencyList.set("A", ["B","E"]);
// adjacencyList.set("B", ["A","C","D"]);
// adjacencyList.set("C", ["D","B"]);
class Graph {
    adjacencyList = new Map();
    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }
    addEdge(vertex1, vertex2) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.get(vertex1).push(vertex2);
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }
    removeEdges(vertex1, vertex2) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.set(vertex1, this.adjacencyList.get(vertex1).filter((a) => a != vertex2));
            this.adjacencyList.set(vertex2, this.adjacencyList.get(vertex1).filter((a) => a != vertex1));
        }
    }
    removeVertex(vertex) {
        while (this.adjacencyList.get(vertex)?.length) {
            this.removeEdges(vertex, this.adjacencyList.get(vertex)?.pop());
        }
        this.adjacencyList.delete(vertex);
    }
    //iterativ
    depthFirst(startVertex) {
        const stack = [startVertex];
        const result = [];
        const visited = {};
        let currentVertex = null;
        visited[startVertex] = true;
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);
            this.adjacencyList.get(currentVertex)?.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }
    // rekursiv
    // depthFirst(startVertex: T): T[] {
    //     const result: T[] = [];
    //     const visited: { [key: string]: boolean } = {};
    //     const adjacencyList = this.adjacencyList;
    //     const depthFirstSearch = (vertex: T) => {
    //         if (!vertex || visited[vertex.toString()]) return;
    //         visited[vertex.toString()] = true;
    //         result.push(vertex);
    //         adjacencyList.get(vertex).forEach((neighbor: T) => {
    //             if (!visited[neighbor as string]) {
    //                 depthFirstSearch(neighbor);
    //             }
    //         });
    //     };
    //     depthFirstSearch(startVertex);
    //     return result;
    // }
    breadthFirst(startVertex) {
        const queue = [startVertex];
        const result = [];
        const visited = {};
        let currentVertex = null;
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            this.adjacencyList.get(currentVertex).forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }
}
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("E", "D");
graph.addEdge("E", "F");
graph.addEdge("F", "D");
// graph.addVertex("Berlin");
// graph.addVertex("Wien");
// graph.addVertex("London");
// graph.addVertex("Barcelona");
// graph.addEdge("Berlin", "Wien")
// graph.addEdge("Wien", "London")
// graph.removeEdges("Berlin", "Wien")
//graph.removeVertex("Wien");
console.log(graph.depthFirst("A"));
console.log(graph.breadthFirst("A"));
//console.log(graph.adjacencyList);
//# sourceMappingURL=main_breath_deepdearch.js.map