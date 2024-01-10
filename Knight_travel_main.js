"use strict";
class Knight {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    isInField(x, y) {
        return (x >= 0 && y >= 0 && x < 8 && y < 8);
    }
    breadthFirstSearch(start, end) {
        const moves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        const queue = [[...start, 0]];
        const visited = {};
        while (queue.length > 0) {
            const [x, y, depth] = queue.shift();
            if (x === end[0] && y === end[1]) {
                return depth;
            }
            for (let move of moves) {
                let newX = x + move[0];
                let newY = y + move[1];
                if (this.isInField(newX, newY) && !visited[`${newX},${newY}`]) {
                    visited[`${newX},${newY}`] = true;
                    queue.push([newX, newY, depth + 1]);
                }
            }
        }
        return "es sind nur Positive Zahlen erlaubt";
    }
}
const knight = new Knight(0, 0);
// console.log(knight.breadthFirstSearch([knight.x,knight.y], [0, 0]))
function test() {
    for (let x = 10; x >= 0; x--) {
        for (let y = 10; y >= 0; y--) {
            console.log(`Test: x=${x}, y=${y}`);
            console.log(knight.breadthFirstSearch([x, y], [0, 0]), "bfs");
        }
    }
}
test();
//# sourceMappingURL=Knight_travel_main.js.map