
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>The Complete Heavy-Duty Diesel Engine as a Powertrain System</h1>
<p><em>Why the calibration problem begins with the vehicle duty cycle—not a fixed engine speed</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Heavy-duty diesel calibration starts with a moving operating point

A road or off-highway heavy-duty engine does not live at one rated speed.

It moves continuously through engine speed and torque according to:

- accelerator or driver demand;
- road grade;
- vehicle mass;
- transmission ratio;
- vehicle speed;
- cruise-control strategy;
- PTO or hydraulic loads;
- retarding demand;
- emissions and thermal-management state.

<figure class="figure-card"><svg viewBox="0 0 820 470" role="img" aria-label="Heavy-duty diesel speed-load map">
<rect width="820" height="470" fill="white"/><line x1="90" y1="390" x2="750" y2="390" stroke="#52697a" stroke-width="2"/><line x1="90" y1="390" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="600" y="430" font-size="17">Engine speed →</text><text x="25" y="105" font-size="17" transform="rotate(-90 25,105)">BMEP / load ↑</text>
<path d="M120 320 C170 235,250 155,360 110 C500 75,625 95,710 165" fill="none" stroke="#17324a" stroke-width="4"/>
<text x="510" y="78" font-size="14">full-load torque boundary</text>
<ellipse cx="390" cy="245" rx="125" ry="75" fill="none" stroke="#5d87ad" stroke-width="3"/><text x="335" y="245" font-size="14">high-efficiency island</text>
<path d="M150 345 C270 315,420 285,650 250" fill="none" stroke="#9bb5c9" stroke-width="2"/><text x="550" y="245" font-size="13">typical road-load line</text>
<circle cx="250" cy="310" r="7" fill="#17324a"/><circle cx="390" cy="255" r="7" fill="#17324a"/><circle cx="580" cy="205" r="7" fill="#17324a"/>
<text x="195" y="340" font-size="13">urban / low load</text><text x="335" y="285" font-size="13">cruise</text><text x="555" y="235" font-size="13">grade</text>
</svg><figcaption>A heavy-duty road engine lives on a two-dimensional speed–load map. Vehicle mass, road grade, gear selection and driver demand move the operating point continuously.</figcaption></figure>

The moving operating point is the foundation of heavy-duty vehicle-engine calibration.

# 2. The complete system boundary

A modern heavy-duty diesel powertrain can include:

```text
Driver / autonomous / cruise request
        ↓
Vehicle torque coordination
        ↓
Transmission / clutch / axle
        ↓
Diesel engine
        ↓
Air system + EGR
Fuel injection
Combustion
        ↓
DOC / DPF / SCR / ASC
        ↓
Tailpipe
```

The engine is only one subsystem in the vehicle torque and emissions system.

# 3. Why vehicle duty matters

Two engines with identical rated power can experience radically different use.

### Long-haul tractor

Often spends large time near moderate engine speed, high torque, steady cruise and long grades.

### Urban bus or refuse truck

Can experience frequent idle, acceleration, low-load operation, repeated transients and aftertreatment temperature challenges.

### Construction and off-highway

Can experience sustained high load, aggressive transients, high dust, altitude and hydraulic or PTO demand.

The calibration objective must therefore reflect the real duty histogram.

# 4. Speed, torque and power

Mechanical power is:

$$
P=T\omega
$$

with:

$$
\omega=\frac{2\pi n}{60}
$$

At different speeds, the same power requires different torque.

Example: for 300 kW at 1200 rpm,

$$
T=
\frac{300000}{2\pi(1200/60)}
\approx2387\ \mathrm{Nm}
$$

At 1800 rpm:

$$
T\approx1592\ \mathrm{Nm}
$$

This is why a heavy-duty torque map and a power map are not interchangeable.

# 5. Typical modern engine subsystems

A current heavy-duty diesel can use some combination of:

- high-pressure common rail;
- electronically controlled unit injection on some architectures;
- fixed, wastegated or variable-geometry turbocharging;
- one or multiple turbo stages;
- turbo compounding on selected products;
- cooled EGR or SCR-dominant low-EGR architecture;
- intake throttle or exhaust throttle for air, EGR and thermal control;
- compression-release engine brake;
- DOC;
- DPF;
- one or multiple SCR catalyst stages;
- ammonia-slip catalyst;
- electrically assisted aftertreatment heating on advanced products.

