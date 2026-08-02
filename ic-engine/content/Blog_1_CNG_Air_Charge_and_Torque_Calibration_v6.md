# CNG Air-Charge and Torque Calibration

*A practical guide to torque structure, charge calculation, test-bed calibration, and INCA map filling*

Modern spark-ignition engine control begins with **torque**, not throttle angle. The driver asks for acceleration through the pedal, the ECU converts that request into a permitted crankshaft torque, and the air path, fuel path and ignition system work together to deliver it. This article explains that chain in a CNG-focused context and then shows how the calibration engineer implements it on the test bed.

The primary fuel used here is **compressed natural gas (CNG)**. Gasoline is treated as a separate conversion case later in the article so that the main explanation remains clear and technically consistent.

The control architecture and several analytical relationships in this article are grounded in *Introduction to Modeling and Control of Internal Combustion Engine Systems* by Lino Guzzella and Christopher H. Onder. The diagrams used here are **redrawn and adapted**, not copied. The practical INCA workflow and test-bed guidance are presented in an OEM-style calibration format for publication.

> **Scope of this article:** four-stroke, torque-based, stoichiometric spark-ignition engines, with CNG as the primary fuel and port fuel injection used for the main examples. The same logic also applies to gasoline engines, while direct injection, lean burn and pre-chamber systems require additional fuel- and combustion-specific models.

# 1. Why an engine ECU starts with torque

A driver feels acceleration, not throttle angle or milligrams of air.
The transmission, cruise controller, traction system and idle controller
also communicate most naturally in torque. Modern engine management
therefore uses torque as a common language. The ECU first decides how
much crankshaft torque is permitted and only then calculates the air,
fuel and spark needed to produce it.

This is different from an older cable-throttle system. In a torque-based
ECU, 40% pedal does not mean 40% throttle. The same pedal position can
produce different throttle, boost and spark commands depending on engine
speed, gear, temperature, traction limits, fuel mode and component
protection.

![CNG-focused torque-based engine control architecture](assets/air_torque_architecture.svg)

*Figure 1. CNG-focused torque-based engine-control architecture. Redrawn and adapted from Guzzella and Onder [1, Figs. 4.3-4.4, p. 195]. The CNG fuel-quality, gaseous-injection and charge-feedback blocks are additions made for this article.*

# 2. The quantities that must not be confused

## 2.1 Fresh-air charge, total charge and load

Fresh-air charge is the mass of oxygen-containing fresh air trapped in
one cylinder for one combustion event. Production ECUs commonly express
it in mg/stroke, mg/combustion or a normalized load variable. Total
in-cylinder charge is larger because it can also include CNG fuel,
residual exhaust gas and externally recirculated exhaust gas.

m_total = m_fresh air + m_CNG + m_residual + m_EGR

Fuel calculation needs fresh-air mass. Combustion, knock and
residual-gas models may need the complete trapped composition. A
calibration engineer must check which quantity a software label
represents before changing a map.

## 2.2 CNG air-fuel ratio and lambda

Lambda compares the actual air-fuel ratio with the stoichiometric
air-fuel ratio of the current fuel. A lambda of 1 means that the mixture
contains the chemically required air for complete combustion. Commercial
natural gas is not pure methane, so the exact stoichiometric ratio and
heating value depend on composition. For educational calculations, a
methane-like stoichiometric ratio of about 17.2 kg air per kg fuel is
often used.

lambda = AFR_actual / AFR_stoichiometric

m_CNG = m_air / (lambda × AFR_stoichiometric)

In production calibration, the ECU should use the project-approved gas-quality model or certified reference-gas data. A fixed value such as 17.2 is useful for learning and for quick plausibility checks, but it is not a universal commercial-CNG constant.

## 2.3 Brake torque, indicated torque and loss torque

Brake torque is the useful crankshaft torque measured by the
dynamometer. Indicated or internal torque is produced by cylinder
pressure before mechanical, pumping and accessory losses are removed.

T_brake = T_indicated − T_friction − T_pumping − T_auxiliary

T_indicated,request = T_brake,request + T_losses

At high load, a loss error of a few newton-metres may be a small
percentage of total torque. At idle or cold operation, the same error
can dominate the torque estimate. This is why friction calibration is a
prerequisite rather than an optional correction.

## 2.4 Torque, work and mean effective pressure

For a four-stroke engine, one complete engine cycle takes two crankshaft
revolutions. The indicated work produced over that cycle is related to
indicated torque by:

W_indicated,cycle = 4π × T_indicated

Indicated mean effective pressure, or IMEP, expresses the same work
independently of engine displacement:

IMEP = 4π × T_indicated / V_displacement

IMEP is useful because it lets engineers compare engines of different
sizes. It also connects cylinder-pressure analysis with torque-model
calibration.

# 3. The torque structure step by step

## 3.1 Torque requests and arbitration

