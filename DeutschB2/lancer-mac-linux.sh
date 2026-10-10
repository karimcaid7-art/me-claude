#!/bin/sh
# Ouvre Deutsch B2 dans le navigateur par defaut (Mac / Linux)
cd "$(dirname "$0")"
if command -v xdg-open >/dev/null; then xdg-open index.html; else open index.html; fi
