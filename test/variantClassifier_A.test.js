import variantClassifier from '../src/variantClassifier.js';

for (const exon of [14]) {
  test(`FLT3-ITD: FLT3 inframe_insertion exon ${exon} should match (FLT3-ITD)`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'inframe_insertion',
      exon: exon
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch('FLT3-ITD');
  });
}

for (const exon of [14]) {
  test(`FLT3-ITD: FLT3 non-inframe_insertion exon ${exon} should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'missense_variant',
      exon: exon,
      psyntax: `D100F`,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const exon of [13, 15]) {
  test(`FLT3-ITD: FLT3 inframe_insertion exon ${exon} should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'inframe_insertion',
      exon: exon,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const psyntax of ['D385', 'I836']) {
  test(`FLT3-TKD: FLT3 missense psyntax starting with ${psyntax} should match`, () => {
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

for (const psyntax of ['D100F']) {
  test(`FLT3-TKD: FLT3 missense not in list should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'missense',
      psyntax: psyntax,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}
for (const psyntax of ['D385']) {
  test(`FLT3-TKD: FLT3 non-missense psyntax starting with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotation: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const psyntax of ['R132']) {
  test(`IDH1: IDH1 missense psyntax starting with ${psyntax} should match`, () => {
    const variantData = {
      gene: 'IDH1',
      consequence: 'missense_variant',
      psyntax: psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/IDH1/);
  });
}

for (const psyntax of ['R132']) {
  test(`IDH1: IDH1 non-missense psyntax starting with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH1',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    console.log(res)
    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const psyntax of ['R140Q']) {
  test(`IDH2: IDH2 psyntax ${psyntax} should match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'missense_variant',
      psyntax: psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/psyntax/);
  });
}

for (const psyntax of ['R172']) {
  test(`IDH2: IDH2 missense psyntax starting with ${psyntax} should match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'missense_variant',
      psyntax: psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/psyntax/);
  });
}

for (const psyntax of ['R172']) {
  test(`IDH2: IDH2 non-missense psyntax starting with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(variantClassifier(variantData)).toBeFalsy();
  });
}
