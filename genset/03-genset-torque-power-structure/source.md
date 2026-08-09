
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Complete CNG Genset Torque and Power Structure</h1>
<p><em>How electrical power demand becomes shaft torque, internal torque and air/gas/ignition commands without confusing nominal speed or power boundaries</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. The fundamental difference from an automotive engine

In an automotive torque structure, the driver presses the pedal and the ECU converts pedal position into a torque request.

A nominally fixed-speed genset is different.

The engine is mechanically coupled to a generator, and its main job is:

> **Produce exactly enough shaft torque to balance the generator's electromagnetic load while keeping speed/frequency around the required operating value.**

For a four-pole synchronous generator at 50 Hz:

$$
n_s=\frac{120f}{N_p}
=\frac{120\times50}{4}
=1500\ \mathrm{rpm}
$$

So speed is not the main operating-axis variable anymore. **Load becomes the dominant axis.**

# 2. The operating point collapses from speed × load to mainly load

An automotive engine may need maps across:

```text
1000 → 6000 rpm
×
low → full load
```

A 50 Hz genset is normally centered around:

```text
1500 rpm
×
0 → 100% electrical load
```

with corrections for:

- ambient pressure;
- intake temperature;
- coolant/oil temperature;
- gas quality;
- generator power factor;
- aging and hardware limits.

That makes the calibration space narrower in speed but deeper in **load, efficiency, emissions and durability optimization**.

# 3. Where does the torque request come from?

There are two important operating modes.

## Grid-parallel operation

The grid fixes electrical frequency very tightly.

The plant/load controller requests **active electrical power**:

$$
P_{elec,req}
$$

That becomes a required generator shaft power and engine torque.

## Island operation

There is no strong external grid fixing frequency.

The speed governor watches:

$$
n_{target}-n_{actual}
$$

A load increase creates extra generator electromagnetic torque, engine speed begins to fall, and the governor requests more engine torque.

So the request chain becomes:

```text
Electrical load increases
        ↓
generator resisting torque increases
        ↓
engine speed tends to fall
        ↓
speed governor requests more engine torque
        ↓
air + fuel + spark are increased
        ↓
1500 rpm is recovered
```

# 4. Electrical power becomes shaft torque

At a given instantaneous engine speed:

$$
P=T\omega
$$

At the nominal 1500-rpm point:

$$
\omega=\frac{2\pi\times1500}{60}
\approx157.1\ \mathrm{rad/s}
$$

At nominal 1500 rpm, every 1 MW of shaft power corresponds to roughly:

$$
T\approx6.37\ \mathrm{kNm}
$$

This makes the genset torque structure intuitive.

If **shaft power itself** is 4.5 MW, the corresponding torque at nominal 1500 rpm is:

$$
T
=
\frac{4.5\times10^6}{157.1}
\approx
28.6\ \mathrm{kNm}
$$

If **4.5 MW is electrical output**, required shaft power and shaft torque are higher because generator losses must first be added. At an illustrative 97% generator efficiency, 4.5 MW electrical corresponds to about 4.64 MW shaft power and about 29.5 kNm at nominal 1500 rpm.

# 5. Electrical power is not exactly engine brake power

Generator efficiency is less than 100%.

Therefore:

$$
P_{shaft,req}
=
\frac{P_{elec,req}}{\eta_{gen}}
$$

and:

$$
T_{brake,req}
=
\frac{P_{shaft,req}}{\omega}
$$

Suppose:

```text
Electrical request        4.00 MW
Generator efficiency      97%
```

Then:

$$
P_{shaft,req}
=
\frac{4.00}{0.97}
=
4.124\ \mathrm{MW}
$$

and at the nominal 1500-rpm steady-state point:

$$
T_{brake,req}
\approx26.3\ \mathrm{kNm}
$$

# 6. Engine losses must still be added

The cylinders must produce more than brake torque.

Conceptually:

$$
T_{internal,req}
=
T_{brake,req}
+
T_{friction}
+
T_{pumping}
+
T_{aux}
$$

This includes:

- piston/ring/bearing friction;
- valve-train friction;
- pumping work;
- oil/coolant pumps;
- turbo/exhaust backpressure effects;
- engine-mounted auxiliaries.

# 7. A reference/potential-torque model can be useful

The engine's fresh-air charge defines a potential/reference torque.

Actual internal torque can be represented conceptually as:

