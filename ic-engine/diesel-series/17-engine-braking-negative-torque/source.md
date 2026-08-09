
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Engine Braking, Compression Release and Negative-Torque Calibration</h1>
<p><em>How to calibrate retarding torque, exhaust backpressure and transmission coordination for downhill control</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Heavy-duty engines are also braking devices

On long descents, using only service brakes can cause excessive brake temperature.

A heavy-duty engine can produce negative torque using:

- overrun pumping;
- exhaust brake;
- VGT/exhaust throttle;
- compression-release brake.

<figure class="figure-card"><svg viewBox="0 0 820 430" role="img" aria-label="Positive and negative torque">
<rect width="820" height="430" fill="white"/><line x1="90" y1="215" x2="750" y2="215" stroke="#52697a" stroke-width="2"/><line x1="90" y1="380" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="600" y="250" font-size="17">Engine speed →</text><text x="25" y="95" font-size="17" transform="rotate(-90 25,95)">Torque</text>
<path d="M120 185 C250 105,480 80,710 135" fill="none" stroke="#17324a" stroke-width="4"/><text x="480" y="90" font-size="14">positive drive torque</text>
<path d="M120 245 C280 285,470 340,710 320" fill="none" stroke="#5d87ad" stroke-width="4"/><text x="440" y="355" font-size="14">engine / exhaust / compression braking</text>
</svg><figcaption>Heavy-duty calibration includes both positive drive torque and negative retarding torque. Engine-brake calibration must integrate with transmission, service brakes and downhill-speed control.</figcaption></figure>

# 2. Compression-release brake

A compression-release brake releases compressed cylinder gas near the end of compression.

The piston therefore performs compression work without recovering most of it during expansion.

This creates strong negative torque.

# 3. Exhaust brake

An exhaust brake increases exhaust backpressure.

The pistons must perform more work during the exhaust stroke.

This also increases pumping loss and retarding torque.

# 4. VGT-assisted braking

A VGT can increase turbine restriction and exhaust pressure during braking.

But turbo speed, exhaust pressure and temperature limits remain active.

# 5. Brake-torque map

Negative torque should be calibrated versus:

```text
engine speed
×
driver brake request / retarder stage
```

Retarding power is:

$$
P_{ret}
=
|T_{ret}|\omega
$$

Because power increases with speed for the same braking torque, engine-speed protection is important.

# 6. Vehicle integration

The brake request can come from:

- driver switch;
- brake pedal blending;
- downhill speed control;
- cruise control;
- transmission retarder coordination.

# 7. Downshift coordination

An automated transmission can downshift to raise engine speed and therefore engine-braking power.

The engine and transmission must coordinate:

- permitted speed;
- clutch state;
- negative torque ramp;
- driveline shock.

# 8. Thermal effects

Engine braking can change:

- exhaust temperature;
- turbo speed;
- aftertreatment temperature.

This can help or hurt catalyst thermal state depending on architecture.

# 9. Calibration procedure

At each speed:

1. establish minimum negative torque;
2. activate exhaust or VGT braking;
3. add compression-release braking if fitted;
4. measure retarding torque;
5. monitor exhaust pressure and turbo speed;
6. evaluate driveline smoothness;
7. validate downshift interactions.

# 10. Worked retarding-power example

Suppose the engine produces 2500 Nm of retarding torque at 1800 rpm.

Then:

$$
P_{ret}
=
2500
\left(
2\pi\frac{1800}{60}
\right)
\approx471\ kW
$$

This shows why transmission downshifting can dramatically increase available retarding power on a descent.

# 11. Brake-level map

A practical calibration can use:

```text
engine speed
×
requested brake level
```

to schedule:

- compression-release authority;
- VGT;
- exhaust throttle;
- fueling cut;
- transmission downshift request.

# 12. Transition quality

The transition from drive torque to brake torque can cross driveline backlash.

Use controlled ramps to avoid:

- jerk;
- driveline impact;
- unstable gear engagement.

# 13. Thermal coordination

During long downhill operation, engine braking can cool combustion while still creating substantial exhaust pumping.

Track catalyst temperature so that the subsequent positive-torque event does not begin from an unexpected aftertreatment state.

# 14. Calibration execution standard

## Objective

Deliver predictable retarding torque without overspeed, excessive exhaust pressure, turbo limit or driveline shock.

## Calibration objects

- brake-level torque request;
- compression-release enable;
- VGT/exhaust-throttle target;
- negative-torque ramp;
- transmission downshift request.

## Signals to log

```text
requested / actual retarding torque
engine speed
gear
exhaust-manifold pressure
turbo speed
VGT / exhaust throttle
coolant / oil
catalyst temperature
vehicle deceleration
```

## Selection rule

Use the maximum retarding torque that preserves valve-train, turbo, exhaust-pressure and driveline limits with acceptable transition quality.

## Robustness

Validate long descents, hot engine, high altitude, loaded vehicle and repeated brake entry/exit.

# 15. Valve-train and cylinder-pressure constraints

Compression-release braking creates large pressure forces at a different part of the cycle from normal positive-power combustion.

Validation should include:

- peak compression pressure;
- valve-actuation timing;
- rocker/valve-train load boundaries;
- oil temperature and pressure.

Do not infer brake durability only from retarding torque.

# 16. Exhaust-brake versus compression-release blending

A lower brake level may use mostly exhaust/VGT restriction.

Higher levels may add compression release.

A smooth strategy avoids a large step when the second mechanism enters.

# 17. Driver and cruise calibration

Engine-brake request can come from:

- manual stalk/switch;
- cruise downhill control;
- brake pedal blending.

The same requested deceleration may need different engine-brake torque depending on:

- vehicle mass;
- grade;
- gear.

# 18. Release metric

In addition to maximum kW braking power, report the **usable braking power over the intended engine-speed range** because drivers experience the whole curve, not only the peak value.

# 19. Common mistakes

- Calibrating engine braking without the transmission.
- Chasing maximum backpressure without turbo or valve-train limits.
- Ignoring driveline lash and negative-torque ramp rate.
- Treating engine braking as unrelated to aftertreatment temperature.
- Using one retarding-torque value across the speed range.

# 20. Key lessons

1. Heavy-duty diesel calibration includes a full negative-torque map.
2. Compression-release and exhaust braking use different physical mechanisms.
3. Retarding power depends strongly on engine speed.
4. Transmission downshift strategy is part of engine-brake performance.
5. Exhaust pressure, turbo speed and driveline smoothness constrain maximum braking.

# References

<ol class="refs">
<li><a href="https://www.scania.com/at/de/home/products/trucks/g-series/g-series-specifications.html">Scania current heavy-duty truck engine specifications</a> — current commercial examples of low-speed 13-L diesel/HVO engines, Twin SCR and compression-release engine braking.</li>
<li><a href="https://www.volvotrucks.us/trucks/powertrain/d13tc/">Volvo D13TC official page</a> — current heavy-duty example of turbo-compound exhaust-energy recovery and low-rpm powertrain integration.</li>
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
