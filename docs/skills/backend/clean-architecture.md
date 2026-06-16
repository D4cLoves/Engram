# Clean Architecture

Backend layering and dependency direction.

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

# 9. Implementation Workflow for Antigravity

- Prefer the current architecture over new abstractions.
- Keep changes small and reviewable.
- Do not expose EF entities directly through API responses.
- Treat long processing as background jobs.
