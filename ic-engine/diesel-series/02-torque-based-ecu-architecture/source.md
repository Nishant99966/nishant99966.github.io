
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Torque-Based ECU Architecture and Driver Demand</h1>
<p><em>How accelerator, cruise, transmission, traction, emissions and protection requests become one permitted engine torque</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Heavy-duty engine control begins with torque arbitration

A modern heavy-duty diesel ECU rarely treats accelerator position as a direct fuel quantity.

<figure class="figure-card"><svg viewBox="0 0 820 550" role="img" aria-label="Torque based heavy duty diesel control">
<rect width="820" height="550" fill="white"/>
<g font-family="Arial" text-anchor="middle" fill="#17324a" font-size="14">
<rect x="265" y="20" width="290" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="53">Driver / cruise / transmission torque request</text>
<rect x="265" y="105" width="290" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="138">Torque arbitration & limits</text>
<rect x="265" y="190" width="290" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="223">Required internal torque / fuel energy</text>
<rect x="55" y="295" width="190" height="70" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="150" y="322">Air / O₂ / smoke</text><text x="150" y="344">VGT / EGR</text>
<rect x="315" y="295" width="190" height="70" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="410" y="322">Fuel quantity / pressure</text><text x="410" y="344">SOI / pilot / post</text>
<rect x="575" y="295" width="190" height="70" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="670" y="322">Pmax / thermal /</text><text x="670" y="344">aftertreatment limits</text>
<rect x="265" y="430" width="290" height="58" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="463">Actual brake torque → driveline</text>
</g>
<g stroke="#17324a" stroke-width="3"><line x1="410" y1="78" x2="410" y2="105"/><line x1="410" y1="163" x2="410" y2="190"/><line x1="410" y1="248" x2="410" y2="295"/><line x1="150" y1="365" x2="150" y2="410"/><line x1="150" y1="410" x2="410" y2="430"/><line x1="410" y1="365" x2="410" y2="430"/><line x1="670" y1="365" x2="670" y2="410"/><line x1="670" y1="410" x2="410" y2="430"/></g>
</svg><figcaption>Generic heavy-duty torque structure. Driver, cruise and transmission requests are arbitrated before the air path and injection system realize the permitted torque.</figcaption></figure>

A generic architecture is:

```text
Driver pedal / cruise / PTO
       ↓
raw torque request
       ↓
vehicle / transmission / traction arbitration
       ↓
engine torque limits
       ↓
required internal torque
       ↓
fuel + air + injection realization
```

# 2. Driver wish

A generic driver-wish map can be written as:

$$
T_{drv}=f(pedal,n_e)
$$

The same pedal position can request different torque at different engine speeds.

Heavy-duty drivability often intentionally shapes low-speed torque to protect the clutch, driveline, traction and smoke margin.

# 3. Other positive-torque requesters

The engine can receive requests from:

- cruise control;
- adaptive or predictive cruise;
- PTO;
- transmission shift management;
- anti-stall logic;
- thermal-management strategy.

A torque coordinator decides which request has authority.

# 4. Torque limiters

Typical limiters include:

- full-load torque curve;
- engine-speed overspeed boundary;
- transmission input-torque limit;
- axle or driveline limit;
- smoke and fresh-air limit;
- turbo-speed limit;
- rail or injection-pressure capability;
- Pmax and MPRR limit;
- coolant and oil temperature;
- aftertreatment protection;
- altitude derating.

Conceptually:

$$
T_{perm}
=
\min
(T_{request},T_{air},T_{fuel},T_{thermal},T_{mech},T_{driveline})
$$

# 5. Brake torque to internal torque

The combustion system must also cover friction, pumping and engine auxiliaries:

$$
T_{internal,req}
=
T_{brake,req}
+
T_{loss}
$$

Losses vary with engine speed, oil temperature, exhaust backpressure, EGR and accessory load.

# 6. Torque to fuel energy

A conceptual feedforward is:

$$
\dot m_{f,ff}
\approx
\frac{P_{internal,req}}
{\eta_{ref}LHV}
$$

Production ECUs can use inverse torque maps, indicated-efficiency models, fuel-to-torque maps or model-based observers.

The exact implementation varies, but the boundary logic is transferable.

# 7. Why injection timing belongs in the torque model

Two calibrations with the same injected fuel mass can produce different brake torque if combustion phasing changes.

Therefore:

$$
T\neq f(m_f)\ \mathrm{only}
$$

More realistically:

$$
T=f(m_f,SOI,p_{inj},air,EGR,T,\ldots)
$$

# 8. Torque monitoring

An independent or semi-independent torque estimate can use:

- fuel quantity;
- injection timing and pressure;
- air flow;
- engine acceleration;
- transmission input-torque estimate;
- cylinder pressure on development engines.

Torque monitoring supports safety, diagnostics, transmission coordination and cruise control.

# 9. Negative torque

Heavy-duty vehicles also request **negative engine torque** during overrun, exhaust braking, compression-release braking and downhill speed control.

A complete torque structure therefore spans:

```text
maximum drive torque
        ↓
zero torque
        ↓
maximum retarding torque
```

# 10. Calibration workflow

At each speed:

1. establish friction and loss baseline;
2. map full-load permitted torque;
3. validate smoke and air limit;
4. validate fuel-system capability;
5. validate Pmax and MPRR;
6. validate driveline torque limit;
7. fill intermediate driver-wish and torque-response regions;
8. test torque transitions during shifts and cruise changes.

# 11. Senior calibration deep dive — torque gradients and arbitration dynamics

Static torque arbitration is only half the problem. The permitted torque also needs a controlled **rate of change**.

A generic dynamic limiter is:

$$
\left|\frac{dT}{dt}\right|
\le
\left(\frac{dT}{dt}\right)_{allowed}
$$

Possible reasons include:

- clutch protection;
- driveline lash;
- traction;
- smoke;
- rail-pressure capability;
- engine-brake transition.

A torque request can therefore be below every static maximum and still be rate-limited.

## Torque normalization

Different subsystems may exchange torque referenced at different locations:

```text
indicated torque
brake/flywheel torque
transmission input torque
wheel torque
```

The interface definition must specify:

- sign convention;
- loss corrections;
- accessory torque;
- dynamic filtering.

## Torque reserve

Cruise control and transmission logic can benefit from a defined torque reserve:

$$
T_{reserve}=T_{perm}-T_{current}
$$

At HD13-E point C, a healthy reserve lets the vehicle respond to a mild grade without an immediate downshift.

But reserve should reflect the **current** smoke, thermal and air-path limits, not only the nominal full-load curve.

## Torque-monitor validation

At steady points compare:

$$
\Delta T=T_{measured}-T_{ECU}
$$

Then repeat during:

- tip-in;
- shift torque cut;
- engine-brake transition.

A model that is accurate only in steady state can still cause poor transmission coordination.

# 12. Common mistakes

- Mapping pedal directly to fuel quantity.
- Treating full-load torque as the only torque limiter.
- Ignoring friction and pumping when converting brake torque to combustion demand.
- Using one fuel-to-torque conversion for all injection timings.
- Forgetting the negative-torque side of the engine.

# 13. Key lessons

1. Torque arbitration separates what the vehicle asks for from what the engine may safely deliver.
2. Fuel is the main fast positive-torque actuator, but it sits behind multiple limiters.
3. Injection phasing and air state change torque efficiency.
4. Transmission and traction requests are first-class torque requesters.
5. Heavy-duty torque control includes both drive and retarding torque.

# References

<ol class="refs">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
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
