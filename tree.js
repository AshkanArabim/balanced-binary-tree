import nodeFactory from "./node";

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
      let left = temp.getLeftChild();
      let right = temp.getRightChild();

      if (tempVal === val) {
      }
      // check if this is a leaf node
      if (left === null && right == null) {
        break;
      }
      if (val > tempVal) {
        temp = right;
      } else {
        temp = left;
      }
    }

    temp.setLeftChild(nodeFactory(val));
  };

  const remove = (val) => {
    // find the value node --> func
    const node = findNode(root, val);
    // find the node that is just bigger --> func
    // replace the node (just change the connectors)
  };

  // returns node with the same value as val
  const findNode = (initNode, val) => {
    if (initNode.getVal() === val) {
      return initNode;
    } else {
      if (val > initNode.getLeftChild().getVal()) {
        return findNode(initNode.getRightChild());
      } else {
        return findNode(initNode.getLeftChild());
      }
    }
  };

  const valExists = (val) => {
    // get ordered array
    const ordered = preorder(root);
    // look in ordered array, if found, return true;
    for (x of ordered) {
      if (val === x) return true;
    }
    return false;
  };

  const preorder = (node) => {
    let valArray = [];
    // add root value
    valArray.push(node.getVal());
    // add left child valArray
    if (node.getLeftChild()) {
      valArray.concat(preorder(node.getLeftChild()));
    }
    // add right child valArray
    if (node.getRightChild()) {
      valArray.concat(preorder(Node.getRightChild()));
    }
    return valArray;
  };

  const inorder = (node) => {
    let valArray = [];
    // add left child valArray
    if (node.getLeftChild()) {
      valArray.concat(preorder(node.getLeftChild()));
    }
    // add root value
    valArray.push(node.getVal());
    // add right child valArray
    if (node.getRightChild()) {
      valArray.concat(preorder(Node.getRightChild()));
    }
    return valArray;
  };

  const postOrder = (node) => {
    let valArray = [];
    valArray.push(node.getVal());
    // add left child valArray
    if (node.getLeftChild()) {
      valArray.concat(preorder(node.getLeftChild()));
    }
    // add right child valArray
    if (node.getRightChild()) {
      valArray.concat(preorder(Node.getRightChild()));
    }
    // add root value
    return valArray;
  };

  return {};
}
