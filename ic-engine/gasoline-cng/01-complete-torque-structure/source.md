
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Complete Engine Torque Structure</h1>
<p><em>How a pedal movement becomes final crankshaft torque — requests, arbitration, internal torque, potential torque, actuator conversion and limiting paths</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why torque structure deserves its own article

A modern spark-ignition engine does not treat the accelerator pedal as a direct throttle command.

When the driver moves the pedal, the ECU first asks:

> **How much crankshaft torque is being requested, how much is permitted, and what combination of air, fuel and combustion settings can produce it?**

That is the purpose of the **torque structure**.

This article is intentionally theory-first. It does not explain how to calibrate each map. The goal is to make the complete signal path understandable so that, when a reader changes a control input, they can follow how that change finally becomes crankshaft torque.

# 2. The complete picture

<div class="flow">
<div class="box"><strong>1. Driver / vehicle request</strong>Pedal, cruise, idle, transmission and vehicle controllers create torque requests.</div>
<div class="box"><strong>2. Arbitration</strong>The ECU decides which request or limit has priority.</div>
<div class="box"><strong>3. Permitted brake torque</strong>The final crankshaft torque target is established.</div>
<div class="box"><strong>4. Internal torque</strong>Friction, pumping and accessory losses are added back.</div>
<div class="box"><strong>5. Potential torque</strong>The ECU accounts for planned spark, lambda and other combustion effects.</div>
<div class="box"><strong>6. Torque conversion</strong>The inverse torque model converts required potential torque into required cylinder charge.</div>
<div class="box"><strong>7. Actuators</strong>Throttle, boost, VVT, fuel and spark are coordinated.</div>
<div class="box"><strong>8. Actual torque estimate</strong>The forward model estimates what the engine really produced.</div>
</div>

The important point is that **torque is the common language**. The pedal, transmission, traction system and engine hardware do not need to communicate in throttle degrees or injector milliseconds. They can communicate in torque.

# 3. Step 1 — pedal movement becomes driver-wish torque

Suppose the engine is running at 2500 rpm and the driver moves the accelerator from 30% to 60%.

A simplified driver-wish map can be written as:

$$
T_{driver,raw}
=
f(\alpha_{pedal},n_{engine},drive\ mode)
$$

The pedal map normally uses **current measured engine speed**. It does not need a fictional “required rpm” for a normal acceleration request.

Example:

| Input | Value |
|---|---:|
| Pedal | 60% |
| Current speed | 2500 rpm |
| Drive mode | Normal |
| Raw driver-wish torque | 150 Nm |

The first important distinction is:

> **150 Nm is not indicated torque.** It is simply the driver's unlimited torque request.

# 4. Step 2 — torque arbitration decides what is actually allowed

The driver is only one requester.

At the same instant, the ECU or vehicle torque coordinator may also receive:

| Request / limit | Example role |
|---|---|
| Driver | Wants +150 Nm |
| Cruise control | May request positive or negative torque |
| Idle control | Adds or subtracts small torque corrections |
| Transmission | May request temporary torque reduction during a shift |
| Traction / stability control | May impose a fast upper limit |
| Engine-speed limiter | Prevents further accelerating torque |
| Thermal protection | Reduces sustainable torque |
| Knock / cylinder-pressure protection | Restricts combustion or charge |
| Fuel-system limit | Restricts fuel and therefore achievable torque |
| Turbo-speed / boost limit | Restricts available air |
| Catalyst protection | Can restrict spark, lambda or load |

Assume:

```text
Driver request              150 Nm
Transmission maximum        135 Nm
Thermal maximum             120 Nm
Traction maximum            130 Nm
```

The permitted value is:

$$
T_{brake,req}=120\ \mathrm{Nm}
$$

This is why moving the pedal further does not always increase torque.

The pedal can request more while another part of the powertrain says:

> “The engine is not allowed to deliver more right now.”

# 5. Positive requests and upper/lower limits are not the same thing

