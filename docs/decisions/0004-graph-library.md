# 0004: Use React Flow for MVP graph visualization

## Status

Accepted

## Context

Engram needs an interactive knowledge graph with:

- nodes;
- edges;
- selection;
- zoom and pan;
- custom node UI;
- inspector panels;
- filtering;
- retention coloring.

## Decision

Use React Flow for MVP graph visualization.

## Consequences

- The graph UI can be implemented faster than with raw D3.
- Custom nodes and interaction patterns are easier to ship.
- D3 can still be used later for specialized layouts or analytics if needed.
- Graph data should be returned through a UI-shaped graph API, not raw EF entities.

## Alternatives Considered

- D3: very flexible but slower to build for the MVP.
- Canvas/WebGL graph libraries: better for huge graphs, unnecessary for the first useful graph.
- Static graph rendering: not enough for Engram's inspector workflow.
