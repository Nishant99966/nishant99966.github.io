
<div class="hero">
<div class="kicker">Powertrain Performance Series</div>
<h1>Engine Losses: From IMEP to Brake Torque</h1>
<p><em>Friction, pumping work, accessories, gross/net indicated work and why loss modeling is essential to performance and torque control</em></p>
</div>

<div class="publication-note"><strong>A note on the examples:</strong> Numerical values and simplified models are included to make the physics easy to follow. They are not production limits, release targets, or substitutes for the approved ECU and hardware documentation of a specific engine project.</div>

<div class="view-controls">
<strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span>
</div>


# 1. Why an engine can produce strong cylinder pressure but modest crankshaft torque

Combustion creates indicated work inside the cylinder.

The crankshaft does not receive all of it.

Some work is consumed by:

- piston/ring friction;
- bearings and valvetrain;
- oil and coolant pumps;
- gas exchange;
- exhaust backpressure;
- accessories.

This article explains the bridge from **cylinder work to brake torque**.

# 2. Start with indicated work

Cylinder pressure integrated over cylinder volume gives indicated work:

$$
W_i=\oint p\,dV
$$

For a four-stroke engine, mean indicated torque is related to cycle work by:

$$
W_i=4\pi T_i
$$

# 3. Mean effective pressure makes engines comparable

Indicated mean effective pressure is:

$$
IMEP=\frac{W_i}{V_d}
$$

and for a four-stroke engine:

$$
IMEP=\frac{4\pi T_i}{V_d}
$$

Brake mean effective pressure is similarly:

$$
BMEP=\frac{4\pi T_b}{V_d}
$$

These quantities let engineers compare engines of different displacement.

# 4. Gross IMEP versus net IMEP

The terminology must be handled carefully.

### Gross indicated work

Usually focuses on the closed high-pressure part of the cycle around compression and expansion.

### Net indicated work

Includes the gas-exchange loop as well.

Therefore pumping work may already be included in net IMEP depending on the measurement definition.

This is why an engineer must never blindly write:

$$
BMEP=IMEP-PMEP-FMEP
$$

without first defining which IMEP is being used and what sign convention applies.

# 5. Pumping work

At low load in a throttled SI engine:

```text
Throttle restriction
      ↓
intake manifold pressure below ambient
      ↓
piston must pull against vacuum
      ↓
negative gas-exchange work
```

This is one reason SI-engine efficiency improves as load rises and the throttle opens.

# 6. Turbocharging changes pumping work

A turbo engine adds turbine backpressure.

The gas-exchange loop depends on both:

$$
p_{intake}
$$

and:

$$
p_{exhaust}
$$

High boost can improve intake pressure while high turbine backpressure increases exhaust-stroke work.

A well-matched turbo system attempts to achieve the required fresh-air charge without excessive exhaust pressure.

# 7. Mechanical friction

Mechanical friction comes from:

- piston rings and skirt;
- crankshaft bearings;
- camshaft and valvetrain;
- seals;
- oil pump drive;
- timing drive.

It changes strongly with:

- engine speed;
- oil temperature/viscosity;
- load and cylinder pressure;
- component design.

At cold start, viscous friction can be much larger than when fully warm.

# 8. Accessory torque

Accessories create real crankshaft load.

Examples:

- alternator;
- A/C compressor;
- coolant pump;
- oil pump;
- vacuum pump.

At high engine torque, a 5 Nm accessory load may seem small.

At idle, 5 Nm can be a major fraction of available torque.

# 9. Friction mean effective pressure

FMEP is often used to normalize mechanical loss:

$$
FMEP
=
\frac{4\pi T_{friction}}{V_d}
$$

A similar mean-effective-pressure representation can be used for pumping work.

# 10. The useful torque relationship

For a simplified torque model:

$$
T_{brake}
=
T_{internal}
-
T_{loss}
$$

with:

$$
T_{loss}
=
T_{friction}
+
T_{pumping}
+
T_{aux}
$$

Suppose:

```text
Internal torque       160 Nm
Friction               12 Nm
Pumping                 8 Nm
Accessories             5 Nm
```

Then:

$$
T_{brake}=160-12-8-5=135\ \mathrm{Nm}
$$

# 11. Why the loss model matters to torque structure

If the driver requests 135 Nm brake torque, the cylinders must produce 160 Nm in the example above.

If the ECU mistakenly estimates only 15 Nm of losses instead of 25 Nm:

$$
T_{internal,req}=150\ \mathrm{Nm}
$$

The engine will under-deliver brake torque.

So a torque model can have perfect air and spark maps yet still be wrong because the loss model is wrong.

# 12. Why low-load torque estimation is difficult

At high load:

```text
200 Nm internal
20 Nm losses
```

A 2 Nm loss error is only about 1% of internal torque.

At idle:

```text
20 Nm internal
15 Nm losses
```

A 2 Nm loss error is 10% of internal torque.

This is why friction and accessory modeling become especially important at low load and idle.

# 13. Temperature effects

Cold oil increases viscous drag.

Cold coolant changes piston/ring clearances and mechanical temperature.

Warm-up therefore changes:

- loss torque;
- idle-air requirement;
- fuel consumption;
- brake-torque estimate.

# 14. Gas exchange, VVT and pumping

VVT can reduce pumping loss by changing effective charge control.

Miller/Atkinson-like timing can reduce the need for deep throttling at part load.

But aggressive overlap or high exhaust backpressure can create additional gas-exchange loss.

So PMEP is coupled to the VVT and turbo articles.

# 15. A useful energy picture

```text
Fuel chemical energy
       ↓
combustion / heat transfer
       ↓
gross indicated work
       ↓
gas-exchange work
       ↓
net indicated work
       ↓
mechanical friction + accessories
       ↓
brake work
```

