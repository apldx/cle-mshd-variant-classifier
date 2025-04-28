import variantClassifier from '../src/variantClassifier.js';


test(`KIT (not in classB_config) with annotation including AMLTCGA should match`, () => {
  const variantData = {
    gene: 'KIT',
    annotation: 'xxxxAMLTCGA xxxx'
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B')
  expect(res.evidence).toMatch('AMLTCGA')
});

test(`KIT (not in classB_config) with annotation including MDS should match`, () => {
  const variantData = {
    gene: 'KIT',
    annotation: 'xxxxMDSxxxx'
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B')
  expect(res.evidence).toMatch('MDS')
});

test(`KIT (not in classB_config) without annotation should not match`, () => {
  const variantData = {
    gene: 'RAD1',
    annotation: ''
  };

  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`BRAF V600E should match`, () => {
  const variantData = {
    gene: 'BRAF',
    psyntax: 'V600E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  console.log(res);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  //expect(res.evidence).toMatch('psyntax');
});
