# Midnight Magnolia — Agent Prompts

This folder contains the agent prompts and selector for the Midnight Magnolia agent ecosystem.

## Agent Triad

The Midnight Magnolia Agent Triad consists of three specialized agents that work together to ensure brand continuity, strategic alignment, and technical excellence:

| Agent | Role | Primary Focus |
|-------|------|---------------|
| **Zora** | Clarity Coach | Questions-first scoping, prioritization, and identifying the single most valuable next step |
| **Saimon** | Execution Engine | Technical implementation, code, structured steps, and reproducible builds |
| **Business Agent** | Brand Strategist | Brand-aligned strategy, monetization, content, and systems design |

## Files

- `agent_selector.md` — Quick toggles and usage to pick an agent.
- `zora.agent.md` — Zora: essentialist clarity coach.
- `saimon.agent.md` — Saimon: technical execution engine.
- `business.agent.md` — Midnight Magnolia Business Agent: brand & strategy.
- `STYLING.md` — Brand styling guidelines for continuity.

## Styling Continuity

All agents should reference the **Midnight Magnolia Brand Guide** for consistent styling:

### Color Palette
| Name | Hex | CSS Variable |
|------|-----|--------------|
| Midnight Blue | `#0A192F` | `--midnight-blue` |
| Magnolia White | `#FAF3E0` | `--magnolia-white` |
| Southern Gold | `#D4AF37` | `--gold` |
| Sage Green | `#A3B18A` | `--sage-green` |
| Mulberry Plum | `#56334E` | `--plum` |
| Warm Gray | `#D4B99F` | `--warm-gray` |

### Typography
- **Headers:** Playfair Display (italic) — hero lines, section titles
- **Body:** Lora — readable content, maximum 70ch width
- **Interface:** Montserrat — controls, nav, labels

### Tone & Voice
- Warm, grounded, culturally aware, trauma-informed
- Avoid hustle-culture language
- Use gentle, recovery-aware communication
- Mantra: *"Rest is strategy. Creation is power."*

## Usage

1. Open the relevant `.md` when interacting with an LLM or tooling that accepts system prompts.
2. Keep these files authoritative and sync them with any editor/extension agent stores.
3. Reference the styling guidelines for brand-consistent outputs.

## Installation

```bash
# Copy prompts into workspace for editing
bash scripts/install_agents_to_workspace.sh

# Install prompts into extension paths
bash scripts/install_agents.sh
```

## Coordination

When working on the Midnight Magnolia project:
1. **Zora** clarifies priorities and scope
2. **Business Agent** aligns with brand strategy and monetization
3. **Saimon** implements technical pieces

Always ensure outputs follow the brand guide and styling conventions defined in this documentation.
