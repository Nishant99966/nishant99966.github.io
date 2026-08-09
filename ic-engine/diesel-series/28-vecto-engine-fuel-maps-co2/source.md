<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div><h1>Engine Fuel Maps, VECTO and Heavy-Duty Vehicle CO₂ Optimization</h1><p><em>How BSFC maps, full-load torque, driveline, auxiliaries, vehicle resistance and mission profiles combine into vehicle fuel consumption and CO₂</em></p></div>
<div class="publication-note"><strong>Scope:</strong> OEM-neutral heavy-duty diesel calibration for truck, bus and comparable vehicle applications. Worked numerical values are illustrative unless tied to a cited public regulation or product source.</div>
<div class="view-controls"><strong>Reading mode:</strong> <button onclick="setMode('simple')">Simple view</button> <button onclick="setMode('detailed')">Detailed view</button> <span id="mode-label">Practical notes visible</span></div>

# 1. Engine fuel efficiency becomes vehicle CO2 through a mission

A 0.5% BSFC gain at one engine point does not automatically produce a 0.5% vehicle fuel-consumption gain.

<figure class="figure-card"><svg viewBox="0 0 820 500" role="img" aria-label="Engine fuel map to vehicle CO2"><rect width="820" height="500" fill="white"/><g font-family="Arial" text-anchor="middle" fill="#17324a" font-size="14"><rect x="30" y="175" width="135" height="72" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="98" y="205">Engine fuel /</text><text x="98" y="226">full-load maps</text><rect x="200" y="175" width="125" height="72" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="263" y="205">Gearbox /</text><text x="263" y="226">driveline losses</text><rect x="360" y="175" width="125" height="72" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="423" y="205">Mass / rolling</text><text x="423" y="226">resistance</text><rect x="520" y="175" width="125" height="72" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="583" y="205">Aerodynamics /</text><text x="583" y="226">auxiliaries</text><rect x="680" y="175" width="105" height="72" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="733" y="205">Mission</text><text x="733" y="226">profile</text><text x="410" y="80">Vehicle simulation combines component data into CO2 / fuel consumption</text></g></svg><figcaption>Vehicle CO2/fuel consumption depends on how engine maps interact with gearbox losses, auxiliaries, vehicle resistance and mission profile. A map-cell gain matters only in proportion to how the vehicle uses that region.</figcaption></figure>

# 2. VECTO concept

The European Commission's VECTO framework uses engine performance plus vehicle/component inputs including gearbox losses, auxiliary power, mass/inertia, rolling resistance, aerodynamics and mission profiles.

# 3. Engine inputs

High-quality engine inputs include the applicable fuel-consumption map, full-load curve and other engine data required by the current method.

The legal data format and test procedure must follow the applicable current VECTO/type-approval regulation.

# 4. Mission weighting

Conceptually:

$$
m_{fuel,mission}
=
\int
\dot m_f(n_e(t),T_e(t))\,dt
$$

The map cells that contribute most mission fuel deserve the most optimization effort.

# 5. HD13-E example

Suppose a change gives:

```text
Point B:  -0.2% BSFC
Point C:  -0.7% BSFC
Point D:  +0.1% BSFC
```

A long-haul mission that spends substantial work around point C can benefit more than a vocational mission that rarely operates there.

# 6. Downspeeding and torque shaping

A stronger low-speed torque curve can allow earlier upshift or taller axle ratio.

Vehicle benefit can then come from lower engine speed and friction, not only lower BSFC at one cell.

# 7. Auxiliaries

Smart coolant pumps, fan control and clutched compressors matter because auxiliary power is part of the vehicle energy balance.

# 8. Current EU CO2 context

The current EU heavy-duty CO2 framework sets progressively stricter manufacturer fleet targets across future reporting periods.

For the calibration engineer, the durable lesson is:

> engine map quality, driveline integration and vehicle simulation are formal product-development inputs.

# 9. Calibration execution

## Objective

Optimize vehicle mission fuel/CO2, not isolated minimum BSFC.

## Preconditions

Fuel map and full-load curve validated with known uncertainty; representative transmission and vehicle data available; current VECTO method identified.

## Mission-weighted map

Create:

```text
speed × torque cell
→ time fraction
→ work fraction
→ fuel contribution
```

## Calibration objects

- injection;
- air/EGR;
- low-speed torque;
- gear-dependent torque;
- auxiliaries;
- thermal strategy.

## Validation

Repeat dyno points, run vehicle simulation, verify representative route, vehicle mass and alternative mission profiles.

# 10. Engine-map measurement quality for vehicle simulation

A simulation tool can only be as accurate as the engine map provided.

For map-generation testing control:

- coolant and oil temperature;
- fuel temperature;
- intake condition;
- auxiliary state;
- aftertreatment/regen state;
- measurement drift.

A 0.5% biased fuel map can distort the apparent benefit of vehicle technologies.

# 11. Mission contribution map

For a simulated mission, create a second map showing:

$$
Fuel_{cell}
=
\dot m_{f,cell}
\times
time_{cell}
$$

This highlights cells that dominate total fuel use.

A cell with mediocre BSFC may deserve little development effort if the vehicle almost never operates there.

# 12. Technology interaction example

Suppose:

```text
Miller / air-path change improves point C
smart air compressor reduces auxiliary load
taller axle ratio moves more operation into point C
```

The combined vehicle benefit can be larger than the sum estimated from isolated engine points because the operating distribution also changes.

# 13. Simulation-to-road correlation

After simulation:

1. select representative route;
2. reproduce mass and tire/vehicle configuration;
3. compare speed/gear/engine-operating distribution;
4. compare fuel consumption;
5. investigate systematic mismatch.

The goal is not to tune the engine map to force simulation agreement; it is to validate the complete input/model chain.

# 14. Common mistakes

- Optimizing the absolute BSFC minimum without mission weighting.
- Comparing VECTO results with different vehicle inputs.
- Ignoring auxiliary power.
- Treating transmission strategy as unrelated to engine-map optimization.
- Using an outdated simulation/regulatory version.

# 15. Key lessons

1. Vehicle CO2 is a system result.
2. Mission weighting determines which engine-map gains matter.
3. Downspeeding can create benefits beyond a BSFC-cell change.
4. Auxiliaries and gearbox losses belong in the same energy balance.
5. VECTO-quality thinking turns engine calibration into vehicle-level optimization.

# References

<ol class="refs">
<li><a href="https://climate.ec.europa.eu/eu-action/transport-decarbonisation/road-transport/vehicle-energy-consumption-calculation-tool-vecto_en">European Commission VECTO</a> — official description of heavy-duty CO2/fuel-consumption simulation using engine performance, gearbox losses, auxiliaries, vehicle resistance and mission profiles.</li>
<li><a href="https://eur-lex.europa.eu/eli/reg/2017/2400/2026-01-01/eng">Commission Regulation (EU) 2017/2400, consolidated 1 January 2026</a> — current legal framework for determination of heavy-duty vehicle CO2 emissions and fuel consumption using the simulation tool.</li>
<li><a href="https://eur-lex.europa.eu/eli/reg/2019/1242/2024-07-01/eng">Regulation (EU) 2019/1242 as amended</a> — current heavy-duty vehicle CO2 fleet-performance framework; the EUR-Lex page links to the current 2026 consolidation.</li>
<li><a href="https://www.daf.com/en/news-and-media/news-articles/global/2024/new-generation-daf-trucks-powering-customer-success">DAF Trucks, 2024 public powertrain update</a> — example combining Miller valve timing, updated turbo/EGR, dual-drive coolant pump, clutched air compressor, new injectors and downspeeding.</li>
</ol>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
