<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Performance, Emissions & Calibration · 2026 Committee Edition</div><h1>Parasitic Losses, Smart Pumps, Air Compressor and Auxiliary Calibration</h1><p><em>How pumps, fan, compressed-air generation and electrical loads consume engine power and how demand control recovers efficiency</em></p></div>
<div class="publication-note"><strong>Scope:</strong> OEM-neutral heavy-duty diesel calibration for truck, bus and comparable vehicle applications. Worked numerical values are illustrative unless tied to a cited public regulation or product source.</div>
<div class="view-controls"><strong>Reading mode:</strong> <button onclick="setMode('simple')">Simple view</button> <button onclick="setMode('detailed')">Detailed view</button> <span id="mode-label">Practical notes visible</span></div>

# 1. Not all fuel loss is combustion inefficiency

Useful brake power is reduced by friction, pumping and auxiliary demand.

<figure class="figure-card"><svg viewBox="0 0 820 500" role="img" aria-label="Engine auxiliary losses"><rect width="820" height="500" fill="white"/><g font-family="Arial" text-anchor="middle" fill="#17324a" font-size="14"><rect x="285" y="25" width="250" height="60" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="60">Indicated engine power</text><rect x="285" y="420" width="250" height="60" rx="9" fill="#eef4f8" stroke="#5d87ad"/><text x="410" y="455">Useful brake power</text><rect x="35" y="160" width="145" height="60" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="108" y="195">Friction</text><rect x="205" y="160" width="145" height="60" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="278" y="195">Pumping</text><rect x="375" y="160" width="145" height="60" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="448" y="195">Coolant / oil pumps</text><rect x="545" y="160" width="145" height="60" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="618" y="188">Air compressor /</text><text x="618" y="207">alternator</text><rect x="290" y="285" width="240" height="60" rx="9" fill="#f8fafc" stroke="#9bb5c9"/><text x="410" y="312">Fan / HVAC /</text><text x="410" y="332">other auxiliaries</text></g></svg><figcaption>Useful brake power is reduced by friction, pumping and several engine/vehicle auxiliaries. Demand-controlled systems can recover efficiency if their thermal and functional constraints are respected.</figcaption></figure>

A useful bookkeeping equation is:

$$
P_b=P_i-P_{friction}-P_{pumping}-P_{aux,mech}
$$

# 2. Coolant and oil pumps

Demand-controlled pump strategies can reduce parasitic work when full flow or pressure is not required.

Calibration must preserve coolant, bearing and piston thermal limits.

# 3. Air compressor

Heavy trucks use compressed air for braking and other systems.

A clutched or demand-controlled compressor can reduce torque load when pressure is sufficient.

The engine torque model should know when the compressor is engaged.

# 4. Cooling fan

For similar operating conditions, fan power approximately follows:

$$
P_{fan}\propto N_{fan}^3
$$

Small speed reductions can save meaningful power, but hotter coolant or charge air can reduce torque and emissions margin.

# 5. Alternator and electrical loads

Mechanical power required for electrical generation is approximately:

$$
P_{mech,alt}\approx\frac{P_{elec}}{\eta_{alt}}
$$

Electrical aftertreatment heating must therefore be counted in the vehicle energy balance.

# 6. HD13-E example

At a 220-kW cruise condition, suppose listed auxiliary loads total 9 kW.

A 2-kW auxiliary saving is nearly 1% of brake power and can be comparable with a difficult combustion optimization.

# 7. Calibration execution

## Objective

Minimize parasitic power while maintaining thermal, lubrication, pneumatic and electrical requirements.

## Calibration objects

- coolant-pump command;
- oil-pressure target;
- fan target;
- compressor clutch/enable;
- alternator/load management.

## Signals to log

```text
fuel flow / brake torque
fan speed and power
coolant pump command
oil pressure
air-system pressure
compressor state
alternator current/voltage
coolant / oil / charge-air temperature
```

## Validation

Hot ambient, hill climb, low-speed high torque, long idle, repeated air-brake demand, high electrical load and aftertreatment-heater operation.

# 8. Senior calibration deep dive — auxiliary optimization as a supervisory problem

Auxiliaries often have stored-state variables:

```text
coolant temperature
air-tank pressure
battery state of charge
oil temperature
```

This allows temporary postponement of power demand.

Example:

- delay air-compressor loading during a gear shift or hard acceleration if pressure reserve is adequate;
- run the compressor later in a more efficient engine region.

This is an energy-management problem, not only an ON/OFF threshold.

## Fan calibration

Use a fan target based on predicted thermal demand rather than only current coolant temperature.

Aggressive fan action can:

- increase fuel use;
- cool the charge excessively;
- create noise.

Too-late fan action can force a larger engine torque derate.

## Measurement

Where direct auxiliary torque is unavailable, infer the effect through controlled A/B tests at identical engine/thermal state and verify that the fuel-flow change exceeds test uncertainty.

# 9. Air-system energy management example

Suppose the pneumatic reservoir is near its upper pressure target before a long grade.

The controller can choose to disengage the air compressor during the high-fuel-demand climb and refill later during:

- lower road load;
- overrun;
- engine-brake operation.

The possible fuel benefit must be balanced against minimum safe pneumatic pressure.

# 10. Coolant-pump strategy

At low load, reduced coolant flow can:

- reduce pump work;
- accelerate warm-up.

At high load, insufficient flow can create local head/liner temperature problems even if bulk coolant temperature looks acceptable.

Calibration should therefore respect component-temperature models, not only coolant outlet temperature.

# 11. Alternator scheduling

Where the electrical architecture permits limited energy buffering, alternator load can sometimes be shifted away from high-demand acceleration.

The engine torque model must still include the actual alternator mechanical load at every moment.

# 12. Whole-system verification

For every auxiliary optimization report:

```text
fuel saved
temperature/pressure impact
torque-model impact
noise impact
failure fallback
```

A component-level efficiency claim without these checks is incomplete.

# 13. Common mistakes

- Hiding auxiliary loads inside a generic friction map.
- Running maximum fan or pump speed everywhere.
- Ignoring air-compressor engagement in torque estimation.
- Claiming an engine BSFC gain that is offset by higher fan/electrical demand.
- Optimizing auxiliaries independently.

# 14. Key lessons

1. Auxiliaries can consume several percent of useful power.
2. Demand-controlled pumps, fans and compressors can recover efficiency.
3. Auxiliary state belongs in torque and fuel-consumption interpretation.
4. Lowest component power is not always lowest vehicle fuel use.
5. Modern heavy-duty efficiency packages optimize combustion and auxiliaries together.

# References

<ol class="refs">
<li>J. B. Heywood, <em>Internal Combustion Engine Fundamentals</em>, 2nd ed. — combustion, gas exchange and engine performance fundamentals.</li>
<li><a href="https://www.daf.com/en/news-and-media/news-articles/global/2024/new-generation-daf-trucks-powering-customer-success">DAF Trucks, 2024 public powertrain update</a> — example combining Miller valve timing, updated turbo/EGR, dual-drive coolant pump, clutched air compressor, new injectors and downspeeding.</li>
</ol>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