This is the physical meaning behind the torque structure's loss term.

# 16. Interactive torque-loss example

<div class="interactive-card">
<h3>From internal torque to brake torque</h3>
<label>Internal torque [Nm] <input id="ls-int" type="range" min="20" max="250" value="160" oninput="updateLoss()"></label>
<label>Friction [Nm] <input id="ls-fr" type="range" min="3" max="30" value="12" oninput="updateLoss()"></label>
<label>Pumping [Nm] <input id="ls-pm" type="range" min="-10" max="35" value="8" oninput="updateLoss()"></label>
<label>Accessories [Nm] <input id="ls-aux" type="range" min="0" max="20" value="5" oninput="updateLoss()"></label>
<div class="kpis">
<div class="kpi"><strong id="ls-out">–</strong>Brake torque</div>
<div class="kpi"><strong id="ls-eff">–</strong>Mechanical delivery</div>
</div>
<p id="ls-msg"></p>
</div>

# 17. Can pumping torque ever be positive?

Yes, depending on the pressure relationship and sign convention.

A boosted engine can sometimes develop a positive gas-exchange loop over part of its operating range.

That is another reason a project must document its PMEP sign convention rather than assuming pumping torque is always a positive loss number.


# Calibration procedure and optimization trade-offs

The loss model must be calibrated because the torque structure needs to know how much cylinder torque is consumed before reaching the crankshaft.

The objective is to build a robust relationship such as:

$$
T_{loss}=f(n,load,T_{oil},T_{coolant},p_{intake},p_{exhaust},accessories)
$$

## 1. Mechanical-loss characterization

Depending on the available facility, use:

- motoring tests;
- cylinder-pressure indicated work versus dyno brake work;
- coast-down or dedicated friction methods.

For a fired test with a consistent torque boundary:

$$
T_{loss}=T_{indicated}-T_{brake}
$$

## 2. Build the speed/temperature dependence

Measure loss torque across:

- engine speed;
- oil temperature;
- coolant temperature;
- representative load levels;
- accessory states.

Cold oil usually increases viscous loss considerably, so a warm-only model will be wrong during cold operation.

## 3. Pumping-loss characterization

Use cylinder pressure or intake/exhaust pressure information to quantify gas-exchange work while sweeping:

- throttle;
- VVT;
- boost/backpressure;
- EGR.

This separates PMEP behavior from mechanical friction.

## 4. Trade-off — model detail versus robustness

A very detailed model can fit one test perfectly but become fragile outside the measured grid.

A very simple model may interpolate well but be inaccurate at idle or during warm-up.

The engineer therefore balances:

```text
model complexity
versus
repeatability + interpolation stability
```

## 5. Trade-off — where accuracy matters most

At high load, a 2 Nm loss error may be small relative to total torque.

At idle, the same 2 Nm error can dominate the torque balance.

Therefore more model resolution is often justified at:

- low load;
- cold start;
- accessory transitions.

## 6. Validation

Validate the loss model at:

- warm and cold conditions;
- A/C on/off;
- alternator loading;
- different VVT positions;
- different turbo backpressure;
- off-grid speed/load points.

The final model must remain consistent with the exact gross/net/internal torque boundary used by the rest of the ECU.


# 18. Common mistakes

- Mixing gross IMEP and net IMEP.
- Subtracting pumping loss twice.
- Assuming friction depends only on rpm.
- Ignoring coolant/oil temperature.
- Ignoring alternator or A/C torque at idle.
- Treating turbo backpressure as unrelated to crankshaft efficiency.
- Using one fixed loss torque everywhere.

# 19. Key lessons

1. Indicated torque is created by cylinder pressure; brake torque is what reaches the crankshaft.
2. IMEP and BMEP normalize work by displacement.
3. Gross and net IMEP must be clearly distinguished.
4. Pumping work is part of gas exchange and strongly depends on throttle, VVT and turbo backpressure.
5. Mechanical friction depends heavily on speed and temperature.
6. Accessory loads matter most at low load.
7. Loss-model error directly becomes torque-model error.
8. The torque structure must use the exact loss definition implemented in the ECU.


# References

<ol class="ref-list">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. Used for torque-based engine control, air-path dynamics, compressor/turbine models, mean-value engine modeling, and control structure.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em>. Used for gas exchange, valve timing, Miller-cycle discussion, combustion variability, friction/pumping concepts, turbocharging, and emissions fundamentals.</li>
<li>Earlier articles in this series: CNG air-charge and torque calibration; spark/lambda efficiency maps; ignition-timing sweep and MBT; knock control; lambda window and three-way-catalyst calibration.</li>
<li>The supplied engine-control reference discusses pumping work, friction and the effect of intake/exhaust pressure on gas-exchange losses; the supplied engine-fundamentals reference defines IMEP/BMEP and mechanical efficiency concepts.</li>
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
function updateLoss(){
 const ti=+document.getElementById('ls-int').value, fr=+document.getElementById('ls-fr').value, pm=+document.getElementById('ls-pm').value, aux=+document.getElementById('ls-aux').value;
 const tb=ti-fr-pm-aux, eff=100*tb/ti;
 document.getElementById('ls-out').textContent=tb.toFixed(1)+' Nm';
 document.getElementById('ls-eff').textContent=eff.toFixed(1)+'%';
 document.getElementById('ls-msg').innerHTML=`The loss term is <strong>${(fr+pm+aux).toFixed(1)} Nm</strong>. Notice how a positive pumping contribution (negative value on this slider) can increase brake torque under the chosen sign convention.`;
}
document.addEventListener('DOMContentLoaded',updateLoss);
</script>
