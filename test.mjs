import nodeFactory from "./node.mjs";
import treeFactory from "./tree.mjs";

function randomIntArray(length = 100, upperBound = 100) {
  // random number from 0 to 99
  let randomLength = Math.floor(Math.random() * length);
  let intArr = [];

  for (let i = 0; i < randomLength; i++) {
    // random number from 0 to 99
    let randomInt = Math.floor(Math.random() * upperBound);
    intArr[i] = randomInt;
  }

  return intArr;
}

function balanceIfNot(treeRoot) {
  if (!treeRoot.isBalanced()) {
    console.log("Not balanced!! Balancing...");
    treeRoot.rebalance();
  } else {
    console.log("tree is balanced.");
  }
}

function unbalance(treeRoot) {
  // generate the list
  let arrToAdd = randomIntArray(300, 500);

  // start appending
  for (let x of arrToAdd) {
    treeRoot.insert(x);
  }
}

// start of tests

let arr = randomIntArray();
console.log(arr);

let testTree = treeFactory(arr);

balanceIfNot(testTree);

console.log("Pre order: " + testTree.createValueList(testTree.order("pre"))); //passed
console.log("In order: " + testTree.createValueList(testTree.order("in"))); // passed
console.log("Post order: " + testTree.createValueList(testTree.order("post"))); // passed
console.log("Level order: " + testTree.createValueList(testTree.order("level"))); // passed

balanceIfNot(testTree);

testTree.prettyPrint(); //passed

unbalance(testTree);

testTree.prettyPrint();

balanceIfNot(testTree);

testTree.prettyPrint(); //passed
