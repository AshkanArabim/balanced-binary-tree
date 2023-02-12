import nodeFactory from "./node.mjs";
import treeFactory from "./tree.mjs";

let arr = [2, 6, 1, 8, 4, 3, 9];
let testTree = treeFactory(arr); // passed

testTree.insert(70);
testTree.insert(12);
testTree.insert(-22);
testTree.insert(7); // passed

console.log(testTree.findNode(7).getVal());

console.log(testTree.printNodeList(testTree.order('in')));

// console.log(testTree.valExists(70)); // broken
// console.log(testTree.valExists(90));

// testTree.order('pre', (queue) => testTree.printNodeList);

// testTree.remove(7) // leaf node --> passed
// testTree.remove(70) // one child --> passed
// testTree.remove(8) // two children --> broken

testTree.prettyPrint(); //passed
