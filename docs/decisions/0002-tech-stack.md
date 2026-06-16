# 0002: Use the selected Engram tech stack

## Status

Accepted

## Context

Engram needs a fullstack architecture for processing sources, extracting knowledge atoms, building graph views, running SRS reviews, and exposing analytics.

The project should be strong enough for portfolio value while still realistic for one developer to build through vertical slices.

## Decision

Use:

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

## Consequences

- The backend has strong portfolio value and clear enterprise-style boundaries.
- PostgreSQL and pgvector keep relational and vector data together.
- Redis supports progress/status and future caching needs.
- Hangfire simplifies background processing for the MVP.
- React Flow speeds up graph UI implementation.
- TanStack Query separates server state from local UI state.
- Zustand keeps local UI state simple.
- The stack is modern but still realistic for a course project.

## Alternatives Considered

- Quartz instead of Hangfire.
- D3 instead of React Flow.
- Redux Toolkit instead of Zustand.
- Separate vector database instead of pgvector.
- Direct OpenAI-only integration instead of provider abstractions.
