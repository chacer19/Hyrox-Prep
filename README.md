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

## Find a race

A third tab lists the 2026/27 HYROX season - search by city or country, filter
by region, and hit **Use this race** to set your race date, which immediately
drives the countdown, the mile targets and the training plan's phases.

**The list is a baked-in snapshot, not a live query.** The artifact sandbox
blocks every outbound fetch, so the page cannot ask hyrox.com anything at
runtime; outbound *links* work, which is why the official race finder is one
click away on every screen. The dates were compiled from public listings on
2026-09-09 because hyrox.com blocks automated access (403), so they are
unofficial - confirm on the official site before booking. Refreshing the list
means editing the `RACES` array.

## Garmin

There is no automatic link, and two separate things prevent one:

1. **The artifact sandbox blocks all outbound requests.** The published page
   cannot call any external API at runtime, Garmin's or anyone's. Links out
   work; network calls do not.
2. **Garmin has no personal API.** The Connect Developer Program requires a
   legal entity and rejects personal-use applications, and new onboarding was
   reported paused during 2026 with the request form withdrawn.

So the app imports the CSV that Garmin Connect exports instead: Garmin Connect
on the web -> Activities -> scroll until the runs you want are loaded ->
**Export CSV** (upper right).

Garmin does not document that file's columns and they vary by account, so
nothing is hardcoded. Headers are matched by pattern, every guess is shown as an
editable dropdown, distance units are selectable, activities are filtered by
type (default `run`, which keeps treadmill runs), and a preview shows exactly
what will be added before anything is written. Re-importing the same file is
safe - anything already logged, matched on date and distance, is skipped.

Imported runs carry no shoe, so set that in the run log if you want them counted
against a pair in the closet.

## Teams and the leaderboard

A team is just a name held on each athlete, matched case-insensitively - create
one and share the name, or tap a team already listed to join it. There is no
separate teams collection: a team exists exactly as long as someone is on it,
and the roster subscription already carries everything the board needs.

Both boards (team and individual) rank by total miles, days at goal, best streak
or miles banked. Team percentage is the average across its members; team streak
is its best member's.

## Target time

Set a finish time and the plan paces itself from it. The target is placed
between the published elite and average profiles, every split is interpolated at
that position, then scaled so the parts add up to the target exactly - so
`1:15:00` yields 5:03/km runs, 3:32 sled push, 6:42 wall balls and so on, and
every 1 km repeat in the training plan then names that pace.

A time trial is the reality check rather than the source: if the target needs
materially more than the trial suggests you have, the app says so instead of
quietly prescribing a pace you cannot hold. Without a target it falls back to
time-trial pace plus the station-fatigue allowance.

Note: the published table used for the women's row split is incomplete, so that
one figure is an estimate and the UI says so.

## The closet: when to retire a shoe

Add pairs to the closet directly - they show up with zero miles and start
tracking once you name them on a run. Retire a pair and it drops out of the
suggestions but keeps its history. Each pair gets its own recommendation instead
of a single threshold, because a carbon racer and a daily trainer are not the
same asset:

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
