# Antigravity Working Rules

These rules describe how Antigravity should work inside Engram.

They complement `AGENTS.md`; they do not replace it.

## Work Style

- Inspect the existing repo before implementing.
- Prefer the current architecture over new abstractions.
- Keep changes small and reviewable.
- Implement vertical slices, not broad scaffolding.
- Update documentation references when files move.
- Do not silently make product or architecture decisions.

## Sensitive Decisions

Discuss with the user (via `implementation_plan.md` artifact) before:

- changing backend architecture;
- changing domain model semantics;
- adding or replacing production dependencies;
- creating non-trivial migrations;
- changing AI extraction behavior;
- changing SRS scheduling behavior;
- changing duplicate merge behavior;
- adding roadmap features;
- deleting user data.

When in doubt, ask with a short plan and the tradeoff.

## Dependency Discipline

The tech stack can mention tools that are not installed yet.

That does not mean Antigravity should install them immediately.

Install dependencies only when:

- the current slice needs them;
- the reason is explained;
- alternatives and long-term cost are clear;
- the user confirms if it is a production dependency.

## Data and Security

- Keep user ownership explicit.
- Do not expose EF entities directly through API responses.
- Do not log API keys, tokens, or raw secrets.
- Store secrets in environment variables.
- Limit input text size.
- Show understandable processing errors.

## Definition of Done

A task is done only when:

- requested behavior is implemented;
- the change fits the current slice;
- important errors are handled;
- relevant tests are added or updated;
- relevant checks are run (proactively use `run_command` to execute tests like `dotnet test` and linting to validate code), or the inability to run them is explained;
- the final answer says what changed, why, how to verify, and what concept matters.

## Current Commands

Use actual project commands proactively:

```bash
dotnet build
dotnet test
npm run dev
npm run build
npm run lint
docker compose up --build
```

`npm run test` is not available until frontend test tooling is added.
