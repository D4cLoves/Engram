# Knowledge Graph

## Goal

The graph should show relationships between knowledge atoms and memory state, not just a decorative network.

## Nodes

Primary node:

- KnowledgeAtom

Possible later nodes:

- Source
- Topic
- Tag

## Edges

Possible relation types:

- Related
- Supports
- Explains
- Contrasts
- Prerequisite

## MVP Graph Features

- Display accepted atoms as nodes.
- Display atom relations as edges.
- Click a node to open atom details.
- Color nodes by retention.
- Filter by source, atom type, and review state if time allows.

## Implementation Notes

- React Flow is the accepted MVP graph library.
- Keep graph data API separate from raw entity APIs.
- Avoid rendering huge graphs in MVP. The target scale is up to 5000 atoms, but demo screens should start with focused subgraphs.
- D3 can still be used later for specialized layouts or analytics if needed.
