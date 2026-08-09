
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Gas Train, Fuel Quality and Hydrogen-Blend Outlook</h1>
<p><em>Gas regulation, shut-off, metering, methane number, LHV, Wobbe Index, mixture calculations and future hydrogen-blend implications</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. The gas train and fuel quality must be understood together

A large CNG genset needs both **correct fuel chemistry** and **reliable gas delivery**.

A generic gas path can look like:

```text
Site gas supply
   ↓
filter / conditioning
   ↓
pressure regulation
   ↓
safety shut-off valves
   ↓
main gas metering / dosing
   ↓
mixer or port distribution
   ↓
intake / charge system
   ↓
cylinders

Optional separate branch:
prechamber gas regulation / metering
```

The exact hardware differs by engine architecture.

# 2. Natural gas is not one fixed fuel

Pipeline natural gas composition varies.

Important properties include:

- methane content;
- higher hydrocarbons;
- CO2/N2 inert fraction;
- lower heating value;
- stoichiometric AFR;
- methane number / knock resistance;
- Wobbe Index.

# 3. Why gas quality enters performance calibration

The same commanded gas mass can produce different:

- chemical energy;
- lambda;
- knock tendency;
- burn rate.

So a nominally fixed-speed genset can deliver different electrical power from the same nominal fuel command if gas quality changes.

# 4. Fuel-system characterization

Measure injector/valve flow versus:

- upstream gas pressure;
- manifold pressure;
- gas temperature;
- command duration/position;
- supply voltage where relevant.

For compressible flow, identify subcritical and choked-flow behavior.

# 5. Gas-quality calibration procedure

Use representative gas blends or approved gas-quality models.

At fixed electrical loads:

1. stabilize gas composition;
2. set lambda/air;
3. optimize spark;
4. measure electrical efficiency and knock;
5. repeat with lower/higher knock resistance;
6. repeat with heating-value variation.

# 6. Trade-off — methane number versus power

Lower knock resistance can require:

- spark retard;
- lower boost;
- richer/less-lean operation depending strategy;
- power derating.

The calibration should protect the engine rather than forcing rated power on unsuitable gas.

# 7. Trade-off — heating value versus gas-system flow

Lower LHV requires more fuel mass/volume for the same power.

The gas system may reach:

- injector-flow limit;
- regulator-flow limit;
- rail-pressure limit.

This can become the true maximum-power limit.

# 8. Wobbe Index

Wobbe Index is useful for comparing interchangeability of gaseous fuels through a fixed orifice-type system.

It does not replace full combustion characterization.

Two gases with similar Wobbe Index can still differ in methane number and combustion behavior.

# 9. Correction structure

A practical control concept can contain:

```text
base fuel request from air/load
      ↓
stoichiometric-AFR correction
      ↓
heating-value / energy correction
      ↓
gas-pressure/temp flow correction
      ↓
lambda feedback
```

# 10. Validation

Test:

- rated load;
- low load;
- load steps;
- low gas supply pressure;
- gas-temperature extremes;
- gas-quality extremes.

The final gas-quality strategy must protect both **combustion** and **fuel-delivery capacity**.

# 11. Gas-train calibration and validation procedure

## Step 1 — characterize supply pressure window

Establish the approved inlet pressure range and measure regulator/dosing behavior across:

- minimum pressure;
- nominal pressure;
- maximum pressure.

## Step 2 — map metering-device flow

For each relevant pressure ratio and gas temperature, determine:

$$
\dot m_{gas}
=
f(command,p_{up},p_{down},T_{gas},composition)
$$

For compressible flow, distinguish subcritical and choked regions.

## Step 3 — test rail/manifold pressure dynamics

Perform electrical load steps and record:

- upstream supply pressure;
- regulated pressure;
- gas temperature;
- metering command;
- lambda;
- electrical power.

A slow pressure regulator can create a transient fuel-energy deficit even if the steady-state flow map is correct.

## Step 4 — verify safety shut-off behavior

Fuel-system calibration must remain compatible with the safety architecture:

- start permissives;
- valve proving;
- low/high gas-pressure protection;
- emergency shut-off.

These are not calibration knobs, but they define the permitted operating envelope.

# 12. Prechamber fuel path where fitted

An actively fueled prechamber can have a different pressure and metering requirement from the main fuel path.

The calibration engineer should separate:

```text
main-chamber fuel demand
from
prechamber ignition-energy demand
```

rather than treating total gas flow as one undifferentiated quantity.

# 13. Key fuel-system trade-offs

### High gas pressure versus control effort

