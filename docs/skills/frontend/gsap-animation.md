---
name: gsap-animation
description: Use by default for Engram frontend animation work in React: GSAP core tweens, timelines, ScrollTrigger, Flip, MotionPath, plugins, @gsap/react useGSAP, cleanup, reduced motion, performance, and macOS-style native-feeling UI transitions.
---

# GSAP Animation for Engram

## Purpose

Use this project-local skill for Engram frontend animations.

GSAP is the default animation library for non-trivial Engram UI motion:

- panel and inspector transitions;
- Atom Inbox item entrances and state changes;
- review-card reveal and rating feedback;
- graph focus and detail transitions;
- processing status progress motion;
- scroll-driven documentation or analytics views;
- Flip layout transitions;
- MotionPath or SVG motion when useful.

Use CSS transitions for tiny single-state hover/focus effects. Use GSAP when sequencing, interruption, cleanup, scroll control, or coordinated motion matters.

## Required Context

Before implementing animations, read:

- `AGENTS.md`
- `docs/skills/frontend/apple-hig-designer.md`

When the animation is feature-specific, also read:

- `docs/skills/process/feature-breakdown.md`
- `docs/skills/backend/api-contracts.md` if API state drives animation

## Installation

GSAP is the accepted animation library, but do not install it just because this file exists.

When the current slice actually needs non-trivial animation, explain why CSS transitions are not enough and ask before adding the dependency:

```text
npm install gsap @gsap/react
```

All GSAP plugins should come from the public `gsap` npm package.

## React Rules

Prefer `@gsap/react` and `useGSAP`.

Register plugins once in the module or app setup where appropriate:

```ts
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
```

Use scoped refs:

```tsx
const containerRef = useRef<HTMLDivElement | null>(null);

useGSAP(
  () => {
    gsap.from(".atom-row", {
      y: 8,
      autoAlpha: 0,
      duration: 0.22,
      stagger: 0.025,
      ease: "power2.out",
    });
  },
  { scope: containerRef },
);
```

Rules:

- scope selector-based animation to a container ref;
- prefer refs for specific targets;
- do not use global selectors that can hit other components;
- clean up animations on unmount;
- wrap delayed/event-created GSAP work with context-safe patterns;
- do not run GSAP during SSR.

## Core Animation Defaults

Prefer:

- `x`, `y`, `scale`, `rotation`, `autoAlpha`;
- short durations for UI, usually `0.16s` to `0.35s`;
- `power2.out` for entrances;
- `power2.inOut` for state changes;
- `stagger` for lists;
- timelines for sequencing instead of chained delays.

Avoid:

- animating `width`, `height`, `top`, `left`, `margin`, or `padding` when transform-based motion can achieve the effect;
- long, theatrical animations inside repeated workflow screens;
- animations that block interaction;
- motion that hides data changes.

## Timelines

Use timelines when multiple elements must coordinate:

```ts
const timeline = gsap.timeline({
  defaults: { duration: 0.24, ease: "power2.out" },
});

timeline
  .from(".panel-title", { y: 6, autoAlpha: 0 })
  .from(".panel-action", { y: 4, autoAlpha: 0, stagger: 0.03 }, "-=0.12")
  .from(".panel-body", { y: 8, autoAlpha: 0 }, "-=0.08");
```

Use labels for more complex flows.

## ScrollTrigger

Use ScrollTrigger for scroll-driven animation, pinned sections, progress-linked views, or analytics/documentation pages.

Register it:

```ts
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

Rules:

- remove dev `markers` before production;
- avoid pinning large complex regions unless necessary;
- animate children of pinned elements rather than the pinned element itself;
- call `ScrollTrigger.refresh()` only when layout actually changes;
- debounce refresh after dynamic content loads.

## Flip

Use Flip for layout transitions:

- moving atoms between inbox lists;
- expanding/collapsing details panels;
- switching graph/list views;
- reordering cards or rows.

Rules:

- capture state before DOM/layout changes;
- apply the state change;
- run Flip from the captured state;
- keep transitions short and practical.

## MotionPath and SVG

Use MotionPath for graph or concept-map moments only when it clarifies movement.

Do not add decorative motion paths that make the knowledge graph harder to inspect.

## Reduced Motion

Respect `prefers-reduced-motion`.

Use `gsap.matchMedia()` to reduce or disable animations:

```ts
const media = gsap.matchMedia();

media.add(
  {
    reduceMotion: "(prefers-reduced-motion: reduce)",
    fullMotion: "(prefers-reduced-motion: no-preference)",
  },
  (context) => {
    const { reduceMotion } = context.conditions;

    gsap.from(".panel", {
      y: reduceMotion ? 0 : 8,
      autoAlpha: 0,
      duration: reduceMotion ? 0.01 : 0.22,
    });
  },
);
```

## Performance

Rules:

- animate transforms and opacity;
- use `will-change` only on elements that actually animate;
- use `stagger` instead of many manual delays;
- avoid hundreds of simultaneous tweens;
- kill or pause off-screen/inactive animations;
- use `gsap.quickTo()` for frequently updated pointer-following values;
- test graph and list animations on lower-end devices.

## Engram Motion Language

Motion should support the macOS-style UI direction:

- subtle, responsive, and native-feeling;
- no bouncy toy-like motion for core workflows;
- no gratuitous hero animation inside app screens;
- state changes should feel spatially understandable;
- review feedback can be more expressive but still restrained;
- graph transitions should improve orientation, not distract.

## Good Engram Use Cases

### Atom Inbox

- rows fade/slide in after processing;
- accepted/rejected state uses a short feedback transition;
- edits open in a sheet with subtle entrance.

### Processing Pipeline

- step changes animate through status indicators;
- failure state appears clearly without dramatic motion;
- retries reset progress cleanly.

### Review Session

- card reveal;
- rating feedback;
- next card transition;
- completion state.

### Knowledge Graph

- selected node focus;
- details panel transition;
- filter changes with stable layout;
- avoid large uncontrolled physics-like motion unless the graph library owns it.

## Final Rule

Use GSAP to make Engram feel polished and alive, not busy. If animation reduces clarity, remove it.
