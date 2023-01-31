// quite an interesting file name

export default function nodeFactory(val) {
  let leftChild = null;
  let rightChild = null;

  const getVal = () => {
    return this.Val();
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
    this.leftChild = child;
  };
  const setRightChild = (child) => {
    this.rightChild = child;
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
