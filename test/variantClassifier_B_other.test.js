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
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`BRAF V600Q should not match`, () => {
  const variantData = {
    gene: 'BRAF',
    psyntax: 'V600Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CALR frameshift in codon 352 should not match`, () => {
  const variantData = {
    gene: 'CALR',
    consequence: 'frameshift',
    psyntax: 'V352E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CALR frameshift in codon 353 should match`, () => {
  const variantData = {
    gene: 'CALR',
    consequence: 'frameshift',
    psyntax: 'V353E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('frameshift_after_codon');
});

test(`CALR non-frameshift in codon 353 should not match`, () => {
  const variantData = {
    gene: 'CALR',
    consequence: 'missense',
    psyntax: 'V353E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CBL missense in codon 365 should not match`, () => {
  const variantData = {
    gene: 'CBL',
    consequence: 'missense',
    psyntax: 'V365E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CBL missense in codon 366 should match`, () => {
  const variantData = {
    gene: 'CBL',
    consequence: 'missense',
    psyntax: 'V366E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`CBL missense in codon 400 should match`, () => {
  const variantData = {
    gene: 'CBL',
    consequence: 'missense',
    psyntax: 'V400E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`CBL missense in codon 420 should match`, () => {
  const variantData = {
    gene: 'CBL',
    consequence: 'missense',
    psyntax: 'V420E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`CBL missense in codon 421 should not match`, () => {
  const variantData = {
    gene: 'CBL',
    consequence: 'missense',
    psyntax: 'V421',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});


test(`CBL non-missense in codon 366 should not match`, () => {
  const variantData = {
    gene: 'CBL',
    consequence: 'synonymous',
    psyntax: 'V366E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CSF3R T618I should match`, () => {
  const variantData = {
    gene: 'CSF3R',
    psyntax: 'T618I',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`CSF3R T618Q should not match`, () => {
  const variantData = {
    gene: 'CSF3R',
    psyntax: 'T618Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const DNMT3A_missense_psyntaxes =
  ['G543', 'R635', 'A741', 'R736', 'H739', 'S770',
    'M880', 'R882', 'W893', 'P904', 'A910']

for (const DNMT3A_missense_psyntax of DNMT3A_missense_psyntaxes) {
  test(`DNMT3A missense in ${DNMT3A_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'DNMT3A',
      consequence: 'missense',
      psyntax: DNMT3A_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`DNMT3A non-missense in A910 should not match`, () => {
  const variantData = {
    gene: 'DNMT3A',
    consequence: 'synonymous',
    psyntax: 'A910',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`DNMT3A missense in A911 should not match`, () => {
  const variantData = {
    gene: 'DNMT3A',
    consequence: 'missense',
    psyntax: 'A911',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`ETNK1 H243Y should match`, () => {
  const variantData = {
    gene: 'ETNK1',
    psyntax: 'H243Y',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`ETNK1 H243Q should not match`, () => {
  const variantData = {
    gene: 'ETNK1',
    psyntax: 'H243Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});


test(`ETNK1 N244S should match`, () => {
  const variantData = {
    gene: 'ETNK1',
    psyntax: 'N244S',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`ETNK1 N244Q should not match`, () => {
  const variantData = {
    gene: 'ETNK1',
    psyntax: 'N244Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});


