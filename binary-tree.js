class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return this.root;
        } else {
            let current = this.root;
            while (true) {
                if (value === current.data) return;
                if (value < current.data) {
                    if (current.left === null) {
                        current.left = new Node(value);
                        return current.left;
                    }
                    current = current.left;
                } else {
                    if (current.right === null) {
                        current.right = new Node(value);
                        return current.right;
                    }
                    current = current.right;
                }
            }
        }
    }
    delete(value) {
        if (this.root === null) return null;

        let current = this.root;
        let parent = null;

        //find the node
        while (current !== null && current.data !== value) {
            parent = current;
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (current === null) return null;

        //if the node is leaf node, set it's parent to null then remove it
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (current === parent.left) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            return current;
        }
        //if node has one child, replace the node with its child
        if (current.left === null) {
            if (current === this.root) {
                this.root = current.right;
            } else if (current === parent.left) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
            return current;
        }
        if (current.right === null) {
            if (current === this.root) {
                this.root = current.left;
            } else if (current === parent.left) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
            return current;
        }
        //if node has 2 children, replace the node with the smallest child then delete the smallest
        let childParent = current;
        let child = current.right;

        while (child.left !== null) {
            childParent.left = child.right;
            child.right = current.right;
        }
        if (childParent !== current) {
            childParent.left = child.right;
            child.right = current.right;
        }
        if (current === this.root) {
            this.root = child;
        } else if (current === parent.left) {
            parent.left = child;
        } else {
            parent.right = child;
        }
        child.left = current.left;

        return current;
    }

    find(value, node = this.root) {
        if (node === null) {
            return null;
        } else if (value === node.data) {
            return node;
        } else if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback, queue = [], node = this.root) {
        if (!node) return [];
        const result = [];

        callback(node);
        result.push(node.data);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (queue.length) {
            const nextNode = queue.shift();
            result.push(...this.levelOrder(callback, queue, nextNode));
        }

        return result;
    }

    // left,root,right
    inorder(callback, node = this.root) {
        const result = [];
        if (!node) return result;

        this.inorder(callback, node.left);
        callback(node);
        result.push(node.data);
        this.inorder(callback, node.right);

        return result;
    }

    // root,left,right
    preorder(callback, node = this.root) {
        const result = [];
        if (!node) return result;

        callback(node);
        result.push(node.data);
        this.preorder(callback, node.left);
        this.preorder(callback, node.right);

        return result;
    }

    // left,right,root
    postorder(callback, node = this.root) {
        const result = [];
        if (!node) return result;

        this.postorder(callback, node.left);
        this.postorder(callback, node.right);
        callback(node);
        result.push(node.data);

        return result;
    }

    height(node = this.root) {
        if (node === null) return 0;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1; // plus one for the node itself
    }

    depth(node, current = this.root, depth = 1) {
        if (node === null) return null;
        if (node === current) return depth;

        if (node.data < current.data)
            return this.depth(node, current.left, depth + 1);
        else return this.depth(node, current.right, depth + 1);
    }

    isBalanced(node = this.root) {
        if (!node) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        this.root = buildTree(this.levelOrder(() => {}));
        return this.root;
    }
}

function buildTree(array, start = 0, end = 0) {
    const arrayNoDuplicates = [...new Set(array)];
    const sortedArray = sort(arrayNoDuplicates);
    end = sortedArray.length - 1;

    if (start > end) return null;

    const midElement = Math.floor(start + end / 2);
    const node = new Node(sortedArray[midElement]);

    node.left = buildTree(sortedArray.slice(0, midElement), start, end);
    node.right = buildTree(
        sortedArray.slice(midElement + 1, array.length),
        start,
        end
    );

    return node;
}

function sort(arr) {
    if (arr.length <= 1) return arr;

    const midIndex = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, midIndex);
    const secondHalf = arr.slice(midIndex);

    const sortedFirstHalf = sort(firstHalf);
    const sortedSecondHalf = sort(secondHalf);

    return mergeSort(sortedFirstHalf, sortedSecondHalf);
}

function mergeSort(arr1, arr2) {
    const sorted = [];

    while (arr1.length > 0 && arr2.length > 0) {
        const lesserValue = arr1[0] < arr2[0] ? arr1 : arr2;
        sorted.push(lesserValue.shift());
    }

    return sorted.concat(arr1).concat(arr2);
}

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

function getRandomArray(length, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
}

function execTree() {
    const tree = new BinaryTree();

    let arr = getRandomArray(10, 100);
    console.log("This is the array; " + arr);

    tree.root = buildTree(arr);
    console.log("And this is the tree;");
    prettyPrint(tree.root);

    console.log("Is tree balanced? " + tree.isBalanced());

    console.log("Tree in level order; ");
    tree.levelOrder((node) => console.log(node));

    console.log("Tree in preorder; ");
    tree.preorder((node) => console.log(node));

    console.log("Tree in postorder; ");
    tree.postorder((node) => console.log(node));

    console.log("Tree in order; ");
    tree.inorder((node) => console.log(node));

    tree.insert(101);
    tree.insert(141);
    tree.insert(127);
    tree.insert(154);
    tree.insert(199);
    tree.insert(1327);

    prettyPrint(tree.root);
    console.log("Is tree balanced? " + tree.isBalanced());
    tree.rebalance();
    console.log("Rebalanced tree; ");
    prettyPrint(tree.root);
    console.log("Is tree balanced? " + tree.isBalanced());
}
execTree();
