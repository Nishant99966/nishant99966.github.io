---
title: Auto-Framing Recording Camera
tagline: A Raspberry Pi + ESP32 camera system that detects a person and drives a two-axis pan-tilt mechanism to keep them framed, with a live-tunable PID control loop.
tech: Raspberry Pi, ESP32, OpenCV, AccelStepper, PID Control, UART Serial, Flask, Python, C++ (Arduino)
status: completed
date: 2026-06-01
github: https://github.com/Nishant99966/auto-framing-camera
demo:
---

## Problem

Build a system that automatically keeps a moving subject centered in frame — without a human operator — by combining real-time computer vision on one processor with real-time motor control on another, coordinated over a serial link with no shared memory or clock.

## System Architecture

| Stage | Hardware | Role |
|---|---|---|
| Detection | Raspberry Pi + camera module | Locates the subject in each frame, outputs a normalized (x, y) position |
| Communication | UART serial, JSON-over-newline | Carries position updates and live PID config between the two boards |
| Control | ESP32 | Runs a dual-axis PID loop and drives the pan-tilt hardware |
| Actuation | 4-wire stepper (pan) + servo (tilt) | Physically moves the camera to re-center the subject |

The Pi and ESP32 share no clock and no memory — the only contract between them is a documented JSON message format sent over serial, one message per line:

```
{"type": "face_position", "data": {"x": 0.2, "y": 0.05}}
{"type": "config", "data": {"p_pan": 3.58, "i_pan": 0.57, "d_pan": 0.79, "p_tilt": 2.04, "i_tilt": 0.92, "d_tilt": 0.23, "target": {"x": 0.25, "y": 0.25}}}
```

## Detection side (Raspberry Pi)

Rather than relying on a single detector, the Pi runs a fallback chain, tried in order until one succeeds:

1. **DNN frontal-face detector** — an OpenCV `cv2.dnn` model (Caffe SSD), the primary detector, fastest and most accurate when the subject is facing the camera.
2. **Haar-cascade profile-face detector** — triggered only if the DNN detector finds nothing. Run once on the normal frame and once on a horizontally flipped copy, so it catches both left- and right-facing profiles without needing two separately trained cascades.
3. **Haar-cascade upper-body detector** — the last resort, for cases where the face itself isn't usable (poor angle, partial occlusion, motion blur) but the subject's outline still is.

Between detection passes, an OpenCV tracker (CSRT, falling back to KCF or MOSSE depending on what's available in the OpenCV build) interpolates the subject's position, so the expensive detectors only run every N frames rather than every frame — the difference between the Pi keeping up with the video feed and falling behind it.

## Control side (ESP32)

The ESP32 receives the normalized face position over serial and runs an independent PID loop per axis:

- **Pan axis** — driven by a 4-wire stepper motor (via the AccelStepper library), with its own acceleration/speed profile so movement is smooth rather than jerky.
- **Tilt axis** — driven by a servo, with the PID output directly adjusting the commanded angle.

Each loop computes error as `target − face_position`, applies a small deadzone (~0.02 normalized units) to avoid hunting around the setpoint from detection noise, then computes the standard proportional + integral + derivative terms using a measured `dt` between serial messages. When no face is detected, the integral terms are reset to prevent windup from accumulating during a tracking gap. Gains for both axes (Kp, Ki, Kd) are not hardcoded — they arrive over the same serial link as a `config` message, so they can be changed live without re-flashing the board.

**The core PID loop, from the ESP32 firmware (`ESP/movement_esp/movement_esp.ino`):**

```cpp
panError  = targetX - faceX;
tiltError = targetY - faceY;

// Deadzone — ignore small errors from detection noise
if (abs(panError) < 0.02)  panError = 0;
if (abs(tiltError) < 0.02) tiltError = 0;

// PID terms
panIntegral  += panError * dt;
tiltIntegral += tiltError * dt;

float panDerivative  = (panError - previousPanError) / dt;
float tiltDerivative = (tiltError - previousTiltError) / dt;

float panOutput  = (p_pan * panError)   + (i_pan * panIntegral)   + (d_pan * panDerivative);
float tiltOutput = (p_tilt * tiltError) + (i_tilt * tiltIntegral) + (d_tilt * tiltDerivative);

previousPanError  = panError;
previousTiltError = tiltError;

// Stepper (pan) — accumulate output into a bounded target position
targetPosition += panOutput;
targetPosition = constrain(targetPosition, PAN_MIN, PAN_MAX);
stepper.moveTo(targetPosition);

// Servo (tilt) — output directly adjusts the commanded angle
servoAngle -= tiltOutput;
servoAngle = constrain(servoAngle, 0, 90);
tiltServo.write(servoAngle);
```

When no face is detected, both integral terms are explicitly reset before the loop returns, so a tracking gap doesn't leave the integral term "wound up" and cause a lurch once the subject is reacquired:

```cpp
if (doc["data"]["x"].isNull() || doc["data"]["y"].isNull()) {
    panIntegral = 0;
    tiltIntegral = 0;
    previousPanError = 0;
    previousTiltError = 0;
    return;
}
```

## The tuning interface

A Flask web app running alongside the detection pipeline on the Pi exposes a live tuning dashboard: sliders for Kp/Ki/Kd per axis (pan and tilt tuned independently), and a 2D pad for setting where in the frame the subject should be held (not necessarily dead-center). Moving a slider sends an updated `config` message over serial immediately — the ESP32 picks up new gains on the next loop iteration, so you can watch the physical response change in real time while tuning, rather than the usual embedded-systems cycle of edit → recompile → reflash → test.

## Deployment

The Pi side runs as a `systemd` service (`control-app.service`), so it starts automatically on boot and restarts on failure — no manual step needed after a power cycle. If the serial connection to the ESP32 isn't available (unplugged, wrong port, etc.), the app falls back to a mock serial writer rather than crashing, so the detection and web UI stay usable even with the hardware disconnected — useful for development away from the physical rig.

## How you'd build this yourself

1. **Hardware**: Raspberry Pi + camera module, ESP32, a 4-wire stepper for pan, a servo for tilt, and a basic pan-tilt mechanical mount.
2. **Detection**: start with OpenCV's pretrained DNN face detector (Caffe SSD model, freely available) for the primary case; add a Haar cascade fallback only if you need robustness to profile views or partial occlusion — for many use cases the DNN detector alone is enough.
3. **Communication**: define a minimal JSON schema up front (position + config messages, newline-delimited) — this is what lets the vision side and the control side be developed and tested independently.
4. **Control**: a basic PID loop per axis is enough to start; add a deadzone once you see the setpoint being chased by detection noise, and add integral reset on lost-target events once you see windup after a tracking gap.
5. **Tuning**: exposing PID gains as a runtime-configurable message (rather than hardcoded constants) is a small change that saves enormous iteration time — you can tune with the rig running instead of re-flashing between every gain change.

## Result

A working closed-loop tracking system: the Pi detects and tracks a subject through frontal, profile, and partially-occluded poses, sends normalized position data over serial, and the ESP32 keeps the subject centered by adjusting pan and tilt in real time — with gains tunable live from a web dashboard rather than requiring firmware re-flashes during development.

## Full source

The complete codebase — detection pipeline, ESP32 firmware, web tuning dashboard, deployment scripts, and setup instructions — is on GitHub: **[nishant99966/auto-framing-camera](https://github.com/Nishant99966/auto-framing-camera)**.
