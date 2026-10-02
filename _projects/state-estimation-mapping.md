---
layout: page
title: State Estimation and Mapping
permalink: /state-estimation-mapping/
description: Estimating orientation from inertial sensors and building LiDAR maps with quaternion and particle filters. ESE 6500 (Learning in Robotics).
img: assets/img/projects/state-estimation-mapping/slam-map-00.jpg
importance: 3
category: class projects
related_publications: false
---

### Overview

For **ESE 6500: Learning in Robotics**, I built two estimators: an unscented Kalman filter (UKF) to estimate orientation from inertial sensors, and a particle filter to build maps from LiDAR. Both projects involved getting noisy measurements, coordinate frames, and uncertainty to work together.

### Quaternion Sensor Fusion

I implemented a UKF that estimates orientation and angular velocity from accelerometer and gyroscope readings, using the course-supplied quaternion utility. The first step was calibration: I estimated accelerometer offsets using Vicon reference orientations during stationary windows, estimated gyroscope offsets from the zero-rate assumption, and corrected the gyroscope's axis ordering. The calibration constants average estimates from all three available recordings.

The filter represents orientation with a unit quaternion and uncertainty with a six-dimensional covariance over rotation perturbations and angular velocity. Twelve sigma points propagate through the rotational dynamics. An iterative quaternion average recovers the predicted orientation, and the measurement update compares predicted body-frame gravity and angular velocity with calibrated sensor readings. This keeps the orientation updates consistent with rotational geometry while incorporating both sensors.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/state-estimation-mapping/ukf-vicon-03.png" title="UKF orientation compared with Vicon" alt="Three time-series panels comparing UKF and Vicon roll, pitch, and yaw on recording 3; yaw diverges substantially." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Recording 3: roll and pitch broadly track Vicon, while yaw shows substantial drift. Abrupt jumps also reflect the wrapped Euler-angle display.
</div>

I compared roll, pitch, and yaw against Vicon for all three recordings. Roll and pitch track the reference substantially better than yaw: gravity constrains tilt but provides no absolute heading measurement. The third recording makes that limitation particularly visible. I used the same three recordings for calibration, tuning, and these comparisons.

### Particle-Filter LiDAR Mapping

The mapping implementation maintains 50 particles over planar position and heading. Each iteration applies a motion increment with Gaussian noise, transforms LiDAR points into the world frame through the sensor calibration, and scores particles by scan overlap with occupied map cells. Weights are normalized in log space, and stratified resampling is triggered when the effective particle count falls below 30% of the population.

The highest-weight particle updates a shared grid with 0.5-meter cells. For the motion input, I used differences between the supplied KITTI reference poses.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/state-estimation-mapping/slam-map-00.jpg" title="LiDAR map for sequence 00" alt="Occupied-cell map accumulated from LiDAR observations on KITTI sequence 00." class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/state-estimation-mapping/slam-trajectory-00.jpg" title="Particle-filter trajectory for sequence 00" alt="Particle-filter trajectory in red compared with the supplied reference-pose trajectory in blue, with visible deviations." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Map and trajectory for KITTI sequence 00. Blue shows the reference trajectory used for motion inputs; red shows the filter estimate. Map axes are grid indices.
</div>

### What I learned

I generated maps and trajectories for sequences **00–03**. The maps recover visible environmental structure, although the estimated paths still deviate from the reference. The grid records occupied endpoints only, so white cells are unobserved rather than confirmed empty.

These projects helped me understand why an estimator can look good in some directions and drift in others. Gravity gives the orientation filter a useful tilt reference, but no absolute heading; the mapping filter likewise depends on the motion information it's given.

**Tools and methods:** Python, NumPy, Matplotlib, quaternion kinematics, unscented Kalman filtering, particle filtering, LiDAR coordinate transforms, log-odds mapping, and stratified resampling.
