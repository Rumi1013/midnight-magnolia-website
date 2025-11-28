#!/usr/bin/env bash
# Copy agent prompts into this workspace's .vscode folder for easy editing in the current editor/codespace
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/agents"
DEST_DIR="$ROOT_DIR/.vscode/agents-prompts"

if [ ! -d "$SRC_DIR" ]; then
  echo "Agents source directory not found: $SRC_DIR" >&2
  exit 1
fi

mkdir -p "$DEST_DIR"
echo "Copying agent prompts to: $DEST_DIR"
cp -v "$SRC_DIR"/* "$DEST_DIR" || true
echo "Done. Open $DEST_DIR in your editor to view or edit the prompts."
