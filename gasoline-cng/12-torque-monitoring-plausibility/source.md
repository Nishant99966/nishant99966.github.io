
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Torque Monitoring and Plausibility</h1>
<p><em>How requested, permitted and estimated torque are checked against air, fuel, spark, losses and vehicle response without confusing control targets with measured output</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why a torque-based ECU must monitor torque as well as request it

A torque structure does two different jobs:

1. it decides what torque should be produced;
2. it estimates whether the engine is actually producing a plausible amount of torque.

This second function matters because the engine, transmission and vehicle-dynamics controllers all rely on a trustworthy torque value.

# 2. Requested, permitted and actual-estimated torque are different

A useful set of quantities is:

```text
Driver requested torque
        ↓
Permitted / coordinated torque
        ↓
Commanded internal/potential torque
        ↓
Estimated actual engine torque
```

A mismatch between them can be normal during transients.

A persistent or physically impossible mismatch needs investigation.

# 3. Why torque is usually modeled rather than directly measured in the vehicle

A dyno has a torque transducer.

A production vehicle normally does not have a precision crankshaft torque sensor.

So the ECU estimates torque from variables such as:

- air charge;
- engine speed;
- spark;
- lambda;
- fuel;
- losses;
- VVT/EGR state.

This makes model quality essential.

# 4. Forward torque estimate

A simplified model is:

$$
T_{brake,est}
=
T_{potential}
\eta_{spark}
\eta_{\lambda}
\eta_{other}
-
T_{loss}
$$

This should be consistent with the inverse model used to request air.

If the forward and inverse models disagree badly, torque control can become unstable or inaccurate.

# 5. Plausibility means “does this combination make physical sense?”

Examples:

### Case A

```text
Air charge says high torque
spark efficiency says near 1
lambda says normal
but estimated torque is very low
```

Possible issue:

- torque model error;
- loss model error;
- air measurement error.

### Case B

```text
Driver requests 200 Nm
active thermal limit is 150 Nm
air path is trying to produce 200 Nm
```

This is an arbitration inconsistency.

# 6. Independent information improves monitoring

Torque plausibility can use different information paths.

For example:

```text
Path 1:
air charge → potential torque → corrected torque

Path 2:
fuel energy / combustion model → torque estimate

Path 3:
crank acceleration / vehicle response → plausibility
```

The goal is not to make three identical models.

Independent physics gives better fault detection.

# 7. Crank acceleration contains torque information

From rotational dynamics:

$$
J\frac{d\omega}{dt}
=
T_{engine}
-
T_{load}
$$

If the ECU claims a large positive torque increase but crank acceleration does not respond as expected, something may be inconsistent.

Vehicle/driveline inertia makes this a complicated measurement, but the principle is useful.

# 8. Cylinder-pressure torque in development

Development engines can use cylinder pressure to estimate indicated work directly.

That provides valuable ground truth for:

- air-charge torque model;
- spark efficiency;
- lambda efficiency;
- cylinder balance.

It is normally a development reference rather than production hardware.

# 9. Torque plausibility during spark retard

Suppose air charge is unchanged but knock control retards spark.

Then:

$$
\eta_{spark}\downarrow
$$

Estimated torque should fall.

If the torque model does not respond to the measured final spark, it can over-report delivered torque to the transmission.

# 10. Torque plausibility during lambda change

A rich or lean excursion can change torque even when air charge is constant.

Therefore the torque estimate should follow the lambda-efficiency convention implemented in the ECU.

This is especially important during:

- catalyst heating;
- high-load protection;
- fuel-quality transitions;
- transient lambda error.

# 11. Torque monitoring and limitations

A torque monitor should know when the requested value is impossible.

Example:

```text
Requested charge        700 mg/event
Maximum turbo-safe      620 mg/event
Fuel system maximum     equivalent 600 mg/event
```

The maximum available torque should be based on the achievable system state rather than on the driver request.

# 12. Diagnostics versus protection

Torque plausibility can support:

- sensor diagnostics;
- actuator diagnostics;
- model rationality;
- transmission coordination;
- safety monitoring.

This article stays at the conceptual level because exact production safety architectures and thresholds are project-specific.

# 13. Example mismatch

Suppose:

| Quantity | Value |
|---|---:|
| Permitted brake torque | 140 Nm |
| Estimated actual torque | 165 Nm |
| Difference | +25 Nm |

That difference is not automatically a fault.

Ask:

- Is the signal time-aligned?
- Is a transient occurring?
- Did spark change?
- Is air-charge measurement delayed?
- Is loss torque wrong?
- Is the model in the correct fuel mode?

