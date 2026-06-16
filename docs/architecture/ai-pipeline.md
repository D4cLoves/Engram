# AI Pipeline

## MVP Pipeline

```text
Input source
-> extract text
-> clean text
-> chunk text
-> extract typed atoms
-> validate atoms
-> store atoms in inbox
-> generate embeddings
-> find duplicate candidates
-> suggest graph relations
```

For Slice 1, implement only:

```text
Manual text
-> clean text
-> chunk text
-> extract typed atoms
-> validate atoms
-> store atoms in inbox
```

Embeddings, duplicate detection, relation generation, graph updates, and SRS initialization are later slices.

## Atom Extraction Contract

The extractor should return structured output:

```json
{
  "atoms": [
    {
      "type": "Definition",
      "title": "Redis stores data in memory",
      "content": "Redis stores data in RAM, so it is usually faster than disk-based databases.",
      "confidence": 0.87,
      "sourceQuote": "..."
    }
  ]
}
```

## Validation Rules

- Atom content must be short and standalone.
- Atom type must be one of the allowed enum values.
- Atom must keep source and chunk provenance.
- Empty or vague atoms should be rejected.
- Duplicate atoms inside the same extraction response should be collapsed.

## Development Strategy

Start with a deterministic fake extractor for local development and tests.

Use provider abstractions:

```text
ITextGenerationProvider
IEmbeddingProvider
```

Implement real provider adapters after the pipeline, persistence, and UI flow are stable.

Do not hardcode the application to a single LLM provider.

## Safety and Privacy

- Do not log API keys.
- Do not log full user source text unless explicitly needed for local debugging.
- Limit source size.
- Show understandable errors when provider calls fail.
- Keep provider configuration in environment variables.
