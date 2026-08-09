
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Miller Timing, Gas Exchange and Turbo Matching at Nominal 1500 rpm</h1>
<p><em>Geometric/effective/expansion ratio, EIVC/LIVC, nominal-speed optimization and the boost-work trade-off</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Nominal-speed Miller timing is still a load-dependent gas-exchange problem

Advanced nominal-speed gas engines can use Miller-cycle intake-valve timing to reduce effective compression temperature and improve knock margin.

The core idea is:

$$
r_{expansion}>r_{effective\ compression}
$$

through early or late intake-valve closing.

# 2. Fixed cam versus variable cam hardware

Not every genset has variable valve timing.

So there are two cases:

## Fixed Miller timing

The cam timing is hardware-defined.

Calibration work focuses on validating:

- charge;
- knock;
- turbo matching;
- efficiency;
- emissions;

across load and ambient conditions.

## Variable valve timing

If VVT is available, valve timing itself becomes a calibration dimension.

# 3. Why turbocharging and Miller timing belong together

Miller timing can reduce effective trapped charge.

The turbocharger can recover that charge by increasing intake pressure.

Conceptually:

```text
Miller timing
   ↓
effective compression temperature ↓
knock margin ↑
   +
boost
   ↓
air charge recovered
```

# 4. Calibration procedure with variable timing

At a fixed load:

1. hold 1500 rpm;
2. hold lambda;
3. hold spark target;
4. sweep intake timing;
5. measure air charge, boost, exhaust pressure, efficiency and knock;
6. then re-optimize turbo control.

# 5. Trade-off — knock margin versus turbo work

More aggressive Miller effect can improve knock.

But recovering torque needs more boost.

That can increase:

- compressor work;
- exhaust backpressure;
- turbo speed.

The best point is where the knock/efficiency gain remains larger than turbo losses.

# 6. Trade-off — pumping work versus expansion work

Valve timing and exhaust-valve opening can alter:

- pumping loop;
- expansion work;
- turbine enthalpy.

Earlier exhaust opening may help turbine power but reduce cylinder expansion work.

# 7. Nominal-speed design advantage

Because rpm is fixed, gas-dynamic behavior is easier to characterize than in an automotive engine.

The main sweep becomes:

```text
load × ambient × gas quality
```

rather than a large speed map.

# 8. Full-load validation

At full load check:

- turbo speed;
- compressor margin;
- exhaust pressure;
- peak pressure;
- knock;
- electrical efficiency;
- EGT.

The Miller/turbo combination must remain balanced under the worst hot/altitude condition.

# 9. Nominal-speed Miller timing: the main genset case

A nominally fixed-speed genset has an important design advantage:

> The valve timing can be optimized around a very narrow speed region.

That means advanced gas engines can use **fixed Miller-oriented valve timing** designed specifically for nominal 1500-rpm operation.

In that case, the calibration engineer does not “sweep a VVT map” in production.

Instead, the job is to validate how the fixed gas-exchange design behaves across:

- electrical load;
- boost;
- exhaust backpressure;
- ambient temperature;
- altitude;
- gas quality.

# 10. Early intake-valve closing

One Miller implementation uses early intake-valve closing.

Conceptually:

```text
Intake valve closes before BDC
        ↓
trapped charge expands during rest of intake stroke
        ↓
effective compression starts from lower pressure/temperature
        ↓
knock tendency can reduce
```

Turbocharging is then used to recover the fresh-air charge needed for power.

# 11. Late intake-valve closing

Another implementation uses late intake-valve closing:

```text
Piston begins compression
      ↓
intake valve remains open
      ↓
some charge can move back toward intake
      ↓
effective compression begins later
```

Both can create the same high-level goal:

$$
r_{expansion}
>
r_{effective\ compression}
$$

# 12. Calibration procedure for a fixed Miller design

At each load:

1. measure trapped fresh-air charge;
2. measure manifold and exhaust pressure;
3. measure compressor/turbo operating point;
4. optimize lambda;
5. optimize ignition/CA50;
6. evaluate Pmax/knock;
7. calculate electrical efficiency.

The calibration variable is mainly **air/turbo/mixture/ignition coordination around the fixed valve timing**.

# 13. Variable valve timing as an advanced alternative

Some engines may also use variable cam phasing.

Where available, VVT adds another optimization dimension.

But it should be presented as an architecture option, not assumed for every nominally fixed-speed genset.

# 14. Main trade-off — Miller benefit versus charging-system work