Monitoring requires both physics and timing.

# 14. Time alignment matters

During a tip-in:

```text
pedal request changes now
air charge changes later
turbo changes later
actual torque changes with combustion events
vehicle acceleration changes after driveline dynamics
```

Comparing asynchronous signals can create a false torque mismatch.

# 15. CNG-specific plausibility

CNG torque estimation should account for:

- gas composition;
- gas rail pressure/temperature;
- gaseous-fuel air displacement;
- final lambda;
- final spark;
- injector flow capability.

A wrong gas-quality assumption can make lambda correct but energy-based torque prediction wrong.

# 16. Interactive plausibility check

<div class="interactive-card">
<h3>Torque plausibility</h3>
<label>Permitted torque [Nm] <input id="tm-perm" type="range" min="50" max="220" value="140" oninput="updateTM()"></label>
<label>Estimated actual torque [Nm] <input id="tm-act" type="range" min="50" max="220" value="145" oninput="updateTM()"></label>
<label>Expected transient tolerance [Nm] <input id="tm-tol" type="range" min="2" max="30" value="10" oninput="updateTM()"></label>
<p id="tm-msg"></p>
</div>


# Calibration procedure and optimization trade-offs

Torque monitoring needs calibration because every plausibility comparison contains model uncertainty, sensor uncertainty and transient delay.

The goal is to detect genuinely implausible torque without creating false faults during normal operation.

## 1. Establish the normal error distribution

Compare estimated torque with development references such as:

- dyno torque;
- cylinder-pressure indicated torque where available.

Cover:

- speed;
- load;
- spark;
- lambda;
- VVT;
- temperature;
- fuel mode.

This defines the normal model error before fault thresholds are chosen.

## 2. Calibrate steady-state thresholds

At stable points, thresholds can be relatively tight because timing mismatch is small.

Trade-off:

```text
tight threshold
→ sensitive detection
but
→ false faults from normal model error
```

```text
wide threshold
→ robust
but
→ weak fault sensitivity
```

## 3. Calibrate transient thresholds

During tip-in/tip-out, torque requests and physical response are naturally time-shifted.

Use where needed:

- state-dependent thresholds;
- delay compensation;
- filtering;
- temporary larger windows.

## 4. Use independent plausibility paths

Avoid building every monitor from the same inputs.

Possible paths include:

- air-based torque model;
- fuel/energy plausibility;
- crank-acceleration plausibility.

The more physically independent the information, the stronger the monitor.

## 5. Validate real faults and normal interventions

Inject or simulate faults such as:

- sensor bias;
- stuck actuator;
- wrong spark;
- air-charge error;
- fuel-pressure error.

Also verify normal states:

- gear shifts;
- traction intervention;
- cold start;
- thermal derating.

The final monitor must distinguish **normal control behavior** from genuine implausibility.


# 17. Common mistakes

- Treating requested torque as measured torque.
- Ignoring signal delay during plausibility checks.
- Using the same flawed input for every “independent” estimate.
- Ignoring final spark and lambda corrections.
- Ignoring loss-model error.
- Ignoring fuel mode and gas quality.
- Declaring a fault from one instantaneous mismatch.

# 18. Key lessons

1. A torque-based ECU needs both a request path and an estimation/monitoring path.
2. Production torque is usually modeled rather than directly measured.
3. Air, spark, lambda, fuel and losses must all affect the torque estimate consistently.
4. Independent physical estimates improve plausibility checking.
5. Time alignment is essential during transients.
6. Maximum available torque should reflect real actuator and protection limits.
7. Torque monitoring supports control coordination, diagnostics and safety.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The torque-structure and air-charge articles establish forward/inverse torque models and actual torque estimation; this article keeps monitoring at a conceptual level rather than describing project-specific safety implementation.</li>
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
function updateTM(){
 const p=+document.getElementById('tm-perm').value, a=+document.getElementById('tm-act').value, tol=+document.getElementById('tm-tol').value;
 const e=a-p, ok=Math.abs(e)<=tol;
 document.getElementById('tm-msg').innerHTML=`Torque difference = <strong>${e>=0?'+':''}${e.toFixed(0)} Nm</strong>. With the chosen illustrative tolerance, this is <strong>${ok?'plausible':'outside the expected window'}</strong>. A real monitor would also consider operating state, signal delay, model uncertainty and active interventions.`;
}
document.addEventListener('DOMContentLoaded',updateTM);
</script>