It is useful to separate three ideas:

- **request** — “I would like this torque”;
- **upper limit** — “do not exceed this torque”;
- **lower limit** — “do not go below this torque.”

An idle controller may request additional positive torque when the A/C compressor switches on.

A transmission controller may impose an upper limit during a shift.

A catalyst-heating mode may request a certain internal combustion condition while another limit protects exhaust temperature.

The exact arbitration logic differs between ECU architectures, but the physics does not: **many demands must become one permitted torque target before actuator commands are produced**.

# 6. Step 3 — brake torque is not the torque the cylinders must create

Brake torque is what reaches the crankshaft.

The cylinders must produce more because some torque is consumed by:

- mechanical friction;
- gas-exchange or pumping work;
- oil and coolant pumps;
- alternator demand;
- air-conditioning compressor;
- other accessories.

A useful conceptual relationship is:

$$
T_{brake}
=
T_{internal}
-
T_{friction}
-
T_{pumping}
-
T_{aux}
$$

Therefore:

$$
T_{internal,req}
=
T_{brake,req}
+
T_{loss}
$$

If:

$$
T_{brake,req}=120\ \mathrm{Nm}
$$

and:

$$
T_{loss}=18\ \mathrm{Nm}
$$

then:

$$
T_{internal,req}=138\ \mathrm{Nm}
$$

So the combustion process must produce about 138 Nm internally for 120 Nm to appear at the crankshaft.

# 7. Step 4 — why potential torque exists

Now suppose the cylinder contains enough fresh air to produce a certain torque at a defined **reference combustion condition**.

That reference may mean:

- reference or optimal spark;
- reference lambda;
- defined cam positions;
- defined residual-gas condition;
- defined fuel mode.

The corresponding torque is often described conceptually as **potential**, **optimal**, **reference**, or **maximum available combustion torque**. Exact ECU terminology varies.

A simplified model is:

$$
T_{internal,actual}
=
T_{potential}
\eta_{spark}
\eta_{\lambda}
\eta_{other}
$$

This is the bridge between the air path and combustion.

The same air charge can produce different actual torque if spark or lambda changes.

# 8. Step 5 — planned combustion conditions change the amount of potential torque required

Continue the example:

$$
T_{internal,req}=138\ \mathrm{Nm}
$$

Suppose the intended operating state has:

$$
\eta_{spark}=0.92
$$

and:

$$
\eta_{\lambda}=0.97
$$

For this simplified example:

$$
T_{potential,req}
=
\frac{138}{0.92\times0.97}
=
154.6\ \mathrm{Nm}
$$

The air path therefore cannot merely prepare enough charge for 138 Nm.

It must prepare enough charge for approximately **154.6 Nm of reference potential torque**, because some of that potential will be lost through the planned combustion state.

This is one of the most important ideas in a torque-based ECU.

# 9. Step 6 — the inverse torque model converts torque into required air

The forward torque model answers:

> “If I have this speed, cylinder charge and combustion state, how much torque can I produce?”

Conceptually:

$$
T_{potential}
=
f(n,m_{air,cyl},cams,fuel\ mode,\ldots)
$$

The controller needs the reverse question:

> “If I need this much potential torque, how much air should I put in the cylinder?”

So it uses an inverse relationship:

$$
m_{air,cyl,req}
=
f^{-1}(n,T_{potential,req},\ldots)
$$

Assume the model says:

```text
130 Nm potential → 350 mg/event
165 Nm potential → 450 mg/event
```

Linear interpolation for 154.6 Nm gives approximately:

$$
m_{air,cyl,req}\approx420\ \mathrm{mg/event}
$$

Now the complete request has moved from:

```text
60% pedal
  ↓
150 Nm driver wish
  ↓
120 Nm permitted brake torque
  ↓
138 Nm required internal torque
  ↓
154.6 Nm required potential torque
  ↓
420 mg/event required fresh-air charge
```

# 10. Step 7 — how the ECU turns required charge into actuator commands

