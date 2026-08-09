
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Engine Thermal Protection and Derating</h1>
<p><em>How exhaust, turbo, catalyst, coolant, oil, charge-air and cylinder-pressure limits become torque limits without destroying drivability</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Performance is always limited by hardware temperature somewhere

An engine can have enough air, enough fuel and enough knock margin and still be unable to deliver the requested torque.

Why?

Because a component can become too hot.

Common thermal constraints include:

- exhaust valve temperature;
- turbine inlet temperature;
- turbocharger housing temperature;
- catalyst brick temperature;
- piston crown or ring-land temperature;
- cylinder-head temperature;
- coolant temperature;
- oil temperature;
- charge-air temperature.

Thermal protection converts these physical limits into torque, air, spark or lambda limits.

# 2. Thermal protection is not one limiter

A useful picture is:

```text
Requested torque
      ↓
maximum air / boost capability
      ↓
combustion limits
      ↓
thermal limits
      ↓
permitted sustainable torque
```

Different components can become limiting at different operating points.

# 3. Exhaust-gas temperature and turbine inlet temperature

High load increases:

- fuel energy;
- cylinder temperature;
- exhaust mass flow.

Spark retard can also increase exhaust enthalpy.

Therefore:

```text
load ↑ or spark retard ↑
        ↓
exhaust enthalpy ↑
        ↓
exhaust valve / turbine / catalyst thermal load ↑
```

A torque strategy that is safe for the cylinder can still be unsafe for the exhaust system.

# 4. Catalyst temperature

A three-way catalyst needs high temperature for conversion but cannot survive unlimited temperature.

So the catalyst has two opposite requirements:

```text
Too cold
  ↓
poor conversion

Useful temperature window
  ↓
high conversion

Too hot
  ↓
accelerated aging / damage risk
```

This is why catalyst-heating spark retard is temporary rather than a permanent performance strategy.

# 5. Coolant temperature

Coolant temperature reflects the cylinder head/block thermal state.

High coolant temperature can reduce:

- knock margin;
- oil cooling capability;
- component durability margin.

The ECU may respond by limiting:

- air charge;
- boost;
- torque.

# 6. Oil temperature

Hot oil reduces viscosity and can threaten:

- bearing protection;
- turbocharger bearing life;
- piston cooling effectiveness.

Cold oil increases friction.

So oil temperature affects both:

- performance availability;
- torque-loss estimation.

# 7. Charge-air temperature

High compressor outlet or manifold temperature can:

- reduce air density;
- increase knock tendency;
- increase combustion temperature;
- force spark retard.

Therefore intercooler performance can become a torque limit on a hot day even when boost pressure looks normal.

# 8. Turbo speed is a mechanical/thermal limit

At altitude, compressor inlet pressure falls.

To maintain the same outlet pressure:

$$
\Pi_c\uparrow
$$

The compressor may need more turbo speed.

So an altitude condition can hit turbo-speed limit before the same engine at sea level.

The torque structure should then reduce the maximum available air charge.

# 9. Peak cylinder pressure and pressure-rise rate

These are not temperatures, but they belong in the same protection layer.

High cylinder pressure can limit torque before knock occurs.

Similarly, high pressure-rise rate can create:

- mechanical stress;
- combustion noise;
- bearing load.

So maximum torque can be limited by normal-combustion pressure even when knock is absent.

# 10. Protection actuators

The ECU has several ways to reduce thermal or mechanical load.

<div class="callout-grid">
<div class="callout"><h3>Reduce air / boost</h3>Most direct way to lower sustainable cylinder load.</div>
<div class="callout"><h3>Change spark</h3>Can reduce cylinder pressure but may increase exhaust temperature if heavily retarded.</div>
<div class="callout"><h3>Change lambda</h3>Gasoline engines may enrich at high load; stoichiometric CNG strategies may prefer other measures where possible.</div>
<div class="callout"><h3>Change VVT</h3>Can alter trapped charge, residuals and exhaust enthalpy.</div>
<div class="callout"><h3>Limit torque rate</h3>Prevents repeated thermal overshoot during transients.</div>
</div>

# 11. Why spark retard can solve one limit and worsen another

Suppose peak cylinder pressure is too high.

Retarding spark can reduce the pressure peak.

But:

```text
spark retard
   ↓
later heat release
   ↓
more exhaust energy
   ↓
EGT / turbine / catalyst temperature can rise
```

So the protection strategy must know **which component is limiting**.

# 12. Gasoline enrichment for protection

In some high-load gasoline engines, enrichment is used to:

- reduce exhaust temperature;
- improve knock margin;
- protect components.

This moves the engine away from stoichiometric TWC operation and increases fuel consumption.

It is therefore a protection strategy, not a free performance gain.

# 13. CNG high-load protection

CNG often has good knock resistance and may be operated stoichiometrically over a wide range.

But CNG still has:

- exhaust temperature limits;
- turbine limits;
- peak-pressure limits;
- gas-injector/rail-flow limits.

Methane's knock resistance does not make the hardware thermally unlimited.

# 14. Model-based temperature protection

Not every component can carry a production thermocouple.

The ECU may estimate temperature using models based on:

- speed;
- load;
- lambda;
- spark;
- exhaust mass flow;
- coolant/oil temperature;
- ambient state.

A model can then produce:

```text
estimated component temperature
        ↓
distance to limit
        ↓
maximum allowed torque / air charge
```

# 15. Why thermal limits have memory

Temperature is a stored state.

A component heated for 30 seconds does not instantly cool when torque falls.

