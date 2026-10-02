---
layout: page
title: Computational CAR-T Design for Melanoma
permalink: /melanoma-car-t-design/
description: Designing TYRP1-binding miniproteins within a broader CAR-T cell engineering and delivery proposal. BE 3060 (Cell Engineering).
img: assets/img/projects/melanoma-car-t/overlay.png
importance: 6
category: class projects
related_publications: false
---

For a team design challenge in **BE 3060: Cell Engineering**, we developed a proposal for CAR-T therapy targeting melanoma. A chimeric antigen receptor (CAR) combines an extracellular recognition domain with signaling domains that activate a T cell. Our project connected the design of that recognition domain to two engineering approaches: modifying donor T cells outside the body, and delivering CAR-encoding mRNA to cells in vivo.

We selected **TYRP1** as the target antigen and computationally compared four candidate binders. Our goal was a binder candidate and a plan for building and testing it in a CAR.

### My contribution

I developed the melanoma background and design rationale, led the **BindCraft design of two TYRP1-binding miniproteins**, and shared responsibility for computational evaluation, lead selection, and off-target assessment. I focused on choosing a target surface and deciding which predicted interfaces were worth pursuing. The team also contributed two moPPIt designs and the gene-editing, CAR integration, and delivery proposals described below.

<div class="row justify-content-sm-center">
  <div class="col-sm-8">
    {% include figure.liquid loading="eager" path="assets/img/projects/melanoma-car-t/overlay.png" alt="Two predicted helical binder structures in cyan and magenta overlaid on the gray TYRP1 target surface" title="TYRP1 binder design overlay" class="img-fluid rounded" caption="Predicted BC1 and BC2 structures on TYRP1. They share a backbone design, with sequences redesigned by ProteinMPNN." %}
  </div>
</div>

### The broader design

The project covered three connected parts:

- **Allogeneic cell engineering:** a B2M gene-disruption proposal, including knockout and base-editing guide designs, cloning plans, and proposed checks of editing and protein expression. We also considered the immune-compatibility limitations of this approach.
- **Antigen recognition and CAR integration:** TYRP1 target selection, four binder designs, structural evaluation, and a proposed workflow for inserting the selected binder into a CAR and integrating the construct into T cells through homology-directed repair.
- **An in vivo delivery alternative:** a CAR-mRNA lipid nanoparticle proposal alongside PD-1-targeting siRNA, with controls and a flow-cytometry plan for evaluating CAR expression.

We treated the allogeneic and in vivo approaches as separate options, with experimental testing still ahead.

### Designing the TYRP1 interface

I targeted three TYRP1 insertion-loop regions: **155–179, 199–204, and 291–300**. The selection considered sequence differences from the related proteins TYR and TYRP2, exposed hydrophobic residues, nearby glycosylation sites, and accessibility relative to the membrane. These constraints made the intended binding surface part of the design objective.

Using BindCraft's three-stage AlphaFold2-Multimer design protocol and ProteinMPNN redesign, I obtained the two candidates labeled **BC1 and BC2**. Both were 63-residue, predominantly helical miniproteins from the same design trajectory. I compared their predicted confidence, interface energy, buried surface area, and agreement with the intended pose.

### Comparing candidates and selecting a lead

The two BindCraft candidates had similar predicted interfaces:

<div class="table-responsive" markdown="1">

| Metric | BC1 | BC2 |
| :--- | ---: | ---: |
| AF2-Multimer ipTM | 0.80 | 0.80 |
| Rosetta interface energy | −35.5 REU | −34.3 REU |
| Buried interface area | 1,465 Å² | 1,476 Å² |
| Shape complementarity | 0.57 | 0.55 |
| Hotspot RMSD | 1.29 Å | 1.44 Å |

</div>

We prioritized **BC1** for further testing based on its predicted pose and interface metrics, including a slightly more favorable Rosetta interface energy relative to buried area. The team's two moPPIt candidates had AF3 ipTM values of 0.45 and predicted poses displaced from their intended motif. Because the designs were evaluated with different models, I treated these scores as clues rather than a direct affinity ranking.

As part of the shared off-target assessment, we examined sequence similarity and modeled BC1 with related proteins. AF3 gave low-confidence complexes with **TYR (ipTM 0.32)** and **TYRP2 (0.21)**, though experimental tests would still be needed to assess specificity.

### Outcome and next steps

We finished with **BC1 as our lead candidate** and a plan for testing binding, specificity, and function in the complete CAR. Working through the surrounding cell engineering and delivery choices helped me see how many decisions sit between a promising protein model and a useful therapy.

**Tools and methods:** BindCraft, ProteinMPNN, AlphaFold2-Multimer, AlphaFold3, Rosetta interface analysis, BLAST, and PyMOL; team comparisons with moPPIt.

{% comment %}
Source provenance: Design Challenge 2 Drive folder, 1skTXRD8nYswqewmwdtvOdaDUUSnHsdRZ.
Roles: Design Challenge 2 Working Document, 1oxgwYsji-12zBTZ6JBdj4iV7pK7r-jFt-fSzNDxG_d0,
task 2a (background), 2c (BindCraft), and shared 2d/2e (evaluation and off-targets).
Design and reported metrics: BE 3060 Design Challenge 2 Team 2.pptx, slides 33–40;
local PDF copy in the vault's BE 3060 design-challenge-2 folder.
Raw metrics and lengths verified against final_design_stats.csv rows 2–3,
Drive file 1ifOg69GAyrOly3_q1r_cIzupQfYPZ2n2: TYRP1_l63_s966327_mpnn1 and mpnn2.
These are averages over two prediction models, not biological replicates.
Figure: original pymol/overlay.png, Drive file 1sW5SNdDvnEoT7s76QbowARXrDYbephJh.
Wet-lab, animal efficacy, and example cytometry figures are not represented as completed experiments.
{% endcomment %}
