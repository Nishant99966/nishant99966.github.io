
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Prechamber Combustion, Lean-Limit Extension and Cylinder Balancing</h1>
<p><em>Jet ignition physics, λPC, pressure differential, prechamber fuel fraction, instrumentation, aging margin and cylinder diagnosis</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why prechamber combustion is important in large lean-burn gas engines

A prechamber allows a small energetic ignition region to create strong jets/flame kernels that ignite a much leaner main-cylinder mixture than a conventional spark plug alone could reliably ignite.

Modern multi-megawatt lean-burn gas engines can use actively scavenged or fueled prechambers to extend lean combustion while maintaining ignition robustness.

# 2. What must be optimized

Depending on hardware architecture, relevant parameters can include:

- prechamber fuel quantity;
- prechamber/main-chamber mixture relationship;
- ignition timing;
- main-cylinder lambda;
- gas pressure;
- cylinder-specific trims.

# 3. Baseline prechamber calibration procedure

At one load point:

1. establish stable main lambda;
2. stabilize spark and turbo state;
3. vary prechamber fueling/mixture in controlled steps;
4. measure cylinder pressure and stability;
5. identify minimum prechamber energy/fuel that gives reliable ignition.

# 4. Trade-off — ignition robustness versus fuel consumption

More prechamber enrichment/energy can improve:

- ignition reliability;
- lean-limit margin.

But too much can:

- waste fuel;
- increase local NOx;
- alter pressure rise;
- create thermal stress.

So the optimum is **enough ignition authority, not maximum prechamber fueling**.

# 5. Cylinder balancing

At each load, compare cylinders for:

- IMEP;
- COVIMEP;
- CA50;
- knock;
- EGT;
- misfire.

A cylinder-specific correction may be necessary.

# 6. Diagnose before trimming

A weak cylinder can be caused by:

- gas injector variation;
- prechamber restriction;
- ignition system;
- valve/compression issue;
- air-distribution difference.

Do not use a fuel trim to hide a mechanical fault.

# 7. Lean-limit mapping

At stable load, gradually lean the main mixture while keeping prechamber settings controlled.

Observe when:

- COVIMEP rises;
- methane/THC rises;
- CA50 becomes unstable;
- misfire begins.

The production target should remain with margin from this boundary.

# 8. Trade-off — lean operation versus CH4

Stronger prechamber ignition may extend the lean limit.

But if the main chamber becomes too lean, incomplete burn still increases methane.

The prechamber does not remove the basic combustion-stability trade-off.

# 9. Validation

Repeat across:

- low/high load;
- gas-quality extremes;
- hot/cold conditions;
- aging;
- cylinder hardware variation.

# 10. How an active prechamber actually ignites the main chamber

A useful physical sequence is:

```text
Prechamber receives a locally ignitable mixture
        ↓
Spark initiates combustion in prechamber
        ↓
Prechamber pressure rises
        ↓
Hot reacting jets leave through nozzle holes
        ↓
Several energetic ignition sites enter main chamber
        ↓
Lean main mixture ignites at multiple locations
        ↓
Main-chamber burn becomes faster and more robust
```

The advantage is not simply “a stronger spark.”

The jets combine:

- thermal energy;
- radicals/reactive species;
- high momentum;
- turbulence generation.

That helps ignite a main mixture that may be too lean for one conventional flame kernel to burn reliably.

# 11. Passive versus actively fueled prechambers

## Passive prechamber

The prechamber is filled mainly through gas exchange with the main chamber.

Advantages:
- simpler fuel system.

Challenges:
- prechamber mixture is strongly coupled to main-chamber conditions.

## Actively fueled / scavenged prechamber

A separate small gas flow can create a locally richer or more ignitable prechamber mixture.

Advantages:
- stronger control over ignition energy;
- larger lean-limit authority.

Challenges:
- additional fuel metering;
- pressure control;
- cylinder-specific variation;
- thermal loading.

# 12. What the calibration engineer actually changes

Depending on architecture:

- prechamber gas quantity;
- prechamber gas pressure;
- timing of prechamber gas delivery;
- main-chamber lambda;
- ignition timing;
- cylinder-specific prechamber trim.

# 13. Detailed prechamber/lean-limit optimization procedure

## Step 1 — establish the main-chamber reference

At one load, stabilize:

- air charge;
- main lambda;
- ignition;
- temperatures.

## Step 2 — start with conservative prechamber fueling

Use enough prechamber fuel to obtain robust combustion.

## Step 3 — reduce or increase prechamber authority systematically

For each setting measure:

- IMEP;
- COVIMEP;
- CA50;
- Pmax;
- pressure-rise rate;
- knock;
- NOx;
- CH4/THC;
- prechamber/exhaust temperature where available.

## Step 4 — lean-limit test

Once prechamber operation is stable, gradually increase main-chamber lambda.

Observe the point where:

- COVIMEP rises;
- CH4 rises;
- CA50 variation rises;
- partial burn/misfire appears.

The useful operating point should remain before this steep degradation.

# 14. Main trade-off — ignition robustness versus prechamber fuel

More prechamber fuel/energy can:

- extend the lean limit;
- reduce cycle variability;
- improve load-step robustness.

But it can also:

