---
layout: page
title: LLM Cell-Type Annotation
permalink: /reference-free-cell-annotation/
description: Benchmarking LLM agents for reference-free cell-type annotation, with explicit checks for workflow failures and hallucinations.
img: assets/img/projects/cell-annotation/reliability.svg
importance: 3
category: research work
related_publications: false
---

**2025 · ICLR MLGenX workshop paper · Penn Immune Health Hackathon winner**

[Paper](https://openreview.net/pdf?id=kD8LptrZ7v) · [OpenReview](https://openreview.net/forum?id=kD8LptrZ7v) · [Poster]({{ '/assets/pdf/mlgenx_poster.pdf' | relative_url }})

I benchmarked LLM agents that assign cell-type labels to clustered spatial gene-expression data without a fixed reference atlas. I ran the model comparisons and reviewed their outputs: did they finish, did they use the data, and did their labels agree with expert annotations? We wanted to see how much of the analysis an agent could handle with minimal guidance.

### From expression data to labels

The system uses a single LLM agent built with **ag2**, combining local Python execution with tools for querying PubMed and NCBI Entrez. Its system prompt gives a general workflow: explore the dataset, formulate and execute a plan, then summarize findings. The same prompts were used with Claude 3.5 Sonnet, o3-mini with high reasoning, and GPT-4o.

We gave each agent **precomputed differential-expression data for each cluster**, the tissue identity, and a request for cell-type labels. It could use its biological knowledge or search PubMed, but received no further help during the run. Here, reference-free means that we did not supply a fixed annotation atlas.

### Evaluating the workflow

The benchmark covered three 10x Genomics Visium HD datasets: human tonsil with reactive follicular hyperplasia, healthy mouse kidney, and healthy mouse brain. Each was divided into ten clusters using k-means in Loupe Browser. We made **five attempts per model per dataset**, giving 45 attempts overall.

A run counted as complete when its final message contained ten cluster labels. A completed run was flagged as hallucinated when the conversation showed that its labels were not appropriately derived from the supplied data. Common failures included plausible sample labels based only on the tissue and labels inferred from invented gene signatures. Coarse but data-grounded labels instead received lower alignment scores.

{% include figure.liquid path="assets/img/projects/cell-annotation/reliability.svg" alt="Stacked bars for fifteen attempts per model: Claude has twelve completed without flagged hallucination, two hallucinated, and one incomplete; o3-mini has eleven, four, and zero; GPT-4o has three, zero, and twelve." title="Agent workflow outcomes" class="img-fluid rounded" %}

<div class="caption">
  Outcomes from 15 attempts per model—five on each dataset. These are counts, without error bars; a completed, data-grounded answer can still contain incorrect labels.
</div>

### How well did the labels match?

Human pathologists established reference labels using expression data and histology; the agents had no histology images. Predictions were manually rated on an **ordinal scale from 1 to 4**, from complete misalignment to perfect alignment. The table reports mean cluster scores **only for completed runs without flagged hallucinations**; parentheses give the number of qualifying runs, each containing ten labels.

<div class="table-responsive" markdown="1">

| Model | Tonsil | Kidney | Brain |
| :--- | ---: | ---: | ---: |
| Claude 3.5 Sonnet | 3.6 (4) | 3.8 (3) | 3.5 (5) |
| o3-mini high | 2.6 (4) | 3.6 (3) | 3.5 (4) |
| GPT-4o | 2.4 (2) | 2.6 (1) | — (0) |

</div>

Six of the 32 completed runs contained hallucinations, about 19%. Looking only at the label scores would have missed both those failures and the runs that never finished.

### What I learned

This was a small study of three datasets with manual scoring, so broader comparisons with established annotation methods are still needed. What stayed with me was how convincing an answer could look even when the agent had barely used the data. Reviewing the analysis behind each answer was as important as scoring the labels themselves.

<!-- Figure and table: paper Table 1, page 3; workflow definitions: section 3.2.
Figure source data and regeneration script live in assets/img/projects/cell-annotation/.
The o3-mini tonsil mean is 2.6; 3.6 is its best-run score, not the mean. -->
