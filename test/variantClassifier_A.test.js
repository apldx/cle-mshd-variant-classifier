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
      psyntax: 'D100F',
      annotations: ''
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
      annotations: ''
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
  test('FLT3-TKD: FLT3 missense not in list should not match', () => {
    const variantData = {
      gene: 'FLT3',
      consequence: 'missense',
      psyntax: psyntax,
      annotations: ''
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
      annotations: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const aa of ['C', 'G', 'H', 'L', 'S']) {
  const psyntax = `R132${aa}`;
  test(`IDH1: IDH1 missense with ${psyntax} should match`, () => {
    const variantData = {
      gene: 'IDH1',
      consequence: 'missense_variant',
      psyntax: `${psyntax}`,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/IDH1/);
  });
}

for (const aa of ['W', 'N', 'P']) {
  const psyntax = `R132${aa}`;
  test(`IDH1: IDH1 missense with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH1',
      consequence: 'missense_variant',
      psyntax: `${psyntax}`,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeFalsy();
  });
}

for (const psyntax of ['R132C']) {
  test(`IDH1: IDH1 non-missense psyntax ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH1',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeFalsy();
  });
}

for (const aa of ['G', 'L', 'Q', 'W']) {
  const psyntax = `R140${aa}`;
  test(`IDH2: IDH2 missense with ${psyntax} should match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'missense_variant',
      psyntax: psyntax,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/psyntax/);
  });
}

for (const aa of ['N', 'P', 'S']) {
  const psyntax = `R140${aa}`;
  test(`IDH2: IDH2 missense with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'missense_variant',
      psyntax: `${psyntax}`,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeFalsy();
  });
}

for (const psyntax of ['R140G']) {
  test(`IDH2: IDH2 non-missense with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotations: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}

for (const aa of ['G', 'K', 'M', 'S', 'W']) {
  const psyntax = `R172${aa}`;
  test(`IDH2: IDH2 missense with ${psyntax} should match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'missense_variant',
      psyntax: psyntax,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('A');
    expect(res.evidence).toMatch(/psyntax/);
  });
}

for (const aa of ['L', 'N', 'P']) {
  const psyntax = `R172${aa}`;
  test(`IDH2: IDH2 missense with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'missense_variant',
      psyntax: psyntax,
      annotations: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeFalsy();
  });
}

for (const psyntax of ['R172G']) {
  test(`IDH2: IDH2 non-missense with ${psyntax} should not match`, () => {
    const variantData = {
      gene: 'IDH2',
      consequence: 'synonymous_variant',
      psyntax: psyntax,
      annotations: ''
    };

    expect(variantClassifier(variantData)).toBeFalsy();
  });
}
