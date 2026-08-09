
<div class="hero">
<div class="kicker">CNG Genset Performance, Emissions & Controls · Nominal 1500 rpm · 2026 Publication Edition</div>
<h1>Load Acceptance, Load Rejection, Frequency and Voltage Response</h1>
<p><em>Governor and AVR behavior during P/Q transients, turbo/fuel timing, root-cause diagnosis and flexible-generation operation</em></p>
</div>

<div class="publication-note"><strong>A note on scope:</strong> This series describes generic technologies used across modern large lean-burn natural-gas generating sets. Nominal speed is 1500 rpm for the 50 Hz / four-pole teaching case; actual synchronous or transient speed follows frequency and operating state. “CNG” is used deliberately for compressed natural gas fuel: where fuel is supplied from high-pressure CNG storage, the upstream pressure-reduction/conditioning system is part of the plant; where pipeline natural gas is used, the engine-side gas train starts from the regulated site supply. Hardware, limits, safety architecture and regulations remain project-specific.</div>

<div class="view-controls"><strong>Reading mode:</strong>
<button onclick="setMode('simple')">Simple view</button>
<button onclick="setMode('detailed')">Detailed view</button>
<span id="mode-label">Practical notes visible</span></div>

# 1. Load-step performance is the genset equivalent of automotive tip-in

A genset can run perfectly at every steady-state load point and still perform poorly when the electrical load changes suddenly.

The key quality indicators are:

- frequency dip;
- frequency overshoot;
- recovery time;
- voltage response;
- smoke is not relevant for premixed CNG, but lambda/combustion excursion is;
- knock;
- misfire;
- turbo response.

# 2. Load acceptance sequence

```text
Electrical load ↑
      ↓
generator electromagnetic torque ↑
      ↓
engine rpm/frequency ↓
      ↓
governor requests more engine torque
      ↓
gas + air + spark respond
      ↓
turbo accelerates
      ↓
new steady load is reached
```

# 3. Calibration procedure

Test standardized steps such as:

```text
0 → 25%
25 → 50%
50 → 75%
75 → 100%
```

and project-specific larger steps.

Record at high sample rate:

- frequency;
- speed;
- electrical kW;
- torque request;
- gas command;
- lambda;
- boost;
- turbo speed;
- spark;
- knock;
- cylinder pressure/stability.

# 4. Fast versus slow torque paths

Spark can change torque quickly.

Air and turbo need more time.

A temporary fast ignition strategy can support frequency recovery while the air path catches up, but excessive retard/advance can create thermal or knock problems.

# 5. Trade-off — frequency dip versus lambda excursion

Aggressive gas fueling can reduce frequency dip.

But air may not have arrived yet.

Then mixture becomes richer than intended.

Too-conservative fueling protects lambda but gives a deeper frequency dip.

# 6. Trade-off — turbo response versus surge/overspeed

Aggressive turbo control can improve load acceptance but reduce compressor/turbo margin.

The final calibration should give the fastest stable response that stays inside:

- lambda limits;
- knock limits;
- turbo limits;
- frequency requirements.

# 7. Load rejection

For a 100% → low-load rejection:

- gas torque must fall immediately;
- spark may help reduce torque;
- turbo retains inertia;
- bypass/wastegate may need fast action.

Monitor:

- overspeed;
- lean excursion;
- compressor surge;
- EGT.

# 8. Generator inertia

Higher rotating inertia reduces the immediate speed change for a given torque imbalance:

$$
J\frac{d\omega}{dt}=T_{engine}-T_{generator}
$$

But inertia also slows acceleration/recovery.

Mechanical design and governor calibration therefore interact.

# 9. Validation

Repeat load steps with:

- hot engine;
- cold engine;
- hot intake air;
- altitude;
- low gas pressure;
- poor gas quality;
- multiple gensets sharing load.

A strong steady-state calibration is not sufficient until dynamic frequency performance is validated.

# 10. The complete electrical transient: governor and AVR together

A genset load transient is not only an engine event.

Two major response channels can act at the same time.

## Active-power disturbance

```text
P demand changes
   ↓
generator electromagnetic torque changes
   ↓
frequency / shaft torque balance changes
   ↓
governor / engine responds
```

## Reactive-power disturbance

```text
Q demand changes
   ↓
generator current / voltage tendency changes
   ↓
AVR / excitation responds
```

A mixed load step excites both.

# 11. What to measure during a complete load-step test

Electrical channels:

- frequency;
- terminal voltage;
- active power P;
- reactive power Q;
- power factor;
- generator current;
- AVR/excitation output.

Engine channels:

- rpm;
- engine torque/power request;
- main gas command;
- prechamber gas where available;
- lambda;
- boost;
- turbo speed;
- ignition;
- knock;
- cylinder stability.

# 12. Why this separation matters

Suppose terminal voltage dips badly while frequency remains acceptable.

The first suspect should not automatically be the engine governor.

Likewise, a frequency dip with stable voltage is mainly a mechanical-power imbalance problem.

