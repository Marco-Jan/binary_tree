// const adjacencyList = new Map();
// adjacencyList.set("A", ["B","E"]);
// adjacencyList.set("B", ["A","C","D"]);
// adjacencyList.set("C", ["D","B"]);

// console.log(adjacencyList);

type AdjacencyList<T> = Map<T, T[]>;

class Graph<T> {
    adjacencyList = new Map();

    addVertex(vertex: T) {
        this.adjacencyList.set(vertex, [])
    }

    addEdge(vertex1: T, vertex2: T) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.get(vertex1).push(vertex2);
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }

    removeEdges(vertex1: T, vertex2: T) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.set(vertex1, this.adjacencyList.get(vertex1)!.filter((a: T) => a != vertex2));
            this.adjacencyList.set(vertex2, this.adjacencyList.get(vertex1)!.filter((a: T) => a != vertex1));
        }
    }

    removeVertex(vertex: T) {
        while (this.adjacencyList.get(vertex)?.length) {
            this.removeEdges(vertex, this.adjacencyList.get(vertex)?.pop() as T);
        }
        this.adjacencyList.delete(vertex);
    }
    //iterativ
    // depthFirst(startVertex: T): T[] {
    //     const stack = [startVertex];
    //     const result: T[] = [];
    //     const visited: { [key: string]: boolean} = {};
    //     let currentVertex: T | null = null;
    //     visited[startVertex as string] = true;
    //     while(stack.length) {
    //         currentVertex = stack.pop() as T;
    //         result.push(currentVertex);
    //         this.adjacencyList.get(currentVertex)?.forEach((neighbor: T) => {
    //             if(!visited[neighbor as string]){
    //                 visited[neighbor as string] = true;
    //                 stack.push(neighbor)
    //             }
    //         });
    //     }
    //     return result;
    // }

    // rekursiv

    depthFirst(startVertex: T): T[] {
        const result: T[] = [];
        const visited: { [key: string]: boolean } = {};
        const adjacencyList = this.adjacencyList;

        const depthFirstSearch = (vertex: T) => {
            if (!vertex || visited[vertex.toString()]) return;
            visited[vertex.toString()] = true;
            result.push(vertex);
            adjacencyList.get(vertex).forEach((neighbor: T) => {
                if (!visited[neighbor as string]) {
                    depthFirstSearch(neighbor);
                }
            });
        };


        depthFirstSearch(startVertex);

        return result;
    }

    breadthFirst(startVertex: T) {
        const queue = [startVertex];
        const result: T[] = [];
        const visited: { [key: string]: boolean } = {};
        let currentVertex: T | null = null;

        while (queue.length) {
            currentVertex = queue.shift() as T;
            result.push(currentVertex);

            this.adjacencyList.get(currentVertex).forEach((neighbor: T) => {
                if (!visited[neighbor as string]) {
                    visited[neighbor as string] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }
}






const graph = new Graph<string>();


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
