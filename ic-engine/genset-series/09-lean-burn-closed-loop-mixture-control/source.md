
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Lean-Burn Lambda, Efficiency and Closed-Loop Mixture Control</h1>
<p><em>Gas-property-consistent lambda calculation, test-bed optimization, control delay, stability margin and emissions trade-offs</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Lean-burn mixture control is the center of a gas-genset calibration

A large natural-gas genset often operates lean because excess air can reduce combustion temperature and improve efficiency/emissions.

The key mixture variable is:

$$
\lambda
=
\frac{AFR_{actual}}{AFR_{stoich}}
$$

For lean operation:

$$
\lambda>1
$$

Public manufacturer-specific manufacturer-specific information describes lean-mixture control and precombustion-chamber technology, which makes it a useful real-world reference for this discussion.

# 2. Why there is no single best lambda

Moving leaner can:

- reduce NOx;
- reduce combustion temperature;
- sometimes improve efficiency.

But moving too lean can:

- slow flame propagation;
- increase COVIMEP;
- increase CH4/THC;
- cause partial burn/misfire;
- reduce torque capability.

So the calibration is an optimization problem.

# 3. Calibration procedure

At each nominal-speed steady-state load point:

```text
1500 rpm
25% load
50% load
75% load
100% load
```

hold:

- spark strategy;
- air-system configuration;
- gas composition;
- temperatures.

Then sweep lambda gradually.

For example, project-specific values might follow:

```text
less lean → nominal lean → leaner → near stability limit
```

Do not copy one universal numeric range.

# 4. Measure at each lambda

Measure:

- electrical power;
- fuel flow;
- electrical efficiency;
- NOx;
- CO;
- CH4/THC;
- COVIMEP;
- CA50;
- knock;
- EGT;
- cylinder spread.

# 5. Re-optimize ignition before judging efficiency

Lean mixture burns more slowly.

If spark remains fixed while lambda changes, CA50 moves later.

Then the test mixes two effects:

- mixture effect;
- incorrect combustion phasing.

So after each lambda step, ignition should be brought back to the intended combustion-phasing target or the relevant knock/pressure limit before final efficiency comparison.

# 6. Trade-off — NOx versus methane

Leaner mixture generally lowers burned-gas temperature and NOx.

But near the lean stability boundary:

```text
flame speed ↓
partial burn risk ↑
CH4 / THC ↑
```

For CNG, this trade-off is extremely important because methane is itself the main hydrocarbon species of interest.

# 7. Trade-off — efficiency versus stability margin

The best BSFC/electrical-efficiency point can lie close to the region where combustion variability begins to rise.

Production calibration should remain away from the absolute misfire boundary because real operation includes:

- gas-quality variation;
- temperature variation;
- cylinder imbalance;
- aging.

# 8. Cylinder-specific mixture balance

Average lambda can look correct while one cylinder is leaner.

So evaluate:

- cylinder IMEP;
- cylinder EGT;
- knock;
- misfire;
- cylinder-specific lambda indicators if available.

# 9. Final target selection

At each load, choose the mixture target where:

```text
efficiency benefit is strong
NOx target is satisfied
CH4/THC remains acceptable
COVIMEP remains stable
knock margin is acceptable
```

The final point is normally **before** the steep rise in instability.

# 10. Ambient/gas-quality validation

Repeat critical points with:

- hot intake air;
- low methane number / lower knock resistance gas;
- heating-value variation;
- rail-pressure variation;
- altitude.

The target must remain stable across the real fuel and ambient envelope.

# 11. Closed-loop lean-mixture control architecture

Finding the best lambda on a test bed is only half the task.

The production controller must keep the engine near the intended combustion state while:

- gas quality changes;
- ambient temperature changes;
- engine hardware ages;
- sensor bias changes;
- electrical load moves.

A generic advanced lean-mixture architecture can be represented as:

```text
Electrical load / torque target
        ↓
Base air + gas target
        ↓
Base lean-mixture target
        ↓
Fast air/fuel control
        ↓
Combustion
        ↓
Feedback / adaptation from:
  lambda or oxygen indication
  NOx where available
  cylinder pressure / CA50
  combustion stability
  knock
  exhaust temperature
        ↓
slow target correction
```

Different manufacturers use different combinations of these signals.

# 12. Fast control versus slow optimization

The fast loop should stabilize the air/fuel ratio against disturbances.

The slow layer can optimize the operating point.

For example:

```text
Fast loop:
gas pressure disturbance
→ mixture corrected quickly

Slow loop:
long-term NOx drift
→ lean target adjusted slowly
```

Mixing these time scales can create oscillatory mixture control.

# 13. NOx-feedback concept

Because NOx is strongly related to combustion temperature and mixture state, some advanced systems can use NOx information as a slow correction signal.

However, NOx feedback contains:

- exhaust transport delay;
- analyzer/sensor dynamics;
- cross-sensitivity;
- aftertreatment influence depending on sensor location.

It should therefore not be treated like an instantaneous cylinder lambda signal.

# 14. Stability guard

The lean-mixture target should be bounded by a combustion-stability guard.

A conceptual limiter can use:

- COVIMEP;
- misfire count;
- cylinder pressure quality;
- cylinder EGT spread.

If the engine approaches unstable combustion:

```text
stability margin ↓
        ↓
allowed lambda reduced
        ↓
engine moves slightly less lean
```