A stronger Miller effect can improve knock margin and allow more favorable combustion phasing.

But if too much charge is lost, the turbo system must work harder.

The final system benefit exists only if:

```text
combustion / knock / expansion benefit
>
extra compressor + turbine + pumping penalty
```

This is why Miller timing and turbo matching should be evaluated as one thermodynamic system.

# 15. Geometric, effective and expansion ratios

Three ratios should be kept separate.

## Geometric compression ratio

$$
r_g
=
\frac{V_{BDC}}{V_{TDC}}
$$

This is fixed by engine geometry.

## Effective compression ratio

$$
r_{eff}
$$

depends on when the intake valve effectively traps the charge.

Miller timing can reduce this relative to the geometric value.

## Expansion ratio

$$
r_{exp}
$$

describes the volume ratio available during expansion.

The key Miller/Atkinson idea is:

$$
r_{exp}>r_{eff}
$$

without requiring the geometric piston stroke to change.

This distinction prevents the common misunderstanding that Miller operation physically changes the engine's geometric compression ratio during operation.

# 16. Calibration procedure

For a fixed Miller hardware design:

1. establish gas-exchange pressures at each load;
2. measure trapped fresh-air charge;
3. place turbo operation on compressor maps;
4. optimize lambda;
5. optimize ignition;
6. quantify knock/Pmax benefit;
7. quantify pumping/backpressure cost;
8. compare electrical efficiency with the reference design/strategy.

# 17. Miller valve-timing illustration
<figure class="figure-card">
<svg viewBox="0 0 820 440" role="img" aria-label="Miller intake valve closing concepts">
<rect width="820" height="440" fill="white"/>
<line x1="90" y1="350" x2="750" y2="350" stroke="#52697a" stroke-width="2"/>
<text x="90" y="388" font-size="14">TDC</text><text x="375" y="388" font-size="14">BDC</text><text x="700" y="388" font-size="14">TDC</text>
<path d="M95 320 C160 190,260 120,390 140 C510 155,610 230,710 320" fill="none" stroke="#c7d7e4" stroke-width="6"/>
<path d="M100 315 L100 130 L305 130 L305 315" fill="none" stroke="#17324a" stroke-width="5"/>
<text x="185" y="112" font-size="14" fill="#17324a">EIVC example</text>
<path d="M100 315 L100 205 L500 205 L500 315" fill="none" stroke="#5d87ad" stroke-width="5"/>
<text x="405" y="190" font-size="14" fill="#5d87ad">LIVC example</text>
<text x="255" y="338" font-size="13" fill="#61717f">intake stroke</text>
<text x="510" y="338" font-size="13" fill="#61717f">compression stroke</text>
</svg>
<figcaption>Conceptual valve-event comparison. EIVC and LIVC are different ways to reduce effective compression relative to expansion; the actual valve lift and closing angles are engine-design-specific.</figcaption>
</figure>

# 18. Optional EGR and dilution architectures

External EGR is **not universal** on large lean-burn gas gensets, so it should be treated as an architecture option rather than a default assumption.

Where used, dilution can:

- reduce combustion temperature;
- reduce NOx;
- improve knock margin;
- change pumping work.

But excessive dilution can:

- slow combustion;
- increase COVIMEP;
- increase CH4/partial-burn risk;
- change turbocharger flow and backpressure.

A generic optimization is:

```text
0% dilution reference
      ↓
increase EGR / residual fraction
      ↓
re-optimize spark
      ↓
measure efficiency, NOx, CH4, CA50 and COVIMEP
      ↓
select a target with margin from the stability boundary
```

Internal residual-gas control through valve timing can create similar combustion effects without a separate external-EGR circuit.

The torque/air model must distinguish:

```text
fresh oxygen-bearing air
from
total trapped cylinder mass
```

when dilution is present.

# 19. Common mistakes

- Calling geometric compression ratio “reduced” when only effective compression changes.
- Assuming all industrial Miller engines have VVT.
- Evaluating Miller timing without re-matching boost.
- Ignoring exhaust backpressure.
- Claiming an efficiency gain from lower knock alone without checking turbo work.

# 20. Key lessons

1. Miller timing changes effective compression, not the fixed geometric ratio.
2. Nominal-speed engines can optimize valve timing around a narrow speed range.
3. Boost can recover charge lost by EIVC/LIVC.
4. Miller and turbo matching must be evaluated as one system.
5. The benefit exists only if combustion/knock gains exceed extra charging and pumping losses.
# References

<ol class="refs">
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
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
