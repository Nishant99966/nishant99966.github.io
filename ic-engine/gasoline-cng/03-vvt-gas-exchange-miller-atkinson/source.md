
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>VVT, Valve Timing and Gas Exchange</h1>
<p><em>How IVO, IVC, EVO, EVC and overlap control cylinder filling, residuals, pumping work, Miller/Atkinson operation and turbocharged performance</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why valve timing is a performance actuator

The valves decide when the cylinder can communicate with the intake and exhaust manifolds.

That means valve timing changes much more than airflow.

It changes:

- trapped fresh-air mass;
- residual gas;
- effective compression;
- pumping work;
- volumetric efficiency;
- combustion temperature;
- knock tendency;
- exhaust enthalpy;
- turbocharger response;
- emissions.

A useful way to think about VVT is:

> **Throttle and boost set the pressure environment. Valve timing decides how the cylinder uses that environment.**

# 2. The four valve events

For a conventional four-stroke engine:

- **IVO** — intake valve opens;
- **IVC** — intake valve closes;
- **EVO** — exhaust valve opens;
- **EVC** — exhaust valve closes.

The valve cannot open or close instantaneously, so these events occur away from ideal TDC/BDC positions.

# 3. Intake valve opening — IVO

Opening the intake valve before TDC can help establish flow before the intake stroke begins.

But opening too early can create reverse flow when cylinder pressure is still higher than intake-manifold pressure.

IVO therefore influences:

- overlap;
- residual exchange;
- scavenging;
- low-speed stability;
- turbo response.

# 4. Intake valve closing — IVC is one of the most important events

The piston reaches BDC, but fresh charge may still have momentum and continue entering the cylinder.

At higher speed, later IVC can use this inertia to improve filling.

At low speed, closing too late can allow some mixture to flow back into the intake manifold.

So:

```text
IVC too early
  ↓
less time to fill cylinder
  ↓
possible VE / torque loss

IVC too late at low speed
  ↓
reverse flow
  ↓
effective trapped charge falls
```

# 5. Exhaust valve opening — EVO

Opening the exhaust valve before BDC sacrifices some expansion work but allows blowdown pressure to escape before the exhaust stroke.

Earlier EVO can:

- reduce pumping work during the exhaust stroke;
- increase exhaust energy available to a turbine;
- reduce expansion work.

Later EVO can:

- recover more expansion work;
- reduce available blowdown energy;
- increase exhaust-stroke pumping burden.

This is a direct performance-versus-turbo-energy trade-off.

# 6. Exhaust valve closing — EVC

EVC helps determine how much exhaust residual remains in the cylinder.

Earlier closure can trap more residual gas depending on pressure conditions.

Later closure increases overlap with the opening intake valve.

The resulting behavior depends strongly on:

$$
p_{intake}-p_{exhaust}
$$

not only on crank angle.

# 7. Valve overlap

Valve overlap is the period around gas-exchange TDC when intake and exhaust valves are both open.

It can produce very different results.

### Naturally aspirated engine

At some speeds, exhaust momentum can help pull fresh charge into the cylinder.

At low speed or low manifold pressure, excessive overlap can cause reverse flow and unstable combustion.

### Turbocharged engine

Now exhaust manifold pressure can be higher than intake pressure.

The same overlap can push exhaust back toward the cylinder or intake port.

At another turbo operating point, intake pressure may dominate and scavenging becomes possible.

Therefore:

> **There is no universally “good” overlap angle.**

# 8. Volumetric efficiency connects valve timing to torque

A simple volumetric-efficiency idea is:

$$
\eta_v
=
\frac{m_{air,trapped}}
{\rho_{ref}V_d}
$$

with the exact reference and cycle convention defined by the project.

VVT changes the numerator:

$$
m_{air,trapped}
$$

by changing the time and pressure history through the valves.

That is why two points with the same manifold pressure can have different cylinder air charge.

# 9. Internal EGR and residual gas

Not all trapped cylinder mass is fresh air.

The cylinder can contain:

$$
m_{trapped}
=
m_{fresh\ air}
+
m_{fuel}
+
m_{residual}
+
m_{external\ EGR}
$$

Valve overlap and EVC strongly influence the residual fraction.

Residual gas can:

- reduce oxygen concentration;
- lower combustion temperature;
- reduce NOx;
- increase knock tolerance;
- slow flame propagation;
- reduce combustion stability if excessive.

# 10. Pumping work and valve timing

At part load, a throttled SI engine can spend significant work pulling charge past a partially closed throttle.

VVT can reduce some of this loss by controlling load through the valves instead of only through manifold vacuum.

This is one route toward Miller/Atkinson-style operation.

# 11. The essential idea behind Atkinson and Miller operation

