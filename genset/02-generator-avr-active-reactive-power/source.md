
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Synchronous Generator, AVR, Active/Reactive Power and Capability</h1>
<p><em>P-Q control, power factor, operating-dependent generator losses, capability curves, excitation limiters and synchronization</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why an engine calibration engineer needs generator fundamentals

The engine creates **mechanical torque**.

The generator converts that torque into electrical power.

But the generator also has its own control problem: terminal voltage and reactive power.

The simplest separation is:

```text
Governor / engine torque
        ↓
Active power P

AVR / field excitation
        ↓
Voltage and reactive power Q
```

The two channels interact through machine current, thermal limits and the electrical network.

# 2. Synchronous speed

For a synchronous generator:

$$
n_s=\frac{120f}{N_p}
$$

At nominal 50 Hz with four poles:

$$
n_s=1500\ \mathrm{rpm}
$$

More generally, synchronous speed follows actual electrical frequency. For example at 49.8 Hz:

$$
n_s=1494\ \mathrm{rpm}
$$

So 1500 rpm is a nominal operating point, not an immutable transient value.

At 60 Hz with four poles:

$$
n_s=1800\ \mathrm{rpm}
$$

This is why many large 50 Hz gas gensets are designed around 1500 rpm.

# 3. Active, reactive and apparent power

Active power:

$$
P\ [kW,\ MW]
$$

does useful energy work and ultimately requires engine shaft power.

Reactive power:

$$
Q\ [kVAr,\ MVAr]
$$

supports the electric/magnetic fields of the network and loads.

Apparent power:

$$
S=\sqrt{P^2+Q^2}
$$

Power factor:

$$
PF=\frac{P}{S}
$$

A generator can therefore reach its current or apparent-power limit even when the engine still has mechanical power available.

# 4. Why reactive load can reduce available active power

Suppose the generator has a fixed MVA capability.

If reactive power increases:

$$
Q\uparrow
$$

then for the same apparent-power limit:

$$
P_{max}\downarrow
$$

This creates an **electrical power limit** that must feed back into the permitted engine power request.

# 5. What the AVR does

The automatic voltage regulator changes generator field excitation.

Conceptually:

```text
Voltage / reactive-power target
        ↓
AVR
        ↓
Field current
        ↓
Generator internal magnetic field
        ↓
Terminal voltage / Q response
```

In island operation, the AVR usually plays a major role in holding terminal voltage.

In grid-parallel operation, the grid strongly constrains voltage/frequency and excitation changes mainly influence reactive-power exchange within the allowed control mode.

# 6. Governor and AVR must not fight each other

The governor should not try to correct a voltage problem by adding torque.

The AVR should not try to correct a frequency problem by changing excitation.

A recruit should mentally separate:

```text
P / frequency  → mechanical side
Q / voltage    → excitation side
```

while remembering that the generator capability limit couples them.

# 7. Synchronization before breaker closing

Before connecting a generator to an energized bus, the machine should satisfy the project requirements for:

- voltage magnitude;
- frequency;
- phase sequence;
- phase-angle difference.

The exact synchronization tolerances are project- and grid-code-specific.

The conceptual sequence is:

```text
Engine reaches rated speed
      ↓
Generator voltage is established
      ↓
Frequency matched
      ↓
Voltage matched
      ↓
Phase sequence confirmed
      ↓
Phase angle approaches acceptable window
      ↓
Breaker closes
```

# 8. What changes immediately after synchronization

Before breaker close, the machine can change speed relatively freely.

After connection to a strong grid:

- frequency is constrained by the grid;
- increasing engine torque mainly increases active power export;
- changing excitation mainly changes reactive-power behavior.

This is a fundamental transition in the control structure.

# 9. Generator capability limits

Possible electrical limits include:

- stator current;
- rotor/field current;
- apparent power;
- under/over excitation;
- terminal voltage;
- winding temperature;
- bearing temperature;
- reverse power;
- over/under frequency;
- grid-code protection.

These limits can reduce the active-power request even when the engine itself is healthy.

# 10. Calibration / commissioning procedure

This is more commissioning than combustion calibration, but the engine-control engineer must understand it.

## Step 1 — no-load voltage build

At rated speed, establish generator voltage and verify stable AVR behavior.

## Step 2 — synchronization

Verify safe synchronization logic and breaker-close behavior.

## Step 3 — active-power loading

Increase active power in controlled steps while monitoring:

- kW/MW;
- frequency;
- engine torque request;
- current;
- generator temperatures.

## Step 4 — reactive-power sweep

At selected active-power points, vary reactive-power or power-factor target within the approved capability region.

Measure:

- Q;
- current;
- field current;
- voltage;
- temperatures.

# 11. Main trade-off — active power versus reactive margin

At a given MVA/current capability:

```text
Reactive demand ↑
        ↓
electrical current margin ↓
        ↓
available active power may need to decrease
```

The system-level controller must respect generator capability, not only engine capability.

# 12. Interactive P-Q-PF calculator

<div class="interactive-card">
<h3>Generator power triangle</h3>
<label>Active power P [MW] <input id="pq-p" type="range" min="0.5" max="5.0" step="0.1" value="4.0" oninput="updatePQ()"></label>
<label>Reactive power Q [MVAr] <input id="pq-q" type="range" min="-3.0" max="3.0" step="0.1" value="1.5" oninput="updatePQ()"></label>
<div class="kpis">
<div class="kpi"><strong id="pq-s">–</strong>Apparent power S</div>
<div class="kpi"><strong id="pq-pf">–</strong>Power factor |PF|</div>
</div>
<p id="pq-msg"></p>
</div>

