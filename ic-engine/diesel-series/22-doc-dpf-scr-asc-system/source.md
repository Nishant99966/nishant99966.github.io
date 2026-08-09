
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>DOC, DPF, SCR and ASC as One Emissions-Control System</h1>
<p><em>Catalyst chemistry, temperature windows, backpressure and engine-aftertreatment co-optimization</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Aftertreatment is part of the engine calibration system

A modern heavy-duty diesel often uses some combination of:

<figure class="figure-card"><svg viewBox="0 0 820 480" role="img" aria-label="Heavy duty diesel aftertreatment">
<rect width="820" height="480" fill="white"/>
<g font-family="Arial" font-size="14" text-anchor="middle" fill="#17324a">
<rect x="35" y="170" width="115" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="92" y="200">Engine-out</text><text x="92" y="221">exhaust</text>
<rect x="190" y="170" width="110" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="245" y="211">DOC</text>
<rect x="340" y="170" width="110" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="395" y="211">DPF</text>
<rect x="490" y="170" width="110" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="545" y="211">SCR</text>
<rect x="640" y="170" width="110" height="70" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="695" y="211">ASC*</text>
<text x="410" y="70">Thermal management · dosing · soot/ash state · NOx/NH₃ feedback</text>
<text x="410" y="350">Electrically assisted heating can be added on advanced architectures</text>
</g>
<g stroke="#17324a" stroke-width="3"><line x1="150" y1="205" x2="190" y2="205"/><line x1="300" y1="205" x2="340" y2="205"/><line x1="450" y1="205" x2="490" y2="205"/><line x1="600" y1="205" x2="640" y2="205"/></g>
</svg><figcaption>Generic heavy-duty diesel aftertreatment. The exact catalyst order, volumes, number of SCR bricks, dosing locations, heaters and sensors are product-specific.</figcaption></figure>

```text
DOC
 ↓
DPF
 ↓
SCR
 ↓
ASC
```

The exact ordering, volume and number of catalyst stages are product-specific.

# 2. Diesel oxidation catalyst

For carbon monoxide:

$$
2CO+O_2\rightarrow2CO_2
$$

For a generic hydrocarbon:

$$
C_xH_y+
\left(x+\frac{y}{4}\right)O_2
\rightarrow
xCO_2+\frac{y}{2}H_2O
$$

DOC functions can include CO and HC oxidation, NO-to-NO2 conversion and controlled heat release during thermal management.

# 3. DPF

The DPF captures particulate.

Separate:

```text
soot
→ combustible
→ can be regenerated

ash
→ non-combustible
→ accumulates with service
```

# 4. SCR

Standard SCR:

$$
4NH_3+4NO+O_2
\rightarrow
4N_2+6H_2O
$$

Fast SCR:

$$
2NH_3+NO+NO_2
\rightarrow
2N_2+3H_2O
$$

The reductant system normally supplies aqueous urea/DEF, which ultimately provides NH3.

# 5. ASC

An ammonia-slip catalyst can reduce NH3 exiting the SCR system.

The exact chemistry and by-product management are catalyst-specific.

# 6. Thermal window

Every catalyst has a temperature-dependent conversion window.

Too cold:

- DOC conversion falls;
- DPF oxidation slows;
- SCR dosing or conversion is limited.

Too hot:

- catalyst aging accelerates;
- substrate and coating protection can become active.

# 7. Backpressure

Aftertreatment pressure drop changes engine pumping work.

A more restrictive system can worsen BSFC even if catalyst conversion improves.

# 8. Engine-aftertreatment optimization

The true objective is not minimum engine-out NOx or minimum engine-out soot.

It is:

```text
engine efficiency
+
engine-out emissions
+
aftertreatment conversion
+
thermal management
+
durability
+
backpressure
```

# 9. Current advanced architecture

Current heavy-duty products demonstrate increasingly integrated aftertreatment, including electrically assisted thermal management for cold and low-load operation.

This technology is treated in detail later rather than assumed universal.

# 10. Catalyst light-off and conversion maps

