import nodeFactory from "./node.mjs";

export default function treeFactory(arr) {
  root = buildTree(arr);

  // takes array, creates balanced tree recursively
  const buildTree = (arr) => {
    if (arr.length === 1) {
      // return value to be assigned to parent
      return arr[0];
    } else {
      const len = arr.length;
      const mid = len / 2;
      const root = nodeFactory();

      // set root value to middle int
      root.setData(arr[mid]);

      // set left node
      root.setLeftChild(buildTree(arr[(0, mid)]));

      // set right node
      root.setRightChild(buildTree(arr[(mid + 1, len)]));

      // return root node
      return root;
    }
  };

  // visualize the tree
  // this function provided by the Odin Project
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
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

      if (tempVal === val) {
      }
      // check if this is a leaf node
      if (lc === null && rc == null) {
        break;
      }
      if (val > tempVal) {
        temp = rc;
      } else {
        temp = lc;
      }
    }

    temp.setLeftChild(nodeFactory(val));
  };

  const remove = (val) => {
    // check if value exists in tree
    if (!valExists) {
      console.log("value doesn't exist!!");
      return;
    }

    const parent = findNodeParent(root, val);
    const node = findNode(parent, val);
    const lc = node.getLeftChild();
    const rc = node.getRightChild();
    const nodeIsLeftChild = parent.getLeftChild().getVal() === val;

    // returns the only child of node --> used in case 3
    function heir() {
      if (lc.getVal() !== null) return lc;
      else return rc;
    }

    if (![lc, rc].includes(null)) {
      // case 1: two children

      const justBiggerVal = smallestDescendent(node.getRightChild()).getVal();
      node.setVal(justBiggerVal);
      remove(justBiggerVal);
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
  const findNodeParent = (initNode, val) => {
    // if either child matches the value
    const lc = initNode.getLeftChild();
    const rc = initNode.getRightChild();
    const lcVal = lc.getVal();
    const rcVal = rc.getVal();
    if ([lcVal, rcVal].includes(val)) {
      return initNode;
    } else {
      if (val > lcVal) {
        return findNode(rc);
      } else {
        return findNode(lc);
      }
    }
  };

  // returns node with the same value as val
  const findNode = (initNode, val) => {
    const lc = initNode.getLeftChild();
    const rc = initNode.getRightChild();
    if (initNode.getVal() === val) {
      return initNode;
    } else {
      if (val > lc.getVal()) {
        return findNode(rc, val);
      } else {
        return findNode(lc, val);
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
    const ordered = preOrder(root);
    // look in ordered array, if found, return true;
    for (x of ordered) {
      if (val === x) return true;
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
        // add children to queue
        queue.push(queue[i].getLeftChild());
        queue.push(queue[i].getRightChild());
      }
    } else {
      const lc = node.getLeftChild();
      const rc = node.getRightChild();
      function addLeftChild() {
        if (lc !== null) {
          queue.concat(order(type, lc));
        }
      }
      function addRightChild() {
        if (rc !== null) {
          queue.concat(order(type, rc));
        }
      }

      switch (type) {
        case "pre": {
          addSelf();
          addLeftChild();
          addRightChild();
        }
        case "in": {
          addLeftChild();
          addSelf();
          addRightChild;
        }
        case "post": {
          addLeftChild();
          addRightChild();
          addSelf();
        }
      }
    }

    if (callback !== undefined) {
      callback(...queue);
    }
  };

  // returns the longest chain of nodes from current node until a leaf node
  const height = (node = root) => {
    if (node === null) {
      return 0;
    } else {
      return Math.max(height(node.getLeftChild()) + 1, height(node.getRightChild() + 1));
    }
  };

  // returns the length of the chain from root node to current node
  const depth = (targetNode, currentNode = root, count = 0) => {
    const tnVal = targetNode.getVAl();
    const cnVal = currentNode.getVal();

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

  const isBalanced = (node) => {
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

  const rebalance = () => {
    levelOrder(buildTree);
  };

  return {
    buildTree,
    prettyPrint,
    insert,
    remove,
    findNode,
    order,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
