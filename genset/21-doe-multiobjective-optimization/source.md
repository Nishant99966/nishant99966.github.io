
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Design of Experiments and Multi-Objective Calibration</h1>
<p><em>Replication, blocking, interactions, response surfaces, Pareto trade-offs and robust production-optimum selection</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why one-factor-at-a-time sweeps are not enough

Single-variable sweeps are excellent for learning physics:

```text
Hold everything constant
        ↓
change lambda
        ↓
observe response
```

But real calibration variables interact.

For example:

$$
\eta_{el}
=
f(\lambda,\theta_{spark},p_{boost},m_{PC},T_{intake},gas\ quality,\ldots)
$$

The best spark can change when lambda changes.

The best boost can change when Miller timing changes.

The best prechamber fuel can change when main lambda changes.

# 2. Interaction example: lambda × spark

If lambda becomes leaner:

```text
burn duration ↑
   ↓
best spark normally moves
```

A lambda sweep performed at one fixed spark does not show the true best efficiency available at each lambda.

This is an interaction.

# 3. Design of Experiments

A DoE deliberately varies multiple factors in a structured way.

Typical goals:

- identify important factors;
- estimate interactions;
- build a response-surface model;
- reduce test hours.

# 4. Screening stage

When many variables exist, first determine which ones matter most.

Possible factors:

- lambda;
- spark;
- boost target;
- prechamber fuel;
- charge-air temperature;
- gas quality.

Responses:

- electrical efficiency;
- NOx;
- CH4;
- Pmax;
- COVIMEP;
- EGT.

# 5. Response-surface stage

After screening, focus on the important variables.

Build a model such as:

$$
y
=
\beta_0
+
\beta_1x_1
+
\beta_2x_2
+
\beta_{12}x_1x_2
+
\beta_{11}x_1^2
+\ldots
$$

The purpose is not the polynomial itself.

The purpose is to predict the operating region between measured test points.

# 6. Constraints

Optimization should include hard or soft constraints.

Example:

```text
Maximize electrical efficiency

subject to:
NOx ≤ target
CH4 ≤ target
Pmax ≤ limit
COVIMEP ≤ stability limit
Turbo speed ≤ limit
EGT ≤ limit
```

This is much closer to real calibration than “find the maximum efficiency point.”

# 7. Pareto trade-off

Sometimes no single point is best for all objectives.

A Pareto front contains points where one objective cannot improve without another getting worse.

Example:

```text
Point A:
best efficiency, higher NOx

Point B:
slightly lower efficiency, much lower NOx

Point C:
lowest NOx, CH4 begins rising
```

The calibration engineer then selects the point that best fits program priorities.

# 8. DoE does not replace engineering physics

A mathematically good surface can still be physically wrong if:

- sensors drift;
- factors cross unsafe boundaries;
- the model extrapolates beyond tested space;
- the test plan ignores known combustion constraints.

Use DoE to organize experiments, not to replace engine understanding.

# 9. Sequential calibration strategy

A practical workflow is:

```text
Physics understanding
    ↓
safe factor ranges
    ↓
screening DoE
    ↓
response surface
    ↓
constrained optimization
    ↓
candidate optimum
    ↓
repeat verification point
    ↓
off-grid validation
```

# 10. Robust optimization

The best nominal point may be too sensitive to variation.

Compare:

```text
Point A:
45.4% efficiency
very close to misfire boundary

Point B:
45.3% efficiency
large stability margin
```

Point B can be the better production calibration.

Robust optimization includes sensitivity to:

- gas composition;
- ambient temperature;
- production hardware spread;
- sensor error.

# 11. Map building

Once optimum targets are found at key loads:

1. fit/smooth the load-based map;
2. preserve real physical trends;
3. prevent unphysical interpolation;
4. validate intermediate loads;
5. validate transients.

Do not smooth away real gas-dynamic or combustion structure merely to make a map look attractive.

# 12. Test efficiency

A well-designed DoE can reduce test hours compared with dense independent sweeps.

That matters because high-load multi-megawatt testing consumes:

- fuel;
- test-cell time;
- hardware life;
- engineering time.

# 13. Replication

Repeat selected points to estimate test repeatability.

Without replication, the model can confuse measurement noise with real response.

# 14. Randomization

