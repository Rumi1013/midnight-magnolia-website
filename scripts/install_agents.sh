#!/usr/bin/env bash
# Install Midnight Magnolia agent prompt files into VS Code / Codespaces AI Studio extension
# Usage: ./scripts/install_agents.sh [agents_dir]

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="${1:-$ROOT_DIR/agents}"

if [ ! -d "$AGENTS_DIR" ]; then
  echo "Agents directory not found: $AGENTS_DIR" >&2
  exit 1
fi

echo "Installing agent files from: $AGENTS_DIR"

# Search common VS Code extension locations for Windows AI Studio extension
EXT_CANDIDATES=("$HOME/.vscode-remote/extensions" "$HOME/.vscode/extensions" "/home/codespace/.vscode-remote/extensions")
FOUND=""
for base in "${EXT_CANDIDATES[@]}"; do
  if [ -d "$base" ]; then
    match=$(find "$base" -maxdepth 2 -type d -name "ms-windows-ai-studio.windows-ai-studio*" | head -n1 || true)
    if [ -n "$match" ]; then
      FOUND="$match"
      break
    fi
  fi
done

if [ -z "$FOUND" ]; then
  echo "Could not find the Windows AI Studio extension directory in standard locations." >&2
  echo "You can run this script again and pass the extension path as the second argument." >&2
  echo "Files will still be copied to ./agents_copy for manual import."
  mkdir -p "$ROOT_DIR/agents_copy"
  cp -v "$AGENTS_DIR"/* "$ROOT_DIR/agents_copy/"
  echo "Copied agent files to: $ROOT_DIR/agents_copy"
  exit 0
fi

DEST="$FOUND/resources/lmt/chatAgents"
mkdir -p "$DEST"

echo "Copying files to extension path: $DEST"
cp -v "$AGENTS_DIR"/* "$DEST/"

echo "Done. You may need to reload VS Code or the extension to pick up new agent files."
#!/usr/bin/env bash
# Install Midnight Magnolia agent prompts into common VS Code extension paths.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/agents"

if [ ! -d "$SRC_DIR" ]; then
  echo "Agents source directory not found: $SRC_DIR" >&2
  exit 1
fi

echo "Copying agent prompts from: $SRC_DIR"

# Common locations to try (remote / local extensions)
DEST_PATTERNS=(
  "$HOME/.vscode-remote/extensions/ms-windows-ai-studio.windows-ai-studio-*/resources/lmt/chatAgents"
  "/home/codespace/.vscode-remote/extensions/ms-windows-ai-studio.windows-ai-studio-*/resources/lmt/chatAgents"
  "$HOME/.vscode/extensions/ms-windows-ai-studio.windows-ai-studio-*/resources/lmt/chatAgents"
)

COPIED=0
for pat in "${DEST_PATTERNS[@]}"; do
  for dest in $(ls -d $pat 2>/dev/null || true); do
    echo "Installing into: $dest"
    mkdir -p "$dest"
    cp -v "$SRC_DIR"/* "$dest" || true
    COPIED=$((COPIED+1))
  done
done

if [ "$COPIED" -eq 0 ]; then
  echo "No matching extension folders found. You can manually copy files from: $SRC_DIR" >&2
  exit 2
fi

echo "Done. Installed into $COPIED locations."
