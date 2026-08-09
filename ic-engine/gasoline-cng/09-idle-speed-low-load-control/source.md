
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Idle-Speed and Low-Load Control</h1>
<p><em>Why idle is a small-margin torque problem — fast spark, slow air, accessory feedforward, cold friction, catalyst heating and combustion stability</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Idle is a torque-control problem at very small margin

At idle, the engine produces only enough torque to:

- overcome its own friction;
- drive accessories;
- maintain target speed.

That means a small disturbance can represent a large percentage of available torque.

Examples:

- A/C compressor engages.
- Steering load changes.
- Alternator demand rises.
- Transmission moves from neutral to drive.
- Cooling fan switches on.

Idle control is therefore a miniature version of the complete torque structure.

# 2. The basic speed balance

Engine acceleration depends on net torque:

$$
J\frac{d\omega}{dt}
=
T_{engine}
-
T_{load}
$$

If:

$$
T_{engine}>T_{load}
$$

speed rises.

If:

$$
T_{engine}<T_{load}
$$

speed falls.

The idle controller's job is to keep those torques balanced around the target speed.

# 3. Why spark is ideal for fast idle correction

Spark can change torque within combustion events.

If rpm starts falling:

```text
rpm error negative
    ↓
spark can advance toward efficient timing
    ↓
torque rises quickly
    ↓
rpm fall is arrested
```

If rpm rises too high, spark can be retarded for rapid torque reduction.

# 4. Why air is still needed

Spark cannot create unlimited torque at fixed air charge.

The slow path adjusts:

- throttle;
- idle bypass where fitted;
- VVT;
- boost on some systems.

The air path establishes the sustainable torque level and recreates spark reserve.

# 5. Idle torque reserve

A common concept is to operate slightly retarded from the most efficient spark timing.

This gives the controller room to:

- advance spark if rpm falls;
- retard spark if rpm rises.

The reserve should be only as large as needed because retard increases fuel consumption and exhaust temperature.

# 6. Feedforward versus feedback

A good idle controller should not wait for rpm to collapse before reacting to a known disturbance.

### Feedforward

If the ECU knows the A/C clutch is about to engage, it can request extra torque immediately.

### Feedback

Any remaining rpm error is corrected after it appears.

So:

```text
Known disturbance
   ↓
feedforward torque

rpm error
   ↓
feedback correction
```

# 7. Cold idle

Cold operation increases:

- oil viscosity;
- friction;
- catalyst-heating demand;
- combustion variability.

Therefore cold idle often needs:

- more air;
- more fuel depending on strategy;
- different spark;
- higher target rpm.

# 8. Idle and catalyst heating

Cold-start emissions can require spark retard to raise exhaust temperature.

That creates a conflict:

```text
Catalyst heating wants retard
          ↓
engine torque efficiency falls
          ↓
idle air/fuel demand rises
```

The idle controller must keep speed stable while the emissions strategy intentionally makes combustion less torque-efficient.

# 9. CNG idle behavior

CNG engines can face:

- very small gas-injector pulse widths;
- rail-pressure variation;
- cylinder mixture imbalance;
- slow burn under high residual dilution.

Methane emissions can increase if partial burn or misfire occurs.

So stable idle combustion is both a drivability and emissions requirement.

# 10. VVT at idle

Aggressive overlap can increase residuals and reduce stability.

The preferred cam position often balances:

- stable combustion;
- pumping loss;
- catalyst heat;
- internal EGR.

The exact optimum depends on hardware.

# 11. Accessory load example

Suppose idle engine torque is 22 Nm and current losses/accessories consume 20 Nm.

Only 2 Nm remains as accelerating torque margin.

If the A/C compressor suddenly adds 4 Nm load:

$$
T_{net}=22-24=-2\ \mathrm{Nm}
$$

rpm immediately begins to fall.

A fast spark increase plus a slower air increase can recover the lost torque.

# 12. Idle-speed controller structure

A simplified architecture is:

```text
Target rpm
   ↓
rpm error
   ↓
idle torque correction
   ↓
 ┌──────────────┐
 ↓              ↓
fast spark      slow air
 ↓              ↓
engine torque
   ↓
actual rpm
```

# 13. Why friction-model accuracy matters at idle

At 200 Nm, a 2 Nm loss error is small.

At 20 Nm internal torque, a 2 Nm error is huge.

So idle control is especially sensitive to:

- coolant temperature;
- oil temperature;
- accessory state;
- friction estimation.

# 14. Idle roughness and combustion stability

