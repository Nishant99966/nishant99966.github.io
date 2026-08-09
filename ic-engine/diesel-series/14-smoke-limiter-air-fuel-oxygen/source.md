
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Smoke Limiting, Air/Fuel Ratio and Fresh-Oxygen Margin</h1>
<p><em>How to calibrate steady and transient fuel authority without sacrificing low-speed torque response</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Smoke limiting is an oxygen-availability problem

A heavy-duty driver can demand torque faster than the air system can provide oxygen.

During tip-in:

```text
fuel request ↑ quickly
turbo speed ↑ more slowly
fresh air ↑ more slowly
```

Without a limiter, locally rich combustion can create a strong smoke and PM spike.

# 2. Global lambda

A useful global quantity is:

$$
\lambda
=
\frac{AFR_{actual}}{AFR_{stoich}}
$$

But a globally lean cylinder can still contain locally rich spray regions.

Therefore smoke calibration needs both:

- global oxygen state;
- injection and mixing behavior.

# 3. Fresh-oxygen-based limit

A generic limiter can be:

$$
m_{fuel,max}
=
f(m_{air},Y_{O_2},n_e,p_{inj},T)
$$

The exact structure depends on measurement and model quality.

# 4. Steady-state smoke boundary

At each speed-load region:

1. establish air and EGR state;
2. increase fuel in controlled steps;
3. measure smoke or fast PM proxy;
4. identify the steep soot-rise region;
5. move the production limit back by a robustness margin.

# 5. Why margin is required

Field variation includes:

- injector flow;
- turbo efficiency;
- air-filter restriction;
- fuel properties;
- altitude;
- EGR error.

A lab calibration placed exactly on the smoke cliff will smoke on weaker engines or harsher environments.

# 6. Transient smoke limiter

A transient limiter can use:

- current air mass;
- boost;
- fresh O₂ estimate;
- turbo speed;
- predicted future air.

The limiter should release fuel progressively as air arrives.

Too-fast release can create a second smoke peak.

# 7. Transmission interaction

During an upshift, the engine can be asked to reduce torque rapidly.

After the shift, torque can be restored.

The smoke limiter must be coordinated with this torque recovery.

# 8. Altitude

At altitude:

- ambient pressure falls;
- compressor pressure ratio demand rises;
- oxygen mass falls;
- turbo-speed margin shrinks.

A proper altitude strategy may reduce allowable fuel rather than chase sea-level torque.

# 9. Worked air-fuel example

Suppose a cylinder group receives:

```text
air flow  = 0.40 kg/s
fuel flow = 0.020 kg/s
```

Then:

$$
AFR_{actual}
=
\frac{0.40}{0.020}
=
20
$$

If stoichiometric AFR for the fuel is approximately 14.5:

$$
\lambda
\approx
\frac{20}{14.5}
=
1.38
$$

The engine is globally lean, yet local spray cores can still be rich enough to form soot.

# 10. Smoke-map axes

A production smoke limiter may need inputs such as:

```text
engine speed
fresh air / O2
boost
EGR or dilution
injection pressure
temperature
```

The number of dimensions should match available measurement/model quality.

# 11. Dynamic prediction

A purely instantaneous air limiter can be conservative because it ignores incoming boost.

A predictive limiter can use:

- turbo speed;
- manifold filling;
- VGT state;

to estimate near-future air.

Prediction improves response only if model error is controlled.

# 12. Robustness test

After calibrating on a clean engine, repeat critical tip-ins with:

- allowed air-filter restriction;
- hot charge air;
- altitude;
- lower-performing injector/turbo samples.

The smoke boundary should remain acceptable.

# 13. HD13-E transient smoke calibration at point B

Use a repeatable torque step into the 1000-rpm high-torque region.

Start conservatively, then increase transient fuel authority.

For every increment record:

```text
10–90% torque rise time
peak smoke / fast-PM signal
minimum fresh-air/O2 margin
minimum rail pressure
turbo-speed response
Pmax / MPRR if instrumented
```

Stop increasing fuel when the torque-response benefit becomes small relative to smoke/mechanical penalty.

# 14. Calibration objects

- steady smoke-limit surface;
- transient enrichment/authority;
- altitude correction;
- predicted-air correction;
- release rate after gear shifts.

# 15. Robustness

Validate with hot CAC, altitude, allowed filter restriction and lower-performing turbo/injector samples.

# 16. Senior calibration deep dive — model hierarchy

A smoke limiter can be built with increasing sophistication.

### Level 1
Air-mass-based fuel limit.

### Level 2
Fresh-O2 correction for EGR.

### Level 3
Corrections for injection pressure, charge temperature and altitude.

### Level 4
Transient prediction using turbo/manifold dynamics.

Use only the complexity that can be validated.

## Limiter transparency

Log both:

- raw requested fuel;
- allowed fuel after every limiter.

If the final injection quantity is low, the engineer should immediately know whether the cause was:

- smoke;
- rail pressure;
- Pmax;
- thermal;
- transmission torque.

## Transient acceptance

Define a quantitative smoke acceptance metric appropriate to the development instrument, together with torque-response metrics.

Never tune only to what looks visually acceptable at the tailpipe.

# 17. Common mistakes

- Using boost as the only smoke variable.
- Calibrating exactly at the visible-smoke threshold.
- Bypassing the smoke limiter during transient torque requests.
- Ignoring injector and turbo production variation.
- Restoring fuel too quickly after a shift.

# 18. Key lessons

1. Smoke limiting is fundamentally about oxygen and mixing.
2. Global lambda is useful but incomplete.
3. The production smoke boundary needs robustness margin.
4. Transient fuel authority should track air-system dynamics.
5. Altitude and transmission events are critical smoke-validation cases.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
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
