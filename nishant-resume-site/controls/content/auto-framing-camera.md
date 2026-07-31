---
title: Auto-Framing Recording Camera
tagline: Two-axis motorized camera mechanism with a real-time embedded control loop for subject tracking.
tech: Raspberry Pi 5, ESP32, UART, Python, OpenCV, C++
status: completed
date: 2026-06-01
github:
demo:
---

## Problem

Build a hardware-software system that automatically keeps a moving subject centered in frame
without manual camera operation — requiring reliable, low-latency communication between a
vision-processing unit and a motorized physical mechanism.

## Approach

Developed a real-time computer-vision pipeline in Python/OpenCV running on a Raspberry Pi 5 to
detect and track subject position frame-by-frame. Positional data was transmitted over UART
serial communication to an ESP32, which converted these commands into motor control signals
driving a motorized two-axis (pan-tilt) mechanism to keep the subject framed.

> **Field note:** The trickiest part wasn't the vision pipeline itself — it was tuning the
> control response so the mechanism tracked smoothly without overshoot or jitter, which took
> several rounds of real-world testing and adjustment.

## System Overview

| Layer | Component | Role |
|---|---|---|
| Perception | Raspberry Pi 5 + OpenCV | Detects subject, computes positional offset |
| Communication | UART Serial | Transmits positional commands to embedded controller |
| Actuation | ESP32 + motors | Drives two-axis pan-tilt mechanism |

## Result

Delivered a working hardware-software prototype — translating a functional tracking requirement
into a closed-loop system refined through iterative real-world testing to improve tracking
accuracy and mechanical responsiveness.
