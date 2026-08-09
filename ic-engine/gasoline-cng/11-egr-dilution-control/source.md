
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>EGR and Dilution Control</h1>
<p><em>How internal residuals and external EGR affect pumping work, NOx, knock, combustion speed, CNG methane stability and turbocharger operation</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. What dilution means

Combustion does not always contain only fresh air and fuel.

The cylinder can also contain burned gas.

That burned gas can come from:

- **internal residuals** retained through valve timing;
- **external EGR** routed back from the exhaust system.

Dilution changes combustion chemistry, flame speed, temperature, knock and pumping work.

# 2. Why EGR can improve efficiency

At part load, a conventional SI engine reduces torque by throttling.

That creates pumping loss.

If some cylinder volume is filled with inert burned gas, the throttle can sometimes be opened further for the same fresh-air oxygen demand.

```text
More dilution
    ↓
throttle can open further
    ↓
manifold pressure rises
    ↓
pumping loss can fall
```

This is one efficiency benefit of EGR.

# 3. EGR lowers combustion temperature

Burned gas has heat capacity but little oxygen.

It absorbs part of the combustion energy and reduces peak burned-gas temperature.

Therefore:

$$
EGR\uparrow
\Rightarrow
T_{combustion}\downarrow
$$

and NOx formation can fall.

# 4. EGR and knock

Lower end-gas temperature can improve knock tolerance.

That may allow:

- more optimal spark;
- more boost;
- higher compression ratio.

But only while combustion remains stable.

# 5. EGR slows combustion

Dilution reduces flame temperature and reaction rate.

As EGR rises:

- burn duration can increase;
- CA50 can move later if spark is unchanged;
- more spark advance may be required;
- COVIMEP can rise.

Eventually the engine reaches a stability or misfire boundary.

# 6. Internal EGR through VVT

Internal residuals can be increased by valve timing.

For example, overlap or exhaust-valve timing can trap or re-induct exhaust gas.

This avoids an external EGR circuit but strongly couples dilution to:

- intake pressure;
- exhaust pressure;
- turbocharger state;
- valve timing.

# 7. External EGR

An external system routes exhaust through:

- EGR valve;
- cooler where fitted;
- piping;
- intake mixing path.

The actual cylinder EGR fraction depends on both commanded valve position and pressure difference.

So EGR valve position is not itself the dilution state.

# 8. Cooled EGR

Cooling EGR reduces the temperature of recirculated gas.

This can increase knock benefit and reduce charge temperature.

But an EGR cooler adds:

- pressure loss;
- thermal dynamics;
- condensation/contamination considerations.

# 9. High-pressure and low-pressure EGR on turbo engines

A turbocharged engine can use different EGR routing concepts.

### High-pressure EGR

Takes exhaust upstream of the turbine and returns it downstream of the compressor/throttle path.

Advantages can include faster response.

Disadvantages include reducing turbine flow and increasing interaction with backpressure.

### Low-pressure EGR

Takes exhaust downstream of aftertreatment and returns it before the compressor.

This can provide well-cooled EGR but introduces long transport volume and compressor-system interaction.

# 10. EGR changes turbocharger operation

If exhaust is diverted around the turbine into an HP-EGR path:

```text
EGR flow ↑
   ↓
turbine flow can ↓
   ↓
turbine power changes
   ↓
boost response changes
```

LP-EGR changes compressor inlet composition and mass flow.

So boost and EGR controllers must coordinate.

# 11. EGR and fresh-air charge are different

Suppose total trapped mass is constant.

Increasing EGR means some of that mass is burned gas rather than fresh oxygen-bearing air.

Therefore:

$$
m_{fresh}\neq m_{total\ trapped}
$$

This distinction is critical for torque and lambda calculation.

# 12. EGR and torque structure

If EGR rises while fresh-air charge is held constant, total trapped mass rises.

If total trapped mass is held constant, fresh-air mass falls.

The torque model must know which quantity it uses.

A good torque model may need:

- fresh-air mass;
- residual fraction;
- external EGR fraction;
- charge temperature.

# 13. CNG and dilution

CNG can benefit from knock-resistant combustion and may tolerate meaningful dilution depending on chamber design and operating point.

But high dilution can still produce:

- slow burn;
- cycle variability;
- methane slip from incomplete combustion;
- misfire.

So the usable EGR range is not defined by knock alone.

# 14. Gasoline and dilution

Gasoline engines can use EGR for:

- knock reduction;
- pumping-loss reduction;
- NOx reduction;
- part-load efficiency.

GDI charge cooling and EGR can interact strongly with spark and boost strategy.

# 15. Example trade-off

At one part-load point:

```text
EGR 0%
pumping loss high
combustion fast
NOx higher

EGR 10%
throttle more open
pumping loss lower
knock margin improved
NOx lower
burn duration longer

EGR 25%
combustion becomes too slow
COVIMEP rises
misfire / HC / CH4 risk
```

The optimum sits before the stability boundary.

# 16. Interactive EGR trade-off

<div class="interactive-card">
<h3>Dilution trade-off</h3>
<label>EGR fraction [%] <input id="eg-fr" type="range" min="0" max="30" value="10" oninput="updateEGR()"></label>
<div class="kpis">
<div class="kpi"><strong id="eg-temp">–</strong>Relative peak temperature</div>
<div class="kpi"><strong id="eg-knock">–</strong>Relative knock margin</div>
<div class="kpi"><strong id="eg-burn">–</strong>Relative burn duration</div>
<div class="kpi"><strong id="eg-stab">–</strong>Stability indicator</div>
</div>
<p id="eg-msg"></p>
</div>


# Calibration procedure and optimization trade-offs

