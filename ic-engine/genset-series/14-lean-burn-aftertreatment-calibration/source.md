
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Lean-Burn Gas Engine Aftertreatment Calibration</h1>
<p><em>Methane/CO/formaldehyde oxidation, dedicated methane-catalyst limits, SCR dosing, NH3 slip, temperature windows and aging</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why lean-burn aftertreatment differs from a stoichiometric three-way catalyst

A lean-burn gas engine normally has excess oxygen in the exhaust.

That means a conventional three-way catalyst cannot simultaneously perform the same NOx-reduction function it provides around stoichiometric operation.

The two common aftertreatment objectives are therefore separated:

```text
CH4 / CO / HC oxidation
        ↓
Oxidation catalyst

NOx reduction in oxygen-rich exhaust
        ↓
SCR or another approved NOx system
```

Actual architecture depends on project requirements.

# 2. Oxidation catalyst for CO and hydrocarbons

A conventional oxidation catalyst can efficiently oxidize CO and many hydrocarbons when temperature and formulation are suitable. Methane is much more difficult: generic oxidation-catalyst activity should **not** be assumed to provide strong CH4 conversion. Dedicated methane-oxidation formulations and sufficiently high temperature may be required.

For CO and suitable hydrocarbons, oxidation reactions include:

For carbon monoxide:

$$
\boxed{
2CO+O_2
\rightarrow
2CO_2
}
$$

For a generic hydrocarbon $C_xH_y$ under complete oxidation:

$$
\boxed{
C_xH_y+
\left(
x+\frac{y}{4}
\right)O_2
\rightarrow
xCO_2+\frac{y}{2}H_2O
}
$$

For natural-gas engines, methane is especially important because CH4 is unusually stable. EU large-combustion BAT material explicitly notes that oxidation catalysts are not effective for saturated hydrocarbons with fewer than four carbon atoms; therefore CH4 control must not be presented as a guaranteed result of a generic oxidation catalyst.

# 3. Methane light-off and catalyst temperature

Methane conversion is strongly temperature-dependent.

Conceptually:

```text
Catalyst cold
   ↓
CH4 conversion low

Catalyst warms
   ↓
conversion rises rapidly

Catalyst hot enough
   ↓
high conversion possible
```

The exact light-off curve depends on catalyst formulation, aging, sulfur/contaminants and gas composition.

# 4. Space velocity

Catalyst residence time can be represented using gas hourly space velocity:

$$
GHSV
=
\frac{\dot V_{exhaust}}
{V_{catalyst}}
$$

At higher exhaust flow:

```text
GHSV ↑
   ↓
residence time ↓
```

which can reduce conversion if chemistry is not fast enough.

# 5. SCR for NOx

Selective catalytic reduction uses a reductant-derived ammonia source to reduce NOx in oxygen-rich exhaust.

Two useful balanced reactions are:

Standard SCR:

$$
\boxed{
4NH_3+4NO+O_2
\rightarrow
4N_2+6H_2O
}
$$

Fast SCR:

$$
\boxed{
2NH_3+NO+NO_2
\rightarrow
2N_2+3H_2O
}
$$

The real system additionally involves catalyst storage, NO/NO2 ratio, side reactions, temperature and mass-transfer effects.

# 6. Urea/DEF dosing chain

Where aqueous urea is used:

```text
DEF injection
   ↓
evaporation / thermolysis / hydrolysis
   ↓
NH3 generated
   ↓
NH3 stored/reacts on SCR catalyst
   ↓
NOx reduced
```

Poor mixing or insufficient temperature can create deposits and poor conversion.

# 7. SCR temperature window

Too cold:

- slow urea decomposition;
- deposit risk;
- low NOx conversion.

Useful temperature:

- good dosing and conversion.

Too hot:

- NH3 storage changes;
- catalyst durability and side-reaction concerns can increase.

The approved window is catalyst-specific.

# 8. Ammonia slip

Too much reductant can produce unreacted ammonia downstream:

$$
NH_3\ slip
$$

So dosing is a trade-off:

```text
More NH3
 → NOx conversion ↑

BUT

too much
 → ammonia slip ↑
```

# 9. Closed-loop aftertreatment control

A generic SCR control architecture can use:

- upstream NOx;
- downstream NOx;
- exhaust mass flow;
- catalyst temperature;
- NH3 storage model;
- dosing command.

Conceptually:

```text
Engine-out NOx
      ↓
Feedforward NH3 demand
      ↓
Temperature/storage correction
      ↓
DEF dosing
      ↓
Downstream NOx feedback
```

# 10. Calibration procedure — oxidation catalyst

At representative loads:

1. stabilize engine-out lambda and emissions;
2. record catalyst inlet/outlet temperature;
3. measure engine-out and tailpipe CH4/CO/THC;
4. calculate conversion efficiency;
5. repeat across catalyst temperature and flow;
6. repeat after aging/poisoning exposure where required.

# 11. Calibration procedure — SCR

Across load/temperature:

