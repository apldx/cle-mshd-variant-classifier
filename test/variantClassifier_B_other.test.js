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


test(`CBL synonymous in codon 366 should not match`, () => {
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
    consequence: 'missense',
    psyntax: 'T618Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`CSF3R stop_gained in exon 16 should match`, () => {
  const variantData = {
    gene: 'CSF3R',
    consequence: 'stop_gained',
    exon: 16,
    psyntax: 'T618Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('nonsense_in_exons');
});

test(`CSF3R stop_gained in exon 17 should not match`, () => {
  const variantData = {
    gene: 'CSF3R',
    consequence: 'stop_gained',
    exon: 17,
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

test(`DNMT3A synonymous in A910 should not match`, () => {
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

test(`EZH2 N693K should match`, () => {
  const variantData = {
    gene: 'EZH2',
    psyntax: 'N693K',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`EZH2 N693Q should not match`, () => {
  const variantData = {
    gene: 'EZH2',
    consequence: 'missense',
    psyntax: 'N693Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const EZH2_missense_psyntaxes = ['Y646', 'Y741']

for (const EZH2_missense_psyntax of EZH2_missense_psyntaxes) {
  test(`EZH2 missense in ${EZH2_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'EZH2',
      consequence: 'missense',
      psyntax: EZH2_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`EZH2 synonymous in Y646 should not match`, () => {
  const variantData = {
    gene: 'EZH2',
    consequence: 'synonymous',
    psyntax: 'Y646',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`EZH2 missense in Y647 should not match`, () => {
  const variantData = {
    gene: 'EZH2',
    consequence: 'missense',
    psyntax: 'Y647',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`GATA2 missense in codon 348 should not match`, () => {
  const variantData = {
    gene: 'GATA2',
    consequence: 'missense',
    psyntax: 'V348E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`GATA2 missense in codon 349 should match`, () => {
  const variantData = {
    gene: 'GATA2',
    consequence: 'missense',
    psyntax: 'V349E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`GATA2 missense in codon 380 should match`, () => {
  const variantData = {
    gene: 'GATA2',
    consequence: 'missense',
    psyntax: 'V380E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`GATA2 missense in codon 398 should match`, () => {
  const variantData = {
    gene: 'GATA2',
    consequence: 'missense',
    psyntax: 'V398E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`GATA2 missense in codon 399 should not match`, () => {
  const variantData = {
    gene: 'GATA2',
    consequence: 'missense',
    psyntax: 'V399E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});


test(`GATA2 synonymous in codon 349 should not match`, () => {
  const variantData = {
    gene: 'GATA2',
    consequence: 'synonymous',
    psyntax: 'V349E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const GNB1_missense_psyntaxes = ['K57', 'I80']

for (const GNB1_missense_psyntax of GNB1_missense_psyntaxes) {
  test(`GNB1 missense in ${GNB1_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'GNB1',
      consequence: 'missense',
      psyntax: GNB1_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`GNB1 synonymous in K57 should not match`, () => {
  const variantData = {
    gene: 'GNB1',
    consequence: 'synonymous',
    psyntax: 'K57',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`GNB1 missense in K58 should not match`, () => {
  const variantData = {
    gene: 'GNB1',
    consequence: 'missense',
    psyntax: 'K58',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const KRAS_missense_psyntaxes = ['G12', 'G13', 'Q61']

for (const KRAS_missense_psyntax of KRAS_missense_psyntaxes) {
  test(`KRAS missense in ${KRAS_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'KRAS',
      consequence: 'missense',
      psyntax: KRAS_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`KRAS synonymous in G12 should not match`, () => {
  const variantData = {
    gene: 'KRAS',
    consequence: 'synonymous',
    psyntax: 'G12',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`KRAS missense in G14 should not match`, () => {
  const variantData = {
    gene: 'KRAS',
    consequence: 'missense',
    psyntax: 'G14',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`MPL W515L should match`, () => {
  const variantData = {
    gene: 'MPL',
    psyntax: 'W515L',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`MPL W515Q should not match`, () => {
  const variantData = {
    gene: 'MPL',
    psyntax: 'W515Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});


test(`MPL W515K should match`, () => {
  const variantData = {
    gene: 'MPL',
    psyntax: 'W515K',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`MPL W515Q should not match`, () => {
  const variantData = {
    gene: 'MPL',
    psyntax: 'W515Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const NRAS_missense_psyntaxes = ['G12', 'G13', 'Q61']

for (const NRAS_missense_psyntax of NRAS_missense_psyntaxes) {
  test(`NRAS missense in ${NRAS_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'NRAS',
      consequence: 'missense',
      psyntax: NRAS_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`NRAS synonymous in G12 should not match`, () => {
  const variantData = {
    gene: 'NRAS',
    consequence: 'synonymous',
    psyntax: 'G12',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`NRAS missense in G14 should not match`, () => {
  const variantData = {
    gene: 'NRAS',
    consequence: 'missense',
    psyntax: 'G14',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`NPM1 W288fs*12 should match`, () => {
  const variantData = {
    gene: 'NPM1',
    psyntax: 'W288fs*12',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`NPM1 W288Q should not match`, () => {
  const variantData = {
    gene: 'NPM1',
    psyntax: 'W288Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const PRPF8_missense_psyntaxes = ['C1594', 'D1598']

for (const PRPF8_missense_psyntax of PRPF8_missense_psyntaxes) {
  test(`PRPF8 missense in ${PRPF8_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'PRPF8',
      consequence: 'missense',
      psyntax: PRPF8_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`PRPF8 synonymous in C1594 should not match`, () => {
  const variantData = {
    gene: 'PRPF8',
    consequence: 'synonymous',
    psyntax: 'C1594',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`PRPF8 missense in C1595 should not match`, () => {
  const variantData = {
    gene: 'PRPF8',
    consequence: 'missense',
    psyntax: 'C1595',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`PTPN11 missense in codon 60 should not match`, () => {
  const variantData = {
    gene: 'PTPN11',
    consequence: 'missense',
    psyntax: 'V60E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`PTPN11 missense in codon 61 should match`, () => {
  const variantData = {
    gene: 'PTPN11',
    consequence: 'missense',
    psyntax: 'V61E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`PTPN11 missense in codon 70 should match`, () => {
  const variantData = {
    gene: 'PTPN11',
    consequence: 'missense',
    psyntax: 'V70E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`PTPN11 missense in codon 76 should match`, () => {
  const variantData = {
    gene: 'PTPN11',
    consequence: 'missense',
    psyntax: 'V76E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`PTPN11 missense in codon 77 should not match`, () => {
  const variantData = {
    gene: 'PTPN11',
    consequence: 'missense',
    psyntax: 'V77E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});


test(`PTPN11 synonymous in codon 76 should not match`, () => {
  const variantData = {
    gene: 'PTPN11',
    consequence: 'synonymous',
    psyntax: 'V76E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 V617F should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V617F',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`JAK2 V617Q should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V617Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 missense in codon 504 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V504E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 inframe_insertion in codon 504 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_insertion',
    psyntax: 'V504E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 inframe_deletion in codon 504 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_deletion',
    psyntax: 'V504E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 missense in codon 505 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V505E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`JAK2 missense in codon 520 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V520E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`JAK2 missense in codon 547 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V547E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`JAK2 missense in codon 548 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'missense',
    psyntax: 'V548E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 inframe_insertion in codon 505 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_insertion',
    psyntax: 'V505E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_indel_in_codon_ranges');
});

test(`JAK2 inframe_insertion in codon 520 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_insertion',
    psyntax: 'V520E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_indel_in_codon_ranges');
});

test(`JAK2 inframe_insertion in codon 547 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_insertion',
    psyntax: 'V547E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_indel_in_codon_ranges');
});

test(`JAK2 inframe_insertion in codon 548 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_insertion',
    psyntax: 'V548E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 inframe_deletion in codon 505 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_deletion',
    psyntax: 'V505E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_indel_in_codon_ranges');
});

test(`JAK2 inframe_deletion in codon 520 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_deletion',
    psyntax: 'V520E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_indel_in_codon_ranges');
});

test(`JAK2 inframe_deletion in codon 547 should match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_deletion',
    psyntax: 'V547E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_indel_in_codon_ranges');
});

test(`JAK2 inframe_deletion in codon 548 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'inframe_deletion',
    psyntax: 'V548E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`JAK2 synonymous in codon 547 should not match`, () => {
  const variantData = {
    gene: 'JAK2',
    consequence: 'synonymous',
    psyntax: 'V547',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const RUNX1_missense_psyntaxes = ['R166', 'D198']

for (const RUNX1_missense_psyntax of RUNX1_missense_psyntaxes) {
  test(`RUNX1 missense in ${RUNX1_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'RUNX1',
      consequence: 'missense',
      psyntax: RUNX1_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`RUNX1 synonymous in R166 should not match`, () => {
  const variantData = {
    gene: 'RUNX1',
    consequence: 'synonymous',
    psyntax: 'R166',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`RUNX1 missense in R167 should not match`, () => {
  const variantData = {
    gene: 'RUNX1',
    consequence: 'missense',
    psyntax: 'R167',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`SF3B1 K700E should match`, () => {
  const variantData = {
    gene: 'SF3B1',
    consequence: 'missense',
    psyntax: 'K700E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('psyntax');
});

test(`SF3B1 K700Q should not match`, () => {
  const variantData = {
    gene: 'SF3B1',
    consequence: 'missense',
    psyntax: 'K700Q',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const SF3B1_missense_psyntaxes = ['E622', 'Y623', 'R625', 'N626', 'H662',
  'T663', 'K666', 'I704', 'G740', 'G742', 'D781'];

for (const SF3B1_missense_psyntax of SF3B1_missense_psyntaxes) {
  test(`SF3B1 missense in ${SF3B1_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'SF3B1',
      consequence: 'missense',
      psyntax: SF3B1_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`SF3B1 synonymous in E622 should not match`, () => {
  const variantData = {
    gene: 'SF3B1',
    consequence: 'synonymous',
    psyntax: 'E622',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`SF3B1 missense in D782 should not match`, () => {
  const variantData = {
    gene: 'SF3B1',
    consequence: 'missense',
    psyntax: 'D782',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const SETBP1_missense_psyntaxes = ['E858', 'T864', 'I865', 'D868', 'S869', 'G870'];

for (const SETBP1_missense_psyntax of SETBP1_missense_psyntaxes) {
  test(`SETBP1 missense in ${SETBP1_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'SETBP1',
      consequence: 'missense',
      psyntax: SETBP1_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`SETBP1 synonymous in E858 should not match`, () => {
  const variantData = {
    gene: 'SETBP1',
    consequence: 'synonymous',
    psyntax: 'E858',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`SETBP1 missense in G871 should not match`, () => {
  const variantData = {
    gene: 'SETBP1',
    consequence: 'missense',
    psyntax: 'G871',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const SRSF2_missense_psyntaxes = ['P95'];

for (const SRSF2_missense_psyntax of SRSF2_missense_psyntaxes) {
  test(`SRSF2 missense in ${SRSF2_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'SRSF2',
      consequence: 'missense',
      psyntax: SRSF2_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`SRSF2 synonymous in P95 should not match`, () => {
  const variantData = {
    gene: 'SRSF2',
    consequence: 'synonymous',
    psyntax: 'P95',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`SRSF2 missense in P96 should not match`, () => {
  const variantData = {
    gene: 'SRSF2',
    consequence: 'missense',
    psyntax: 'P96',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const SRSF2_deletion_psyntaxes = ['P95'];

for (const SRSF2_deletion_psyntax of SRSF2_deletion_psyntaxes) {
  test(`SRSF2 inframe_deletion in ${SRSF2_deletion_psyntax} should match`, () => {
    const variantData = {
      gene: 'SRSF2',
      consequence: 'inframe_deletion',
      psyntax: SRSF2_deletion_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('inframe_deletion_in_codons');
  });
}

test(`SRSF2 inframe_insertion in P95 should not match`, () => {
  const variantData = {
    gene: 'SRSF2',
    consequence: 'inframe_insertion',
    psyntax: 'P95',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`SRSF2 inframe_deletion in P96 should not match`, () => {
  const variantData = {
    gene: 'SRSF2',
    consequence: 'inframe_deletion',
    psyntax: 'P96',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`STAT3 missense in codon 583 should not match`, () => {
  const variantData = {
    gene: 'STAT3',
    consequence: 'missense',
    psyntax: 'V583',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`STAT3 missense in codon 584 should match`, () => {
  const variantData = {
    gene: 'STAT3',
    consequence: 'missense',
    psyntax: 'V584E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`STAT3 missense in codon 600 should match`, () => {
  const variantData = {
    gene: 'STAT3',
    consequence: 'missense',
    psyntax: 'V600E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`STAT3 missense in codon 674 should match`, () => {
  const variantData = {
    gene: 'STAT3',
    consequence: 'missense',
    psyntax: 'V674E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`STAT3 missense in codon 675 should not match`, () => {
  const variantData = {
    gene: 'STAT3',
    consequence: 'missense',
    psyntax: 'V675E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TET2 missense in codon 1133 should not match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1133E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TET2 missense in codon 1134 should match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1134E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`TET2 missense in codon 1400 should match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1400E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`TET2 missense in codon 1444 should match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1444E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`TET2 missense in codon 1445 should not match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1445E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TET2 missense in codon 1841 should not match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1841E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TET2 missense in codon 1842 should match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1842E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`TET2 missense in codon 1900 should match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1900E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`TET2 missense in codon 1921 should match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1921E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_in_codon_ranges');
});

test(`TET2 missense in codon 1922 should not match`, () => {
  const variantData = {
    gene: 'TET2',
    consequence: 'missense',
    psyntax: 'V1922E',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TP53 any missense except P47S or P72R should match`, () => {
  const variantData = {
    gene: 'TP53',
    consequence: 'missense',
    psyntax: '',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('missense_except_psyntax');
});

test(`TP53 synonymous should not match`, () => {
  const variantData = {
    gene: 'TP53',
    consequence: 'synonymous',
    psyntax: '',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TP53 missense P47S should not not match`, () => {
  const variantData = {
    gene: 'TP53',
    consequence: 'missense',
    psyntax: 'P47S',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`TP53 missense P72R should not not match`, () => {
  const variantData = {
    gene: 'TP53',
    consequence: 'missense',
    psyntax: 'P72R',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const U2AF1_missense_psyntaxes = ['S34', 'Q157']

for (const U2AF1_missense_psyntax of U2AF1_missense_psyntaxes) {
  test(`U2AF1 missense in ${U2AF1_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'U2AF1',
      consequence: 'missense',
      psyntax: U2AF1_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`U2AF1 synonymous in S34 should not match`, () => {
  const variantData = {
    gene: 'U2AF1',
    consequence: 'synonymous',
    psyntax: 'S34',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`U2AF1 missense in S35 should not match`, () => {
  const variantData = {
    gene: 'U2AF1',
    consequence: 'missense',
    psyntax: 'S35',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

const UBA1_missense_psyntaxes = ['M41']

for (const UBA1_missense_psyntax of UBA1_missense_psyntaxes) {
  test(`UBA1 missense in ${UBA1_missense_psyntax} should match`, () => {
    const variantData = {
      gene: 'UBA1',
      consequence: 'missense',
      psyntax: UBA1_missense_psyntax,
      annotation: ''
    };

    const res = variantClassifier(variantData);
    expect(res).toBeTruthy();
    expect(res.class).toBe('B');
    expect(res.evidence).toMatch('missense_in_codons');
  });
}

test(`UBA1 synonymous in M41 should not match`, () => {
  const variantData = {
    gene: 'UBA1',
    consequence: 'synonymous',
    psyntax: 'M41',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`UBA1 missense in M42 should not match`, () => {
  const variantData = {
    gene: 'UBA1',
    consequence: 'missense',
    psyntax: 'M42',
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`UBTF inframe_insertion in exon 13 should match`, () => {
  const variantData = {
    gene: 'UBTF',
    consequence: 'inframe_insertion',
    exon: 13,
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(res).toBeTruthy();
  expect(res.class).toBe('B');
  expect(res.evidence).toMatch('inframe_insertion_in_exons');
});

test(`UBTF inframe_insertion in exon 14 should not match`, () => {
  const variantData = {
    gene: 'UBTF',
    consequence: 'inframe_insertion',
    exon: 14,
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

test(`UBTF missense in exon 13 should not match`, () => {
  const variantData = {
    gene: 'UBTF',
    consequence: 'missense',
    exon: 13,
    annotation: ''
  };

  const res = variantClassifier(variantData);
  expect(variantClassifier(variantData)).toBeFalsy();
});

