const isInSet = (letter, letterSet) => {
  const regex = new RegExp(`[${letterSet}]`);
  return regex.test(letter);
};

const classA = (variantData) => {
  // sanitize psyntax. For tests it may not be present, so check first
  let psyntax = '';
  if ('psyntax' in variantData) {
    psyntax = variantData.psyntax.replace(/^p./, '');
  }

  const template = {
    class: 'A',
    significance: 'potentially_therapeutic',
    match: false
  };

  // FLT3-ITD
  if (variantData.gene === 'FLT3') {
    if (variantData.consequence.includes('inframe_insertion')) {
      if (variantData.exon == 14) {
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
      if (psyntax.includes('D385') || psyntax.includes('I836')) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} consequence: ${variantData.consequence} psyntax: ${psyntax} (FLT3-TKD)`
        };
      }
    }
  }

  // IDH1
  if (variantData.gene === 'IDH1') {
    if (variantData.consequence.includes('missense')) {
      if (psyntax.startsWith('R132')) {
        const aaSet = 'CGHLS';
        if (psyntax.length === 5 && isInSet(psyntax[4], aaSet)) {
          return {
            ...template,
            match: true,
            evidence: `${variantData.gene} psyntax: ${psyntax}`
          };
        }
      }
    }
  }

  // IDH2
  if (variantData.gene === 'IDH2') {
    if (variantData.consequence.includes('missense')) {
      if (psyntax.startsWith('R140')) {
        const aaSet = 'GLQW';
        if (psyntax.length === 5 && isInSet(psyntax[4], aaSet)) {
          return {
            ...template,
            match: true,
            evidence: `${variantData.gene} psyntax: ${psyntax}`
          };
        }
      }
    }
  }

  // IDH2
  if (variantData.gene === 'IDH2') {
    if (variantData.consequence.includes('missense')) {
      if (psyntax.startsWith('R172')) {
        const aaSet = 'GKMSW';
        if (psyntax.length === 5 && isInSet(psyntax[4], aaSet))
          return {
            ...template,
            match: true,
            evidence: `${variantData.gene} psyntax: ${psyntax}`
          };
      }
    }
  }

  return template;
};

export default classA;
