
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Volumetric Efficiency and Cylinder Filling</h1>
<p><em>Why manifold pressure is not air charge — temperature, valve timing, residuals, wave tuning, turbocharging and CNG displacement</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why volumetric efficiency deserves its own article

Cylinder air charge is one of the most important quantities in a spark-ignition engine.

But air charge is not determined by manifold pressure alone.

At the same manifold pressure, trapped fresh-air mass can change because of:

- engine speed;
- intake temperature;
- valve timing;
- intake-runner dynamics;
- residual gas;
- exhaust backpressure;
- turbocharger state;
- gaseous-fuel displacement.

Volumetric efficiency is the idea that connects all of those effects.

# 2. A simple definition

A common conceptual definition is:

$$
\eta_v
=
\frac{m_{fresh\ air,trapped}}
{\rho_{ref}V_d}
$$

The exact reference density, cylinder/displacement basis and per-cycle convention must be defined by the project.

The physical meaning is simple:

> **How effectively does the engine fill its displacement with fresh air?**

# 3. Why 100% is not a hard ceiling

A naturally aspirated engine can sometimes achieve volumetric efficiency near or above 100% because of:

- intake-wave tuning;
- ram effect;
- favorable valve timing;
- low restriction.

A boosted engine can exceed 100% by a much larger amount because intake density is intentionally increased.

So volumetric efficiency is not the same thing as “percentage throttle.”

# 4. Same MAP does not mean same charge

Imagine two points at 100 kPa manifold pressure.

Point A:

```text
1500 rpm
early IVC
cool intake air
low exhaust backpressure
```

Point B:

```text
4500 rpm
different IVC
hot intake air
higher exhaust backpressure
```

The trapped air can be very different.

The ECU therefore needs a cylinder-filling model rather than a simple pressure-to-torque conversion.

# 5. Ideal-gas intuition

A first-order intake-manifold density estimate is:

$$
\rho
=
\frac{p}{RT}
$$

At the same pressure:

$$
T\uparrow \Rightarrow \rho\downarrow
$$

So hot charge air gives less mass for the same manifold volume.

This is why intercooling helps torque even if boost pressure is unchanged.

# 6. Valve timing changes the effective filling window

The piston does not simply “suck in one cylinder volume.”

The real trapped mass depends on when the intake valve opens and closes.

Later IVC can improve high-speed filling by using intake-flow inertia.

At low speed, excessive late IVC can cause backflow.

Early IVC reduces the filling duration but can support Miller operation and reduce effective compression.

Therefore:

$$
\eta_v=f(n,IVC,IVO,p_{intake},p_{exhaust},T,\ldots)
$$

# 7. Exhaust backpressure matters

If exhaust pressure is high, more residual gas can remain in the cylinder.

Residual gas occupies volume that could otherwise contain fresh air.

So:

```text
Exhaust backpressure ↑
      ↓
residual fraction can ↑
      ↓
fresh-air fraction ↓
      ↓
fresh-air charge can ↓
```

This is one reason turbocharger turbine matching affects cylinder filling.

# 8. Intake-runner tuning and pressure waves

When an intake valve closes, pressure waves travel through the runner and manifold.

If runner length and valve timing are favorable, a returning pressure wave can arrive near the next intake event and improve filling.

This creates natural peaks and valleys in volumetric efficiency versus engine speed.

A smooth-looking VE map is not always physically correct; real gas dynamics can create genuine structure.

# 9. Throttle position is not air charge

At low load, throttle angle strongly affects manifold pressure.

At high load, once the throttle is nearly fully open, additional pedal movement may not materially increase charge.

The limiting factor may become:

- intake restriction;
- turbocharger;
- valve timing;
- exhaust backpressure;
- fuel system;
- knock/thermal limit.

# 10. Turbocharged filling

For a turbo engine:

```text
Compressor
   ↓
charge-air cooler
   ↓
throttle
   ↓
intake manifold
   ↓
valves
   ↓
trapped cylinder charge
```

Every element changes the pressure or temperature available for filling.

The compressor may provide high pressure, but a hot intercooler outlet or restrictive valve event can still reduce trapped mass.

# 11. CNG-specific fresh-air displacement

In port-injected CNG engines, gaseous fuel occupies intake-port/manifold volume that would otherwise be available to air.

Conceptually:

```text
Same intake volume
    ↓
more gaseous fuel volume
    ↓
less fresh-air volume available
```

This can reduce maximum fresh-air charge compared with a liquid-fueled case.

The effect depends on:

- injection location;
- gas pressure;
- gas temperature;
- injected mass;
- valve timing;
- manifold conditions.

# 12. Gasoline comparison

Gasoline PFI introduces fuel vapor and wall-film behavior.

GDI injects fuel directly into the cylinder and can provide charge cooling through evaporation.

So the relationship between manifold air, total trapped charge and knock margin differs between:

- CNG PFI;
- gasoline PFI;
- gasoline GDI.

# 13. Residual gas versus fresh-air charge

The total trapped mass can be high while fresh-air mass is lower.

For torque and fuel calculation, the ECU cares strongly about **fresh oxygen-bearing air**.

For combustion and knock, it also cares about residual gas.

A useful decomposition is:

$$
m_{trapped}
=
m_{fresh}
+
m_{fuel}
+
m_{residual}
+
m_{EGR}
$$

# 14. Why VE matters in torque structure

The torque structure eventually asks for:

$$
m_{air,cyl,req}
$$

The air path must then determine which combination of:

- manifold pressure;
- throttle;
- boost;
- VVT;

will actually produce that trapped mass.

That conversion is only reliable if cylinder filling is modeled correctly.

# 15. Example: same boost, different torque

Suppose two points both have:

```text
2.0 bar absolute manifold pressure
```

Point A has:

- 45°C manifold air;
- favorable IVC;
- moderate exhaust pressure.

Point B has:

- 75°C manifold air;
- unfavorable IVC;
- high exhaust pressure.

Point B can trap noticeably less fresh air even though “boost” is identical.

So a boost gauge does not tell the full torque story.

# 16. Interactive cylinder-filling thought experiment

<div class="interactive-card">
<h3>Same pressure, different fresh-air charge</h3>
<label>Manifold pressure [bar abs] <input id="ve-p" type="range" min="0.5" max="2.5" step="0.05" value="1.0" oninput="updateVE()"></label>
<label>Manifold temperature [°C] <input id="ve-t" type="range" min="20" max="100" step="2" value="40" oninput="updateVE()"></label>
<label>Gas-exchange effectiveness [%] <input id="ve-g" type="range" min="60" max="115" step="1" value="90" oninput="updateVE()"></label>
<label>CNG displacement penalty [%] <input id="ve-cng" type="range" min="0" max="10" step="1" value="3" oninput="updateVE()"></label>
<div class="kpis">
<div class="kpi"><strong id="ve-rel">–</strong>Relative fresh-air charge</div>
</div>
<p id="ve-msg"></p>
</div>

# 17. Common misunderstandings

## “MAP is load”

MAP is only one input to load.

## “100% VE is the physical maximum”

Not necessarily.

## “VVT only changes emissions”

VVT directly changes filling and torque.

## “Boost fixes poor gas exchange”

Boost can compensate some lost filling, but at the cost of compressor/turbine work.

## “Total trapped mass equals fresh-air mass”

Residuals, EGR and fuel occupy part of the cylinder.


# Calibration procedure and optimization trade-offs

Cylinder-filling calibration is a modeling and optimization problem because the engineer must determine how pressure, temperature, valve timing, exhaust pressure and turbo state combine to produce **trapped fresh-air mass**.

The objective is:

> **Build a cylinder-filling model accurate enough that torque, fuel and spark calculations remain correct across the whole operating range.**

## 1. Establish a trustworthy measurement set

At each steady-state point record:

- engine speed;
- measured air mass flow;
- manifold pressure;
- manifold temperature;
- throttle angle;
- intake/exhaust cam position;
- exhaust pressure;
- boost pressure;
- lambda;
- fuel flow;
- brake torque.

For a four-stroke engine, fresh-air charge can be calculated from measured airflow:

$$
m_{air,cyl}
=
\frac{\dot m_{air}\,120}
{nN_{cyl}}
$$

with consistent units.

This gives a measurement reference for the ECU filling model.

## 2. Build the base speed/load filling surface

First hold cam positions fixed.

Sweep:

- engine speed;
- manifold pressure or air-charge/load.

This reveals the basic speed-dependent filling shape, including real peaks and valleys caused by runner and valve gas dynamics.

Do not automatically smooth those physical features away.

