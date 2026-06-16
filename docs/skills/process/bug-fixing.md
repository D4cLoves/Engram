---
name: bug-fixing
description: Use when implementing minimal, well-verified bug fixes in Engram across ASP.NET Core backend, React frontend, worker jobs, database, AI pipeline, graph, SRS, analytics, or Docker infrastructure after the bug symptoms or failing behavior are known.
---

# Bug Fixing for Engram

## Purpose

Use this project-local skill when a bug, failing test, broken flow, or incorrect behavior needs to be fixed.

The goal is to implement the smallest correct fix that addresses the root cause, fits Engram architecture, and is verified with targeted tests or manual checks.

## Before Editing

First identify:

- observed behavior;
- expected behavior;
- reproduction steps;
- affected module;
- affected layer;
- likely root cause;
- verification method.

Affected modules:

- Identity
- Sources
- Processing
- KnowledgeAtoms
- Deduplication
- KnowledgeGraph
- Review
- Analytics
- Export

Affected layers:

- Domain
- Application
- Infrastructure
- Api
- Worker
- Frontend
- Docker/Infrastructure

For ASP.NET Core backend bugs, also read `docs/skills/backend/clean-architecture.md`.

## Fix Strategy

Before implementing, consider at least two possible fixes when the bug is non-trivial.

Choose the fix that:

- addresses the root cause;
- changes the least code necessary;
- preserves existing architecture boundaries;
- does not expand MVP scope;
- does not hide domain rules in API, Infrastructure, or UI code;
- keeps user ownership and privacy intact;
- remains easy to test.

Avoid symptom masking. For example, do not only patch the frontend if the backend accepts invalid state transitions.

## Implementation Rules

- Keep the diff focused.
- Do not refactor unrelated code.
- Preserve existing behavior unless it is the bug.
- Use clear names that match project conventions.
- Keep endpoints thin.
- Keep Domain free from EF Core, HTTP, AI SDKs, Redis, and provider details.
- Keep long-running work out of API request handlers.
- Keep AI and embedding providers behind Application interfaces.
- Do not log secrets or raw API keys.
- Do not trust client-provided `UserId`.
- Do not loosen validation to make a test pass.

## Verification

Verify the fix with the narrowest reliable check first:

- reproduce the original bug and confirm it no longer occurs;
- run the failing test if one exists;
- add or update a targeted test when the bug touches domain rules or use cases;
- run related backend/frontend tests when practical;
- manually validate UI behavior when the bug is visual or workflow-related.

For Engram, prioritize tests around:

- source status transitions;
- processing job behavior;
- atom status transitions;
- atom merge rules;
- graph relation constraints;
- review card scheduling;
- user ownership checks;
- AI output validation;
- embedding/deduplication thresholds.

## Edge Cases

Check relevant edge cases:

- missing or invalid IDs;
- unauthorized access;
- cross-user data access;
- empty source text;
- large input text;
- failed AI provider response;
- malformed AI output;
- duplicate processing job;
- retry after failure;
- concurrent review submission;
- duplicate graph relation;
- stale frontend cache.

## Final Response

After fixing, summarize:

- what changed;
- root cause;
- files changed;
- verification performed;
- remaining risk, if any.

If verification is clean, say so plainly. If checks could not be run, explain why.
