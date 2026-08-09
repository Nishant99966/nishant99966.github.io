
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Heavy-Duty Emissions Measurement and Certification Cycles</h1>
<p><em>WHTC, WHSC, real-driving emissions, U.S. heavy-duty compliance, PM/PN and 2026 regulatory currentness</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Heavy-duty diesel emissions calibration is a cycle problem

A steady-state map point is useful for physics, but certification and real-world compliance depend on defined transient and steady cycles plus in-use operation.

Important pollutants can include:

- NOx;
- particulate mass;
- particle number;
- CO;
- hydrocarbons or NMOG;
- NH3;
- N2O;
- CO2 or fuel consumption where applicable.

# 2. WHSC and WHTC

For European and UN heavy-duty engine certification, the World Harmonized Steady-State Cycle and World Harmonized Transient Cycle are central references.

Euro 7 explicitly retains WHTC and WHSC engine-bench testing for heavy-duty vehicle categories and also requires real-driving emissions testing.

# 3. Engine bench versus vehicle road testing

Engine-bench testing gives precise control of:

- engine speed;
- torque;
- temperatures;
- emissions flow.

Road testing adds:

- actual vehicle mass;
- grade;
- traffic;
- transmission behavior;
- ambient variation.

A calibration that passes the engine bench but behaves poorly in real duty is not mature.

# 4. U.S. heavy-duty certification context

U.S. heavy-duty highway engines use their own federal certification and compliance framework.

The MY2027 criteria-pollutant program is current, while EPA also published proposed amendments in July 2026 to selected MY2027+ heavy-duty compliance provisions.

For 2026 training, the important lesson is:

> **regulatory procedures are live release inputs and must be re-checked at program milestones.**

# 5. U.S. GHG currentness

A particularly important 2026 change is that EPA finalized rescission of the motor-vehicle GHG endangerment finding and repealed federal highway-vehicle GHG standards.

Therefore an engineer should not copy a pre-2026 statement saying Phase 3 federal GHG standards are still an active obligation.

Fuel economy remains a major product and customer objective, but regulatory status must be verified.

# 6. California

California maintains its own heavy-duty low-NOx and in-use framework.

Do not assume U.S. federal and California certification requirements are identical.

# 7. Emission units

If pollutant mass flow is measured in g/s:

$$
e[g/kWh]
=
\frac{3600\dot m_{pollutant}[g/s]}
{P_b[kW]}
$$

If mass flow is in g/h:

$$
e[g/kWh]
=
\frac{\dot m_{pollutant}[g/h]}
{P_b[kW]}
$$

State the exact power boundary required by the test procedure.

# 8. PM, PN and smoke are different

Smoke or opacity is useful for rapid calibration feedback.

It is not automatically equivalent to:

- gravimetric PM;
- particle number.

A calibration can reduce visible smoke while changing particle-size distribution.

# 9. Analyzer delay

Transient interpretation requires:

```text
combustion event
  ↓
exhaust transport
  ↓
sample line
  ↓
analyzer response
```

Time-align emissions before correlating them with injection or EGR changes.

# 10. Dated regulatory appendix

Exact legal limits, application dates and 2026 regulatory status are maintained in the separate [**2026 Regulatory Appendix**](../regulatory-2026/) linked from the series landing page.

This keeps the engineering chapter focused on measurement and cycle interpretation while making the time-sensitive legal snapshot easier to update.

The release rule is:

> verify the current legal text and implementing acts at every major certification milestone.

# 11. Cycle-weighted calibration thinking

A cycle result is an integral of many operating states.

A short high-NOx event can matter strongly if:

- exhaust mass flow is high;
- catalyst conversion is low.

Conversely, a high concentration at very low exhaust flow can contribute little mass.

Always move from concentration toward:

```text
concentration
×
exhaust mass flow
→ pollutant mass flow
→ cycle-integrated mass
```

# 12. WHTC cold/hot behavior

Transient certification can include strong thermal history effects.

When reviewing a cycle, separate:

- cold-start contribution;
- warm transient contribution;
- high-load contribution;
- low-load catalyst-cooling contribution.

This connects the regulatory result to specific calibration domains.

# 13. Development correlation

Maintain a correlation between fast development instruments and formal laboratory systems.

Examples:

- smoke meter versus gravimetric PM trend;
- fast NOx sensor versus laboratory analyzer;
- ECU exhaust-flow estimate versus laboratory flow.

Use the fast signal for development only after the correlation is understood.

# 14. Common mistakes

- Optimizing only steady-state points when the certification problem is transient.
- Treating smoke as compliance PM.
- Using outdated regulatory statements without checking 2026 status.
- Comparing g/kWh values with different power boundaries.
- Ignoring analyzer and exhaust-transport delay.

# 15. Key lessons

1. Heavy-duty emissions calibration must connect steady-state physics with transient cycles and real driving.
2. WHSC/WHTC remain central European/UN engine-bench references.
3. U.S. and California requirements must be treated separately.
4. 2026 regulatory currentness matters; rules and proposals can change during a program.
5. PM, PN and smoke are different measurement concepts.

# References

<ol class="refs">
<li><a href="https://eur-lex.europa.eu/eli/reg/2024/1257/oj/eng">Regulation (EU) 2024/1257 (Euro 7)</a> — current legal source; exact dated limits and application milestones are maintained in the series Regulatory Appendix.</li>
<li><a href="https://unece.org/transport/vehicle-regulations-wp29/standards/addenda-1958-agreement-regulations-41-60">UNECE UN Regulation No. 49</a> — heavy-duty engine pollutant-emissions framework; 07 series is the current established series while further 2026 supplements/revisions are under development.</li>
<li><a href="https://unece.org/transport/standards/transport/vehicle-regulations-wp29/global-technical-regulations-gtrs">UN GTR No. 4 (WHDC)</a> — worldwide harmonized heavy-duty certification procedure basis, including WHTC/WHSC concepts.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-and-related-materials-control-air-pollution">U.S. EPA MY2027 heavy-duty engine and vehicle criteria-pollutant rule</a> — more stringent heavy-duty standards beginning MY2027.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/proposed-rule-amendments-and-nonconformance-penalties">U.S. EPA July 2026 proposed amendments for MY2027+ heavy-duty highway engines</a> — current proposal affecting selected compliance/test/useful-life provisions; not final at publication time.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-rescission-greenhouse-gas-endangerment">U.S. EPA February 2026 final rule rescinding the motor-vehicle GHG endangerment finding and repealing federal highway-vehicle GHG standards</a> — important 2026 currentness note.</li>
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
