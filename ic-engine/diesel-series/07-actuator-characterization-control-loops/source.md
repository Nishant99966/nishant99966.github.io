<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div><h1>Actuator Characterization, Feedforward, Feedback and Observer Calibration</h1><p><em>How VGT, EGR, throttles and fuel-pressure actuators become robust closed-loop engine control</em></p></div>
<div class="publication-note"><strong>Scope:</strong> OEM-neutral heavy-duty diesel calibration for truck, bus and comparable vehicle applications. Worked numerical values are illustrative unless tied to a cited public regulation or product source.</div>
<div class="view-controls"><strong>Reading mode:</strong> <button onclick="setMode('simple')">Simple view</button> <button onclick="setMode('detailed')">Detailed view</button> <span id="mode-label">Practical notes visible</span></div>

# 1. A map is not enough if the actuator is not understood

Before calibrating boost, EGR or rail pressure, characterize how the actuator and plant respond.

<figure class="figure-card"><svg viewBox="0 0 820 540" role="img" aria-label="Actuator characterization and closed loop calibration"><rect width="820" height="540" fill="white"/><g font-family="Arial" text-anchor="middle" fill="#17324a" font-size="14"><rect x="275" y="25" width="270" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="58">Physical target</text><rect x="275" y="115" width="270" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="148">Feedforward command</text><rect x="275" y="205" width="270" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="238">Actuator + plant</text><rect x="275" y="295" width="270" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="328">Measured / estimated state</text><rect x="35" y="205" width="170" height="58" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="120" y="238">Limits / plausibility</text><rect x="615" y="205" width="170" height="58" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="700" y="238">Observer / adaptation</text><rect x="275" y="415" width="270" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="448">Feedback correction</text></g><g stroke="#17324a" stroke-width="3"><line x1="410" y1="83" x2="410" y2="115"/><line x1="410" y1="173" x2="410" y2="205"/><line x1="410" y1="263" x2="410" y2="295"/><line x1="410" y1="353" x2="410" y2="415"/></g></svg><figcaption>Characterize the actuator first, build feedforward from physical state, then add feedback and observer correction with explicit saturation and plausibility handling.</figcaption></figure>

# 2. Actuator characterization

For each actuator measure:

- usable command range;
- physical end stops;
- hysteresis;
- dead band;
- rate limit;
- temperature sensitivity;
- response time;
- failure position.

Relevant actuators include VGT, EGR valve, intake/exhaust throttle, rail-pressure metering/pump control and thermal-management valves.

# 3. VGT and EGR physical models

A useful VGT abstraction is:

$$
A_{eff,VGT}=f(command,p,T)
$$

For EGR:

$$
\dot m_{EGR}=f(A_{EGR},p_{exh},p_{int},T)
$$

This is why actuator position is not the same as physical flow.

# 4. Rail-pressure control

A simplified structure is:

```text
rail target
    ↓
pump/feedforward
    +
pressure feedback
    ↓
rail volume
    ↓
injector outflow disturbance
```

A sudden fueling increase can create rail-pressure droop even with a correct target.

# 5. Feedforward first

Feedforward should predict most of the repeatable actuator command.

Feedback should mainly correct modelling error, aging and disturbance.

# 6. Feedback and anti-windup

For a PI concept:

$$
u_{fb}=K_p e+K_i\int e\,dt
$$

Controller calibration must include saturation and anti-windup.

# 7. Cross-coupling

VGT changes boost, exhaust pressure and EGR-driving pressure.

EGR changes fresh-air flow and compressor operation.

Independent loops can therefore fight one another.

# 8. Observers

Virtual sensors can estimate EGR rate, cylinder air charge, exhaust thermal state or catalyst storage.

Observers need steady, transient, bias and aging validation.

# 9. HD13-E point B

At 1000 rpm high torque, the air system needs high fresh-air mass while turbine energy is limited.

VGT closure can improve boost but increases exhaust pressure and pumping work.

