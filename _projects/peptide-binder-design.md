---
layout: page
title: Peptide Binder Design
permalink: /peptide-binder-design/
description: Designing IκBα-binding peptides for an induced-proximity concept within a Duchenne muscular dystrophy design challenge. BE 3060 (Cell Engineering).
img: assets/img/projects/peptide-binder-design/bc3-complex.png
importance: 5
category: class projects
related_publications: false
---

For a team design challenge in **BE 3060: Cell Engineering**, we explored molecular and cell-engineering strategies for **Duchenne muscular dystrophy (DMD)**. The project covered antisense oligonucleotides, induced-proximity molecules for myoblast differentiation, and targeted protein degradation for further muscle-cell maturation.

My peptide-design work supported the second part: a proposed **GRIP (group-transfer chimera for inducing proximity)** targeting **IκBα**. The idea was to position a phosphatase near IκBα to alter its phosphorylation state. The binding peptide was one component of that proposed system, so its predicted location mattered alongside its design scores.

### My contribution

I was responsible for **computational peptide design, evaluation of the five selected candidates, and lead selection**. I prepared the target structure, ran BindCraft, compared its outputs with PRODIGY and AlphaFold3 predictions, and analyzed which target regions the peptides contacted.

Within the broader challenge, I also compared ASO–target hybridization using **DINAMelt**, developed the ASO delivery proposal, and defined criteria for prioritizing a **PROTAC** target and its proposed mechanism. The peptide designs were computational; building and testing the complete GRIP construct would come next.

<div class="row justify-content-sm-center align-items-center">
  <div class="col-sm-7">
    {% include figure.liquid loading="eager" path="assets/img/projects/peptide-binder-design/ikba-target-surface.png" alt="Prepared IκBα target structure with the intended 110–170 binding region highlighted in orange" title="IκBα target surface" class="img-fluid rounded" caption="IκBα with the intended binding region, residues 110–170, highlighted in orange." %}
  </div>
  <div class="col-sm-5">
    {% include figure.liquid loading="eager" path="assets/img/projects/peptide-binder-design/bc3-complex.png" alt="Predicted BC3 peptide in orange against the IκBα target surface, with the hotspot region highlighted in pink" title="BC3 design model" class="img-fluid rounded" caption="Predicted BC3 complex: the 12-residue peptide is orange and the target hotspot region is pink." %}
  </div>
</div>

### The broader project

The challenge connected three design efforts:

- **Exon-skipping ASOs:** design candidates for dystrophin exon 42, compare hybridization and potential off-targets, and plan delivery and expression assays, including analysis of teaching-team-provided qPCR data.
- **Induced proximity for differentiation:** pair an IκBα-binding peptide with a proposed PP2A-recruiting component, design pathway and differentiation assays, and analyze course-provided proteomics and single-cell RNA-sequencing data.
- **Targeted degradation for maturation:** propose a CRISPRi screen, prioritize EZH2 as a candidate PROTAC target, and plan single-cell measurements of muscle-cell maturation.

We combined these design proposals with analyses of course-provided datasets; we did not test the proposed treatments in cells.

### Designing for a particular surface

For the proposed construct to work, the peptide needed to bind in the right place. A high score on another part of IκBα wouldn't meet that design goal.

I prepared the target from **PDB 1IKN, chain D**, retaining the structured ankyrin-repeat domain. The intended binding region was residues **110–170**. The executed BindCraft runs used the broader hotspot ranges **73–95 and 101–170**, allowing exploration of adjacent surfaces while omitting the unmodeled 96–100 loop. I used peptide lengths of 10–30 amino acids, a three-stage design protocol, ProteinMPNN sequence redesign, and peptide-specific filters.

The five candidates selected for detailed evaluation comprised three 24-residue peptides and two 12-residue peptides. Two pairs shared backbone designs, leaving three distinct backbones in this small comparison.

### Comparing predictions

I compared the candidates in three ways:

- **BindCraft outputs:** AlphaFold2-Multimer confidence, Rosetta interface scores, buried surface area, hydrogen bonds, and geometric agreement with the design.
- **PRODIGY:** structure-based predictions of binding affinity. These were computational estimates, not measured dissociation constants.
- **AlphaFold3:** fresh complex predictions, followed by analysis of target residues within 5 Å of the peptide in the selected model.

All five candidates had high average AF2 interface confidence, but the AF3 contact analysis separated them. **Only BC3 contacted the intended 110–170 region in the analyzed AF3 model.** BC1, BC2, and BC5 instead contacted the earlier 73–109 region; BC4 contacted residues beyond 170.

<div class="table-responsive" markdown="1">

| Candidate | Length | Mean AF2 ipTM | Highest AF3 ipTM | Target residues contacted in the intended region |
| :--- | ---: | ---: | ---: | ---: |
| BC1 | 24 | 0.86 | 0.28 | 0 of 14 |
| BC2 | 24 | 0.85 | 0.30 | 0 of 14 |
| **BC3** | **12** | **0.91** | **0.36** | **9 of 13** |
| BC4 | 12 | 0.90 | 0.48 | 0 of 12 |
| BC5 | 24 | 0.89 | 0.40 | 0 of 14 |

</div>

AF2 values average two predictions per candidate; contact counts come from the selected AF3 structures. These are model outputs, not binding measurements.

### Choosing BC3

I selected **BC3, `SKNLELVKELLS`**, for further investigation because the predicted location aligned with the design objective across both structural approaches. It also had the highest average AF2 ipTM in the group, three predicted interface hydrogen bonds, and a PRODIGY-predicted dissociation constant of approximately 12 μM. BC5 had the most favorable PRODIGY estimate, but its AF3 pose did not occupy the intended region.

BC3 is a candidate for testing, with substantial uncertainty remaining: its AF3 ipTM was 0.36 and binder pLDDT was 51.4. Binding assays, specificity checks, and linker design would be the next steps.

The most useful lesson was to keep the intended use in view. BC5 had the better predicted affinity, but BC3 was the one predicted to contact the surface we needed.

**Tools and methods:** BindCraft, ProteinMPNN, Rosetta interface analysis, PRODIGY, AlphaFold3, and structural contact analysis; DINAMelt and experimental design in the broader challenge.

{% comment %}
Source evidence in the private second-brain vault:
BE 3060 - Cell Engineering/design-challenge-3/grip_ikba_peptide_binder_report.md,
sections 3–10; role assignment in Design Challenge 3 Outline.md, task 2b.
BC3 image extracted with its original alpha mask from image object 330 on page 43
of Design Challenge 3.pptx.pdf. No experimental images or proposed efficacy results
from the other slides are represented as results of this peptide design work.
Additional primary evidence from Design Challenge 3 Drive folder 1Mh2SLBjfUj6uY-CbLXqXpx_tVnnY8dA8:
Working Document 1Sc-nnKB6Au1hJzdQTOYRvV5GqjlOc6xiK7k1U3n1GAo, tasks 1c/1e/2b/3b for role assignments;
presentation 1y0tyUb_nRdUYQ8zMdxoVJU2PE8AJotbk, slides 17–18, 23, 37–44, 75–77;
accepted_designs_ranked_summary.csv 1foNV2fJEOpRoeKoaBrkRd-lq8UHTPIXO and
final_design_stats.csv 1pqYT9_MC-rQ0jj_ZJ6uu9UYkGldVkWr- confirm lengths, AF2 scores, sequence,
two populated prediction-model columns, three trajectories, and exact hotspot ranges.
AF3/PRODIGY values are reported in the presentation/local report, not those BindCraft CSVs.
Target-surface image is the original ppt/media/image from slide 38, extracted without modification.
{% endcomment %}
