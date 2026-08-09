
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Turbocharger Matching, VGT and Multi-Stage Charging</h1>
<p><em>Compressor and turbine maps, VGT, surge/choke, multi-stage charging and transient turbo dynamics across the heavy-duty engine map</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Turbo matching is a speed-load problem

A heavy-duty road engine crosses the turbo maps in two dimensions because both speed and load vary continuously.

<figure class="figure-card"><svg viewBox="0 0 820 460" role="img" aria-label="Compressor map with engine operating lines">
<rect width="820" height="460" fill="white"/><line x1="90" y1="390" x2="750" y2="390" stroke="#52697a" stroke-width="2"/><line x1="90" y1="390" x2="90" y2="55" stroke="#52697a" stroke-width="2"/>
<text x="590" y="430" font-size="17">Corrected mass flow →</text><text x="25" y="95" font-size="17" transform="rotate(-90 25,95)">Pressure ratio ↑</text>
<path d="M150 350 C130 280,135 210,175 120" fill="none" stroke="#17324a" stroke-width="3"/><text x="112" y="110" font-size="14">surge</text>
<path d="M185 330 C280 250,420 220,650 250" fill="none" stroke="#9bb5c9" stroke-width="2"/><path d="M205 350 C315 270,480 250,705 300" fill="none" stroke="#9bb5c9" stroke-width="2"/>
<ellipse cx="430" cy="255" rx="165" ry="88" fill="none" stroke="#c7d7e4" stroke-width="2"/><ellipse cx="430" cy="255" rx="110" ry="55" fill="none" stroke="#c7d7e4" stroke-width="2"/>
<path d="M205 330 C300 305,430 270,610 245" fill="none" stroke="#17324a" stroke-width="3"/><text x="500" y="225" font-size="13">one engine-speed line</text>
<path d="M180 350 C285 330,415 315,650 315" fill="none" stroke="#5d87ad" stroke-width="3"/><text x="485" y="340" font-size="13">lower-speed line</text>
</svg><figcaption>Heavy-duty engines cross the compressor map with both speed and load. VGT, EGR, gear shifts, altitude and transients all move the operating point.</figcaption></figure>

At each engine speed, increasing load usually moves toward higher air flow, pressure ratio and turbine power.

# 2. Compressor pressure ratio

$$
\Pi_c=
\frac{p_{out,abs}}{p_{in,abs}}
$$

A common corrected-flow form is:

$$
\dot m_{corr}
=
\dot m
\frac{\sqrt{T_{in}/T_{ref}}}
{p_{in}/p_{ref}}
$$

Use the supplier's exact convention.

# 3. Compressor efficiency

$$
\eta_c=
\frac{T_{out,s}-T_{in}}
{T_{out}-T_{in}}
$$

Poor efficiency raises compressor-out temperature and cooling demand.

# 4. Turbine power

A simplified enthalpy interpretation is:

$$
P_t
\approx
\dot m_{exh}c_p
(T_{t,in}-T_{t,out})
$$

At quasi-steady turbo speed:

$$
P_t\approx P_c+P_{mech}
$$

# 5. Surge and choke

High pressure ratio at low compressor flow can approach surge.

High flow can approach choke or an inefficient high-flow region.

Relevant events include aggressive low-speed VGT closure, rapid throttle or EGR changes and load rejection.

# 6. Two-stage charging

For two stages:

$$
\Pi_{total}
=
\Pi_1\Pi_2
$$

The best pressure-ratio split depends on compressor efficiency, intercooling, turbo speed, turbine backpressure and transient response.

Equal pressure ratio is not automatically optimal.

# 7. Advanced architecture deep dive — turbo compounding

A turbo-compound system uses an additional exhaust-energy recovery device to convert exhaust energy into crankshaft or driveline work.

Current heavy-duty production examples exist.

Potential benefit:

```text
exhaust energy recovered
      ↓
crankshaft work increases
      ↓
BSFC can improve
```

Added exhaust restriction and system complexity must still be included.

# 8. Matching procedure

Across the engine map:

1. calculate compressor corrected flow and speed;
2. mark surge and choke margin;
3. calculate turbine pressure ratio;
4. log exhaust-manifold pressure;
5. log turbo speed;
6. calculate CAC outlet temperature;
7. correlate with BSFC, EGR and smoke.

# 9. Low-speed high-torque challenge

At low engine speed, exhaust flow is lower while demanded torque can be high.

This is often where VGT authority and smoke limiting are most important.

# 10. Corrected turbo speed

