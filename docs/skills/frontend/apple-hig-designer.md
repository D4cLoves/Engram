---
name: apple-hig-designer
description: Use by default for Engram frontend UI design and review. Apply macOS-style, Apple HIG-aware visual language and interaction patterns to the React web app: native-feeling layouts, sidebars, toolbars, sheets, popovers, semantic colors, accessibility, typography, spacing, touch targets, and polished workflow screens.
---

# Apple HIG Designer for Engram

## Purpose

Use this project-local skill as Engram's default frontend design direction.

Engram is a React web application, but the desired product feel is macOS-style and Apple HIG-aware: calm, native-feeling, polished, spatially clear, accessible, and highly usable for repeated knowledge work.

Do not dilute this into generic SaaS styling. When designing Engram UI, assume the user wants a macOS-inspired product unless they explicitly asks for another style.

## Default UI Direction

Engram should feel like a serious macOS knowledge tool adapted to the web.

Default patterns:

- sidebar-first information architecture;
- compact top toolbars for view actions and filters;
- native-feeling split views;
- inspector/details panels on the right;
- sheets or dialogs for focused creation/editing flows;
- popovers for lightweight options;
- segmented controls for modes and filters;
- tables/lists for dense repeated entities;
- subtle separators instead of heavy card stacking;
- semantic system-like colors for states;
- smooth but restrained transitions;
- strong keyboard, focus, and accessibility behavior.

The UI should not look like a marketing SaaS dashboard. It should feel like a polished desktop-class app.

## Required Context

Before using this skill, read:

- `AGENTS.md`
- `docs/product/mvp-slices.md`
- `docs/architecture/overview.md`

For feature-specific UI, also read:

- `docs/skills/process/feature-breakdown.md`
- `docs/skills/backend/api-contracts.md` when API shape affects UI state

## Engram UI Priorities

Apple-inspired polish must support Engram's real workflows:

- adding sources;
- watching processing status;
- reviewing Atom Inbox;
- merging duplicate candidates;
- inspecting graph nodes;
- completing SRS review sessions;
- reading analytics;
- exporting Markdown.

Avoid decorative Apple-like surfaces that make dense workflows harder to scan.

## HIG Principles

Apply these principles:

- clarity: make primary actions and current state obvious;
- deference: UI chrome should not compete with source content, atoms, graph, or review cards;
- depth: use hierarchy, panels, sheets, and transitions to clarify context;
- consistency: repeat interaction patterns across Sources, Atoms, Graph, Review, and Analytics;
- feedback: every async operation should show status and error state;
- accessibility: keyboard navigation, focus states, readable contrast, reduced motion support.

## Web Implementation Rules

Because Engram is web/React:

- use semantic HTML;
- use ARIA only when native semantics are insufficient;
- keep button touch targets at least 44px where practical;
- support keyboard navigation;
- support visible focus states;
- support responsive layouts;
- support reduced motion;
- use a system font stack that feels native on macOS and still works elsewhere;
- use SF-like iconography where the available icon library allows it;
- prefer lucide icons in implementation unless the project later adds a licensed SF Symbols-compatible setup;
- adapt native patterns to React web instead of requiring SwiftUI/UIKit.

## Visual Direction

Recommended:

- restrained surfaces;
- clean spacing;
- clear hierarchy;
- subtle separators;
- compact sidebars and panels;
- translucent or material-like surfaces only when they improve hierarchy;
- rounded controls with restraint and consistency;
- calm status colors;
- strong empty/loading/error states;
- readable cards only for repeated items or tool panels.

Avoid:

- marketing-style landing pages;
- excessive glass/blur effects that harm readability;
- purely decorative gradients;
- UI cards nested inside UI cards;
- huge hero typography inside working app screens;
- one-note blue/slate or purple palettes;
- styling that hides dense operational data.

## Component Guidance

### Source Submission

Use a focused workflow:

```text
Input panel
-> validation feedback
-> submit action
-> processing status
-> link to Atom Inbox
```

### Atom Inbox

Prioritize scanability:

- atom type badge;
- source reference;
- confidence or status when useful;
- accept/edit/reject actions;
- compact list layout;
- keyboard-friendly actions.

### Review Session

Prioritize focus:

- one card at a time;
- clear answer reveal state;
- Again/Hard/Good/Easy actions;
- large enough click/tap targets;
- progress indicator;
- calm completion state.

### Graph

Prioritize orientation:

- selected node details panel;
- visible relation types;
- retention coloring legend;
- filters that do not overwhelm the graph;
- avoid motion that makes graph inspection tiring.

## Accessibility Checklist

Before finalizing UI, check:

- all interactive elements are keyboard reachable;
- focus order is logical;
- visible focus states exist;
- text contrast is readable;
- controls have accessible names;
- loading and error states are announced or visible;
- motion is reduced when `prefers-reduced-motion` is set;
- buttons and controls are not too small on touch screens;
- form errors are tied to their inputs.

## Output Expectations

When designing or implementing UI with this skill:

- describe the user workflow;
- name the components or screens;
- explain the macOS/HIG choices briefly;
- keep the UI practical for Engram's MVP;
- include accessibility considerations;
- verify responsive behavior when implementing.
