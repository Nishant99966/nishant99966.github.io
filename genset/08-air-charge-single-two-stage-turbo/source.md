
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Air Charge, Single-/Two-Stage Turbocharging and Charge Cooling</h1>
<p><em>Compressor maps, corrected flow/speed, surge/choke, stage matching, turbine power and site-cooling calibration</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Nominal-speed operation changes turbo calibration

Around the nominal 1500-rpm operating point, compressor and turbine behavior move mainly with **engine load and gas-path state**; actual speed still follows electrical frequency and transients.

The typical path is:

```text
low electrical load
   ↓
low exhaust flow / low turbo speed
   ↓
medium load
   ↓
boost builds
   ↓
full load
   ↓
high compressor flow / high turbine power
```

So the calibration axis becomes:

$$
load\rightarrow air\ charge\rightarrow boost
$$

# 2. What must be calibrated

At each load point, determine the air-system state that provides:

- enough oxygen for lean combustion;
- acceptable compressor efficiency;
- adequate knock margin;
- acceptable exhaust backpressure;
- safe turbo speed;
- good electrical efficiency.

# 3. Test-cell procedure

Choose load points such as:

```text
10 / 25 / 50 / 75 / 90 / 100%
```

At each point stabilize:

- 1500 rpm;
- lambda target;
- spark;
- gas quality;
- coolant/oil;
- intake temperature.

Measure:

- MAF;
- manifold pressure;
- manifold temperature;
- compressor inlet/outlet pressure;
- turbo speed if available;
- exhaust-manifold pressure;
- turbine inlet temperature;
- lambda;
- electrical power;
- fuel flow;
- knock;
- cylinder balance.

# 4. Wastegate / bypass sweep

Where the hardware provides turbine bypass or another boost actuator, sweep the control gradually.

The engineer is not searching for maximum boost.

The objective is:

> **minimum compressor/turbine effort that still gives the required fresh-air charge and combustion margin.**

# 5. Trade-off — boost versus pumping loss

More turbine work can raise boost.

But:

$$
p_{exhaust}\uparrow
$$

can increase pumping work and residual gas.

A point with slightly less boost can sometimes give better **net electrical efficiency**.

# 6. Trade-off — air excess versus turbo work

A lean-burn gas engine needs air excess.

Increasing air excess can reduce combustion temperature and NOx.

But pushing more air requires more compressor work and can:

- increase pumping loss;
- move compressor operation;
- lower exhaust temperature;
- affect methane oxidation aftertreatment.

# 7. Trade-off — compressor efficiency versus knock

Low compressor efficiency raises charge temperature.

Higher charge temperature can reduce knock margin and force spark retard.

So the best turbo point is not always the highest pressure ratio.

# 8. Low-load problem

At low load, exhaust energy may be insufficient for strong boost.

The calibration must still maintain:

- stable lean combustion;
- acceptable mixture distribution;
- acceptable turbo operating margin.

This is one reason low-load operation can require a different air/mixture strategy from full load.

# 9. Ambient and altitude correction

At altitude:

$$
p_{compressor,in}\downarrow
$$

so the same manifold pressure requires higher compressor pressure ratio.

The controller may need to derate maximum power to preserve turbo-speed margin.

# 10. Final map selection

At each load point choose the air/turbo state that gives the best compromise among:

- electrical efficiency;
- NOx;
- CH4/THC;
- knock;
- EGT;
- turbo speed;
- compressor efficiency;
- exhaust backpressure.

# 11. Validation

Repeat at:

- hot ambient;
- cold ambient;
- altitude/low inlet pressure;
- degraded intercooler;
- gas-quality extremes;
- load steps;
- sustained 100% load.

# 12. Advanced charging architectures: single-stage and two-stage turbocharging

Modern large gas engines can use either single-stage or multi-stage charging.

## Single-stage concept

```text
Ambient air
   ↓
Compressor
   ↓
Charge-air cooler
   ↓
Mixture / throttle system
   ↓
Engine
```

It is mechanically simpler and can be highly efficient when the required pressure ratio fits one compressor stage well.

## Two-stage concept

```text
Ambient air
   ↓
Low-pressure compressor
   ↓
Intercooling
   ↓
High-pressure compressor
   ↓
Aftercooling / mixture cooling
   ↓
Engine
```

The total pressure ratio is approximately:

$$
\Pi_{total}
=
\Pi_{LP}\Pi_{HP}
$$

For a total ratio of 4, a conceptual split might be:

$$
2\times2=4
$$

rather than forcing one compressor to produce the whole ratio.

The real optimum is not necessarily an equal split.

