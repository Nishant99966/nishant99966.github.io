
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Combustion Phasing, CA50, Pmax, MPRR and Diesel Noise</h1>
<p><em>How to locate the efficient combustion window without exceeding mechanical, emissions or harshness limits</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Combustion phasing has several important limits

The calibration target is not simply “earlier is better.”

Important pressure-based metrics include:

- CA50;
- Pmax;
- maximum pressure-rise rate;
- IMEP.

# 2. CA50

CA50 is the crank angle where 50% of cumulative apparent heat release has occurred.

Too-late phasing can increase:

- BSFC;
- EGT;
- late burn.

Too-early phasing can increase:

- compression work;
- Pmax;
- MPRR;
- NOx.

# 3. Pmax

Peak cylinder pressure is constrained by engine hardware.

The release calibration needs margin for:

- sensor uncertainty;
- production variation;
- fuel variation;
- cylinder spread;
- transient overshoot.

# 4. MPRR

Maximum pressure-rise rate can be represented as:

$$
MPRR
=
\max\left(\frac{dp}{d\theta}\right)
$$

High MPRR can increase combustion harshness and structural excitation.

# 5. Diesel knock terminology

A diesel can sound harsh when a large amount of premixed fuel autoignites quickly after a long ignition delay.

It is clearer to discuss:

- ignition delay;
- premixed heat release;
- MPRR;
- combustion noise.

This avoids confusing compression-ignition harshness with spark-ignition end-gas knock.

# 6. Cylinder statistics

Track:

- maximum cylinder Pmax;
- maximum MPRR;
- CA50 spread;
- IMEP spread;
- EGT spread.

The worst cylinder, not the average, can define the release boundary.

# 7. Phasing optimization table

| Variable | Interpretation |
|---|---|
| CA10 | combustion onset |
| CA50 | main phasing |
| CA90 | late burn |
| Pmax | mechanical loading |
| MPRR | harshness / excitation |
| IMEP | indicated work |
| NOx | temperature/phasing penalty |
| smoke/PM | mixing/late-burn penalty |
| EGT | exhaust-energy shift |

# 8. Speed dependence

The optimum phasing window can change with speed because time per crank-angle degree changes and the spray/mixing process changes.

That is why a heavy-duty engine needs a phasing map across the full speed-load range.

# 9. Pressure-measurement quality

Before changing maps, verify:

- TDC offset;
- encoder resolution;
- pressure pegging;
- thermal drift;
- cycle count.

A small TDC error can create a misleading CA50 shift.

# 10. Speed-load phasing map

A practical phasing target is often a base surface:

$$
CA50_{target}
=
f(n_e,BMEP)
$$

with corrections for:

- EGR;
- intake temperature;
- fuel quality;
- injection pressure;
- thermal mode.

The target should be a result of measured optimization, not a universal textbook angle.

# 11. High-load pressure-limited region

At high torque:

```text
timing advance
→ efficiency may improve
→ Pmax rises
```

If Pmax becomes active before the efficiency optimum, possible alternatives include:

- rate-shape change;
- higher/lower injection pressure;
- air/EGR change;
- slightly later CA50.

The best response is the one with the lowest total emissions/efficiency/durability cost.

# 12. Pressure-rise-rate shaping

If MPRR is limiting while Pmax remains acceptable, pilot strategy or early main rate shape may reduce the sharp premixed burn without requiring a large overall retard.

This is a more targeted correction than moving the whole combustion event late.

# 13. Statistical release margin

Release against:

```text
worst cylinder
+
measurement uncertainty
+
production variation
```

not merely the mean cylinder on one development engine.

# 14. Combustion noise, torsional vibration and low-speed lugging

Modern downspeeding places high cylinder torque at low engine speed.

The engine, flywheel, clutch damper, gearbox and driveline form a torsional system.

A simple two-inertia intuition is:

$$
f_n
\approx
\frac{1}{2\pi}
\sqrt{\frac{k_t}{J_{eq}}}
$$

Real development uses a multi-inertia model and measured torsional response.

Combustion calibration affects excitation through:

- firing-order torque pulses;
- cylinder imbalance;
- MPRR;
- misfire;
- very early heat release.

At HD13-E point B, a timing change that improves BSFC but raises MPRR and driveline torsional amplitude may be unacceptable.

# 15. Calibration execution standard

## Objective

Locate the efficient combustion window while preserving mechanical and NVH margin.

## Calibration objects

- CA50/main SOI target;
- pilot strategy;
- injection pressure/rate shape;
- Pmax/MPRR limit correction.

## Signals to log

```text
CA10/50/90
Pmax each cylinder
MPRR each cylinder
IMEP spread
torsional / crank-speed signal where available
BSFC
NOx
smoke
```

## Selection rule

Use the worst cylinder plus uncertainty/production margin, not the mean cylinder.

# 16. Senior calibration deep dive — constraint hierarchy

The optimum should report *which constraint became active first*.

A typical candidate ranking can be:

```text
timing 1: BSFC poor, all margins large
timing 2: BSFC better, acceptable
timing 3: BSFC best, Pmax close to limit
timing 4: no BSFC gain, MPRR/NOx worse
```

The release point may deliberately be timing 2 rather than timing 3 to gain production and fuel-quality robustness.

## Cycle variability

At low load, mean CA50 can hide unstable combustion.

Also track:

- standard deviation of IMEP;
- CA50 standard deviation;
- partial-burn/misfire indicators.

## Low-speed lugging validation

At point B, perform slow torque ramps in a high gear and monitor:

- MPRR;
- torsional vibration;
- driver-perceived boom/rumble;
- gearbox rattle where instrumented.

The lower usable engine speed is a powertrain-NVH boundary, not only an engine torque boundary.

# 17. Common mistakes

- Calling diesel combustion harshness SI knock.
- Optimizing CA50 without checking brake efficiency.
- Using average Pmax when one cylinder is limiting.
- Advancing SOI until the mechanical limit rather than balancing emissions and efficiency.
- Trusting cylinder-pressure metrics before validating TDC.

# 18. Key lessons

1. CA50, Pmax and MPRR must be optimized together.
2. The first active limit can be efficiency plateau, NOx, Pmax, MPRR or smoke.
3. Phasing targets vary with speed and load.
4. Cylinder spread matters.
5. Pressure-based calibration is only as good as the phasing and sensor system.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em> — indicated/brake work, gas exchange and turbocharging fundamentals.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