1. map engine-out NOx;
2. characterize exhaust flow;
3. establish catalyst temperature state;
4. start with conservative reductant dosing;
5. increase dosing while monitoring downstream NOx and NH3 slip;
6. build feedforward dosage;
7. add storage/feedback correction.

# 12. Engine calibration and aftertreatment must be optimized together

A lower engine-out NOx point may have:

- higher CH4;
- lower exhaust temperature;
- worse catalyst activity.

A slightly higher engine-out NOx point can sometimes produce a better total system result if it:

- improves combustion efficiency;
- raises catalyst temperature;
- gives the SCR a favorable operating state.

The correct objective is:

> **minimum compliant tailpipe emissions at the best practical system efficiency and durability**, not minimum engine-out NOx alone.

# 13. Catalyst aging and poisoning

Catalyst activity changes with:

- thermal aging;
- sulfur;
- phosphorus/oil-derived contamination;
- fuel contaminants;
- repeated high-temperature exposure.

Calibration should include aged-system margin where required.

# 14. Cold start and low load

Low exhaust temperature is often difficult because:

- oxidation catalyst CH4 conversion is weak;
- SCR activity/dosing may be limited;
- engine combustion itself may have higher CH4/CO.

Therefore low-load emissions control can require a combined strategy:

```text
stable combustion
+
sufficient exhaust temperature
+
aftertreatment activity
```

# 15. Measurement locations

Always distinguish:

```text
Engine-out
Catalyst inlet
Between catalyst elements
Tailpipe / stack
```

A conversion calculation is meaningless if inlet and outlet signals are not time-aligned.

# 16. Dedicated methane-oxidation catalyst considerations

Where methane oxidation is a design objective, characterize:

- catalyst formulation;
- light-off temperature;
- sulfur sensitivity;
- water inhibition;
- thermal aging;
- space velocity;
- pressure drop.

Do not transfer a CO light-off curve directly to methane.

# 17. Formaldehyde interaction

Oxidation catalysts can also be relevant to aldehyde control.

Therefore catalyst optimization can involve:

```text
CO
NMHC
formaldehyde
CH4
pressure drop
temperature
aging
```

with different conversion behavior for each species.

# 18. SCR dosing worked logic

A feedforward dosing request can be based conceptually on:

$$
\dot m_{NH3,req}
=
f(\dot m_{NOx},\dot m_{exh},T_{cat},NH3_{store})
$$

The release calibration then constrains the command by:

- minimum dosing temperature;
- deposit risk;
- maximum NH3 slip;
- reductant-system capacity.

# 19. Aftertreatment temperature-window illustration
<figure class="figure-card">
<svg viewBox="0 0 820 430" role="img" aria-label="Aftertreatment temperature windows">
<rect width="820" height="430" fill="white"/>
<line x1="90" y1="350" x2="750" y2="350" stroke="#52697a" stroke-width="2"/>
<line x1="90" y1="350" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="555" y="397" font-size="17" fill="#17324a">Catalyst temperature →</text>
<path d="M120 330 C260 320,330 235,390 135 C450 85,600 90,720 120" fill="none" stroke="#17324a" stroke-width="3"/>
<text x="505" y="105" font-size="14" fill="#17324a">SCR NOx conversion</text>
<path d="M120 345 C360 340,500 320,600 235 C650 190,690 145,720 115" fill="none" stroke="#5d87ad" stroke-width="3"/>
<text x="575" y="270" font-size="14" fill="#5d87ad">methane oxidation can require high T</text>
<text x="120" y="75" font-size="13" fill="#61717f">cold / deposit / low-conversion region</text>
</svg>
<figcaption>Qualitative only. SCR and methane-oxidation catalysts have different temperature sensitivities; approved catalyst maps must come from the actual aftertreatment system.</figcaption>
</figure>

# 20. Common mistakes

- Calling any oxidation catalyst a methane catalyst.
- Optimizing engine-out NOx without checking SCR temperature.
- Ignoring NH3 slip.
- Comparing catalyst conversion without time-aligning inlet/outlet signals.
- Validating only fresh catalyst.

# 21. Key lessons

1. Lean-burn NOx and methane control require aftertreatment strategies different from stoichiometric TWC operation.
2. Methane oxidation is technically difficult and catalyst-specific.
3. SCR calibration balances NOx conversion, NH3 storage, dosing temperature and ammonia slip.
4. Formaldehyde can be a relevant gas-engine species.
5. Engine and aftertreatment should be optimized as one emissions/efficiency system.
# References

<ol class="refs">
<li>Commission Implementing Decision (EU) 2021/2326 — Large Combustion Plant BAT conclusions, including natural-gas lean-burn engine NOx, CH4 and formaldehyde provisions where applicable.</li>
<li>Directive (EU) 2015/2193 — Medium Combustion Plant Directive for plants from 1 MW to <50 MW thermal input, subject to scope/exemptions and national implementation.</li>
<li>W. W. Pulkrabek, Engineering Fundamentals of the Internal Combustion Engine.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
