
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Transient Torque and Drivability</h1>
<p><em>What happens during pedal tip-in, tip-out, gear shifts and traction intervention — fast spark, slow air, manifold filling, turbo lag and fuel dynamics</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Steady-state calibration is not what the driver feels

A dynamometer point can be perfectly calibrated at:

```text
2500 rpm
400 mg/event
lambda 1.00
stable temperatures
```

But a driver experiences:

```text
20% pedal → 80% pedal
```

within a fraction of a second.

Transient torque control is the art of coordinating actuators that respond at different speeds.

# 2. The actuator hierarchy

A useful mental model is:

| Actuator/path | Typical relative speed | Main role |
|---|---|---|
| Spark | Very fast event-to-event | Fast torque shaping |
| Fuel | Fast, but mixture dynamics matter | Maintain lambda/energy |
| Throttle | Fast-to-medium | Air-path control |
| VVT | Medium | Filling/residual optimization |
| Turbocharger | Slower | Sustainable boosted charge |
| Thermal state | Very slow | Changes available limits |

The exact delays depend on hardware.

# 3. Tip-in: what happens when the driver requests more torque?

```text
Pedal ↑
  ↓
driver-wish torque ↑
  ↓
permitted torque ↑
  ↓
fast path: spark can recover reserve
  ↓
throttle opens
  ↓
exhaust flow/enthalpy rises
  ↓
turbo accelerates
  ↓
manifold pressure rises
  ↓
fresh-air charge rises
  ↓
fuel follows
  ↓
sustainable torque reaches target
```

# 4. Why torque reserve exists

If the engine is operating with some deliberate spark retard, it can advance spark quickly before the air path has fully responded.

This creates a smoother and faster initial torque response.

But torque reserve costs efficiency.

So reserve is normally targeted to operating regions where fast torque authority is useful.

# 5. Manifold filling is a dynamic storage problem

The intake manifold contains air mass.

A simple mass balance is:

$$
\frac{dm_{man}}{dt}
=
\dot m_{in}
-
\dot m_{cyl}
$$

Opening the throttle increases $\dot m_{in}$.

Cylinder consumption does not instantaneously equal that new inflow.

Manifold pressure and mass therefore change dynamically.

# 6. Turbo lag adds another storage: shaft speed

Turbocharger rotational energy is approximately:

$$
E_{rot}
=
\frac{1}{2}J\omega^2
$$

To increase turbo speed, turbine power must first add rotational energy.

That is why boost does not appear instantly.

# 7. Fuel must follow the real air, not only the requested air

During a fast tip-in, requested charge may jump before actual charge arrives.

If fuel is based only on the final target, the mixture can become temporarily wrong.

The ECU therefore coordinates:

- predicted air;
- measured/estimated actual air;
- wall film for gasoline PFI;
- gas-rail dynamics for CNG;
- lambda feedback.

# 8. Tip-out

A sudden torque reduction is usually easier because:

- spark can retard quickly;
- throttle can close;
- fuel can be reduced.

But a turbocharger still contains rotational energy.

A fast throttle closure can move the compressor toward surge, so bypass/recirculation control may be required.

# 9. Gear shifts

During an upshift, the transmission may request a rapid torque reduction.

A typical sequence is:

```text
Transmission requests torque cut
        ↓
fast spark retard / fuel intervention
        ↓
air path begins reducing charge
        ↓
shift completes
        ↓
torque restored in controlled ramp
```

The exact strategy depends on transmission architecture.

# 10. Traction control

When wheel slip occurs, the vehicle may need torque reduction faster than the turbo/air system can respond.

Spark is valuable because it can reduce torque within combustion events.

For larger or sustained reductions, the air path follows.

# 11. Why too-aggressive spark torque control has costs

Large retard can:

- increase exhaust temperature;
- reduce efficiency;
- increase turbine/catalyst thermal load;
- worsen combustion stability.

So the fast path must transition to a more efficient sustainable air-path solution.

# 12. Turbocharged tip-in and knock

As boost rises:

- cylinder pressure rises;
- charge temperature can rise;
- knock margin shrinks.

So transient boost may require:

- temporary spark correction;
- charge-temperature correction;
- wastegate shaping;
- fuel/lambda protection;
- torque-rate limiting.

The fastest possible boost rise is not always the best drivability strategy.

# 13. CNG transient issues

CNG adds:

- gas pressure/regulator response;
- gas temperature;
- injector flow under changing pressure ratio;
- gaseous-fuel air displacement.

Transient torque can therefore be limited by both the air system and gas-delivery system.

# 14. Gasoline transient issues

Gasoline PFI adds wall-film dynamics.

GDI adds:

- rail-pressure response;
- injection timing;
- multiple injection strategies;
- charge cooling.

So the transient fuel model must be fuel-system specific.

# 15. A simple response-shaping example

Suppose the driver asks for:

```text
100 Nm → 160 Nm
```

At the current air charge, spark reserve can immediately provide 15 Nm.

Then:

```text
100 → 115 Nm   fast spark response
115 → 160 Nm   slower air/boost response
```

This often feels smoother than waiting for the full 60 Nm to arrive only from boost.

# 16. Torque-rate limits

Sometimes the engine could physically deliver torque faster than the vehicle wants.

A torque-gradient limit can deliberately smooth:

$$
\frac{dT}{dt}
$$

for:

- driveline comfort;
- traction;
- transmission protection;
- NVH.

So a “slow” response is not always a hardware limitation; it can be intentional.

# 17. Interactive transient example

