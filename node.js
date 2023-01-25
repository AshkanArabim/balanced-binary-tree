// quite an interesting file name

export default function nodeFactory(data) {
  let leftChild, rightChild;
  const getData = () => {
    return this.data();
  };
  const setData = (newVal) => {
    this.data = newVal;
  };
  const getLeftChild = () => {
    return this.leftChild;
  };
  const getRightChild = () => {
    return this.rightChild;
  };
  const setLeftChild = (child) => {
    this.leftChild = child;
  };
  const setRightChild = (child) => {
    this.rightChild = child;
  };

  return {
    getData,
    setData,
    getLeftChild,
    getRightChild,
    setLeftChild,
    setRightChild,
  };
}
