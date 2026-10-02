---
layout: page
title: Arduino Spectrophotometer
permalink: /spectrophotometer/
description: An Arduino optical measurement instrument with calibration-based concentration estimation, an LCD interface, and a Ferrari F1-inspired enclosure.
img: assets/img/projects/spectrophotometer/ferrari-f1-prototype.png
importance: 7
category: class projects
related_publications: false
---

{% comment %}
Firmware source: spectrophotometer main at 6b3b78ada0f7448ad9af89f772dc6a1a75be80ac, spec_FINAL.ino.
Prototype photograph supplied by Pedram, who confirmed that the team styled the enclosure after a Ferrari F1 car.
Personal responsibilities are documented in the vault's Career/Misc Applications/Neuralink.md.
{% endcomment %}

### Overview

We built a standalone spectrophotometer around an Arduino, LED, and photoresistor. Insert a sample, press a button, and the instrument estimates its concentration on an LCD. The project brought together the measurement circuit, calibration, and a simple interface.

We also gave the instrument a **Ferrari F1-inspired enclosure**: a red body, black wheels, and a front wing, with the LCD mounted above the main housing. We called it **Cuvette Leclerc**.

<div class="row justify-content-sm-center">
  <div class="col-sm-8">
    {% include figure.liquid loading="eager" path="assets/img/projects/spectrophotometer/ferrari-f1-prototype.png" alt="Assembled Arduino spectrophotometer styled as a red Ferrari Formula 1 car, with black wheels, a front wing, a sample opening, and a raised LCD housing" title="Ferrari F1-inspired spectrophotometer" class="img-fluid rounded" caption="Meet Cuvette Leclerc: our Arduino spectrophotometer in a Ferrari F1-inspired enclosure, with a raised LCD and integrated sample access." %}
  </div>
</div>

[Source code](https://github.com/pedrambayat/spectrophotometer)

### My Contribution

I designed the measurement circuit, wrote the Arduino code to process the optical signal and estimate concentration, and built the device enclosure using CAD and laser cutting.

### Measurement and Calibration

The photoresistor forms part of a voltage-divider circuit read through an Arduino analog input. The firmware collects repeated readings and converts the measured voltage to a resistance estimate using the known supply voltage and fixed resistance.

It then computes a logarithmic signal relative to a stored blank measurement. A linear calibration maps that signal to concentration using a fitted slope and intercept. I stored the blank measurement and calibration values from four points in the firmware.

The measurement sequence is:

1. Acquire repeated analog readings when the measurement button is pressed.
2. Convert the readings to voltage and then to a photoresistor resistance estimate.
3. Compare the sample signal with the blank and apply the calibration equation.
4. Display the concentration estimate and an uncertainty interval on the LCD, with serial output for inspection.

### Using the instrument

The interface includes debounced power control, separate measurement input, a reading-in-progress message, and audible feedback. Its threshold logic distinguishes estimates above or below a chosen cutoff from cases where the calculated interval overlaps that cutoff. That third state makes uncertainty part of the interface instead of hiding it behind a binary result.

This was a classroom prototype. Before using it for quantitative measurements, I'd revisit the sampling and uncertainty calculations, recalibrate it, and compare repeated readings with a reference instrument.

### Skills Used

- **Embedded programming:** Arduino C++, analog acquisition, button state handling
- **Instrumentation:** LED/photoresistor sensing, voltage dividers, blank normalization
- **Mechanical design and fabrication:** CAD, laser cutting, enclosure assembly
- **Analysis and interaction:** linear calibration, uncertainty reporting, LCD and audible feedback
