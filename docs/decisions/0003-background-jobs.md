# 0003: Use Hangfire for MVP background jobs

## Status

Accepted

## Context

Engram needs background processing for:

- source processing;
- text cleaning and chunking;
- atom extraction;
- embedding generation;
- duplicate detection;
- relation generation;
- analytics aggregation.

These tasks are queue-like and status-driven.

## Decision

Use Hangfire for MVP background jobs.

## Consequences

- Background work can be queued and retried.
- Processing jobs can map naturally to user-visible status.
- Hangfire is faster to ship for this MVP than a lower-level worker queue.
- Hangfire storage/configuration belongs in Infrastructure.
- Worker execution belongs in `Engram.Worker`.

## Alternatives Considered

- Quartz: better for complex scheduling, less direct for queue-like MVP jobs.
- Raw hosted services: simple at first, but weaker for retries, visibility, and persistence.
- External queue workers: useful later, heavier than needed for the MVP.
