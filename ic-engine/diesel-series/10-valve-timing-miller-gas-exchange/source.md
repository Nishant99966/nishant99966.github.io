<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div><h1>Valve Timing, Miller Cycle and Gas-Exchange Calibration</h1><p><em>How IVC, EVO, trapped charge, effective compression, pumping work, turbo matching and EGR interact</em></p></div>
<div class="publication-note"><strong>Scope:</strong> OEM-neutral heavy-duty diesel calibration for truck, bus and comparable vehicle applications. Worked numerical values are illustrative unless tied to a cited public regulation or product source.</div>
<div class="view-controls"><strong>Reading mode:</strong> <button onclick="setMode('simple')">Simple view</button> <button onclick="setMode('detailed')">Detailed view</button> <span id="mode-label">Practical notes visible</span></div>

# 1. Valve timing is part of diesel performance calibration

Valve events determine trapped charge, residual gas, effective compression, expansion utilization, pumping work and turbine energy.

<figure class="figure-card"><svg viewBox="0 0 820 500" role="img" aria-label="Valve timing and Miller concept"><rect width="820" height="500" fill="white"/><line x1="80" y1="400" x2="760" y2="400" stroke="#52697a" stroke-width="2"/><text x="625" y="440" font-size="17">Crank angle →</text><path d="M110 390 C150 390,180 350,205 250 C235 135,300 100,365 210 C410 295,450 370,500 390" fill="none" stroke="#17324a" stroke-width="3"/><path d="M310 390 C350 390,390 330,430 230 C480 110,555 110,610 240 C650 330,680 380,720 390" fill="none" stroke="#5d87ad" stroke-width="3"/><text x="210" y="92" font-size="14">intake valve lift</text><text x="500" y="92" font-size="14">exhaust valve lift</text><line x1="325" y1="85" x2="325" y2="400" stroke="#9bb5c9" stroke-dasharray="7 6"/><text x="255" y="78" font-size="13">reference IVC</text><line x1="285" y1="85" x2="285" y2="400" stroke="#c0a56a" stroke-dasharray="7 6"/><text x="205" y="120" font-size="13">earlier IVC / Miller</text></svg><figcaption>Qualitative early-intake-valve-closing concept. The engineering task is to balance effective compression, trapped air, pumping, turbo work and emissions.</figcaption></figure>

Important events are IVO, IVC, EVO and EVC.

# 2. Early intake valve closing and Miller operation

Early IVC closes the intake valve before the piston completes the intake stroke.

The trapped charge can expand before compression begins.

Potential effects include lower effective compression temperature and more Pmax/NOx margin, but also less trapped charge.

# 3. Turbo and EGR must be re-matched

If earlier IVC reduces cylinder filling, boost may need to rise.

That can change VGT position, compressor point, turbine pressure ratio, exhaust pressure and EGR authority.

Valve timing, turbo, EGR and injection should therefore be treated as one gas-exchange calibration.

# 4. Effective compression

The geometric compression ratio is fixed by hardware, but the effective compression process changes because the trapped mass is defined by valve closing.

# 5. Exhaust valve opening

Earlier EVO gives up some expansion work but increases blowdown/exhaust energy available to the turbine.

Later EVO can recover more expansion work but reduce turbine drive.

# 6. Fixed versus variable timing

Some engines use fixed optimized cam timing; others may have variable mechanisms.

Do not assume a software-controlled VVT actuator exists.

# 7. HD13-E point C

At 1200 rpm cruise, suppose earlier IVC reduces trapped mass by 5% at the same manifold pressure.

The air system can recover mass by increasing boost, but that can raise pumping/turbo cost.

Compare at the same brake torque:

- BSFC;
- PMEP;
- NOx;
- Pmax;
- turbo efficiency;
- EGR authority.

# 8. Calibration execution

## Objective

Minimize system fuel use while maintaining charge, emissions, pressure and turbo margins.