A simplified model is:

$$
C\frac{dT}{dt}
=
\dot Q_{in}-\dot Q_{out}
$$

So a thermal limiter may remain active after the driver reduces load.

This is different from an instantaneous pressure limit.

# 16. Derating should be progressive

A well-behaved protection strategy often avoids a sudden cliff.

Conceptually:

```text
safe region
   ↓
soft derate begins
   ↓
available torque gradually reduced
   ↓
hard protection if critical limit approached
```

This improves drivability while preserving hardware.

# 17. Example

Driver asks for 200 Nm.

The engine could physically produce 210 Nm from air/fuel.

But:

```text
Turbo-speed limit      → 190 Nm
Catalyst-temp limit    → 180 Nm
Coolant-temp limit     → 195 Nm
```

The sustainable permitted torque becomes approximately:

$$
T_{max}=180\ \mathrm{Nm}
$$

The driver request remains 200 Nm, but the torque coordinator should pass only 180 Nm downstream.

# 18. Interactive thermal-derating example

<div class="interactive-card">
<h3>Which component limits torque?</h3>
<label>Driver request [Nm] <input id="th-req" type="range" min="80" max="240" value="200" oninput="updateTherm()"></label>
<label>Turbo limit [Nm] <input id="th-turbo" type="range" min="80" max="240" value="190" oninput="updateTherm()"></label>
<label>Catalyst limit [Nm] <input id="th-cat" type="range" min="80" max="240" value="180" oninput="updateTherm()"></label>
<label>Coolant/oil limit [Nm] <input id="th-fluid" type="range" min="80" max="240" value="195" oninput="updateTherm()"></label>
<div class="kpis"><div class="kpi"><strong id="th-out">–</strong>Permitted torque</div></div>
<p id="th-msg"></p>
</div>


# Calibration procedure and optimization trade-offs

Thermal-protection calibration converts real component capability into a predictable torque limit. The objective is not to keep every component as cool as possible; it is to use the available thermal capacity **without crossing durability limits**.

## 1. Define protected components and boundaries

For each component establish:

- normal operating region;
- soft-derate region;
- hard protection region.

Examples:

- turbine inlet temperature;
- catalyst brick temperature;
- exhaust-valve model temperature;
- coolant/oil temperature;
- turbo speed;
- peak cylinder pressure.

## 2. Validate temperature/protection models

Where direct measurement exists, compare model versus thermocouple/sensor across:

- speed/load;
- spark;
- lambda;
- ambient temperature;
- transient heating/cooling.

A model that is too optimistic risks hardware. A model that is too conservative wastes performance.

## 3. Calibrate progressive derating

As the estimated state approaches the limit, reduce maximum allowed torque gradually.

Trade-off:

```text
early derate
→ high durability margin
but
→ unnecessary performance loss
```

```text
late derate
→ maximum performance
but
→ reduced protection margin
```

## 4. Select the correct actuator for the limiting component

### Peak cylinder pressure limiting

Spark retard or air reduction may help.

### Turbine/catalyst temperature limiting

Heavy spark retard can worsen exhaust temperature, so air/boost reduction may be better.

### Gasoline exhaust temperature limiting

Enrichment may be available, but it increases fuel consumption and moves away from the ideal TWC window.

The protection action must address the **actual limiting component**.

## 5. Include thermal memory

Run sustained-load tests long enough to reach the real thermal state.

Then validate cooling/recovery after load reduction.

Protection margins should include:

- sensor/model uncertainty;
- production spread;
- aging;
- ambient extremes.

## 6. Worst-case validation

Test:

- high ambient temperature;
- altitude;
- repeated acceleration;
- sustained high load;
- catalyst-hot conditions;
- low cooling-air flow where relevant.

The final derating map balances **maximum usable performance** against repeatable durability protection.


# 19. Common mistakes

- Treating every high-load limit as knock.
- Using spark retard for every protection problem.
- Ignoring catalyst/turbine temperature while protecting cylinder pressure.
- Ignoring thermal memory.
- Assuming sea-level boost is safe at altitude.
- Using a hard torque cut where progressive derating would work.
- Forgetting that coolant/oil state also changes friction and torque estimation.

# 20. Key lessons

1. Maximum performance is always bounded by component capability.
2. Thermal protection can enter the torque structure as a maximum allowed torque.
3. Spark retard can reduce cylinder pressure while increasing exhaust temperature.
4. Turbo, catalyst, coolant, oil and charge-air temperatures create different limits.
5. CNG knock resistance does not remove exhaust or mechanical limits.
6. Temperature has memory, so thermal protection is dynamic.
7. Good derating protects hardware while preserving predictable drivability.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The ignition and lambda/TWC articles already establish the opposing effects of spark retard on cylinder torque and exhaust temperature; the knock article covers peak-pressure and pressure-rise protections.</li>
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
function updateTherm(){
 const req=+document.getElementById('th-req').value, a=+document.getElementById('th-turbo').value, b=+document.getElementById('th-cat').value, c=+document.getElementById('th-fluid').value;
 const out=Math.min(req,a,b,c);
 let who=out===req?'driver request':(out===a?'turbo system':(out===b?'catalyst':'coolant/oil system'));
 document.getElementById('th-out').textContent=out.toFixed(0)+' Nm';
 document.getElementById('th-msg').innerHTML=`The current limiting source is <strong>${who}</strong>. The torque structure should pass the minimum physically permitted value downstream rather than asking the air path for impossible torque.`;
}
document.addEventListener('DOMContentLoaded',updateTherm);
</script>