# 13. Why two stages can help

Splitting pressure ratio can:

- keep each compressor nearer an efficient region;
- reduce temperature rise per stage with intercooling;
- provide higher overall pressure ratio;
- support high Miller-cycle charge demand.

But it adds:

- more hardware;
- more pressure losses;
- more thermal interfaces;
- more surge/choke constraints;
- more control complexity.

# 14. Pressure-ratio split calibration

Where stage control is available, the engineer can sweep the LP/HP contribution at a fixed electrical load.

Measure:

- stage pressure ratios;
- stage outlet temperatures;
- corrected flow;
- turbo speeds;
- exhaust backpressure;
- electrical efficiency;
- knock;
- cylinder charge.

The final split should minimize total compressor/turbine penalty while preserving surge, speed and temperature margins.

# 15. Compressor bypass and low-load operation

Advanced systems may use bypass paths around one compressor stage or around the engine air system.

At low load, forcing all air through a high-pressure-ratio architecture can be inefficient.

A bypass can reduce pumping/compressor losses and improve controllability.

# 16. Charge-air cooling is part of the turbo calibration

Cooling effectiveness changes:

- manifold density;
- knock margin;
- required pressure ratio;
- combustion temperature.

Therefore a turbo map validated with an ideal cold test-cell water circuit may not be valid under hot site cooling conditions.

The turbo calibration must be repeated or corrected across the real low-temperature cooling envelope.

# 17. Where gas is introduced is architecture-specific

The fuel-mixing location changes the air-system problem.

Possible concepts include:

```text
Air compressed first
      ↓
gas added downstream
```

or architectures where an air-gas mixture passes through a larger portion of the charging path.

The choice influences:

- compressor working fluid;
- density and corrected-flow interpretation;
- intake-volume dynamics;
- mixture homogeneity;
- backfire/explosion-risk design;
- transient fuel transport.

Therefore compressor maps and manifold-volume models should always be interpreted using the actual project's mixture architecture.

# 18. Stage interaction during transients

In a two-stage system, the LP and HP stages do not accelerate identically.

During a rapid load increase, monitor:

- LP turbo speed;
- HP turbo speed;
- interstage pressure;
- interstage temperature;
- final manifold pressure.

A controller that achieves the correct final boost can still momentarily push one stage too close to surge or overspeed.

# 19. Compressor-map calculations

Compressor pressure ratio is:

$$
\Pi_c
=
\frac{p_{out,abs}}
{p_{in,abs}}
$$

Corrected flow and corrected speed are used so map position can be compared across inlet conditions. The exact supplier convention must be followed.

A common conceptual form is:

$$
\dot m_{corr}
=
\dot m
\frac{\sqrt{T_{in}/T_{ref}}}
{p_{in}/p_{ref}}
$$

and:

$$
N_{corr}
=
N
\sqrt{\frac{T_{ref}}{T_{in}}}
$$

# 20. Compressor temperature rise

For a compressor efficiency estimate:

$$
T_{out,s}
=
T_{in}\Pi_c^{(\gamma-1)/\gamma}
$$

and:

$$
\eta_c
=
\frac{T_{out,s}-T_{in}}
{T_{out}-T_{in}}
$$

with consistent absolute temperatures.

# 21. Turbo shaft-power balance

A simplified dynamic balance is:

$$
P_t-P_c-P_{mech}
=
J_t\omega_t\frac{d\omega_t}{dt}
$$

At steady turbo speed:

$$
P_t\approx P_c+P_{mech}
$$

This explains why higher boost demand normally requires more turbine work and can increase exhaust backpressure.

# 22. Full calibration procedure

At 25/50/75/100% load:

1. calculate compressor pressure ratio;
2. place measured corrected flow and speed on the supplier map;
3. identify efficiency island;
4. quantify surge margin;
5. quantify turbo-speed margin;
6. measure exhaust backpressure;
7. calculate/estimate compressor outlet temperature;
8. evaluate electrical efficiency and knock.

