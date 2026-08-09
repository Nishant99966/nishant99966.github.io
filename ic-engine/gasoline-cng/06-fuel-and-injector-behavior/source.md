
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Fuel and Injector Behavior</h1>
<p><em>How requested fuel mass becomes real cylinder energy — CNG gas dynamics, injector nonlinearity, gasoline wall film, GDI and fuel-system torque limits</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why fuel-system behavior belongs in performance calibration

Air establishes the oxygen available for combustion.

Fuel supplies the chemical energy.

The ECU must therefore convert a desired lambda and air charge into a real fuel mass with enough accuracy that:

- torque is correct;
- lambda is correct;
- cylinder balance is correct;
- emissions are controlled;
- transient response is stable.

This is why injector characterization is not only an emissions topic.

# 2. The basic fuel-mass calculation

A simple starting point is:

$$
m_f
=
\frac{m_{air}}
{\lambda AFR_{stoich}}
$$

If fresh-air charge is 420 mg/event, lambda is 1.0 and the illustrative CNG stoichiometric ratio is 17.2:

$$
m_{CNG}\approx24.4\ \mathrm{mg/event}
$$

The ECU still has to turn that mass into an injector command.

# 3. Injector command is not perfectly proportional to pulse width

A simple model is:

$$
t_{inj}
=
t_{effective}
+
t_{dead}
$$

where:

- $t_{effective}$ produces useful flow;
- $t_{dead}$ covers electrical/mechanical opening delay.

At very short pulse widths, the injector can become nonlinear.

This matters strongly at:

- idle;
- deceleration;
- very small torque requests.

# 4. CNG injector flow depends on gas state

CNG is compressible.

Injector mass flow depends on:

- upstream gas pressure;
- downstream manifold pressure;
- gas temperature;
- nozzle effective area;
- pressure ratio;
- gas composition.

A simplified compressible-flow picture has two regimes:

### Subcritical flow

Downstream pressure still influences mass flow.

### Choked flow

Once the pressure ratio crosses a critical value, local flow reaches sonic conditions and the mass-flow sensitivity changes.

The ECU therefore cannot treat a CNG injector like a liquid injector with one fixed mg/ms slope.

# 5. Why gas temperature matters

Gas density changes with temperature:

$$
\rho_{gas}
\propto
\frac{p}{T}
$$

If rail pressure is unchanged but gas temperature rises:

$$
\rho\downarrow
$$

and the same injector-open time can deliver less mass.

This is why gas pressure and temperature compensation are fundamental.

# 6. Regulator and rail dynamics

A CNG system can include:

```text
Tank
 ↓
pressure regulator
 ↓
fuel rail
 ↓
gas injectors
```

During a fast load increase:

- injector flow rises;
- rail pressure can temporarily fall;
- regulator response takes time;
- gas temperature can change.

So transient fuel mass can differ from the steady-state injector map.

# 7. Gas composition changes energy per unit mass

Commercial natural gas is not one pure compound.

Changes in:

- methane;
- ethane/propane;
- CO₂/N₂;
- heating value;

can change the torque produced from the same commanded fuel mass.

Lambda feedback can correct mixture, but it does not automatically make the torque model energy-correct.

# 8. Gasoline PFI: wall film changes transient fueling

For gasoline port injection, not all injected fuel immediately enters the cylinder as vapor.

Some fuel can form a wall film.

During a fast tip-in:

```text
injected fuel ↑
   ↓
part enters wall film
   ↓
cylinder initially receives less fuel than commanded
   ↓
temporary lean error
```

During tip-out, stored wall fuel can evaporate and create a rich tendency.

This is a major difference from gaseous CNG injection.

# 9. Gasoline GDI

Direct injection adds another set of variables:

- rail pressure;
- injection timing;
- number of injections;
- spray targeting;
- mixture preparation;
- evaporation cooling;
- particulate formation.

The same injected mass can produce different combustion behavior depending on injection timing and pressure.

# 10. Minimum pulse width and idle

