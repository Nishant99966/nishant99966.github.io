
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Fuel System and Injection Hardware</h1>
<p><em>Common rail, unit-injection alternatives, hydraulic delay, injector characterization and the physical limits behind the ECU command</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. The ECU command is not the fuel spray

The physical fuel path is:

```text
tank / supply
   ↓
filtration / water separation
   ↓
low-pressure pump
   ↓
high-pressure generation
   ↓
rail or unit pump
   ↓
injector control valve / needle
   ↓
nozzle holes
   ↓
spray
```

A calibration engineer must understand the hydraulic system behind the software variable.

# 2. Common rail

In common rail, pressure generation is substantially decoupled from the timing of one cylinder's injection event.

Benefits include independent control of pressure, timing and multiple injection events.

# 3. Unit-injection and other architectures

Common rail is important but not universal.

Large heavy-duty and off-highway engines can use electronically controlled unit injection or unit pumps.

Use architecture-neutral concepts such as injection pressure, actual injected mass, hydraulic SOI and rate shape.

# 4. Commanded versus delivered quantity

Conceptually:

$$
m_{inj}
=
f(ET,p_{fuel},T_{fuel},\rho_f,injector,voltage)
$$

where $ET$ is energizing time.

The fuel model must compensate for injector non-linearity, pressure, temperature, production variation and leakage.

# 5. Electrical command versus hydraulic SOI

```text
start of energizing
      ↓
electromagnetic / hydraulic delay
      ↓
needle motion
      ↓
actual start of injection
```

Fuel pressure, voltage, viscosity and injector condition can change the delay.

# 6. Injection rate shape

The same total fuel mass can have different rate shapes.

A fast early rate can raise premixed heat release and MPRR.

A long late tail can raise soot, EGT and fuel consumption.

# 7. High-pressure pump work

Higher injection pressure can improve atomization and mixing but costs pumping work and increases hardware loading.

The efficiency optimum is therefore not always maximum pressure.

# 8. Injector characterization

Useful development data include:

- quantity versus energizing time and pressure;
- hydraulic delay;
- rate of injection;
- minimum controllable quantity;
- event-to-event interaction;
- leak-off;
- temperature sensitivity.

# 9. Fuel-system protection

Monitor low supply pressure, rail or injection-pressure tracking, fuel temperature, water detection where fitted and pump or injector fault states.

# 10. Nozzle-flow intuition

A simplified liquid-orifice relation is:

$$
\dot m_f
\approx
C_d A
\sqrt{2\rho_f\Delta p}
$$

where $C_d$ is discharge coefficient, $A$ is effective flow area, $\rho_f$ is fuel density and $\Delta p$ is the pressure difference across the nozzle.

This equation is only an intuition. Real injector flow includes:

- needle motion;
- cavitation;
- compressibility;
- sac/nozzle dynamics;
- transient pressure waves.

Still, it explains why delivered rate changes with both pressure and fuel density.

# 11. Minimum controllable quantity

Pilot injection can become unreliable near the injector's minimum controllable quantity.

Symptoms include:

- large shot-to-shot variation;
- inconsistent hydraulic delay;
- merged pilot/main events;
- unstable cylinder balance.

The pilot map should therefore have a hardware-valid lower boundary rather than extrapolating toward zero.

# 12. Rail-pressure control interaction

During a large fueling transient, rail pressure can fall because injector outflow momentarily exceeds pump supply.

Log:

```text
rail target
rail actual
pump command
pressure-control valve
total injection demand
```

before blaming the torque model.

# 13. Production variation

Characterize more than one injector.

At minimum, understand:

- nominal;
- high-flow;
- low-flow;
- aged or representative deterioration.

A calibration based on one golden injector can fail production robustness.

# 14. Rail-pressure control-loop calibration

For common-rail hardware, pressure control deserves its own calibration procedure.

A simplified rail mass balance is:

$$
\frac{dm_{rail}}{dt}
=
\dot m_{pump}
-
\dot m_{injectors}
-
\dot m_{leak}
$$

The calibration must therefore handle injection demand as a disturbance.

## Static characterization

At representative speeds and fuel temperatures, determine:

- pump command versus delivered flow;
- pressure-control valve authority;
- leakage sensitivity;
- maximum sustainable pressure at high injection demand.

## Dynamic characterization

Apply controlled injection-demand steps and record:

```text
rail target
rail actual
pump / metering command
pressure-control valve
total injected quantity
fuel temperature
battery / supply voltage
```

Measure:

- pressure dip;
- overshoot;
- settling time;
- oscillation.

## Calibration objects

- rail-pressure target map;
- pump feedforward;
- pressure-controller gains;
- rate limits;
- hot-fuel correction;
- failure fallback.

## Robustness

Repeat with:

- hot fuel;
- low supply pressure;
- high-flow injector sample;
- aged representative pump/injector where available.

A rail controller that works only with a nominal cold fuel system is not production-ready.

# 15. Fuel-system capability map

Build a capability surface rather than a single maximum-pressure number.

A useful boundary is:

$$
p_{inj,max}
=
f(
n_e,
m_{fuel,total},
T_{fuel},
p_{supply}
)
$$

At high speed and high total injection demand, pump flow—not nominal pressure rating—can become the limiting factor.

# 16. Injector electrical and hydraulic aging

Aging can change:

- coil/actuator response;
- control-valve leakage;
- needle friction;
- nozzle deposits;
- leak-off.

This can move both quantity and hydraulic SOI.

Monitor long-term adaptation separately from a hard fault threshold.

# 17. Quantity linearization

Near very small pilot quantities, the relationship:

```text
energizing time → delivered mass
```

can be strongly nonlinear.

Use measured injector data to build the linearization and do not extrapolate the main-injection slope into the pilot region.

# 18. High-load duration check

At point D, verify that total injection duration and end of injection leave enough time for useful combustion before expansion and exhaust blowdown.

A fuel-system calibration can meet demanded mass yet still be poor if too much of that mass arrives late.

# 19. Common mistakes

- Treating commanded mg/stroke as perfectly delivered fuel mass.
- Assuming electrical SOI equals hydraulic SOI.
- Using maximum injection pressure across the map.
- Ignoring injector event interaction at short dwell.
- Assuming all modern heavy-duty diesels are common rail.

# 20. Key lessons

1. Injection calibration must be grounded in hydraulic hardware behavior.
2. Common rail gives flexibility but does not eliminate injector nonlinearity or delay.
3. Rate shape matters in addition to total fuel mass.
4. Injection pressure trades spray quality against pump work and durability.
5. Hardware characterization belongs upstream of combustion map optimization.

# References

<ol class="refs">
<li><a href="https://www.bosch-mobility.com/en/solutions/powertrain/diesel/modular-common-rail-system-ohw/">Bosch modular common-rail system for large/off-highway diesel engines</a> — current high-pressure injection architecture reference.</li>
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
