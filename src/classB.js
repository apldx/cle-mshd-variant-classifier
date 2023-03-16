import config from '../config/classB_config.json' assert { type: 'json' };

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
    if (check !== 'consequence' && check !== 'indel_in_exons') {
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