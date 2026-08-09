
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Transient Driveability, Tip-In/Tip-Out, Shifts, Grade and Altitude</h1>
<p><em>How to calibrate the movement between speed-load points without smoke, surge, torque holes or driveline shock</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Transient calibration is where maps meet dynamics

A steady-state map tells you what the engine should do after everything has settled.

A vehicle transient asks:

> **How does the system move between those points?**

Important events include:

- pedal tip-in;
- tip-out;
- gear shift;
- hill entry;
- hill crest;
- altitude change;
- engine-brake entry;
- regeneration entry.

# 2. Tip-in

A hard tip-in creates a fast torque request.

Fuel can change faster than turbo air.

The initial calibration trade-off is:

```text
fast torque response
vs
smoke / Pmax / rail-pressure / driveline limits
```

# 3. Tip-out

Rapid fuel reduction can create:

- driveline lash;
- turbo surge tendency;
- abrupt deceleration.

Torque should usually be ramped with vehicle and transmission context.

# 4. Shift transient

During an upshift:

1. engine torque reduces;
2. engine speed changes;
3. gear engages;
4. torque restores.

The restored torque point can be in a new speed/load region with different:

- smoke limit;
- EGR target;
- injection timing.

# 5. Hill entry

Predictive cruise can request torque before speed drops.

Without prediction, the engine may enter a low-speed high-torque region after vehicle speed has already fallen.

# 6. Altitude transient

A vehicle can climb rapidly in altitude while the engine remains under load.

Ambient pressure changes turbo corrected conditions and smoke margin.

Altitude correction should therefore be dynamic enough to protect the engine before a long steady calibration has settled.

# 7. Thermal state during transient driving

Repeated accelerations can heat:

- turbine;
- DOC/DPF/SCR;
- coolant;
- oil.

A transient torque limit can therefore depend on recent history.

# 8. Transient calibration channels

Log:

- driver torque request;
- permitted torque;
- actual torque estimate;
- engine speed;
- gear;
- fuel quantity;
- injection pressure;
- VGT;
- EGR;
- fresh air;
- smoke;
- Pmax/MPRR where instrumented;
- catalyst temperatures.

# 9. Root-cause method

If torque response is slow:

```text
Is request slow?
Is torque limiter active?
Is rail pressure low?
Is smoke limiter active?
Is boost slow?
Is transmission still limiting torque?
```

Do not immediately increase driver-wish gain.

# 10. Torque-response metrics

For a pedal tip-in, useful metrics include:

- 10–90% torque rise time;
- maximum smoke;
- minimum air/fuel margin;
- rail-pressure dip;
- turbo response;
- jerk.

A calibration should not improve one metric while silently violating another.

# 11. Limiter chronology

Log limiter flags with precise timing.

Example:

```text
driver request ↑
→ transmission limit clears
→ smoke limiter active
→ boost rises
→ smoke limiter releases
→ thermal limit remains inactive
```

This chronology often explains the torque trace without changing any base map.

# 12. Repeated transient heat

A single acceleration may be safe.

Ten accelerations in succession can create:

- high turbine temperature;
- coolant rise;
- catalyst heat soak.

Transient durability validation should therefore include repeated sequences.

# 13. Vehicle-mass corners

The same pedal event at:

- empty vehicle;
- maximum permitted mass;

creates different acceleration, gear dwell and engine-load duration.

Calibrate with representative mass, not one vehicle state.

# 14. Standard transient calibration procedure

For every representative maneuver:

1. define initial speed, gear and torque;
2. define driver/vehicle request trajectory;
3. log every active torque limiter;
4. measure fuel, rail pressure and air response;
5. quantify torque rise/fall and jerk;
6. quantify smoke;
7. identify the first physical bottleneck;
8. change only the calibration domain responsible for that bottleneck.

# 15. Repeated-sequence durability

A single clean tip-in can hide heat accumulation.

Repeat:

```text
acceleration
shift
grade load
tip-out
```

sequences until coolant, oil, turbo and catalyst states approach their intended hot condition.

Then verify the same driveability and limiter hierarchy.

# 16. Senior calibration deep dive — event-based acceptance

Create an automated event report for each maneuver.

Example tip-in report:

| Metric | Result |
|---|---|
| torque 10–90% rise | measured |
| peak smoke | measured |
| minimum rail pressure | measured |
| minimum fresh-air margin | measured |
| maximum turbo speed | measured |
| maximum jerk | measured |
| active limiter sequence | recorded |

This makes calibration comparisons objective.

## Altitude compensation dynamics

Ambient pressure can change faster than long-term adaptation on mountain routes.

Use current pressure measurement for protection-critical functions and reserve slow adaptation for model correction.

## Torque-hole diagnosis

A torque hole after a shift can come from:

- transmission still limiting;
- rail pressure recovering;
- smoke limiter waiting for air;
- EGR re-entry;
- turbo surge protection.

The limiter chronology should identify the cause before any base map is changed.

# 17. Common mistakes

- Tuning tip-in from pedal feel only.
- Ignoring the limiter state during a slow response.
- Using steady-state smoke limits without transient air prediction.
- Treating every torque dip as engine lag instead of transmission request.
- Ignoring thermal memory during repeated transients.

# 18. Key lessons

1. Transient calibration is a state-transition problem, not map interpolation alone.
2. Tip-in is limited by the speed mismatch between fuel and air.
3. Transmission and predictive control strongly affect torque response.
4. Altitude and thermal history can change transient capability.
5. Limiter-state logging is essential for diagnosis.

# References

<ol class="refs">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
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