A useful catalyst map is:

```text
conversion efficiency
=
f(catalyst temperature, space velocity, gas composition)
```

Space velocity changes strongly with engine speed and load.

Therefore the same catalyst temperature can produce different conversion at idle and high load.

# 11. DOC NO-to-NO2 balance

DOC oxidation of some NO to NO2 can affect:

- passive DPF oxidation;
- downstream SCR chemistry.

The desired NO2 fraction is therefore a system quantity rather than simply “maximize NO2.”

# 12. Aftertreatment pressure-drop map

Measure pressure drop across:

- DOC/DPF assembly;
- SCR assembly;

versus exhaust flow and temperature.

This allows the engine-loss model to distinguish:

```text
normal flow-dependent restriction
from
abnormal soot / ash / damage
```

# 13. Catalyst aging mechanisms

Track:

- high-temperature exposure;
- sulfur;
- oil ash/contaminants;
- thermal cycling.

Aged conversion maps should be included in calibration robustness, not added only during certification.

# 14. System-level emissions budget

A mature calibration program allocates responsibility between engine-out emissions and aftertreatment.

For NOx:

$$
NOx_{tailpipe}
=
NOx_{engine-out}
-
NOx_{converted}
$$

For particulate:

```text
engine-out soot / PM
        ↓
DPF filtration
        ↓
regeneration / ash state
        ↓
tailpipe particulate
```

The calibration target should therefore consider:

- engine-out NOx and soot;
- catalyst conversion;
- DPF loading/regeneration cost;
- fuel penalty;
- backpressure;
- aged-system margin.

# 15. Supervisory target generation

A generic supervisory controller can generate engine-out targets from:

```text
tailpipe requirement
+
SCR temperature / conversion state
+
DPF soot state
+
thermal-management demand
+
fuel-efficiency objective
```

These targets then influence EGR, air path and injection.

# 16. Feedforward plus slow feedback

Because catalyst storage and sensor transport create delay, aftertreatment control should use strong feedforward from engine-out mass flow and thermal state, with slower feedback for ageing/model error.

The calibration team should explicitly verify the timing between:

- engine-out change;
- catalyst response;
- downstream sensor response.

# 17. Senior calibration deep dive — engine/aftertreatment operating modes

A supervisory strategy can define modes such as:

```text
normal efficiency
cold warm-up
DPF regeneration
high-NOx control
thermal protection
degraded emissions control
```

Each mode changes priorities.

For example, during DPF regeneration:

- post injection or thermal actuators can increase;
- EGR strategy may change;
- torque reserve can change;
- catalyst temperature limits become more important.

## Mode-transition calibration

The transition into and out of a mode can create larger emissions spikes than the steady mode itself.

Validate:

- entry ramp;
- exit ramp;
- driver torque disturbance;
- NOx/smoke transient;
- temperature overshoot.

## Aged system

The engine-out calibration should be checked with the aged conversion/pressure-drop state that matters for release, not only with fresh hardware.

# 18. Common mistakes

- Treating aftertreatment as a passive downstream box.
- Confusing soot with ash.
- Ignoring aftertreatment backpressure in BSFC.
- Optimizing engine-out NOx without SCR capability.
- Calibrating only fresh catalysts.

# 19. Key lessons

1. DOC, DPF, SCR and ASC have different jobs.
2. Temperature and exhaust flow determine catalyst effectiveness.
3. Soot is regenerable; ash is a lifetime maintenance state.
4. Aftertreatment backpressure feeds back into engine efficiency.
5. Engine and aftertreatment must be optimized as one system.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.cummins.com/en-eu/components/aftertreatment/twin-module-aftertreatment-system/product-overview">Cummins EPA27 Twin Module Aftertreatment official page</a> — current commercial example of electrically assisted aftertreatment thermal management.</li>
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
<li><a href="https://eur-lex.europa.eu/eli/reg/2024/1257/oj/eng">Regulation (EU) 2024/1257 (Euro 7)</a> — current legal source; exact dated limits and application milestones are maintained in the series Regulatory Appendix.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
