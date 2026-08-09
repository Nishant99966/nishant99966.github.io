
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Injection Calibration: Quantity, Pressure, SOI, Pilot, Main, Post and Dwell</h1>
<p><em>How the injection pattern controls torque efficiency, NOx, soot, pressure rise, noise and aftertreatment temperature</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Injection calibration shapes combustion even when total fuel mass is unchanged

Key calibration variables include:

- total fuel quantity;
- injection pressure;
- main SOI;
- pilot quantity and timing;
- pilot-main dwell;
- post injection;
- rate shape.

<figure class="figure-card"><svg viewBox="0 0 820 430" role="img" aria-label="Pilot main and post injection">
<rect width="820" height="430" fill="white"/><line x1="90" y1="340" x2="750" y2="340" stroke="#52697a" stroke-width="2"/><text x="635" y="385" font-size="17">Crank angle →</text>
<rect x="195" y="270" width="55" height="70" fill="#c7d7e4" stroke="#5d87ad"/><text x="177" y="250" font-size="14">pilot</text>
<rect x="330" y="125" width="180" height="215" fill="#eef4f8" stroke="#17324a"/><text x="395" y="105" font-size="14">main</text>
<rect x="585" y="275" width="70" height="65" fill="#c7d7e4" stroke="#5d87ad"/><text x="570" y="255" font-size="14">post</text>
<line x1="260" y1="90" x2="325" y2="90" stroke="#61717f" stroke-width="2"/><text x="270" y="75" font-size="13">pilot-main dwell</text>
</svg><figcaption>Generic multiple-injection pattern. Event count and rate shape are operating-point and hardware dependent; commanded events may merge hydraulically at very short dwell.</figcaption></figure>

# 2. Main injection timing

Advancing main SOI usually shifts combustion earlier.

Possible benefits:

- earlier CA50;
- better efficiency.

Possible penalties:

- higher Pmax;
- higher MPRR;
- higher NOx.

Retarding main injection can reduce pressure and NOx but often raises:

- BSFC;
- EGT;
- late burn.

# 3. Injection pressure

Higher injection pressure can:

- improve atomization;
- accelerate mixing;
- shorten duration;
- reduce soot in some regions.

But it can also:

- increase pump work;
- increase injector stress;
- change NOx and MPRR.

# 4. Pilot injection

A small pilot can shorten the effective main-event ignition delay and soften the main premixed burn.

Potential benefits:

- lower noise;
- lower MPRR;
- better cold stability.

Too much pilot can worsen fuel consumption or emissions.

# 5. Main injection

The main event supplies most of the torque-producing fuel.

The ECU may shape:

- timing;
- duration;
- pressure;
- rate.

# 6. Post injection

Post injection can support:

- DOC heating;
- DPF regeneration;
- aftertreatment thermal management.

Potential penalties include:

- fuel consumption;
- HC slip;
- oil dilution;
- high turbine or catalyst temperature.

# 7. Dwell

At very short dwell, separately commanded injection events can merge hydraulically.

Therefore the physical rate-of-injection trace matters.

# 8. Timing × pressure interaction

The best main timing at one injection pressure is not necessarily best at another.

A useful local experiment is:

```text
main SOI × injection pressure
```

with responses:

- BSFC;
- NOx;
- soot;
- CA50;
- Pmax;
- MPRR.

# 9. Pilot calibration matrix

At selected speed-load points vary:

- pilot mass;
- pilot timing;
- pilot-main dwell.

The best pilot is often the smallest event that gives the required pressure-rise or noise benefit.

# 10. Calibration procedure

At each key speed-load point:

1. stabilize air, EGR and temperature;
2. sweep main SOI;
3. identify the efficiency-phasing region;
4. sweep pressure around that region;
5. add pilot only if needed;
6. add post only for a defined thermal objective;
7. validate injector/cylinder corrections.

# 11. Worked main-SOI sweep logic

At one speed-load point, imagine:

