
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Transmission, Vehicle and Predictive Torque Integration</h1>
<p><em>How automated shifting, cruise control, vehicle mass, road grade, traction control and PTO loads reshape engine calibration</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. A heavy-duty engine does not control the vehicle alone

The driver's pedal is only one source of torque demand.

<figure class="figure-card"><svg viewBox="0 0 820 470" role="img" aria-label="Vehicle torque request integration">
<rect width="820" height="470" fill="white"/>
<g font-family="Arial" font-size="14" text-anchor="middle" fill="#17324a">
<rect x="35" y="170" width="125" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="97" y="199">Driver / cruise</text><text x="97" y="220">request</text>
<rect x="200" y="170" width="135" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="267" y="199">Vehicle / traction</text><text x="267" y="220">limits</text>
<rect x="375" y="170" width="135" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="442" y="199">Transmission /</text><text x="442" y="220">shift request</text>
<rect x="550" y="170" width="130" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="615" y="199">Engine torque</text><text x="615" y="220">arbitration</text>
<rect x="710" y="170" width="80" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="750" y="211">Axle</text>
<text x="410" y="75">Predictive cruise / road grade / vehicle mass can shape future torque demand</text>
<text x="410" y="350">Brake request travels through a parallel negative-torque arbitration path</text>
</g>
<g stroke="#17324a" stroke-width="3"><line x1="160" y1="205" x2="200" y2="205"/><line x1="335" y1="205" x2="375" y2="205"/><line x1="510" y1="205" x2="550" y2="205"/><line x1="680" y1="205" x2="710" y2="205"/></g>
</svg><figcaption>Heavy-duty engine calibration is inseparable from vehicle and transmission torque coordination. Predictive cruise and automated transmissions can deliberately move operation toward more efficient speed/load regions.</figcaption></figure>

The vehicle controller can also consider:

- current gear;
- clutch state;
- traction limit;
- road grade;
- vehicle mass;
- cruise target;
- predictive road information;
- braking demand.

# 2. Transmission torque coordination

During a gear shift, the transmission may request a temporary engine torque reduction.

A typical upshift can require:

```text
drive torque
   ↓
torque cut
   ↓
gear synchronization
   ↓
torque restore
```

The torque ramps matter for:

- clutch wear;
- driveline shock;
- shift time;
- smoke after torque restoration.

# 3. Gear selection and BSFC

For the same wheel power, multiple engine speed/torque combinations may be possible.

The transmission can choose a gear that moves the engine closer to the low-BSFC region.

But it must also respect:

- lugging limit;
- turbo response;
- gradeability;
- engine-brake availability;
- driveline torque.

# 4. Predictive cruise

Current heavy-duty systems can use road grade or map data to shape future power demand.

Possible strategies include:

- allowing small speed increase before a hill;
- reducing fuel before cresting;
- choosing a gear before the engine leaves the efficient zone.

This is powertrain calibration, not merely engine-map calibration.

# 5. Vehicle mass estimation

The optimum gear and torque response depend on vehicle mass.

A loaded tractor and empty tractor should not always receive identical shift behavior.

Mass can be estimated from acceleration response and driveline information.

# 6. Traction control

If tire slip is excessive, vehicle stability or traction control can request rapid torque reduction.

The engine must deliver this reduction predictably.

# 7. PTO and vocational loads

Heavy-duty vehicles can power:

- hydraulic pumps;
- refuse compactors;
- concrete mixer systems;
- refrigeration;
- cranes.

PTO torque requests can alter idle, thermal and emissions calibration.

# 8. Engine brake integration

Negative torque is coordinated with:

- transmission downshifts;
- service brakes;
- downhill cruise;
- retarder if fitted.

# 9. Calibration procedure

For each representative vehicle mass:

1. map pedal-to-wheel response;
2. validate shift torque cuts and restores;
3. verify low-speed lugging boundary;
4. validate cruise and grade response;
5. validate traction-control torque cuts;
6. validate engine-brake downshifts;
7. check smoke and emissions during every torque transition.