A common conceptual corrected-speed form is:

$$
N_{corr}
=
N
\sqrt{\frac{T_{ref}}{T_{in}}}
$$

Use the supplier's actual convention.

Corrected speed is important when comparing compressor operation at hot versus cold inlet conditions.

# 11. Turbo shaft dynamics

During a transient:

$$
P_t-P_c-P_{mech}
=
J_t\omega_t\frac{d\omega_t}{dt}
$$

This explains turbo lag physically: turbine power must first accelerate rotating inertia before the compressor reaches the new steady state.

# 12. Worked pressure-ratio example

If compressor inlet pressure is 0.95 bar absolute and outlet pressure is 2.5 bar absolute:

$$
\Pi_c
=
\frac{2.5}{0.95}
\approx2.63
$$

At altitude, lower inlet pressure can increase required pressure ratio even if the manifold target is unchanged.

# 13. Turbo-compound system efficiency

A turbo-compound device can recover exhaust work, but evaluate:

$$
\Delta P_{crank,recovered}
-
\Delta P_{pumping}
$$

not recovered power alone.

The net result depends on exhaust restriction and engine operating point.

# 14. HD13-E turbo calibration matrix

Use the recurring engine points to force different turbo physics:

| Point | Main challenge |
|---|---|
| B — 1000 rpm high torque | response / surge / smoke |
| C — 1200 rpm cruise | compressor/turbine efficiency |
| D — 1600 rpm high power | choke / turbo speed / turbine temperature |
| E — engine brake | surge / overspeed during flow collapse |

# 15. Calibration execution standard

## Objective

Place the compressor and turbine in efficient, stable regions while meeting air, EGR and transient-response targets.

## Calibration objects

- VGT feedforward;
- boost/fresh-air target;
- turbo-speed limit;
- multi-stage bypass or stage-split target where fitted.

## Signals to log

```text
compressor inlet/outlet absolute pressure
compressor inlet/outlet temperature
fresh-air mass
turbo speed
exhaust manifold pressure
turbine outlet pressure
VGT / bypass position
BSFC
smoke / NOx
```

## Selection rule

Reject any candidate that approaches surge, choke, speed or temperature boundaries even if BSFC is attractive.

## Robustness

Repeat with altitude, hot compressor inlet, exhaust restriction and tip-in/load-rejection transients.

# 16. Senior calibration deep dive — surge margin and transient reserve

A steady compressor point should not sit exactly on the acceptable surge boundary.

Define a project-specific margin using the compressor-map convention available from the supplier.

Then check that margin during:

- tip-out;
- gear shift;
- engine-brake entry;
- rapid EGR/VGT movement.

## Turbo thermal inertia

Turbo metal temperature changes more slowly than exhaust-gas temperature.

A short exhaust-temperature spike may be acceptable while a sustained lower temperature produces greater metal soak.

This is why turbo protection should distinguish:

```text
instantaneous gas limit
from
modelled component thermal state
```

## VGT efficiency trade

At HD13-E point C, a small VGT closure may improve compressor operation but increase exhaust pressure.

Calculate the net result through:

- compressor efficiency;
- PMEP;
- BSFC;
- EGR authority.

Do not select a VGT position from boost error alone.

## Advanced architecture note

Turbo compounding remains an advanced architecture, not the default assumption for the series.

Where present, evaluate recovered shaft power against the extra exhaust backpressure and added driveline/control complexity.

# 17. Common mistakes

- Matching only at rated power.
- Using gauge pressure in pressure-ratio calculations.
- Ignoring turbine backpressure.
- Assuming equal stage pressure ratios are optimal.
- Adding exhaust-energy recovery without checking pumping penalties.

# 18. Key lessons

1. Heavy-duty turbo matching must cover the complete speed-load envelope.
2. Compressor and turbine maps are equally important.
3. VGT and multi-stage systems trade response against pumping and turbo limits.
4. Turbo compounding is an advanced efficiency technology with real production examples.
5. Low-speed high-torque operation is a critical turbo and smoke validation region.

# References

<ol class="refs">
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based engine control, air path, turbocharger and transient modeling.</li>
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.volvotrucks.us/trucks/powertrain/d13tc/">Volvo D13TC official page</a> — current heavy-duty example of turbo-compound exhaust-energy recovery and low-rpm powertrain integration.</li>
<li><a href="https://www.macktrucks.com/powertrain/engines/mp8-he">Mack MP8HE official page</a> — current heavy-duty example of exhaust-energy recovery/turbo-compound technology.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
