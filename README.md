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

### Training styles

**Evidence-led** (default) is built on the Hyrox literature rather than on
published plans. The first peer-reviewed study of a simulated race (11
recreational athletes) found VO2max was the strongest correlate of finish time
(rho = -0.71, p = 0.01), endurance training volume next (-0.68) and body fat
percentage third (0.67) - while grip strength, muscle mass percentage and
resistance-training volume showed **no meaningful relationship**, and nothing
predicted station times at all. Running was ~59% of race time.

So: running volume leads and is ~80% easy, with **one hard running session a
week**; strength is twice weekly as support rather than the headline; stations
are trained as **skill and pacing**; and there are two real rest days, because
recovery is among the least-studied areas and concurrent-training interference
worsens as the gap between hard sessions shrinks.

Week: strength (legs) / easy aerobic / one hard run / rest / strength (pull) +
station skill / long run / rest.

Limits, stated in the app: n = 11, treadmill runs, non-competition sled, and the
polarised-distribution evidence is real but modest (SMD 0.24, CI 0.01-0.48).
Best available evidence is not the same as strong evidence.

**Balanced** is 5 days with 2 rest days.

**MFLH-inspired** is 7 days with no rest day: two strength days with accessory and
mobility work attached, a short/speed run, a compromised-running session, one
mixed-modality conditioning piece whose time domain rotates week to week
(12-min AMRAP, 3x5-min blocks, 21-15-9, EMOM 20, 5 rounds for time), a long run,
and a movement day that is explicitly not rest. A "keep sessions under 60 min"
option drops the mobility blocks.

Gym sessions in this style are laid out as **lettered blocks inside a 60-75
minute window** - Set A a primer, B/C/D the main work split into three pieces,
Set E a "grunt work" finisher. A conditioning day collapses to three blocks
(primer, the piece, finish), because a metcon is one piece and splitting it into
thirds would misrepresent it. Runs, simulations, rest days and the movement day
keep their own shape - a long run is one continuous effort, and so is a race
rehearsal.

That lettered-block format is the session shape MFLH 365 is described as using,
and it is the only part of his material worth borrowing: a format is not
content. What goes inside each set is this plan's own programming.

His Instagram (@iamchrisharris, @movefastliftheavy) was checked for programming
detail and has none worth taking: logged out it serves only the thumbnail grid,
which is apparel, brand and race photos, and the training highlights sit behind
the login. The useful structural detail came from his own program pages, not
Instagram.

This is built from the characteristics Christian Harris's Move Fast Lift Heavy
programs are *publicly described* as having - daily training, varied equipment
and time domains, running split long/medium/short, accessory plus mobility.
**It is not his programming.** Those descriptions come from MFLH's own marketing
and partner pages rather than an independent breakdown, and his actual programs
are a paid product. The app says so in the rationale section when the style is
selected.

### The plan adapts to your logged times

Every timed run of a mile or more is evidence. The app takes your best sustained
pace over the last four weeks and compares it with what the target demands, then
reshapes the block around the answer - and re-does it each time you add a run.

The bar is deliberately not "can you hit target pace once". Race pace has to
survive eight separate kilometres with a station between each, so a training
pace merely *equal* to target pace is already behind. Comfortable means running
about 20 s/km quicker than target when fresh.

| Verdict | What the plan does |
|---|---|
| Ahead / on track | Running volume held at baseline; extra sled pull and wall ball volume, a roxzone transition drill, and hybrids pointed at the three biggest benchmark gaps |
| Behind | Weekly volume +12%, a 10-minute tempo block added to the interval session, strength held steady so it does not add fatigue |
| Well behind | Volume +20%, and the app says plainly that volume alone will not close the gap - give it more weeks or ease the target |

The **On track for your target?** card shows the pace the target needs, your best
recent pace, the gap, the four-week trend, how many timed runs the read is based
on, and an explicit list of what changed in the plan because of it.

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

## Building

`index.html` is the source of truth. `./build.sh [out.html]` stamps a build id
into `index.html` and `sw.js`, then writes the artifact build - the same file
with the document wrapper stripped, since the Artifact host supplies its own.
The build id shows in the app footer, so you can tell at a glance whether a
device is running the current version.

## Theme

Dark is the app, not a mode: it is the bare `:root` default, so a phone in light
mode does not turn the app white. Light is still available, but only when
someone picks it with the Theme control.

## Installing to a home screen

The service worker is network-first for the page itself, so an installed copy
re-fetches the app whenever it has a connection and falls back to the cache only
offline. An earlier version answered from cache first, which meant an installed
copy kept serving whatever build it was installed with.

Note that `sw.js` and `manifest.webmanifest` only apply to a copy served over
http(s) - they are inert on `file://` and inside the artifact viewer. Serving
them needs a host (GitHub Pages is not currently enabled on this repo).

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
