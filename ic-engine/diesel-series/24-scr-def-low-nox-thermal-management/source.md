
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>SCR, DEF Dosing and Low-NOx Thermal Management</h1>
<p><em>Ammonia storage, dosing, deposits, cold/low-load operation, twin-SCR concepts and electrically assisted heating</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. SCR calibration starts from NOx mass flow

A useful feedforward structure is:

$$
\dot m_{NH3,ff}
=
f(\dot m_{NOx},T_{SCR},\dot m_{exh})
$$

The actual controller also needs catalyst storage and transient state.

# 2. Ammonia-to-NOx ratio

A normalized dosing quantity is often expressed through an ammonia-to-NOx ratio.

The exact definition and species basis must be documented.

Too little reductant:

```text
NOx conversion insufficient
```

Too much:

```text
NH3 storage saturates
→ NH3 slip
```

# 3. Catalyst storage

SCR catalyst can temporarily store ammonia.

A conceptual state model is:

$$
\frac{dm_{NH3,stored}}{dt}
=
\dot m_{NH3,in}
-
\dot m_{NH3,react}
-
\dot m_{NH3,slip}
$$

# 4. Temperature dependence

At low temperature:

- urea decomposition can be poor;
- deposits can form;
- catalyst kinetics are slow.

At high temperature:

- storage changes;
- aging and side reactions can become important.

# 5. DEF deposit risk

Dosing quality depends on:

- injector spray;
- mixer geometry;
- exhaust flow;
- wall temperature;
- residence time.

A dosing map that meets NOx during a short test can still create deposits in long low-load operation.

# 6. Downstream feedback

Where sensors are available, downstream NOx and NH3 information can correct feedforward error.

Feedback bandwidth must respect sensor and catalyst delays.

# 7. Current low-NOx heavy-duty challenge

Future and emerging heavy-duty requirements increasingly emphasize:

- cold start;
- low load;
- long useful life;
- real-world operation.

Current production-oriented systems therefore demonstrate stronger thermal-management integration than older “hot SCR only” strategies.

# 8. Electrically assisted heating

Current heavy-duty commercial development includes 48-V electrically powered aftertreatment heaters.

The energy does not come for free.

The system optimization should compare:

```text
electrical heater energy
versus
extra fuel from engine-based thermal management
versus
tailpipe NOx benefit
```

# 9. Twin or multi-SCR architectures

Current commercial products also demonstrate multiple SCR catalyst regions or modules to extend conversion across wider temperature conditions.

Architecture is product-specific.

# 10. Calibration procedure

1. map upstream NOx mass flow;
2. map catalyst temperature and exhaust flow;
3. establish feedforward dosing;
4. identify safe low-temperature dosing boundary;
5. fit storage correction;
6. add downstream feedback;
7. measure NH3 slip and N2O where required;
8. validate aging and transient operation.

# 11. Worked dosing concept

Suppose the upstream NOx mass flow is known.

A feedforward can be written conceptually as:

$$
\dot m_{DEF}
=
K
\cdot
ANR
\cdot
\dot m_{NOx}
$$

where $K$ converts NOx basis and DEF concentration into the required liquid reductant flow.

The calibration should document whether NOx is expressed as:

- NO;
- NO2;
- NO2-equivalent mass.

# 12. Closed-loop correction

A downstream NOx sensor can correct slow feedforward error.

But catalyst storage means:

```text
dosing change now
≠
tailpipe response immediately
```

Use a slow correction consistent with storage and sensor delay.

# 13. Deposit mapping

At low temperature and flow, map:

- DEF quantity;
- wall/mixer temperature;
- deposit observation;
- downstream NH3/NOx.

This creates a deposit-free dosing boundary.

# 14. Heater energy accounting

For an electrical heater:

$$
E_{heater}
=
\int P_{heater}\,dt
$$

Compare that energy with:

- saved fuel from reduced engine thermal management;
- tailpipe NOx benefit;
- alternator/electrical-system losses.

A heater can improve emissions while still having a measurable fuel-energy cost.

# 15. Calibration objects and channels

Typical calibration objects include:

```text
upstream NOx feedforward conversion
ANR / DEF target
minimum dosing temperature
NH3 storage target
downstream NOx feedback gain
NH3-slip correction
electric-heater target if fitted
```

Typical signals include:

```text
upstream/downstream NOx
exhaust mass flow
SCR inlet/brick/outlet temperatures
DEF command and measured flow
NH3 storage estimate
NH3 slip where measurable
heater power
```

# 16. Closed-loop bandwidth

Feedback should be deliberately slower than fast engine combustion control because:

- exhaust transport delays the disturbance;
- catalyst storage delays the chemical response;
- NOx sensors have their own dynamics.

Fast feedback can chase delayed information and destabilize dosing.

# 17. Aged-system validation

Repeat critical low-temperature and high-NOx points with aged catalyst or an approved deterioration representation.

Do not tune the production engine-out NOx target using only fresh-catalyst conversion.

# 18. Senior calibration deep dive — ammonia storage state

A useful normalized storage state can be thought of as:

$$
\theta_{NH3}
=
\frac{m_{NH3,stored}}{m_{NH3,capacity}}
$$

The actual model can be more complex and temperature dependent.

The control objective is not maximum storage.

Too little storage reduces transient NOx conversion.

Too much storage increases NH3-slip risk during temperature/load changes.

## Transient NOx event

During a rapid load increase:

```text
engine-out NOx ↑ quickly
exhaust flow ↑
catalyst temperature changes more slowly
```

The feedforward must react before the downstream sensor reports the final tailpipe consequence.

## DEF-system plausibility

Cross-check:

- commanded DEF;
- measured/estimated dosing;
- tank quality;
- upstream/downstream NOx.

A high dosing command with no downstream response can indicate hardware, deposit or sensor problems rather than a need for still more DEF.

# 19. Common mistakes

- Dosing DEF from NOx concentration without exhaust-flow context.
- Ignoring NH3 storage.
- Dosing below the validated deposit-free temperature window.
- Treating electrical heating as zero-energy thermal management.
- Calibrating fresh catalyst only.

# 20. Key lessons

1. SCR dosing is a dynamic NOx-mass-flow and ammonia-storage problem.
2. Temperature controls both chemistry and deposit risk.
3. Downstream feedback is delayed and should not replace a good feedforward model.
4. Electrically assisted heating is an advanced heavy-duty technology with an energy trade-off.
5. Future low-NOx performance is a cold, low-load and lifetime problem—not only a hot steady-state problem.

# References

<ol class="refs">
<li><a href="https://www.cummins.com/en-eu/components/aftertreatment/twin-module-aftertreatment-system/product-overview">Cummins EPA27 Twin Module Aftertreatment official page</a> — current commercial example of electrically assisted aftertreatment thermal management.</li>
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
<li><a href="https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-and-related-materials-control-air-pollution">U.S. EPA MY2027 heavy-duty engine and vehicle criteria-pollutant rule</a> — more stringent heavy-duty standards beginning MY2027.</li>
<li><a href="https://eur-lex.europa.eu/eli/reg/2024/1257/oj/eng">Regulation (EU) 2024/1257 (Euro 7)</a> — current legal source; exact dated limits and application milestones are maintained in the series Regulatory Appendix.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