The required charge is not yet a throttle angle.

The air-path controller may use:

```text
Required fresh-air charge
          ↓
   manifold pressure target
          ↓
 ┌────────┼─────────┐
 ↓        ↓         ↓
Throttle  Boost     VVT
```

A naturally aspirated engine relies mainly on throttle and valve timing.

A turbocharged engine can also change:

- wastegate or turbine control;
- compressor operating point;
- boost pressure;
- intercooler outlet state.

The controller must achieve the required **trapped fresh-air mass**, not merely a certain manifold pressure.

# 11. Step 8 — fuel follows the air and lambda target

Once the air target is known, fuel mass follows from the desired lambda and stoichiometric ratio:

$$
m_f
=
\frac{m_{air}}
{\lambda\ AFR_{stoich}}
$$

For CNG, the correct stoichiometric ratio depends on gas composition.

For gasoline, ethanol content and fuel composition matter.

Fuel therefore participates in torque production in two ways:

1. it supplies chemical energy;
2. its commanded amount helps establish lambda, which also changes combustion and aftertreatment behavior.

# 12. Step 9 — final spark turns potential torque into delivered torque

The spark controller considers:

- reference/MBT spark;
- knock retard;
- catalyst-heating retard;
- torque-reduction request;
- temperature corrections;
- cylinder-specific corrections.

The final spark angle determines the actual spark efficiency.

So even if the air path has prepared 154.6 Nm of potential torque, final delivered torque can still change rapidly through spark.

That is why spark is a **fast torque actuator** while air is the main **sustainable torque actuator**.

# 13. Torque reserve explains why the engine may deliberately make less torque than the air could support

Suppose:

$$
T_{potential}=150\ \mathrm{Nm}
$$

$$
\eta_{\lambda}=0.98
$$

$$
\eta_{spark}=0.85
$$

and losses are 15 Nm.

Then:

$$
T_{brake}=150\times0.98\times0.85-15=109.95\ \mathrm{Nm}
$$

If a sudden torque request arrives and the ECU advances spark so that:

$$
\eta_{spark}=0.95
$$

then:

$$
T_{brake,new}=124.65\ \mathrm{Nm}
$$

No large air-charge change was required for that immediate response.

The engine had **unused torque potential stored in the air charge**.

<div class="article-note"><strong>Note:</strong> Torque reserve is useful only where the project intentionally carries it. Holding large reserve with spark retard costs efficiency and increases exhaust temperature, so it is not desirable everywhere.</div>

# 14. Forward torque estimation closes the loop

After commands are sent to the actuators, the ECU needs to know what torque was probably produced.

A simplified forward estimate is:

$$
T_{brake,est}
=
T_{potential}(n,m_{air,cyl},\ldots)
\eta_{spark}
\eta_{\lambda}
\eta_{other}
-
T_{loss}
$$

This estimate can be shared with:

- transmission control;
- traction/stability control;
- hybrid control;
- diagnostics;
- torque monitoring.

The torque structure therefore contains both:

```text
REQUEST PATH
torque → air / fuel / spark commands

and

ESTIMATION PATH
air / fuel / spark state → estimated torque
```

# 15. What happens when the driver changes one control?

This is the question that makes the complete structure intuitive.

## Case A — the driver presses the pedal further

```text
Pedal ↑
  ↓
Driver-wish torque ↑
  ↓
If limits allow:
permitted torque ↑
  ↓
required internal torque ↑
  ↓
required potential torque ↑
  ↓
air-charge target ↑
  ↓
throttle / boost / VVT act
  ↓
fuel ↑
  ↓
final torque ↑
```

## Case B — traction control suddenly reduces allowed torque

```text
Driver still asks 180 Nm
         ↓
Traction limit becomes 80 Nm
         ↓
Permitted torque = 80 Nm
         ↓
fast spark retard can reduce torque first
         ↓
throttle / boost then reduce sustainable charge
```