Average rpm can look correct while individual cycles alternate between strong and weak combustion.

Monitor:

- COVIMEP;
- crank-speed variation;
- misfire;
- cylinder torque balance;
- lambda distribution.

A controller that constantly corrects a fundamentally unstable combustion state is not a good solution.

# 15. Interactive idle disturbance

<div class="interactive-card">
<h3>A/C load disturbance</h3>
<label>Base internal torque [Nm] <input id="id-t" type="range" min="10" max="40" value="22" oninput="updateIdle()"></label>
<label>Base losses [Nm] <input id="id-loss" type="range" min="8" max="30" value="20" oninput="updateIdle()"></label>
<label>New accessory load [Nm] <input id="id-acc" type="range" min="0" max="10" value="4" oninput="updateIdle()"></label>
<label>Fast spark recovery [Nm] <input id="id-sp" type="range" min="0" max="10" value="3" oninput="updateIdle()"></label>
<p id="id-msg"></p>
</div>


# Calibration procedure and optimization trade-offs

Idle calibration balances **combustion stability, fuel consumption, catalyst heating, accessory disturbance rejection and spark reserve**.

## 1. Establish the hot-idle base point

With coolant/oil fully warm and accessory loads controlled, choose an initial:

- target rpm;
- base air charge;
- base spark;
- VVT position;
- lambda target.

Measure:

- mean rpm;
- rpm variation;
- COVIMEP;
- fuel consumption;
- torque reserve.

## 2. Determine useful spark reserve

Retard spark slightly from the efficient reference and measure the available fast positive/negative torque authority.

Too little reserve gives weak disturbance rejection.

Too much reserve gives unnecessary fuel consumption and EGT.

So the selected reserve is the **minimum required for the expected disturbances**.

## 3. Calibrate accessory feedforward

Switch known loads such as:

- A/C compressor;
- electrical/alternator load;
- transmission engagement.

Measure the torque disturbance and request compensating torque before rpm falls.

## 4. Tune speed feedback

After feedforward is close, tune the feedback controller.

Trade-off:

```text
high feedback gain
→ fast recovery
but
→ hunting / oscillation risk
```

```text
low gain
→ smooth
but
→ slow rpm recovery
```

## 5. Cold-idle optimization

Repeat with cold coolant/oil.

Cold friction is higher, and catalyst heating may require spark retard.

Balance:

- stable idle;
- catalyst heat;
- fuel consumption;
- HC/CH4/misfire.

## 6. VVT trade-off at idle

More overlap may improve pumping or thermal behavior but can increase residuals and reduce combustion stability.

At idle, stability usually has higher priority than maximum gas-exchange efficiency.

## 7. Validation

Validate:

- A/C on/off;
- electrical load;
- neutral-to-drive;
- hot restart;
- cold start;
- catalyst-heating mode;
- CNG gas-pressure variation;
- altitude.

The final idle calibration should reject disturbances without requiring continuous large corrective action.


# 16. Common mistakes

- Controlling idle only with throttle.
- Carrying too much spark retard reserve.
- Ignoring accessory feedforward.
- Ignoring friction-temperature effects.
- Treating stable average rpm as proof of stable combustion.
- Using aggressive VVT overlap that hurts cycle stability.

# 17. Key lessons

1. Idle is fundamentally a small-margin torque balance.
2. Spark is the fast actuator; air establishes sustainable torque.
3. Feedforward handles known loads before rpm moves.
4. Feedback corrects remaining speed error.
5. Cold friction and catalyst-heating strategies strongly change idle torque demand.
6. CNG injector and combustion stability can be critical at very low load.
7. Good idle control requires stable combustion, not only a stable rpm average.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The prior torque and ignition articles establish spark reserve and fast/slow torque paths; the supplied combustion reference notes that low speed and idle show especially large combustion variability.</li>
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
function updateIdle(){
 const t=+document.getElementById('id-t').value, loss=+document.getElementById('id-loss').value, acc=+document.getElementById('id-acc').value, sp=+document.getElementById('id-sp').value;
 const before=t-loss, disturbed=t-loss-acc, recovered=t+sp-loss-acc;
 document.getElementById('id-msg').innerHTML=`Before the load step, net accelerating margin is <strong>${before.toFixed(1)} Nm</strong>. After the accessory engages it becomes <strong>${disturbed.toFixed(1)} Nm</strong>. Fast spark recovery brings it to <strong>${recovered.toFixed(1)} Nm</strong> while the slower air path catches up.`;
}
document.addEventListener('DOMContentLoaded',updateIdle);
</script>
