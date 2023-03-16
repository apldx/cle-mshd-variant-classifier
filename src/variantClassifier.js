import classA from './classA.js';
import classB from './classB.js';

const variantClassifier = (variantData) => {
  let res = classA(variantData);
  if (res.match) return res;

  res = classB(variantData);
  if (res.match) return res;

  return false;
};

export default variantClassifier;