
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Combustion Stability and Cylinder Balancing</h1>
<p><em>IMEP, COVIMEP, CA50 variation, cylinder-to-cylinder air/fuel/spark differences and why correct average torque can still hide poor combustion</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why average engine torque can hide a bad cylinder

A dynamometer measures the combined output of all cylinders.

Four cylinders can produce the correct average torque while one cylinder is weak and another is strong.

That can create:

- roughness;
- higher emissions;
- knock imbalance;
- catalyst stress;
- drivability complaints.

Cylinder balancing asks:

> **Are all cylinders contributing approximately the intended amount of work, with acceptable cycle-to-cycle stability?**

# 2. IMEP is a useful cylinder-work quantity

Indicated mean effective pressure is:

$$
IMEP=\frac{W_i}{V_d}
$$

For cylinder-resolved pressure measurement, IMEP allows each cylinder's work contribution to be compared.

Example:

| Cylinder | Mean IMEP |
|---|---:|
| 1 | 10.2 bar |
| 2 | 9.5 bar |
| 3 | 10.1 bar |
| 4 | 9.4 bar |

The total engine may look acceptable, but cylinders 2 and 4 are clearly weaker.

# 3. Cycle-to-cycle variability

Even one cylinder does not produce exactly the same IMEP every cycle.

A common stability metric is:

$$
COV_{IMEP}
=
\frac{\sigma_{IMEP}}
{\overline{IMEP}}
\times100\%
$$

The acceptable value is engine- and project-specific.

The important idea is:

> lower variability generally means more repeatable combustion.

# 4. Why idle is often the hardest region

At low speed and low load:

- mixture motion is weaker;
- residual fraction can be high;
- injector pulse widths are small;
- combustion energy per cycle is low;
- friction is a large fraction of produced torque.

So a small combustion difference becomes more visible.

# 5. CA50 variation adds another dimension

Two cylinders can have similar IMEP but different combustion phasing.

Example:

| Cylinder | IMEP | CA50 |
|---|---:|---:|
| 1 | 10.0 bar | 8.5° ATDC |
| 2 | 10.0 bar | 12.5° ATDC |

The second cylinder may require more fuel or charge to produce the same work because its combustion is more retarded.

So balancing only by torque/IMEP can hide efficiency differences.

# 6. Sources of cylinder imbalance

<div class="callout-grid">
<div class="callout"><h3>Air distribution</h3>Runner geometry, valve flow, deposits or manifold distribution can give different air mass.</div>
<div class="callout"><h3>Fuel distribution</h3>Injector flow variation, CNG rail behavior, wall film or GDI spray variation.</div>
<div class="callout"><h3>Spark</h3>Plug condition, coil energy, cylinder-specific retard or phasing difference.</div>
<div class="callout"><h3>Residuals</h3>VVT and exhaust pressure can create different residual fractions.</div>
<div class="callout"><h3>Mechanical condition</h3>Compression, leakage, valve sealing or friction differences.</div>
<div class="callout"><h3>Cooling</h3>Different wall temperatures change knock and burn rate.</div>
</div>

# 7. CNG-specific considerations

CNG adds:

- gaseous-injector flow variation;
- gas rail pressure dynamics;
- mixture-distribution sensitivity in PFI;
- gas composition;
- methane-related misfire/HC consequences.

A lean weak cylinder can produce elevated methane even when the average lambda sensor reports near stoichiometric operation.

# 8. Cylinder-specific lambda is difficult to observe

A single upstream lambda sensor measures mixed exhaust from several cylinders.

So:

```text
Cylinder 1 rich
Cylinder 2 lean
Cylinder 3 correct
Cylinder 4 correct
        ↓
mixed exhaust
        ↓
lambda sensor can still read ≈1.00
```

The average can look perfect while cylinder imbalance exists.

Cylinder-pressure analysis, exhaust temperature, ion current, fast exhaust sensing or other diagnostics may be needed to expose the problem.

# 9. Fuel balancing

If one cylinder is consistently weak because it is lean, a cylinder-specific fuel correction may help.

But the engineer should not automatically add fuel.

First ask:

- Is the air mass different?
- Is spark retarded?
- Is compression lower?
- Is injector flow actually low?
- Is the measurement valid?

A fuel trim can hide a mechanical or air-distribution problem.

# 10. Spark balancing

Cylinder-specific spark correction can equalize combustion phasing or knock margin.

However, using spark to compensate a permanent fuel or air error can reduce efficiency.

A good balancing strategy corrects the **physical cause** where possible.

# 11. Knock balancing

One cylinder often becomes the knock-limiting cylinder.

The ECU may therefore carry cylinder-specific knock retard.

If cylinder 3 needs 4° more retard than the others, the engine's average torque and efficiency can be limited by that one cylinder.

This is another reason cooling and air/fuel distribution matter to maximum engine performance.

# 12. Misfire and unstable combustion

As dilution, lean operation or spark retard becomes excessive:

- IMEP falls;
- COVIMEP rises;
- partial burns occur;
- misfire becomes possible.

The boundary is not one universal COVIMEP number.

It must be established from project-specific combustion, emissions and drivability requirements.

# 13. Example diagnosis

Suppose:

| Cylinder | Lambda tendency | CA50 | IMEP | Knock |
|---|---|---:|---:|---:|
| 1 | Normal | 9° | 10.1 bar | 0% |
| 2 | Lean tendency | 13° | 9.3 bar | 0% |
| 3 | Normal | 9° | 10.0 bar | 3% |
| 4 | Normal | 10° | 9.9 bar | 0% |

