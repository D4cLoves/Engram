# SRS Engine

## Purpose

SRS is a core Engram capability, but it must not block Slice 1.

Implement SRS after accepted atoms exist.

The MVP scheduler should be deterministic and simple while keeping fields that allow future FSRS-style behavior.

## Core Flow

```text
KnowledgeAtom accepted
-> ReviewState created
-> atom becomes reviewable
-> atom becomes due
-> user starts review session
-> user reveals answer
-> user selects rating
-> ReviewLog is saved
-> ReviewState is updated
-> retention changes
-> graph color and analytics can update
```

## MVP Ratings

```text
Again
Hard
Good
Easy
```

Meaning:

- Again: the user failed to recall.
- Hard: the user recalled with difficulty.
- Good: the user recalled normally.
- Easy: the user recalled easily.

## ReviewState

Supported states:

```text
New
Learning
Review
Relearning
Suspended
```

Useful fields:

```text
Id
AtomId
UserId
State
Stability
Difficulty
Retrievability
RetentionProbability
DueAt
IntervalDays
LastReviewedAt
ReviewCount
LapseCount
IsSuspended
CreatedAt
UpdatedAt
```

When a `KnowledgeAtom` is accepted:

```text
Create ReviewState if it does not already exist.
State = New
DueAt = now
IntervalDays = 0
ReviewCount = 0
LapseCount = 0
IsSuspended = false
```

Do not create duplicate `ReviewState` records for the same atom.

## ReviewLog

Every rating must create a `ReviewLog`.

Useful fields:

```text
Id
AtomId
UserId
Grade
ReviewedAt
PreviousState
NewState
PreviousDueAt
NewDueAt
PreviousStability
NewStability
PreviousDifficulty
NewDifficulty
PreviousRetrievability
NewRetrievability
PreviousRetentionProbability
NewRetentionProbability
PreviousIntervalDays
NewIntervalDays
```

Do not update `ReviewState` without writing `ReviewLog`.

## MVP Scheduler

Do not implement full FSRS in MVP unless the user explicitly asks.

Start with a simplified deterministic scheduler.

Suggested intervals:

```text
Again:
- DueAt = now + 10 minutes
- State = Learning or Relearning
- IntervalDays = 0
- RetentionProbability = low

Hard:
- DueAt = now + 1 day
- State = Learning or Review
- IntervalDays = 1
- RetentionProbability = medium-low

Good:
- DueAt = now + 3 days for early reviews
- DueAt = now + previous interval * 2 for later reviews
- State = Review
- RetentionProbability = medium-high

Easy:
- DueAt = now + 7 days for early reviews
- DueAt = now + previous interval * 3 for later reviews
- State = Review
- RetentionProbability = high
```

Clamp intervals:

```text
Minimum interval: 10 minutes
Maximum interval: 180 days
```

Use UTC time in backend logic.

Use deterministic time through an injected clock/time provider in tests.

Do not put scheduling formulas inside API controllers.

## Due Queue

A card is due when:

```text
ReviewState.DueAt <= now
AND ReviewState.IsSuspended = false
AND KnowledgeAtom.Status = Accepted
```

The due queue must only return atoms owned by the current user.

Sort due cards by:

```text
DueAt ascending
then RetentionProbability ascending
then LastReviewedAt ascending
```

## Graph Coloring

Graph node color should reflect memory state:

```text
No ReviewState: neutral
Never reviewed: neutral
RetentionProbability >= 0.85: green
RetentionProbability >= 0.60 and < 0.85: yellow
RetentionProbability < 0.60: red
IsSuspended = true: muted
```

If `DueAt` is overdue, the graph can optionally shift the node toward a warning color.

## Analytics Usage

SRS data should support:

- due today;
- review count;
- review accuracy;
- retention percentage;
- weak topics;
- review streak;
- review heatmap;
- cards by state.

## API Expectations

Recommended endpoints:

```http
GET /api/review/due
POST /api/review/{atomId}/grade
GET /api/review/history
GET /api/review/stats
PATCH /api/review/{atomId}/suspend
PATCH /api/review/{atomId}/resume
```

Do not expose EF entities directly.

Use request/response DTOs.

Every SRS operation must check user ownership.

## Testing Rules

Test with deterministic time.

Required tests:

- accepted atom creates ReviewState;
- Again creates ReviewLog and schedules soon;
- Hard schedules short interval;
- Good schedules normal interval;
- Easy schedules longer interval;
- ReviewCount increments after grade;
- LapseCount increments after Again;
- due queue returns only due accepted atoms;
- due queue excludes suspended cards;
- due queue checks user ownership;
- graph color maps retention correctly;
- ReviewState is not updated without ReviewLog.

## Future FSRS Compatibility

Keep these fields because they are useful for future FSRS-style implementation:

```text
Stability
Difficulty
Retrievability
RetentionProbability
IntervalDays
DueAt
```

The simplified scheduler can later be replaced without rewriting the whole model.
