---
title: Auto-Framing Recording Camera
tagline: Real-time computer-vision pipeline for subject detection and tracking, driving a physical camera mechanism.
tech: Python, OpenCV, Real-time CV, Raspberry Pi 5, UART
status: completed
date: 2026-06-01
github:
demo:
---

## Problem

Build a real-time subject-detection pipeline accurate and fast enough to drive physical hardware
— where any lag or false detection produces an immediately visible tracking error, unlike offline
vision tasks with more forgiving latency budgets.

## Approach

Built a Python/OpenCV pipeline processing live camera frames on a Raspberry Pi 5, detecting and
localizing the subject in real time, and converting detections into positional commands.
Integrated the vision output with embedded hardware (an ESP32 over UART serial) to close the loop
between perception and physical actuation of a two-axis camera mechanism.

> **Field note:** Getting detection latency low and stable enough for smooth real-world tracking
> mattered more than raw accuracy — a slightly-less-precise but consistently fast pipeline
> outperformed a more accurate but jittery one.

## Pipeline Breakdown

| Stage | Function |
|---|---|
| Frame capture | Continuous live video input from camera module |
| Detection | OpenCV-based subject detection per frame |
| Position mapping | Converts detected coordinates into positional offset commands |
| Transmission | Sends commands over UART to embedded controller for actuation |

## Result

Delivered a working end-to-end perception-to-actuation pipeline, refined through iterative
real-world testing to improve tracking robustness, detection consistency, and system
responsiveness.