# 15. Final calibration structure

At each load, define:

1. nominal lean target;
2. lean stability boundary;
3. NOx/emissions correction authority;
4. gas-quality correction;
5. thermal correction;
6. minimum stability margin.

The final target should not sit exactly on the best laboratory point. It should remain robust to real operating variation.

# 16. Sensor and control delay in closed-loop mixture optimization

The feedback path contains delays:

$$
t_{total}
=
t_{fuel}
+
t_{combustion}
+
t_{transport}
+
t_{sensor}
+
t_{filter}
$$

Fast lambda/oxygen feedback may respond on one time scale.

NOx, exhaust temperature or slow gas-quality adaptation may respond on another.

If a slow signal is given aggressive controller gain, the result can be oscillation:

```text
mixture corrected
    ↓
NOx changes later
    ↓
controller over-corrects
    ↓
repeated rich/lean hunting
```

The calibration engineer should therefore identify the delay and bandwidth of each feedback signal before tuning its correction authority.

# 17. Anti-windup and limit interaction

If gas or air authority reaches a physical limit, the mixture controller should not continue integrating an impossible correction.

Controller anti-windup and saturation handling are therefore part of robust lean-mixture control.

# 18. From gas composition to lambda

The mixture definition is:

$$
\lambda
=
\frac{AFR_{actual}}
{AFR_{stoich}}
$$

with:

$$
AFR_{actual}
=
\frac{\dot m_{air}}
{\dot m_{fuel}}
$$

For variable natural-gas composition, the stoichiometric AFR itself can change.

Therefore:

```text
gas composition
   ↓
AFRstoich + LHV
   ↓
fuel mass / air target
   ↓
lambda and torque model
```

must remain consistent.

# 19. Worked example

Suppose:

```text
measured air flow = 5.0 kg/s
fuel flow         = 0.25 kg/s
```

Then:

$$
AFR_{actual}=20
$$

If the approved fuel analysis gives:

$$
AFR_{stoich}=17.2
$$

then:

$$
\lambda
=
\frac{20}{17.2}
=
1.163
$$

The numerical value is illustrative only.

# 20. Calibration procedure with spark re-optimization

At each load:

1. establish gas composition and AFRstoich;
2. sweep lambda;
3. re-optimize ignition/CA50 at each candidate lambda;
4. record electrical efficiency;
5. record NOx, CH4, CO and stability;
6. select a point with production margin from the lean limit.

# 21. Lean-mixture trade-off visualization
<figure class="figure-card">
<svg viewBox="0 0 820 440" role="img" aria-label="Lean mixture tradeoff">
<rect width="820" height="440" fill="white"/>
<line x1="90" y1="365" x2="750" y2="365" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="365" x2="90" y2="60" stroke="#52697a" stroke-width="2"/>
<text x="585" y="410" font-size="17" fill="#17324a">Increasing lambda → leaner</text>
<path d="M130 120 C300 170,480 250,710 310" fill="none" stroke="#17324a" stroke-width="3"/>
<text x="150" y="105" font-size="14" fill="#17324a">NOx</text>
<path d="M130 300 C300 250,460 205,570 205 C640 210,690 230,720 250" fill="none" stroke="#5d87ad" stroke-width="3"/>
<text x="460" y="187" font-size="14" fill="#5d87ad">efficiency</text>
<path d="M130 330 C420 325,570 310,640 220 C675 165,705 115,725 85" fill="none" stroke="#61717f" stroke-width="3"/>
<text x="665" y="105" font-size="14" fill="#61717f">CH4 / instability</text>
<line x1="620" y1="70" x2="620" y2="365" stroke="#9bb5c9" stroke-dasharray="8 7" stroke-width="2"/>
<text x="495" y="82" font-size="13" fill="#61717f">release target should keep margin</text>
</svg>
<figcaption>Qualitative lean-burn trade-off: NOx generally falls as the mixture is made leaner, while efficiency may have an optimum and methane/stability deterioration rises sharply near the lean limit.</figcaption>
</figure>

# 22. Common mistakes

- Using one fixed AFRstoich for every gas composition.
- Judging a leaner point without re-optimizing spark.
- Using average lambda while one cylinder is unstable.
- Giving slow NOx feedback the same bandwidth as fast mixture feedback.
- Letting an integrator wind up when gas/air authority saturates.

# 23. Key lessons

1. Lambda calibration begins with correct fuel stoichiometry.
2. LHV and AFRstoich belong to one consistent gas-property model.
3. Spark and lambda interact strongly.
4. The release target should remain away from the steep CH4/stability boundary.
5. Fast mixture control and slow emissions adaptation need different dynamics.
# References

<ol class="refs">
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>L. Guzzella and C. H. Onder, Introduction to Modeling and Control of Internal Combustion Engine Systems, 2nd ed.</li>
<li>W. W. Pulkrabek, Engineering Fundamentals of the Internal Combustion Engine.</li>
<li>Commission Implementing Decision (EU) 2021/2326 — Large Combustion Plant BAT conclusions, including natural-gas lean-burn engine NOx, CH4 and formaldehyde provisions where applicable.</li>
<li>Directive (EU) 2015/2193 — Medium Combustion Plant Directive for plants from 1 MW to <50 MW thermal input, subject to scope/exemptions and national implementation.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
