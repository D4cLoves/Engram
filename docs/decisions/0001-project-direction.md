# 0001: Project Direction

## Status

Accepted

## Context

Engram can easily become a broad note-taking app, AI summarizer, or CRUD dashboard. The technical assignment defines it as a content-to-knowledge system with a graph and SRS.

## Decision

Build Engram around this core:

```text
Source -> Atoms -> Deduplication -> Graph -> SRS -> Analytics
```

The first implemented product slice should be:

```text
Manual text source -> processing job -> atom extraction -> Atom Inbox
```

## Consequences

- Do not start with an Obsidian plugin, browser extension, PDF parser, or AI chat.
- Keep source provenance for every generated atom.
- Treat atom extraction as a pipeline step, not as a one-off chat response.
- Use MVP docs to resolve scope decisions.