| Main timing | BSFC | NOx | MPRR | Smoke |
|---|---:|---:|---:|---:|
| retarded reference | high | low | low | medium |
| +2° earlier | improves | rises | rises slightly | lower |
| +4° earlier | near best | higher | high | lower |
| +6° earlier | little further gain | very high | limit | low |

The release point can be +2° or +4° depending on the approved NOx/MPRR/Pmax and aftertreatment strategy.

# 12. Injection-pressure sweep logic

At fixed timing:

```text
pressure ↑
→ injection duration can fall
→ spray breakup / entrainment can improve
→ soot may fall

but

pump work / leakage / hardware stress can rise
```

The pressure target should be selected from the net system response.

# 13. Multiple-injection scheduling

A robust scheduling strategy should also define:

- minimum dwell;
- minimum pilot quantity;
- maximum total injection duration;
- event suppression regions.

Near high speed/high load, available crank-angle window can become tight, so an injection event that is useful at low speed may need to disappear.

# 14. Post-injection verification

For every post-injection calibration, document the required benefit:

```text
target catalyst temperature rise
or
target DPF regeneration state
```

and measure the fuel/HC/oil penalty explicitly.

# 15. HD13-E worked calibration sequence at point C

At 1200 rpm cruise:

1. fix air/EGR state;
2. establish reference injection pressure;
3. sweep main SOI;
4. identify the BSFC/CA50 region;
5. reject Pmax/MPRR/NOx-limited points;
6. sweep injection pressure around the surviving region;
7. introduce pilot only where it gives a measurable noise/MPRR benefit;
8. validate the final point with a repeated reference.

# 16. Signals to log / calibration objects

| Calibration objects | Signals |
|---|---|
| main SOI | hydraulic SOI if available |
| rail/injection pressure | rail actual / pressure error |
| pilot quantity | CA10 / MPRR |
| pilot dwell | rate-of-injection / heat release |
| post quantity/timing | DOC/DPF inlet temperature |
| injector correction | IMEP / CA50 / EGT spread |

# 17. Production-variation validation

Repeat critical low-speed/high-load and cold/low-load points with representative:

- high-flow injector;
- low-flow injector;
- hot fuel;
- low cetane corner.

The production map should not be tuned around one golden injector.

# 18. Senior calibration deep dive — available injection window

At high speed, the available crank-angle/time window becomes short.

For a four-stroke engine at 1800 rpm:

$$
1^\circ CA \approx 92.6\ \mu s
$$

A long main event plus pilot and post injections can consume a large part of the useful combustion window.

Therefore event scheduling should include:

- maximum energizing duration;
- minimum dwell;
- event suppression logic;
- end-of-injection timing.

## Rate-shape interpretation

Two candidate injectors can deliver equal total mass but different early/late rate.

Use:

```text
rate of injection
→ heat release
→ CA10 / MPRR
→ CA50
→ CA90 / soot / EGT
```

to understand why combustion changed.

## Calibration-map continuity

After local optimization, inspect neighboring speed/load cells.

A sudden pilot quantity or SOI jump can create an audible or torque discontinuity during a slow acceleration.

Map smoothing is acceptable only if the smoothed cells remain inside the measured mechanical/emissions constraints.

# 19. Common mistakes

- Maximizing injection pressure everywhere.
- Treating commanded timing as actual hydraulic SOI.
- Changing pilot without rechecking main combustion phasing.
- Using post injection as free exhaust heat.
- Optimizing timing and pressure independently when they interact.

# 20. Key lessons

1. Total fuel mass sets torque potential; the injection pattern sets how efficiently and cleanly that fuel burns.
2. SOI and pressure interact strongly.
3. Pilot shapes early combustion; post injection often serves thermal management.
4. Dwell must be validated physically, not only in the command table.
5. Injection calibration is inherently multi-objective.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.bosch-mobility.com/en/solutions/powertrain/diesel/modular-common-rail-system-ohw/">Bosch modular common-rail system for large/off-highway diesel engines</a> — current high-pressure injection architecture reference.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