At very low fuel demand, an injector can approach its minimum controllable pulse width.

Then:

- cylinder-to-cylinder variation increases;
- nonlinear flow becomes important;
- lambda control becomes noisier;
- combustion stability deteriorates.

This can be especially important for large injectors sized for boosted full-load operation.

# 11. Maximum injector duration

At high load, the injector has a finite time window.

If required fuel mass continues increasing:

```text
requested pulse width ↑
      ↓
available injection window reached
      ↓
fuel cannot increase further
      ↓
lambda drifts lean / torque is limited
```

The torque structure should convert this into a maximum achievable torque rather than allowing an impossible request.

# 12. Fuel pressure error becomes torque error

Suppose the ECU expects 24 mg/event but rail pressure falls enough that only 22 mg/event is delivered.

Then:

- lambda changes;
- fuel energy changes;
- torque changes;
- spark/knock behavior may change;
- catalyst behavior changes.

That is why fuel-system monitoring is part of performance control.

# 13. Cylinder-to-cylinder injector variation

Even nominally identical injectors do not flow exactly the same.

If one cylinder is 3% leaner than another:

- its torque contribution can differ;
- CA50 can shift;
- knock or misfire margin can differ;
- emissions can increase.

Cylinder balancing can therefore require fuel correction.

# 14. Fuel energy and torque

A useful high-level relation is:

$$
\dot E_f
=
\dot m_f H_L
$$

where $H_L$ is lower heating value.

Torque then depends on how efficiently that fuel energy becomes indicated work.

So injector calibration is ultimately an **energy-delivery calibration**, not only a lambda task.

# 15. Interactive CNG fuel-mass example

<div class="interactive-card">
<h3>Air, lambda and fuel mass</h3>
<label>Fresh-air charge [mg/event] <input id="fu-air" type="range" min="150" max="800" step="10" value="420" oninput="updateFuel()"></label>
<label>Lambda <input id="fu-lam" type="range" min="0.80" max="1.20" step="0.01" value="1.00" oninput="updateFuel()"></label>
<label>Stoichiometric AFR <input id="fu-afr" type="range" min="14.0" max="18.0" step="0.1" value="17.2" oninput="updateFuel()"></label>
<label>Delivered-mass correction [%] <input id="fu-corr" type="range" min="-10" max="10" step="1" value="0" oninput="updateFuel()"></label>
<div class="kpis">
<div class="kpi"><strong id="fu-req">–</strong>Requested fuel mass</div>
<div class="kpi"><strong id="fu-del">–</strong>Delivered fuel mass</div>
</div>
<p id="fu-msg"></p>
</div>

# 16. CNG versus gasoline summary

| Topic | CNG PFI | Gasoline PFI | Gasoline GDI |
|---|---|---|---|
| Fuel phase upstream | Gas | Liquid + vapor | Liquid injected in-cylinder |
| Rail-state sensitivity | Gas pressure/temp critical | Liquid pressure critical | Very high rail pressure |
| Wall film | Minimal fuel-film effect | Important | Different wall/spray interactions |
| Charge cooling | Limited | Moderate | Strong potential |
| Air displacement | Can be significant | Smaller | Fuel added after intake |
| Transient challenge | Rail/regulator/gas transport | Wall film | Injection timing/spray/rail dynamics |


# Calibration procedure and optimization trade-offs

Fuel-system calibration must convert requested fuel mass into repeatable delivered mass over pressure, temperature, voltage, pulse-width and transient conditions.

## 1. Bench-characterize the injector

Measure delivered mass across:

- pulse width;
- rail pressure;
- downstream pressure;
- supply voltage;
- fuel/gas temperature.

For CNG, vary pressure ratio to capture both subcritical and choked-flow behavior.

The desired model is conceptually:

$$
m_{fuel,delivered}
=
f(t_{inj},p_{rail},p_{manifold},T_{fuel},V_{battery})
$$

## 2. Determine dead time and nonlinear region

Characterize:

