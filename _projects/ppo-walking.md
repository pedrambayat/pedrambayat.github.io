---
layout: page
title: Learning to Walk with PPO
permalink: /ppo-walking/
description: Implementing PPO and a standing-to-walking curriculum for simulated locomotion. ESE 6500 (Learning in Robotics).
img: assets/img/projects/ppo-walking/rollout.png
importance: 2
category: class projects
related_publications: false
---

For ESE 6500 at Penn, I implemented **Proximal Policy Optimization (PPO)** in PyTorch to control a walker in the DeepMind Control Suite. When I trained it directly on walking, it learned to scoot along the ground instead. I explored whether first learning to stand could provide a better starting point for upright locomotion.

<div class="row justify-content-sm-center">
  <div class="col-sm-7">
    {% include figure.liquid loading="eager" path="assets/img/projects/ppo-walking/rollout.png" alt="Simulated walker balancing upright with one leg extended during a walking rollout" title="Walking after standing pretraining" class="img-fluid rounded z-depth-1" caption="A frame from the walking policy after initialization from a trained standing policy." %}
  </div>
</div>

### Building the controller

The policy receives a **24-dimensional observation** containing body orientations, torso height, and velocities, and produces six bounded continuous actions. I implemented a Gaussian actor with three hidden layers and a separate value network with two hidden layers, both using 128-unit layers and tanh activations. Actions are squashed through tanh; the policy likelihood includes the corresponding change-of-variables correction.

Training combines PPO's clipped policy objective with **generalized advantage estimation** to use the critic's predictions when estimating which actions helped. I used a clipping threshold of 0.2, a discount factor of 0.99, and a GAE parameter of 0.95. Each update collects 4,000 environment steps, then optimizes the actor and critic with separate Adam optimizers and shuffled minibatches.

To keep training stable, I used a few practical measures: running observation normalization puts sensor channels on comparable scales, gradient clipping bounds large updates, and approximate-KL early stopping limits how far the policy moves during an update. Checkpoints preserve the actor, critic, normalization statistics, and recorded training returns.

### From scooting to walking

Training the walking task from scratch produced a low, scooting behavior. To change the starting behavior, I first trained on the standing task, then transferred the actor, critic, and observation normalizer to walking. Because the standing policy had reduced its exploration noise, I reset its learned log standard deviation to **−0.5** when switching tasks.

Learning to stand first gave the walker a better starting point. It moved upright and earned higher returns than the policy trained from scratch, though training was still uneven, with occasional large drops in reward.

<div class="row">
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/projects/ppo-walking/stand-returns.png" alt="Standing training returns across three million environment steps" title="Standing pretraining" class="img-fluid rounded z-depth-1" caption="Stage 1: learn to stand." %}
  </div>
  <div class="col-sm-6">
    {% include figure.liquid path="assets/img/projects/ppo-walking/walk-scratch-returns.png" alt="Walking training returns from scratch across three million environment steps" title="Walking from scratch" class="img-fluid rounded z-depth-1" caption="Comparison: train directly on walking." %}
  </div>
</div>

{% include figure.liquid path="assets/img/projects/ppo-walking/walk-warm-start-returns.png" alt="Walking training returns after standing pretraining, rising above nine hundred with intermittent drops" title="Walking after standing pretraining" class="img-fluid rounded z-depth-1" caption="Stage 2: walking after standing pretraining. The horizontal axis counts only the walking stage." %}

### Results

These are the average training returns over the **last 25 epochs** of each run. Each row represents a single training run.

| Run | Environment steps | Mean training return, last 25 epochs |
| :--- | :--- | ---: |
| Standing | 3 million | 779.0 |
| Walking from scratch | 3 million | 537.1 |
| Walking after standing | 3 million standing + 3 million walking | 881.7 |

Standing pretraining doubled the total interaction budget, so this wasn't an equal-budget comparison. I'd want to repeat it across seeds with matched budgets before making a claim about sample efficiency.

Watching the walker mattered as much as watching its reward curve. Scooting earned points, but it wasn't the behavior I wanted; learning to stand first helped close that gap.

<!--
Provenance in the hw-sp26 repository:
- Implementation: ese650/hw4/code/walker.py
- Method and behavior account: ese650/hw4/docs/hw4.tex, lines 85–180.
- Figures copied unchanged from ese650/hw4/figs/walker/:
  walker_rollout_frame_05.png, walker_ppo_returns_stand.png,
  walker_ppo_returns_walk_scratch.png, walker_ppo_returns_walk.png.
- Table computed from the mean of the last 25 entries of `returns` in:
  ese650/hw4/models/walker_ppo_policy_stand.pt: 778.9787875325518
  ese650/hw4/models/walker_ppo_policy_walk_scratch.pt: 537.1029764521928
  ese650/hw4/models/walker_ppo_policy_walk.pt: 881.718722352528
  Each checkpoint records 3,000,000 steps and 750 training epochs.
-->
