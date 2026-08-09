<div class="hero"><div class="kicker">Heavy-Duty Diesel Engine Series · Committee Edition</div><h1>Calibration Workflow Standard — From Sweep to Release</h1></div>
<p><a href="../">← Back to series overview</a></p>


# The standard calibration block used throughout the series

Every major calibration task should answer the same questions.

| Block | Question |
|---|---|
| Objective | What physical/system result are we optimizing? |
| Preconditions | What hardware, software, fuel and thermal state must be valid? |
| Map coordinates | Which axes define the calibration? |
| Fixed variables | What must remain constant during the sweep? |
| Sweep variables | Which actuator/target will be deliberately changed? |
| Signals to log | Which channels prove the result and expose limits? |
| Constraints | Which mechanical, emissions, turbo, thermal or driveline limits apply? |
| Selection rule | How is the winning point selected? |
| Robustness | What production/environment/aging corners must be challenged? |
| Validation | Which off-grid, transient and vehicle tests close the release? |

# Generic test sequence

```text
1. Verify instrumentation and configuration
2. Stabilize the operating point
3. Record a reference
4. Sweep one planned local design
5. Reject invalid / limiter-contaminated points
6. Compare efficiency + emissions + mechanical constraints
7. Repeat reference
8. Select candidate region
9. Run interaction sweep / DoE if required
10. Populate the map
11. Inspect gradients
12. Validate off-grid
13. Validate transient
14. Challenge robustness corners
15. Document release evidence
```

# Signals versus calibration objects

Do not confuse what is **measured** with what is **changed**.

Example for injection calibration:

| Calibration objects | Measured channels |
|---|---|
| main SOI | hydraulic SOI / SOC |
| injection pressure target | actual pressure |
| pilot mass/dwell | heat release / MPRR |
| post timing | catalyst temperature / HC |
| quantity correction | IMEP / torque |

# Point validity

A point should be rejected or flagged if the intended test state is contaminated by:

- unintended torque limiter;
- regeneration/thermal mode;
- unstable speed/load;
- sensor fault;
- rail-pressure inability;
- thermal drift;
- inconsistent hardware state.

# Reference repetition

A strong sequence is:

```text
reference
candidate 1
candidate 2
candidate 3
reference again
```

If the second reference moves materially, investigate drift before accepting the candidate ranking.

# Map release

After point optimization:

```text
local optimum
  ↓
map population
  ↓
gradient review
  ↓
off-grid validation
  ↓
transient validation
  ↓
production / ambient / aging challenge
  ↓
release
```

This is the difference between finding a good test-cell point and producing a robust calibration.

