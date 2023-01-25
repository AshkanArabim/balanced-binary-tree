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
  // this function provided by the odin project
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
  const insert = () => {};

  return {};
}
