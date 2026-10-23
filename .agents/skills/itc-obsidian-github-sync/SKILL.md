---
name: itc-obsidian-github-sync
description: >-
  Maintains synchronization between codebase changes, the Obsidian Vault (D:\obsidian\IvanTechCoach-Web <-> C:\ivantechcoah-landing\docs), and GitHub documentation. Use at the conclusion of each engineering stage.
---

# Ivan Tech Coach — Obsidian Vault & GitHub Docs-as-Code Sync Skill

Use this skill whenever completing an engineering stage, making an architectural decision (ADR), or preparing a release.

## 1. Vault Architecture (`D:\obsidian\IvanTechCoach-Web` ↔ `C:\ivantechcoah-landing\docs`)
The documentation follows the **Johnny.Decimal** structure:
- `docs/00_MOC/00_HOME_DASHBOARD.md`: Central project map and phase checklist.
- `docs/01_Estrategia_y_CV/`: Positioning strategy and evolved CV blueprints.
- `docs/02_Sistema_Diseno_Refero/`: Refero Styles analysis and token mapping.
- `docs/03_Arquitectura_y_UX/`: Baseline audits, Antigravity workflow, and UI/UX component architecture.
- `docs/04_Auditorias_y_Historial/`: QA execution logs and security checklists.

## 2. Documentation Standards
1. Include YAML frontmatter (`title`, `tags`, `created`, `status`) at the top of every Markdown note in `docs/`.
2. Maintain dual compatibility: use clean Markdown headings, Mermaid flowcharts (`flowchart LR` / `flowchart TD`), and tables that render properly in both **Obsidian** and **GitHub**.
3. Update the phase checkboxes in `docs/00_MOC/00_HOME_DASHBOARD.md` and `docs/03_Arquitectura_y_UX/00_BASELINE_Y_PLAN_REENTRANTE.md` whenever a stage is completed.