Interpretation:

- Cylinder 2 looks like a mixture/air/fuel issue.
- Cylinder 3 looks like a knock/cooling/spark-margin issue.

The fixes should probably not be the same.

# 14. Interactive balance exercise

<div class="interactive-card">
<h3>Cylinder-balance thought experiment</h3>
<label>Cylinder 2 IMEP deficit [%] <input id="cb-imep" type="range" min="0" max="15" value="7" oninput="updateCB()"></label>
<label>Cylinder 2 CA50 delay [°CA] <input id="cb-ca" type="range" min="0" max="10" value="4" oninput="updateCB()"></label>
<label>Cylinder 2 lambda offset <input id="cb-lam" type="range" min="-0.05" max="0.05" step="0.005" value="0.02" oninput="updateCB()"></label>
<p id="cb-msg"></p>
</div>

# 15. What a balanced engine really means

Balanced does not mean every measured signal is numerically identical.

A good result means:

- cylinder work is acceptably close;
- combustion phasing is consistent;
- knock margin is not dominated by one abnormal cylinder;
- lambda distribution is controlled;
- misfire/roughness is acceptable;
- corrections are not hiding a hardware fault.


# Calibration procedure and optimization trade-offs

Cylinder-balance calibration should be performed only after the base air, fuel and spark models are credible. The purpose is to remove systematic imbalance without hiding a hardware fault.

## 1. Establish a controlled reference point

Hold:

- speed;
- air charge;
- lambda;
- reference spark;
- VVT;
- boost/backpressure;
- thermal state.

Acquire enough valid cycles to calculate per-cylinder:

- mean IMEP;
- COVIMEP;
- CA50;
- peak pressure;
- knock occurrence.

## 2. Diagnose before applying corrections

If one cylinder is weak, investigate whether the cause is:

- fuel;
- air distribution;
- spark;
- residuals;
- cooling;
- compression/mechanics.

Do not immediately add fuel.

## 3. Fuel-balance sweep

Apply small cylinder-specific fuel corrections and observe:

- IMEP equalization;
- CA50;
- lambda tendency;
- HC/CH4;
- COVIMEP.

The useful correction is the smallest one that removes a systematic fuel-flow bias without creating a rich cylinder.

## 4. Spark / CA50 balancing

If IMEP is similar but CA50 differs, small cylinder-specific spark corrections may improve phasing.

But spark should not be used to hide a permanent air/fuel error.

## 5. Trade-off — equal torque versus equal efficiency

Two cylinders can be forced to equal IMEP using different spark angles.

That may equalize torque but reduce overall efficiency.

The engineer therefore considers both:

- cylinder work;
- combustion phasing.

## 6. Trade-off — knock margin versus balancing

Advancing a weak cylinder may improve torque but reduce knock margin.

A cylinder that is already knock-limited should not be “balanced” by pushing it closer to knock.

## 7. Trade-off — stability versus HC/CH4

A slightly richer correction may improve stability, but can increase CO/HC/CH4.

The final correction balances:

```text
work balance
+
stability
+
knock margin
+
emissions
```

## 8. Validation across conditions

Repeat checks at:

- idle;
- low load;
- medium load;
- high load;
- hot/cold;
- different VVT;
- CNG gas-quality variation;
- knock-sensitive points.

A good cylinder trim should not correct one point and create the opposite error somewhere else.


# 16. Common mistakes

- Looking only at average brake torque.
- Using one lambda sensor reading as proof all cylinders have equal mixture.
- Correcting everything with fuel.
- Ignoring cylinder-specific knock retard.
- Ignoring CA50 when IMEP looks equal.
- Using one universal COVIMEP threshold.

# 17. Key lessons

1. Average engine torque can hide cylinder-level problems.
2. IMEP compares cylinder work; COVIMEP measures cycle-to-cycle variability.
3. CA50 helps distinguish equal work from equal combustion efficiency.
4. Air, fuel, spark, residuals, cooling and mechanics can all cause imbalance.
5. CNG cylinder imbalance can appear as methane emissions even with average lambda near 1.
6. The best correction addresses the real cause rather than hiding it with a trim.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The supplied engine-fundamentals reference discusses injector/manifold variation, EGR-related variability and significant cycle-to-cycle combustion variation, especially at low speed and low load.</li>
</ol>

<p><a href="../">← Back to the Powertrain Performance Series</a></p>

<script>
function setMode(mode){
  document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
  const label=document.getElementById('mode-label');
  if(label) label.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>

<script>
function updateCB(){
 const im=+document.getElementById('cb-imep').value;
 const ca=+document.getElementById('cb-ca').value;
 const lam=+document.getElementById('cb-lam').value;
 let hints=[];
 if(lam>0.01) hints.push('lean mixture or low fuel delivery');
 if(lam<-0.01) hints.push('rich mixture or excess fuel');
 if(ca>3) hints.push('retarded/slow combustion');
 if(im>5) hints.push('meaningful cylinder-work deficit');
 document.getElementById('cb-msg').innerHTML=`The pattern suggests: <strong>${hints.join(', ') || 'small deviation only'}</strong>. A real diagnosis would compare injector flow, air distribution, cylinder pressure, spark correction and mechanical condition before applying a balancing trim.`;
}
document.addEventListener('DOMContentLoaded',updateCB);
</script>
