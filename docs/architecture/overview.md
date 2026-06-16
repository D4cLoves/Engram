# Architecture

## System Shape

Engram should be split into clear services:

```text
Frontend app
-> Backend API
-> PostgreSQL with pgvector
-> Redis
-> Worker service
-> LLM and embeddings provider
```

## Backend Responsibilities

- Authentication and user ownership checks
- Source management
- Processing job orchestration
- Atom storage and moderation states
- Embedding storage and similarity search
- Graph relation storage
- SRS scheduling and review logs
- Analytics endpoints
- Markdown export

## Worker Responsibilities

- Fetch or normalize source content
- Clean text
- Chunk text
- Extract atoms
- Generate embeddings
- Find duplicate candidates
- Create suggested relations
- Update processing status
- Execute Hangfire background jobs

## Frontend Responsibilities

- Source submission
- Processing status visibility
- Atom Inbox workflow
- Duplicate review and merge UI
- Knowledge graph
- Atom details
- Review session
- Analytics dashboard
- Markdown export action

## Data Flow

```text
Source
-> ProcessingJob
-> SourceDocument/TextChunk
-> KnowledgeAtom
-> AtomEmbedding
-> DuplicateCandidate
-> AtomRelation
-> ReviewState
-> ReviewLog
```

## Principles

- Background processing should be recoverable and status-driven.
- Generated atoms must keep links to source and chunk provenance.
- AI output should be validated before persistence.
- Domain entities should make the pipeline inspectable.
- MVP should tolerate partial processing failure and show clear user-facing errors.
- User ownership checks are part of every user-facing API operation.
- Controllers should orchestrate requests, not contain domain algorithms.