<div class="interactive-card">
<h3>Fast spark + slow air-path response</h3>
<label>Initial torque [Nm] <input id="tr-init" type="range" min="40" max="150" value="100" oninput="updateTR()"></label>
<label>Requested torque [Nm] <input id="tr-req" type="range" min="80" max="220" value="160" oninput="updateTR()"></label>
<label>Available spark reserve [Nm] <input id="tr-res" type="range" min="0" max="40" value="15" oninput="updateTR()"></label>
<label>Air-path response time [s] <input id="tr-tau" type="range" min="0.2" max="2.0" step="0.1" value="0.8" oninput="updateTR()"></label>
<p id="tr-msg"></p>
<div id="tr-bars"></div>
</div>


# Calibration procedure and optimization trade-offs

Transient torque calibration is an optimization problem because the fastest possible torque response is not always the best vehicle response.

The engineer must balance:

- response speed;
- torque overshoot;
- driveline comfort;
- surge margin;
- lambda stability;
- knock;
- exhaust temperature.

## 1. Define repeatable transient events

Use standard maneuvers such as:

- 20% → 80% pedal tip-in;
- 80% → 20% tip-out;
- low-rpm full-load tip-in;
- gearshift torque reduction;
- traction-control torque cut;
- repeated accelerations.

## 2. Record the complete timing chain

Measure:

- pedal request;
- requested/permitted torque;
- final spark;
- throttle;
- wastegate;
- boost;
- fresh-air charge;
- fuel;
- lambda;
- turbo speed;
- estimated actual torque;
- dyno/vehicle acceleration.

The first question is always:

> **Which part of the chain is late?**

## 3. Calibrate the fast spark path

Determine how much torque can be added or removed quickly through spark while respecting:

- knock;
- EGT;
- combustion stability.

This defines usable torque reserve.

## 4. Calibrate the sustainable air path

Then tune:

- throttle feedforward;
- boost/wastegate feedforward;
- manifold filling response;
- turbo spool.

The handover from spark to air should be smooth, with no torque step when the air path catches up.

## 5. Calibrate transient fueling

Tune fuel compensation so actual lambda follows the intended path as air changes.

CNG requires rail/regulator compensation.

Gasoline PFI requires wall-film compensation.

GDI requires rail-pressure and injection-timing coordination.

## 6. Trade-off — response versus overshoot

Aggressive feedforward makes torque arrive quickly but can overshoot the request.

The target is the shortest rise time that stays inside the permitted overshoot window.

## 7. Trade-off — turbo response versus surge/overspeed margin

More aggressive wastegate closing improves spool but reduces compressor/turbo margin.

The final transient strategy must remain safe during hot, altitude and production-variation conditions.

## 8. Trade-off — spark reserve versus efficiency

More reserve improves immediate response but costs steady-state efficiency and increases exhaust temperature.

Carry only the reserve that the drivability objective actually needs.

## 9. Trade-off — torque rise versus driveline comfort

A very fast torque rise may create jerk, wheel slip or transmission stress.

So the calibration engineer may deliberately limit:

$$
\frac{dT}{dt}
$$

although the engine could physically respond faster.

## 10. How the final balance is achieved

Define acceptable limits for:

- torque rise time;
- overshoot;
- lambda deviation;
- knock;
- EGT;
- driveline jerk.

The selected calibration is the fastest response that stays inside all of them.

## 11. Validation across conditions

Repeat the same maneuvers at:

- cold/hot engine;
- altitude;
- high intake temperature;
- different gears/inertia;
- CNG gas-quality variation;
- gasoline fuel variation.

The transient map is finished only when its timing still works after the physical delays change.


# 18. Common mistakes

- Tuning only steady-state maps.
- Expecting boost to respond like spark.
- Fueling from desired air without respecting actual air dynamics.
- Holding excessive torque reserve everywhere.
- Ignoring turbo surge during tip-out.
- Making torque response faster than the driveline can use.
- Treating CNG and gasoline transient fueling as the same problem.

# 19. Key lessons

1. Transient torque control coordinates actuators with different response times.
2. Spark is fast; sustainable air/boost response is slower.
3. Manifold mass and turbo speed are dynamic storage states.
4. Fuel must track actual cylinder air and fuel-system dynamics.
5. Tip-out can create compressor surge risk.
6. Transmission and traction requests can dominate driver torque temporarily.
7. Torque-rate limiting can be intentional for drivability and protection.
8. Good transient performance is a coordinated system response, not simply “fast boost.”


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The previous ignition article explains the fast-spark/slow-air interaction and torque reserve; the supplied engine-control reference treats manifolds and turbo speed as dynamic storage states.</li>
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
function updateTR(){
 const init=+document.getElementById('tr-init').value, req=+document.getElementById('tr-req').value, res=+document.getElementById('tr-res').value, tau=+document.getElementById('tr-tau').value;
 const fast=Math.min(req,init+res);
 document.getElementById('tr-msg').innerHTML=`Spark can move torque quickly from <strong>${init} to ${fast} Nm</strong>. The remaining <strong>${Math.max(0,req-fast)} Nm</strong> must mainly come from the slower air path.`;
 let h='';
 [0,0.25,0.5,1,1.5,2].forEach(t=>{
   let y=fast+(req-fast)*(1-Math.exp(-t/tau));
   y=Math.min(req,y);
   h+=`<div style="display:grid;grid-template-columns:48px 1fr 62px;gap:8px;align-items:center;margin:5px 0"><span>${t.toFixed(2)}s</span><div style="background:#edf2f6;height:12px;border-radius:8px;overflow:hidden"><div style="height:100%;background:#9ab6ca;width:${Math.max(0,100*y/220)}%"></div></div><span>${y.toFixed(0)} Nm</span></div>`;
 });
 document.getElementById('tr-bars').innerHTML=h;
}
document.addEventListener('DOMContentLoaded',updateTR);
</script>
