
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Diesel Combustion Fundamentals</h1>
<p><em>Ignition delay, premixed heat release, mixing-controlled combustion, local mixture and apparent heat release</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Compression ignition is a sequence, not an instantaneous event

Fuel is injected into hot compressed air.

The sequence is:

```text
injection
 ↓
atomization
 ↓
evaporation
 ↓
air entrainment
 ↓
chemical ignition delay
 ↓
autoignition
 ↓
premixed heat release
 ↓
mixing-controlled burn
 ↓
late burn / oxidation
```

<figure class="figure-card"><svg viewBox="0 0 820 460" role="img" aria-label="Diesel heat release phases">
<rect width="820" height="460" fill="white"/><line x1="90" y1="385" x2="750" y2="385" stroke="#52697a" stroke-width="2"/><line x1="90" y1="385" x2="90" y2="60" stroke="#52697a" stroke-width="2"/>
<text x="620" y="425" font-size="17">Crank angle →</text><text x="26" y="130" font-size="17" transform="rotate(-90 26,130)">Heat-release rate</text>
<line x1="255" y1="70" x2="255" y2="385" stroke="#9bb5c9" stroke-dasharray="7 6"/><text x="220" y="62" font-size="13">SOI</text>
<line x1="320" y1="70" x2="320" y2="385" stroke="#9bb5c9" stroke-dasharray="7 6"/><text x="285" y="62" font-size="13">SOC</text>
<path d="M100 365 C230 365,285 360,325 245 C350 160,385 130,420 190 C455 235,480 255,515 245 C570 220,630 250,710 330" fill="none" stroke="#17324a" stroke-width="3"/>
<text x="270" y="110" font-size="13">ignition delay</text><text x="345" y="125" font-size="13">premixed</text><text x="480" y="205" font-size="13">mixing-controlled</text><text x="625" y="300" font-size="13">late burn</text>
</svg><figcaption>Qualitative diesel heat release. Injection command, ignition delay, premixed fraction and mixing-controlled burn determine pressure rise, efficiency, NOx and soot.</figcaption></figure>

# 2. SOI and SOC are different

Start of injection, SOI, is a fuel-system event.

Start of combustion, SOC, is a combustion event.

Ignition delay is:

$$
\theta_{delay}=SOC-SOI
$$

The delay changes with:

- charge temperature;
- pressure;
- fuel cetane;
- EGR;
- injection pressure;
- residual gas;
- compression condition.

# 3. Premixed burn

Fuel injected before SOC can partially evaporate and mix.

When ignition begins, this prepared mixture can burn rapidly.

A larger premixed fraction can raise:

- MPRR;
- combustion noise;
- NOx.

# 4. Mixing-controlled burn

After the early premixed phase, much of diesel combustion is controlled by spray mixing and oxygen entrainment.

This phase is highly sensitive to:

- nozzle geometry;
- injection pressure;
- local oxygen concentration;
- swirl;
- piston-bowl geometry.

# 5. Local mixture versus global lambda

The whole cylinder can be globally lean while the center of a spray is locally fuel rich.

Therefore:

> **global lambda alone cannot predict soot.**

Soot formation depends on the local fuel-air-temperature history.

# 6. Apparent heat release

A simplified single-zone relation is:

$$
\frac{dQ_{net}}{d\theta}
=
\frac{\gamma}{\gamma-1}
p\frac{dV}{d\theta}
+
\frac{1}{\gamma-1}
V\frac{dp}{d\theta}
$$

Real analysis may additionally account for heat transfer, crevice flow, variable specific heats and blow-by.

# 7. Combustion phasing metrics

Useful markers include:

- CA10;
- CA50;
- CA90.

Combustion duration can be expressed as:

$$
\Delta\theta_{10-90}
=
CA90-CA10
$$

Long late burn often worsens BSFC and raises exhaust temperature.

# 8. Soot formation and oxidation

Engine-out soot is conceptually:

$$
soot_{out}
=
soot_{formed}
-
soot_{oxidized}
$$

Improved mixing can reduce soot formation.

Adequate oxygen, temperature and residence time can improve soot oxidation later in the cycle.

# 9. Hardware boundaries

Piston bowl, swirl, compression ratio, nozzle-hole diameter, spray angle and injector protrusion are hardware variables.

A software calibration cannot fully compensate for the wrong combustion-system hardware.

# 10. Cylinder-resolved development

At each point log:

```text
SOI
SOC
ignition delay
CA10 / CA50 / CA90
Pmax
MPRR
IMEP
NOx
smoke / PM
EGT
```

The relationships between these signals matter more than any one signal.

# 11. Time versus crank angle

One crank-angle degree represents less physical time at higher engine speed.

At 1200 rpm, one revolution takes:

$$
\frac{60}{1200}=0.05\ s
$$

so one crank degree takes about:

$$
\frac{0.05}{360}
\approx139\ \mu s
$$

At 1800 rpm, it is about 92.6 µs.

Therefore injection and chemistry that occupy the same physical time span consume more crank-angle degrees at lower speed and fewer at higher speed.

This is one reason injection strategy must vary with engine speed.

# 12. Ignition-delay decomposition

Ignition delay contains both physical and chemical processes:

```text
atomization / evaporation / mixing
+
chemical pre-reactions
```

Injection pressure strongly affects the first group; cetane and temperature strongly affect the second.

# 13. Apparent heat-release interpretation

Use heat-release curves to ask:

- Did the candidate move SOC?
- Did it change the premixed spike?
- Did it shorten the mixing-controlled tail?
- Did it move more energy into late expansion or exhaust?

This is more diagnostic than comparing Pmax alone.

# 14. Combustion-hardware change impact

After changing a nozzle or piston bowl, repeat:

- SOI-to-SOC relationship;
- heat release;
- smoke;
- NOx;
- Pmax/MPRR;
- full-load torque.

Do not assume a software offset can restore the previous combustion system.

# 15. HD13-E heat-release comparison

Compare points B and D at the same fuel family.

At point B, the lower speed gives more physical time per crank-angle degree and turbo air can be limited.

At point D, the higher speed gives less physical time for injection and mixing, while total fuel flow and thermal load are high.

The calibration should therefore expect different:

- ignition delay in crank-angle degrees;
- injection duration;
- premixed fraction;
- late burn.

# 16. Calibration execution standard

For every combustion study, record the complete chain:

```text
electrical injection command
→ actual/hydraulic injection if measurable
→ SOC
→ CA10
→ CA50
→ CA90
→ Pmax / MPRR
→ IMEP
→ emissions
```

This prevents a shift in injector hydraulics from being misinterpreted as a change in chemistry.

# 17. Common mistakes

- Treating SOI and SOC as the same event.
- Describing the whole diesel burn as a simple diffusion flame.
- Using global lambda as the only soot predictor.
- Ignoring ignition-delay changes after a fuel-quality change.
- Calibrating around a combustion hardware mismatch.

# 18. Key lessons

1. Diesel combustion is created by injection, ignition chemistry and turbulent air-fuel mixing.
2. Ignition delay controls how much fuel participates in rapid early heat release.
3. Local mixture determines soot behavior even when the overall cylinder is lean.
4. CA10, CA50 and CA90 reveal combustion evolution.
5. Combustion hardware and calibration must be treated as one system.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li>W. W. Pulkrabek, <em>Engineering Fundamentals of the Internal Combustion Engine</em> — indicated/brake work, gas exchange and turbocharging fundamentals.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