## Map coordinates

```text
engine speed × BMEP
```

## Fixed variables during comparison

Same fuel, brake torque and thermal state.

## Sweep variables

Where hardware permits: valve timing; otherwise boost/VGT, EGR and SOI around the fixed timing.

## Signals to log

```text
air mass
manifold / exhaust pressure
EGR or intake O2
turbo speed
compressor efficiency
CA50
Pmax / MPRR
BSFC
NOx / smoke
```

## Validation

Low-speed full torque, cruise, rated power, altitude, hot charge air and tip-in.

# 9. Senior calibration deep dive — trapped mass and residuals

A useful gas-exchange analysis separates:

- fresh trapped air;
- retained residual gas;
- recirculated EGR.

Cylinder charge is therefore more than manifold pressure.

Where cylinder-pressure and air-flow measurements support it, estimate trapped mass and residual fraction through a gas-exchange model.

## Miller versus compression temperature

Earlier IVC can lower effective compression temperature.

That can lengthen ignition delay unless other conditions compensate.

Therefore changing valve timing can require a new:

- pilot strategy;
- main SOI;
- EGR target.

## EVO optimization

At high power, compare EVO candidates by splitting the consequence:

```text
earlier EVO
→ expansion work down
→ exhaust enthalpy up
→ turbine drive up

later EVO
→ expansion work up
→ exhaust enthalpy down
```

The correct point minimizes total fuel for the required torque while preserving turbo and thermal margins.

## Hardware freeze implication

If cam timing is fixed before final calibration, record it as a configuration-controlled hardware input.

A later cam-profile change should automatically trigger revalidation of air, EGR, turbo, combustion and aftertreatment maps.

# 10. Gas-exchange work from the pressure trace

The low-pressure part of the cylinder pressure-volume loop reveals pumping work.

A valve-timing change should therefore be evaluated with both:

- high-pressure indicated work;
- low-pressure gas-exchange loop.

A candidate that improves combustion efficiency but increases pumping loss can deliver little or no brake-efficiency gain.

# 11. Intake-valve-closing sensitivity

When IVC is moved earlier:

```text
trapped mass may fall
effective compression temperature may fall
boost demand may rise
```

When IVC is moved later, some charge can be pushed back toward the intake during early compression depending on the architecture.

Both EIVC and LIVC can create Miller-type behavior, but they have different gas-dynamic consequences.

# 12. Calibration with fixed hardware timing

If cam timing is fixed, use the article as a **hardware-selection and calibration-validation** workflow:

1. compare candidate cam profiles on development hardware;
2. select the hardware timing;
3. freeze configuration;
4. optimize boost/EGR/injection around it;
5. validate the complete speed-load map.

This avoids giving the false impression that every production ECU can sweep valve timing in software.

# 13. Common mistakes

- Treating Miller timing as an isolated combustion feature.
- Recovering lost air with boost without counting pumping cost.
- Assuming every engine has variable valve timing.
- Comparing at different brake torque.
- Validating only the cruise point.

# 14. Key lessons

1. Valve timing defines the gas-exchange boundary.
2. Miller operation changes effective compression and trapped charge together.
3. Turbo, EGR and injection must be re-optimized around valve timing.
4. EVO trades expansion work against turbine energy.
5. The optimum is a whole-engine result.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — combustion, gas exchange and engine performance fundamentals.</li>
<li>L. Guzzella and C. H. Onder, <em>Introduction to Modeling and Control of Internal Combustion Engine Systems</em>, 2nd ed. — torque-based control, air-path control and model-based diesel control.</li>
<li><a href="https://www.daf.com/en/news-and-media/news-articles/global/2024/new-generation-daf-trucks-powering-customer-success">DAF Trucks, 2024 public powertrain update</a> — example combining Miller valve timing, updated turbo/EGR, dual-drive coolant pump, clutched air compressor, new injectors and downspeeding.</li>
</ol>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
