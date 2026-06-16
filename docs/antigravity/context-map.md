# Antigravity Context Map

This file tells Antigravity which project documents to read and why.

Use it to avoid loading the whole project spec for every small task.

## Fast Routing

| Task type | Read first |
| --- | --- |
| Any Engram task | `AGENTS.md`, `docs/README.md`, this file |
| Feature planning | `docs/product/mvp-slices.md`, `docs/skills/process/feature-breakdown.md` |
| Backend implementation | `docs/architecture/overview.md`, `docs/skills/backend/clean-architecture.md` |
| API work | `docs/skills/backend/api-contracts.md`, `docs/architecture/domain-model.md` |
| AI pipeline work | `docs/architecture/ai-pipeline.md`, `docs/product/mvp-slices.md` |
| SRS/review work | `docs/architecture/srs-engine.md`, `docs/skills/testing/test-writer.md` |
| Graph work | `docs/architecture/knowledge-graph.md`, `docs/decisions/0004-graph-library.md` |
| Frontend UI | `docs/skills/frontend/apple-hig-designer.md`, `docs/product/mvp-slices.md` |
| Animation | `docs/skills/frontend/gsap-animation.md` |
| Bug fix | `docs/skills/process/bug-fixing.md` |
| Code review | `docs/skills/process/pr-review-expert.md` |
| Tests | `docs/skills/testing/test-writer.md` |
| Dependency choice | `docs/architecture/tech-stack.md`, `docs/decisions/*.md` |

## File Purposes

### Root

- `AGENTS.md`: mandatory operating rules for Antigravity in this repository.

### `docs/product/`

- `spec.md`: broad project specification. Read when product meaning is unclear.
- `mvp-slices.md`: active implementation order. Read before any feature work.
- `roadmap.md`: future direction. Do not treat roadmap items as current work.

### `docs/architecture/`

- `tech-stack.md`: selected technologies and dependency rules.
- `overview.md`: service boundaries and high-level data flow.
- `domain-model.md`: entities, statuses, and ownership boundaries.
- `ai-pipeline.md`: source processing, atom extraction, provider abstractions.
- `knowledge-graph.md`: graph UI and graph API expectations.
- `srs-engine.md`: review engine rules, scheduler expectations, FSRS compatibility.

### `docs/decisions/`

- `0001-project-direction.md`: Engram is pipeline-first, not CRUD-first.
- `0002-tech-stack.md`: selected stack is accepted.
- `0003-background-jobs.md`: Hangfire is selected for background jobs.
- `0004-graph-library.md`: React Flow is selected for graph visualization.
- `0005-auth-strategy.md`: JWT access token plus refresh token in HttpOnly cookie.

### `docs/skills/`

- `backend/clean-architecture.md`: backend layering and dependency direction.
- `backend/api-contracts.md`: DTOs, validation, endpoint shape, OpenAPI expectations.
- `frontend/apple-hig-designer.md`: macOS-style UI direction and interaction patterns.
- `frontend/gsap-animation.md`: animation rules, only where useful.
- `process/feature-breakdown.md`: planning format for larger work.
- `process/bug-fixing.md`: reproduce, diagnose, fix, test.
- `process/pr-review-expert.md`: review stance and finding priorities.
- `testing/test-writer.md`: test strategy and coverage expectations.

### `docs/antigravity/`

- `context-map.md`: this file.
- `working-rules.md`: operating discipline for sensitive decisions and delivery.
- `teaching-mode.md`: how to explain changes so the user learns.

## Current Slice

The current implementation target is Slice 1:

```text
Manual text source
-> processing job
-> text cleaning/chunking
-> atom extraction
-> atom storage
-> atom inbox
```

Do not pull graph, SRS, analytics, export, browser extension, PDF parsing, or advanced recommendations into Slice 1.

## When To Ask The User

Create an `implementation_plan.md` artifact before:

- changing architecture;
- changing domain semantics;
- adding production dependencies;
- changing database schema in a non-trivial way;
- choosing sensitive auth/security details;
- changing AI pipeline behavior;
- changing SRS scheduling logic;
- changing duplicate merge semantics;
- deleting data or performing destructive operations.

If the decision is routine and already covered by the docs, implement it directly.
