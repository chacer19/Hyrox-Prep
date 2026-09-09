#!/usr/bin/env bash
# Stamp a build id into index.html + sw.js, then emit the artifact build.
#
#   ./build.sh [output.html]
#
# index.html is the source of truth. The artifact build is the same file with
# the document wrapper removed, because the Artifact host supplies its own
# <!doctype>/<html>/<head>/<body>.
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-dist/hyrox-prep.html}"
BUILD="$(date -u +%Y-%m-%d.%H%M)"

# stamp: replace either the placeholder or a previous stamp
for f in index.html sw.js; do
  perl -0pi -e "s/(BUILD\s*=\s*')[^']*'/\${1}${BUILD}'/; s/(BUILD\s*=\s*\")[^\"]*\"/\${1}${BUILD}\"/" "$f"
done

mkdir -p "$(dirname "$OUT")"
python3 - "$OUT" <<'PY'
import re, sys
lines = open("index.html", encoding="utf-8").read().splitlines()
drop = re.compile(
    r'^\s*(<!doctype html>|</?html[ >]|</?head>|</?body>'
    r'|<meta charset|<meta name="viewport"'
    r'|<link rel="manifest"|<link rel="apple-touch-icon"'
    r'|<meta name="apple-mobile-web-app-capable"|<meta name="theme-color")', re.I)
t = "\n".join(l for l in lines if not drop.match(l)).strip() + "\n"
low = t.lower()
for bad in ("<html", "<body>", "</body>", "<head>", "</head>", "<!doctype"):
    assert bad not in low, "wrapper survived: " + bad
assert t.lstrip().startswith("<title>"), t[:80]
open(sys.argv[1], "w", encoding="utf-8").write(t)
print("artifact build:", len(t) // 1024, "KB ->", sys.argv[1])
PY
echo "stamped build ${BUILD}"
