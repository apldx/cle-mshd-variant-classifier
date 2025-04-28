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