# 13. Generator efficiency is an operating map, not one constant

For a teaching calculation it is convenient to assume:

$$
\eta_{gen}=constant
$$

A real generator behaves more like:

$$
\eta_{gen}
=
f(P,Q,V,T_{winding},cooling,\ldots)
$$

Losses include:

- copper losses;
- iron/core losses;
- windage/ventilation;
- bearing/mechanical losses;
- excitation-related losses.

Therefore the conversion from electrical MW back to required shaft torque should use the approved generator efficiency/loss model when accuracy matters.

# 14. Capability-curve thinking

A synchronous generator capability curve conceptually combines limits such as:

- stator current;
- rotor/field current;
- under-excitation;
- over-excitation;
- thermal boundaries.

The allowed operating region is therefore not a rectangle in P-Q space.

```text
        Q
        ↑
   allowed operating
       region
        │
        └────────→ P
```

At high reactive demand, the remaining active-power margin can shrink.

A plant power coordinator should receive this electrical capability rather than assuming the engine can always use its full mechanical rating.

# 15. Excitation limiters

Advanced AVR systems can include limiting functions such as:

- over-excitation limiting;
- under-excitation limiting;
- stator-current limiting.

These functions should be distinguished from the main voltage regulator itself.

When a limiter becomes active, the commanded Q/voltage response can change even though the normal AVR target has not changed.

# 16. Worked capability example

Suppose a generator is limited to 5.0 MVA. If reactive power is 3.0 MVAr, the maximum active power from that simple apparent-power boundary would be:

$$
P_{max}
=
\sqrt{S^2-Q^2}
=
\sqrt{5^2-3^2}
=
4.0\ \mathrm{MW}
$$

The real generator capability curve can be more restrictive because stator current, field current, under-excitation and thermal limits do not form a perfect circle.

# 17. Calibration / commissioning outputs

Record the approved:

- P-Q capability map;
- generator efficiency/loss map;
- excitation limiter behavior;
- winding/field temperature corrections;
- voltage and reactive-power controller limits.

# 18. Generator P-Q capability illustration
<figure class="figure-card">
<svg viewBox="0 0 820 430" role="img" aria-label="Conceptual generator P-Q capability curve">
<rect x="0" y="0" width="820" height="430" fill="white"/>
<line x1="90" y1="350" x2="760" y2="350" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="380" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="735" y="380" font-size="18" fill="#17324a">P</text>
<text x="55" y="70" font-size="18" fill="#17324a">Q</text>
<path d="M160 330 C220 170, 340 95, 500 90 C650 95, 730 185, 740 310 C650 342, 300 360, 160 330Z"
 fill="#eef4f8" stroke="#5d87ad" stroke-width="3"/>
<line x1="530" y1="350" x2="530" y2="98" stroke="#9bb5c9" stroke-dasharray="8 7" stroke-width="2"/>
<circle cx="530" cy="180" r="7" fill="#17324a"/>
<text x="545" y="177" font-size="15" fill="#17324a">example operating point</text>
<text x="205" y="155" font-size="14" fill="#61717f">under-excitation / stability side</text>
<text x="500" y="72" font-size="14" fill="#61717f">field / rotor-current side</text>
<text x="570" y="328" font-size="14" fill="#61717f">stator-current / MVA side</text>
</svg>
<figcaption>Conceptual P-Q capability envelope. The real curve and limiter structure come from the approved generator documentation; the allowable region is not a simple rectangular P–Q box.</figcaption>
</figure>

# 19. Reactive-power sign convention, leading and lagging power factor

Power-factor language can be confusing because generator and load sign conventions are not always identical.

For this series, use the explicit convention:

$$
Q>0
$$

means **reactive power exported from the generator to the bus**, and:

$$
Q<0
$$

means reactive power absorbed from the bus.

With a common generator convention:

- over-excited operation usually exports reactive power and is often described as lagging power factor;
- under-excited operation absorbs reactive power and is often described as leading power factor.

Do not rely only on the words *leading* and *lagging*. Record:

```text
P sign
Q sign
generator import/export convention
field current
terminal voltage
```

from the actual plant metering definition.

# 20. Power-quality and fault/grid-code awareness

The simple relation:

$$
S=\sqrt{P^2+Q^2}
$$

is the ordinary balanced, sinusoidal steady-state teaching model.

A real generating set can also be constrained by:

- harmonic current / voltage distortion;
- phase-voltage or current unbalance;
- negative-sequence heating;
- short-circuit / fault-current capability;
- grid-code voltage and frequency ride-through requirements.

These are primarily electrical-system topics, but they can change the **allowed active-power envelope** and therefore the permitted engine torque.

# 21. Common mistakes

- Treating power factor as only an electrical reporting number.
- Assuming generator efficiency is constant.
- Treating the P-Q capability envelope as a rectangle.
- Diagnosing a Q/voltage problem as an engine governor problem.
- Using generic capability curves instead of the approved machine curve.

# 22. Key lessons

1. Engine torque primarily supplies active power.
2. Excitation primarily controls voltage/reactive behavior.
3. Generator P-Q limits can become engine power limits.
4. Nominal speed follows electrical frequency.
5. Capability and efficiency must be represented with approved generator data for release work.
# References

<ol class="refs">
<li>ISO 8528-3:2020 — AC generators for generating sets; current after confirmation in 2026.</li>
<li>ISO 8528-4:2025 — Controlgear and switchgear.</li>
<li>IEC 60034-1:2026 — Rotating electrical machines, rating and performance.</li>
<li>IEC 60034-2-2:2024 — Specific methods for determining separate losses of large rotating machines.</li>
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