Correct diagnosis starts by asking:

> **Was the disturbance mainly P, mainly Q, or both?**

# 13. Calibration trade-off — engine response versus electrical quality

A more aggressive governor can improve frequency recovery but create:

- lambda excursion;
- knock;
- turbo overshoot.

A more aggressive AVR can improve voltage recovery but create:

- excitation overshoot;
- reactive-power oscillation.

The commissioning target is stable combined P-Q behavior, not the fastest isolated controller.

# 14. Load rejection with AVR interaction

When a large load is removed:

- engine torque must fall;
- generator current falls;
- voltage/reactive behavior can also change;
- AVR and governor both transition.

The complete rejection test should therefore inspect both frequency overshoot **and** voltage overshoot.

# 15. Fast-start and flexible-generation operation

In 2026, some gas-engine power plants are designed for frequent starts, fast synchronization and rapid loading to support renewable-heavy grids.

That creates a different calibration priority from traditional baseload operation.

A flexible-generation program may optimize:

- time to stable firing;
- time to synchronization;
- load-ramp rate;
- frequency response;
- start emissions;
- thermal fatigue;
- turbo response.

The fastest possible start is not automatically the best release calibration.

A more aggressive sequence can increase:

- cold friction;
- combustion instability;
- turbo/thermal gradients;
- start emissions.

The correct target is the **fastest validated sequence compatible with durability, emissions and electrical requirements**.

# 16. Root-cause reading of a load-step trace

If frequency dips but voltage remains good:

- focus first on active-power/engine torque response.

If voltage dips but frequency remains good:

- focus first on AVR/reactive-power behavior.

If both degrade:

- inspect the mixed P-Q disturbance and both control paths.

# 17. Load-step response illustration
<figure class="figure-card">
<svg viewBox="0 0 820 480" role="img" aria-label="Illustrative genset load-step traces">
<rect width="820" height="480" fill="white"/>
<line x1="90" y1="410" x2="750" y2="410" stroke="#52697a" stroke-width="2"/>
<text x="680" y="448" font-size="16" fill="#17324a">Time →</text>
<path d="M100 340 L250 340 L250 120 L730 120" fill="none" stroke="#17324a" stroke-width="3"/>
<text x="115" y="325" font-size="13" fill="#17324a">P load</text>
<path d="M100 190 L250 190 C280 265,330 280,390 225 C470 175,570 185,730 190" fill="none" stroke="#5d87ad" stroke-width="3"/>
<text x="110" y="175" font-size="13" fill="#5d87ad">frequency</text>
<path d="M100 270 L250 270 C300 270,335 245,390 220 C500 170,610 165,730 165" fill="none" stroke="#61717f" stroke-width="3"/>
<text x="110" y="255" font-size="13" fill="#61717f">boost / air</text>
<path d="M100 305 L250 305 C275 245,310 235,350 260 C430 295,520 288,730 285" fill="none" stroke="#9bb5c9" stroke-width="3"/>
<text x="110" y="293" font-size="13" fill="#61717f">lambda deviation</text>
</svg>
<figcaption>Illustrative active-load step: generator load changes immediately, frequency dips, fuel/fast torque respond, and the slower air/turbo path catches up. Actual waveforms and acceptance criteria are project-specific.</figcaption>
</figure>

# 18. Common mistakes

- Evaluating only frequency and ignoring voltage/Q.
- Increasing fuel aggressively without checking air arrival.
- Looking only at final boost and missing stage surge/overspeed.
- Comparing different load-step power factors.
- Ignoring analyzer delay when interpreting CH4 spikes.

# 19. Key lessons

1. Load acceptance is a complete electromechanical transient.
2. Governor and AVR solve different parts of the disturbance.
3. Gas/air/spark timing must be coordinated with generator load dynamics.
4. Flexible/fast-start requirements introduce thermal and emissions trade-offs.
5. Transient signals must be time-aligned before root-cause conclusions.
# References

<ol class="refs">
<li>Wärtsilä 46TS-SG current product documentation — current commercial example of a large gas-engine platform designed for flexible operation and fast starting; cited only as evidence that flexible-generation requirements are commercially relevant.</li>
<li>ISO 8528-5:2025 — Generating sets; design and performance criteria.</li>
<li>ISO 8528-6:2023 — Test methods for complete generating sets.</li>
<li>ISO 8528-3:2020 — AC generators for generating sets; current after confirmation in 2026.</li>
<li>ISO 8528-4:2025 — Controlgear and switchgear.</li>
<li>L. Guzzella and C. H. Onder, Introduction to Modeling and Control of Internal Combustion Engine Systems, 2nd ed.</li>
</ol>
<p><a href="../">← Back to the CNG Genset Series</a></p>

<script>
function setMode(mode){
 document.querySelectorAll('.article-note').forEach(n=>n.style.display=(mode==='simple'?'none':'block'));
 const l=document.getElementById('mode-label');
 if(l)l.textContent=(mode==='simple'?'Practical notes hidden':'Practical notes visible');
}
</script>
