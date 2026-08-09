
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Governor, Frequency, Active-Power and Load-Sharing Control</h1>
<p><em>Isochronous control, droop, load sharing, nominal-versus-transient speed and standards-based load-step acceptance</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why the governor is the heart of a genset

For a genset, torque control cannot be understood without frequency control.

The generator load is a disturbance torque acting on the engine.

Rotational dynamics are:

$$
J\frac{d\omega}{dt}
=
T_{engine}-T_{generator}
$$

If generator torque suddenly rises, engine speed falls unless engine torque rises quickly enough.

# 2. Isochronous versus droop operation

## Isochronous control

The controller attempts to restore the nominal rated-speed/frequency target. During load transients, speed can deviate before recovery.

after a load disturbance.

This is common for a single islanded genset or one designated master unit.

## Droop control

Speed/frequency reference intentionally decreases slightly as active power rises.

This allows multiple generators to share load without fighting each other.

A conceptual droop relation is:

$$
\Delta f
=
-K_{droop}\Delta P
$$

# 3. Grid-parallel control

Once synchronized to a strong grid, frequency is largely imposed externally.

Changing engine torque mainly changes **active power exported to the grid**, not steady engine speed.

So the governor/load controller changes from:

```text
speed-control problem
```

toward:

```text
active-power-control problem
```

# 4. Calibration procedure — island mode

## Step 1: Warm steady reference

Hold 1500 rpm at low load.

Stabilize:

- coolant/oil;
- gas pressure/temperature;
- intake temperature;
- lambda;
- ignition;
- turbo state.

## Step 2: Apply defined load steps

Examples:

```text
10% → 25%
25% → 50%
50% → 75%
75% → 100%
```

Measure:

- frequency nadir;
- maximum rpm drop;
- recovery time;
- torque request;
- gas command;
- boost/air response;
- lambda excursion;
- knock;
- EGT.

## Step 3: Tune governor gain

Too little gain:

```text
stable
but
slow frequency recovery
```

Too much gain:

```text
fast response
but
frequency hunting / torque oscillation
```

## Step 4: Tune feedforward

If generator active power is measured quickly, the controller can estimate the new torque requirement before frequency falls far.

Feedforward reduces the amount of work the feedback loop must do.

# 5. Calibration procedure — droop/load sharing

With two or more gensets:

1. synchronize units;
2. apply a total plant load;
3. verify active-power sharing;
4. change one unit's droop/reference;
5. confirm stable redistribution;
6. test communication loss or unit trip scenarios.

The objective is stable load sharing without circulating active-power oscillation.

# 6. Main trade-off: frequency stiffness versus stability

A very aggressive governor tries to keep frequency nearly perfect.

But gas engine air/fuel/turbo dynamics have delay.

If the controller demands torque faster than the engine can physically create it, oscillation can result.

The engineer therefore chooses a response that is:

- fast enough for grid/island requirements;
- slow enough to respect combustion and air-path dynamics.

# 7. Main trade-off: fuel spike versus frequency dip

A strong feedforward fuel/air increase can reduce frequency dip.

But too aggressive a command can produce:

- rich excursion;
- knock;
- boost overshoot;
- frequency overshoot.

The selected calibration balances **frequency quality and combustion quality**.

# 8. Load rejection

A sudden load rejection is the opposite problem.

```text
Generator torque falls suddenly
      ↓
engine still produces high torque
      ↓
speed tends to overshoot
```

Fast torque reduction may use:

- gas reduction;
- spark retard;
- air-path action;
- turbo bypass/wastegate action where available.

Calibration must avoid:

- overspeed;
- compressor surge;
- misfire;
- high exhaust temperature.

# 9. Validation matrix

Validate:

- cold/hot engine;
- 10–100% load;
- low gas pressure;
- high intake temperature;
- altitude;
- different gas quality;
- single-unit island;
- parallel operation;
- load rejection.

# 10. Governor calibration in terms of real engine delays

The governor should be calibrated against the real torque-generation path:

```text
Torque request
   ↓
gas-flow response
   +
air / turbo response
   +
ignition response
   ↓
combustion torque
   ↓
shaft acceleration / frequency response
```

A gain that looks stable with a fast actuator model can oscillate when the real turbo, manifold and gas-path delays are included.

## Practical identification step

Before final governor tuning, identify the approximate load-to-torque response at several loads:

- low load;
- medium load;
- near rated load.

The response can change with load because turbo authority and mixture sensitivity change.

# 11. P-only versus P+Q disturbances

A pure active-power load step mainly challenges the governor.

A reactive-power step mainly challenges the AVR.

A mixed load step challenges both.

During commissioning, record together:

- frequency;
- voltage;
- P;
- Q;
- power factor;
- generator current;
- governor torque request;
- AVR output/excitation signal;
- engine lambda/boost/spark.

This avoids misdiagnosing an electrical voltage-control problem as an engine torque-response problem.

# 12. Load sharing beyond simple droop

Modern multi-unit plants may use:

- classical speed droop;
- load-sharing lines/signals;
- supervisory plant control;
- master/follower concepts;
- active-power setpoint distribution.

The exact architecture varies.

The calibration principle remains: each unit must accept its assigned active power without unstable interaction with the other units or the electrical network.

# 13. 2026 performance-standard context

Generating-set transient acceptance should be tied to the **project's required performance class and contractual/grid requirements**, not to a universal frequency-dip number copied from another machine.

ISO 8528-5:2025 is the current edition of the generating-set design/performance standard family in 2026.

For calibration planning, define before testing:

- allowed frequency deviation;
- allowed voltage deviation;
- recovery time;
- load-step magnitude;
- initial load;
- power factor;
- ambient/fuel state.

A governor cannot be judged fairly without first defining the required transient envelope.

# 14. Nominal speed versus actual speed

For the 50 Hz / four-pole case:

$$
n_{nom}=1500\ \mathrm{rpm}
$$

but in island operation:

$$
n(t)\neq1500\ \mathrm{rpm}
$$

during a load step.

In grid-parallel operation, synchronous speed follows actual grid frequency.

# 15. Acceptance-test matrix

Before tuning the governor, define:

- initial load;
- final load;
- load power factor;
- allowed frequency deviation;
- recovery time;
- voltage requirement;
- gas/ambient condition.

The test should then follow the approved project/ISO 8528-5/ISO 8528-6 framework rather than a universal internet frequency-dip number.

# 16. Common mistakes

- Tuning only one low-load step and assuming the same dynamics at rated load.
- Using aggressive governor gain to compensate for a slow gas/turbo system.
- Ignoring P-Q coupling during mixed load steps.
- Comparing tests with different initial load or power factor.
- Treating speed droop and plant active-power droop as interchangeable without defining the architecture.

# 17. Key lessons

1. Governor tuning is a mechanical-power/frequency problem constrained by real engine delays.
2. Actual speed deviates during island transients.
3. Load-step acceptance criteria must be defined before calibration.
4. Feedforward and feedback should be coordinated, not used to hide air/fuel system delays.
5. Multi-unit load sharing must be validated as a plant system.

# References

<ol class="refs">
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>ISO 8528-5:2025 — Generating sets; design and performance criteria.</li>
<li>ISO 8528-6:2023 — Test methods for complete generating sets.</li>
<li>L. Guzzella and C. H. Onder, Introduction to Modeling and Control of Internal Combustion Engine Systems, 2nd ed.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
