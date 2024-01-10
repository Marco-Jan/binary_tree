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

class PriorityQueue<T> {
    values: { val: T, priority: number }[] = [];
    enqueue(val: T, priority: number) {
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

type Edge<T, U> = { node: T, edge: U };

class WeightedGraph<T, U> {
    adjacencyList = new Map<T, Edge<T, U>[]>();
    addVertex(vertex: T) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1: T, vertex2: T, weight: U) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.get(vertex1)?.push({ node: vertex2, edge: weight });
            this.adjacencyList.get(vertex2)?.push({ node: vertex1, edge: weight });
        }
    }

    dijkstraSearch(start: T, end: T) {
        const nodes = new PriorityQueue();
        const distances: { [key: string]: number } = {};
        const previous: { [key: string]: number | null } = {};
        let smallest: T;
        let nextNode: Edge<T, U>;
        const path: T[] = [];
        let sumOfDist: number;
        this.adjacencyList.forEach((_, key) => {
            if (key === start) {
                distances[key as string] = 0;
                nodes.enqueue(key, 0);
            } else {
                distances[key as string] = Infinity;
                nodes.enqueue(key, Infinity);
            }
            previous[key as string] = null;

        });

        while (nodes.values.length) {
            smallest = nodes.dequeue()?.val as T;
            if(smallest === end) {
                while (previous [smallest as string] ){
                    path.push(smallest);
                    smallest = previous[smallest as string] as T;
                }

                break;
            }
            if (smallest || distances[smallest as string] !== Infinity) {
                for (let neighbor in this.adjacencyList.get(smallest)) {
                    nextNode = this.adjacencyList.get(smallest)?.at(neighbor as any) as Edge<T, U>;
                    //calculate Distances
                    sumOfDist = (distances[smallest as string] as any) + nextNode?.edge;
                    //update Lists
                    if (sumOfDist < distances[nextNode?.node as string]) {
                        distances[nextNode?.node as string] = sumOfDist;
                        previous[nextNode?.node as string] = smallest as number;
                        nodes.enqueue(nextNode!.node, sumOfDist);
                    }
                }
            }
            console.log("distances:", distances, "Priority Queue:", nodes, "Previous:");
        }
        return path.concat(smallest!).reverse();
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

console.log(dijkstragraph.dijkstraSearch("A","E"));


