---
name: generating-api-contracts
description: Use when designing, documenting, generating, or reviewing Engram API contracts and OpenAPI specifications for ASP.NET Core endpoints, request/response DTOs, error schemas, authentication, user ownership, processing jobs, atoms, graph, SRS, analytics, export, and frontend React Query integration.
---

# Generating API Contracts for Engram

## Purpose

Use this project-local skill to design and document API contracts for Engram.

The output should help backend and frontend development stay aligned without turning API design into generic CRUD scaffolding.

Engram API contracts must support the core product flow:

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

## Required Context

Before generating API contracts, read:

- `AGENTS.md`
- `docs/product/mvp-slices.md`
- `docs/architecture/overview.md`
- `docs/architecture/domain-model.md`
- `docs/skills/backend/clean-architecture.md`

Read when relevant:

- `docs/architecture/ai-pipeline.md`
- `docs/architecture/srs-engine.md`
- `docs/architecture/knowledge-graph.md`
- `docs/skills/process/feature-breakdown.md`

## When To Use

Use when the user asks to:

- generate API contract;
- create OpenAPI spec;
- document backend endpoints;
- design request/response DTOs;
- define API error responses;
- align frontend and backend around a feature;
- review API contract consistency.

## Output Location

When asked to create files, prefer:

```text
docs/api/
  openapi.yaml
  contracts/
    {module}.md
```

For feature-specific planning, contracts may also live under:

```text
docs/ways-of-work/plans/{epic-name}/{feature-name}/api-contract.md
```

## API Style

Use REST-style HTTP APIs for the MVP.

Follow these conventions unless the implemented repo establishes different ones:

```text
/api/auth/...
/api/sources
/api/sources/{sourceId}
/api/sources/{sourceId}/processing
/api/sources/{sourceId}/atoms
/api/atoms
/api/atoms/inbox
/api/atoms/{atomId}
/api/atoms/{atomId}/approve
/api/atoms/{atomId}/reject
/api/atoms/{atomId}/merge
/api/deduplication/candidates
/api/graph
/api/graph/atoms/{atomId}/neighborhood
/api/review/due
/api/review/sessions
/api/review/sessions/{sessionId}/answers
/api/analytics/overview
/api/export/markdown
```

Endpoints must stay thin in implementation. Contracts should map to Application commands and queries.

## Contract Contents

For each endpoint, define:

- purpose;
- method and path;
- auth requirement;
- user ownership rule;
- request body;
- route/query parameters;
- success response;
- error responses;
- validation rules;
- idempotency or retry notes when relevant;
- frontend React Query usage notes when helpful.

## Request and Response DTOs

Use explicit request/response models.

Do not expose EF entities directly.

Good:

```text
CreateManualTextSourceRequest
SourceResponse
ProcessingJobResponse
KnowledgeAtomResponse
ReviewCardResponse
ApiErrorResponse
```

Avoid:

```text
Source entity as response
KnowledgeAtom EF model as response
anonymous unversioned shapes
```

## Error Schema

Use a consistent error response:

```json
{
  "error": {
    "code": "SOURCE_NOT_FOUND",
    "message": "Source not found.",
    "details": {}
  }
}
```

Expected error codes include:

```text
VALIDATION_FAILED
UNAUTHORIZED
FORBIDDEN
SOURCE_NOT_FOUND
ATOM_NOT_FOUND
PROCESSING_JOB_NOT_FOUND
PROCESSING_ALREADY_RUNNING
INVALID_STATUS_TRANSITION
DUPLICATE_RELATION
DUPLICATE_CANDIDATE_NOT_FOUND
REVIEW_CARD_NOT_FOUND
REVIEW_SESSION_NOT_FOUND
AI_EXTRACTION_FAILED
EMBEDDING_FAILED
EXPORT_FAILED
```

## Authentication and Authorization

Every user-owned endpoint must require authentication.

Rules:

- never trust `UserId` from request body;
- infer current user from auth context;
- every command/query must scope data by current user;
- contracts should explicitly mention ownership behavior;
- cross-user access should return `FORBIDDEN` or `NOT_FOUND` according to project convention.

## Processing Job Contracts

Long-running source processing must not happen inside API request handlers.

Contract pattern:

```text
POST /api/sources/{sourceId}/processing
-> queues processing
-> returns ProcessingJobResponse

GET /api/sources/{sourceId}/processing/{jobId}
-> returns status, currentStep, errorMessage
```

Processing states should be explicit:

```text
Pending
Running
Completed
Failed
Canceled
```

Source pipeline steps may include:

```text
ExtractingText
Chunking
ExtractingAtoms
Deduplicating
BuildingRelations
GeneratingCards
Completed
Failed
```

## OpenAPI Guidance

Prefer OpenAPI 3.1 when creating a full spec.

Include:

- `info`;
- `servers`;
- security schemes;
- paths;
- reusable schemas under `components.schemas`;
- error response components;
- examples for core demo flows.

Do not include fake endpoints just to make the spec look complete.

## Contract-First Workflow

For new features:

1. Identify the user flow.
2. Identify Application command/query names.
3. Define endpoint paths and methods.
4. Define request and response DTOs.
5. Define validation and error responses.
6. Define auth and ownership behavior.
7. Add OpenAPI schema or contract markdown.
8. Use contract to implement backend endpoints.
9. Use contract to implement frontend React Query calls.
10. Add tests for success and error cases.

## Example: Manual Text Source

```text
POST /api/sources/manual-text
Auth: required
Command: CreateManualTextSourceCommand
Request:
  title: string
  content: string
Response:
  source: SourceResponse
  processingJob: ProcessingJobResponse
Errors:
  VALIDATION_FAILED
  UNAUTHORIZED
```

Important rules:

- `content` length must be limited.
- source belongs to current user.
- processing may be queued after source creation.
- endpoint must not call AI provider directly.

## Validation

After generating or editing contracts:

- check names match domain model;
- check every user-owned route has auth;
- check every error response uses standard schema;
- check long-running actions return job state;
- check frontend has enough response data for the workflow;
- check contracts do not include post-MVP features unless explicitly requested.