The driver is only one torque requester. At the same instant, the ECU
may receive a positive request from the idle controller and limiting
requests from the transmission, traction control, engine-speed limiter
or thermal protection. Torque coordination selects a final permitted
request according to priority, minimum/maximum arbitration and rate
limits.

**Table 1. Torque requests are coordinated before the air path is
calculated.**

| **Source**         | **Typical role**                | **Example**                  |
|--------------------|---------------------------------|------------------------------|
| Driver pedal       | Positive demand                 | Request 140 Nm               |
| Idle controller    | Positive or negative correction | Add 4 Nm for A/C load        |
| Transmission       | Temporary upper limit           | Limit to 110 Nm during shift |
| Traction/ESP       | Fast upper limit                | Limit to 80 Nm on wheel slip |
| Thermal protection | Sustainable upper limit         | Limit charge or boost        |

## 3.2 From requested brake torque to requested internal torque

Assume the coordinated crankshaft request is 120 Nm and the model
predicts 22 Nm of total losses. The combustion system must produce 142
Nm internally:

T_indicated,request = 120 + 22 = 142 Nm

The loss model can contain separate maps for friction, pumping and
auxiliaries, or one combined loss-torque structure. Temperature,
manifold pressure, exhaust pressure, cam timing and accessory status can
all matter.

## 3.3 Potential torque and efficiency corrections

The same cylinder air charge can produce different torque depending on
ignition timing, lambda, residual gas and combustion quality. Many ECUs
therefore define potential or optimal torque: the torque available from
the current charge at reference combustion conditions. Actual internal
torque is then estimated using efficiency factors or additive
corrections.

T_indicated,actual = T_potential × η_spark × η_lambda × η_combustion

If the internal request is 142 Nm but the planned spark timing produces
a spark efficiency of 0.94, the air path must create enough potential
torque to survive that reduction:

T_potential,required = 142 / 0.94 = 151.1 Nm

In production software, some ECU concepts use multiplicative efficiencies, while others use additive torque losses, normalized torque or indicated work. The calibration engineer must therefore follow the implemented function rather than forcing a preferred textbook equation onto the software.

## 3.4 Forward and inverse torque models

The forward model estimates torque from speed, air charge and combustion
conditions. The inverse model performs the control task in the opposite
direction: it calculates the air charge required for a requested
potential torque.

Forward model: T_potential = f(n_engine, m_air,cyl, cam positions, fuel
mode)

Inverse model: m_air,cyl,desired = f⁻¹(n_engine, T_potential,required)

The forward map must be physically ordered: at a fixed speed, more
fresh-air charge should not produce less potential torque unless a
clearly modelled mode transition explains it. Non-monotonic data can
make the inverse map ambiguous and produce charge-request jumps.

## 3.5 Follow one driver request from the pedal to the cylinder

The easiest way to understand a torque-based ECU is to follow one real driving event rather than beginning with an abstract equation.

Imagine that the vehicle is travelling at **2500 rpm** and the driver wants stronger acceleration. The driver presses the accelerator pedal from 30% to 60%. The ECU does not interpret this as “open the throttle to 60%.” It interprets it as a request for more engine torque.

![Driver request to desired cylinder air charge](assets/pedal_to_charge_sequence.svg)

*Figure 2. Driver request to desired cylinder air charge. Redrawn and expanded from the torque-demand and torque-conversion architecture described by Guzzella and Onder [1, Figs. 4.3-4.4, p. 195]. The numerical values and the explicit CNG, spark-efficiency and charge-control steps are additions made for this article.*

### Step 1 — The pedal map creates the raw driver-wish torque

The accelerator-pedal sensors report the pedal position. A driver-wish or pedal characteristic map then converts pedal position and **current engine speed** into a raw torque request:

\[
T_{driver,raw}=f_{pedal}(\alpha_{pedal},n_{engine},\text{drive mode})
\]

For example:

- pedal position: 60%;
- current engine speed: 2500 rpm;
- selected driving mode: Normal;
- raw driver-wish torque from the pedal map: 150 Nm.

This 150 Nm is the torque the driver would like before other vehicle and engine limits are considered. It is better to call it **raw driver-wish torque** or **unlimited driver request**. The term *indicated torque* should not be used here because indicated torque has a different physical meaning: it is the torque produced inside the cylinders before friction and pumping losses.

The pedal map normally uses the *current measured engine speed*, not a “required rpm.” In a fixed gear, the driver requests acceleration while engine speed evolves with vehicle speed. A transmission, hybrid controller or speed controller may separately determine a target speed, but that is a different control function.

### Step 2 — Torque coordination decides what is actually permitted

The raw driver request is only one input to the torque-demand manager. The ECU also considers:

