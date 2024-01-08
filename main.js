"use strict";
class TreeNode {
    constructor(val) {
        this.left = null;
        this.right = null;
        this.value = val;
    }
}
class Tree {
    constructor() {
        this.root = null;
    }
    //TODO: Define height and depth
    buildTree(myData, start = 0, end = myData.length - 1) {
        if (start > end)
            return null;
        //array sortieren
        //myData.sort((a, b) => a - b);
        let mid = Math.floor((start + end) / 2);
        let node = new TreeNode(myData[mid]);
        node.left = this.buildTree(myData, start, mid - 1);
        node.right = this.buildTree(myData, mid + 1, end);
        return (this.root = node);
    }
    //Iterativly integration of insert Methode
    insert(val) {
        const newNode = new TreeNode(val);
        if (!this.root)
            return (this.root = newNode);
        let current = this.root;
        while (true) {
            // if( val === current.value) return; oder ...
            if (val === current.value) {
                if (!current.left) {
                    return (current.left = newNode);
                }
                current = current.left;
            }
            if (val < current.value) {
                if (!current.left) {
                    return (current.left = newNode);
                }
                current = current.left;
            }
            if (val > current.value) {
                if (!current.right) {
                    return (current.right = newNode);
                }
                current = current.right;
            }
        }
    }
    //recursiv insert method
    recursivMethod(val) {
        var _a;
        const current = (node) => {
            var _a, _b;
            if (node.value === val)
                return;
            if (node.value > val) {
                current((node.left = (_a = node.left) !== null && _a !== void 0 ? _a : new TreeNode(val)));
            }
            if (node.value < val) { // Nullischer Koaleszenzoperator (??)
                current((node.right = (_b = node.right) !== null && _b !== void 0 ? _b : new TreeNode(val)));
            }
        };
        current((this.root = (_a = this.root) !== null && _a !== void 0 ? _a : new TreeNode(val)));
    }
    //find Method
    find(val) {
        var _a;
        const search = (node, value) => {
            var _a;
            if (node === null)
                return null;
            if (node.value === value)
                return node;
            return (_a = search(node.left, value)) !== null && _a !== void 0 ? _a : search(node.right, value);
        };
        return (_a = search(this.root, val)) !== null && _a !== void 0 ? _a : -1;
    }
    // breadth search (breitensuche)
    breadthFirst() {
        if (!this.root)
            return -1;
        let node = this.root;
        const queue = [];
        const visited = [];
        while (queue.length) {
            node = queue.shift();
            visited.push(node.value);
            if (node.left)
                queue.push(node.left);
            if (node.right)
                queue.push(node.right);
        }
        return visited;
    }
    //depth first search
    // Pre-Order DFS
    preOrder(node = this.root) {
        let values = [];
        if (node) {
            values.push(node.value);
            values = values.concat(this.preOrder(node.left));
            values = values.concat(this.preOrder(node.right));
        }
        return values;
    }
    //inOrder search
    inOrder(node = this.root) {
        let values = [];
        if (node) {
            values = values.concat(this.inOrder(node.left));
            values.push(node.value);
            values = values.concat(this.inOrder(node.right));
        }
        return values;
    }
    // Post-Order DFS
    postOrder(node = this.root) {
        let values = [];
        if (node) {
            values = values.concat(this.postOrder(node.left));
            values = values.concat(this.postOrder(node.right));
            values.push(node.value);
        }
        return values;
    }
    findHeight(node = this.root) {
        if (node === null) {
            return -1;
        }
        let leftHeight = this.findHeight(node.left);
        let rightHeight = this.findHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
function prettyPrint(node, prefix = "", isLeft = true) {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "|  " : "   "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└──" : "┌──"}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "|   " : "   "}`, true);
    }
}
const data = [5, 10, 21, 87, 301, 350, 408, 34];
const tree = new Tree();
tree.buildTree(data);
//console.log(tree);
// tree.insert(12);
// tree.insert(10);
// tree.insert(2);
// tree.insert(9);
// tree.insert(1);
// tree.insert(5);
// tree.insert(11);
// tree.insert(6);
// tree.insert(8);
//tree.recursivMethod(12);
//console.log("breadthfirst: ", tree.breadthFirst());
// console.log("preorder: ", tree.preOrder());
// console.log("inorder: ", tree.inOrder());
// console.log("postorder: ", tree.postOrder());
console.log("heigt:", tree.findHeight(tree.root.left));
prettyPrint(tree.root);
//# sourceMappingURL=main.js.map