$$
T_{internal}
=
T_{potential}
\eta_{spark}
\eta_{mixture}
\eta_{other}
$$

For a lean-burn gas engine, mixture efficiency should not automatically be interpreted as the same lambda-efficiency convention used in a stoichiometric automotive TWC engine. The torque model must match the project's actual combustion reference.

# 8. Genset torque-conversion chain

<div class="flow">
<div class="box"><strong>Electrical power demand</strong>Grid controller, plant controller, islanded frequency governor or load-sharing controller.</div>
<div class="box"><strong>Allowed active power</strong>Limited by thermal, knock, turbo, gas-quality and emissions capability.</div>
<div class="box"><strong>Shaft power / brake torque</strong>Electrical demand corrected for generator efficiency.</div>
<div class="box"><strong>Internal torque</strong>Engine losses added.</div>
<div class="box"><strong>Potential combustion torque</strong>Reference torque needed before spark/mixture effects.</div>
<div class="box"><strong>Air + fuel + spark</strong>Turbocharger, mixture control, gas valve/injectors and ignition realize torque.</div>
<div class="box"><strong>Actual shaft torque</strong>Balances generator electromagnetic torque.</div>
<div class="box"><strong>Speed/frequency response</strong>Nominal speed/frequency is controlled; actual speed follows the electrical and transient state.</div>
</div>

# 9. The generator presents resisting electromagnetic torque to the engine

The generator produces electromagnetic resisting torque.

The clean dynamic relationship is:

$$
J_{eq}\frac{d\omega}{dt}
=
T_{engine,shaft}
-
T_{generator,input}
$$

Acceleration is **not a loss term**. It is the result of a temporary torque imbalance.

At a steady operating point at nominal 50 Hz:

$$
\frac{d\omega}{dt}=0
$$

therefore:

$$
T_{engine,shaft}
\approx
T_{generator,input}
$$

The location of generator mechanical/electrical losses must be defined consistently. If generator efficiency is used to convert electrical power into required shaft power, those generator losses must not be added a second time in the engine loss model.

# 10. Active power and reactive power must be separated

This is important in genset work.

**Active power (kW/MW)** requires real mechanical shaft power from the engine.

**Reactive power (kVAr/MVAr)** is mainly managed through generator excitation/AVR and strongly affects current, voltage and generator thermal loading.

The engine torque structure should therefore primarily follow **active power**, while generator current/power factor can still impose a system limit.

# 11. Grid-parallel torque structure

```text
Plant active-power request
        ↓
ramp / dispatch / grid-service logic
        ↓
maximum allowed electrical power
        ↓
generator-efficiency correction
        ↓
required engine brake torque
        ↓
engine losses
        ↓
required internal torque
        ↓
combustion reference / potential torque
        ↓
air + gas + spark
        ↓
engine shaft power
```

Speed is nearly fixed by grid frequency.

# 12. Islanded torque structure

```text
50 Hz / 1500 rpm setpoint
        ↓
speed error
        ↓
governor torque request
        ↓
torque limits
        ↓
air + gas + spark response
        ↓
engine torque
        ↓
frequency recovery
```

In this mode, the torque request is dynamically created by **frequency error**.

# 13. Limiters in a CNG genset

A genset can be power-limited by:

- compressor/turbo speed;
- knock;
- peak cylinder pressure;
- prechamber stability;
- lean-burn stability;
- gas pressure/flow;
- high intake temperature;
- exhaust/turbine temperature;
- coolant/oil temperature;
- NOx/CH4 emissions target;
- generator current/apparent-power limit.

The final available active-power request is the lowest safe value.

# 14. Why this architecture is representative of modern large gas engines

Modern multi-megawatt gas-engine gensets commonly combine nominal-speed operation, turbocharging, lean combustion, advanced ignition systems and carefully optimized valve timing.

This combination makes a 1500-rpm multi-megawatt lean-burn engine a useful teaching reference for the series.

The exact implementation varies by manufacturer, so the block diagrams here should be read as engineering models rather than a copy of any proprietary ECU.

# 15. Interactive 1500-rpm power-to-torque converter