- transmission torque limits during a shift;
- traction or stability-control limits;
- engine-speed and vehicle-speed limits;
- maximum available torque at the current speed;
- CNG rail-pressure and injector-duration capability;
- boost, turbo-speed, exhaust-temperature and cylinder-pressure limits;
- knock, catalyst and component-protection limits;
- torque-gradient limits used for drivability.

Assume the pedal map requests 150 Nm, but the transmission and thermal limits permit only 120 Nm. The coordinated brake-torque request becomes:

\[
T_{b,req}=120\;\text{Nm}
\]

This is the first torque value that the downstream engine torque-conversion system should try to realise. This two-layer structure mirrors the source architecture, which separates strategic torque-demand coordination from the lower-level torque-conversion manager that generates actuator commands [1].

### Step 3 — Convert requested brake torque into requested internal torque

The driver receives brake torque at the crankshaft, but combustion must also overcome friction, pumping and accessory losses. Therefore:

\[
T_{internal,req}=T_{b,req}+T_{loss}
\]

If the loss model predicts 17.9 Nm at this operating condition:

\[
T_{internal,req}=120+17.9=137.9\;\text{Nm}
\]

The loss value is not a universal constant. It can depend on engine speed, coolant and oil temperature, manifold pressure, exhaust backpressure, cam timing, alternator load, pump demand and air-conditioning status.

### Step 4 — Decide how the torque will be produced

The ECU now decides how much of the requested torque should come from the slow air path and how much should be shaped by the fast path.

The slow path changes the trapped fresh-air charge using throttle, boost and valve timing. It is efficient and sustainable, but it cannot change instantaneously because the intake manifold and turbocharger have dynamics.

The fast path changes combustion torque mainly through ignition timing. Spark timing can affect the next firing event, but continuous retard lowers efficiency and increases exhaust temperature. For this reason, spark is used for fast correction, gearshift intervention, idle control and torque reserve, while air remains the main sustainable torque actuator.

Before the final air charge can be calculated, the ECU establishes the **planned combustion state**, including:

- reference or MBT spark timing;
- the permitted spark after the knock limit is considered;
- any deliberate spark retard used for torque reserve;
- lambda target;
- residual-gas or EGR influence;
- catalyst-heating, thermal or transmission interventions.

### Step 5 — Convert planned ignition timing into spark efficiency

Spark efficiency describes how much internal torque remains at the planned ignition angle compared with a defined reference, commonly MBT or another optimal reference angle:

\[
\eta_{spark}=\frac{T_{internal,planned\ spark}}{T_{potential,reference\ spark}}
\]

Suppose the reference timing could produce 100% of the potential torque, but the final planned timing produces 94%:

\[
\eta_{spark}=0.94
\]

If lambda and the other combustion corrections are at their reference values, the required potential torque is:

\[
T_{potential,req}=\frac{T_{internal,req}}{\eta_{spark}}
=\frac{137.9}{0.94}=146.7\;\text{Nm}
\]

The air path must therefore provide enough charge for 146.7 Nm of potential internal torque. Spark retard then reduces this potential torque to the requested 137.9 Nm internal torque, leaving 120 Nm at the crankshaft after losses.

### Step 6 — Invert the torque model to obtain desired fresh-air charge

The calibrated forward torque model answers:

> At 2500 rpm, how much potential torque can this engine produce from a given fresh-air charge?

The inverse torque model answers the control question:

> At 2500 rpm, how much fresh-air charge is required for 146.7 Nm of potential torque?

Assume the calibrated forward map contains:

| Fresh-air charge | Potential internal torque |
|---:|---:|
| 380 mg/cylinder event | 140 Nm |
| 430 mg/cylinder event | 155 Nm |

Linear inversion gives:

\[
m_{air,des}=380+\frac{146.7-140}{155-140}(430-380)
=402\;\text{mg/cylinder event}
\]

This **402 mg/event** is the desired fresh-air charge. It is not yet a throttle angle.

### Step 7 — Convert desired charge into air, fuel and spark commands

The charge controller converts 402 mg/event into a manifold-pressure or airflow target. It then coordinates throttle effective area, wastegate or other boosting device, and intake/exhaust cam timing.

For stoichiometric methane-like CNG with an illustrative stoichiometric AFR of 17.2:

\[
m_{CNG,des}=\frac{402}{1.00\times17.2}=23.4\;\text{mg/cylinder event}
\]

The CNG injection model converts this fuel mass into injector duration using upstream gas pressure, manifold pressure, gas temperature, injector characteristics and fuel composition. The ignition controller applies the planned spark timing, including the base timing and all corrections.

### Step 8 — Estimate the delivered torque and close the control loop

After the cylinders receive air, CNG and spark, the ECU estimates actual internal and brake torque using measured or modelled charge, lambda, spark efficiency and losses. This estimated torque is reported to the transmission, traction controller and diagnostic functions.

The complete causal story is therefore:

