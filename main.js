"use strict";
// // Distances
// A: 0
// B: 5
// C: infinity
// D: 5
// E: 8
// F: infinity
// //previes
// A: null
// B: 'A'
// C: 'A'
// D: 'C'
// E: 'D'
//priority queue
class PriorityQueue {
    values = [];
    enqueue(val, priority) {
        this.values.unshift({ val, priority });
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}
class WeightedGraph {
    adjacencyList = new Map();
    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }
    addEdge(vertex1, vertex2, weight) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.get(vertex1)?.push({ node: vertex2, edge: weight });
            this.adjacencyList.get(vertex2)?.push({ node: vertex1, edge: weight });
        }
    }
    dijkstraSearch(start, end) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let nextNode;
        let sumOfDist;
        if (key === start) {
            distances[key] = 0;
            nodes.enqueue(key, 0);
        }
        else {
            distances[key] = Infinity;
            nodes.enqueue(key, Infinity);
        }
        previous[key] = null;
    }
    ;
    while(nodes, values, length) {
        smallest = nodes.dequeue()?.val;
        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor in this.adjacencyList.get(smallest)) {
                nextNode = this.adjacencyList.get(smallest)?.at(neighbor);
                //calculate Distances
                sumOfDist = distances[smallest] + nextNode.edge;
                //update Lists
                if (sumOfDist < distances[nextNode?.node]) {
                    distances[nextNode?.node] = sumOfDist;
                    previous[nextNode?.node] = smallest;
                    nodes.enqueue(nextNode.node, sumOfDist);
                }
            }
        }
        console.log("distances:", distances, "Priority Queue:", nodes, "Previous:");
    }
}
const dijkstragraph = new WeightedGraph();
dijkstragraph.addVertex("A");
dijkstragraph.addVertex("B");
dijkstragraph.addVertex("C");
dijkstragraph.addVertex("D");
dijkstragraph.addVertex("E");
dijkstragraph.addVertex("F");
dijkstragraph.addEdge("A", "B", 5);
dijkstragraph.addEdge("A", "C", 3);
dijkstragraph.addEdge("B", "E", 3);
dijkstragraph.addEdge("C", "D", 2);
dijkstragraph.addEdge("C", "F", 5);
dijkstragraph.addEdge("D", "F", 1);
dijkstragraph.addEdge("D", "F", 1);
dijkstragraph.addEdge("E", "F", 1);
console.log(dijkstragraph.adjacencyList);
//# sourceMappingURL=main.js.map