More pressure margin increases maximum flow capability but can increase regulator/metering sensitivity and component stress.

### Large metering authority versus low-load resolution

A system sized for rated multi-megawatt flow must still control very small fuel quantities at low load.

### Fuel-energy correction versus lambda correction

A lambda sensor can correct air/fuel ratio, but it does not automatically correct a wrong fuel heating-value assumption in the torque/power model.

The final gas strategy therefore needs both:

- mixture correction;
- fuel-energy / gas-quality correction.

# 14. 2026 technology outlook — hydrogen blending

Current commercial gas gensets demonstrate that hydrogen can be blended with pipeline natural gas in some approved architectures.

This does **not** mean a natural-gas calibration can simply be reused.

Adding hydrogen can change:

- lower heating value per unit volume;
- Wobbe Index;
- laminar flame speed;
- ignition delay;
- knock/pre-ignition behavior;
- NOx tendency;
- gas-system volumetric-flow demand.

A hydrogen-capable calibration therefore needs a separately validated fuel-quality envelope.

The engineering principle is:

```text
Fuel composition changes
       ↓
energy + stoichiometry + flame speed change
       ↓
air / gas / spark / knock targets may all change
```

# 15. Gas-property calculation example

If the fuel's lower heating value changes from:

```text
50 MJ/kg → 45 MJ/kg
```

then, ignoring efficiency change, the fuel mass needed for the same chemical power increases approximately by:

$$
\frac{50}{45}=1.111
$$

or about 11.1%.

That additional mass/volume demand can turn the regulator or gas-metering system into the limiting component.

# 16. Gas-property calculation link to mixture control

Fuel composition affects both the energy model and stoichiometry.

The mixture controller therefore needs consistency between:

$$
LHV
$$

and:

$$
AFR_{stoich}
$$

If LHV is corrected but stoichiometric AFR is not, the controller can predict the right fuel energy while commanding the wrong lambda.

# 17. Field gas-quality validation

For each approved gas-quality corner:

1. stabilize composition;
2. verify gas pressure/temperature compensation;
3. verify lambda calculation;
4. optimize/verify spark;
5. check knock/Pmax;
6. check gas-system headroom at rated load;
7. verify emissions.

# 18. If the fuel is truly supplied as high-pressure CNG

CNG is natural gas stored in a compressed high-pressure state. If the genset is supplied from cylinders, a cascade or a mobile CNG trailer, the upstream system should be treated separately from the engine's low-/medium-pressure gas train.

```text
High-pressure CNG source
        ↓
pressure isolation
        ↓
pressure reduction
        ↓
temperature conditioning where required
        ↓
regulated engine-inlet pressure
        ↓
engine shut-off and metering
```

Calibration/validation should include:

- maximum and minimum CNG storage pressure;
- regulator outlet-pressure stability;
- gas temperature after pressure reduction;
- maximum rated-load gas flow;
- storage depletion / supply-change transients;
- dew-point or condensate controls defined by the project.

If the site uses pipeline natural gas instead, these high-pressure storage/reduction stages are not part of the plant.

The combustion articles begin at the point where **gas pressure, temperature and composition are inside the approved engine-inlet window**.

# 19. Common mistakes

- Treating Wobbe Index as a complete combustion-quality descriptor.
- Using methane number as an energy-content metric.
- Correcting lambda but not torque energy for changed LHV.
- Ignoring regulator dynamics during load steps.
- Assuming hydrogen blending preserves the natural-gas calibration.

# 20. Key lessons

1. Gas quality changes energy, stoichiometry, knock and volumetric demand.
2. Fuel-system capability must be validated at low-LHV/high-flow conditions.
3. Mixture and torque models must use mutually consistent fuel properties.
4. Hydrogen blends require separately approved calibration envelopes.

# References

<ol class="refs">
<li>Caterpillar CG260-16 current product documentation — example of a commercial large gas genset offered for pipeline natural gas with an approved hydrogen-blend option; cited only as evidence that hydrogen-blend capability exists commercially, not as a calibration specification.</li>
<li>U.S. Department of Energy Alternative Fuels Data Center — Natural Gas Fuel Basics and CNG fuel-system descriptions; current public definition of high-pressure CNG storage and downstream pressure regulation.</li>
<li>ISO 8528-2:2018 — Engines; principal characteristics and speed-governing terminology for generating-set applications.</li>
<li>ISO 15550:2016 — Internal-combustion engine power measurement and reference conditions; current in 2026.</li>
<li>ISO 3046-1:2002 — Additional engine performance/declaration requirements; current in 2026 but under revision.</li>
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