```text
pedal movement
    -> raw driver-wish torque
    -> permitted brake-torque request
    -> required internal torque
    -> planned spark/lambda efficiency
    -> required potential torque
    -> desired fresh-air charge
    -> throttle/boost/VVT + CNG injection + spark
    -> estimated and delivered brake torque
```

## 3.6 A necessary refinement: air and ignition are coupled

Your proposed logic is conceptually close, but the phrase “the ECU first calculates the final air and then checks ignition timing” is not fully correct for a torque-based structure.

The final required air depends on spark efficiency. At the same speed and air charge, retarded spark produces less torque than MBT spark. Therefore, when the planned spark is retarded, the ECU must request more potential torque and normally more air to deliver the same brake torque.

At the same time, the nominal spark and knock limit are often indexed by speed and load or air charge. This creates a coupling:

```text
desired torque influences charge
charge defines load
load influences nominal/knock-limited spark
spark efficiency changes the charge required for the desired torque
```

Production software resolves this in one of two common conceptual ways:

1. **Reference-torque approach.** The ECU determines the planned combustion efficiencies, converts requested internal torque into required potential torque, and then uses the inverse torque map to calculate charge.
2. **Preliminary-charge approach.** The ECU calculates an initial charge at reference spark, looks up the load-dependent spark timing and efficiency, and then corrects the charge request. The software can perform this through scheduled maps, algebraic restructuring or a limited internal iteration.

The calibration engineer does not need to assume that every ECU literally runs a numerical iterative solver. The important physical requirement is that the final charge request and the planned spark efficiency are mutually consistent.

## 3.7 Slow air path, fast spark path and torque reserve

Throttle, boost and valve timing change trapped air and therefore provide efficient, sustainable torque control. They are relatively slow because air must travel through the intake system and manifold. Spark can change torque on the next firing event and is therefore the fast path, but sustained spark retard wastes fuel energy as exhaust heat.

Torque reserve intentionally commands slightly more air-based potential torque than the driver currently receives, then removes the excess with spark retard. When a rapid positive torque correction is required, the ECU can advance spark immediately while the slower air path catches up.

# 4. Complete worked example: from pedal movement to desired CNG charge

The following example uses the same story from beginning to end. The main calculation follows the production torque structure first. A second calculation then checks the result using mean effective pressure and fuel energy. All values are representative worked-example values used to explain the control path.

**Table 2. Assumptions for the worked example**

| Input | Value |
|---|---:|
| Engine | 1.5 L, four-cylinder, four-stroke, stoichiometric PFI CNG |
| Current engine speed | 2500 rpm |
| Pedal position | 60% |
| Raw torque from pedal map | 150 Nm |
| Final permitted brake-torque request | 120 Nm |
| Modelled loss torque | 17.9 Nm |
| Planned spark efficiency | 0.94 |
| Lambda efficiency | 1.00 |
| Lambda | 1.00 |
| Illustrative CNG stoichiometric AFR | 17.2 kg air/kg fuel |
| Illustrative CNG lower heating value | 50 MJ/kg |

## 4.1 Production ECU path — pedal map, torque coordination and inverse model

### 4.1.1 Pedal map

At 60% pedal and 2500 rpm, the driver-wish map returns:

\[
T_{driver,raw}=150\;\text{Nm}
\]

This value represents the driver’s request before limits.

### 4.1.2 Torque coordination

Assume the applicable torque limits reduce the request to:

\[
T_{b,req}=120\;\text{Nm}
\]

The driver asked for 150 Nm, but the engine torque-conversion path receives 120 Nm because that is the permitted request.

### 4.1.3 Add loss torque

\[
T_{internal,req}=120+17.9=137.9\;\text{Nm}
\]

### 4.1.4 Calculate required potential torque from spark efficiency

With planned spark efficiency of 0.94:

\[
T_{potential,req}=\frac{137.9}{0.94}=146.7\;\text{Nm}
\]

This is the torque the selected air charge would produce at the reference spark condition used by the potential-torque map.

### 4.1.5 Invert the calibrated torque map

Using the illustrative forward-map points:

| Fresh-air charge | Potential internal torque |
|---:|---:|
| 380 mg/event | 140 Nm |
| 430 mg/event | 155 Nm |

\[
m_{air,des}=380+\frac{146.7-140}{155-140}(430-380)
=402\;\text{mg/event}
\]

### 4.1.6 Calculate CNG mass and engine airflow

At \(\lambda=1\) and \(AFR_{st}=17.2\):

\[
m_{CNG,des}=\frac{402}{17.2}=23.4\;\text{mg/event}
\]

For a four-cylinder, four-stroke engine:

\[
\dot m_{air}=\frac{402\times4\times2500}{120\times1000}
=33.5\;\text{g/s}
\]

\[
\dot m_{CNG}=\frac{23.4\times4\times2500}{120\times1000}
=1.95\;\text{g/s}
\]

The production control result is therefore approximately:

