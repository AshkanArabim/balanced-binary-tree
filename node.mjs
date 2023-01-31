// quite an interesting file name

export default function nodeFactory(val) {
  let leftChild = null;
  let rightChild = null;

  const getVal = () => {
    return val;
  };
  const setVal = (newVal) => {
    val = newVal;
  };
  const getLeftChild = () => {
    return leftChild;
  };
  const getRightChild = () => {
    return rightChild;
  };
  const setLeftChild = (child) => {
    leftChild = child;
  };
  const setRightChild = (child) => {
    rightChild = child;
  };

  return {
    getVal,
    setVal,
    getLeftChild,
    getRightChild,
    setLeftChild,
    setRightChild,
  };
}
