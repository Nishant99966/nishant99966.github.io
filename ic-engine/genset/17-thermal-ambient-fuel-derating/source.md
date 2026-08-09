
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Thermal, Ambient, Fuel-Quality and Generator Derating</h1>
<p><em>Declared-power reference conditions, heat balance, turbo/cooling/generator limits and safe gross/net power at site extremes</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Rated power is only available inside an environmental and thermal envelope

A genset nameplate power does not mean identical output is always safe at:

- 40°C intake air;
- high altitude;
- poor gas quality;
- restricted cooling.

Performance calibration must define when and how power is derated.

# 2. Important limits

- turbo speed;
- compressor outlet temperature;
- turbine inlet temperature;
- exhaust valve temperature;
- catalyst temperature where fitted;
- coolant temperature;
- oil temperature;
- peak cylinder pressure;
- knock;
- gas-system flow capacity;
- generator current/temperature.

# 3. Calibration procedure

At rated load, progressively stress one boundary:

- intake temperature;
- ambient pressure;
- coolant temperature;
- gas quality.

Measure when the first hardware/combustion limit approaches.

# 4. Build power-derating maps

Conceptually:

$$
P_{max}
=
f(T_{ambient},p_{ambient},T_{coolant},gas\ quality,\ldots)
$$

The requested electrical power is then limited to:

$$
P_{allowed}
=
\min(P_{request},P_{max})
$$

# 5. Trade-off — rated power versus durability

Operating exactly at a thermal limit may maximize short-term output but leave no margin for:

- sensor error;
- production spread;
- aging;
- transient overshoot.

The calibration should protect lifetime, not only pass one test.

# 6. Altitude

Low ambient pressure increases compressor pressure ratio for the same manifold target.

Turbo-speed margin can become the first limitation.

# 7. Hot ambient

High inlet temperature:

- reduces air density;
- increases compressor outlet temperature;
- reduces knock margin.

This can require lower load even if gas supply is sufficient.

# 8. Gas-quality derating

Low methane number can reduce knock margin.

Low LHV can increase required gas-system flow.

Different gas-quality problems can therefore cause different derating mechanisms.

# 9. Thermal memory

A machine that has operated at full load for an hour is not thermally equivalent to one that reached full load ten seconds ago.

Protection models must consider stored thermal energy.

# 10. Validation

Perform sustained and repeated-load tests long enough to expose:

- heat soak;
- turbo/cooling limits;
- generator thermal limits;
- oil/coolant steady state.

The final derating map should provide predictable output without abrupt or unstable power reduction.

# 11. Generator and auxiliary-system thermal limits

Maximum electrical output can also be limited by:

- generator stator temperature;
- generator rotor/field temperature;
- bearing temperature;
- charge-air cooling capacity;
- radiator/heat-exchanger capability;
- ventilation temperature.

These are system limits, not only engine limits.

# 12. Net-power derating versus gross-power derating

At high ambient temperature, cooling fans and pumps may consume more auxiliary power.

So even if gross generator power remains unchanged:

$$
P_{net}
=
P_{gross}-P_{aux}
$$

can fall.

A plant-level derating strategy should therefore state whether its power limit refers to:

- engine shaft power;
- gross electrical power;
- net exported electrical power.

# 13. Derating hierarchy

A useful strategy is:

```text
Normal operating control
      ↓
Soft power derate
      ↓
Operator / supervisory alarm
      ↓
Hard protective limit
      ↓
Trip if safe operation cannot be maintained
```

The next article separates these protection levels in more detail.

# 14. Heat-balance thinking

Fuel energy can be conceptually divided into:

```text
Electrical/shaft output
Coolant heat
Exhaust heat
Charge-air cooling heat
Radiation / other losses
```

A thermal calibration should ask where additional heat goes when:

- spark is retarded;
- boost increases;
- lambda changes;
- power increases.

A change that reduces cylinder pressure can move more energy into the exhaust system.

# 15. Generator capability interaction

High ambient temperature can simultaneously reduce:

- engine knock/air margin;
- radiator capability;
- generator winding cooling.

The system derate should therefore use the most restrictive combined limit rather than separate independent derates that can conflict.

# 16. Rated-power reference conditions

Declared engine power should be tied to the approved reference-condition framework.

ISO 15550 and ISO 3046-1 are relevant to engine power/fuel-consumption declaration and test conditions.

A site derating map should therefore clearly distinguish:

- declared reference condition;
- actual site ambient;
- charge-cooling condition;
- gas quality;
- generator thermal state.

# 17. Common mistakes

- Treating rated power as independent of reference conditions.
- Applying separate engine and generator derates without one final coordinator.
- Ignoring auxiliary-power increase at hot ambient.
- Using one gas-quality derate for both low methane number and low LHV.
- Removing derate as soon as temperature crosses one threshold without hysteresis.

# 18. Key lessons

1. Derating is a system capability map, not a single temperature limiter.
2. Engine, turbo, cooling, fuel and generator limits can all become the active power limit.
3. Reference-condition definitions matter when comparing site performance with declared power.
4. Thermal memory requires time/history-aware protection.
5. Gross and net power can derate differently because auxiliary demand changes.

# References

<ol class="refs">
<li>ISO 8528-1:2018 — Application, ratings and performance (current in 2026; revision under development).</li>
<li>ISO 8528-5:2025 — Generating sets; design and performance criteria.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
<li>ISO 3046-1:2002 — Additional engine performance/declaration requirements; current in 2026 but under revision.</li>
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
