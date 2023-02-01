import nodeFactory from "./node.mjs";
import treeFactory from "./tree.mjs";

let arr = [2, 6, 1, 8, 4, 3, 9];
let testTree = treeFactory(arr); // passed

testTree.insert(70)
testTree.insert(12)
testTree.insert(-22)
testTree.insert(7) // passed
testTree.prettyPrint(); //passed