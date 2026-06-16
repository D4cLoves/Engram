# 0005: Use JWT access token plus refresh token in HttpOnly cookie

## Status

Accepted

## Context

Engram needs user ownership boundaries for sources, atoms, review states, graph relations, analytics, and exports.

Auth may be delayed or simplified during early local MVP work if it blocks the first vertical slice.

## Decision

Use:

```text
JWT access token
+ refresh token stored in HttpOnly cookie
```

## Consequences

- API endpoints can use bearer-style access tokens.
- Refresh token storage avoids exposing long-lived credentials to JavaScript.
- Ownership checks remain mandatory once auth is implemented.
- Early local development may use temporary single-user mode if needed, but code should not forget the ownership boundary.

## Alternatives Considered

- Cookie-only auth.
- JWT access and refresh tokens both stored in browser storage.
- Temporary single-user mode only.
- External auth provider.
