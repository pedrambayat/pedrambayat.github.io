---
layout: page
title: CART4-34 Manufacturing
permalink: /cart434-transduction/
description: Improving lentiviral transduction for a selective CAR T cell therapy, with reagent screening and follow-up cell expansion.
img: assets/img/projects/cart434/transduction-screening.svg
importance: 2
category: research work
related_publications: false
---

**2024–2026 · Published in Science Translational Medicine**

[Paper](https://www.science.org/doi/10.1126/scitranslmed.adr9382) · [Research poster]({{ '/assets/pdf/curf_poster.pdf' | relative_url }})

CART4-34 is an experimental CAR T cell approach that recognizes **IGHV4-34**, a variable region of the B cell receptor enriched in certain B cell cancers and autoimmune disease. The project aimed to target these pathogenic cells more selectively than CD19-directed therapies, which also deplete much of the healthy B cell population. At Penn's Center for Cellular Immunotherapies, I worked on a practical part of that effort: producing enough engineered T cells for the study.

The broader study demonstrated selective killing of IGHV4-34-positive malignant cells, antitumor activity in mouse models, and targeting of patient-derived lupus B cells outside the body. Shorter CAR hinges improved the contact interface between T cells and their targets. CART4-34 largely preserved the IGHV4-34-negative healthy B cell population; it also depleted the small IGHV4-34-positive subset found in healthy donors. These were preclinical findings.

### My contribution

My work focused on **lentiviral transduction**, the step that introduces the CAR gene into T cells. Too few cells were expressing the receptor, so I looked for ways to improve that step. I screened transduction-enhancing reagents, measured reporter expression by flow cytometry, and followed cell growth under the selected conditions.

The screen compared Poloxamer 407 (P407), beta-mercaptoethanol, Polybrene, and LentiBOOST, each with and without RetroNectin. RetroNectin brings viral particles and target cells into proximity. The CAR construct included a truncated EGFR reporter, allowing the fraction of EGFR-positive cells to serve as a readout of successful gene delivery and expression.

### Screening result

**RetroNectin plus P407 reached 35.6% EGFR positivity**, the highest value reported among the tested enhancer conditions. The no-enhancer control without RetroNectin was 13.6%, the RetroNectin-only control was 18.7%, and P407 without RetroNectin reached 23.2%. The combination outperformed either reagent alone in this screen.

<div class="row justify-content-sm-center">
  <div class="col-sm-10">
    {% include figure.liquid path="assets/img/projects/cart434/transduction-screening.svg" alt="EGFR positivity of 13.6 percent for control, 18.7 percent for RetroNectin only, 23.2 percent for P407 only, and 35.6 percent for their combination" class="img-fluid rounded" caption="RetroNectin plus P407 gave the highest EGFR positivity in the screen. The poster reports these percentages without replicate counts or uncertainty estimates." %}
  </div>
</div>

P407 is a nonionic surfactant. The poster proposed that reduced repulsion between viral particles and cells might complement RetroNectin's proximity effect, but the experiment did not establish that mechanism.

### Following the cells over time

A subsequent expansion using RetroNectin and P407 showed continued cell growth through **day 16**, with EGFR positivity tracked on **days 5–11**. That gave us a useful condition to carry into later experiments.

I presented this work at Penn's CURF Fall Research Expo in September 2024. It became part of the broader collaborative study published in 2026.

**Tools and methods:** CAR T cell culture, lentiviral transduction, reagent screening, flow cytometry, reporter-based expression analysis, and cell expansion.

{% comment %}
Sources: assets/pdf/curf_poster.pdf, Figure VI (screening and control caption) and Figure VII (growth to day 16; EGFR days 5–11).
Publication: doi:10.1126/scitranslmed.adr9382, 4 February 2026; healthy-donor subset results in Figure 5.
Personal role corroborated by local Career/Misc Applications/Arc Fellows/Arc Reflection.md and Merck BPRD.md.
Chart source and transcribed evidence are stored beside transduction-screening.svg.
{% endcomment %}
