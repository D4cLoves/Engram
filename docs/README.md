# Engram Documentation Index

This folder is the working memory for the Engram project.

It is intentionally split into small source-of-truth files instead of one overloaded document.

## Reading Order

For a new task, start here:

```text
1. AGENTS.md
2. docs/antigravity/context-map.md
3. docs/product/mvp-slices.md
4. docs/architecture/tech-stack.md
5. The specific architecture or skill document for the task
```

## Directory Map

```text
docs/
  product/       Product scope, MVP slices, roadmap, full specification.
  architecture/  Technical model, stack, domain, pipeline, graph, SRS.
  decisions/     Accepted decisions. Use these before reopening old debates.
  skills/        Local Antigravity operating guides for implementation work.
  antigravity/   How Antigravity should use this documentation and teach the user.
```

## Product Documents

- `docs/product/spec.md` is the long product and technical specification.
- `docs/product/mvp-slices.md` defines implementation order and slice boundaries.
- `docs/product/roadmap.md` keeps later work visible without pulling it into the current slice.

## Architecture Documents

- `docs/architecture/tech-stack.md` is the source of truth for selected technologies.
- `docs/architecture/overview.md` explains the system shape and service responsibilities.
- `docs/architecture/domain-model.md` describes the main entities and statuses.
- `docs/architecture/ai-pipeline.md` describes text processing and atom extraction.
- `docs/architecture/knowledge-graph.md` describes graph nodes, edges, and UI expectations.
- `docs/architecture/srs-engine.md` describes the later SRS/review slice.

## Decision Records

Decision records live in `docs/decisions/`.

Use them to avoid repeating already settled debates.

If a decision changes, create a new decision record instead of silently editing history.

## Local Skills

Local skills live in `docs/skills/`.

These are not product specs. They are working instructions for Antigravity when planning, implementing, testing, reviewing, or debugging.

## Rules

- Do not duplicate a document just because a new task mentions the same concept.
- Prefer updating the narrowest source-of-truth file.
- If documentation and code disagree, mention the mismatch before implementing.
- Keep roadmap ideas out of the active MVP slice unless the user explicitly asks.
