
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Test-Cell Instrumentation, Measurement Uncertainty and Data Quality</h1>
<p><em>How to trust fuel-efficiency, combustion and emissions differences before changing a heavy-duty calibration map</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Small calibration gains require trustworthy measurements

A heavy-duty engine test cell can report tiny BSFC or NOx differences.

Before moving a production map, ask whether the difference is larger than:

- measurement uncertainty;
- repeatability;
- thermal drift.

# 2. Critical measurement channels

Document sensor, location, units, sampling rate, filter and uncertainty for:

- torque;
- speed;
- fuel mass flow;
- air flow;
- cylinder pressure;
- rail or injection pressure;
- intake/exhaust pressure;
- turbo speed;
- temperatures;
- emissions;
- PM/PN;
- DEF flow.

# 3. Brake power

Dynamometer brake power is:

$$
P_b=T_b\omega
$$

Torque-cell zero and calibration matter directly.

# 4. Fuel efficiency

$$
\eta_b
=
\frac{P_b}
{\dot m_fLHV}
$$

Uncertainty therefore contains contributions from torque/power, fuel flow and LHV.

# 5. GUM framework

For:

$$
y=f(x_1,x_2,\ldots,x_n)
$$

combined standard uncertainty is conceptually:

$$
u_c^2(y)
=
\sum_i
\left(
\frac{\partial f}{\partial x_i}
\right)^2u^2(x_i)
+
2\sum_{i<j}
\frac{\partial f}{\partial x_i}
\frac{\partial f}{\partial x_j}
u(x_i,x_j)
$$

Expanded uncertainty is:

$$
U=k\,u_c
$$

The 2026 GUM amendment specifically addresses nonlinearity in measurement models.

# 6. Cylinder-pressure quality

Validate:

- TDC phasing;
- pressure pegging;
- encoder resolution;
- thermal drift;
- cycle count.

These affect CA50, IMEP, Pmax and MPRR.

# 7. Injector timing measurement

Where possible, distinguish:

```text
ECU command
from
injector current
from
needle / rate of injection
from
SOC
```

This prevents a hydraulic delay change from being misdiagnosed as combustion chemistry.

# 8. Emissions synchronization

Fast transient analysis needs a common time base.

A NOx sensor or laboratory analyzer can be delayed relative to:

- injection command;
- exhaust-valve event;
- tailpipe flow.

Time alignment is essential.

# 9. PM and PN measurement

Document:

- dilution;
- sample temperature;
- filter conditioning;
- particle-counter cut-off;
- line losses.

Smoke meters can be used for fast development but are not a replacement for formal PM or PN measurement.

# 10. Repeat reference points

A useful sweep pattern is:

```text
reference
candidate A
candidate B
candidate C
reference again
```

If the second reference shifted, investigate before trusting the sweep.

# 11. Worked uncertainty example

Suppose relative standard uncertainties are:

```text
brake power = 0.20%
fuel flow   = 0.25%
LHV         = 0.30%
```

If treated as uncorrelated:

$$
u_{rel,\eta}
\approx
\sqrt{0.20^2+0.25^2+0.30^2}
\approx0.44\%
$$

At 46% brake thermal efficiency, that corresponds to about:

$$
0.20\ \text{percentage point}
$$

A reported +0.05 percentage-point gain is therefore not yet strong evidence.

# 12. Correlated inputs

Fuel composition can influence both:

- LHV;
- density;
- cetane estimate.

A detailed uncertainty budget should not automatically treat all fuel-property inputs as independent.

# 13. Measurement-system analysis

For high-value channels, characterize:

- repeatability;
- reproducibility;
- zero drift;
- span drift;
- calibration interval.

# 14. Data traceability

Store with each result:

```text
engine hardware
injector/nozzle
turbo
software
calibration
fuel batch
aftertreatment age/soot state
instrument calibration
test date
```

A result without configuration is not release evidence.

# 15. Common stabilization and acceptance protocol

Before a steady-state point is accepted, define project limits for:

- speed variation;
- torque variation;
- coolant/oil drift;
- intake temperature;
- fuel temperature;
- aftertreatment state;
- analyzer settling.

The limits themselves are project/instrument dependent; the important point is that they are written before the sweep.

# 16. Calibration-record template

Every accepted point should carry:

```text
hardware configuration
software/calibration version
fuel batch / analysis
ambient state
thermal state
active limiter state
instrument status
operator / test ID
```

This turns a result into traceable release evidence.

# 17. Torque-cell verification

Before an efficiency campaign:

- zero the torque system;
- check span/calibration;
- verify alignment and parasitic drag assumptions.

A torque bias directly corrupts both:

- brake power;
- BSFC/BTE.

# 18. Fuel-flow system dynamics

A gravimetric or coriolis-based fuel-flow system can have filtering and delay.

For transient fuel analysis, characterize:

- delay;
- filter;
- return-fuel handling;
- temperature conditioning.

# 19. Cylinder-pressure repeatability

At each point store enough cycles to estimate both mean and variability.

A candidate with slightly better mean IMEP but much larger cycle dispersion can be a worse calibration.

# 20. Automated validity flag

Create a calculated `point_valid` signal that requires all required conditions:

```text
speed stable
torque stable
thermal stable
no unintended limiter
no regeneration
all required sensors valid
```

This reduces subjective data selection later.

# 21. Common mistakes

- Reporting more decimal places than the instruments support.
- Moving a map for a fuel-economy gain smaller than uncertainty.
- Ignoring LHV uncertainty.
- Using unsynchronized analyzer signals.
- Treating a fast smoke meter as formal PM measurement.

# 22. Key lessons

1. Measurement uncertainty defines the smallest believable optimization.
2. Cylinder-pressure analysis requires excellent crank-angle phasing.
3. Injection command, hydraulic injection and combustion timing are separate measurements.
4. Transient emissions need time synchronization.
5. Repeat references protect against drift.

# References

<ol class="refs">
<li><a href="https://www.bipm.org/en/committees/jc/jcgm/publications">JCGM 100:2008 and Amd.1:2026</a> — measurement-uncertainty framework and 2026 nonlinearity amendment.</li>
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm">NIST/SEMATECH e-Handbook of Statistical Methods</a> — experimental design, blocking, response surfaces and validation.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
