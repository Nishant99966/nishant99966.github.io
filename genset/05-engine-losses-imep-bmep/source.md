
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Engine Losses, IMEP/BMEP and Cylinder-to-Electrical Power</h1>
<p><em>Gross/net indicated work, pumping, friction and the calibrated bridge from cylinder pressure to crankshaft torque and generator output</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why engine losses deserve their own calibration

The torque structure requires a bridge from combustion work to crankshaft work.

That bridge is not one constant loss value.

A large gas engine loses work through:

- gas-exchange pumping;
- piston/ring/bearing friction;
- valve-train friction;
- oil and coolant pumps;
- other engine-mounted auxiliaries.

# 2. Indicated work and IMEP

Cylinder pressure gives indicated work:

$$
W_i=\oint p\,dV
$$

Indicated mean effective pressure is:

$$
IMEP=\frac{W_i}{V_d}
$$

Be explicit about whether IMEP is:

- gross IMEP;
- net IMEP.

Gross IMEP normally focuses on compression/expansion work.

Net IMEP includes the gas-exchange loop.

# 3. Brake torque and BMEP

For a four-stroke engine:

$$
BMEP
=
\frac{4\pi T_b}{V_d}
$$

Therefore:

$$
T_b
=
\frac{BMEP\,V_d}{4\pi}
$$

BMEP is useful because it normalizes brake torque by displacement.

# 4. PMEP and FMEP — convention used in this series

Pumping-work sign conventions vary between organizations, so this series defines one explicit convention.

The **signed** gas-exchange work is:

$$
W_{pump}
=
\oint_{gas\ exchange}p\,dV
$$

and is normally negative when the engine must do net work to exchange gas.

This series reports a **positive pumping-loss magnitude**:

$$
PMEP_{loss}
=
-\frac{W_{pump}}{V_d}
\qquad
\text{when }W_{pump}<0
$$

Then:

$$
IMEP_{net}
=
IMEP_{gross}
-
PMEP_{loss}
$$

and mechanical/friction loss is:

$$
FMEP
=
IMEP_{net}
-
BMEP
$$

Therefore:

$$
\boxed{
IMEP_{gross}
=
BMEP
+
FMEP
+
PMEP_{loss}
}
$$

If a project instead stores PMEP as a signed negative quantity, convert the equations consistently rather than mixing conventions.

# 5. Cylinder-to-electrical power path

```text
Cylinder pressure
   ↓
Indicated work / IMEP
   ↓
Friction + gas-exchange losses
   ↓
Brake torque / BMEP
   ↓
Generator shaft input
   ↓
Generator electrical output
```

# 6. Calibration objective

Build a loss model accurate enough that:

$$
T_{internal,req}
=
T_{brake,req}
+
T_{loss}
$$

remains consistent across load and thermal state.

# 7. Instrumentation

Useful development signals include:

- cylinder pressure;
- crank-angle reference;
- engine speed;
- brake/shaft torque where available;
- generator electrical power;
- generator loss model;
- intake pressure;
- exhaust pressure;
- oil temperature;
- coolant temperature;
- accessory state.

# 8. Procedure 1 — indicated versus brake work

At a stable load:

1. calculate net indicated work from cylinder pressure;
2. calculate brake/shaft power at the engine boundary;
3. convert both to consistent torque/BMEP quantities;
4. calculate the residual loss term.

Repeat across load.

# 9. Procedure 2 — pumping work

Use the low-pressure gas-exchange loop:

$$
W_{pump}
=
\oint_{gas\ exchange}p\,dV
$$

Then study how PMEP changes with:

- throttle/mixture hardware;
- Miller timing;
- exhaust backpressure;
- turbo configuration.

# 10. Procedure 3 — temperature dependence

Repeat reference points during:

- cold oil;
- warm-up;
- fully hot stabilized operation.

Cold viscous friction can be materially larger than hot friction.

# 11. Trade-off — model complexity versus robustness

A loss model can depend on:

$$
T_{loss}
=
f(n,load,T_{oil},T_{coolant},p_{intake},p_{exhaust},aux)
$$

At a nominal-speed genset, speed dimensionality is smaller than in automotive calibration, but thermal and gas-exchange effects still matter.

Do not add dimensions that cannot be measured or validated reliably.

# 12. Worked example

Suppose at one stabilized operating point:

```text
Net indicated torque equivalent   30.0 kNm
Measured engine brake torque      27.3 kNm
```

Then the total indicated-to-brake loss is:

$$
T_{loss}
=
30.0-27.3
=
2.7\ \mathrm{kNm}
$$

If gas-exchange analysis attributes 0.8 kNm equivalent to pumping, the remaining mechanical/accessory loss is about 1.9 kNm under the chosen sign/boundary convention.

# 13. Validation

Validate the loss model at:

- low, medium and rated load;
- different oil temperatures;
- different turbo backpressure;
- different Miller/air-path states;
- accessory transitions;
- off-grid points.

# 14. PMEP sign-convention figure

<figure class="figure-card">
<svg viewBox="0 0 820 450" role="img" aria-label="Conceptual p-V diagram showing gross work and pumping loop">
<rect width="820" height="450" fill="white"/>
<line x1="90" y1="380" x2="750" y2="380" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="380" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="705" y="416" font-size="17" fill="#17324a">Volume</text>
<text x="28" y="90" font-size="17" fill="#17324a" transform="rotate(-90 28,90)">Pressure</text>
<path d="M160 330 C175 180,260 90,410 90 C580 95,660 180,665 320 C600 285,470 250,300 270 C215 282,175 305,160 330Z"
 fill="none" stroke="#17324a" stroke-width="3"/>
<path d="M160 330 C275 344,455 350,665 320 C560 372,335 375,160 330Z"
 fill="#eef4f8" stroke="#5d87ad" stroke-width="3"/>
<text x="375" y="180" font-size="15" fill="#17324a">compression / combustion / expansion loop</text>
<text x="335" y="365" font-size="15" fill="#5d87ad">gas-exchange pumping loop</text>
</svg>
<figcaption>Conceptual p–V diagram. This series reports PMEP_loss as a positive loss magnitude. The signed gas-exchange loop work is normally negative for a pumping loss, so PMEP_loss = −W_pump/Vd when W_pump &lt; 0.</figcaption>
</figure>

# 15. Common mistakes

- Mixing gross and net IMEP.
- Mixing engine brake power with generator electrical power.
- Double-counting pumping loss.
- Ignoring sign convention.
- Using a hot loss map during cold start.
- Using cylinder pressure without validated TDC phasing.

# 16. Key lessons

1. The engine loss model is a core torque-model calibration, not a footnote.
2. IMEP, BMEP, PMEP and FMEP must share one defined boundary/sign convention.
3. Gas exchange and friction should be separated where the data supports it.
4. Oil temperature and exhaust backpressure materially change losses.
5. A good loss model makes combustion torque, shaft torque and electrical power agree.
# References

<ol class="refs">
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
<li>ISO 3046-1:2002 — Additional engine performance/declaration requirements; current in 2026 but under revision.</li>
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