# 23. Compressor-map interpretation
<figure class="figure-card">
<svg viewBox="0 0 820 460" role="img" aria-label="Illustrative compressor map with genset load points">
<rect width="820" height="460" fill="white"/>
<line x1="90" y1="390" x2="750" y2="390" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="390" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="590" y="430" font-size="17" fill="#17324a">Corrected mass flow</text>
<text x="25" y="85" font-size="17" fill="#17324a" transform="rotate(-90 25,85)">Pressure ratio</text>
<path d="M150 350 C130 280,135 210,175 120" fill="none" stroke="#17324a" stroke-width="3"/>
<text x="112" y="110" font-size="14" fill="#17324a">surge line</text>
<path d="M185 330 C280 250,420 220,650 250" fill="none" stroke="#9bb5c9" stroke-width="2"/>
<path d="M205 350 C315 270,480 250,705 300" fill="none" stroke="#9bb5c9" stroke-width="2"/>
<path d="M225 365 C350 305,535 300,725 340" fill="none" stroke="#9bb5c9" stroke-width="2"/>
<text x="665" y="250" font-size="13" fill="#61717f">speed lines</text>
<ellipse cx="430" cy="255" rx="170" ry="90" fill="none" stroke="#c7d7e4" stroke-width="2"/>
<ellipse cx="430" cy="255" rx="115" ry="58" fill="none" stroke="#c7d7e4" stroke-width="2"/>
<text x="390" y="250" font-size="14" fill="#61717f">higher ηc</text>
<g fill="#17324a">
<circle cx="230" cy="338" r="7"/><circle cx="330" cy="303" r="7"/><circle cx="455" cy="266" r="7"/><circle cx="590" cy="255" r="7"/>
</g>
<text x="205" y="360" font-size="13">25%</text><text x="305" y="325" font-size="13">50%</text>
<text x="430" y="288" font-size="13">75%</text><text x="565" y="277" font-size="13">100%</text>
<text x="690" y="370" font-size="14" fill="#61717f">choke / high-flow region →</text>
</svg>
<figcaption>Illustrative nominal-speed load path on a compressor map. Real calibration uses supplier compressor maps, corrected flow/speed definitions, measured turbo speed and validated surge/choke margin.</figcaption>
</figure>

# 24. Turbine-side calibration and map interpretation

The compressor cannot be calibrated correctly without understanding the turbine that supplies its shaft power.

A simple turbine expansion ratio can be written as:

$$
\Pi_t
=
\frac{p_{t,in}}{p_{t,out}}
$$

using absolute pressure. Supplier maps can use total-to-total, total-to-static or other defined conventions, so the project must use the map supplier's exact pressure basis.

A first-law interpretation of actual turbine power is:

$$
P_t
\approx
\dot m_{exh}c_p
\left(
T_{t,in}-T_{t,out}
\right)
$$

when a suitable mean $c_p$ is used.

Turbine isentropic efficiency can be expressed conceptually as:

$$
\eta_t
=
\frac{T_{t,in}-T_{t,out}}
{T_{t,in}-T_{t,out,s}}
$$

where $T_{t,out,s}$ is the ideal isentropic outlet temperature for the same pressure ratio.

Supplier turbine maps can also use corrected flow and corrected speed. A common conceptual form is:

$$
\dot m_{t,corr}
=
\dot m_t
\frac{\sqrt{T_{t,in}/T_{ref}}}
{p_{t,in}/p_{ref}}
$$

but the actual normalization convention must come from the supplier.

# 25. What to look for on the turbine side

At each load point monitor:

- turbine inlet/outlet absolute pressure;
- turbine inlet/outlet temperature;
- corrected turbine flow;
- turbo speed;
- wastegate / bypass position where fitted;
- exhaust-manifold pressure.

The trade-off is:

```text
More turbine expansion
        ↓
more compressor shaft power

BUT

exhaust manifold pressure can increase
        ↓
PMEP / residual fraction can increase
        ↓
engine brake efficiency can fall
```

For a two-stage charging system, both turbine stages should be checked independently, not only the final boost pressure.

# 26. Common mistakes

- Using gauge pressure in a pressure-ratio calculation.
- Plotting uncorrected flow on a corrected-flow map.
- Calibrating only manifold pressure and ignoring compressor map position.
- Looking only at final boost in a two-stage system.
- Ignoring charge-cooler site-water temperature.

# 27. Key lessons

1. Boost pressure is not the calibration objective; fresh-air charge and system efficiency are.
2. Compressor maps require corrected quantities and absolute pressure ratio.
3. Two-stage systems need stage-specific transient monitoring.
4. Turbine backpressure is part of the engine efficiency trade-off.
5. Site cooling and gas-mixing architecture change the real operating map.
# References

<ol class="refs">
<li>Wärtsilä 46TS-SG current product documentation — current commercial example of a large lean-burn gas engine using two-stage turbocharging; cited only as evidence of technology relevance.</li>
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>L. Guzzella and C. H. Onder, Introduction to Modeling and Control of Internal Combustion Engine Systems, 2nd ed.</li>
<li>W. W. Pulkrabek, Engineering Fundamentals of the Internal Combustion Engine.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