- desired fresh-air charge: **402 mg/cylinder event**;
- total fresh-air flow: **33.5 g/s**;
- desired CNG mass: **23.4 mg/cylinder event**;
- total CNG flow: **1.95 g/s**.

## 4.2 Engineering cross-check — torque, BMEP, fuel energy and air

The inverse torque map is the production control element. An analytical calculation is still valuable because it reveals unit errors and physically impossible calibration values.

### 4.2.1 Convert requested brake torque to BMEP

For a four-stroke engine:

\[
p_{me,b}=\frac{4\pi T_{b,req}}{V_d}
\]

\[
p_{me,b}=\frac{4\pi\times120}{0.0015}
=1.005\times10^6\;\text{Pa}=10.05\;\text{bar}
\]

### 4.2.2 Express the loss torque as loss MEP

\[
p_{me,loss}=\frac{4\pi T_{loss}}{V_d}
\]

\[
p_{me,loss}=\frac{4\pi\times17.9}{0.0015}
\approx1.50\;\text{bar}
\]

The gross internal requirement is therefore:

\[
p_{me,internal}=10.05+1.50=11.55\;\text{bar}
\]

### 4.2.3 Include nominal conversion and spark efficiency

Using a simplified Willans-style relationship:

\[
p_{me,b}=e_0\,e_{\lambda}\,e_{spark}\,p_{m\phi}-p_{me,loss}
\]

Assume the illustrative nominal conversion coefficient is \(e_0=0.40\), \(e_{\lambda}=1.00\), and \(e_{spark}=0.94\):

\[
p_{m\phi,req}=\frac{11.55}{0.40\times1.00\times0.94}
=30.72\;\text{bar}
\]

Here \(e_0\) is the effective conversion coefficient used in this simplified model. It should not be confused automatically with the measured brake thermal efficiency at the operating point.

### 4.2.4 Convert fuel MEP into CNG mass

\[
m_{f,cycle}=\frac{p_{m\phi,req}V_d}{H_L}
\]

\[
m_{f,cycle}=\frac{30.72\times10^5\times0.0015}{50\times10^6}
=92.2\;\text{mg per complete engine cycle}
\]

For four cylinders:

\[
m_{f,cyl}=\frac{92.2}{4}=23.0\;\text{mg/event}
\]

### 4.2.5 Convert CNG mass into fresh-air charge

\[
m_{air,cyl}=\lambda\,AFR_{st}\,m_{f,cyl}
\]

\[
m_{air,cyl}=1.00\times17.2\times23.0
=396\;\text{mg/event}
\]

The analytical estimate of 396 mg/event is close to the calibrated inverse-map result of 402 mg/event. The small difference is expected because the calibrated engine map can include engine-specific effects that the simplified equation does not: residual gas, valve timing, CNG displacement, gas composition, heat transfer, non-linear combustion efficiency and measurement corrections.

### 4.2.6 Energy plausibility check

Brake power at 2500 rpm and 120 Nm is:

\[
P_b=2\pi\frac{2500}{60}\times120=31.4\;\text{kW}
\]

Using the analytical CNG flow of approximately 1.92 g/s:

\[
P_f=0.00192\times50\times10^6=96.0\;\text{kW}
\]

\[
\eta_b=\frac{31.4}{96.0}=32.7\%
\]

This value is plausible for the representative steady-state point. A result far outside a physically credible range would direct the calibration engineer to check units, loss torque, airflow, lambda, CNG composition, lower heating value and map interpolation before accepting the calibration.

## 4.3 Convert desired charge into actuator commands

The desired charge does **not** normally become a throttle angle directly. The air-path controller converts it into a manifold-pressure or airflow target, then coordinates:

- throttle effective area;
- wastegate, VGT or electric boosting command;
- intake and exhaust cam timing;
- external EGR, when fitted;
- transient feedforward and closed-loop charge correction.

The gas-injection controller separately converts the 23.4 mg/event fuel target into injector pulse width using gas rail pressure, manifold pressure, gas temperature, injector flow characteristics and the project gas-quality model.

The inverse torque model answers *how much charge is required*. The air-path and gas-injection controllers answer *how the hardware will create that charge and mixture*.

# 5. How cylinder air charge is estimated

## 5.1 MAF-based calculation

A reference or production mass-air-flow signal can be converted into
cylinder air charge using the four-stroke relationship:

m_air,cyl \[mg\] = ṁ_air \[g/s\] × 120 × 1000 / (n \[rpm\] × N_cyl)

At 33.5 g/s, 2500 rpm and four cylinders, the result is approximately
402 mg/stroke, matching the worked pedal-to-charge example. In transients, sensor transport delay and manifold
filling mean that air crossing the MAF sensor is not immediately the
same as air trapped in the cylinder.

## 5.2 Speed-density or filling model

A speed-density model starts from manifold pressure, manifold
temperature and cylinder volume, then corrects the ideal-gas estimate
with volumetric efficiency and gas-exchange effects:

m_air,cyl ≈ η_v × p_manifold × V_cylinder / (R_air × T_manifold)

Production models add intake/exhaust cam position, residual gas, EGR,
exhaust backpressure, pressure ratio, ambient pressure, pulsation,
reverse flow and temperature-wall effects. A single two-dimensional
volumetric-efficiency table is therefore a teaching model, not
necessarily the complete production structure.

## 5.3 Why CNG changes the filling problem

With port-injected CNG, gaseous fuel occupies intake-port and cylinder
volume. At the same manifold pressure and temperature, part of the
trapped gas volume is fuel rather than fresh air. Maximum fresh-air
charge can therefore be lower than in gasoline operation, particularly
at high CNG flow. The correction belongs in a CNG-specific displacement
or filling model, not automatically in the common gasoline base map.

CNG rail pressure and temperature also influence injector mass flow.
Poor gas-mass modelling can be mistaken for an air-charge error because
lambda feedback reacts to the combined air and fuel error.

# 6. Calibration dependencies before filling the air map

A reliable air map cannot be created by changing values until lambda
looks correct. Several measurements and submodels must already be
credible:

- **Sensor scaling and offsets.** Reference airflow, MAP, ambient
  pressure, manifold temperature, gas pressure and lambda must be
  checked.

- **Crank and cam synchronization.** The ECU must assign the correct
  valve and combustion event to each cylinder.

- **Injector characterization.** CNG mass flow, opening delay, closing
  delay, pressure ratio, gas density and minimum pulse width must be
  understood.

- **Loss torque model.** Torque conversion is unreliable if friction and
  pumping loss are wrong.

- **Actuator positions.** Throttle, cams and wastegate must reach
  commanded positions without hidden limits.

- **Boundary-condition control.** Coolant, oil, intake temperature,
  exhaust pressure and gas conditions must be stable.

# 7. Real test-bed and INCA workflow

![Repeating test-bed measurement, correction and validation loop](assets/testbed_loop_v2.svg)

*Figure 3. Real test-bed and INCA workflow for one calibration point. The diagram is redrawn for this article and summarizes the practical measurement–correction–validation loop used during map filling.*

## 7.1 Prepare the ECU project and dataset

The engineer loads the ECU software description, starting calibration
and hardware configuration into INCA. A protected reference dataset is
retained, while changes are made on a working page or working dataset.
Every session should have a traceable name, software version, engine
identifier, fuel batch and test-cell configuration.

The INCA experiment should show the target maps beside the measurement
signals needed to judge them. Typical measurement groups are operating
point, air model, fuel path, combustion, limits and test-bed reference
channels.

## 7.2 Define the calibration matrix

The map axes determine the required steady-state points. If a base
filling map uses engine speed and manifold pressure, the test plan
should target those breakpoints wherever physically possible. Off-grid
data are valuable for model fitting and validation, but a manual change
to one cell is difficult to interpret when four neighboring cells are
simultaneously active through interpolation.

**Table 3. Example planning matrix; actual limits are engine-specific**

| **Speed \[rpm]** | **MAP targets \[hPa]**      | **Notes**                                 |
|-------------------|------------------------------|-------------------------------------------|
| 1000              | 300, 400, 500, 600, 800, 950 | Idle/low-speed stability may limit points |
| 2000              | 300 to 1400                  | Turbo region begins where applicable      |
| 3000              | 300 to 1800                  | Thermal and knock limits monitored        |
| 5000              | 400 to achievable full load  | Airflow and turbo-speed limits            |

## 7.3 Establish controlled boundary conditions

The engineer fixes or records the variables that would otherwise change
the air model: coolant and oil temperature, intake temperature, lambda,
cam positions, purge, EGR, gas rail pressure, gas temperature and
exhaust backpressure. Safety protections remain active or are replaced
by independent test-cell protections.

Overspeed, overboost, oil-pressure, severe-knock and exhaust-temperature protection must not be disabled merely to hold a test point. If a development mode is used, it must be covered by an approved safety concept or replaced by an equivalent independent test-cell protection strategy.

## 7.4 Bring the engine to one map point

1\. Command engine speed with the dynamometer.

2\. Command load, manifold pressure or charge using the permitted test
mode.

3\. Command the reference cam positions and fuel mode.

4\. Wait until speed, pressure, airflow, lambda, temperatures, cam
positions and torque meet the stabilization criteria.

5\. Record a stable measurement window rather than one instantaneous
sample.

## 7.5 Calculate reference charge and model error

Assume the stable reference airflow is 24.0 g/s at 2000 rpm on a
four-cylinder engine. The reference charge is:

m_air,reference = 24.0 × 120 × 1000 / (2000 × 4) = 360 mg/stroke

If the ECU estimates 330 mg/stroke:

Relative error = (330 − 360)/360 × 100 = −8.33%

