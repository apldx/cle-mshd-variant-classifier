import variantClassifier from '../src/variantClassifier.js';

const consequenceTestSet = {
  ASXL1: ['stop_gained', 'frameshift', 'splice'],
  BCOR: ['stop_gained', 'frameshift', 'splice'],
  BCORL1: ['stop_gained', 'frameshift', 'splice'],
  CEBPA: ['stop_gained', 'frameshift'],
  CUX1: ['stop_gained', 'frameshift', 'splice'],
  DDX41: ['stop_gained', 'frameshift', 'splice'],
  DNMT3A: ['stop_gained', 'frameshift', 'splice'],
  ETV6: ['stop_gained', 'frameshift', 'splice'],
  EZH2: ['stop_gained', 'frameshift', 'splice'],
  GATA2: ['stop_gained', 'frameshift', 'splice'],
  NF1: ['stop_gained', 'frameshift', 'splice'],
  PHF6: ['stop_gained', 'frameshift', 'splice'],
  PPM1D: ['stop_gained', 'frameshift', 'splice'],
  RAD21: ['stop_gained', 'frameshift', 'splice'],
  RUNX1: ['stop_gained', 'frameshift', 'splice'],
  STAG2: ['stop_gained', 'frameshift', 'splice'],
  TET2: ['stop_gained', 'frameshift', 'splice'],
  TP53: ['stop_gained', 'frameshift', 'splice'],
  WT1: ['stop_gained', 'frameshift', 'splice'],
  ZRSR2: ['stop_gained', 'frameshift', 'splice']
};

for (const gene of Object.keys(consequenceTestSet)) {
  for (const consequence of consequenceTestSet[gene]) {
    test(`${gene} consequence ${consequence} should match`, () => {
      const variantData = {
        gene: gene,
        psyntax: '',
        consequence: `xxx${consequence}xxx`,
        annotations: ''
      };

      const res = variantClassifier(variantData);
      expect(res).toBeTruthy();
      expect(res.class).toBe('B');
      expect(res.evidence).toMatch(consequence);
    });
  }
}

test('ASXL1 consequence other should not match', () => {
  const variantData = {
    gene: 'ASXL1',
    consequence: 'xxx otherxxx',
    annotations: ''
  };

  expect(variantClassifier(variantData)).toBeFalsy();
});

test('CEBPA consequence splice should not match', () => {
  const variantData = {
    gene: 'CEBPA',
    psyntax: '',
    consequence: 'xxx splicexxx',
    annotations: ''
  };

  expect(variantClassifier(variantData)).toBeFalsy();
});
