---
layout: page
title: CAR T Cell Therapy Targeting IGHV4-34 B Cell Malignancies
permalink: /cart434-transduction/
description: Contributed to the development of CART4-34, a precision CAR T cell therapy targeting IGHV4-34+ B cell malignancies, published in Science Translational Medicine (2026). My work focused on solving a transduction efficiency bottleneck in CAR T cell manufacturing.
img: assets/img/publication_preview/cart434.png
importance: 2
category: research work
related_publications: false
---

This project was part of the work published in [Science Translational Medicine](https://www.science.org/doi/abs/10.1126/scitranslmed.adr9382) in February 2026, conducted during my time in the Ruella Lab at the Center for Cellular Immunotherapies at Penn.

### The Paper

Current CAR T cell therapies for B cell malignancies target CD19, an antigen expressed across the entire B cell lineage. This causes on-target, off-tumor depletion of healthy B cells, leaving patients immunocompromised, and creates a route for relapse when tumor cells downregulate CD19.

This work presents CART4-34, a CAR T cell therapy that targets the IGHV4-34 B cell receptor instead. Because IGHV4-34 is highly enriched on malignant B cells and largely absent from the healthy B cell pool, CART4-34 can eliminate tumor cells with much greater precision while sparing normal B cells. The study demonstrates its specific cytotoxicity toward IGHV4-34+ malignant B cells in vitro, robust antitumor activity in xenograft mouse models, improved immune synapse morphology through CAR hinge domain optimization, and the ability to target patient-derived Systemic Lupus Erythematosus (SLE) B cells ex vivo without depleting healthy B cells or affecting total IgG levels.
### My Contribution

My work focused on solving a manufacturing bottleneck that needed to be resolved before CART4-34 could be used in the more advanced experiments described in the paper. The issue was transduction efficiency: the step where a lentiviral vector delivers the CAR construct into T cells. Low transduction efficiency meant most T cells in a batch were not expressing the CAR, which undermined downstream experiments and posed a real obstacle to clinical translation.

To address this, I systematically tested commercially available transduction efficiency boosters with and without RetroNectin. RetroNectin is a recombinant protein that co-localizes lentiviral particles and T cells on the same surface via the VLA-4 integrin receptor and a heparin binding domain, increasing the chance of successful viral entry. The boosters tested were Poloxamer 407 (P407), beta-mercaptoethanol (BME), Polybrene, and LentiBOOST. Transduction efficiency was measured using a truncated EGFR reporter gene in the CART4-34 construct, detected by flow cytometry with an anti-EGFR antibody, across eight total conditions.

RetroNectin combined with Poloxamer 407 produced the highest transduction efficiency at 35.6% EGFR positivity, compared to 13.6% without RetroNectin and 18.7% with RetroNectin alone. P407 is a nonionic surfactant hypothesized to reduce electrostatic repulsion between the negatively charged T cells and lentiviral particles, complementing the physical co-localization that RetroNectin provides. A subsequent 16-day CART4-34 expansion under the optimized conditions showed strong sustained growth and high EGFR positivity throughout, validating the protocol for use in the larger study.

This work was presented as a poster at the University of Pennsylvania CURF Fall Research Expo in September 2024 and was ultimately instrumental in the subsequent work that led to the STM publication.

### Publication and Poster

[Chimeric antigen receptor T cells against the IGHV4-34 B cell receptor specifically eliminate neoplastic and autoimmune B cells](https://www.science.org/doi/abs/10.1126/scitranslmed.adr9382)
Cohen, Bochi-Layec, Lemoine, Jenks, Bayat et al. Science Translational Medicine, 2026.

[Poster]({{ '/assets/pdf/curf_poster.pdf' | relative_url }}) — Penn CURF Fall Research Expo, 2024.

### Skills Used

- CAR T cell manufacturing and lentiviral transduction
- Flow cytometry (EGFR reporter assay)
- Cell culture and expansion protocols
- Experimental design and data analysis
