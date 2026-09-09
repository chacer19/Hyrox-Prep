# Hyrox Prep

Training tools for a Hyrox race build. No dependencies, no build step — plain HTML
files you open in a browser.

## `index.html` — Daily Mile Tracker

Set a race date, commit to a daily minimum (default 1 mile), and track whether you
are ahead of or behind that commitment.

- **Countdown** to race day, and total miles required between now and then
- **Banked miles** — running total against the `days elapsed x daily minimum` line,
  so you can see at a glance whether you've logged more than the minimum required
- **Cumulative chart** — miles logged vs. the required minimum, with a table view
- **Daily chart** — last 30 days against the goal line
- **Pace** — enter distance and time, pace is calculated per run, per day, per shoe
- **Shoe mileage** — rotation totals with wear measured against a retirement threshold
- **Streaks** — current and best run of days that cleared the minimum

Data is stored in your browser's `localStorage`, so it stays on the device you
logged it on. Use **Export JSON** / **Import** to move a log between devices.

## Notes

The canonical copy of this project lives in OneDrive and syncs across devices —
but that syncs the *app*, not the logged data. Export/import moves the data.
