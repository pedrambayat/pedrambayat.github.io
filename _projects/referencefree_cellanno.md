---
layout: page
title: Reference-free Cell Type Annotation with LLM Agents
permalink: /reference-free-cell-annotation/
description: An LLM agent framework for automated, reference-free cell type annotation in high-resolution spatial transcriptomics data. Published at ICLR 2025 Workshop on Machine Learning for Genomics Explorations (MLGenX).
img: assets/img/publication_preview/mlgenx.png
importance: 3
category: research work
related_publications: false
---

### Overview

A key bottleneck in analyzing single-cell and spatial transcriptomics data is cell type annotation: assigning biological identities to clusters of cells based on their gene expression patterns. The standard workflow requires manually constructing expression signatures and cross-referencing them against curated reference atlases, a process that is slow, labor-intensive, and dependent on expert domain knowledge. Reference atlases may also be unavailable or poorly matched for novel tissues, disease states, or non-model organisms.

This project presents a reference-free approach. Rather than comparing against a fixed atlas, we design a general-purpose bioinformatics LLM agent that autonomously plans and executes its own analysis, querying scientific literature and reasoning from marker genes to assign biologically meaningful cell type labels.

### Agent Design

The agent is built using the [ag2](https://github.com/ag2ai/ag2) library as a single-backbone LLM augmented with tool use and code execution. It is given only a high-level, task-agnostic system prompt with no transcriptomics-specific instructions. The prompt directs it to explore the data by writing and executing Python code, formulate a step-by-step analysis plan, and summarize findings once results are obtained.

The agent has access to four tools wrapping NCBI Entrez EUtils (`get_pubmed_abstracts`, `esearch`, `efetch`, and `esummary`), allowing it to query PubMed for literature on marker genes in real time. Code is executed locally, with outputs returned to the agent in the next message. No user interaction is required after the initial goal specification.

### Evaluation

We evaluated the agent on three Visium HD spatial transcriptomics datasets from 10x Genomics: a human tonsil with reactive follicular hyperplasia, a healthy mouse kidney, and a healthy mouse brain. For each dataset, k-means clustering (k=10) was applied to the raw expression data using the 10x Genomics Loupe browser. The resulting cluster-level differential expression file was passed to the agent, which was asked simply: "What cell type is represented by each cluster?"

Each agent was run five times per dataset to assess stability and hallucination rates. Ground truth labels were determined by human pathologists with access to both gene expression data and histology images. Predictions were scored on a 4-point ordinal scale, where 1 indicates complete misalignment and 4 indicates perfect alignment.

### LLM Benchmarking

We implemented the agent with three frontier LLMs and compared their performance: Claude 3.5 Sonnet, o3-mini (high reasoning), and GPT-4o.

| Model | Tonsil (Avg Score) | Kidney (Avg Score) | Brain (Avg Score) |
|---|---|---|---|
| Claude 3.5 Sonnet | 3.6 | 3.8 | 3.5 |
| o3-mini high | 3.6 | 3.6 | 3.5 |
| GPT-4o | 2.4 | 2.6 | — |

Claude 3.5 Sonnet and o3-mini consistently completed the task with high accuracy across all three tissues. GPT-4o was considerably weaker, completing only 3 out of 15 total runs and producing coarser, less specific labels. Hallucinations occurred in 19% of completed runs across all models, with two common failure modes: tissue-level labels instead of specific cell types, and labels derived from dummy gene signatures rather than the actual data.

The agents demonstrated surprisingly human-like reasoning. For example, Claude correctly identified POU2AF1 as a marker of germinal center B cells in the tonsil, and recognized that upregulation of histone genes HIST1H1B and HIST1H1C indicated high proliferation rates, consistent with the known biology of germinal center B cells. On kidney data, the agent correctly called Cluster 1 "Thick Ascending Limb (TAL) of Loop of Henle" based on established markers Slc12a1 (NKCC2) and Umod (Uromodulin).

### My Contributions

My work on this project centered on the LLM benchmarking pipeline: systematically evaluating how Claude 3.5 Sonnet, o3-mini, and GPT-4o performed on the cell type annotation task across all three tissue datasets. This involved running each model multiple times per dataset, collecting outputs, and assessing completion rates, hallucination patterns, and annotation quality against expert ground truth.

Working on this project gave me hands-on experience writing and iterating on system prompts for LLM agents. Crafting a prompt that was task-agnostic yet effective enough to guide a model through multi-step bioinformatics reasoning was genuinely challenging. Seeing how small changes in prompt structure could dramatically affect agent behavior got me interested in LLM agents more broadly, and that interest has shaped a lot of my work since.

### Skills Used

- LLM agent design and evaluation (ag2, tool use, code execution)
- System prompt engineering
- Spatial transcriptomics (10x Visium HD, Loupe browser)
- Benchmarking frontier LLMs (Claude, GPT-4o, o3-mini)
- Python, NCBI Entrez EUtils, PubMed API

*This work earned the first place prize at the 2025 Penn Immune Health Hackathon and was presented at ICLR 2025 Workshop on Machine Learning for Genomics Explorations (MLGenX). Check it out here:*

[Paper](https://openreview.net/pdf?id=kD8LptrZ7v) \| [OpenReview](https://openreview.net/forum?id=kD8LptrZ7v)