---
layout: page
title: "Computational VHH Binder Design for Tumor-Specific Splice Variants"
permalink: /snap/
description: A computational pipeline for designing nanobody binders against spliced neo-antigen proteins expressed on cancer cells but not healthy tissue, built on AlphaFold2-guided gradient descent.
img: assets/img/snap.png
importance: 1
category: research work
related_publications: false
---

### The Problem

Most CAR T cell therapies target antigens shared between tumor cells and normal tissue, causing on-target, off-tumor toxicity. A more precise approach is to target tumor-specific splice variants: proteins where cancer cells include an exon that healthy cells exclude. If a binder can recognize the exon-inclusion isoform while ignoring the exon-exclusion isoform on normal tissue, the therapy gains a specificity that antigen-level targeting cannot provide.

The challenge is computational. Designing a binder de novo for a specific surface epitope on a specific protein isoform requires both a sequence design engine and a way to evaluate whether the resulting designs actually bind where intended. Both are harder than they appear.

### Approach

SNAP uses the mBER (Manifold Binder Engineering and Refinement) framework as its core design engine. mBER runs iterative sequence optimization guided by AlphaFold2-Multimer predictions, using JAX to compute gradients over a loss that combines inter-chain contacts, interface pTM and PAE, radius of gyration, and structural quality terms. The output is VHH nanobody sequences designed to engage user-specified hotspot residues on the target.

Targets include CD19, CHL1 splice variants, mesothelin (MSLN), and EpCAM.

### Evaluation Pipeline

A central contribution of this project is a standalone binder evaluation library that operates independently of the design loop. Given a VHH sequence and a target structure, it:

1. Runs AlphaFold2-Multimer in hallucination mode — the model receives only the target structure and must predict the binder from sequence alone, the most stringent evaluation signal available
2. Computes buried surface area (BSA) via FreeSASA to quantify interface size
3. Maps CDR loop contacts using Chothia-numbered CDR definitions to determine which complementarity-determining regions engage the target
4. Computes interface RMSD and contact Jaccard similarity against reference crystal structures when available
5. Scores sequence naturalness via ESM2 pseudo-perplexity

Designs are classified as PASS (BSA > 600 Å² and ≥3 CDRs engaged), MARGINAL, WEAK, or FAIL.

### Benchmark: What AF2-Multimer Actually Tells You

Before trusting the evaluation pipeline, I ran a systematic benchmark to characterize what AlphaFold2-Multimer confidence metrics actually measure for antibody-antigen complexes.

The benchmark uses 7 positive crystal structures and 6 negative controls across 4 targets (MSLN, CD22, EpCAM, CD19). For each, I tested:

- **Structure recovery:** Does AF2-M reproduce the known crystal pose?
- **CDR scramble controls:** Do CDR-shuffled sequences (same framework, randomized CDR sequences) score differently from the originals?
- **Wrong-target controls:** Does a correct antibody scored against the wrong target produce distinguishable metrics?

The results were striking. All 6 wrong-target negative controls and all 20 CDR-scrambled variants passed the standard biophysical filters (iPTM ≥ 0.48, BSA > 2300 Å², CDRs ≥ 4 engaged). Confidence metrics were statistically indistinguishable across groups: iPTM 0.68 ± 0.20 for true positives versus 0.75 ± 0.13 for wrong-target negatives; mean inter-chain PAE ~18 Å for all groups.

The conclusion is that AF2-Multimer models scaffold docking, not sequence-specific recognition. Standard confidence scores cannot discriminate binding specificity. The only validated discriminators are contact Jaccard similarity against a reference crystal epitope and interface RMSD — both of which require a known crystal structure as ground truth. This finding directly constrains how design outputs can be interpreted and what wet-lab validation is needed.

Structure recovery results varied by target: MSLN was well-recovered (RMSD 1.45 Å on 4F3F), while CD22 was systematically mispredicted across both tested antibodies.

### Binder Discrimination

As a secondary ranking approach, I trained a Random Forest classifier on structural features extracted from AF2-Multimer predictions. The training set used 43 EpCAM-binding VHHs from phage display, 86 CDR-scrambled decoys, and 24 off-target VHHs from the literature.

The 12 features span confidence (CDR pLDDT, full-chain pLDDT, iPTM, pTM), geometry (BSA, CDR engagement fraction, contact fractions), and inter-chain PAE. AUROC was 0.83 against scrambled CDR decoys but only 0.59 against off-target VHHs — consistent with the benchmark finding that the model captures structural plausibility rather than binding specificity.

When applied to 94 mBER-designed EpCAM binders, all RF scores fell below 0.6 (the training positive range), indicating that filtering by structural features alone is insufficient and that epitope-specific evaluation against hotspot residues is necessary.

### Skills Used

- AlphaFold2-Multimer (ColabFold), JAX-based gradient optimization
- VHH/nanobody design (CDR loop engineering, Chothia numbering, ANARCI)
- Structural bioinformatics (BSA, RMSD, contact map analysis, FreeSASA)
- ESM2 protein language model scoring
- Random Forest classification (scikit-learn)
- Python, BioPython, OpenMM/AMBER
