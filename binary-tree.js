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

const tree = new BinaryTree();
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log("this is the array ->" + arr);
tree.root = buildTree(arr);
console.log("hopefully this is the tree");
prettyPrint(tree.root);