<div class="interactive-card">
<h3>Electrical demand → engine torque</h3>
<label>Electrical active power [MW] <input id="gt-p" type="range" min="0.2" max="4.6" step="0.1" value="4.0" oninput="updateGT()"></label>
<label>Generator efficiency <input id="gt-e" type="range" min="0.94" max="0.99" step="0.005" value="0.97" oninput="updateGT()"></label>
<label>Engine loss torque [kNm] <input id="gt-l" type="range" min="0.5" max="4" step="0.1" value="2.0" oninput="updateGT()"></label>
<div class="kpis">
<div class="kpi"><strong id="gt-shaft">–</strong>Shaft power</div>
<div class="kpi"><strong id="gt-brake">–</strong>Brake torque</div>
<div class="kpi"><strong id="gt-int">–</strong>Internal torque</div>
</div>
<p id="gt-msg"></p>
</div>

# 16. Power boundaries that must be defined before using the torque structure

A genset has several power boundaries:

```text
Fuel chemical power
      ↓
Engine internal/indicated power
      ↓
Engine brake / shaft power
      ↓
Generator gross electrical power
      ↓
Plant auxiliaries
      ↓
Net electrical export
```

The engine torque structure should normally work with a clearly defined **engine shaft/brake torque boundary**.

If the incoming request is electrical power:

$$
P_{shaft,req}
=
\frac{P_{el,gross,req}}
{\eta_{gen}}
$$

If the plant controller requests net exported power, auxiliary consumption may also need to be accounted for upstream.

This prevents a common systems error: comparing a net plant MW target with an engine brake-power model as though they were the same quantity.

# 17. Which limits should enter the genset torque structure?

A strong power coordinator can receive maximum allowed power from several domains:

```text
Engine combustion limit
Turbo / air-system limit
Gas-flow limit
Thermal limit
Generator P-Q capability
Grid / plant dispatch limit
Protection / reliability limit
```

The permitted power is conceptually the most restrictive valid limit.

This is the genset equivalent of automotive torque arbitration, but the competing requests are plant/electrical rather than pedal/traction/transmission requests.

# 18. Using an operating-dependent generator loss model in the torque calculation

A higher-fidelity conversion is:

$$
P_{shaft,req}
=
P_{el,gross,req}
+
P_{gen,loss}(P,Q,T,\ldots)
$$

rather than relying only on one constant efficiency.

Then:

$$
T_{brake,req}
=
\frac{P_{shaft,req}}{\omega}
$$

At a steady operating point near nominal 1500 rpm, the angular speed is nearly constant over the averaging window, so generator-loss-model error maps almost directly into torque-request error. During transients, use the actual measured or estimated ω(t).

This is particularly important when comparing:

- low versus rated load;
- different power factors;
- hot versus cold generator operation.

# 19. Torque-model architecture is not universal

A reference/potential-torque formulation is one useful torque-based implementation:

$$
T_{internal}
\approx
T_{ref}
\,\eta_{comb}
$$

where the combustion correction can depend on:

$$
\eta_{comb}
=
f(\theta_{spark},\lambda,prechamber,residuals,T,\ldots)
$$

It should not be interpreted as proof that every production genset ECU uses independent multiplicative spark and lambda efficiencies.

The interaction terms matter:

$$
spark\times\lambda
$$

$$
prechamber\times\lambda
$$

and are treated explicitly in the DoE article.

# 20. Actual-speed torque conversion

During a transient, use:

$$
T(t)
=
\frac{P(t)}{\omega(t)}
$$

not a hard-coded 1500-rpm conversion.

# 21. Common mistakes

- Converting electrical MW directly to engine torque without generator losses.
- Treating 1500 rpm as exact during an island frequency dip.
- Double-counting generator losses inside the engine loss model.
- Treating the conceptual potential-torque formulation as one universal ECU implementation.
- Ignoring active electrical limits when the engine itself has spare torque.

# 22. Key lessons

1. Electrical demand must cross a clearly defined generator-loss boundary before becoming engine brake torque.
2. Actual speed belongs in transient torque conversion.
3. Engine losses convert brake torque into required internal torque.
4. Combustion models can be structured in different ways; interaction terms must be respected.
5. Permitted power is the minimum of plant, generator, gas, air, combustion and protection capability.

# References

<ol class="refs">
<li>ISO 8528-1:2018 — Application, ratings and performance (current in 2026; revision under development).</li>
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>ISO 8528-3:2020 — AC generators for generating sets; current after confirmation in 2026.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
<li>ISO 3046-1:2002 — Additional engine performance/declaration requirements; current in 2026 but under revision.</li>
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
