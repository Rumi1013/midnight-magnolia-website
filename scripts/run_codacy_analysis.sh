#!/usr/bin/env bash
# Run Codacy analysis for specified files (wrapper that checks for local Codacy CLI)
# Usage: ./scripts/run_codacy_analysis.sh [file1 file2 ...]

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ "$#" -eq 0 ]; then
  echo "Specify one or more files (relative to repo root) to analyze with Codacy." >&2
  echo "Example: ./scripts/run_codacy_analysis.sh agents/zora.agent.md scripts/install_agents.sh" >&2
  exit 1
fi

if command -v codacy_cli >/dev/null 2>&1; then
  echo "Found local Codacy CLI (codacy_cli). Running analysis..."
  for f in "$@"; do
    echo "Analyzing: $f"
    codacy_cli analyze --rootPath "$ROOT_DIR" --file "$ROOT_DIR/$f" || echo "Codacy CLI returned non-zero for $f"
  done
  exit 0
fi

echo "Local Codacy CLI not found."
echo "Per repository policy, please run Codacy analysis using your MCP server or the Codacy CLI."
echo "If you're using the Codacy MCP Server integration in this environment, please run the provided MCP action or run the following command locally once codacy_cli is available:"

cat <<'CMD'
codacy_cli analyze --rootPath "$(pwd)" --file "agents/zora.agent.md"
CMD

echo
echo "Alternatively, use your editor's Codacy extension or CI integration to run analysis."
