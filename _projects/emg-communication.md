---
layout: page
title: EMG-Controlled Communication
permalink: /emg-communication/
description: Translating muscle contractions into Morse code with analog EMG circuitry, adaptive signal processing, and a Python game interface. BE 3100 (MAD Lab).
img: assets/img/projects/emg-communication/morse-interface.jpg
importance: 4
category: class projects
related_publications: false
---

<!-- Sources: emg_project main at 9f34358ba483e6181383eaad7b64628e8f4f5654; BE 3100 EMG Slidecast.pdf, slides 1, 3–7, 11. Interface image extracted from slide 3; circuit image renders slide 4. -->

### Overview

Morse is a communication prototype that turns short and long muscle contractions into dots and dashes. For our BE 3100 final project, we combined an analog electromyography (EMG) circuit with wireless acquisition and an interactive letter-decoding game. The motivation was to explore muscle activity as an alternative input for people who find speech or conventional controls difficult to use.

[Source code](https://github.com/pedrambayat/emg_project)

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/emg-communication/morse-interface.jpg" title="Morse communication interface" alt="Morse code game showing a target letter, live raw and smoothed EMG signals, and the input area" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The Morse game, with a target letter, live EMG signal, and decoded input.
</div>

### My Contribution

I developed the Python/PyQt5 Morse game, integrated incoming Bluetooth Low Energy EMG data with the game's input and decoding logic, and built the calibration tool for recording rest, short flexes, and long flexes. I focused on making the live signal usable in the game, with adjustable detection settings and clear feedback.

### From Muscle Activity to Symbols

The analog circuit conditions the electrode signal through filtering, differential amplification, buffering, rectification, and a final amplification stage. The Arduino streams samples at 1 kHz over Bluetooth Low Energy to a Python application.

A single threshold crossing is a poor representation of a contraction: noise can trigger spurious events, and a sustained flex can briefly dip below threshold. Our software therefore detects contraction segments before interpreting their duration:

1. **Smooth the signal.** A moving average reduces rapid fluctuations, while an adaptive baseline tracks the resting signal between contractions.
2. **Detect a segment.** Activity begins when the smoothed signal exceeds a margin above the baseline. Brief dropouts are tolerated so one flex does not become several symbols.
3. **Reject weak events.** Very short events are discarded, and an accepted segment must spend a sufficiently large fraction of its duration above threshold.
4. **Decode its duration.** The default 100 ms boundary separates dots from dashes. A pause completes the letter, which is checked against the game's target.

The PyQt5 interface provides hints, scoring, and a challenge mode that hides the Morse pattern. A separate calibration tool captures rest, short flexes, and long flexes, then recommends detection thresholds and timing settings. These parameters are adjustable because the resting signal and contraction timing vary between users and recording sessions.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/emg-communication/circuit-design.png" title="EMG circuit and peripheral design" alt="Presentation diagram of EMG filtering, amplification, rectification, Arduino acquisition, and Raspberry Pi motor circuitry" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Our circuit design, from EMG signal conditioning to acquisition and peripheral control.
</div>

### Results

In our classroom evaluation, the system correctly interpreted **39 of 40 trials (97.5%)** across short-flex, long-flex, and no-flex actions. This was a small prototype test; understanding how well it works across users would need a larger study.

The main design challenge was preserving the timing of intentional contractions while suppressing noise. Smoothing and dropout tolerance help stabilize detection, but they also affect measured duration and must be tuned together. Extending the prototype to word entry would require evaluating longer sequences, error correction, fatigue, and performance after recalibration.

### Skills Used

- **Hardware:** analog EMG signal conditioning, Arduino, Raspberry Pi, Bluetooth Low Energy
- **Software:** Python, PyQt5, Bleak, asynchronous event handling
- **Signal processing:** moving averages, adaptive baselines, event segmentation, duration-based decoding
