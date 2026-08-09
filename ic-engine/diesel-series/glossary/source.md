<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Series · Committee Edition</div><h1>Glossary, Symbols and HD13-E Reference Points</h1></div>
<p><a href="../">← Back to series overview</a></p>


# Notation

| Symbol | Meaning |
|---|---|
| $n_e$ | engine speed |
| $T_e$ | engine torque |
| $P_b$ | brake power |
| $V_d$ | engine displacement |
| $\dot m_f$ | fuel mass flow |
| $\dot m_{air}$ | fresh-air mass flow |
| $\lambda$ | global excess-air ratio |
| $p_{int}$ | intake/manifold absolute pressure |
| $p_{exh}$ | exhaust-manifold absolute pressure |
| $P_{max}$ | peak cylinder pressure |
| $d p/d\theta$ | cylinder pressure-rise rate |

# Performance terms

**BMEP — Brake Mean Effective Pressure**  
Torque normalized by displacement. Useful for comparing engine loading between different displacements.

**IMEP — Indicated Mean Effective Pressure**  
Cylinder-pressure-derived work normalized by displacement. State whether gross or net.

**PMEP — Pumping Mean Effective Pressure**  
Gas-exchange pumping work. In this series, `PMEP_loss` is used as a positive loss magnitude where helpful.

**FMEP — Friction Mean Effective Pressure**  
Mechanical/friction loss between net indicated work and brake work.

**BSFC — Brake-Specific Fuel Consumption**  
Fuel mass flow divided by brake power, typically g/kWh.

**BTE — Brake Thermal Efficiency**  
Brake power divided by fuel chemical power.

# Combustion and injection

**SOI — Start of Injection**  
Physical/hydraulic beginning of fuel injection. Do not automatically equate with start of electrical energizing.

**SOC — Start of Combustion**  
Beginning of measurable combustion/heat release.

**Ignition delay**  
Crank-angle or time interval between SOI and SOC.

**CA10 / CA50 / CA90**  
Crank angle where 10%, 50% and 90% of cumulative apparent heat release has occurred.

**Pmax**  
Maximum cylinder pressure in a cycle.

**MPRR — Maximum Pressure-Rise Rate**  
Maximum $dp/d\theta$; relevant to combustion harshness, structure and low-speed lugging.

**Pilot / main / post injection**  
Separate fuel events used respectively for combustion shaping, primary torque production and—where appropriate—thermal/aftertreatment management.

# Air and gas exchange

**VGT — Variable-Geometry Turbine**  
Turbocharger turbine with controllable effective flow area.

**EGR — Exhaust Gas Recirculation**  
Recirculated exhaust used mainly to influence oxygen concentration and combustion temperature.

**IVO / IVC / EVO / EVC**  
Intake valve opening/closing and exhaust valve opening/closing.

**Miller timing**  
Valve-timing strategy that changes the effective compression process, commonly through early or late intake-valve closing.

**CAC — Charge-Air Cooler**  
Heat exchanger used to reduce compressed-air temperature.

# Aftertreatment

**DOC — Diesel Oxidation Catalyst**

**DPF — Diesel Particulate Filter**

**SCR — Selective Catalytic Reduction**

**ASC — Ammonia-Slip Catalyst**

**DEF — Diesel Exhaust Fluid**  
Aqueous urea solution used to generate ammonia for SCR.

**ANR — Ammonia-to-NOx Ratio**  
A normalized dosing concept; exact species/mass basis must be documented.

**Soot versus ash**  
Soot is combustible particulate material that can be oxidized; ash is non-combustible service-life residue and is not removed by normal regeneration.

# Vehicle, regulation and validation

**PTO — Power Take-Off**

**WHTC — World Harmonized Transient Cycle**

**WHSC — World Harmonized Steady-State Cycle**

**RDE — Real Driving Emissions**

**PEMS — Portable Emissions Measurement System**

**OBD — On-Board Diagnostics**

**OBM — On-Board Monitoring**

**VECTO — Vehicle Energy Consumption calculation TOol**  
European Commission heavy-duty vehicle simulation framework for fuel consumption and CO₂.

# HD13-E recurring points

| Point | Operating point | Main use in the series |
|---|---|---|
| A | 700 rpm, low load | idle / urban / thermal management |
| B | 1000 rpm, high torque | downspeeding / smoke / lugging |
| C | 1200 rpm, medium-high load | cruise / BSFC optimization |
| D | 1600 rpm, high power | thermal / turbo / full-load capability |
| E | 1800 rpm, negative torque | engine braking |

