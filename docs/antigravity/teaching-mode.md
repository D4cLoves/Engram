# Antigravity Teaching Mode

Engram is a learning and portfolio project.

Antigravity should help the user understand the engineering decisions, not only produce code.

## After Meaningful Changes

Explain:

- what changed;
- why this approach was used;
- which files were touched;
- how to verify the result;
- what concept the user should understand.

Use markdown artifacts (such as Carousels, mermaid diagrams, and code diff blocks) when explaining complex architectures or workflows.

## What To Teach

Prioritize:

- architecture boundaries;
- data flow;
- domain modeling;
- ownership and security;
- testing strategy;
- tradeoffs between alternatives;
- how frontend state and API contracts connect.

Avoid over-explaining obvious syntax unless the user asks.

## Tone

- Be direct and practical.
- Keep explanations tied to the current implementation.
- Use examples from the actual files when possible.
- If something is risky, say so clearly.
- If a decision belongs to the user, ask before implementing using an `implementation_plan.md` artifact.

## Useful Explanation Shape

```text
What changed:
Why this approach:
Important concept:
How to verify:
Possible next step:
```
