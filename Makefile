SHELL := /bin/bash

FILES := agents/* scripts/*

.PHONY: help agents-install agents-install-workspace codacy-analyze install-and-analyze

help:
	@echo "Makefile targets:"
	@echo "  agents-install            - Install agent prompts into detected VS Code extension path"
	@echo "  agents-install-workspace  - Copy agent prompts into .vscode/agents-prompts for editing"
	@echo "  codacy-analyze            - Run Codacy analysis for new/changed agent files (wrapper)"
	@echo "  install-and-analyze       - Install agents then run Codacy analysis"

agents-install:
	chmod +x scripts/install_agents.sh || true
	./scripts/install_agents.sh

agents-install-workspace:
	chmod +x scripts/install_agents_to_workspace.sh || true
	./scripts/install_agents_to_workspace.sh

codacy-analyze:
	chmod +x scripts/run_codacy_analysis.sh || true
	./scripts/run_codacy_analysis.sh $(FILES)

install-and-analyze: agents-install codacy-analyze