# 10. Wheel-torque relationship

Ignoring losses for a simple illustration:

$$
T_{wheel}
=
T_e
i_g
i_{fd}
$$

where $i_g$ is gear ratio and $i_{fd}$ is final-drive ratio.

The same engine torque can therefore create very different wheel torque in different gears.

# 11. Shift-line optimization

A transmission shift map should consider:

- BSFC;
- required wheel torque;
- minimum acceptable engine speed;
- grade;
- engine-brake need.

A fuel-optimal upshift that drops engine speed below the turbo/torque response region can worsen real vehicle performance.

# 12. Predictive road strategy

With route-grade preview, the controller can intentionally trade small vehicle-speed variation against engine efficiency.

Example:

```text
before uphill:
permit small speed / kinetic-energy build

near crest:
reduce torque early

downhill:
coast or engine-brake as appropriate
```

# 13. Engine and transmission release test

At each critical shift, record:

- engine torque request;
- delivered torque;
- clutch/gear state;
- engine speed;
- smoke;
- rail pressure;
- boost.

This makes shift quality measurable rather than subjective only.

# 14. Heavy-duty vehicle validation matrix

Validate engine-transmission coordination across both vehicle mass and road condition.

| Test | Empty / light | Fully loaded |
|---|---|---|
| flat-road launch | yes | yes |
| low-speed upshift | yes | yes |
| high-torque upshift | optional | yes |
| grade entry | yes | yes |
| grade crest | yes | yes |
| downhill engine brake | yes | yes |
| traction intervention | yes | yes |
| PTO transition where applicable | project-specific | project-specific |

# 15. Signals to log

```text
driver / cruise torque request
transmission torque request
engine permitted torque
reported actual torque
gear / clutch state
vehicle acceleration
road grade
fuel quantity
rail pressure
boost / fresh air
smoke
```

# 16. Selection rule

A shift is not accepted merely because it feels smooth.

Review:

- shift duration;
- torque error;
- jerk;
- clutch energy where available;
- post-shift smoke;
- fuel penalty.

# 17. Production variation

Repeat critical shift/tip-in cases with hot driveline, high vehicle mass, altitude and representative weak air/fuel-system hardware.

# 18. Senior calibration deep dive — shift torque accuracy

During a shift, the transmission can request a specific engine torque trajectory.

Define tracking error:

$$
e_T(t)=T_{request}(t)-T_{actual}(t)
$$

Evaluate:

- peak error;
- integrated error;
- timing error.

Poor torque-model accuracy can appear as a transmission-calibration problem.

## Gear hunting

If upshift/downshift thresholds are too close:

```text
grade / wind disturbance
→ upshift
→ engine cannot hold speed
→ downshift
→ repeat
```

Use hysteresis and predictive grade information to avoid repeated shifts.

## Downspeeding release

At the lowest intended cruise speed, validate:

- reserve torque;
- turbo response;
- MPRR/NVH;
- cooling;
- transmission input torque.

A low-speed ratio is only useful if the complete powertrain remains robust there.

# 19. Common mistakes

- Evaluating engine efficiency without gear-selection logic.
- Calibrating shifts only on flat road.
- Restoring torque after a shift faster than turbo air can recover.
- Ignoring PTO torque requests.
- Treating engine braking separately from transmission logic.

# 20. Key lessons

1. Heavy-duty engine calibration is powertrain calibration.
2. Transmission strategy determines where the engine operates on the BSFC map.
3. Shift torque ramps influence drivability and transient smoke.
4. Predictive cruise can move torque demand before a road event occurs.
5. Positive and negative torque must be coordinated across the complete driveline.

# References

<ol class="refs">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
<li><a href="https://www.volvotrucks.us/trucks/powertrain/d13tc/">Volvo D13TC official page</a> — current heavy-duty example of turbo-compound exhaust-energy recovery and low-rpm powertrain integration.</li>
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