The normal Otto-cycle picture assumes the effective compression and expansion processes use approximately the same geometric stroke.

Miller/Atkinson-style strategies aim to create:

$$
r_{expansion}
>
r_{effective\ compression}
$$

The engine can then extract expansion work over a larger ratio than the ratio used to compress the trapped charge.

In production piston engines, this is often created through **intake-valve timing**, not through a mechanically different crank mechanism.

# 12. Late intake valve closing — LIVC

With LIVC, the intake valve stays open during part of the compression stroke.

Some charge can flow back toward the intake manifold before the valve finally closes.

Effective compression begins later.

```text
Piston passes BDC
      ↓
intake valve still open
      ↓
part of charge returns to intake
      ↓
IVC finally occurs
      ↓
effective compression stroke is shorter
```

Benefits can include:

- lower effective compression temperature;
- lower pumping loss at part load;
- improved knock margin;
- larger expansion/compression ratio relationship.

Costs can include:

- reduced trapped charge;
- lower low-speed torque if not compensated;
- reverse-flow sensitivity;
- more difficult transient air estimation.

# 13. Early intake valve closing — EIVC

EIVC closes the intake valve before BDC.

The trapped charge then expands during the remainder of the downward piston stroke before compression begins.

This also reduces effective compression.

```text
Intake valve closes early
       ↓
charge becomes trapped before BDC
       ↓
piston continues downward
       ↓
charge pressure falls
       ↓
compression begins from a lower pressure
```

EIVC can reduce pumping loss and effective compression temperature without the same amount of backflow associated with LIVC.

But it shortens the available filling period.

# 14. So what is the difference between Atkinson and Miller?

The terminology overlaps in modern production engines.

A practical way to understand it is:

### Atkinson-like operation

Often used to describe an engine that deliberately reduces effective compression through valve timing to improve expansion efficiency, commonly in naturally aspirated or hybrid-oriented applications.

### Miller operation

Often used for the same thermodynamic idea when EIVC or LIVC is combined with **boosting** to recover the fresh-air charge that would otherwise be lost.

The safest engineering statement is:

> Both strategies create an expansion ratio larger than the effective compression ratio; the exact naming convention depends on engine architecture and manufacturer.

# 15. Naturally aspirated Atkinson-like operation

Imagine a naturally aspirated engine at part load.

Instead of closing the throttle heavily:

```text
Conventional:
Throttle closes
   ↓
manifold pressure ↓
   ↓
pumping loss ↑
```

the engine can use a more open throttle and valve timing to reduce trapped charge:

```text
Throttle more open
   ↓
manifold vacuum reduced
   ↓
IVC strategy limits trapped mass
   ↓
same requested torque with lower pumping loss
```

This is especially attractive in hybrid vehicles where the engine can operate in efficient regions and the electric motor supplies transient torque.

# 16. Why naturally aspirated Miller/Atkinson can lose peak torque

Reducing effective compression through EIVC/LIVC usually reduces trapped fresh-air mass.

Without boost, maximum torque can fall.

That is one reason high-efficiency naturally aspirated Atkinson-like engines often have lower specific torque than performance-oriented Otto engines of similar displacement.

# 17. Turbocharged Miller operation

Boost changes the picture.

Suppose EIVC reduces the filling period.

The compressor can raise intake pressure so enough air is still trapped.

```text
EIVC / LIVC
     ↓
effective compression ↓
     ↓
knock tendency ↓
     +
boost ↑
     ↓
trapped fresh-air mass recovered
     ↓
strong torque + improved expansion relationship
```

This is one of the most powerful reasons to combine Miller timing with turbocharging.

# 18. Why boosted Miller can improve knock margin

Effective compression starts from a different trapped state.

That can reduce end-gas temperature during compression.

More knock margin may allow:

- more boost;
- more optimal spark;
- higher geometric compression ratio;
- less enrichment in gasoline applications.

But the result depends on real cylinder temperature, residuals, turbo pressure ratio and combustion speed.

# 19. Turbo backpressure changes the best cam timing

A turbocharged engine has an exhaust manifold upstream of the turbine.

If exhaust pressure becomes high:

$$
p_{exhaust}\gg p_{intake}
$$

large overlap can increase residual backflow.

This can reduce fresh-air charge and slow combustion.

At a point where intake pressure is higher:

$$
p_{intake}>p_{exhaust}
$$

the same overlap can support scavenging.

Therefore a turbocharged VVT map often follows:

- engine speed;
- air charge/load;
- intake pressure;
- exhaust pressure;
- turbo state.

# 20. VVT and turbine response

Valve timing changes exhaust enthalpy delivered to the turbine.

Earlier EVO can increase blowdown energy to the turbine but sacrifices some cylinder expansion work.

