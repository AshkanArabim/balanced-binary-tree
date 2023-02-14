import nodeFactory from "./node.mjs";
import treeFactory from "./tree.mjs";

let arr = [2, 6, 1, 8, 4, 3, 9];
let testTree = treeFactory(arr); // passed

testTree.insert(70);
testTree.insert(12);
testTree.insert(-22);
testTree.insert(7); // passed

console.log(testTree.findNode(7).getVal());

console.log(testTree.printNodeList(testTree.order("pre"))); //passed
console.log(testTree.printNodeList(testTree.order("in"))); // passed
console.log(testTree.printNodeList(testTree.order("post"))); // passed
console.log(testTree.printNodeList(testTree.order("level"))); // passed

testTree.rebalance();

// testTree.remove(7); // leaf node --> passed
// testTree.remove(70); // one child --> passed
// testTree.remove(8); // two children --> passed

console.log(testTree.isBalanced());

testTree.prettyPrint(); //passed