- consume more fuel;
- increase local temperature;
- increase NOx tendency locally;
- increase pressure-rise severity;
- increase prechamber component thermal stress.

The optimum is therefore **minimum prechamber effort that gives the required main-chamber stability margin**.

# 15. Nozzle and jet behavior

Nozzle-hole geometry is mainly a hardware-design parameter, not a normal calibration map.

But the calibration engineer should understand its consequences.

Jet penetration and direction influence:

- how many regions ignite;
- how quickly the flame spreads;
- local wall interaction;
- pressure-rise shape.

A change in prechamber fuel pressure can also change jet momentum even if the nominal fuel mass is similar.

# 16. Cylinder balancing with prechambers

A cylinder can be weak because of:

- main gas distribution;
- prechamber gas distribution;
- ignition hardware;
- nozzle deposits/restriction;
- compression;
- valve condition;
- cooling difference.

Therefore balancing should be diagnostic.

A cylinder-specific gas trim should not be the first response to every weak cylinder.

# 17. Aging and fouling validation

Prechamber performance should be checked with realistic aging/deposit conditions where possible.

A calibration that works only with clean new hardware may have insufficient ignition margin in service.

# 18. Useful prechamber state variables

To understand an actively fueled prechamber, useful conceptual quantities include:

### Prechamber mixture strength

$$
\lambda_{PC}
$$

or the equivalent fuel-air equivalence ratio.

### Prechamber-to-main pressure difference

$$
\Delta p_{PC-main}
=
p_{PC}-p_{main}
$$

### Prechamber fuel fraction

$$
x_{PC,fuel}
=
\frac{m_{fuel,PC}}
{m_{fuel,total}}
$$

These variables explain why the same total engine fuel flow can produce very different ignition behavior.

# 19. Instrumentation for prechamber development

Depending on test hardware, development can use:

- prechamber pressure;
- main-cylinder pressure;
- prechamber gas pressure;
- prechamber fuel flow;
- optical tools in research engines;
- cylinder-resolved exhaust temperature.

The production ECU may not measure all of these.

They are development tools used to establish robust maps and margins.

# 20. Trade-off — pressure differential versus jet authority

Higher prechamber pressure relative to the main chamber can increase jet momentum.

But excessive pressure rise can increase:

- nozzle thermal/mechanical stress;
- pressure-rise severity;
- local wall interaction.

This gives another reason not to equate “stronger prechamber” with “better calibration.”

# 21. Worked calibration example

At a fixed medium-high load:

1. hold main lambda at the approved reference;
2. establish stable prechamber fuel fraction;
3. reduce prechamber fuel in small steps;
4. watch COVIMEP and CA50 spread;
5. then increase main lambda until stability degrades;
6. move back to a target with defined stability margin.

A useful result is not “maximum prechamber fuel.”

It is:

> the minimum prechamber authority that permits the required main-chamber lean target with robust cylinder-to-cylinder stability.

# 22. Prechamber pressure-trace illustration
<figure class="figure-card">
<svg viewBox="0 0 820 430" role="img" aria-label="Prechamber and main chamber pressure traces">
<rect width="820" height="430" fill="white"/>
<line x1="90" y1="350" x2="750" y2="350" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="350" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="600" y="395" font-size="17" fill="#17324a">Crank angle</text>
<text x="20" y="90" font-size="17" fill="#17324a" transform="rotate(-90 20,90)">Pressure</text>
<path d="M120 330 C260 320,340 295,400 190 C430 130,460 105,500 160 C550 235,620 285,710 310" fill="none" stroke="#17324a" stroke-width="3"/>
<path d="M120 332 C300 330,360 300,400 205 C418 165,438 145,455 170 C500 245,590 292,710 314" fill="none" stroke="#5d87ad" stroke-width="3"/>
<text x="500" y="150" font-size="14" fill="#17324a">prechamber</text>
<text x="520" y="245" font-size="14" fill="#5d87ad">main chamber</text>
<line x1="420" y1="70" x2="420" y2="350" stroke="#9bb5c9" stroke-dasharray="7 6"/>
<text x="345" y="65" font-size="13" fill="#61717f">jet discharge / ignition coupling</text>
</svg>
<figcaption>Schematic only: an actively fueled prechamber can develop an early pressure rise and discharge energetic reacting jets into the main chamber. Real traces depend strongly on hardware, load, λPC and timing.</figcaption>
</figure>

# 23. Common mistakes

- Using total gas flow without separating prechamber fuel.
- Treating stronger jet momentum as automatically better.
- Correcting a weak cylinder before checking prechamber hardware condition.
- Calibrating lean limit only on new/clean hardware.
- Ignoring prechamber pressure instrumentation uncertainty.

# 24. Key lessons

1. Prechamber combustion is an ignition-energy and jet-dynamics problem, not simply a richer spark plug.
2. λPC, pressure differential and prechamber fuel fraction are useful development state variables.
3. The production target needs aging/fouling margin.
4. Cylinder balancing should diagnose the source before applying trims.
5. Prechamber and main lambda must be optimized together.
# References

<ol class="refs">
<li>W. W. Pulkrabek, Engineering Fundamentals of the Internal Combustion Engine.</li>
<li>L. Guzzella and C. H. Onder, Introduction to Modeling and Control of Internal Combustion Engine Systems, 2nd ed.</li>
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
