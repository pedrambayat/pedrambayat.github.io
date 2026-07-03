---
layout: page
title: "Computational VHH Binder Design for Tumor-Specific Splice Variants"
permalink: /vhh-binder-design/
description: A computational pipeline for designing nanobody binders against spliced neo-antigen proteins expressed on cancer cells but not healthy tissue, built on AlphaFold2-guided gradient descent.
img: assets/img/vhh-binder-design.png
importance: 1
category: research work
related_publications: false
---

### The Problem

Most CAR T cell therapies target antigens shared between tumor cells and normal tissue, which causes on-target, off-tumor toxicity. A more precise approach is to target tumor-specific splice variants: proteins where cancer cells include an exon that healthy cells leave out. A binder that recognizes the exon-inclusion isoform while ignoring the exon-exclusion isoform on normal tissue gains a specificity that antigen-level targeting simply cannot reach. The neural adhesion molecule CHL1 is a clean example — it carries an alternatively spliced exon that is retained in pediatric neuroblastoma but excluded in healthy neural tissue, creating exactly the kind of tumor-restricted neoepitope this work is built to exploit.

The hard part is computational. Designing a binder de novo against a specific surface epitope on a specific protein isoform requires two things that are both harder than they look: a sequence design engine capable of proposing candidates, and an evaluation method honest enough to tell you whether those candidates actually bind where you intended.

### Approach

The design engine is built on [mBER](https://github.com/manifoldbio/mber-open) (Manifold Binder Engineering and Refinement), an open-source antibody-design framework from Manifold Bio. It performs iterative sequence optimization guided by AlphaFold2-Multimer, using JAX to backpropagate gradients through a loss that combines inter-chain contacts, interface pTM and PAE, radius of gyration, and structural-quality terms. Its output is VHH nanobody sequences optimized to engage user-specified hotspot residues on the target. Across the project, targets included CD19, CHL1 splice variants, mesothelin (MSLN), and EpCAM.

The more interesting contribution, and the focus of this page, is what it took to trust the designs the engine produced.

### A Standalone Evaluation Pipeline

Evaluation in most binder-design workflows is tightly coupled to the design loop — you cannot score a sequence without first rebuilding the entire optimization state around it. I built a standalone evaluation library that breaks that coupling: given a VHH sequence and a target structure, it returns a full interface assessment independently of how (or whether) the sequence was designed. Concretely, it:

1. Runs AlphaFold2-Multimer in **hallucination mode** — the model receives only the target structure and must predict the binder from sequence alone, with no template hint about where it should dock. This is the most stringent signal available.
2. Computes buried surface area (BSA) via FreeSASA to quantify interface size.
3. Maps CDR loop contacts using Chothia-numbered CDR definitions to identify which complementarity-determining regions actually engage the target.
4. Computes interface RMSD and contact Jaccard similarity against reference crystal structures where available.
5. Scores sequence naturalness via ESM2 pseudo-perplexity.

Designs are then classified as PASS (BSA > 600 Å² and ≥ 3 CDRs engaged), MARGINAL, WEAK, or FAIL. Decoupling evaluation from design makes three things possible that the coupled workflow does not: re-scoring existing binders under new model configurations, benchmarking arbitrary known antibodies, and running batch CSV-in / CSV-out screening campaigns that resume gracefully after failures.

### Benchmark: What AF2-Multimer Actually Tells You

Before trusting any of these metrics, I ran a systematic benchmark to characterize what AlphaFold2-Multimer confidence scores really measure for antibody–antigen complexes — because if they measure the wrong thing, the whole pipeline rests on sand.

The benchmark spans 7 positive crystal structures and 6 negative controls across 4 targets (MSLN, CD22, EpCAM, CD19), testing three questions:

- **Structure recovery:** does AF2-M reproduce the known crystal pose?
- **CDR-scramble controls:** do CDR-shuffled sequences (identical framework, randomized CDR sequences) score differently from the originals?
- **Wrong-target controls:** does a correct antibody, scored against the wrong target, produce distinguishable metrics?

The results were unambiguous. All 6 wrong-target negatives and all 20 CDR-scrambled variants passed the standard biophysical filters (iPTM ≥ 0.48, BSA > 2300 Å², CDRs ≥ 4 engaged). Confidence metrics were statistically indistinguishable across groups: iPTM of 0.68 ± 0.20 for true positives versus 0.75 ± 0.13 for wrong-target negatives, with mean inter-chain PAE near 18 Å for every group.

The conclusion is that **AF2-Multimer models scaffold docking, not sequence-specific recognition.** The immunoglobulin framework geometry dominates the interface prediction regardless of what the CDRs say or which target is presented, so standard confidence scores cannot discriminate binding specificity. The only discriminators that survived were contact Jaccard similarity against a reference crystal epitope and interface RMSD — both of which require a known crystal structure as ground truth. That finding directly constrains how design outputs can be interpreted and clarifies which wet-lab validation is actually load-bearing. Structure recovery itself was target-dependent: MSLN was well recovered (RMSD 1.45 Å on 4F3F), while CD22 was systematically mispredicted across both antibodies tested.

### Learning the Limits of Structural Features

As a secondary ranking approach, I trained a Random Forest classifier on 13 features extracted from AF2-Multimer predictions — confidence (CDR pLDDT, full-chain pLDDT, iPTM, pTM, iPTM/pTM ratio), geometry (BSA, CDR engagement, CDR3 contact fraction), and inter-chain PAE (max, mean, min). The positives were 43 experimentally validated EpCAM-binding VHHs; the negatives combined CDR-scrambled decoys with off-target VHHs drawn from the literature.

The classifier reproduced the benchmark's failure mode, now quantitatively. It reached an out-of-fold AUROC of **0.83 against CDR-scrambled decoys** but collapsed to **0.500 (95% CI [0.363, 0.652]) against held-out off-target VHHs** — no better than a coin flip. It had learned to detect the CDR pLDDT degradation introduced by scrambling, not binding specificity.

Applying the classifier to 94 designed EpCAM binders made the limitation concrete, and revealed something sharper. Every design scored in a narrow band below 0.6, and the reason is instructive: because the design engine explicitly optimizes for the same AF2-Multimer interface metrics that feed the classifier, it drives every candidate toward nearly identical feature values. The classifier is then left ranking residual CDR pLDDT variation that is essentially noise. Structural features alone cannot substitute for epitope-specific evaluation against defined hotspot residues — and, ultimately, cannot substitute for experimental labels.

### Skills Used

- AlphaFold2-Multimer (ColabFold), JAX-based gradient optimization
- VHH/nanobody design (CDR loop engineering, Chothia numbering, ANARCI)
- Structural bioinformatics (BSA, RMSD, contact-map analysis, FreeSASA)
- ESM2 protein language model scoring
- Random Forest classification (scikit-learn)
- Python, BioPython, OpenMM/AMBER
