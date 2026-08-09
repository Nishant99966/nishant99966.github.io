
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Start, Synchronization, Loading, Unloading and Shutdown</h1>
<p><em>Gas-safety permissives, pre-lube, cranking, synchronization, breaker transitions, fast-start calibration and start emissions</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why startup and shutdown belong in a calibration curriculum

A new recruit should not meet the engine for the first time at a warm 75% load point.

A genset passes through a sequence of operating states:

```text
Stopped
  ↓
Pre-start checks
  ↓
Cranking
  ↓
Ignition / light-off
  ↓
Warm-up
  ↓
Rated speed
  ↓
Voltage build-up
  ↓
Synchronization
  ↓
Breaker close
  ↓
Load ramp
  ↓
Normal operation
  ↓
Unload
  ↓
Breaker open
  ↓
Cool-down
  ↓
Stop
```

Each state has different control priorities.

# 2. Pre-start permissives

Before fuel is admitted, the control system may verify project-specific conditions such as:

- no active emergency stop;
- acceptable oil/coolant state;
- gas pressure within window;
- ventilation/purge condition;
- breaker state;
- starting system ready;
- no critical protection active.

These are safety interlocks, not performance calibration parameters.

# 3. Cranking

The starting system must accelerate the engine fast enough for:

- reliable position detection;
- adequate compression;
- stable ignition.

During cranking, the engine is far below normal turbocharger operating conditions.

Fueling and ignition therefore require dedicated startup logic.

# 4. First combustion

The first stable firing cycles must avoid:

- excessive rich/lean mixture;
- strong pressure spikes;
- misfire;
- backfire;
- unstable prechamber operation.

A cold large gas engine has different:

- friction;
- gas temperatures;
- wall temperatures;
- ignition behavior.

# 5. Ramp to 1500 rpm

The governor increases speed toward rated value.

Important variables include:

- acceleration ramp;
- gas command;
- ignition;
- air-path behavior;
- turbo response.

Too-fast acceleration can create:

- mixture error;
- overspeed;
- poor lubrication/thermal behavior.

# 6. Warm-up and readiness for loading

The engine may reach 1500 rpm before all temperatures are ready for full load.

A loading-permission strategy can consider:

- coolant;
- oil;
- charge-air system;
- generator temperature;
- gas-system stability.

# 7. Voltage build-up

Once speed is stable, generator excitation establishes terminal voltage.

The AVR should reach a stable no-load voltage before synchronization.

# 8. Synchronization

Before closing onto an energized bus, the controller verifies the required conditions for:

- frequency;
- voltage;
- phase sequence;
- phase angle.

The exact numerical windows depend on the grid and project.

# 9. Breaker closing

After breaker close to a strong grid:

```text
frequency is constrained by grid
      ↓
governor torque changes active power

AVR excitation changes reactive power / voltage behavior
```

This is a major control-state transition.

# 10. Load ramp

Power should normally be increased using a controlled ramp rather than an uncontrolled jump.

The ramp can be limited by:

- thermal warm-up;
- turbo response;
- gas-system capability;
- grid/plant requirement.

# 11. Normal unloading

Before a planned shutdown:

```text
Active power ramped down
      ↓
reactive-power target normalized as required
      ↓
breaker opens
      ↓
engine returns to no-load/island state
```

The goal is to avoid reverse power or abrupt mechanical/electrical stress.

# 12. Cool-down

A short unloaded run can allow:

- turbocharger temperatures to reduce;
- exhaust components to cool;
- thermal gradients to relax.

The exact requirement is hardware-specific.

# 13. Fuel shut-off and stopping

Normal shutdown can then close the fuel path and let the engine decelerate.

The controller monitors that:

- combustion stops;
- speed decays normally;
- no abnormal after-run condition occurs.

# 14. Emergency trip is different from normal shutdown

A critical fault may require immediate protective action.

The sequence can differ depending on fault type.

Examples:

- immediate fuel shut-off;
- breaker opening;
- both.

The detailed sequence is safety-system-specific and must follow approved project logic.

# 15. Calibration / validation tests

Validate:

- cold start;
- hot restart;
- low gas pressure start;
- synchronization repeatability;
- breaker close;
- normal load ramp;
- normal unload;
- hot shutdown;
- emergency-trip cases using approved test procedures.

# 16. Main trade-off — fast availability versus mechanical/thermal care

A plant may want very fast start and loading.

But:

```text
faster ramp
   ↓
less warm-up margin
   ↓
higher thermal / combustion stress risk
```

The final strategy balances availability with reliable engine and generator operation.

# 17. Fast-start calibration sequence

Where fast availability is a project requirement, break the start into timed phases:

```text
Pre-lube / permissives
      ↓
Crank
      ↓
Stable firing
      ↓
Ramp to synchronous speed
      ↓
Voltage established
      ↓
Synchronize
      ↓
Load ramp
```

For every phase define:

- success criterion;
- maximum allowed time;
- combustion/thermal limits;
- fallback or abort condition.

# 18. Start emissions

Cold operation can create high:

- CH4/THC from incomplete combustion;
- CO;
- unconverted engine-out emissions before catalyst light-off.

Therefore fast-start optimization should evaluate **cumulative start emissions**, not only time-to-grid.

# 19. Fast availability versus thermal fatigue

Frequent starts and aggressive load ramps increase thermal cycling.

The project may therefore need a trade-off between:

- grid flexibility;
- component lifetime;
- maintenance interval.

# 20. Purge and gas-safety dependency

Startup permissives can depend on:

- package ventilation;
- gas detection;
- gas-valve proving;
- purge state.

These safety sequences are defined by the approved system design and should not be bypassed to accelerate a performance test.

# 21. Common mistakes

- Optimizing time-to-grid without measuring start emissions.
- Confusing normal shutdown with emergency trip.
- Closing the breaker before synchronization conditions are satisfied.
- Loading a thermally cold engine as though rated-load limits were already available.
- Ignoring repeated-start thermal fatigue.

# 22. Key lessons

1. Start is a controlled sequence of safety, combustion, speed, voltage and synchronization states.
2. Fast-start calibration balances availability against stability, emissions and thermal fatigue.
3. Breaker closing changes the control problem fundamentally.
4. Gas-safety permissives belong upstream of performance optimization.
5. Planned shutdown and emergency trip require different logic.

# References

<ol class="refs">
<li>ISO 8528-4:2025 — Controlgear and switchgear.</li>
<li>ISO 8528-5:2025 — Generating sets; design and performance criteria.</li>
<li>ISO 8528-13:2026 — Safety requirements for generating sets; does not cover special requirements for potentially explosive atmospheres.</li>
<li>IEC 60079-10-1:2020 — Classification of areas where explosive gas atmospheres may occur.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