More residual trapping can alter combustion temperature and exhaust temperature.

So VVT can influence turbo spool even if wastegate position is unchanged.

# 21. VVT and knock

VVT can change knock through:

- trapped mass;
- residual fraction;
- effective compression;
- charge temperature;
- combustion speed.

For example, more residual dilution can reduce peak temperature and knock tendency, but excessive residual slows the burn and may force more spark advance.

# 22. VVT and emissions

Valve timing can change:

- NOx through temperature and residual dilution;
- HC through residuals, wall interaction and incomplete combustion;
- catalyst temperature through exhaust enthalpy;
- pumping work and therefore CO₂;
- methane conversion indirectly in CNG by changing engine-out CH₄ and catalyst temperature.

# 23. Worked comparison

Consider three conceptual 2000 rpm operating states.

| Strategy | Throttle | IVC | Boost | Trapped air | Pumping loss | Knock margin |
|---|---|---|---|---|---|---|
| Conventional NA | More closed | Normal | None | Medium | Higher | Baseline |
| NA Atkinson-like | More open | LIVC | None | Medium | Lower | Improved |
| Turbo Miller | Open | EIVC/LIVC | Positive | High | Depends on turbo backpressure | Often improved |

The table shows why valve timing cannot be judged without knowing both intake and exhaust pressure.

# 24. A simple interactive IVC model

<div class="interactive-card">
<h3>Intake-valve-closing thought experiment</h3>
<p>This is a teaching model, not a real gas-dynamic calculation.</p>
<label>IVC shift from conventional timing [°CA] <input id="vvt-ivc" type="range" min="-40" max="60" step="5" value="0" oninput="updateVVT()"></label>
<label>Boost compensation [%] <input id="vvt-boost" type="range" min="0" max="40" step="2" value="0" oninput="updateVVT()"></label>
<div class="kpis">
<div class="kpi"><strong id="vvt-fill">–</strong>Relative trapped fresh air</div>
<div class="kpi"><strong id="vvt-comp">–</strong>Relative effective compression</div>
<div class="kpi"><strong id="vvt-knock">–</strong>Conceptual knock margin</div>
</div>
<p id="vvt-msg"></p>
</div>

# 25. Common misunderstandings

## “Later IVC always gives more air”

Only at some speeds and pressure conditions. Too-late IVC can cause backflow.

## “More overlap always improves breathing”

Overlap can help or hurt depending on intake/exhaust pressure and speed.

## “Miller means early IVC only”

Both EIVC and LIVC can create Miller-like effective compression reduction.

## “Atkinson and Miller are completely different thermodynamic ideas”

In modern valve-controlled engines the concepts overlap strongly; the use of boost is often the practical distinction.

## “Boost cancels every disadvantage of Miller timing”

Boost can recover trapped charge, but turbo work, backpressure, temperature and compressor limits remain.


# Calibration procedure and optimization trade-offs

VVT calibration is a classic optimization problem because one valve movement can improve one quantity while worsening another. The objective is not simply to find the cam position that gives the highest torque.

The real question is:

> **Which valve timing gives the best combination of fresh-air filling, pumping work, residual fraction, combustion stability, knock margin, turbo response, emissions and fuel consumption at this operating point?**

## 1. Establish a controlled operating point

Hold as constant as practical:

- engine speed;
- requested torque or fresh-air charge;
- lambda;
- spark-control strategy;
- boost target where applicable;
- coolant/oil temperature;
- fuel or CNG gas state.

Then sweep one cam dimension at a time.

## 2. Intake-cam / IVC sweep

Move intake timing in controlled steps and measure:

- fresh-air charge;
- manifold pressure;
- brake torque;
- pumping work;
- residual fraction where available;
- CA50;
- burn duration;
- COVIMEP;
- knock;
- EGT;
- NOx/HC/CH4.

At low speed, very late IVC can cause backflow. At higher speed, later IVC can use intake-flow inertia and improve filling. Therefore the optimum naturally moves with engine speed.

## 3. Exhaust-cam / EVO-EVC sweep

Exhaust timing changes:

- blowdown energy;
- expansion work;
- pumping work;
- turbine energy;
- residual fraction;
- overlap.

Earlier EVO can help turbine response but sacrifices some expansion work. Later EVO recovers more cylinder work but may reduce turbine energy and increase exhaust-stroke burden.

This is a direct **cylinder-efficiency versus turbo-response** trade-off.

## 4. Overlap must be calibrated using pressure difference

Always interpret overlap together with:

$$
p_{intake}
$$

and:

$$
p_{exhaust}
$$

### Naturally aspirated engine

Overlap may improve scavenging at some speeds, but excessive overlap can create reverse flow and unstable combustion at low speed/load.