## 7.6 Correct the responsible map

Suppose the active calibration value is a nearly linear multiplier and
its current value is 0.720. A first correction estimate is:

K_new = K_old × m_reference/m_ECU = 0.720 × 360/330 = 0.785

The engineer enters 0.785 in the active INCA working-page cell, waits
for the result to stabilize and records the point again. If the new
estimate is 358 mg/stroke, the remaining error is −0.56%.

The ratio correction is valid only when the selected parameter directly and approximately linearly scales the model output. If base filling, cam correction, residual model and CNG displacement are all active, the engineer must identify the real source of the error before changing a map value.

## 7.7 Point acceptance and documentation

| **Recorded item**        | **Example**                                 |
|--------------------------|---------------------------------------------|
| Operating point          | 2000 rpm / 600 hPa / intake cam 10°         |
| Initial and final errors | −8.33% / −0.56%                             |
| Old and new calibration  | 0.720 / 0.785                               |
| Boundary conditions      | Lambda 1.000; coolant 90°C; gas rail stable |
| Quality flags            | No knock, no limit active, stable airflow   |
| File and dataset         | AC_2000_600_01.mf4; Air_CNG_V03             |

## 7.8 Complete the surface, then smooth

After the grid is measured, the engineer examines gradients and
interpolation. A local bump is not smoothed simply because it looks
unattractive. First check whether it is caused by a real gas-dynamic
effect, cam transition, measurement error, sensor pulsation, incorrect
boundary condition or wrong active map. Smoothing is an engineering
decision made after data quality is established.

## 7.9 Off-grid and transient validation

A map can match all breakpoints and still fail between them. Validation
therefore includes intermediate speed/load points, slow sweeps, rapid
tip-in/tip-out, cam transitions, boost build-up, gas-pressure changes,
hot and cold operation, altitude and gasoline/CNG switching. Desired
charge, estimated charge, reference charge, lambda and measured torque
must tell a consistent story.

# 8. Building the forward and inverse torque maps on the test bed

## 8.1 Reference torque and optimal spark

Once air charge and loss torque are credible, the engineer holds speed,
charge, lambda, cams and gas conditions, then performs a controlled
spark sweep. The minimum spark advance that gives essentially best
torque is recorded as MBT unless knock or a component limit is reached
first. Brake torque is converted to internal torque by adding calibrated
losses.

| **Spark timing** | **Brake torque** | **Interpretation** |
|------------------|------------------|--------------------|
| 10° BTDC         | 88 Nm            | Retarded           |
| 14° BTDC         | 96 Nm            | Torque increasing  |
| 18° BTDC         | 100 Nm           | Near best torque   |
| 20° BTDC         | 100.5 Nm         | Illustrative MBT   |
| 22° BTDC         | 100.3 Nm / knock | No useful gain     |

With 12 Nm of loss torque, the 20° point corresponds to 112.5 Nm
internal torque. That value is entered into the potential/reference
torque map at the measured speed and charge.

## 8.2 Spark-efficiency calibration

At the same operating point, spark is retarded from the reference timing
and internal torque is normalized:

η_spark = T_indicated,current / T_indicated,reference

These curves let the ECU estimate actual torque during fast spark
intervention. They also determine how much additional potential torque
and air are needed when a planned spark reserve is active.

## 8.3 Inverse-map generation

The inverse torque-to-charge map is usually generated mathematically
from the calibrated forward surface. It is checked for monotonicity,
correct interpolation, consistent fuel-mode handling and physically
achievable charge limits. Manual measurement of every inverse cell would
duplicate the forward test and can hide inconsistencies.

# 9. CNG details that deserve their own calibration

- **Port-injected gas displacement.** CNG occupies intake volume and can
  reduce fresh-air charge at high gas flow.

- **Gas injector flow.** Mass flow depends on upstream pressure,
  downstream pressure, gas temperature, composition and choked/subsonic
  flow regime.

- **Gas-quality adaptation.** Methane content, inert gases and higher
  hydrocarbons affect stoichiometric AFR, heating value and knock
  behaviour.

- **Regulator and rail dynamics.** Transient pressure changes can
  produce lambda and torque errors that look like air-path errors.

- **Fuel switching.** Air, fuel transport, gasoline wall film, lambda
  integrators and torque models must be coordinated to avoid a torque
  hole or surge.

# 10. Converting the calibration concept to gasoline

The torque structure remains the same: requested brake torque is
converted to internal torque, potential torque and desired charge. The
main conversion work is in fuel properties, charge cooling/displacement,
transient fuel transport and knock limit.

