---
layout: page
title: Biosecurity Policy Enforcement for AI Protein Design Agents
permalink: /bio-sentry-agent/
description: A policy-as-code biosecurity guardrail for AI-driven DNA synthesis agents, built with Cedar policies and the Sondera Harness SDK. Won first place at the Sondera AI hackathon.
img: assets/img/bio-sentry.png
importance: 4
category: research work
related_publications: false
---

[GitHub](https://github.com/pedrambayat/bio-sentry-agent)

### The Problem

AI-assisted protein design tools are rapidly closing the gap between knowing a protein's function and being able to synthesize it. The choke point in this pipeline is the DNA synthesis order: companies use biosecurity screening software (BSS) to flag genes encoding proteins of concern before fulfillment. But a 2025 paper in *Science* (Wittmann, Horvitz et al.) showed that this defense is already breaking down. Using freely available generative protein design tools like ProteinMPNN and EvoDiff, the authors generated 76,080 synthetic variants of 72 proteins of concern and sent them through the screening tools used by four major synthesis providers. The tools, which were designed to catch known sequences and their close relatives, largely failed: many high-confidence variants with predicted wild-type-like function passed through undetected. The vulnerability was serious enough that the authors treated it as a biological zero-day and disclosed it to DHS, NIST, OSTP, and the International Gene Synthesis Consortium before publication.

The response has been to patch the screening software, and detection rates have improved. But the underlying dynamic is structural: sequence-based screening is reactive, and generative design tools will continue to produce sequences further and further from any known threat. As the paper puts it, "sequence-based biosecurity screening alone is unlikely to remain sufficient."

Bio-Sentry addresses a related and compounding problem: what happens when the entity placing the order is not a human but an AI agent. An agent automating synthesis orders can be prompted, manipulated via prompt injection, or simply misconfigured to request dangerous sequences. If the only check is the LLM's own judgment, that check can be bypassed. The guardrail needs to sit below the model, at the tool call level, where it operates on structured data the model cannot rewrite.

### Approach

Bio-Sentry enforces biosecurity policy at the tool call level using Cedar, a policy-as-code language developed by AWS. The enforcement layer intercepts tool calls before they execute and adjudicates them against a defined policy, independent of what the LLM says or believes.

The agent is built as a LangGraph ReAct agent integrated with the Sondera Harness SDK, which provides the Cedar policy enforcement middleware. The middleware runs in `STEER` mode: when a tool call is denied, the reason is injected back into the model's context, steering it toward compliance rather than simply blocking it silently.

The pipeline is two tools:

1. `biosecurity_screener` — takes a protein sequence and computes its maximum homology score against a threat database (Ricin A-Chain, Abrin A-Chain, Shiga Toxin 1A) using Smith-Waterman local alignment with a BLOSUM62 substitution matrix. Returns a normalized score, the threat name, and a verdict.

2. `synthesis_order` — places the order with a synthesis provider. Intercepted by the Cedar policy before execution.

The Cedar policy enforces a three-tier risk model based on the homology score passed as a tool parameter:

- Green (score up to 250): permit automatically
- Amber (251 to 400): require explicit human approval
- Red (above 400): deny unconditionally

Because Cedar reads the score directly from the tool call parameters rather than from the LLM's reasoning, a model cannot fabricate a passing score to bypass enforcement.

### Evaluation

The eval suite has three tiers:

- Cedar-direct tests (14 cases): test the policy layer in isolation, no LLM involved. Covers boundary conditions at 250/251 and 400/401, amber/red behavior, and POST_TOOL audit logging.
- Screener unit tests (10 cases): validate the alignment scoring against known sequences (GFP scores 0.048, exact Ricin scores near 1.0), case normalization, and integer scaling.
- Integration tests (3 cases): run full prompts through the agent and check for correct block/allow outcomes.

All 24 tests pass.

### What I Learned

This was my first time working with policy-as-code and thinking seriously about AI agent security. The core insight is that LLM-level safety measures are brittle because they operate in the same reasoning layer that can be manipulated. Enforcement needs to happen at a layer the model cannot reach. Cedar makes this concrete: the policy is evaluated against structured data extracted from tool calls, not against natural language.

Working with the Sondera Harness SDK gave me hands-on experience with a real agent governance framework, and the hackathon context meant building and iterating fast. Winning was a bonus.

### Skills Used

- LangGraph ReAct agent architecture
- Cedar policy-as-code (policy authoring, schema design)
- Sondera Harness SDK (CedarPolicyHarness, SonderaHarnessMiddleware)
- Smith-Waterman local alignment, BLOSUM62 (Biopython)
- LLM agent security and adversarial robustness
- Python, FastAPI
