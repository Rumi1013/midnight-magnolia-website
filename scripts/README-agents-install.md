# Agent installer scripts

Two helper scripts to make the agent prompts easy to install and edit in this codespace / editor:

- `scripts/install_agents.sh` — Attempts to copy `agents/*` into common VS Code extension paths on the machine (remote and local extension folders). Use this when you want the prompts available to the extension.
- `scripts/install_agents_to_workspace.sh` — Copies `agents/*` into `.vscode/agents-prompts` inside this repository so you can edit them directly in the workspace and test changes.

Usage examples:

```bash
# Copy prompts into this workspace for editing
bash scripts/install_agents_to_workspace.sh

# Attempt to install prompts directly into the extension path(s)
bash scripts/install_agents.sh
```

Notes:
- The `install_agents.sh` script looks for the `ms-windows-ai-studio.windows-ai-studio` extension folder in typical locations. If the extension is installed in a non-standard location, copy the files manually.
- After modifying or adding files, run your Codacy checks if required by your project.
