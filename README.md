# Hyrox Prep

A single self-contained HTML file — no dependencies, no build step, no server.
Open `index.html` in any browser. Two views, one shared athlete roster.

## Athletes

Every athlete has their own division, race date, training plan and run log.
Add as many as you like and switch between them at the top — useful when two
people in the same house are training for different divisions.

## Mile tracker

- **Countdown** to race day, plus total miles required between now and then
- **Banked miles** — your running total against `days elapsed x daily minimum`,
  so you can see whether you've logged more than the required minimum
- **Cumulative chart** — miles logged vs. required, with a table view
- **Daily chart** — last 30 days against the goal line
- **Pace** — enter distance and time; pace is derived per run, per day, per shoe
- **Shoe mileage** — rotation totals and wear against a retirement threshold
- **Streaks** — current and best run of days that cleared the minimum

## Training plan

Generated from your race date and division — set the date and the whole block
lays itself out backwards from race day.

- **Phases** — base, foundation, build, race prep, taper, sized to the time you
  actually have, with a deload every fourth week
- **Sessions** — 4, 5 or 6 days a week: two strength days (posterior chain, then
  pull/grip), interval running, a compromised-running day, and a long easy run
- **Race loads baked in** — every sled, carry, lunge and wall-ball number comes
  from your division, including the doubles standards
- **Simulations** — a half simulation at the end of the build block and a full
  8-run/8-station simulation entering race prep
- **Pace targets** — enter a 15–20 min time trial and it sets the race pace that
  every 1 km repeat in the plan refers to
- **Benchmarks** — published elite/average splits, so you can see which stations
  are actually costing you time

The plan's structure, and the reasoning behind each choice, is documented at the
bottom of the training view along with its sources.

## Data

Everything is stored in your browser's `localStorage`, so it stays on the device
you logged it on. **Export JSON** / **Import** moves the whole roster between
devices. The OneDrive copy of this file syncs the app, not the data.

General training guidance — not medical or coaching advice.
