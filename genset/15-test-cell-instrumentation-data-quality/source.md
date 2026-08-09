
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Test-Cell Instrumentation, Uncertainty and Data Quality</h1>
<p><em>ISO 8528-6 test context, electrical/gas/cylinder-pressure measurements, a worked uncertainty budget and traceable evidence</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. A calibration result is only as good as the measurement chain

A modern engine test cell can produce thousands of channels.

That does not guarantee correct information.

Before optimizing a 0.2% efficiency change, ask:

> **Is the change larger than the uncertainty and repeatability of the measurement?**

# 2. Define the measurement boundary

For every KPI write down:

- sensor;
- physical location;
- units;
- sampling rate;
- filtering;
- delay;
- calibration date;
- expected uncertainty.

This is especially important for:

- electrical power;
- gas flow;
- air flow;
- cylinder pressure;
- emissions;
- turbo pressure/temperature.

# 3. Electrical power measurement

Electrical power depends on voltage, current and phase relationship.

For three-phase systems, the measurement system must correctly capture:

- phase voltages;
- currents;
- power factor;
- harmonics where relevant.

The dyno/test report should state whether power is:

- generator gross terminal power;
- net exported power;
- another defined boundary.

# 4. Fuel-flow and LHV uncertainty

Electrical efficiency is:

$$
\eta_{el}
=
\frac{P_{el}}
{\dot m_fLHV}
$$

Therefore uncertainty comes from all three terms.

A fuel-flow meter can be excellent while the final efficiency remains uncertain because gas composition/LHV is poorly characterized.

# 5. Simple uncertainty propagation

For independent small relative uncertainties:

$$
\left(
\frac{u_\eta}{\eta}
\right)^2
\approx
\left(
\frac{u_P}{P}
\right)^2
+
\left(
\frac{u_{\dot m_f}}{\dot m_f}
\right)^2
+
\left(
\frac{u_{LHV}}{LHV}
\right)^2
$$

This gives the engineer an immediate check on whether a claimed improvement is meaningful.

# 6. Cylinder-pressure measurement

Critical checks:

- sensor sensitivity;
- thermal drift;
- TDC offset;
- crank-angle encoder resolution;
- pressure pegging;
- cycle count;
- pegging/reference method.

A TDC error can shift:

- CA50;
- indicated work;
- Pmax location.

# 7. Air-flow measurement

Air-flow measurement can be affected by:

- installation profile;
- pulsation;
- temperature/pressure correction;
- wet gas/condensation;
- sensor range.

Compare air flow with independent plausibility such as:

- compressor flow;
- lambda + fuel balance;
- cylinder-charge model.

# 8. Turbo pressure and temperature

Pressure tapping should represent the intended static pressure rather than a local dynamic artifact.

Temperature sensors have:

- thermal inertia;
- radiation error;
- conduction error.

A turbine-inlet thermocouple can respond far slower than a combustion event.

# 9. Emissions analyzer synchronization

A typical analyzer path includes:

```text
Cylinder event
   ↓
exhaust transport
   ↓
sample probe
   ↓
heated line
   ↓
analyzer cell
   ↓
filter / data logger
```

Total delay can be seconds.

Time-align emissions before associating a transient spike with one engine event.

# 10. Wet/dry and reference-basis control

Record:

- wet or dry;
- reference O2 if used;
- standard-volume condition;
- sample pressure;
- sample temperature.

Do not compare two ppm values reported on different bases.

# 11. Repeat reference points

A good sweep includes repeated reference points.

Example:

```text
Reference
Sweep point 1
Sweep point 2
Sweep point 3
Reference again
```

If the second reference has moved significantly, the test may contain:

- thermal drift;
- gas-quality drift;
- sensor drift.

# 12. Data-validity rules

Before testing, define automatic or manual rejection conditions such as:

- unstable load;
- excessive lambda variation;
- coolant temperature outside band;
- gas pressure outside band;
- analyzer not settled;
- cylinder pressure invalid;
- knock protection active unexpectedly.

This prevents “bad points” from entering a map simply because the data file exists.

# 13. Confidence intervals and repeatability

For repeated points, calculate:

- mean;
- standard deviation;
- confidence interval where useful.

A calibration engineer should distinguish:

> **difference in averages**

from:

> **statistically/physically meaningful improvement**.

# 14. Example — is 0.2 percentage point efficiency gain real?

Suppose:

