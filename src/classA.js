const classA = (variantData) => {
  const template = {
    class: 'A',
    match: false
  };

  // FLT3-ITD
  if (variantData.gene === 'FLT3') {
    if (variantData.consequence.includes('inframe_insertion')) {
      if (variantData.exon.includes('14')) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} consequence: ${variantData.consequence} exon: ${variantData.exon} (FLT3-ITD)`
        };
      }
    }
  }

  // FLT3-TKD
  if (variantData.gene === 'FLT3') {
    if (variantData.consequence.includes('missense')) {
      if ((variantData.psyntax.includes('p.D385')) ||
        variantData.psyntax.includes('p.I836')) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} consequence: ${variantData.consequence} psyntax: ${variantData.psyntax} (FLT3-TKD)`
        };
      }
    }
  }

  // IDH1
  if (variantData.gene === 'IDH1') {
    if (variantData.consequence.includes('missense')) {
      if (variantData.psyntax.includes('R132')) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} psyntax: ${variantData.psyntax}`
        };
      }
    }
  }

  // IDH2
  if (variantData.gene === 'IDH2') {
    if (variantData.consequence.includes('missense')) {
      if ((variantData.psyntax == 'p.R140Q') ||
        variantData.psyntax.includes('p.R172')) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} psyntax: ${variantData.psyntax}`
        };
      }
    }
  }

  return template;
};

export default classA;