## 3. Add temperature correction

Repeat selected points at different intake-air temperatures.

The goal is to separate:

```text
density effect
from
gas-exchange effectiveness
```

If the model uses MAP without adequate temperature correction, it will overpredict air charge when the manifold becomes hot.

## 4. Add VVT dimensions

Now sweep intake and exhaust cam timing at selected speed/load points.

Measure how fresh-air charge changes with:

- IVC;
- overlap;
- residual fraction;
- exhaust pressure.

This builds the correction needed when the same MAP produces different trapped air because of valve timing.

## 5. Add exhaust-backpressure / turbo influence

For a turbocharged engine, repeat key points at different exhaust-manifold pressures where possible.

Higher backpressure can increase residual gas and reduce fresh-air fraction even when intake pressure is unchanged.

So the filling model should not assume boost pressure alone defines charge.

## 6. CNG-specific gaseous-fuel displacement

For port-injected CNG, characterize how gaseous fuel occupies intake volume that would otherwise contain fresh air.

Compare selected points at different:

- CNG fuel mass;
- gas rail pressure;
- gas temperature;
- injection timing where relevant.

The purpose is to quantify the fresh-air displacement caused by gaseous fuel.

## 7. Trade-off — model accuracy versus complexity

Too few model dimensions cannot represent real filling physics.

Too many dimensions become difficult to populate, interpolate and validate.

The engineer therefore selects the **minimum model complexity that still captures the dominant physics**:

- speed;
- pressure/load;
- temperature;
- VVT;
- exhaust-pressure/residual influence.

## 8. Trade-off — maximum filling versus pumping loss

A VVT/throttle setting may increase fresh-air charge but also increase pumping work.

For part-load efficiency, the best point may therefore use slightly less maximum VE if it reduces pumping loss significantly.

## 9. Trade-off — fresh-air charge versus residual dilution

More overlap can sometimes improve gas exchange, but it can also increase residual gas.

The engineer must distinguish:

```text
total trapped mass
from
fresh oxygen-bearing air
```

because only the second quantity directly supports the intended fuel and torque calculation.

## 10. Trade-off — boost versus gas-exchange efficiency

Higher boost can compensate poor VE, but it increases compressor/turbine work and often exhaust backpressure.

A good development sequence is therefore:

```text
optimize gas exchange first
      ↓
then use boost for the remaining charge requirement
```

rather than using boost to hide a poor filling map.

## 11. How the final balance is achieved

The final cylinder-filling map is selected to minimize fresh-air prediction error while preserving physically sensible trends.

Validate at:

- off-grid speed/load points;
- hot/cold intake air;
- different cam positions;
- altitude;
- high turbo backpressure;
- CNG gas-quality variation.

A good filling calibration is not the map that fits the original sweep best. It is the map that continues to predict **fresh-air charge correctly when the boundary conditions move**.


# 18. Key lessons

1. Volumetric efficiency describes how effectively displacement is filled with fresh air.
2. Same manifold pressure can produce different trapped air.
3. Temperature, valve timing, residuals and exhaust pressure all matter.
4. Intake-wave tuning creates real speed-dependent VE structure.
5. Turbocharging increases density but does not eliminate gas-exchange losses.
6. CNG PFI can displace fresh air because the fuel is already gaseous upstream of the cylinder.
7. Fresh-air charge, not boost pressure alone, is what primarily supports potential torque.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The supplied air-charge article emphasizes that fresh-air charge is not simply manifold pressure and depends on speed, valve timing, residual gas, exhaust backpressure and charge temperature.</li>
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
function updateVE(){
 const p=+document.getElementById('ve-p').value;
 const t=+document.getElementById('ve-t').value+273.15;
 const g=+document.getElementById('ve-g').value/100;
 const c=1-(+document.getElementById('ve-cng').value/100);
 const rel=100*(p/1.0)*(313.15/t)*g*c/0.90;
 document.getElementById('ve-rel').textContent=rel.toFixed(0)+'%';
 document.getElementById('ve-msg').innerHTML=`This simplified density × gas-exchange model shows why pressure alone is not enough. Hotter air, poorer valve/gas-exchange effectiveness, or gaseous-fuel displacement can reduce fresh-air charge even at the same MAP.`;
}
document.addEventListener('DOMContentLoaded',updateVE);
</script>