EGR calibration is an optimization problem because dilution can improve efficiency, NOx and knock margin while simultaneously slowing combustion and reducing stability.

The objective is not:

> “Use as much EGR as possible.”

It is:

> **Use enough dilution to gain efficiency and emissions benefit while staying comfortably inside the combustion-stability and torque-control limits.**

## 1. Establish the no-EGR reference

At one speed/load point, first record:

- brake torque;
- fresh-air charge;
- throttle position;
- manifold pressure;
- pumping work;
- CA50;
- burn duration;
- COVIMEP;
- NOx;
- HC/CH4;
- knock;
- EGT.

This reference is essential because every later EGR point must be compared against the same torque objective.

## 2. Increase EGR in controlled steps

For example:

```text
0% → 5% → 10% → 15% → 20% ...
```

At every step, keep the **requested brake torque constant** if the goal is to compare efficiency.

As EGR rises, the ECU may need to change:

- throttle;
- fresh-air charge;
- spark.

## 3. Re-optimize spark at every EGR level

EGR slows combustion.

If spark is left unchanged, CA50 moves later and the engineer may falsely conclude that EGR inherently reduces efficiency.

So use:

```text
EGR step
  ↓
combustion becomes slower
  ↓
spark adjusted to recover suitable CA50
  ↓
then compare BSFC / NOx / stability
```

This is one of the most important parts of a correct EGR experiment.

## 4. Trade-off — pumping loss versus combustion stability

More EGR can allow a more open throttle and therefore reduce pumping loss.

But:

$$
EGR\uparrow
\Rightarrow
burn\ duration\uparrow
\Rightarrow
COV_{IMEP}\uparrow
$$

Eventually the stability penalty rises rapidly.

The final EGR target should remain below the absolute stability/misfire boundary to preserve margin for:

- production variation;
- cold operation;
- gas quality;
- transient error.

## 5. Trade-off — knock margin versus burn duration

EGR lowers end-gas temperature and can improve knock margin.

This may allow more optimal spark or more boost.

But excessive EGR slows combustion enough that more spark advance is required and stability deteriorates.

The useful region is where:

```text
knock / pumping benefit
>
combustion-speed / stability penalty
```

## 6. Trade-off — NOx versus HC/CH4

Lower combustion temperature reduces NOx.

But partial burn or instability can increase HC and, for CNG, methane.

The calibration engineer therefore evaluates both sides of the emissions trade-off rather than optimizing NOx alone.

## 7. Internal-EGR calibration using VVT

For internal residual control:

- sweep intake/exhaust cam timing;
- estimate residual fraction;
- measure fresh-air charge;
- measure CA50/COVIMEP;
- measure pumping work.

The same residual target may require different cam positions when intake/exhaust pressure ratio changes.

## 8. External-EGR calibration on turbocharged engines

For HP or LP EGR, additionally measure:

- EGR valve position;
- EGR differential pressure;
- estimated/measured EGR mass flow;
- compressor/turbine state;
- boost response;
- exhaust backpressure.

EGR flow can change turbine power and therefore boost. EGR and wastegate control therefore require coordinated feedforward.

## 9. How the final EGR target is chosen

At each speed/load point, select the highest **useful** dilution that still satisfies:

- stable combustion;
- acceptable COVIMEP;
- acceptable HC/CH4;
- required torque;
- acceptable turbo response;
- adequate margin to misfire.

A common optimum appears where the efficiency/NOx benefit begins to flatten while the stability penalty starts rising rapidly.

## 10. Validation across all conditions

Repeat key EGR points at:

- cold/hot engine;
- different CNG gas composition;
- altitude;
- high intake temperature;
- different VVT/backpressure;
- transient operation.

The final EGR map is therefore an **efficiency–emissions–stability compromise with explicit margin**, not a maximum-dilution map.


# 17. Common mistakes

- Treating EGR-valve position as EGR fraction.
- Ignoring intake/exhaust pressure difference.
- Confusing total trapped mass with fresh-air mass.
- Using EGR for knock without checking combustion stability.
- Ignoring turbo/EGR coupling.
- Assuming internal and external EGR behave identically.
- Ignoring methane emissions when CNG combustion becomes unstable.

# 18. Key lessons

1. EGR and residual gas are dilution, not fresh air.
2. Dilution can reduce pumping loss, NOx and knock tendency.
3. Too much dilution slows combustion and raises stability risk.
4. VVT can create internal EGR.
5. Turbocharged EGR strongly interacts with turbine/compressor operation.
6. The torque model must distinguish fresh air, total trapped mass and burned-gas fraction.
7. The usable dilution limit is often set by combustion stability rather than knock.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The supplied combustion material notes that EGR increases cycle-to-cycle variation, while the VVT and air-charge references establish the role of residual gas and intake/exhaust pressure in cylinder filling.</li>
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
function updateEGR(){
 const e=+document.getElementById('eg-fr').value;
 const temp=Math.max(70,100-0.8*e);
 const knock=Math.min(135,100+0.9*e);
 const burn=100+1.6*e;
 const stab=Math.max(35,100-0.09*e*e);
 document.getElementById('eg-temp').textContent=temp.toFixed(0)+'%';
 document.getElementById('eg-knock').textContent=knock.toFixed(0)+'%';
 document.getElementById('eg-burn').textContent=burn.toFixed(0)+'%';
 document.getElementById('eg-stab').textContent=stab.toFixed(0)+'%';
 document.getElementById('eg-msg').innerHTML=`Dilution lowers temperature and can improve knock margin, but burn duration rises. At high dilution the stability penalty grows faster, illustrating why the useful EGR limit is usually a compromise rather than the maximum hardware flow.`;
}
document.addEventListener('DOMContentLoaded',updateEGR);
</script>
