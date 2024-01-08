class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;
    constructor(val: T) {
        this.value = val;

    }
}

class Tree<T> {
    root: TreeNode<T> | null = null;
    //TODO: Define height and depth
    buildTree(myData: T[], start: number = 0, end: number = myData.length - 1) {
        if (start > end) return null;
        //array sortieren
        //myData.sort((a, b) => a - b);
        let mid = Math.floor((start + end) / 2);
        let node = new TreeNode(myData[mid]);

        node.left = this.buildTree(myData, start, mid - 1);
        node.right = this.buildTree(myData, mid + 1, end);
        return (this.root = node);
    }
    //Iterativly integration of insert Methode
    insert(val: T) {
        const newNode = new TreeNode<T>(val);
        if (!this.root) return (this.root = newNode);
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

    recursivMethod(val: T) {
        const current = (node: TreeNode<T>) => {
            if (node.value === val) return;
            if (node.value > val) {
                current((node.left = node.left ?? new TreeNode<T>(val)))
            }
            if (node.value < val) {  // Nullischer Koaleszenzoperator (??)
                current((node.right = node.right ?? new TreeNode<T>(val)))
            }
        };
        current((this.root = this.root ?? new TreeNode<T>(val)));
    }


    //find Method
    find(val: T) {
        const search: any = (node: TreeNode<T>, value: number) => {
            if (node === null) return null;
            if (node.value === value) return node;
            return search(node.left!, value) ?? search(node.right!, value);
        };
        return search(this.root!, val) ?? -1;
    }
    // breadth search (breitensuche)
    breadthFirst() {
        if (!this.root) return -1;
        let node = this.root;

        const queue: TreeNode<T>[] = [];
        const visited: T[] = [];

        while (queue.length) {
            node = queue.shift() as TreeNode<T>;
            visited.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return visited;
    }
    //depth first search
    // Pre-Order DFS
    preOrder(node: TreeNode<T> | null = this.root): T[] {
        let values: T[] = [];
        if (node) {
            values.push(node.value);
            values = values.concat(this.preOrder(node.left));
            values = values.concat(this.preOrder(node.right));
        }
        return values;
    }
    //inOrder search
    inOrder(node: TreeNode<T> | null = this.root): T[] {
        let values: T[] = [];
        if (node) {
            values = values.concat(this.inOrder(node.left));
            values.push(node.value);
            values = values.concat(this.inOrder(node.right));
        }
        return values;
    }
    // Post-Order DFS
    postOrder(node: TreeNode<T> | null = this.root): T[] {
        let values: T[] = [];
        if (node) {
            values = values.concat(this.postOrder(node.left));
            values = values.concat(this.postOrder(node.right));
            values.push(node.value);
        }
        return values;
    }

    findHeight(node: TreeNode<T> | null = this.root): number {
        if (node === null) {
            return -1;
        }
        let leftHeight: number = this.findHeight(node.left!);
        let rightHeight: number = this.findHeight(node.right!);

        return Math.max(leftHeight, rightHeight) + 1;
        
    }
}




function prettyPrint(node: TreeNode<number>, prefix = "", isLeft = true) {
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
console.log("heigt:",tree.findHeight(tree.root!.left!));



prettyPrint(tree.root as TreeNode<number>)








