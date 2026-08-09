
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Cooling, Thermal State, Ambient and Torque Derating</h1>
<p><em>How coolant, oil, charge air, fuel temperature, altitude and aftertreatment backpressure define allowable heavy-duty torque</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Thermal state changes the entire calibration

A heavy-duty engine's allowable torque and emissions behavior depend on:

- coolant temperature;
- oil temperature;
- charge-air temperature;
- fuel temperature;
- ambient pressure;
- ambient temperature;
- aftertreatment temperature.

# 2. Cooling-system boundary

Engine heat rejection can be approximated as:

$$
\dot Q
=
\dot m_{coolant}c_p\Delta T
$$

The calibration engineer should understand:

- coolant flow;
- thermostat or bypass state;
- fan strategy;
- radiator capacity;
- charge-air cooler circuit.

# 3. Oil temperature and friction

Cold oil increases viscous friction.

Very hot oil reduces lubrication margin and accelerates degradation.

The loss model should therefore include thermal state.

# 4. Charge-air temperature

Higher intake-manifold temperature reduces charge density.

This can reduce:

- fresh oxygen;
- smoke margin;
- full-load torque.

It can also change NOx and ignition delay.

# 5. Fuel temperature

Fuel temperature changes density, viscosity and hydraulic leakage.

At high fuel temperature, a high-pressure system can lose delivery margin.

# 6. Altitude

Lower ambient pressure shifts the compressor operating point and reduces available oxygen.

A conceptual maximum-torque coordinator can be:

$$
T_{allowed}
=
\min(
T_{air},
T_{turbo},
T_{fuel},
T_{thermal},
T_{Pmax},
T_{driveline}
)
$$

# 7. Heat-soak memory

A short high-load event can leave:

- turbocharger;
- piston;
- coolant;
- oil;
- catalyst;

hot even after requested torque falls.

Protection and derating therefore often need thermal-state memory rather than one instantaneous temperature threshold.

# 8. Cooling fan and efficiency

A faster fan can reduce coolant and charge-air temperature but consumes more power.

The system optimum is not automatically maximum cooling.

# 9. Aftertreatment backpressure

A soot- or ash-loaded DPF increases exhaust backpressure and pumping work.

The resulting torque or fuel penalty can appear as an engine-efficiency problem if the aftertreatment state is ignored.

# 10. Hot-ambient validation

At a high-ambient test point, log:

- fresh-air mass;
- charge temperature;
- turbo speed;
- fuel temperature;
- coolant and oil;
- DPF backpressure;
- permitted torque.

Do not validate derating from ambient temperature alone.

# 11. Derating architecture

A useful implementation calculates separate capability limits and exposes the active reason:

```text
air limit
turbo limit
fuel-system limit
coolant/oil limit
Pmax/MPRR limit
aftertreatment limit
driveline limit
```

Then the minimum allowable torque wins.

# 12. Crankcase ventilation, blow-by and oil consumption

Heavy-duty diesel calibration also interacts with the crankcase system.

Blow-by carries combustion gas and oil aerosol past the piston rings.

A closed crankcase ventilation system can route separated gas back into the intake.

Monitor abnormal changes in:

- crankcase pressure;
- oil consumption;
- separator restriction;
- intake-oil contamination.

High oil consumption can increase:

- blue smoke;
- particulate/ash loading;
- catalyst contamination.

Do not try to correct an oil-control problem with injection timing or smoke-limiter maps.

# 13. Component thermal-state models

Instantaneous gas temperature is not always the same as component thermal stress.

A simple lumped thermal model is:

$$
mc_p\frac{dT_{component}}{dt}
=
\dot Q_{in}
-
\dot Q_{out}
$$

This explains why protection can depend on thermal history.

Relevant component states can include:

- piston crown;
- cylinder head;
- exhaust manifold;
- turbine inlet housing;
- turbo bearing;
- coolant;
- oil;
- compressor outlet;
- injector/fuel temperature;
- DPF/SCR substrate.

# 14. Continuous, temporary and hard limits

Separate:

```text
continuous operating limit
temporary / time-integrated limit
soft torque derate
hard protection / shutdown
```

A short high-load event can be allowed where continuous operation is not.

# 15. Calibration execution standard

## Objective

Maximize available torque without exceeding component lifetime or immediate-protection boundaries.

## Signals to log

```text
measured temperatures
modelled component temperatures
time-at-temperature integrals
turbo speed
Pmax/MPRR
fuel temperature
DPF/SCR temperature
active derate reason
```

## Validation

Include sustained grade, repeated accelerations, hot soak, altitude and high aftertreatment backpressure.

# 16. Senior calibration deep dive — derate shaping

A good derate avoids sudden torque cliffs where possible.

A generic soft derate can transition between:

```text
warning threshold
→ progressive torque reduction
→ minimum allowed torque
→ hard protection if condition continues
```

Use hysteresis so torque does not repeatedly rise/fall around one threshold.

## Thermal-model validation

For each modelled component:

1. instrument a development engine where feasible;
2. run heating and cooling transients;
3. fit the model time constant/heat transfer;
4. validate at a different speed/load trajectory.

A steady-state temperature correlation is not enough for transient protection.

## Multiple simultaneous limits

At altitude and hot ambient, the engine can hit:

- turbo-speed;
- charge-temperature;
- coolant;
- fuel-temperature;

limits together.

The torque coordinator should preserve and log the first/most restrictive cause so field diagnosis remains possible.

# 17. Common mistakes

- Treating hot-ambient derating as one temperature lookup.
- Ignoring hot-fuel leakage.
- Comparing BSFC at different oil temperatures.
- Increasing fan speed without accounting for parasitic power.
- Calibrating around a restricted DPF or dirty charge-air cooler.

# 18. Key lessons

1. Thermal state changes friction, air density, fuel hydraulics and durability margin.
2. Altitude and hot ambient are multi-domain torque-limit problems.
3. Thermal memory matters after high-load operation.
4. Aftertreatment restriction feeds back into engine efficiency.
5. A good derating coordinator identifies the active physical limit.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
