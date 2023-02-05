import nodeFactory from "./node.mjs";
import treeFactory from "./tree.mjs";

let arr = [2, 6, 1, 8, 4, 3, 9];
let testTree = treeFactory(arr); // passed

testTree.insert(70)
testTree.insert(12)
testTree.insert(-22)
testTree.insert(7) // passed

console.log(testTree.findNode(7).getVal())

testTree.remove(7) // leaf node
// testTree.remove(70) // on child
// testTree.remove(8) // two children

testTree.prettyPrint(); //passed