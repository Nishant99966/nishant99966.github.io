<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div><h1>Advanced Torque Structure: Gear-Dependent Limits, Multi-Torque, PTO and Torque Accuracy</h1><p><em>How the ECU coordinates engine capability with gearbox, clutch, axle, traction and vocational torque constraints</em></p></div>
<div class="publication-note"><strong>Scope:</strong> OEM-neutral heavy-duty diesel calibration for truck, bus and comparable vehicle applications. Worked numerical values are illustrative unless tied to a cited public regulation or product source.</div>
<div class="view-controls"><strong>Reading mode:</strong> <button onclick="setMode('simple')">Simple view</button> <button onclick="setMode('detailed')">Detailed view</button> <span id="mode-label">Practical notes visible</span></div>

# 1. Why maximum torque is not only a function of engine speed

A basic full-load curve is often written as:

$$
T_{max}=f(n_e)
$$

For a real heavy-duty truck, permitted torque can depend on much more:

$$
T_{perm}=f(n_e,gear,clutch,transmission,axle,thermal,smoke,traction,PTO)
$$

<figure class="figure-card"><svg viewBox="0 0 820 470" role="img" aria-label="Gear dependent heavy duty torque limit"><rect width="820" height="470" fill="white"/><line x1="90" y1="390" x2="750" y2="390" stroke="#52697a" stroke-width="2"/><line x1="90" y1="390" x2="90" y2="55" stroke="#52697a" stroke-width="2"/><text x="600" y="430" font-size="17">Engine speed →</text><text x="25" y="105" font-size="17" transform="rotate(-90 25,105)">Permitted torque ↑</text><path d="M120 310 C185 180,270 130,430 130 C560 130,650 165,710 235" fill="none" stroke="#17324a" stroke-width="4"/><path d="M120 325 C200 210,300 165,435 165 C555 165,645 195,710 250" fill="none" stroke="#5d87ad" stroke-width="3"/><text x="475" y="112" font-size="14">approved high-gear enhancement</text><text x="485" y="185" font-size="14">base driveline limit</text><line x1="230" y1="85" x2="230" y2="390" stroke="#9bb5c9" stroke-dasharray="7 6"/><text x="145" y="78" font-size="13">lugging boundary</text></svg><figcaption>Illustrative gear-dependent torque capability. Extra torque can be allowed only in selected states while low-speed, clutch, gearbox, axle, smoke and thermal limits remain authoritative.</figcaption></figure>

# 2. Gear-dependent torque capability

Some powertrains permit extra torque only in selected higher gears or operating states because the driveline can tolerate it there.

```text
base engine full-load torque
        ↓
gear-dependent enhancement / reduction
        ↓
gearbox input-torque limit
        ↓
clutch / axle / traction limit
        ↓
air / fuel / mechanical limits
        ↓
final permitted torque
```

# 3. Low-speed torque and lugging boundary

Downspeeding improves efficiency by moving cruise operation toward lower engine speed and higher torque.

The lower boundary is constrained by combustion noise, MPRR, turbo response, smoke, torsional vibration, clutch/driveline excitation and gear-rattle risk.

# 4. Transmission and clutch protection

During launch or shifts, the transmission can request less torque than the engine can physically produce.

A robust torque coordinator should expose the active limiter rather than hiding it inside the pedal map.

# 5. PTO and anti-stall

Vocational applications can request torque through PTO logic. Very low-speed operation can also trigger anti-stall torque.

Both require explicit arbitration with clutch, smoke, rail-pressure, thermal and driveline limits.

# 6. Torque accuracy

The transmission and vehicle controller rely on the engine-reported torque.

Large torque-model error can degrade shift quality, traction control, cruise accuracy and driveline protection.

Validate:

- dynamometer torque;
- ECU actual/indicated torque;
- transmission torque estimate where available.

# 7. Continuous teaching engine: HD13-E

The committee edition uses one fictional example engine:

```text
13-L inline-six
390 kW @ 1600 rpm
2600 Nm @ 950–1200 rpm
high-pressure direct injection
VGT + cooled EGR
DOC + DPF + SCR + ASC
automated heavy-duty gearbox
```

Illustrative reference points:

| ID | Operating point | Purpose |
|---|---|---|
| A | 700 rpm, low load | idle / urban thermal state |
| B | 1000 rpm, high torque | downsped grade / lugging |
| C | 1200 rpm, medium-high load | cruise efficiency |
| D | 1600 rpm, high power | rated-power region |
| E | 1800 rpm, negative torque | engine-brake validation |

# 8. Worked torque arbitration at point B

Suppose raw demand is 2700 Nm and the active limits are:

```text
engine capability       2650 Nm
high-gear allowance     2700 Nm
transmission limit      2620 Nm
fresh-air/smoke limit   2580 Nm
thermal limit           2700 Nm
```

Then:

$$
T_{perm}=2580\ Nm
$$

The correct diagnostic question is: **why is the fresh-air/smoke limit active?**

# 9. Calibration execution

## Objective

Deliver predictable wheel torque while preserving engine and driveline constraints.

## Map coordinates

```text
engine speed × gear / vehicle state
```

## Calibration objects

- base full-load curve;
- gear-dependent torque modifier;
- low-speed torque ramp;
- anti-stall torque;
- PTO limits;
- torque-model correction.

## Signals to log

```text
raw driver/cruise/PTO request
transmission request
traction request
each limiter
permitted torque
ECU torque estimate
measured torque
gear and clutch state
```

## Validation

Test all gears, loaded/unloaded vehicle, launch, up/down shifts, grade, traction intervention, hot driveline and altitude.

# 10. Driveline torque reserve and shift strategy

A transmission should not request a gear that leaves the engine with essentially zero torque reserve on a small grade.

A practical vehicle study can calculate:

$$
T_{reserve}=T_{perm}-T_{road\ demand}
$$

for each candidate gear.

At the same vehicle speed:

```text
higher gear
→ lower engine speed
→ lower friction
→ potentially better fuel economy

but
→ smaller torque reserve
→ slower turbo response
→ greater lugging risk
```

The gear-dependent torque map and shift strategy must therefore be calibrated together.

# 11. Torque intervention priorities

During a traction event, requested torque can fall extremely quickly.

During a transmission shift, the requested torque trajectory can be tightly timed.

During a thermal derate, torque can normally fall more slowly.

Do not use one universal torque ramp for all request sources.

Classify each requester by:

- authority;
- maximum positive gradient;
- maximum negative gradient;
- recovery ramp;
- driver-notification requirement.

# 12. Calibration release check

For every gear/state combination verify that the torque interface remains monotonic: increasing driver demand should not unexpectedly reduce final permitted torque unless a clearly identifiable limiter becomes active.

# 13. Common mistakes

- Treating the engine full-load curve as the final vehicle torque limit.
- Adding extra high-gear torque everywhere.
- Hiding driveline protection in driver-wish maps.
- Ignoring torque-model accuracy.
- Calibrating low-speed torque without torsional/NVH validation.

# 14. Key lessons

1. Heavy-duty torque capability is state- and gear-dependent.
2. Multi-torque-type strategies belong in torque arbitration.
3. Downspeeding requires an explicit lugging boundary.
4. Torque accuracy is essential for transmission coordination.
5. PTO and anti-stall must share the same transparent torque structure.

# References

<ol class="refs">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based control, air-path control and model-based diesel control.</li>
<li><a href="https://readytogo.daf.com/en/products-and-services/products">DAF Ready-to-Go public product information</a> — example of gear-dependent Multi-Torque, low-rpm maximum torque and automated-transmission integration.</li>
<li><a href="https://www.daf.com/en/news-and-media/news-articles/global/2024/new-generation-daf-trucks-powering-customer-success">DAF Trucks, 2024 public powertrain update</a> — example combining Miller valve timing, updated turbo/EGR, dual-drive coolant pump, clutched air compressor, new injectors and downspeeding.</li>
</ol>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