| **Topic**            | **CNG baseline**                                    | **Gasoline conversion**                                       |
|----------------------|-----------------------------------------------------|---------------------------------------------------------------|
| Stoichiometric AFR   | Composition-dependent; methane-like example ≈17.2   | Fuel-batch dependent; conventional example ≈14.7              |
| Fuel state in PFI    | Gas occupies intake volume                          | Liquid/vapour; less direct gaseous displacement               |
| Transient fuel model | Rail/regulator/transport dynamics                   | Wall wetting, evaporation and fuel film                       |
| Heating value        | Approximately 50 MJ/kg for methane-like example     | Approximately low-40s MJ/kg, blend dependent                  |
| Charge cooling       | Limited for gaseous PFI                             | Evaporation can cool the charge; strong for DI                |
| Torque map           | Fuel-specific combustion and efficiency corrections | Recalibrate MBT, knock limit, lambda and efficiency           |
| Injector model       | Gas pressure ratio and density critical             | Liquid pressure, dead time and nonlinear pulse width critical |

The gasoline conversion should be validated as its own fuel mode.
Copying the CNG torque map and changing only AFR can produce errors in
air charge, torque, transient lambda and knock margin.

# 11. Common failure patterns and how to diagnose them

| **Observed behaviour**                                | **Likely areas to investigate**                                    |
|-------------------------------------------------------|--------------------------------------------------------------------|
| Lambda error only in CNG mode                         | CNG injector mass model, gas quality, displacement correction      |
| Air estimate correct steady-state but wrong in tip-in | Manifold dynamics, MAF delay, throttle feedforward                 |
| Torque estimate wrong mainly when cold                | Friction/loss torque and temperature correction                    |
| Charge jump at a cam transition                       | Cam correction, residual model, map interpolation                  |
| Inverse request oscillates                            | Non-monotonic forward torque map or controller interaction         |
| Full-load charge cannot reach request                 | Throttle/boost limit, gas displacement, turbo or fuel-system limit |

# 12. What a high-quality result looks like

A strong calibration is not merely a map with small point errors. It
produces a consistent physical chain: torque request, internal torque,
potential torque, desired charge, actuator position, measured charge,
fuel quantity, lambda and actual torque all agree within the expected
dynamics and uncertainty. The map remains smooth without hiding real
gas-exchange features, and it works across temperature, altitude,
production tolerances, gas quality and fuel switching.

# Glossary

| **Term**                  | **Meaning**                                          |
|---------------------------|------------------------------------------------------|
| Air charge                | Fresh-air mass trapped per cylinder combustion event |
| Brake torque              | Usable crankshaft torque                             |
| Indicated/internal torque | Torque generated by cylinder pressure before losses  |
| Potential torque          | Torque available at reference combustion conditions  |
| IMEP                      | Indicated mean effective pressure                    |
| MBT                       | Minimum spark advance for best torque                |
| Forward torque model      | Air charge and conditions → torque                   |
| Inverse torque model      | Requested torque → desired air charge                |
| Working page              | Online calibration area being modified               |
| Reference page            | Protected comparison calibration                     |

# Selected technical references

**[1]** L. Guzzella and C. H. Onder, *Introduction to Modeling and Control of Internal Combustion Engine Systems*, 2nd ed., Springer, 2010, DOI: 10.1007/978-3-642-10775-7. Relevant material: SI control structure (Figs. 1.5, 4.3 and 4.4), torque generation (Eqs. 2.94-2.113), engine operating point and calibration (Secs. 4.1.3-4.1.4), and CNG back-flow dynamics (Sec. 3.2.4).

**[2]** J. B. Heywood, *Internal Combustion Engine Fundamentals*, 2nd ed., McGraw-Hill, 2018.

**[3]** SAE International, “A Review of Spark-Ignition Engine
Air-Charge Estimation Methods,” SAE 2016-01-0620.

**[4]** SAE International, “Calibration of Torque Structure and Charge
Control System for SI Engines Based on Physical Simulation Models,” SAE
2006-01-0854.

**[5]** SAE International, “Development of a Control-Oriented Cylinder
Air-Charge Model for Gasoline Engines with Dual Independent Cam
Phasing,” SAE 2022-01-0414.

**[6]** ETAS, INCA Measurement and Calibration / INCA software
documentation, official product and training material.

**[7]** Robert Bosch GmbH, Gasoline Engine Management: Systems and
Components, technical reference.

# Editorial review log

| **How to use this section:** Record decisions here instead of changing the technical flow in chat. Each new revision should update the version number and the open questions below. |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

| **Item**              | **Current decision / open question**                            |
|-----------------------|-----------------------------------------------------------------|
| Primary architecture  | Stoichiometric, four-stroke CNG SI; PFI examples                |
| Next technical review | Review pedal-map, torque-arbitration and spark/charge coupling terminology |
| Diagram status        | Driver-to-charge sequence redrawn; source-adapted torque architecture retained |
| Worked case status    | Pedal 60% -> 150 Nm raw -> 120 Nm permitted -> 402 mg/event; values illustrative |
| Publication format    | Long-form article; later create shorter LinkedIn/Medium version |
