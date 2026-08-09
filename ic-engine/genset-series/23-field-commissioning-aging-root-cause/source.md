
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Field Commissioning, Aging and Root-Cause Diagnosis</h1>
<p><em>How to separate installation, hardware and calibration problems after the development cell—and how to revalidate after component or site changes</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Why factory calibration is not the end of the engineering problem

A calibration can be correct in a development cell and still fail to deliver the expected result at site because the installed system has different:

- gas quality;
- cooling water;
- ventilation;
- exhaust backpressure;
- generator/grid condition;
- sensor installation;
- aging state.

Field commissioning verifies the **complete installation**.

# 2. Factory calibration versus site commissioning

Factory calibration defines the approved engine/system behavior.

Site commissioning verifies that the installation provides the expected boundary conditions.

The normal approach should be:

> do not create a new site-specific base calibration simply to hide an installation problem.

# 3. Commissioning baseline

Record:

- hardware/software/calibration version;
- generator configuration;
- gas analysis;
- ambient conditions;
- cooling inlet temperatures/flows;
- exhaust backpressure;
- electrical P/Q/PF;
- emissions basis;
- protection status.

# 4. First power ramp

Increase load in controlled steps.

At each load verify:

- gas pressure;
- lambda;
- turbo speeds/pressures;
- knock/Pmax;
- electrical efficiency;
- generator temperatures/current;
- emissions;
- cooling temperatures.

# 5. When site performance is lower than factory expectation

Use a structured decomposition:

```text
Electrical power low
   ↓
Is engine shaft capability low?
   ↓
Is generator loss/capability limiting?
   ↓
Is gas energy/flow limiting?
   ↓
Is air/turbo/cooling limiting?
   ↓
Is knock/thermal derate active?
```

# 6. Case study 1 — rated power not achieved

Observed:

```text
gas command near maximum
lambda correct
boost lower than reference
compressor inlet temperature high
```

Likely investigation:

- site ventilation;
- charge-cooling water;
- compressor inlet restriction;
- ambient correction;
- turbo margin.

Do not immediately add fuel.

# 7. Case study 2 — one cylinder high CH4 / instability

Observed:

```text
average lambda normal
one cylinder COVIMEP high
that cylinder EGT low
```

Investigate:

- main gas distribution;
- prechamber gas path;
- ignition system;
- compression/valves;
- local air/residual distribution.

Do not immediately enrich the complete engine.

# 8. Case study 3 — current limit before engine rated power

Observed:

```text
engine torque margin available
generator stator current at limit
reactive power high
```

This is primarily an electrical capability problem, not a combustion calibration problem.

# 9. Aging and service changes

Performance can drift due to:

- turbo fouling;
- charge-cooler fouling;
- prechamber deposits;
- spark/ignition aging;
- catalyst aging;
- sensor drift;
- valve/compression wear.

The response should separate:

```text
maintenance need
from
calibration adaptation
```

# 10. Component replacement

After replacing a critical component, define which checks are required.

Examples:

### Turbocharger replacement
- boost/pressure ratio;
- turbo speed;
- wastegate/bypass control;
- exhaust backpressure.

### Prechamber component replacement
- cylinder balance;
- CA50;
- stability;
- knock.

### Generator work
- electrical loss/capability validation where applicable;
- synchronization and protection checks.

# 11. Field recalibration

Field adaptation can be appropriate when the approved architecture explicitly includes:

- fuel-quality adaptation;
- cylinder trims;
- sensor offsets;
- site derating.

It should not become uncontrolled local editing of base maps.

# 12. Root-cause discipline

Use the sequence:

```text
Define symptom
   ↓
Check measurement validity
   ↓
Identify active limiter/controller
   ↓
Separate installation vs hardware vs calibration
   ↓
Run targeted test
   ↓
Correct root cause
   ↓
Re-validate affected release evidence
```

# 13. Site commissioning of a high-pressure CNG supply

Where the plant is supplied from CNG storage/trailers rather than a pipeline header, add to the site baseline:

- initial and minimum expected storage pressure;
- pressure-reduction-stage inlet/outlet pressures;
- gas temperature after pressure reduction;
- regulator/heater state;
- storage switching/cascade logic;
- maximum fuel-flow margin at rated load.

A plant can have an engine calibration that is correct while the **upstream CNG pressure-reduction system** is unable to maintain the required engine-inlet condition at low storage pressure.

# 14. Common mistakes

- Recalibrating around a blocked cooler.
- Changing base spark to hide poor gas quality.
- Enriching the whole engine for one weak cylinder.
- Ignoring generator P-Q limits.
- Accepting site data without traceable configuration.

# 15. Key lessons

1. Commissioning validates the installation; it is not permission to bypass the released calibration concept.
2. Root-cause diagnosis begins with measurement validity and active system limits.
3. Maintenance faults and calibration faults must be separated.
4. Component changes require defined revalidation.
5. Lead engineers protect configuration and evidence across factory, site and service life.

# References

<ol class="refs">
<li>ISO 8528-5:2025 — Generating sets; design and performance criteria.</li>
<li>ISO 8528-6:2023 — Test methods for complete generating sets.</li>
<li>ISO 8528-13:2026 — Safety requirements for generating sets; does not cover special requirements for potentially explosive atmospheres.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
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
