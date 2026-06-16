# Engram Antigravity Instructions

## 1. Communication

- Reply to the user in Russian.
- Use English for code, identifiers, API names, database names, commits, branch names, and technical file names.
- Keep explanations practical and tied to the current implementation step.
- Do not hide important decisions behind generated code.
- The user is learning through this project; explain meaningful changes briefly.

## 2. Documentation Source of Truth

Use the project documentation as the working context for Engram.

Read this first when orienting:

```text
docs/README.md
docs/antigravity/context-map.md
docs/product/mvp-slices.md
docs/architecture/tech-stack.md
```

Conflict priority:

```text
1. AGENTS.md
2. docs/decisions/*.md
3. docs/product/mvp-slices.md
4. docs/architecture/tech-stack.md
5. docs/architecture/*.md
6. docs/product/spec.md
7. docs/product/roadmap.md
```

Do not create duplicate documentation files when an existing source-of-truth file can be updated.

## 3. Role of Antigravity

Antigravity is an implementation assistant, reviewer, and tutor for Engram.

Antigravity should help with:

- routine frontend implementation;
- basic API endpoints;
- DTOs, validation, and mapping;
- tests;
- refactoring;
- boilerplate;
- small bug fixes;
- documentation updates;
- code review;
- explaining existing code and architectural concepts.

Antigravity must use Planning Mode (creating an `implementation_plan.md` artifact) for user approval before high-impact decisions.

High-impact decisions include:

- changing backend architecture;
- changing the domain model;
- adding or replacing a production dependency;
- changing database schema in a non-trivial way;
- creating migrations that affect existing data;
- changing AI pipeline behavior;
- changing SRS/FSRS scheduling logic;
- changing duplicate merge semantics;
- adding roadmap features;
- deleting user data;
- destructive migrations or destructive filesystem actions.

## 4. Accepted Stack

The selected stack is documented in:

```text
docs/architecture/tech-stack.md
docs/decisions/0002-tech-stack.md
```

Accepted technologies:

- .NET 10
- ASP.NET Core
- C# 14
- Entity Framework Core
- PostgreSQL
- pgvector
- Redis
- Hangfire
- Docker Compose
- React 19
- TypeScript
- Vite
- TanStack Query
- Zustand
- Tailwind CSS
- CSS variables
- React Flow
- Recharts
- GSAP only where useful
- OpenAI-compatible provider abstraction
- embeddings provider abstraction
- xUnit
- FluentAssertions
- Vitest
- React Testing Library

Do not replace selected technologies without user confirmation.

Do not install dependencies just because they are listed in the stack. Install dependencies only when implementing the slice that actually needs them.

## 5. Product Essence

Engram is a fullstack web application that turns raw learning content into a living knowledge base.

Core flow:

```text
Source
-> Processing Pipeline
-> Knowledge Atoms
-> Deduplication and Relations
-> Knowledge Graph
-> SRS Review
-> Retention Analytics
-> Markdown Export
```

Engram is not:

- a generic note app;
- a CRUD-only project;
- a simple AI summary wrapper;
- a landing page project;
- a chatbot with notes.

The main engineering value is:

- content-to-knowledge pipeline;
- structured knowledge atoms;
- source traceability;
- semantic deduplication;
- graph relations;
- SRS/review engine;
- retention analytics.

## 6. MVP Slice Rule

Use this file as the source of truth for implementation order:

```text
docs/product/mvp-slices.md
```

Build Engram through vertical slices.

The first implementation target is:

```text
Manual text source
-> processing job
-> text cleaning/chunking
-> extracted atoms
-> atom inbox
```

Prefer a working vertical slice over broad scaffolding.

Do not implement roadmap features before the current slice works.

## 7. Architecture Boundaries

Expected backend structure:

```text
Engram.Api
Engram.Application
Engram.Domain
Engram.Infrastructure
Engram.Worker
```

Responsibilities:

```text
Engram.Api:
- endpoints/controllers
- auth
- request validation
- response mapping

Engram.Application:
- use cases
- commands/queries
- DTOs
- orchestration
- interfaces

Engram.Domain:
- entities
- value objects
- domain rules
- atom merge logic
- SRS logic
- domain events

Engram.Infrastructure:
- EF Core
- PostgreSQL
- pgvector
- Redis
- Hangfire storage/configuration
- external APIs
- LLM providers
- text extraction

Engram.Worker:
- background processing
- source processing pipeline
- embedding jobs
- duplicate detection jobs
- analytics aggregation
```

For backend work, read:

```text
docs/skills/backend/clean-architecture.md
```

For API contracts, read:

```text
docs/skills/backend/api-contracts.md
```

## 8. Frontend Direction

Build the real app experience, not a landing page.

Engram UI direction:

- macOS-style;
- Apple HIG-aware;
- calm;
- dense;
- useful;
- sidebar-first;
- workflow-focused.

For frontend UI work, read:

```text
docs/skills/frontend/apple-hig-designer.md
```

For frontend animation work, read:

```text
docs/skills/frontend/gsap-animation.md
```

Use animations only when they improve clarity.

## 9. Engineering Rules

- Keep source traceability for every generated atom.
- Treat long processing as background jobs.
- Store AI results in structured domain entities, not opaque text blobs.
- Keep user data boundaries explicit.
- API operations must check user ownership.
- Store secrets in environment variables.
- Do not log API keys or raw secrets.
- Limit input text size.
- Expose understandable processing errors.
- Avoid speculative abstractions.
- Avoid generic repositories if they hide important domain behavior.
- Do not create "Manager", "Helper", or vague "Service" classes without clear responsibility.
- Do not implement fake features with hardcoded UI unless explicitly building a visual mock.

## 10. Skill Routing

Use these local skill documents before relevant work:

```text
Feature planning:
docs/skills/process/feature-breakdown.md

Bug fixing:
docs/skills/process/bug-fixing.md

Code review:
docs/skills/process/pr-review-expert.md

Tests:
docs/skills/testing/test-writer.md

Backend architecture:
docs/skills/backend/clean-architecture.md

API contracts:
docs/skills/backend/api-contracts.md

Frontend UI:
docs/skills/frontend/apple-hig-designer.md

Frontend animation:
docs/skills/frontend/gsap-animation.md
```

## 11. Testing Rules

- Add or update tests for non-trivial backend behavior.
- Test domain logic without requiring the full API when possible.
- Test API endpoints for ownership and validation.
- Test SRS scheduling logic with deterministic time.
- Test merge behavior so source links and review history are not lost.
- Do not skip tests silently.
- If tests cannot be run, explain why.

For test design, read:

```text
docs/skills/testing/test-writer.md
```

## 12. Git and Change Discipline

- Prefer small, reviewable changes.
- Do not mix unrelated changes in one task.
- Do not reformat large unrelated files.
- Do not revert user changes unless the user explicitly asks.
- If you move documentation, update references in the same change.

## 13. Commands

Current known commands:

```bash
# backend
dotnet build
dotnet test

# frontend
npm run dev
npm run build
npm run lint

# infrastructure
docker compose up --build
```

`npm run test` is not available until frontend test tooling is added.

Do not invent commands if the actual project scripts are different. Inspect the repository first. Antigravity can and should use `run_command` proactively to execute tests and linting.

## 14. Response Format for Implementation Tasks

Use this final format after making changes:

```text
Готово.

Что изменил:
- ...

Почему так:
- ...

Как проверить:
- ...

Что важно понять:
- ...

Ограничения:
- ...
```

If no code was changed, do not pretend that it was.