## Case C — thermal protection becomes active

```text
Requested torque unchanged
        ↓
thermal maximum torque ↓
        ↓
permitted torque ↓
        ↓
boost / air charge may be reduced
        ↓
spark and lambda strategy may also change
        ↓
driver receives less torque
```

## Case D — knock retard becomes active

The torque request may remain unchanged, but:

$$
\eta_{spark}\downarrow
$$

Therefore more potential torque would be required to maintain the same actual torque.

If the air system has margin, the ECU may compensate with more charge.

If it does not, actual torque falls.

# 16. Why limits can appear at different places in the structure

A torque limit can originate from very different physical restrictions.

<div class="callout-grid">
<div class="callout"><h3>Air limit</h3>Throttle fully open, turbo at safe speed, compressor near choke, or valve timing cannot provide more charge.</div>
<div class="callout"><h3>Fuel limit</h3>Injector duration, gas pressure, rail flow or fuel-system capacity reaches its boundary.</div>
<div class="callout"><h3>Combustion limit</h3>Knock, peak pressure, unstable combustion or insufficient spark margin.</div>
<div class="callout"><h3>Thermal limit</h3>Exhaust valve, turbine, catalyst, coolant, oil or piston temperature approaches its limit.</div>
<div class="callout"><h3>Vehicle limit</h3>Transmission, traction, driveline or speed constraints request less torque.</div>
</div>

The driver only sees:

> “The car is not giving me more torque.”

The torque structure tells the engineer **where that limitation entered the chain**.

# 17. A complete worked example

Assume:

| Quantity | Value |
|---|---:|
| Engine speed | 2500 rpm |
| Pedal | 60% |
| Raw driver wish | 150 Nm |
| Thermal limit | 120 Nm |
| Loss torque | 18 Nm |
| Planned spark efficiency | 0.92 |
| Planned lambda efficiency | 0.97 |

Then:

### Permitted brake torque

$$
T_{brake,req}=120\ \mathrm{Nm}
$$

### Internal torque requirement

$$
T_{internal,req}=120+18=138\ \mathrm{Nm}
$$

### Required potential torque

$$
T_{potential,req}
=
\frac{138}{0.92\times0.97}
=
154.6\ \mathrm{Nm}
$$

### Required fresh-air charge

Assume the inverse model gives:

$$
m_{air,cyl,req}=420\ \mathrm{mg/event}
$$

### Fuel quantity

If the illustrative CNG stoichiometric ratio is 17.2 and:

$$
\lambda=1
$$

then:

$$
m_{CNG}
=
\frac{420}{17.2}
\approx24.4\ \mathrm{mg/event}
$$

The final spark and actual lambda then determine how much of the potential torque appears as internal torque, after which losses are subtracted.

The entire structure is therefore one continuous physical conversion:

```text
HUMAN INTENT
60% pedal
   ↓
TORQUE LANGUAGE
150 Nm request → 120 Nm permitted
   ↓
COMBUSTION REQUIREMENT
138 Nm internal → 154.6 Nm potential
   ↓
PHYSICAL ACTUATORS
420 mg air + fuel + spark + cams/boost
   ↓
COMBUSTION
actual indicated/internal torque
   ↓
LOSSES
friction + pumping + auxiliaries
   ↓
OUTPUT
≈120 Nm brake torque
```

# 18. Common misunderstandings

## “60% pedal means 60% throttle”

Not in a torque-based ECU.

## “Requested torque and indicated torque are the same”

They are different physical quantities.

## “Boost directly equals torque”

Boost only helps create air charge. Valve timing, temperature, residuals and combustion state determine how much torque results.

## “Spark changes torque only because it changes knock”

Spark directly changes combustion phasing and torque efficiency even without knock.

## “If torque is limited, the pedal map must be wrong”

A downstream limit may be the actual reason.

## “The torque model is one map”

In practice it is a network of requests, limits, forward/inverse models, loss models and combustion corrections.

