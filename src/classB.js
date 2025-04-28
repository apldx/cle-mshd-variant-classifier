import config from '../config/classB_config.json' assert { type: 'json' };

const psyntax_to_codon = (psyntax) => {
  if (!psyntax) {
    return false;
  }

  const res = /(\d+)/.exec(psyntax);
  return res ? parseInt(res[0]) : false;
}

const template = {
  class: 'B',
  match: false
};

const checks = {};

// consequence contains consequence from list
checks.consequence = (variantData, consequences) => {
  for (const consequence of consequences) {
    if (variantData.consequence.includes(consequence)) {
      return {
        ...template,
        match: true,
        evidence: `${variantData.gene} consequence ${variantData.consequence}`
      }
    }
  }
  return false;
}

// psyntax equals psyntax from list
checks.psyntax = (variantData, psyntaxes) => {
  for (const psyntax of psyntaxes) {
    if (variantData.psyntax == psyntax) {
      return {
        ...template,
        match: true,
        evidence: `${variantData.gene} psyntax ${variantData.psyntax}`
      }
    }
  }
  return false;
}

// frameshift after codon
checks.frameshift_after_codon = (variantData, codon_cutoff) => {
  const codon = psyntax_to_codon(variantData.psyntax);
  if (!codon) {
    return false;
  }
  if (variantData.consequence.includes('frameshift')) {
    if (codon > codon_cutoff) {
      return {
        ...template,
        match: true,
        evidence: `${variantData.gene} frameshift_after_codon ${codon_cutoff}`
      }
    }
  }
  return false;
}

// missense in list of codons
checks.missense_in_codons = (variantData, codons) => {
  const codon = psyntax_to_codon(variantData.psyntax);
  if (!codon) {
    return false;
  }
  if (variantData.consequence.includes('missense')) {
    for (const target_codon of codons) {
      if (codon == target_codon) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} missense_in_codons codon: ${codon}`
        }
      }
    }
  }
  return false;
}

// missense in list of codons
checks.missense_except_psyntax = (variantData, exceptions) => {
  if (variantData.consequence.includes('missense')) {
    for (const exception of exceptions) {
      if (variantData.psyntax == exception) {
        return false;
      }
    }
    return {
      ...template,
      match: true,
      evidence: `${variantData.gene} missense_except_psyntax`
    }
  }
  return false;
}

// inframe_deletion in list of codons
checks.inframe_deletion_in_codons = (variantData, codons) => {
  const codon = psyntax_to_codon(variantData.psyntax);
  if (!codon) {
    return false;
  }
  if (variantData.consequence.includes('inframe_deletion')) {
    for (const target_codon of codons) {
      if (codon == target_codon) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} inframe_deletion_in_codons codon: ${codon}`
        }
      }
    }
  }
  return false;
}

// inframe_insertion in list of exons
checks.inframe_insertion_in_exons = (variantData, exons) => {
  if (variantData.consequence.includes('inframe_insertion')) {
    for (const exon of exons) {
      if (variantData.exon == exon) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} inframe_insertion_in_exons exon: ${exon}`
        }
      }
    }
  }
  return false;
}




// missense in codon ranges
checks.missense_in_codon_ranges = (variantData, codon_ranges) => {
  const codon = psyntax_to_codon(variantData.psyntax);
  if (!codon) {
    return false;
  }
  if (variantData.consequence.includes('missense')) {
    for (const codon_range of codon_ranges) {
      if (codon >= codon_range[0] && codon <= codon_range[1]) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} missense_in_codon_ranges ${codon_range[0]}-${codon_range[1]}`
        }
      }
    }
  }
  return false;
}

// inframe_indel in codon ranges
checks.inframe_indel_in_codon_ranges = (variantData, codon_ranges) => {
  const codon = psyntax_to_codon(variantData.psyntax);
  if (!codon) {
    return false;
  }
  if ((variantData.consequence.includes('inframe_insertion')) ||
    (variantData.consequence.includes('inframe_deletion'))) {
    for (const codon_range of codon_ranges) {
      if (codon >= codon_range[0] && codon <= codon_range[1]) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} inframe_indel_in_codon_ranges ${codon_range[0]}-${codon_range[1]}`
        }
      }
    }
  }
  return false;
}

// type INDEL with exact exon match to exon from list
checks.indel_in_exons = (variantData, exons) => {
  if (variantData.type === 'INDEL') {
    for (const exon of exons) {
      if (variantData.exon === exon) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} type ${variantData.type} in exon ${variantData.exon}`
        }
      }
    }
  }
  return false;
}

// nonsense (consequence stop_gained) in exons
checks.nonsense_in_exons = (variantData, exons) => {
  if (variantData.consequence.includes('stop_gained')) {
    for (const exon of exons) {
      if (variantData.exon === exon) {
        return {
          ...template,
          match: true,
          evidence: `${variantData.gene} nonsense_in_exons in exon ${variantData.exon}`
        }
      }
    }
  }
  return false;
}
const classB = (variantData) => {
  // First check for literature annotation flags from the pipeline
  if ((variantData.annotation.includes('AMLTCGA')) || 
      (variantData.annotation.includes('MDS'))) {
    return {
      ...template,
      match: true,
      evidence: 'AMLTCGA || MDS in annotation'
    }
  }

  // Check for the gene in the classB config
  if (!(variantData.gene in config)) {
    return template;
  }
 
  const geneConfig = config[variantData.gene];

  for (const check of Object.keys(geneConfig)) {
    // Temporarily disable checks that are not yet implemented
    if (!Object.keys(checks).includes(check)) {
      console.log(`Skipping unknown check ${check}`);
      continue;
    }
    const res = checks[check](variantData, geneConfig[check]);
    if (res) {
      return res;
    }
  }

  return template;
};

export default classB;