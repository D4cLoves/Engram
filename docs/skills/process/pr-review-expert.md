---
name: pr-review-expert
description: Use when reviewing Engram pull requests, local diffs, commits, or staged changes for correctness, architecture, security, blast radius, missing tests, breaking changes, and MVP-scope drift.
---

# PR Review Expert for Engram

## Purpose

Use this project-local skill to perform systematic code reviews for Engram.

Focus on:

- correctness;
- Clean Architecture boundaries;
- security and user ownership;
- processing pipeline reliability;
- AI provider boundaries;
- graph and SRS correctness;
- database migration risk;
- missing tests;
- MVP-scope drift.

Do not focus on style nits unless they hide a real maintainability or correctness issue.

## Required Context

Before reviewing backend changes, read:

- `AGENTS.md`
- `docs/product/mvp-slices.md`
- `docs/architecture/overview.md`
- `docs/architecture/domain-model.md`
- `docs/skills/backend/clean-architecture.md`

Read these when relevant:

- `docs/architecture/ai-pipeline.md` for extraction, embeddings, LLMs, or source provenance
- `docs/architecture/srs-engine.md` for review scheduling and memory state
- `docs/architecture/knowledge-graph.md` for graph relations and visualization

## Review Scope

Review one of:

- current working tree;
- staged changes;
- a commit diff;
- a GitHub PR diff;
- a user-specified file or feature area.

When reviewing a PR or commit, inspect the diff and surrounding code. Focus findings on changed behavior, but use surrounding code for context.

## Review Workflow

### 1. Establish Context

Identify:

- what changed;
- why it changed, if available;
- affected modules;
- affected layers;
- whether the change is MVP or post-MVP.

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

### 2. Blast Radius

Check whether the change affects:

- shared domain entities;
- Application interfaces;
- API contracts;
- EF Core migrations;
- source processing pipeline;
- background jobs;
- embeddings or pgvector queries;
- graph relation semantics;
- SRS scheduling;
- frontend cache/query state;
- Docker Compose or environment variables.

Severity guide:

- Critical: user data isolation, auth, destructive migration, AI secret exposure, broken core pipeline
- High: shared domain model, API contract, processing job, review scheduling, graph relation invariants
- Medium: single feature flow, query behavior, UI workflow
- Low: isolated copy, styling, docs, non-critical component

### 3. Security and Privacy

Check:

- every user-owned operation scopes by current user;
- API never trusts request `UserId`;
- secrets come from environment variables;
- API keys and raw secrets are not logged;
- source text size is limited;
- raw user source text is not exposed unnecessarily;
- new endpoints have authentication/authorization;
- AI provider errors do not leak secrets or private prompts.

### 4. Architecture

Check:

- Domain has no EF Core, HTTP, Redis, AI SDK, or provider dependencies;
- Application defines use cases and infrastructure interfaces;
- Infrastructure implements provider details;
- API endpoints stay thin;
- Worker/background jobs handle long-running work;
- handlers do not become god services;
- domain entities protect important state transitions.

### 5. Data and Migration Risk

Check:

- new required columns have safe defaults or migration strategy;
- indexes exist for new query patterns;
- pgvector usage is explicit and tested when embeddings are involved;
- destructive changes are avoided or staged;
- relationships preserve user ownership;
- duplicate graph relations are prevented.

### 6. Tests

Look for missing tests around:

- source status transitions;
- processing pipeline errors and retries;
- atom approve/reject/edit/merge;
- source provenance preservation;
- duplicate candidates;
- graph relation constraints;
- review scheduling and review logs;
- user ownership checks;
- API validation and error responses;
- frontend loading/error/empty states.

### 7. MVP Scope

Flag changes that sneak in post-MVP scope:

- browser extension;
- full Obsidian plugin;
- PDF parsing;
- mobile app;
- collaboration;
- AI chat with notes;
- full contradiction detection;
- automatic browser tracking.

## Output Format

Lead with findings, ordered by severity.

Use this format:

```md
## Findings

- [P1] Title
  File: path:line
  Why it matters:
  Suggested fix:

## Open Questions

- ...

## Summary

...

## Verification Notes

...
```

If no issues are found, say that clearly and mention any residual test or verification gaps.

## Review Principles

- Read code before claiming a bug.
- Reference concrete files and lines.
- Prioritize correctness, security, and architecture over style.
- Do not invent findings.
- Do not request broad rewrites unless the risk justifies it.
- Respect existing project conventions.
- Call out good patterns briefly when useful.