# 19. The simplest way to remember the torque structure

```text
WHAT THE DRIVER WANTS
        ↓
WHAT THE VEHICLE ALLOWS
        ↓
WHAT THE CYLINDERS MUST MAKE
        ↓
WHAT THE AIR CHARGE MUST BE CAPABLE OF
        ↓
WHAT THE ACTUATORS MUST DO
        ↓
WHAT COMBUSTION ACTUALLY PRODUCES
        ↓
WHAT REACHES THE CRANKSHAFT
```

That is the complete torque structure in one sentence.

<div class="interactive-card">
<h3>Interactive torque-path example</h3>
<p>Change the raw driver request, a torque limit, losses and combustion efficiencies. The result follows the same theory described above.</p>
<label>Driver request [Nm] <input id="ts-driver" type="range" min="50" max="220" value="150" oninput="updateTS()"></label>
<label>Active upper limit [Nm] <input id="ts-limit" type="range" min="50" max="220" value="120" oninput="updateTS()"></label>
<label>Loss torque [Nm] <input id="ts-loss" type="range" min="5" max="35" value="18" oninput="updateTS()"></label>
<label>Spark efficiency <input id="ts-spark" type="range" min="0.70" max="1.00" step="0.01" value="0.92" oninput="updateTS()"></label>
<label>Lambda efficiency <input id="ts-lambda" type="range" min="0.80" max="1.00" step="0.01" value="0.97" oninput="updateTS()"></label>
<div class="kpis">
<div class="kpi"><strong id="ts-perm">–</strong>Permitted brake torque</div>
<div class="kpi"><strong id="ts-int">–</strong>Required internal torque</div>
<div class="kpi"><strong id="ts-pot">–</strong>Required potential torque</div>
</div>
<p id="ts-text"></p>
</div>

# 20. Key lessons

1. The pedal creates a **torque request**, not a direct throttle command.
2. Torque arbitration decides what torque is actually permitted.
3. Brake torque and internal torque differ because the engine has losses.
4. Potential torque represents what the present charge could produce at a defined reference combustion condition.
5. Spark and lambda efficiency translate potential torque into actual internal torque.
6. The inverse torque model translates required torque into required fresh-air charge.
7. Throttle, boost and VVT create the air charge; fuel and spark complete the combustion state.
8. Spark can change torque faster than the air path when torque reserve exists.
9. A limit can enter from the vehicle, air system, fuel system, combustion system or thermal protection.
10. The ECU also runs a forward torque estimate so the rest of the vehicle knows what torque was actually delivered.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The torque-based control architecture and torque-conversion concept are consistent with the torque-demand and torque-conversion structure described in the supplied engine-control reference.</li>
</ol>

<p><a href="../">← Back to the Powertrain Performance Series</a></p>

<script>
function setMode(mode){
  document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
  const label=document.getElementById('mode-label');
  if(label) label.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>

<script>
function updateTS(){
 const d=+document.getElementById('ts-driver').value;
 const l=+document.getElementById('ts-limit').value;
 const loss=+document.getElementById('ts-loss').value;
 const es=+document.getElementById('ts-spark').value;
 const el=+document.getElementById('ts-lambda').value;
 const p=Math.min(d,l), ti=p+loss, tp=ti/(es*el);
 document.getElementById('ts-perm').textContent=p.toFixed(0)+' Nm';
 document.getElementById('ts-int').textContent=ti.toFixed(1)+' Nm';
 document.getElementById('ts-pot').textContent=tp.toFixed(1)+' Nm';
 document.getElementById('ts-text').innerHTML=`Driver asks for <strong>${d.toFixed(0)} Nm</strong>. The active limit allows <strong>${p.toFixed(0)} Nm</strong>. After adding losses and compensating the planned combustion efficiencies, the air path must prepare approximately <strong>${tp.toFixed(1)} Nm</strong> of potential torque.`;
}
document.addEventListener('DOMContentLoaded',updateTS);
</script>