- injector dead time;
- minimum controllable pulse width;
- nonlinear transition region.

This is critical at idle and very low load.

## 3. Validate on the engine

Hold air charge and lambda target stable and compare:

- requested fuel mass;
- measured fuel flow;
- lambda;
- cylinder balance;
- torque response.

For CNG, repeat at different rail pressure and gas temperature.

## 4. Calibrate regulator/rail transients

Perform fast load steps and record:

- rail pressure drop;
- regulator recovery;
- delivered lambda;
- torque response.

Add feedforward/transient correction only if the physical rail dynamics require it.

## 5. Trade-off — injector size versus idle controllability

Large injectors provide full-load flow capacity but make small pulse widths difficult to control.

The hardware and calibration must therefore balance:

```text
full-load flow authority
versus
idle resolution
```

## 6. Trade-off — high rail pressure versus system burden

Higher pressure can increase injector flow authority, but raises regulator/injector stress and energy demand.

The final pressure strategy should provide sufficient flow margin without unnecessary hardware load.

## 7. Trade-off — transient correction versus lambda overshoot

Aggressive correction can eliminate a temporary lean event but create a following rich overshoot.

The engineer tunes for:

```text
fast torque response
+
small lambda deviation
+
minimal overshoot
```

## 8. Gasoline-specific calibration

For PFI, calibrate wall-film parameters using controlled tip-in/tip-out tests.

For GDI, optimize:

- rail pressure;
- injection timing;
- injection split.

Trade-offs include:

- charge cooling;
- particulate formation;
- wall wetting;
- combustion stability;
- available injection window.

## 9. Validation

Validate:

- hot/cold fuel;
- low/high battery voltage;
- minimum pulse width;
- full-load duration;
- fast transients;
- injector production spread;
- CNG gas-quality change;
- gasoline ethanol variation.

The final fuel calibration is successful when requested mass becomes **repeatable cylinder energy**, not merely when one steady-state lambda trace looks correct.


# 17. Common mistakes

- Using one fixed CNG injector slope at all pressure ratios.
- Ignoring gas temperature.
- Assuming lambda correction automatically fixes torque-energy error.
- Using gasoline wall-film logic for gaseous CNG.
- Ignoring minimum pulse-width nonlinearity.
- Ignoring maximum injection-window limits.
- Ignoring cylinder injector spread.

# 18. Key lessons

1. Fuel mass is derived from air charge, lambda and stoichiometric ratio.
2. Injector command must be converted into actual delivered mass.
3. CNG injector flow is strongly pressure- and temperature-dependent.
4. CNG rail/regulator dynamics matter during transients.
5. Gas composition changes both stoichiometry and fuel energy.
6. Gasoline PFI adds wall-film dynamics; GDI adds rail pressure, injection timing and spray behavior.
7. Injector limits become torque limits.
8. Fuel accuracy affects torque, knock, combustion stability and catalyst performance simultaneously.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The earlier air-charge article distinguishes CNG gas-pressure/temperature dynamics from gasoline wall-film effects and notes that copying a CNG torque/fuel model to gasoline by changing AFR alone is insufficient.</li>
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
function updateFuel(){
 const air=+document.getElementById('fu-air').value;
 const lam=+document.getElementById('fu-lam').value;
 const afr=+document.getElementById('fu-afr').value;
 const corr=+document.getElementById('fu-corr').value/100;
 const req=air/(lam*afr), del=req*(1+corr);
 document.getElementById('fu-req').textContent=req.toFixed(1)+' mg';
 document.getElementById('fu-del').textContent=del.toFixed(1)+' mg';
 document.getElementById('fu-msg').innerHTML=`A ${corr>=0?'+':''}${(100*corr).toFixed(0)}% delivered-mass error changes both mixture and fuel energy. In a real ECU, lambda feedback may compensate part of the error, but transient torque can still be affected before adaptation catches up.`;
}
document.addEventListener('DOMContentLoaded',updateFuel);
</script>
