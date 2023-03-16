const IDH1Psyntax = {
  'p.R132C': 1, 'p.R132G': 1, 'p.R132H': 1, 'p.R132S': 1, 'p.R132L': 1
};

const IDH2Psyntax = {
  'p.R140Q': 1, 'p.R172S': 1, 'p.R172K': 1
};

const classA = (variantData) => {
  const template = {
    class: 'A',
    match: false
  };

  // FLT3-ITD
  if ((variantData.gene === 'FLT3') &&
      (variantData.consequence.includes('insertion')) &&
      ((variantData.exon.includes('13')) ||
       (variantData.exon.includes('14')) ||
       (variantData.exon.includes('15')))) {
    return {
      ...template,
      match: true,
      evidence: `${variantData.gene} consequence: ${variantData.consequence} exon: ${variantData.exon} (FLT3-ITD)`
    };       
  }

  // FLT3-TKD
  if ((variantData.gene === 'FLT3') &&
      (variantData.consequence.includes('missense')) &&
      (variantData.psyntax.includes('p.D385'))) {
    return {
      ...template,
      match: true,
      evidence: `${variantData.gene} consequence: ${variantData.consequence} psyntax: ${variantData.psyntax} (FLT3-TKD)`
    };       
  }

  // IDH1
  if (variantData.gene === 'IDH1') {
    if (variantData.psyntax in IDH1Psyntax) {
      return {
        ...template, 
        match: true,
        evidence: `${variantData.gene} psyntax: ${variantData.psyntax}`
      };
    }
  }

  // IDH2
  if (variantData.gene === 'IDH2') {
    if (variantData.psyntax in IDH2Psyntax) {
      return {
        ...template,
        match: true,
        evidence: `${variantData.gene} psyntax: ${variantData.psyntax}`
      };
    }
  }

  return template;
};

export default classA;