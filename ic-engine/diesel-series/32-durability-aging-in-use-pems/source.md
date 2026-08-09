
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Durability, Aging, In-Use Compliance and PEMS</h1>
<p><em>How calibration and diagnostics survive injector, turbo, DPF, catalyst and sensor deterioration in real operation</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Certification is not the end of the emissions problem

A heavy-duty engine must maintain performance and emissions control over substantial real-world use.

Important aging mechanisms include:

- injector wear and deposits;
- turbo fouling;
- EGR cooler fouling;
- DPF ash accumulation;
- catalyst thermal aging;
- catalyst poisoning;
- NOx sensor drift;
- crankcase/oil consumption deterioration.

# 2. Useful life

Regulatory useful-life definitions are market-specific.

Euro 7 explicitly introduces long heavy-duty main and additional lifetime requirements, including up to hundreds of thousands of kilometres depending on vehicle category.

The calibration therefore needs aging margin from the beginning.

# 3. Deterioration factors

A fresh catalyst result is not enough.

Development can use:

- aged hardware;
- accelerated aging;
- deterioration factors;
- worst-case production samples.

# 4. In-use conformity

The real vehicle experiences:

- payload variation;
- route variation;
- climate;
- altitude;
- maintenance variation.

In-use and real-driving requirements are designed to challenge that reality.

# 5. PEMS

Portable emissions measurement systems can measure vehicle emissions outside the laboratory.

PEMS introduces additional concerns:

- exhaust-flow measurement;
- GPS and altitude;
- analyzer zero/span;
- time alignment;
- vibration;
- ambient conditions.

# 6. OBD/OBM over life

Diagnostics must detect deterioration before emissions become excessive while avoiding false failures on normal aged hardware.

Thresholds should therefore be validated across:

- new;
- aged;
- environmental corners.

# 7. Anti-tampering

Heavy-duty emissions controls can be targeted by unauthorized modifications.

Protection of:

- software;
- torque limits;
- SCR;
- DPF;
- EGR;

is part of real-world emissions durability.

# 8. Maintenance impact

A calibration should distinguish normal service actions from adaptive compensation.

Examples:

```text
DPF ash cleaning
injector replacement
NOx sensor replacement
EGR cooler cleaning
```

After major component replacement, relevant learned values and validation checks may need reset or re-established.

# 9. 2026 regulatory currentness

Euro 7 is in force, but heavy-duty application dates begin later in the decade.

The U.S. MY2027 criteria-pollutant framework is active, while EPA has proposed 2026 amendments to selected compliance provisions.

California also maintains a separate heavy-duty low-NOx framework.

Therefore release programs need a formal regulatory-currentness gate.

# 10. Dated durability requirements

Exact Euro 7 lifetime distances/years and other time-sensitive regulatory values are maintained in the separate [**2026 Regulatory Appendix**](../regulatory-2026/).

The durable engineering lesson remains:

> calibration, aftertreatment and diagnostics must be validated on aged hardware and cannot be optimized only for a fresh engine and fresh catalyst.

# 11. Aging changes the optimum, not only the margin

Examples:

### Injector aging
Can change quantity and spray, shifting both torque accuracy and soot.

### EGR cooler fouling
Can raise EGR temperature and reduce flow, shifting NOx and air-path control.

### DPF ash
Raises backpressure and changes regeneration/storage behavior.

### SCR aging
Reduces conversion/storage, changing the acceptable engine-out NOx strategy.

Therefore aged-system calibration is not simply “fresh map plus safety factor.”

# 12. Aging checkpoints

At defined aging states, repeat a reduced but meaningful matrix:

- point B high torque;
- point C cruise;
- low-load thermal state;
- certification-critical transient;
- regeneration;
- diagnostic monitor.

# 13. PEMS engineering review

Before comparing road emissions, align:

- vehicle mass;
- route/grade;
- ambient temperature/pressure;
- traffic;
- DPF regeneration state.

If these differ materially, explain the difference instead of treating every change as calibration deterioration.

# 14. Field-data feedback

Use fleet data to identify where laboratory duty assumptions were wrong.

Examples:

- more low-load time than expected;
- frequent high-altitude operation;
- unexpected regeneration frequency.

Feed that information back into the next calibration release and validation matrix.

# 15. Common mistakes

- Calibrating only fresh hardware.
- Treating useful life as a certification paperwork issue.
- Ignoring sensor aging in diagnostic thresholds.
- Using PEMS data without synchronization and flow validation.
- Assuming one national rule applies everywhere.

# 16. Key lessons

1. Heavy-duty emissions calibration must survive aging and in-use variability.
2. Catalyst, DPF, injector and sensor deterioration belong in release validation.
3. PEMS connects laboratory calibration to real-world operation.
4. Diagnostics and anti-tamper are part of emissions durability.
5. Regulatory status must be rechecked throughout a multi-year development program.

# References

<ol class="refs">
<li><a href="https://eur-lex.europa.eu/eli/reg/2024/1257/oj/eng">Regulation (EU) 2024/1257 (Euro 7)</a> — current legal source; exact dated limits and application milestones are maintained in the series Regulatory Appendix.</li>
<li><a href="https://unece.org/transport/vehicle-regulations-wp29/standards/addenda-1958-agreement-regulations-41-60">UNECE UN Regulation No. 49</a> — heavy-duty engine pollutant-emissions framework; 07 series is the current established series while further 2026 supplements/revisions are under development.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-and-related-materials-control-air-pollution">U.S. EPA MY2027 heavy-duty engine and vehicle criteria-pollutant rule</a> — more stringent heavy-duty standards beginning MY2027.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/proposed-rule-amendments-and-nonconformance-penalties">U.S. EPA July 2026 proposed amendments for MY2027+ heavy-duty highway engines</a> — current proposal affecting selected compliance/test/useful-life provisions; not final at publication time.</li>
<li><a href="https://ww2.arb.ca.gov/our-work/programs/heavy-duty-low-nox/heavy-duty-omnibus-regulation-fact-sheet">California Heavy-Duty Omnibus / Low-NOx program fact sheet</a> — California-specific heavy-duty NOx, durability and in-use requirements.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