No single hardware list is universal.

# 6. Calibration boundaries

Every performance statement should define:

- brake power versus wheel power;
- engine-out versus tailpipe emissions;
- fuel LHV versus volumetric consumption;
- fresh versus aged aftertreatment;
- hot stabilized versus cold or transient state;
- engine-only versus vehicle fuel economy.

# 7. Engine efficiency

Brake thermal efficiency is:

$$
\eta_b=
\frac{P_b}{\dot m_fLHV}
$$

Brake-specific fuel consumption is:

$$
BSFC=
\frac{\dot m_f}{P_b}
$$

These metrics are useful, but vehicle fuel economy also depends on gear selection, axle ratio, road load, predictive cruise, idle time and engine-brake use.

# 8. The calibration engineer's central question

At every speed-load point:

> **Can the demanded torque be produced with acceptable fuel consumption, NOx, soot/PM, cylinder pressure, pressure-rise rate and exhaust temperature while the fuel system, air path, aftertreatment, driveline and durability limits remain inside their approved boundaries?**

# 9. On-road versus off-highway scope

The combustion, fuel, turbo, EGR and durability physics in this series apply broadly.

The regulatory chapters use heavy-duty **on-road** examples such as Euro 7, UN Regulation No. 49 and U.S. heavy-duty highway rules.

Off-highway engines require their own applicable regulatory framework and duty cycles.

# 10. Continuous teaching engine used through the committee edition

To make the 33 articles feel like one calibration program rather than isolated topics, the series now follows a fictional OEM-neutral engine called **HD13-E**.

```text
Configuration:       13-L inline-six heavy-duty diesel
Rated power:         390 kW @ 1600 rpm
Peak torque:         2600 Nm @ 950–1200 rpm
Air system:          VGT + cooled EGR
Fuel system:         high-pressure direct injection
Aftertreatment:      DOC + DPF + SCR + ASC
Transmission:        automated heavy-duty gearbox
```

The values are illustrative. They are deliberately plausible rather than copied from one manufacturer.

Five recurring operating points are used:

| ID | Operating point | Engineering meaning |
|---|---|---|
| A | 700 rpm, low load | idle / urban / catalyst-cooling risk |
| B | 1000 rpm, high torque | downsped grade / lugging boundary |
| C | 1200 rpm, medium-high load | long-haul cruise efficiency |
| D | 1600 rpm, high power | rated-power / thermal region |
| E | 1800 rpm, negative torque | engine-brake region |

When a later article says “HD13-E point C,” it refers to this table.

# 11. How the articles depend on one another

The intended technical sequence is:

```text
torque request and engine losses
        ↓
fuel-system characterization
        ↓
actuator/air-path characterization
        ↓
turbo + valve timing / gas exchange
        ↓
combustion and injection
        ↓
smoke + EGR + cylinder balance
        ↓
thermal / auxiliary boundaries
        ↓
aftertreatment + diagnostics
        ↓
transmission / vehicle / VECTO
        ↓
transients + DoE + durability
        ↓
release
```

A reader can enter at any article, but this dependency order should be followed for a new calibration program.

# 12. Common mistakes

- Treating rated power as the main calibration operating point.
- Ignoring transmission and road load when judging engine efficiency.
- Assuming all heavy-duty diesels use the same EGR, turbo or aftertreatment architecture.
- Comparing BSFC points at different thermal states.
- Treating engine-out emissions as tailpipe emissions.

# 13. Key lessons

1. Heavy-duty diesel calibration is a speed-load-transient problem.
2. Vehicle duty cycle determines which parts of the map matter most.
3. The engine, transmission, vehicle and aftertreatment form one control system.
4. Efficiency and emissions boundaries must be defined before comparing calibrations.
5. Product-specific hardware changes the calibration architecture, but the underlying physics remain transferable.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
<li><a href="https://www.scania.com/at/de/home/products/trucks/g-series/g-series-specifications.html">Scania current heavy-duty truck engine specifications</a> — current commercial examples of low-speed 13-L diesel/HVO engines, Twin SCR and compression-release engine braking.</li>
<li><a href="https://www.volvotrucks.us/trucks/powertrain/d13tc/">Volvo D13TC official page</a> — current heavy-duty example of turbo-compound exhaust-energy recovery and low-rpm powertrain integration.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
