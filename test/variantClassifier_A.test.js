import variantClassifier from '../src/variantClassifier.js';

for (const exon of [13, 14, 15]) {
  test(`FLT3-ITD: FLT3 insertion exon ${exon} should match (FLT3-ITD)`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'inframe_insertion',
      exon: `${exon}/24`
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch('FLT3-ITD');
  });
}

for (const exon of [13]) {
  test(`FLT3-ITD: FLT3 non-insertion should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'missense_variant',
      exon: `${exon}`,
      psyntax: `p.D100F`,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const exon of [16]) {
  test(`FLT3-ITD: FLT3 insertion exon ${exon} should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'inframe_insertion',
      exon: `${exon}/24`,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const psyntax of ['p.D385']) {
  test(`FLT3-TKD: FLT3 missense including psyntax ${psyntax} should match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'missense_variant',
      psyntax: psyntax
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/FLT3-TKD/);
  });
}

for (const psyntax of ['p.D385']) {
  test(`FLT3-TKD: FLT3 non-missense should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}