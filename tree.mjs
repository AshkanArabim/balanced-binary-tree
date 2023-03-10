import nodeFactory from "./node.mjs";

export default function treeFactory(initialArray) {
  // removes all duplicates
  // sorts the array
  const validateArray = (arr) => {
    arr.sort((a, b) => {
      return a - b;
    });
    arr = removeDuplicates(arr);

    return arr;
  };

  const removeDuplicates = (sortedArr) => {
    let seenElements = [];

    for (let x of sortedArr) {
      if (!seenElements.includes(x)) {
        seenElements.push(x);
      }
    }

    return seenElements;
  };

  // takes array, creates balanced tree recursively
  const buildTree = (valueList) => {
    const len = valueList.length;
    if (valueList.length === 0) {
      return null;
    } else if (valueList.length === 1) {
      // return value to be assigned to parent
      return nodeFactory(valueList[0]);
    } else {
      const mid = Math.floor(len / 2);
      const localRoot = nodeFactory();

      // set localRoot value to middle int
      localRoot.setVal(valueList[mid]);

      // set left node
      localRoot.setLeftChild(buildTree(valueList.slice(0, mid)));

      // set right node
      localRoot.setRightChild(buildTree(valueList.slice(mid + 1, len)));

      // return localRoot node
      return localRoot;
    }
  };

  // visualize the tree
  // this function provided by the Odin Project
  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node.getRightChild() !== null) {
      prettyPrint(node.getRightChild(), `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getVal()}`);
    if (node.getLeftChild() !== null) {
      prettyPrint(node.getLeftChild(), `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  //insert
  const insert = (val) => {
    // if value already in tree, return
    if (valExists(val)) return;

    // traverse until you reach the correct leaf node
    let temp = root;
    while (true) {
      let tempVal = temp.getVal();
      let lc = temp.getLeftChild();
      let rc = temp.getRightChild();
      let valIsBigger = val > tempVal;
      let next = valIsBigger ? rc : lc;

      if (next === null) {
        let newNode = nodeFactory(val);
        if (valIsBigger) {
          temp.setRightChild(newNode);
        } else {
          temp.setLeftChild(newNode);
        }
        break;
      } else {
        temp = next;
      }
    }
  };

  const remove = (val) => {
    // check if value exists in tree
    if (!valExists) {
      console.log("value doesn't exist!!");
      return;
    }

    const parent = findNodeParent(val);
    const node = findNode(val, parent);
    const lc = node.getLeftChild();
    const rc = node.getRightChild();

    // check if node is left or right child
    const nodeIsLeftChild = false;
    const plc = parent.getLeftChild();
    if (plc !== null) {
      if (plc.getVal() === val) {
        nodeIsLeftChild = true;
      }
    }

    // returns the only child of node --> used in case 3
    function heir() {
      if (lc !== null) return lc;
      else return rc;
    }

    if (![lc, rc].includes(null)) {
      // case 1: two children

      const justBiggerVal = smallestDescendent(node.getRightChild()).getVal();
      remove(justBiggerVal);
      node.setVal(justBiggerVal);
    } else if (lc == null && rc == null) {
      // case 2: no children
      // if node is left child, remove paren't left child. if not, remove parent's right child

      if (nodeIsLeftChild) {
        parent.setLeftChild(null);
      } else {
        parent.setRightChild(null);
      }
    } else {
      // case 3 one child only

      if (nodeIsLeftChild) {
        parent.setLeftChild(heir());
      } else {
        parent.setRightChild(heir());
      }
    }
  };

  // return the parent of node with given value
  const findNodeParent = (val, initNode = root) => {
    // if either child matches the value
    const lc = initNode.getLeftChild();
    const rc = initNode.getRightChild();

    // check if each child exists before seeinf if the value matches
    // left
    let lcMatch = false;
    if (lc !== null) {
      if (lc.getVal() === val) {
        lcMatch = true;
      }
    }

    //right
    let rcMatch = false;
    if (rc !== null) {
      if (rc.getVal() === val) {
        rcMatch = true;
      }
    }

    if (lcMatch || rcMatch) {
      return initNode;
    } else {
      if (val > initNode.getVal()) {
        return findNodeParent(val, rc);
      } else {
        return findNodeParent(val, lc);
      }
    }
  };

  // returns node with the same value as val
  const findNode = (val, initNode = root) => {
    const lc = initNode.getLeftChild();
    const rc = initNode.getRightChild();
    if (initNode === null || initNode.getVal() === val) {
      // return node if value matches
      // or if it's null, meaning that no match was found
      return initNode;
    } else {
      // recursive call into next level if no match
      if (val > initNode.getVal()) {
        return findNode(val, rc);
      } else {
        return findNode(val, lc);
      }
    }
  };

  const smallestDescendent = (initNode) => {
    if (initNode.getLeftChild() === null) {
      return initNode;
    } else {
      return initNode.getLeftChild();
    }
  };

  const valExists = (val) => {
    // get ordered array
    const ordered = order("pre");

    // look in ordered array, if found, return true;
    for (let node of ordered) {
      if (val === node.getVal()) return true;
    }
    return false;
  };

  const order = (type, node = root, callback = undefined) => {
    // some utils
    let queue = [];
    function addSelf() {
      queue.push(node);
    }

    if (type === "level") {
      addSelf();
      for (let i = 0; i < queue.length; i++) {
        const lc = queue[i].getLeftChild();
        const rc = queue[i].getRightChild();

        // add children to queue only if they are not null
        if (lc !== null) queue.push(lc);
        if (rc !== null) queue.push(rc);
      }
    } else {
      const lc = node.getLeftChild();
      const rc = node.getRightChild();
      function addLeftChild() {
        if (lc !== null) {
          queue = queue.concat(order(type, lc));
        }
      }
      function addRightChild() {
        if (rc !== null) {
          queue = queue.concat(order(type, rc));
        }
      }

      switch (type) {
        case "pre":
          {
            addSelf();
            addLeftChild();
            addRightChild();
          }
          break;
        case "in":
          {
            addLeftChild();
            addSelf();
            addRightChild();
          }
          break;
        case "post": {
          addLeftChild();
          addRightChild();
          addSelf();
        }
      }
    }

    if (callback === undefined) {
      return queue;
    } else {
      // convert the nodelist into a value list --> easier to work with in callbacks
      queue = createValueList(queue);
      // pass the queue through callback before returning it
      return callback(validateArray(queue));
    }
  };

  // returns the longest chain of nodes from current node until a leaf node
  const height = (node = root) => {
    if (node === null) {
      return 0;
    } else {
      return Math.max(height(node.getLeftChild()) + 1, height(node.getRightChild()) + 1);
    }
  };

  // returns the length of the chain from root node to current node
  const depth = (targetNode, currentNode = root, count = 0) => {
    const tnVal = targetNode.getVal(); // target node value
    const cnVal = currentNode.getVal(); // current node value

    // increment count with each call
    count++;

    // if node fount, return the count.
    if (tnVal === cnVal) {
      return count;
    } else {
      // decide whether to go to the left child or right child
      const next = tnVal < cnVal ? currentNode.getLeftChild() : currentNode.getRightChild();
      return depth(targetNode, next, count);
    }
  };

  const isBalanced = (node = root) => {
    // base case:
    // if end of line, return true
    if (node === null) {
      return true;
    }

    // recursive case
    const lc = node.getLeftChild();
    const rc = node.getRightChild();

    // if either child is not balanced, return false
    if (!(isBalanced(lc) && isBalanced(rc))) {
      return false;
    }

    // if the hight difference is more than one, return false
    if (Math.abs(height(lc) - height(rc)) > 1) {
      return false;
    }

    return true;
  };

  const createValueList = (nodeList) => {
    let valList = [];

    for (let nodeIndex in nodeList) {
      valList[nodeIndex] = nodeList[nodeIndex].getVal();
    }

    return valList;
  };

  const rebalance = () => {
    root = order("level", undefined, buildTree);
  };

  let root = buildTree(validateArray(initialArray));

  return {
    prettyPrint,
    insert,
    remove,
    findNode,
    order,
    height,
    depth,
    isBalanced,
    rebalance,
    createValueList,
  };
}
