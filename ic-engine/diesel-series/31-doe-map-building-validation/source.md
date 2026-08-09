
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Design of Experiments, Map Building and Off-Grid Validation</h1>
<p><em>How to optimize interacting heavy-duty calibration variables efficiently and select robust production targets</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. One-factor sweeps teach physics; DoE captures interactions

A heavy-duty diesel response can be written conceptually as:

$$
y=
f(SOI,p_{inj},EGR,VGT,pilot,T,n_e,load,\ldots)
$$

Important interactions include:

$$
SOI\times EGR
$$

$$
p_{inj}\times soot
$$

$$
VGT\times EGR
$$

$$
pilot\times main\ timing
$$

<figure class="figure-card"><svg viewBox="0 0 820 430" role="img" aria-label="Pareto optimization">
<rect width="820" height="430" fill="white"/><line x1="90" y1="350" x2="750" y2="350" stroke="#52697a" stroke-width="2"/><line x1="90" y1="350" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="560" y="397" font-size="17">Emissions / constraint burden →</text><text x="24" y="120" font-size="17" transform="rotate(-90 24,120)">Efficiency ↑</text>
<g fill="#c7d7e4"><circle cx="175" cy="290" r="7"/><circle cx="240" cy="245" r="7"/><circle cx="310" cy="210" r="7"/><circle cx="380" cy="183" r="7"/><circle cx="455" cy="165" r="7"/><circle cx="540" cy="155" r="7"/><circle cx="625" cy="172" r="7"/></g>
<path d="M175 290 C280 220,405 170,540 155" fill="none" stroke="#17324a" stroke-width="3"/>
<circle cx="430" cy="170" r="9" fill="#5d87ad"/><text x="445" y="168" font-size="14">robust selected point</text>
</svg><figcaption>Multi-objective calibration chooses a robust point inside a feasible region, not merely the absolute minimum-BSFC point on one fresh engine.</figcaption></figure>

# 2. Screening

When many factors exist, use a screening design to identify which variables materially affect the responses.

Possible responses:

- BSFC;
- NOx;
- PM or smoke;
- Pmax;
- MPRR;
- EGT;
- SCR inlet temperature.

# 3. Response surface

A local response model can include:

$$
y
=
\beta_0+\beta_1x_1+\beta_2x_2+\beta_{12}x_1x_2+\beta_{11}x_1^2+\ldots
$$

This is a statistical approximation, not a substitute for engine physics.

# 4. Replication

Repeat selected points to estimate noise.

Without replication, the model can treat measurement variation as a calibration effect.

# 5. Blocking

Use blocks for nuisance variables such as:

- test day;
- fuel batch;
- aftertreatment soot state;
- ambient condition.

# 6. Restricted randomization

Some factors are hard to change.

For example:

```text
whole-plot factor:
coolant / ambient / fuel state

sub-plot factors:
SOI / rail pressure / pilot / EGR
```

The statistical model should reflect that structure.

# 7. Robust optimization

A mathematically best point can be too close to:

- smoke boundary;
- Pmax;
- turbo speed;
- NOx limit.

A slightly worse nominal BSFC point with stronger robustness margin can be the better production target.

# 8. Map fitting

After collecting DoE data:

1. fit local response;
2. inspect residuals;
3. check lack-of-fit;
4. confirm physical interaction signs;
5. select candidate optimum;
6. run independent confirmation point;
7. repeat if needed.

# 9. Off-grid validation

Do not validate only at the original design points.

Choose intermediate combinations and compare measured responses with model prediction.

# 10. Example four-factor study

At one speed-load point:

```text
A = main SOI
B = injection pressure
C = EGR
D = VGT / boost target
```

Responses:

```text
BSFC
NOx
smoke
Pmax
MPRR
SCR inlet temperature
```

A screening design can identify whether interactions such as $A\times C$ or $C\times D$ dominate.

# 11. Factor coding

A normalized factor can be:

$$
x_i
=
\frac{X_i-X_{center}}{\Delta X_i}
$$

This helps numerical conditioning and coefficient comparison.

# 12. Residual inspection

Check:

- residual versus prediction;
- residual versus run order;
- outliers;
- block effects;
- lack of fit.

A high R² can coexist with thermal drift or model bias.

# 13. Confirmation rule

The selected optimum should be run again as an independent test point.

Preferably repeat it and a reference point.

Release only after prediction and confirmation agree within the intended model/test uncertainty.

# 14. From DoE optimum to production map

After the local optimum is confirmed:

1. repeat it;
2. compare with a reference;
3. place it into the surrounding speed-load surface;
4. smooth only if the physical trend remains correct;
5. inspect gradients;
6. run off-grid points;
7. run the relevant transient.

A statistically optimal cell that creates a sharp map gradient can produce poor vehicle behavior.

# 15. Production-variation confirmation

At the selected robust point, challenge one or more influential variations:

- injector flow;
- turbo efficiency;
- EGR flow;
- fuel quality;
- temperature.

This verifies that the selected Pareto point actually has the intended margin.

# 16. Safe design-space definition

Before generating a DoE, define hard boundaries from:

- Pmax;
- MPRR;
- turbo speed;
- exhaust temperature;
- smoke;
- rail-pressure capability.

Do not let the statistical design request unsafe combinations.

# 17. Sequential experimentation

A practical strategy is:

```text
physics sweep
→ screening DoE
→ response surface
→ robust confirmation
```

This is often more efficient than beginning with a large high-order DoE before understanding the engine.

# 18. Model transfer between neighboring cells

A response surface from 1200 rpm should not automatically be reused at 1600 rpm.

Instead compare coefficient trends and decide whether:

- separate local models;
- a speed dimension;
- a reduced physics-based model;

is appropriate.

# 19. Uncertainty of the optimum

Report not only the predicted optimum but also the expected prediction uncertainty.

If several points have statistically indistinguishable BSFC, select among them using robustness, emissions and map-smoothness margin.

# 20. Common mistakes

- Treating R-squared as proof of physical correctness.
- Omitting replication.
- Fully randomizing hard-to-change thermal states.
- Accepting a model optimum without confirmation.
- Extrapolating outside the tested safe domain.

# 21. Key lessons

1. DoE is most valuable when calibration variables interact.
2. Replication and blocking separate engine response from test noise.
3. Restricted randomization is often necessary on heavy engines.
4. Robust production targets can be better than nominal extrema.
5. Every optimum needs independent confirmation and off-grid validation.

# References

<ol class="refs">
<li><a href="https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm">NIST/SEMATECH e-Handbook of Statistical Methods</a> — experimental design, blocking, response surfaces and validation.</li>
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
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