```text
Baseline ηel = 45.0%
Candidate ηel = 45.2%
```

The apparent gain is:

```text
+0.2 percentage point
```

If combined uncertainty is approximately:

```text
±0.3 percentage point
```

the test does not yet prove the candidate is better.

Repeat testing or improved measurement is required.

# 15. Sensor failure versus real engine change

If one cylinder's CA50 suddenly moves while:

- IMEP unchanged;
- EGT unchanged;
- lambda unchanged;

check the pressure measurement before recalibrating that cylinder.

A senior calibration engineer protects the calibration from sensor faults.

# 16. Data traceability

Every release dataset should be traceable to:

- software/calibration version;
- engine hardware version;
- generator version;
- fuel composition;
- ambient condition;
- instrumentation configuration;
- test-cell ID;
- date/time.

Without traceability, an apparently excellent map may be impossible to reproduce.

# 17. Standards connection

ISO 8528-6:2023 provides complete generating-set test-method context.

For engine power/reference conditions, ISO 15550 and ISO 3046-1 are relevant.

For large rotating-machine loss/efficiency work where direct full-load testing is impractical, IEC 60034-2-2:2024 provides specific separate-loss methods.

# 18. Worked uncertainty budget

Suppose:

```text
Electrical power relative uncertainty  = 0.25%
Fuel-flow relative uncertainty         = 0.30%
LHV relative uncertainty               = 0.35%
```

Then:

$$
u_{rel,\eta}
\approx
\sqrt{0.25^2+0.30^2+0.35^2}
=
0.52\%
$$

If electrical efficiency is 45%:

$$
u_\eta
\approx
0.0052\times45
=
0.23\ \text{percentage point}
$$

So a measured improvement of only +0.10 percentage point is not yet convincing.

# 19. Measurement-system analysis

For critical channels, consider:

- repeatability;
- reproducibility;
- drift;
- calibration interval;
- channel synchronization.

# 20. Metrology foundation: standard and expanded uncertainty

The simplified RSS example in this article assumes small, approximately linearized and **uncorrelated** input contributions.

For a measurement model:

$$
y=f(x_1,x_2,\ldots,x_n)
$$

the combined standard uncertainty is generally obtained from sensitivity coefficients and the covariance matrix:

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
\,u(x_i,x_j)
$$

If the inputs are uncorrelated, the covariance terms vanish and the familiar root-sum-square form is recovered.

The **combined standard uncertainty** is:

$$
u_c
$$

while an **expanded uncertainty** is typically reported as:

$$
\boxed{
U=k\,u_c
}
$$

where the coverage factor $k$ is selected for the required coverage statement and uncertainty model.

The JCGM Guide to the Expression of Uncertainty in Measurement is the metrology foundation for this treatment. A 2026 amendment specifically addresses nonlinearity in measurement models, which matters when a simple first-order linearized propagation is not adequate.

# 21. Correlation example

Fuel composition can influence both:

- reported LHV;
- calculated stoichiometric AFR.

Those quantities may therefore share common upstream analytical uncertainty and should not automatically be treated as statistically independent in a detailed uncertainty budget.

# 22. Common mistakes

- Reporting more decimal places than the measurement supports.
- Accepting a “better” map based on a change smaller than uncertainty.
- Forgetting LHV uncertainty in electrical-efficiency calculations.
- Using unsynchronized emissions data during transients.
- Releasing data without hardware/software/fuel traceability.

# 23. Key lessons

1. Test-cell uncertainty determines the smallest trustworthy calibration improvement.
2. Complete-genset tests and component tests have different standards and boundaries.
3. LHV uncertainty can dominate small electrical-efficiency claims.
4. Repeat reference points and validity rules protect the map from drift.
5. Traceable evidence is part of calibration quality.

# References

<ol class="refs">
<li>NIST/SEMATECH e-Handbook of Statistical Methods — supporting reference for repeatability, experimental design and data-quality reasoning.</li>
<li>JCGM 100:2008/Amd.1:2026 — Amendment 1: Nonlinearity in measurement models.</li>
<li>JCGM 100:2008 — Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM).</li>
<li>ISO 8528-6:2023 — Test methods for complete generating sets.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
<li>ISO 3046-1:2002 — Additional engine performance/declaration requirements; current in 2026 but under revision.</li>
<li>IEC 60034-2-2:2024 — Specific methods for determining separate losses of large rotating machines.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
