---
title: Auto-Framing Recording Camera
tagline: A real-time, fallback-chained computer vision pipeline for subject detection and tracking, driving a physical two-axis camera rig via a coordinated embedded control loop.
tech: Python, OpenCV, DNN Face Detection, Haar Cascades, Object Tracking, PID Control, Raspberry Pi, systemd
status: completed
date: 2026-06-01
github: https://github.com/Nishant99966/auto-framing-camera
demo:
---

## Problem

Build a subject-detection pipeline accurate and fast enough to drive physical hardware in real time — where a missed or delayed detection isn't just a metric that dips, it's a camera visibly losing its subject — and pair it with a control system that turns that detection into smooth, stable physical movement.

## Pipeline Overview

| Stage | What it does |
|---|---|
| Frame capture | Continuous capture via `picamera2`, with an automatic OpenCV `VideoCapture` fallback for non-Pi hardware |
| Primary detection | DNN frontal-face model, run every N frames |
| Fallback detection | Profile-face cascade (both directions) → upper-body cascade, only if the DNN pass finds nothing |
| Inter-frame tracking | CSRT/KCF/MOSSE tracker carries the position forward between detection passes |
| Output | Position normalized to [0, 1] on both axes, sent as structured JSON to the control system |

## The detection fallback chain

A single detector is a single point of failure — if the primary detector misses, the system either freezes or loses the subject. This pipeline tries three detectors in order, only falling through to the next if the previous one finds nothing:

1. **DNN frontal-face detector** (`cv2.dnn`, Caffe SSD model) — fast and accurate for the common case of a subject facing the camera.
2. **Haar-cascade profile-face detector** — most profile cascades are trained on one facing direction only. Rather than needing two separately trained models, the pipeline runs the cascade once on the normal frame and once on a horizontally flipped copy, catching both left- and right-facing profiles from a single trained cascade.
3. **Haar-cascade upper-body detector** — the last resort for cases where the face itself isn't usable (extreme angle, partial occlusion, motion blur) but the subject's outline still is.

**The actual fallback logic, from `control_app/face_detection/face_detection_thread.py`:**

```python
def _detect_best_target(self, frame_rgb, net, profile_face_cascade, upperbody_cascade):
    sx = frame_rgb.shape[1] / self._detect_width
    sy = frame_rgb.shape[0] / self._detect_height
    small = cv2.resize(frame_rgb, (self._detect_width, self._detect_height))
    small_gray = cv2.cvtColor(small, cv2.COLOR_RGB2GRAY)

    result = self._detect_dnn_face(small, net)
    if result is None:
        result = self._detect_profile_face(small_gray, profile_face_cascade)
    if result is None:
        result = self._detect_upper_body(small_gray, upperbody_cascade)

    if result is None:
        return None

    x, y, w, h, score, label = result
    return (int(x * sx), int(y * sy), int(w * sx), int(h * sy), score, label)
```

The profile-detector's flip trick — catching both facing directions from a cascade trained on only one:

```python
def _detect_profile_face(self, gray, profile_face_cascade):
    gray_eq = cv2.equalizeHist(gray)
    candidates = []

    faces = profile_face_cascade.detectMultiScale(
        gray_eq, scaleFactor=1.05, minNeighbors=4, minSize=(40, 40)
    )
    for (x, y, w, h) in faces:
        candidates.append((x, y, w, h, float(w * h), "profile_face_left"))

    flipped = cv2.flip(gray_eq, 1)
    faces_flipped = profile_face_cascade.detectMultiScale(
        flipped, scaleFactor=1.05, minNeighbors=4, minSize=(40, 40)
    )
    frame_width = gray.shape[1]
    for (x, y, w, h) in faces_flipped:
        x_original = frame_width - (x + w)
        candidates.append((x_original, y, w, h, float(w * h), "profile_face_right"))

    if not candidates:
        return None
    return max(candidates, key=lambda c: c[4])
```

## Tracker-assisted frame skipping

Running all three detectors on every frame would be too slow for real-time performance on Raspberry Pi-class hardware. Instead, an OpenCV object tracker (CSRT, with automatic fallback to KCF or MOSSE depending on what the OpenCV build supports) takes over between detection passes — interpolating the subject's bounding box using motion continuity rather than re-running detection. The full detection chain only re-runs every N frames (configurable), which is what keeps the compute budget under control without sacrificing responsiveness.

## Turning detection into control

The normalized position output feeds a control system running on a separate microcontroller (ESP32), connected over a documented UART/JSON protocol:

```
{"type": "face_position", "data": {"x": 0.2, "y": 0.05}}
```

On the control side, an independent PID loop per axis converts position error into motor commands — a stepper for pan, a servo for tilt — with a small deadzone to avoid the motors hunting around the setpoint in response to detection noise, and integral reset whenever the target is lost (preventing windup during tracking gaps). Gains are tunable live from a web dashboard, sent as `config` messages over the same serial link, rather than requiring a firmware re-flash for every adjustment during tuning.

## Deployment

The full pipeline runs as a `systemd` service on the Raspberry Pi, starting automatically on boot. If the serial link to the control board isn't available, the app falls back to a mock writer rather than crashing — so the detection pipeline and its web interface stay testable even with the physical rig disconnected.

## How you'd build this yourself

1. Start with OpenCV's pretrained DNN face detector (Caffe SSD, freely available) — for many use cases this alone is enough.
2. Add a Haar-cascade fallback only once you actually need robustness to profile views or occlusion; it adds complexity that isn't always necessary.
3. Add tracker-assisted frame-skipping once detection speed becomes the bottleneck, not before — it's an optimization, not a starting requirement.
4. Keep the interface between vision and control minimal and explicit (a small JSON schema) so the two sides can be built, tested, and iterated on independently.

## Result

A detection pipeline that stays locked onto a subject through frontal, profile, and partially-occluded poses instead of failing the moment the primary detector misses a frame — fast enough to run continuously on Raspberry Pi-class hardware — feeding a physical control loop that keeps the subject centered in real time, with PID gains tunable on the fly from a browser.

## Full source

The complete codebase — detection pipeline, ESP32 firmware, web tuning dashboard, deployment scripts, and setup instructions — is on GitHub: **[nishant99966/auto-framing-camera](https://github.com/Nishant99966/auto-framing-camera)**.
