// quite an interesting file name

export default function nodeFactory(value) {
  let leftChild,
    rightChild = null;

  const getValue = () => {
    return this.Value();
  };
  const setValue = (newVal) => {
    value = newVal;
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
    getValue,
    setValue,
    getLeftChild,
    getRightChild,
    setLeftChild,
    setRightChild,
  };
}
