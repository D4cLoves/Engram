# Domain Model

## Core Entities

### User

Owns sources, atoms, review states, graph relations, and exports.

### Source

A user-submitted origin of knowledge.

Possible MVP types:

- ManualText
- WebPage
- WikipediaPage

Useful fields:

- id
- userId
- type
- title
- url
- rawText
- status
- createdAt

### ProcessingJob

Tracks background processing for a source.

Useful fields:

- id
- userId
- sourceId
- status
- currentStep
- errorMessage
- startedAt
- completedAt

### TextChunk

A normalized part of source text used for atom extraction.

Useful fields:

- id
- sourceId
- index
- content
- tokenEstimate

### KnowledgeAtom

A small, standalone unit of knowledge extracted from a source.

Atom types:

- Definition
- Claim
- Technique
- Warning
- Example
- Question

Useful fields:

- id
- userId
- sourceId
- chunkId
- type
- title
- content
- status
- confidence
- createdAt
- acceptedAt

### AtomEmbedding

Vector representation for semantic search.

Useful fields:

- atomId
- model
- vector
- createdAt

### DuplicateCandidate

A suggested semantic duplicate or near-duplicate pair.

Useful fields:

- id
- userId
- atomAId
- atomBId
- similarity
- status
- createdAt

### AtomRelation

A graph edge between atoms.

Possible relation types:

- Related
- Supports
- Explains
- Contrasts
- Prerequisite

### ReviewState

Current SRS state for one atom.

Useful fields:

- atomId
- dueAt
- stability
- difficulty
- retention
- intervalDays
- reviewCount

### ReviewLog

One review event.

Useful fields:

- id
- atomId
- rating
- reviewedAt
- previousDueAt
- nextDueAt

## Atom Statuses

- Draft
- Inbox
- Accepted
- Rejected
- Merged

## Processing Statuses

- Pending
- Running
- Completed
- Failed
- Canceled

