import nodeFactory from "./node.mjs";
import treeFactory from "./tree.mjs";

let arr = [2, 6, 1, 8, 4, 3, 9];
let testTree = treeFactory(arr);

testTree.prettyPrint(); // passed
testTree.insert(12);
