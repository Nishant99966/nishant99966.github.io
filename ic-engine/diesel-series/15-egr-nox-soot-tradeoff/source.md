
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>EGR Calibration and the NOx–Soot Trade-Off</h1>
<p><em>How EGR, VGT, boost, combustion phasing and aftertreatment shift the feasible emissions-efficiency region</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. The classic diesel trade-off is real—but movable

Reducing oxygen concentration and combustion temperature can reduce NOx.

But excessive dilution can increase soot.

<figure class="figure-card"><svg viewBox="0 0 820 440" role="img" aria-label="NOx soot tradeoff">
<rect width="820" height="440" fill="white"/><line x1="90" y1="360" x2="750" y2="360" stroke="#52697a" stroke-width="2"/><line x1="90" y1="360" x2="90" y2="60" stroke="#52697a" stroke-width="2"/>
<text x="540" y="405" font-size="17">More dilution / later burn / less O₂ →</text>
<path d="M120 120 C300 155,500 230,710 320" fill="none" stroke="#17324a" stroke-width="3"/><text x="135" y="105" font-size="14">NOx</text>
<path d="M120 325 C410 320,560 285,635 190 C675 140,700 100,720 80" fill="none" stroke="#5d87ad" stroke-width="3"/><text x="655" y="95" font-size="14">soot / PM</text>
<line x1="565" y1="80" x2="565" y2="360" stroke="#9bb5c9" stroke-dasharray="7 6"/><text x="425" y="75" font-size="13">production target with margin</text>
</svg><figcaption>The classic NOx–soot trade-off is movable, not fixed. Injection pressure/rate shape, boost, EGR, combustion design and aftertreatment all shift the feasible region.</figcaption></figure>

This is often called the NOx-soot trade-off.

It is not a single immutable curve.

Injection pressure, spray, timing, boost, combustion-system hardware and aftertreatment can move it.

# 2. Why EGR reduces NOx

EGR can:

- reduce oxygen concentration;
- increase charge heat capacity;
- reduce peak burned-gas temperature.

This suppresses thermal NO formation.

# 3. Why EGR can increase soot

More EGR can reduce both local oxygen availability and soot oxidation.

If the same fuel enters less oxygen:

```text
local equivalence ratio ↑
      ↓
soot formation tendency ↑
```

# 4. EGR × injection timing interaction

Retaining the same SOI after adding EGR can move CA50 because ignition delay changes.

Therefore EGR sweeps should normally include combustion-phasing re-optimization.

# 5. EGR × boost interaction

EGR changes compressor and turbine flows.

VGT may need to change to maintain fresh-air or pressure targets.

Aggressive VGT closure can increase PMEP and reduce brake efficiency.

# 6. EGR cooler

EGR temperature changes charge density and combustion temperature.

A cooler performance change can therefore move NOx, soot and turbo operating point even if EGR valve position is unchanged.

# 7. Calibration procedure

At each important speed-load point:

1. establish boost and no or low-EGR reference;
2. add EGR in controlled steps;
3. re-optimize main timing;
4. measure NOx;
5. measure smoke or PM;
6. measure BSFC;
7. monitor Pmax, MPRR and EGT;
8. select a point with margin from the steep soot boundary.

# 8. Low-load challenge

At low load, EGR can lower exhaust temperature further.

That can hurt SCR and DPF temperature.

The lowest engine-out NOx point may therefore be a poor tailpipe-emissions point.

# 9. High-load challenge

At high load, EGR may be constrained by:

- smoke;
- turbine temperature;
- compressor flow;
- cooling load;
- Pmax.

# 10. SCR-dominant architectures

Some current heavy-duty products rely less on EGR and more strongly on SCR.

The correct architecture is product-specific.

Do not build the training assumption that “every modern diesel must use high EGR everywhere.”

# 11. Engine-out emissions target allocation

The EGR target should come from the complete tailpipe system.

Conceptually:

$$
\dot m_{NOx,tp}
=
\dot m_{NOx,EO}
(1-\eta_{SCR})
$$

When SCR is hot and conversion margin is high, the engine can sometimes tolerate a higher engine-out NOx target if that reduces soot, pumping loss or fuel consumption.

When SCR is cold or aged, engine-out NOx may need to be lower.

This is **target allocation**, not an excuse to ignore engine-out emissions.

# 12. Calibration execution standard

At each selected speed-load point:

1. define the tailpipe/system objective;
2. establish no/low-EGR reference;
3. sweep EGR;
4. re-optimize injection phasing;
5. measure BSFC/NOx/smoke;
6. check SCR temperature/capability;
7. select a point with margin from the steep soot boundary.

Repeat with aged aftertreatment assumptions at key points.

# 13. Senior calibration deep dive — aftertreatment-aware optimization

Consider two hot-SCR candidates at the same brake torque:

```text
Candidate A:
more EGR
lower engine-out NOx
higher pumping loss
higher soot

Candidate B:
less EGR
higher engine-out NOx
lower soot
better BSFC
```

If the aged SCR system still has sufficient conversion margin, Candidate B may deliver lower system fuel consumption and acceptable tailpipe emissions.

During cold/low-temperature operation, that conclusion can reverse.

## Target scheduling

A mature EGR target can therefore depend on:

```text
speed / load
SCR temperature / capability
DPF soot state
thermal mode
ambient condition
```

This is a supervisory emissions strategy, not a single fixed NOx-soot compromise.

## Robustness margin

Repeat the selected EGR point with:

- EGR-flow bias;
- cooler degradation;
- aged SCR conversion;
- injector variation.

The production target should remain away from the steep soot cliff.

# 14. Common mistakes

- Tuning EGR without re-optimizing timing.
- Using EGR valve position as EGR fraction.
- Optimizing engine-out NOx while ignoring tailpipe conversion.
- Ignoring cooler-temperature effects.
- Assuming one EGR philosophy is universal across manufacturers.

# 15. Key lessons

1. EGR reduces NOx mainly through dilution and lower combustion temperature.
2. Soot can rise when oxygen and soot oxidation become insufficient.
3. Injection timing, VGT and EGR are coupled calibration variables.
4. Low-load EGR can create an aftertreatment thermal penalty.
5. The final optimum belongs to the complete engine-aftertreatment system.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
<li><a href="https://www.scania.com/at/de/home/products/trucks/g-series/g-series-specifications.html">Scania current heavy-duty truck engine specifications</a> — current commercial examples of low-speed 13-L diesel/HVO engines, Twin SCR and compression-release engine braking.</li>
<li><a href="https://www.cummins.com/en-na/engines/on-highway/heavy-duty-truck/2027-x15">Cummins 2027 X15 official product page</a> — current commercial example of an integrated heavy-duty diesel engine/aftertreatment platform including EGR, 48-V aftertreatment heating and DOC-DPF-SCR architecture.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