Where practical and safe, vary run order so slow drift does not align perfectly with one factor.

For a large thermal engine, complete randomization may be inefficient; use engineering judgement.

# 15. Blocking

Use blocks for known nuisance changes such as:

- different test day;
- different gas batch;
- different ambient/cooling state.

# 16. Center points

Center points help reveal:

- repeatability;
- curvature.

# 17. Model validation

After fitting a response surface:

1. inspect residuals;
2. check lack-of-fit;
3. verify key interaction signs make physical sense;
4. run independent confirmation points;
5. do not extrapolate beyond the tested domain.

# 18. Pareto trade-off illustration
<figure class="figure-card">
<svg viewBox="0 0 820 430" role="img" aria-label="Pareto tradeoff between efficiency and NOx">
<rect width="820" height="430" fill="white"/>
<line x1="90" y1="350" x2="750" y2="350" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="350" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="570" y="397" font-size="17" fill="#17324a">NOx / constraint burden →</text>
<text x="24" y="120" font-size="17" fill="#17324a" transform="rotate(-90 24,120)">Electrical efficiency ↑</text>
<g fill="#c7d7e4">
<circle cx="180" cy="285" r="7"/><circle cx="245" cy="245" r="7"/><circle cx="310" cy="210" r="7"/>
<circle cx="380" cy="182" r="7"/><circle cx="455" cy="165" r="7"/><circle cx="540" cy="155" r="7"/>
<circle cx="620" cy="162" r="7"/><circle cx="675" cy="190" r="7"/>
</g>
<path d="M180 285 C280 220,400 170,540 155" fill="none" stroke="#17324a" stroke-width="3"/>
<circle cx="430" cy="170" r="9" fill="#5d87ad"/>
<text x="445" y="168" font-size="14" fill="#17324a">robust selected point</text>
</svg>
<figcaption>Illustrative Pareto concept. The release target is chosen from feasible trade-offs and may intentionally sacrifice a tiny nominal efficiency gain to obtain more emissions, stability or durability margin.</figcaption>
</figure>

# 19. Restricted randomization and split-plot thinking for large engines

A multi-megawatt thermal engine cannot always follow a perfectly randomized test order.

Some factors are **hard to change**, for example:

- fully cold versus fully hot thermal state;
- site cooling-water temperature;
- a new gas composition or gas bottle/batch;
- hardware configuration.

Other factors are relatively easy to change within a stabilized block:

- spark;
- lambda;
- selected boost target;
- small prechamber trims.

That creates a restricted-randomization problem.

A useful approach is:

```text
Whole-plot / hard-to-change factor:
gas quality or thermal state
        ↓
stabilize one block
        ↓
randomize easy-to-change calibration factors inside that block
```

This is the intuition behind split-plot or other restricted-randomization designs.

The statistical model and error structure must reflect that hierarchy; otherwise the analysis can overstate the significance of hard-to-change factors.

# 20. DoE reference discipline

A calibration DoE should document:

- factor coding and units;
- randomization restrictions;
- blocks;
- replicate strategy;
- center points;
- response transformations;
- model terms retained;
- residual checks;
- lack-of-fit;
- independent confirmation points.

This makes the statistical result auditable instead of treating the optimization package as a black box.

# 21. Common mistakes

- Treating a fitted polynomial as engine physics.
- Running a DoE with factor ranges that cross unsafe regions.
- Omitting replication.
- Accepting a mathematical optimum without a confirmation run.
- Smoothing a response surface until a real physical boundary disappears.

# 22. Key lessons

1. DoE is a structured way to learn interactions, not a substitute for engine understanding.
2. Replication, blocking and model validation are part of a defensible experiment.
3. Pareto trade-offs make multi-objective decisions explicit.
4. Robust targets can be better than fragile nominal maxima.
5. Every optimum needs independent verification.
# References

<ol class="refs">
<li>NIST/SEMATECH e-Handbook of Statistical Methods — Design of Experiments sections covering randomized/blocked designs, screening, response-surface methods, center points and constrained/non-classical design situations.</li>
<li>ISO 8528-6:2023 — Test methods for complete generating sets.</li>
<li>L. Guzzella and C. H. Onder, Introduction to Modeling and Control of Internal Combustion Engine Systems, 2nd ed.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
