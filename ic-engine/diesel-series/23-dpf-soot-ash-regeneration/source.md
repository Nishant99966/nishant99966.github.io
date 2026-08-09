
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>DPF Soot Loading, Ash and Regeneration Calibration</h1>
<p><em>Pressure-drop models, soot mass balance, passive/active regeneration, oil dilution and lifetime filter state</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. DPF state cannot be inferred from one pressure value

A conceptual DPF pressure-drop model is:

$$
\Delta p_{DPF}
=
f(\dot m_{exh},T_{exh},soot,ash)
$$

The same soot mass can produce different pressure drop at different exhaust flows and temperatures.

# 2. Soot versus ash

Soot is combustible carbonaceous material.

Ash is non-combustible residue, often influenced by lubricant additives and wear-related material.

Normal regeneration removes soot but not ash.

# 3. Soot model

A useful soot state balance is:

$$
\frac{dm_{soot}}{dt}
=
\dot m_{soot,in}
-
\dot m_{soot,oxidized}
$$

Engine-out soot formation drives the first term.

Passive and active oxidation drive the second.

# 4. Passive regeneration

Passive soot oxidation can occur when exhaust temperature and chemistry are favorable.

Simplified reactions include:

$$
C+O_2\rightarrow CO_2
$$

and NO2-assisted oxidation:

$$
C+2NO_2\rightarrow CO_2+2NO
$$

# 5. Active regeneration

When passive oxidation is insufficient, the system may intentionally raise DPF temperature.

Possible actuators include:

- post injection;
- exhaust fuel dosing;
- VGT or exhaust throttling;
- intake throttling;
- electrically assisted heating on selected architectures.

# 6. Regeneration state machine

A robust strategy can use states such as:

```text
normal filtration
   ↓
regeneration requested
   ↓
temperature build
   ↓
controlled soot oxidation
   ↓
completion verification
```

# 7. Thermal-rate control

The risk is not only maximum temperature.

Large soot mass plus strong oxygen availability can create a rapid exotherm.

The controller may need to manage:

- inlet temperature;
- oxygen;
- soot mass;
- regeneration ramp rate.

# 8. Oil dilution

Late or post injection can increase the risk of fuel reaching the cylinder wall and entering the oil on some architectures.

Monitor:

- oil level;
- viscosity;
- fuel dilution;
- regeneration frequency.

# 9. Ash service state

A filter with low modeled soot but persistently high corrected pressure drop may need ash cleaning or replacement.

Do not keep increasing regeneration frequency.

# 10. Calibration procedure

1. characterize clean-filter pressure drop;
2. build soot loading under controlled operation;
3. fit flow-temperature pressure-drop model;
4. validate passive oxidation;
5. calibrate active-regeneration entry and exit;
6. validate high-soot exotherm;
7. validate aged and ash-loaded states.

# 11. Model reconciliation with differential pressure

A robust soot estimator can combine:

```text
modelled soot production/oxidation
+
DPF differential-pressure evidence
```

If model and pressure disagree, do not blindly force one state to the other.

Possible causes include:

- pressure-sensor bias;
- ash;
- cracked filter;
- flow-model error.

# 12. Regeneration completion

Completion can be confirmed using several indicators:

- modeled soot mass;
- corrected differential pressure;
- temperature history;
- oxidation integral.

A timer alone cannot distinguish a successful regeneration from a failed one.

# 13. Regeneration frequency as a health metric

At matched duty:

```text
regeneration interval ↓
```

can indicate:

- more engine-out soot;
- lower passive oxidation;
- DOC aging;
- ash/pressure-model error.

Trend it as a diagnostic quantity.

# 14. Thermal runaway prevention

High soot mass creates greater exotherm potential.

Before aggressive regeneration, the system should know whether soot is inside the validated safe-entry window.

# 15. Ash is a maintenance state, not a regeneration state

Ash cannot be removed by normal DPF regeneration.

As ash accumulates, it can:

- reduce effective filter volume;
- raise corrected pressure drop;
- change soot-storage capacity.

The service model should therefore track soot and ash as separate state variables.

# 16. Calibration objects and signals

Typical calibration objects include:

```text
engine-out soot model
passive oxidation model
DPF pressure-drop model
active-regeneration entry threshold
temperature target
regeneration ramp
completion criterion
ash/service correction
```

Signals should include:

```text
exhaust flow
DPF inlet/outlet temperature
DPF differential pressure
modelled soot
ash/service state
post-injection / thermal actuator
DOC state
fuel dilution / oil state where monitored
```

# 17. Production and aging robustness

Validate:

- clean filter;
- high soot;
- aged/ash-loaded filter;
- differential-pressure sensor bias;
- DOC aging;
- low/high ambient.

A regeneration map should not rely on one clean development filter.

# 18. Soot-production map quality

The DPF model is only as good as the engine-out soot estimate.

Build soot production as a function of:

- speed;
- fuel quantity;
- air/O2;
- EGR;
- injection timing/pressure;
- transient state.

High transient soot can be underrepresented by a steady-state map.

# 19. Regeneration fuel accounting

Track the fuel used specifically for active regeneration.

A low engine-out soot calibration can reduce:

- regeneration frequency;
- regeneration fuel;
- oil-dilution exposure.

This can justify a small steady-state BSFC penalty if the mission-level fuel result improves.

# 20. Filter damage diagnostics

Unexpectedly **low** differential pressure at a known exhaust flow can also be suspicious.

Possible causes include:

- cracked filter;
- pressure-line/sensor problem.

The diagnostic model should detect both excessive and implausibly low restriction.

# 21. Post-service validation

After DPF cleaning/replacement:

- verify pressure baseline;
- reset only the approved ash/soot learned states;
- confirm regeneration and sensor plausibility.

Do not erase unrelated adaptations without a defined service procedure.

# 22. Common mistakes

- Equating raw DPF differential pressure with soot mass.
- Treating ash as regenerable.
- Using post injection without oil-dilution validation.
- Ending regeneration by timer only.
- Validating only a fresh, clean filter.

# 23. Key lessons

1. DPF calibration needs separate flow, temperature, soot and ash states.
2. Soot loading is a mass balance between engine-out production and oxidation.
3. Active regeneration is a controlled thermal event.
4. Oil-dilution and catalyst-temperature penalties must be included.
5. Ash belongs to lifetime service modeling, not soot regeneration.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.cummins.com/en-eu/components/aftertreatment/twin-module-aftertreatment-system/product-overview">Cummins EPA27 Twin Module Aftertreatment official page</a> — current commercial example of electrically assisted aftertreatment thermal management.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
