
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Cold Start, Low Load, Idle and Aftertreatment Warm-Up</h1>
<p><em>How to calibrate the cold and low-load regions where modern heavy-duty tailpipe emissions are hardest to control</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Warm-up is an emissions-calibration phase

Immediately after cold start:

- friction is high;
- combustion temperature is low;
- DOC/DPF/SCR are cold;
- NOx conversion is poor;
- HC and CO oxidation can be weak.

Therefore cold-start calibration is not only about reliable firing.

# 2. Cold-start actuators

Possible actuators include:

- injection timing;
- pilot injection;
- idle speed;
- rail pressure;
- VGT;
- intake or exhaust throttle;
- EGR strategy;
- post injection;
- aftertreatment heater where fitted.

# 3. Warm-up trade-off

A strategy that raises exhaust temperature can improve catalyst light-off but can worsen:

- fuel consumption;
- combustion noise;
- HC;
- oil dilution;
- turbine temperature.

# 4. Low-load thermal challenge

Heavy-duty vehicles can spend long time at low engine load in:

- urban traffic;
- idling;
- vocational work;
- low-speed operation.

Low exhaust temperature can cause:

- low SCR conversion;
- weak passive DPF regeneration;
- more active thermal-management events.

# 5. Idle control

Idle calibration includes:

- target speed;
- accessory compensation;
- cylinder balance;
- fuel consumption;
- aftertreatment temperature.

Higher idle speed can warm the exhaust faster but consumes more fuel.

# 6. Stop-start or anti-idle strategies

Where vehicle architecture supports engine stop at extended idle, restart calibration must consider:

- oil pressure;
- starter durability;
- catalyst cooling;
- driver response.

# 7. Thermal-mode entry

Thermal management should be state-based.

Possible entry criteria:

- catalyst temperature;
- NOx conversion need;
- DPF regeneration request;
- predicted low-load duration.

# 8. Thermal-mode exit

Exit should avoid oscillation:

```text
thermal mode ON
→ temperature rises
→ mode OFF
→ temperature immediately falls
→ mode ON again
```

Use hysteresis and thermal-state prediction.

# 9. Drive-cycle calibration

Validate:

- cold urban cycle;
- hot urban;
- highway;
- long idle;
- stop-and-go;
- downhill overrun.

The best steady-state map can be poor if the aftertreatment spends too much real-world time below effective temperature.

# 10. Cold-start calibration matrix

Test combinations of:

- coolant temperature;
- oil temperature;
- fuel temperature/cetane;
- ambient pressure;
- battery/cranking capability.

Measure:

- time to first fire;
- speed build;
- white smoke/HC;
- rail pressure;
- MPRR;
- catalyst light-off.

# 11. White smoke diagnosis

White smoke after cold start often indicates unburned or partially burned fuel.

Possible causes:

- low cylinder temperature;
- excessive fuel;
- poor atomization;
- late SOC;
- low compression.

The solution is not automatically more start fuel.

# 12. Warm-up heat balance

To heat aftertreatment faster, the engine can intentionally shift energy from crankshaft work into exhaust enthalpy.

That is a controlled efficiency sacrifice.

The release strategy should quantify:

```text
extra fuel consumed
for
seconds/minutes saved to catalyst effectiveness
```

# 13. Low-load duty accumulation

A vehicle that repeatedly performs short low-load segments can accumulate soot or lose SCR temperature even if every individual segment looks acceptable.

Validate the *sequence* of operation, not just isolated points.

# 14. Startability calibration maps

Cold start deserves explicit calibration maps.

A conceptual start-fuel map is:

$$
m_{start}
=
f(
T_{coolant},
T_{fuel},
p_{amb},
n_{crank}
)
$$

A conceptual start-timing map is:

$$
SOI_{start}
=
f(
T_{coolant},
n_{crank},
fuel\ quality
)
$$

# 15. Start sequence

```text
cranking
   ↓
rail pressure build
   ↓
first injection
   ↓
SOC / first firing
   ↓
speed capture
   ↓
idle stabilization
   ↓
aftertreatment warm-up
```

# 16. Calibration execution standard

## Test matrix

- cold soak;
- warm restart;
- hot soak;
- low battery / low cranking speed;
- altitude;
- low/high cetane approved fuels;
- injector production variation.

## Signals to log

```text
cranking speed
rail target / actual
injection quantity
SOI / SOC
CA50 / MPRR
time to first fire
time to stable idle
white smoke / HC
oil pressure
DOC/SCR temperature
```

## Selection rule

Use the minimum fuel and phasing intervention that gives repeatable first firing and speed capture without unacceptable white smoke, MPRR or oil-dilution risk.

# 17. White-smoke root cause

Before adding fuel, distinguish:

- low combustion temperature;
- poor atomization;
- late SOC;
- low compression;
- injector dribble.

More fuel is not a universal cold-start fix.

# 18. Senior calibration deep dive — start phase separation

Treat cold start as several phases:

```text
Phase 1: pressure build / first injection
Phase 2: first firing
Phase 3: speed capture
Phase 4: idle stabilization
Phase 5: catalyst warm-up
```

Different actuators dominate each phase.

Adding fuel in Phase 1 can help first firing but can worsen white smoke if Phase 2 ignition is late.

## Start quality metrics

Measure:

- start success rate;
- time to first fire;
- time to target idle;
- maximum MPRR;
- integrated HC/white-smoke proxy;
- fuel used during start;
- catalyst temperature rise.

## Calibration robustness

Run multiple repeated starts after full cold soak.

One successful start is not evidence of robust calibration.

Use representative:

- low battery;
- injector variation;
- low cetane;
- altitude.

## Low-load thermal mode

For extended low-load operation, compare the fuel cost of several thermal strategies instead of automatically selecting post injection.

# 19. Common mistakes

- Optimizing warm steady-state efficiency and ignoring cold operation.
- Using post injection as the only thermal actuator.
- Calibrating idle only for smoothness.
- Turning thermal management on and off at one threshold.
- Ignoring the fuel cost of maintaining catalyst temperature.

# 20. Key lessons

1. Cold start and low load are central modern heavy-duty emissions challenges.
2. Engine and aftertreatment warm-up must be optimized together.
3. Thermal management has a fuel, durability and oil-dilution cost.
4. Hysteresis and prediction prevent thermal-state hunting.
5. Real duty cycle determines whether catalyst temperature is sustainable.

# References

<ol class="refs">
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
<li><a href="https://www.cummins.com/en-eu/components/aftertreatment/twin-module-aftertreatment-system/product-overview">Cummins EPA27 Twin Module Aftertreatment official page</a> — current commercial example of electrically assisted aftertreatment thermal management.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-and-related-materials-control-air-pollution">U.S. EPA MY2027 heavy-duty engine and vehicle criteria-pollutant rule</a> — more stringent heavy-duty standards beginning MY2027.</li>
<li><a href="https://eur-lex.europa.eu/eli/reg/2024/1257/oj/eng">Regulation (EU) 2024/1257 (Euro 7)</a> — current legal source; exact dated limits and application milestones are maintained in the series Regulatory Appendix.</li>
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
