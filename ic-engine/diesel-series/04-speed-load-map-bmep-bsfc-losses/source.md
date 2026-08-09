
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Speed–Load Maps, BMEP, BSFC, IMEP and Engine Losses</h1>
<p><em>How a heavy-duty diesel calibration map is organized and how indicated work becomes brake torque across the complete operating range</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. The engine map is the backbone of heavy-duty calibration

Most steady-state heavy-duty calibration data can be organized by:

```text
engine speed
×
engine load / torque / BMEP
```

The map is then extended by corrections for air and EGR state, temperature, altitude, aftertreatment state and fuel quality.

# 2. BMEP

For a four-stroke engine:

$$
BMEP=
\frac{4\pi T_b}{V_d}
$$

BMEP is valuable because it normalizes torque by displacement.

# 3. Indicated work

Cylinder pressure gives:

$$
W_i=\oint p\,dV
$$

and:

$$
IMEP=\frac{W_i}{V_d}
$$

Be explicit about gross versus net IMEP.

# 4. PMEP and FMEP

This series reports a positive pumping-loss magnitude:

$$
PMEP_{loss}
=
-\frac{W_{pump}}{V_d}
$$

when the signed gas-exchange work is negative.

Then:

$$
IMEP_{net}
=
IMEP_{gross}
-
PMEP_{loss}
$$

and:

$$
FMEP=
IMEP_{net}-BMEP
$$

# 5. Mechanical efficiency

$$
\eta_m=
\frac{BMEP}{IMEP_{net}}
$$

Mechanical efficiency changes with both speed and load.

At low load, friction consumes a larger fraction of indicated work.

At high speed, friction and pumping can rise substantially.

# 6. BSFC map

$$
BSFC=
\frac{\dot m_f}{P_b}
$$

A heavy-duty diesel typically has a low-BSFC region at moderate speed and relatively high load.

Vehicle and transmission calibration often tries to keep operation near that region when drivability, emissions and durability permit.

# 7. Downspeeding

For the same road power, lower engine speed can reduce friction and pumping.

But too-low speed at high torque can increase:

- cylinder pressure;
- turbo response time;
- torsional vibration;
- combustion noise;
- gear and driveline stress.

Downspeeding therefore has a lower practical speed boundary.

# 8. Loss-map calibration

A useful development structure is:

$$
T_{loss}
=
f(n_e,load,T_{oil},p_{exh}-p_{intake},aux)
$$

Validate it with hot and cold oil, EGR on and off, different backpressure states and different engine speeds.

# 9. Map filling

A practical grid can include:

```text
speed lines:
idle / low / mid / rated / high

load points:
motoring / zero / 10 / 25 / 50 / 75 / 100%
```

The exact grid should follow the real duty distribution rather than uniform spacing for convenience.

# 10. Off-grid validation

After fitting or interpolating maps:

1. choose intermediate speed-load points;
2. predict torque, fuel and emissions;
3. measure actual behavior;
4. compare residual error;
5. correct only systematic error.

# 11. Worked BMEP example

Suppose a 13-L six-cylinder engine produces 2400 Nm.

For a four-stroke engine:

$$
BMEP=
\frac{4\pi(2400)}
{0.013}
\approx2.32\times10^6\ Pa
$$

or approximately:

$$
23.2\ bar
$$

This lets the engineer compare the loading level with another displacement without confusing absolute torque with cylinder loading.

# 12. Worked BSFC example

If brake power is 300 kW and measured fuel flow is 60 kg/h:

$$
BSFC
=
\frac{60000\ g/h}
{300\ kW}
=
200\ g/kWh
$$

If a candidate calibration reduces fuel flow to 59.7 kg/h at the same measured power:

$$
BSFC
=
199\ g/kWh
$$

The apparent gain is 0.5%. Before accepting it, compare with the fuel-flow, torque and LHV uncertainty discussed later.

# 13. Interpolation discipline

A base map is usually measured on a finite grid.

For a point between four map nodes, interpolation is expected to produce a physically smooth transition.

A bad map can create:

- torque steps;
- CA50 jumps;
- EGR transients;
- shift drivability problems.

Plot both the map values and their gradients. A map with individually plausible cells can still have unacceptable gradients.

# 14. Engine-map release views

For each major calibration, review at least:

- absolute value map;
- speed-direction gradient;
- load-direction gradient;
- active limits;
- off-grid prediction error.

This catches discontinuities before vehicle testing.

# 15. HD13-E map strategy

For the fictional HD13-E engine, the map should be denser around points B and C because those regions carry high torque and high mission fuel weighting.

A practical development grid can include:

```text
speed:
700 / 900 / 1000 / 1200 / 1400 / 1600 / 1800 / 2000 rpm

load:
10 / 25 / 50 / 75 / 90 / 100% of local full-load capability
```

This is illustrative. The production grid should follow the real duty histogram and interpolation sensitivity.

# 16. Calibration execution standard

## Objective

Build a repeatable engine speed-load foundation for torque, losses and fuel-consumption modelling.

## Preconditions

- dyno torque zero and span checked;
- fuel flow and LHV known;
- thermal state stabilized;
- aftertreatment regeneration inactive unless intentionally tested.

## Calibration objects

- torque/full-load curve;
- loss map;
- BSFC or fuel-rate map;
- interpolation/smoothing coefficients.

## Signals to log

```text
engine speed
brake torque
fuel mass flow
air mass
oil / coolant temperature
intake / exhaust pressure
aftertreatment backpressure
active limiter flags
```

## Data-quality rule

Reject a point when:

- speed/load is not stable;
- active limiter differs from the intended test;
- thermal drift exceeds the project criterion;
- regeneration or an auxiliary state changes during the dwell.

## Selection / fitting rule

Fit the map only after repeated reference points demonstrate acceptable drift.

Review both:

- absolute cell values;
- gradients in speed and load directions.

## Validation

Use at least several off-grid points in the low-speed high-torque, cruise and high-power regions.

# 17. Common mistakes

- Using torque instead of BMEP when comparing engines of different displacement.
- Mixing gross and net IMEP.
- Treating the BSFC minimum as the only production optimum.
- Filling a uniform map that ignores the real duty histogram.
- Skipping off-grid interpolation validation.

# 18. Key lessons

1. Heavy-duty calibration is fundamentally a two-dimensional speed-load problem.
2. IMEP, PMEP, FMEP and BMEP explain where fuel energy becomes or fails to become brake torque.
3. BSFC maps connect engine calibration to transmission and vehicle strategy.
4. Low-speed high-load operation trades friction benefit against pressure, turbo and driveline constraints.
5. A release map needs off-grid validation, not only measured grid points.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em> — indicated/brake work, gas exchange and turbocharging fundamentals.</li>
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