The calibration goal is the minimum pumping penalty that still achieves fresh-air and EGR targets with turbo-speed margin.

# 10. Calibration execution

## Preconditions

Actuator hardware healthy, sensors calibrated, end stops known and protection active.

## Characterization sweep

Run command up/down sweeps at several pressure and temperature states.

## Calibration objects

- actuator flow/position model;
- feedforward maps;
- feedback gains;
- rate limits;
- anti-windup;
- observer correction;
- plausibility thresholds.

## Signals to log

```text
target
measured/estimated state
feedforward
feedback correction
final command
actual actuator position
saturation flag
pressures / flows
```

## Validation

Step response, ramps, tip-in/tip-out, hot/cold, altitude, aged actuator, sensor bias and failure fallback.

# 11. Senior calibration deep dive — controller performance metrics

A controller should be judged with quantitative metrics, not only a visually smooth trace.

Useful measures include:

- rise time;
- settling time;
- overshoot;
- steady-state error;
- integrated absolute error;
- actuator saturation time.

For error:

$$
e(t)=y_{target}(t)-y(t)
$$

one metric is:

$$
IAE=\int |e(t)|dt
$$

## Gain scheduling

The plant changes across the engine map.

For example, the same VGT movement can have very different effect at:

- 900 rpm low exhaust flow;
- 1600 rpm high exhaust flow.

Therefore controller gains or feedforward maps may require scheduling versus:

```text
engine speed
load / exhaust flow
pressure ratio
temperature
```

## Decoupling experiment

To quantify VGT–EGR coupling:

1. hold EGR-valve command fixed;
2. step VGT;
3. record boost, exhaust pressure and EGR flow;
4. repeat with VGT fixed and step EGR valve.

The resulting cross-responses show whether separate SISO loops are adequate or need supervisory decoupling.

## Sensor-bias challenge

Add controlled or simulated bias to:

- manifold pressure;
- air mass;
- NOx/O2 estimate;
- rail pressure.

Verify that adaptation improves small errors but does not drive the controller toward an unsafe actuator state.

# 12. Control-loop test design

Use several input shapes because each reveals different weaknesses.

### Small step
Shows local gain, delay and settling.

### Large step
Shows saturation, rate limits and nonlinear behavior.

### Ramp
Shows tracking and hysteresis.

### Disturbance step
For rail pressure, change injected quantity while holding pressure target constant.

# 13. Feedforward-map building

For each stabilized operating point, determine the actuator command needed to hold the target with minimal feedback correction.

Store that command as the base feedforward.

Then check interpolation at intermediate points.

A good feedforward map should produce a small initial control error after a normal operating-point transition.

# 14. Controller interaction with torque limiters

If rail pressure cannot follow target, the fuel/torque coordinator may need to reduce permitted quantity.

If air control saturates, smoke-limited torque may need to fall.

This is safer than increasing controller gains until the actuator oscillates.

# 15. Failure fallback

For every actuator define a safe fallback:

```text
sensor failure
actuator stuck
command/position mismatch
observer invalid
```

The fallback may be substitution, derate or shutdown depending on risk.

# 16. Common mistakes

- Tuning gains before characterizing the actuator.
- Using valve position as a direct flow measurement.
- Allowing integrator wind-up.
- Calibrating VGT and EGR as independent systems.
- Trusting an observer without bias validation.

# 17. Key lessons

1. Characterize actuators before closed-loop calibration.
2. Feedforward carries predictable demand.
3. Feedback corrects disturbance and modelling error.
4. Saturation and cross-coupling must be designed explicitly.
5. Observers are calibration functions that require validation.

# References

<ol class="refs">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based control, air-path control and model-based diesel control.</li>
<li><a href="https://www.bosch-mobility.com/en/solutions/powertrain/diesel/modular-common-rail-system-ohw/">Bosch Mobility modular common-rail system</a> — current high-pressure diesel injection architecture reference.</li>
</ol>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
