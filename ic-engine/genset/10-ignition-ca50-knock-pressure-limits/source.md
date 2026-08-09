
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Ignition, CA50, Knock, Peak Pressure and Pressure-Rise Limits</h1>
<p><em>How ignition is optimized across load using electrical efficiency, combustion phasing, cylinder pressure, knock and measurement-quality checks</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Ignition remains one of the most powerful efficiency controls

Around nominal rated speed, load changes cylinder pressure and burn rate.

Ignition timing must therefore still vary with load even though rpm remains 1500.

# 2. Calibration objective

At each load point determine:

- MBT or best-efficiency ignition;
- CA50 target;
- knock margin;
- peak-cylinder-pressure limit;
- pressure-rise-rate limit;
- EGT/emissions response.

# 3. Test procedure

At one load point:

1. stabilize at the nominal rated-frequency operating point;
2. hold lambda;
3. hold air/turbo/VVT state;
4. start from safe retarded spark;
5. advance in small steps;
6. record electrical power and combustion;
7. stop at MBT plateau, knock or mechanical limit.

# 4. Electrical-efficiency view

Because generator speed is fixed, small torque changes become directly visible as electrical-power changes.

If fuel flow is held nearly constant:

```text
spark approaches optimum
   ↓
cylinder work ↑
   ↓
shaft torque ↑
   ↓
electrical output ↑
```

# 5. CA50 and MBT

CA50 describes combustion phasing.

MBT describes torque optimum.

They are related but not identical.

The calibration should use measured torque/electrical power as the optimization target while using CA50 as the combustion-state explanation.

# 6. Trade-off — efficiency versus knock

Advancing spark usually improves torque until the best-torque region.

But knock margin shrinks.

The production point may therefore be knock-limited before MBT.

# 7. Trade-off — cylinder pressure versus exhaust temperature

More advanced combustion can increase peak cylinder pressure.

Retard reduces pressure but increases exhaust enthalpy.

The selected point must protect both:

- cylinder/mechanical system;
- turbine/exhaust system.

# 8. Lean mixture interaction

Leaner mixture slows combustion and can require more advance.

So lambda and spark must be optimized together rather than independently.

# 9. Calibration across load

Typical pattern:

- low load: stability and CH4/THC may dominate;
- medium load: efficiency often dominates;
- high load: knock, peak pressure and turbine temperature dominate.

# 10. Cylinder balancing

Large gas engines should also inspect cylinder-specific:

- CA50;
- knock;
- IMEP;
- peak pressure.

One hot/knock-sensitive cylinder can limit the entire engine.

# 11. Validation

Validate:

- gas quality;
- hot intake air;
- full-load thermal soak;
- load transients;
- cylinder-to-cylinder spread.

# 12. Large-engine pressure constraints: Pmax and pressure-rise rate

A large stationary gas engine may be limited by normal-combustion mechanical loading before classical knock becomes the only concern.

Two important development quantities are:

- peak cylinder pressure, $P_{max}$;
- maximum pressure-rise rate, often expressed in bar/°CA or an equivalent project metric.

Advancing ignition can:

```text
CA50 earlier
   ↓
efficiency / torque improve
   ↓
Pmax can rise
   ↓
pressure-rise severity can rise
```

So the optimum is not simply:

> “advance until knock.”

It may be:

```text
MBT
or
knock limit
or
Pmax limit
or
pressure-rise limit
```

whichever occurs first.

# 13. Calibration procedure with multiple limits

At each load:

1. stabilize lambda and air charge;
2. begin from safe retarded ignition;
3. advance in small increments;
4. calculate electrical efficiency;
5. track CA50;
6. track knock;
7. track Pmax and pressure-rise metric;
8. track turbine/exhaust temperature.

The final release spark should preserve margin to **all** active limits.

# 14. Cylinder statistics

Do not evaluate only the average cylinder.

Track:

- maximum cylinder Pmax;
- maximum cylinder knock;
- cylinder CA50 spread;
- cylinder IMEP spread.

One cylinder can become the limiting cylinder for the complete engine.

This is especially important in large-bore engines where thermal and mixture distribution vary across the bank.

# 15. Cylinder-pressure measurement quality before calibrating Pmax and CA50

Cylinder-pressure based calibration depends strongly on measurement quality.

Important checks include:

- crank-angle encoder resolution;
- TDC phasing;
- pressure-sensor thermal drift;
- pressure pegging/reference;
- cycle selection;
- filtering.

A small TDC offset can shift calculated CA50 and distort indicated work.

Therefore a spark map should never be moved by several crank-angle degrees solely because one unverified pressure channel reports a shifted CA50.

# 16. Uncertainty margin around mechanical limits

If the approved Pmax limit is:

$$
P_{max,limit}
$$

the release calibration should not intentionally sit exactly on that number.

Margin should account for:

- sensor uncertainty;
- cylinder-to-cylinder spread;
- transient overshoot;
- production variation;
- gas-quality variation.

# 17. Worked sweep logic

At one stabilized load, imagine the following qualitative sequence:

| Spark change | Electrical efficiency | Pmax | Knock |
|---|---:|---:|---|
| Retarded reference | lower | lower | none |
| +2° advance | improves | rises | none |
| +4° advance | near plateau | rises further | occasional |
| +6° advance | little further gain | high | unacceptable |

The final point may be the +2° or +4° condition depending on the approved Pmax, knock, MPRR and thermal margins.

# 18. Ignition-sweep trade-off visualization
<figure class="figure-card">
<svg viewBox="0 0 820 440" role="img" aria-label="Ignition sweep tradeoff">
<rect width="820" height="440" fill="white"/>
<line x1="90" y1="365" x2="750" y2="365" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="365" x2="90" y2="60" stroke="#52697a" stroke-width="2"/>
<text x="555" y="410" font-size="17" fill="#17324a">More ignition advance →</text>
<path d="M135 320 C280 220,430 155,545 150 C620 150,675 175,720 220" fill="none" stroke="#17324a" stroke-width="3"/>
<text x="515" y="133" font-size="14" fill="#17324a">electrical efficiency / torque</text>
<path d="M135 340 C350 335,500 300,720 105" fill="none" stroke="#5d87ad" stroke-width="3"/>
<text x="660" y="92" font-size="14" fill="#5d87ad">Pmax / MPRR</text>
<path d="M135 350 C470 350,600 320,720 130" fill="none" stroke="#61717f" stroke-width="3" stroke-dasharray="6 5"/>
<text x="660" y="153" font-size="14" fill="#61717f">knock risk</text>
<line x1="545" y1="80" x2="545" y2="365" stroke="#9bb5c9" stroke-dasharray="8 7"/>
<text x="487" y="75" font-size="13" fill="#61717f">MBT region</text>
</svg>
<figcaption>Illustrative ignition sweep. The release spark is bounded by the first relevant limit—MBT plateau, knock, Pmax, pressure-rise rate, exhaust temperature or another approved constraint.</figcaption>
</figure>

# 19. Common mistakes

- Calling CA50 itself “MBT.”
- Advancing until audible knock.
- Using only average-cylinder Pmax.
- Moving calibration before validating TDC phasing.
- Ignoring exhaust-temperature increase from large retard.

# 20. Key lessons

1. The release spark is bounded by the first relevant performance or durability limit.
2. CA50 explains combustion phasing but does not replace torque/electrical efficiency measurement.
3. Pmax and pressure-rise limits can be active before knock.
4. Cylinder statistics matter because one cylinder can limit the whole engine.
5. Pressure measurement quality must be validated before calibrating against it.
# References

<ol class="refs">
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
<li>W. W. Pulkrabek, Engineering Fundamentals of the Internal Combustion Engine.</li>
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
