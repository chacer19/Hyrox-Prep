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
- **Shoe retirement** - per-pair advice driven by what the shoe is, not one
  number for everything
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

## When to retire a shoe

Each pair gets its own recommendation instead of a single threshold, because a
carbon racer and a daily trainer are not the same asset:

| Type | Recommended | Why |
|---|---|---|
| Daily trainer | 300-500 mi | EVA/TPU midsole, the workhorse range |
| Super trainer | 300-400 mi | supercritical foam fades before EVA does |
| Carbon-plated racer | 150-250 mi | the foam fails, not the plate (peak feel gone by ~125 mi) |
| Max cushion | 350-500 mi | deep stack, outlasts a standard trainer |
| Trail | 300-500 mi | lugs decide it, not the midsole |
| Cross-trainer / Hyrox | 300-400 mi | flat firm outsole built for sled work |

Tick **Sled & station work** on a pair and its range drops 20%, because in Hyrox
the outsole goes before the midsole - sled push grinds the tread flat and grip
fails first. Those pairs also carry a standing reminder to check the tread
before race day regardless of mileage.

Set **Miles before tracking** for a pair that already had miles on it when you
started logging. Each card projects a retirement date from your actual mileage
over the last six weeks.

These ranges are published guidance, not a rule - weight and running style move
them.

## Two ways to run it

The same `index.html` runs on two backends and picks one at load:

| | Shared (published artifact) | Local (open the file) |
|---|---|---|
| Storage | the artifact's database | this browser's `localStorage` |
| Who sees it | everyone with the link, any device | just that browser |
| Badge | green "Shared - N athletes" | "This browser only" |

**Shared** is the one to use with more than one person. Each athlete is a single
document (`athletes/<id>`), so several people logging at once never write the
same record. Which athlete *you* have selected, and your light/dark preference,
are per-viewer and always stay local - your teammate switching athletes doesn't
move yours.

Publishing: strip the `<!doctype>/<html>/<head>/<body>` wrapper from this file
and publish the remainder as an artifact with the `db` and `downloads`
capabilities. This file stays the source of truth; the artifact is generated
from it.

**Export JSON** / **Import** moves a roster between the two. Import is hidden in
shared mode, because it rewrites the whole roster.

## Who can edit what

In shared mode each person **claims** their own athlete once, on their own
device ("This is me" in the athlete bar). From then on:

- their own athlete is editable
- every other athlete is **read-only** - inputs disabled, log/delete controls
  hidden, and a banner naming whose log they are looking at
- the claim is a per-viewer preference, so it never moves anyone else's

This is a guard against people editing each other's logs by accident, **not a
security boundary**. Enforcing it server-side needs the viewer's identity (the
`user` capability), which is not available to this deployment, so a determined
person with devtools could still write another athlete's document. Everyone with
the link can also still read every athlete - which is the point for a training
group.

To limit who can open it at all, use the artifact's own Share menu.

General training guidance — not medical or coaching advice.
