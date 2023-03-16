MyeloSeq-HD™ variant classifier
===============================


Resources 
---------

https://pathologyservices.wustl.edu/items/myeloseq/

https://github.com/genome/cle-myeloseqhd


Requirements
------------

https://nodejs.org  
Node v18.x


Install
-------

    git clone 
    cd 
    npm i

Run tests under `test`

    # Quiet tests
    npm run test
    # Verbose tests: print results of each test and console output
    npm run test-verbose
    # Watch tests: as with test-verbose but interactive (--watch)
    npm run test-watch


Usage
-----

See example script `scripts/variantClassifierCli.js`

```js
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
```

Outputs

```
FLT3 exon 13
{
  class: 'A',
  match: true,
  evidence: 'FLT3 consequence: inframe_insertion exon: 13/24 (FLT3-ITD)'
}
FLT3 exon 16
No match
```


Method
------

The top-level classifier function `variantClassifier` is in 

    src/variantClassifier.js

This function calls each a sub-classifier for each class in turn. The first
match is returned as the result, or `false` if nothing matches. The input
to the classifier is an object of `variantData`. Extra fields are ok; fields
actually used are

    annotation
    consequence
    exon
    gene
    psyntax
    type

The sub-classifier for class `A` hard-codes the logic and is in 

    src/classA.js

The sub-classifier for class `B`

    src/classB.js

hard-codes a test for AML and MDS variants in the literature by
looking in the `annotation` for `AMLTCGA` or `MDS`, and next does tests
based on the configuration in

    config/classB_config.json

This JSON is structured as an object with gene symbols 
as keys:

```json
"GENE": {
  "TEST_TYPE": TEST_PARAMETERS,
  ["TEST_TYPE": TEST_PARAMETERS...]
}
```

For example,

```json
"CALR": {
  "indel_in_exons": [
    9
  ]
}
```

Translates as "test for an indel in exons 9", or 

```json
"CBL": {
  "missense_in_codon_ranges": [
    [
      366,
      420
    ]
  ]
}
```

"test for a variant that includes 'missense' in the consequence and is in any
codon number in the range 366-420 (inclusive)"

This is implemented in 

    src/classB.js

as an object of functions named the same as the `TEST_TYPE`, and taking the
`TEST_PARAMETERS` as argument.


Credits
-------

Brought to you with 🤎 by the 
[Molecular](https://pathologyservices.wustl.edu/items/myeloseq/)
[Oncology](https://pathologyservices.wustl.edu/services-tests/chromoseq/) group at [Washington University School of Medicine in St. Louis](https://medicine.wustl.edu/).