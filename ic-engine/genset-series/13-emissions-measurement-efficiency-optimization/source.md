
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Engine-Out Emissions Measurement and Electrical-Efficiency Optimization</h1>
<p><em>NOx, CH4, formaldehyde, mass/g-kWh reporting, EU installation-scale framing, methane slip and compliance-monitoring logic</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Emissions optimization in a lean-burn CNG genset

The main engine-out trade-offs typically include:

- NOx;
- CO;
- methane/THC;
- efficiency.

The exact aftertreatment architecture depends on the application, so this article keeps engine-out calibration separate from optional oxidation catalyst or SCR strategy.

# 2. Why NOx and methane move in opposite directions near the lean limit

Leaner combustion lowers temperature:

$$
NO_x\downarrow
$$

But near unstable combustion:

$$
CH_4/THC\uparrow
$$

So “leaner is cleaner” is not universally correct.

# 3. Calibration procedure

At each load:

1. stabilize at the nominal rated-frequency operating point and thermal state;
2. perform lambda sweep;
3. re-optimize spark/CA50;
4. record fuel flow and electrical efficiency;
5. record NOx, CO, CH4/THC;
6. record COVIMEP/misfire;
7. select balanced point.

# 4. Mass-specific emissions

For gensets, emissions can be expressed relative to generated energy:

$$
g/kWh
$$

This is often more meaningful than concentration alone because exhaust flow changes with load.

# 5. Trade-off — electrical efficiency versus emissions

A point with best electrical efficiency may not satisfy NOx or methane target.

A point with very low NOx may have poor methane emissions.

The engineer needs a weighted compromise.

# 6. Low-load challenge

Low load can create:

- lower combustion temperature;
- weaker turbo energy;
- lower aftertreatment temperature;
- more incomplete combustion.

So methane/CO can become difficult even though NOx is low.

# 7. High-load challenge

High load can create:

- higher NOx;
- higher knock/pressure;
- higher turbine temperature.

So high-load calibration may need more air, different spark or power derating.

# 8. Aftertreatment interaction

If an oxidation catalyst is used, methane conversion depends strongly on catalyst temperature and formulation.

If SCR is used for NOx, engine-out NOx strategy must consider aftertreatment conversion and reagent control.

Do not optimize engine-out and tailpipe independently.

# 9. Final balance

The final load-wise calibration should satisfy:

```text
electrical efficiency target
+
NOx target
+
CH4/THC target
+
CO target
+
combustion stability
+
thermal durability
```

with margin for aging and fuel variation.

# 10. Emissions measurement: concentration is not enough

A calibration engineer should distinguish:

- ppm concentration;
- normalized concentration;
- pollutant mass flow;
- energy-specific emissions such as g/kWh.

A conceptual mass-specific result is:

$$
e_{pollutant}
=
\frac{\dot m_{pollutant}}
{P_{electrical}}
$$

with units such as g/kWh when integrated and converted consistently.

# 11. Wet/dry and oxygen-reference basis

Combustion exhaust contains water and excess oxygen.

Depending on the reporting requirement, concentrations may need:

- wet/dry conversion;
- normalization to a specified reference oxygen concentration;
- standard/reference gas-volume conditions.

The exact method must follow the applicable regulation or project standard.

A value reported simply as:

> “500 ppm NOx”

is incomplete unless the measurement basis is known.

# 12. Analyzer and sample-system dynamics

Record:

- sample location;
- heated-line condition;
- analyzer transport delay;
- analyzer response time;
- exhaust-flow signal delay.

Engine torque and combustion can change much faster than a long emissions sample line responds.

Time-align the channels before explaining a transient emissions spike.

# 13. Methane, THC and NMHC

For CNG:

- THC measures total hydrocarbons;
- CH4 is often the dominant hydrocarbon;
- NMHC represents the non-methane portion.

A THC signal alone does not explain whether the emissions problem is mainly methane slip or another hydrocarbon component.

# 14. Formaldehyde and other species

Depending on application and regulation, additional species such as formaldehyde may matter.

The series does not assume one universal regulatory package.

The calibration engineer should always start from the actual project emissions requirements.

# 15. Engine-out versus aftertreatment-out

Always state measurement location.

For example:

```text
Engine-out NOx
      ↓
SCR where fitted
      ↓
Tailpipe NOx
```

or:

```text
Engine-out CH4/CO
      ↓
Oxidation catalyst where fitted
      ↓
Tailpipe CH4/CO
```

A change that worsens engine-out emissions can still improve tailpipe emissions if it strongly improves aftertreatment temperature or conversion—but that trade-off must be quantified.

# 16. Calibration procedure with repeatability

For each steady load point:

1. precondition thermal state;
2. hold gas composition;
3. record repeat reference point;
4. sweep lambda/spark as planned;
5. wait for analyzer settling;
6. repeat the reference point;
7. reject data if drift exceeds project tolerance.

This helps distinguish real calibration effects from slow analyzer or thermal drift.

# 17. Emissions optimization as a multi-objective problem

The final point should consider:

```text
electrical efficiency
NOx
CH4 / THC / NMHC
CO
combustion stability
aftertreatment temperature
gas consumption
```

The best point is rarely the minimum of one pollutant.

# 18. Regulatory target is a project input

There is no universal 2026 stationary-gas-engine emissions number that can be inserted into every calibration.

The target depends on:

- country/jurisdiction;
- plant thermal input/output;
- fuel;
- commissioning date;
- operating hours;
- emergency/non-emergency status;
- permit conditions;
- aftertreatment configuration.

For example, European medium combustion plants are covered by Directive (EU) 2015/2193 with applicability and timing depending on plant category, while U.S. stationary spark-ignition engines can fall under 40 CFR Part 60 Subpart JJJJ.

The calibration process should therefore begin with:

```text
Applicable regulation / permit
        ↓
required measurement basis
        ↓
emissions target
        ↓
engine + aftertreatment calibration
```

not with a copied ppm or mg/Nm³ target.

# 19. Measurement uncertainty

A reported improvement is meaningful only if it is larger than the combined uncertainty and repeatability of:

- analyzer;
- exhaust-flow estimate;
- electrical-power measurement;
- gas flow;
- reference-oxygen correction.

This topic is developed in the dedicated Test-Cell Instrumentation article.

# 20. Regulatory framework by installation scale

For EU-oriented training, distinguish at least:

```text
1 MW to <50 MW thermal input
      ↓
Medium Combustion Plant framework can apply

Large combustion installation / Chapter III IED scope
      ↓
Large Combustion Plant BAT conclusions can apply
```

Aggregation rules, operating hours, commissioning date, plant type and national permit conditions matter.

Do not classify a site from one engine's electrical MW rating alone.

# 21. Formaldehyde

Formaldehyde is an important gas-engine species and can be specifically regulated or included in BAT requirements depending on plant size and jurisdiction.

Therefore an emissions plan may need:

- NOx;
- CO;
- CH4;
- NMHC/THC;
- formaldehyde;
- NH3 slip where SCR is fitted.

# 22. Methane as greenhouse-gas slip

Methane is not only a local hydrocarbon-emissions issue.

A very lean point that improves electrical efficiency but materially increases methane slip can worsen the broader greenhouse-gas result.

The project should therefore distinguish:

- regulated stack emissions;
- climate/CO2-equivalent reporting where required.

# 23. CEMS / compliance monitoring

Continuous or periodic monitoring requirements are permit-specific.

Where CEMS is used, the team must control:

- analyzer QA/QC;
- zero/span checks;
- calibration gases;
- data availability;
- basis conversions;
- maintenance state.

# 24. Explicit conversion to g/kWh

If pollutant mass flow is measured in grams per hour:

$$
\boxed{
e_{pollutant}[g/kWh]
=
\frac{\dot m_{pollutant}[g/h]}
{P_{el}[kW]}
}
$$

If pollutant mass flow is measured in grams per second:

$$
\boxed{
e_{pollutant}[g/kWh]
=
\frac{3600\,\dot m_{pollutant}[g/s]}
{P_{el}[kW]}
}
$$

Always state whether $P_{el}$ is gross generator power or net exported power. The denominator boundary must match the reporting requirement.

# 25. 2026 Industrial Emissions Directive update

For EU-oriented 2026 training, reference Directive 2010/75/EU **as amended**, including Directive (EU) 2024/1785.

The 2024 amendment entered into force in 2024 and includes a Member-State transposition deadline of 1 July 2026. For a 2026 engineering project, the environmental-permit team should therefore verify the applicable national implementation and current permit basis rather than assuming that an older IED summary is sufficient.

# 26. Common mistakes

- Applying one regulatory limit to every site.
- Using electrical MW instead of rated thermal input when determining environmental scope.
- Treating methane as only “another HC.”
- Omitting formaldehyde from the test plan where it is a project requirement.
- Comparing ppm values on different O2/wet-dry bases.

# 27. Key lessons

1. Regulatory target-setting starts with plant scope, not a copied emissions number.
2. Gas-engine emissions include methane and potentially formaldehyde in addition to NOx/CO.
3. g/kWh or mass-based results need correct exhaust and electrical boundaries.
4. Measurement basis and compliance-monitoring QA matter as much as the nominal analyzer reading.
5. Climate-related methane slip can influence system optimization beyond local pollutant limits.

# References

<ol class="refs">
<li>Directive (EU) 2024/1785 — amending Directive 2010/75/EU on industrial emissions; current EU legal update with 1 July 2026 transposition deadline.</li>
<li>Commission Implementing Decision (EU) 2021/2326 — Large Combustion Plant BAT conclusions, including natural-gas lean-burn engine NOx, CH4 and formaldehyde provisions where applicable.</li>
<li>Directive (EU) 2015/2193 — Medium Combustion Plant Directive for plants from 1 MW to <50 MW thermal input, subject to scope/exemptions and national implementation.</li>
<li>ISO 8528-6:2023 — Test methods for complete generating sets.</li>
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