### Turbocharged engine

If:

$$
p_{exhaust}>p_{intake}
$$

large overlap can increase internal residuals and reduce fresh-air charge.

If:

$$
p_{intake}>p_{exhaust}
$$

scavenging may become possible.

So the same overlap angle can be helpful at one point and harmful at another.

## 5. Miller / Atkinson calibration

### Step A — record the conventional reference

Measure:

- torque;
- BSFC;
- pumping work;
- knock;
- fresh-air charge;
- CA50/COVIMEP.

### Step B — move toward EIVC or LIVC

Observe the reduction in effective compression and trapped fresh-air mass.

### Step C — evaluate pumping benefit

At part load, a more open throttle together with EIVC/LIVC may reduce throttling loss.

### Step D — re-optimize spark

The changed residual/effective-compression state can change burn speed and knock. Re-optimize spark before comparing efficiency.

### Step E — boosted Miller: add boost gradually

Use the turbo to recover the fresh-air charge lost through EIVC/LIVC. Then check whether the extra compressor/turbine work cancels the efficiency gain.

## 6. Trade-off — naturally aspirated efficiency versus peak torque

More aggressive Atkinson-like timing can reduce pumping loss and effective compression temperature, but it can reduce maximum trapped charge.

So the final map balances:

```text
part-load efficiency
versus
available torque
```

## 7. Trade-off — residual dilution versus stability

More residual gas can reduce NOx and knock, but excessive residual slows combustion and raises COVIMEP.

The final map should stay comfortably before the stability boundary.

## 8. Trade-off — boosted Miller knock margin versus turbo work

Miller timing can improve knock tolerance and allow more optimal spark or a higher compression ratio.

But recovering lost air with boost requires compressor/turbine work and can increase backpressure.

The strategy is useful only while:

```text
knock / pumping benefit
>
extra turbo / backpressure penalty
```

## 9. How the final VVT map is selected

The weighting changes by operating region:

```text
Part load:
BSFC + pumping loss dominate

Full load:
fresh-air charge + knock + turbine/backpressure dominate

Cold catalyst:
stability + exhaust enthalpy may dominate
```

At every grid point, choose the valve timing that gives the best overall compromise, then smooth the map only if the physical trends remain intact.

## 10. Validation across conditions

Validate:

- off-grid speed/load points;
- hot/cold operation;
- altitude;
- tip-in/tip-out;
- turbo spool;
- catalyst-heating operation;
- CNG gas-quality variation;
- gasoline fuel-quality variation.

The final VVT map is therefore a **system optimization map**, not a maximum-airflow map.


# 26. Key lessons

1. Valve timing changes trapped charge, residuals, pumping work, knock and emissions simultaneously.
2. IVC is especially important for volumetric efficiency and effective compression.
3. Overlap must be interpreted using intake and exhaust pressure, not crank angle alone.
4. Miller/Atkinson strategies create an expansion ratio larger than effective compression ratio.
5. LIVC reduces effective compression through backflow after BDC.
6. EIVC reduces effective compression by closing before BDC and allowing trapped charge to expand.
7. Naturally aspirated Atkinson-like operation can improve part-load efficiency but often sacrifices specific torque.
8. Turbocharged Miller operation can use boost to recover charge while retaining reduced effective compression.
9. VVT changes turbo response because it changes blowdown energy, residuals and gas exchange.
10. VVT, turbo, spark, EGR and air-charge models must be treated as one system.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The supplied engine-fundamentals reference explicitly discusses early- and late-intake-valve-closing Miller cycles, the larger expansion ratio relative to effective compression, and the reduction of throttling/pumping work.</li>
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
function updateVVT(){
 const ivc=+document.getElementById('vvt-ivc').value;
 const boost=+document.getElementById('vvt-boost').value;
 const penalty=Math.min(28,Math.abs(ivc)*0.42);
 const fill=Math.max(55,100-penalty+boost);
 const comp=Math.max(65,100-Math.abs(ivc)*0.35);
 const knock=Math.min(140,100+(100-comp)*0.7);
 document.getElementById('vvt-fill').textContent=fill.toFixed(0)+'%';
 document.getElementById('vvt-comp').textContent=comp.toFixed(0)+'%';
 document.getElementById('vvt-knock').textContent=knock.toFixed(0)+'%';
 let mode=ivc<0?'earlier IVC':(ivc>0?'later IVC':'conventional IVC');
 document.getElementById('vvt-msg').innerHTML=`The slider represents <strong>${mode}</strong>. Moving away from conventional IVC reduces effective compression in this simplified model; boost can recover some lost trapped air, which illustrates the basic Miller concept.`;
}
document.addEventListener('DOMContentLoaded',updateVVT);
</script>
