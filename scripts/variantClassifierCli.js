import variantClassifier from '../src/variantClassifier.js';

let res = false;
const variantData = {
  gene: 'FLT3',
  consequence: 'inframe_insertion',
  exon: '13/24',
  annotation: ''
};

// FLT3 insertion with exon 13 is a FLT3-ITD, so the
// classifier returns an object with `class` 'A', 
// `match` set to `true`, and a string with
// evidence for the classification
console.log('FLT3 insertion exon 13')
res = variantClassifier(variantData);
if (res) {
  console.log(res);
} else {
  console.log('No match');
}

// FLT3 exon 16 is *not* a FLT3-ITD and doesn't 
// match anything else in the classifier, so the classifier
// returns false
console.log('FLT3 insertion exon 16')
variantData.exon = '16/24';
res = variantClassifier(variantData);
if (res) {
  console.log(res);
} else {
  console.log('No match');
}