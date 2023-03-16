import variantClassifier from '../src/variantClassifier.js';

test(`RAD1 with annotation including AMLTCGA should match`, () => {
  const variantData = {
    gene: 'RAD1',
    annotation: 'xxxxAMLTCGA xxxx'
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B')
  expect(res.evidence).toMatch('AMLTCGA')
});

test(`RAD1 with annotation including MDS should match`, () => {
  const variantData = {
    gene: 'RAD1',
    annotation: 'xxxxMDSxxxx'
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B')
  expect(res.evidence).toMatch('MDS')
});

test(`RAD1 without annotation (not in classB_config) should not match`, () => {
  const variantData = {
    gene: 'RAD1',
    annotation: ''
  };

  expect(variantClassifier(variantData)).toBeFalsy();
});

const consequenceTestSet = {
  'ASXL1': ['stop_gained', 'frameshift'],
  'BCOR': ['stop_gained', 'frameshift', 'splice'],
  'DDX41': ['stop_gained', 'frameshift', 'splice'],
  'DNMT3A': ['stop_gained', 'frameshift', 'splice'],
  'ETV6': ['stop_gained', 'frameshift'],
  'EZH2': ['stop_gained', 'frameshift'],
  'GATA2': ['stop_gained', 'frameshift', 'splice'],
  'NF1': ['stop_gained', 'frameshift', 'splice'],
  'PHF6': ['stop_gained', 'frameshift', 'splice'],
  'PPM1D': ['stop_gained', 'frameshift'],
  'RUNX1': ['stop_gained', 'frameshift'],
  'STAG2': ['stop_gained', 'frameshift', 'splice'],
  'TET2': ['stop_gained', 'frameshift', 'splice'],
  'TP53': ['stop_gained', 'frameshift', 'splice'],
  'WT1': ['stop_gained', 'frameshift', 'splice'],
  'ZRSR2': ['stop_gained', 'frameshift'],
}

for (const gene of Object.keys(consequenceTestSet)) {
  for (const consequence of consequenceTestSet[gene]) {
    test(`${gene} consequence ${consequence} should match`, () => {
      const variantData = {
        gene: gene,
        consequence: `xxx${consequence}xxx`,
        annotation: ''
      };

      const res = variantClassifier(variantData);
      expect(res).toBeTruthy();
      expect(res.class).toBe('B');
      expect(res.evidence).toMatch(consequence);
    });
  }
}

test(`ASXL1 consequence other should not match`, () => {
  const variantData = {
    gene: 'ASXL1',
    consequence: 'xxx otherxxx',
    annotation: ''
  };

  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CALR indel in exon 9 should match`, () => {
  const variantData = {
    gene: 'CALR',
    type: 'INDEL',
    exon: 9,
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('exon 9');
});
