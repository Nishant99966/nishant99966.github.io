
<div class="hero">
<div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div>
<h1>Diesel Fuel Quality, Cetane, Density, LHV, HVO and Biodiesel</h1>
<p><em>How the fuel changes ignition delay, injected mass, volumetric consumption, cold operation and aftertreatment</em></p>
</div>

<div class="publication-note"><strong>Scope:</strong> The main teaching case is a modern turbocharged heavy-duty compression-ignition engine operating over a broad engine-speed/load map in truck, bus or comparable heavy-duty vehicle service. Engine speed, gear, vehicle mass, road grade, driver demand and aftertreatment state all move during operation. Off-highway adaptations are noted where useful; regulatory chapters clearly distinguish jurisdiction-specific requirements.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Fuel quality changes both energy and combustion chemistry

Important diesel-fuel properties include:

- lower heating value;
- density;
- cetane quality;
- viscosity;
- lubricity;
- sulfur;
- volatility and distillation;
- cold-flow behavior;
- water and contamination.

These properties should not be collapsed into one “fuel quality” number.

# 2. Lower heating value

For required chemical fuel power:

$$
\dot m_f=
\frac{P_{fuel}}{LHV}
$$

A lower LHV requires more fuel mass for the same energy.

# 3. Density

Volumetric flow is:

$$
\dot V_f=
\frac{\dot m_f}{\rho_f}
$$

A lower-density fuel can therefore increase litres per 100 km even when mass-specific efficiency changes little.

# 4. Cetane quality

Cetane quality mainly influences autoignition delay.

Higher cetane tendency generally shortens chemical ignition delay.

This can change premixed burn fraction, pressure-rise rate, cold start and noise.

# 5. Viscosity and lubricity

These influence leakage, pump durability, spray and hydraulic delay.

# 6. Sulfur

Sulfur affects SO₂, particulate composition and catalyst durability.

The calibration must use fuel within the approved product and regulatory specification.

# 7. HVO

Hydrotreated vegetable oil or renewable paraffinic diesel can differ from conventional diesel in density, cetane number, aromatic content and energy per litre.

Current heavy-duty products exist that are approved for HVO, but that does not make every legacy engine automatically compatible.

# 8. Biodiesel or FAME

FAME biodiesel is chemically different from HVO.

Potential issues can include oxidation stability, storage, water affinity, deposit formation, cold flow and material compatibility.

# 9. Fuel-correction strategy

Useful model inputs can include fuel temperature, density estimate, approved fuel type and learned torque or fueling correction.

Adaptation should not hide a fuel outside the approved specification.

# 10. Validation matrix

At representative speed-load points test:

- nominal reference fuel;
- low and high cetane corners;
- low-LHV approved fuel;
- hot fuel;
- cold fuel;
- HVO or biodiesel if approved.

Measure injection pressure, delivered torque, CA50, Pmax, MPRR, NOx, smoke or PM and aftertreatment temperature.

# 11. Worked LHV and density example

Suppose Fuel A has:

```text
LHV = 42.7 MJ/kg
density = 835 kg/m³
```

and approved Fuel B has:

```text
LHV = 42.0 MJ/kg
density = 780 kg/m³
```

For equal chemical energy, Fuel B needs approximately:

$$
\frac{42.7}{42.0}-1
\approx1.67\%
$$

more fuel **mass**.

But its lower density also increases the required **volume** more strongly.

This is why customer litres-per-100-km can move more than mass-based BSFC.

# 12. Ignition-delay correction is separate from energy correction

A fuel-energy correction can restore torque demand, but it does not automatically restore the same combustion phasing.

If cetane changes:

```text
same commanded SOI
      ↓
different SOC
      ↓
different CA50 / MPRR / NOx
```

Therefore fuel adaptation may require both:

- energy/quantity correction;
- phasing validation.

# 13. Long-term storage

For vocational or seasonal equipment, fuel aging can create problems that resemble calibration faults.

Check:

- oxidation;
- water;
- microbial contamination;
- filter plugging;

before changing injection maps.

# 14. Fuel-property compensation hierarchy

Separate three different corrections:

```text
1. energy correction
2. hydraulic / density / viscosity correction
3. combustion-phasing correction
```

A single multiplier cannot reliably solve all three.

For example, a lower-density high-cetane paraffinic fuel can require more volumetric delivery while simultaneously shortening ignition delay.

# 15. Fuel analysis for development

For a calibration campaign, record at minimum the properties relevant to the approved specification, such as:

- density;
- cetane indicator;
- LHV where used for efficiency calculation;
- sulfur;
- viscosity;
- water/contamination;
- blend designation.

The exact laboratory methods depend on the fuel standard.

# 16. Fuel consumption reporting

Always state whether fuel consumption is reported as:

- kg/h;
- g/kWh;
- L/h;
- L/100 km;
- energy-specific consumption.

Mass-based BSFC is generally better for engine thermodynamics; volume-based consumption is important for customer operation.

# 17. Fuel-switch robustness

If an engine is approved for both conventional diesel and HVO/FAME blends, validate the transitions that matter in service:

- cold start;
- low-load aftertreatment temperature;
- rated power;
- smoke limit;
- regeneration;
- diagnostic plausibility.

Do not assume a fuel that improves soot automatically improves every emissions or startability metric.

# 18. Common mistakes

- Treating cetane and LHV as the same property.
- Comparing litre-based fuel economy without density context.
- Assuming HVO and FAME biodiesel behave identically.
- Correcting torque for LHV while ignoring ignition-delay change.
- Recalibrating around contaminated or out-of-spec fuel.

# 19. Key lessons

1. Fuel energy, density and ignition quality are different calibration inputs.
2. Fuel composition can change both torque feedforward and combustion phasing.
3. HVO can be a valid heavy-duty fuel on approved platforms but must be validated.
4. Biodiesel introduces separate storage, material and cold-flow concerns.
5. The approved fuel envelope belongs in release validation.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — diesel combustion, heat release, emissions and performance fundamentals.</li>
<li><a href="https://www.scania.com/at/de/home/products/trucks/g-series/g-series-specifications.html">Scania current heavy-duty truck engine specifications</a> — current commercial examples of low-speed 13-L diesel/HVO engines, Twin SCR and compression-release engine braking.</li>
</ol>
<p><a href="../">← Back to the Heavy-Duty Diesel Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
