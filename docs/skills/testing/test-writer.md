---
name: test-writer
description: Use when writing or planning Engram tests for ASP.NET Core backend, Application/Domain logic, EF Core integration, Worker jobs, React frontend, AI pipeline fakes, embeddings, graph behavior, SRS scheduling, analytics, and Docker-backed integration flows.
---

# Test Writer for Engram

## Purpose

Use this project-local skill to write focused, reliable tests for Engram.

The original external skill was Django/FastAPI/Celery-oriented. For Engram, use this adapted version for:

- ASP.NET Core backend tests;
- Clean Architecture Domain/Application tests;
- EF Core integration tests;
- Worker/background job tests;
- React frontend tests;
- AI pipeline and embedding fakes;
- graph, SRS, analytics, and export behavior.

## Required Context

Before writing tests, read:

- `AGENTS.md`
- `docs/product/mvp-slices.md`
- `docs/architecture/overview.md`
- `docs/architecture/domain-model.md`
- `docs/skills/backend/clean-architecture.md`

Read these when relevant:

- `docs/architecture/ai-pipeline.md`
- `docs/architecture/srs-engine.md`
- `docs/architecture/knowledge-graph.md`
- `docs/skills/process/bug-fixing.md`

## Test Strategy

Prefer the narrowest test that gives confidence:

- Domain unit tests for entity behavior and invariants.
- Application tests for commands, queries, ownership, and orchestration.
- Infrastructure tests for EF Core mappings, migrations, pgvector queries, Redis, and provider adapters.
- API integration tests for endpoint contracts, auth, validation, and error responses.
- Worker tests for background processing and retry behavior.
- Frontend tests for workflow states and user interactions.
- End-to-end tests only for critical demo flows.

## Priority Areas

Prioritize tests for Engram's core product flow:

```text
Manual text source
-> processing job
-> chunks
-> extracted atoms
-> atom inbox
-> approval
-> embeddings/deduplication
-> graph
-> review
-> analytics/export
```

## Backend Test Locations

Use project conventions once the repo is scaffolded. A reasonable starting layout:

```text
tests/
  Engram.Domain.Tests/
  Engram.Application.Tests/
  Engram.Infrastructure.Tests/
  Engram.Api.Tests/
  Engram.Worker.Tests/
```

## Frontend Test Locations

Use project conventions once the frontend is scaffolded. A reasonable starting layout:

```text
Engram.Frontend/
  src/
    features/
      sources/
        __tests__/
      atoms/
        __tests__/
      graph/
        __tests__/
      review/
        __tests__/
```

## Test Doubles

Use fake or mock implementations for:

- current user service;
- date/time provider;
- background job queue;
- knowledge extraction service;
- embedding service;
- text extraction service;
- SRS scheduler when testing handlers;
- HTTP clients for external sources.

Do not call real AI providers in ordinary tests.

## Domain Test Patterns

Test domain behavior directly.

Examples:

- `KnowledgeAtom.Approve` only works from pending/inbox state.
- `KnowledgeAtom.MarkAsMerged` preserves target atom reference.
- `Source.MarkAsFailed` stores a user-facing error.
- `ReviewCard.ApplySchedule` updates due date and interval.
- `AtomRelation` prevents invalid self-relations if the domain allows that invariant.

Domain tests should not require a database.

## Application Test Patterns

Application tests should verify:

- current user ownership is enforced;
- handlers call domain methods rather than mutating state casually;
- expected errors use the project result/error pattern;
- background jobs are queued instead of long work running in API handlers;
- provider interfaces are called with validated input;
- source and atom provenance is preserved.

## API Integration Test Patterns

API tests should verify:

- request validation;
- authentication and authorization;
- response contracts;
- expected error codes;
- no cross-user data access;
- processing endpoints enqueue work instead of doing heavy work inline.

## AI Pipeline Tests

Use deterministic fakes.

Test:

- malformed extraction output is rejected or handled;
- vague/empty atoms are filtered;
- atom type validation;
- source/chunk provenance;
- duplicate extraction result collapse;
- embedding generation is not repeated unnecessarily;
- provider failure stores a recoverable processing error.

## SRS Tests

Test:

- due card query returns only active due cards for current user;
- Again/Hard/Good/Easy update schedule as expected;
- every submitted answer creates a review log;
- suspended or merged cards do not appear in due queue;
- scheduling is deterministic with a fake clock.

## Graph Tests

Test:

- graph includes approved atoms by default;
- rejected or merged atoms are hidden unless explicitly requested;
- relations cannot cross users;
- duplicate relations are prevented;
- directed relation direction is preserved;
- retention color data is included when requested.

## Frontend Tests

Test user workflows:

- add manual text source;
- see processing status;
- view Atom Inbox;
- accept/edit/delete atom;
- review duplicate candidate;
- inspect graph node details;
- complete a review session;
- see loading, error, and empty states.

Prefer tests that assert visible behavior rather than internal component implementation.

## Running Tests

Use the repo's actual commands once scaffolded. Likely commands:

```text
dotnet test
npm run build
npm run lint
```

`npm run test` is not available until frontend test tooling is added.

If a command is not yet available, state that and validate with the closest practical check.

## Final Response

After writing or updating tests, summarize:

- test files added or changed;
- behavior covered;
- commands run;
- failures or skipped checks;
- remaining coverage gaps.
