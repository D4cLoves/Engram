---
name: macos-design
description: Design and build native-feeling macOS application UIs. Use this skill whenever the user asks to create a desktop app, macOS app, Mac-style interface, Apple-style UI, system utility, or anything that should look and feel like a native Mac application. Also trigger when users mention "native feel", "desktop app design", "Apple design patterns", "sidebar layout", "traffic lights", or want to build tools/utilities that feel like they belong on macOS. This skill covers layout, composition, interaction patterns, animations, light/dark mode, and all the subtle details that make an app feel like Apple built it.
---

# macOS Native App Design Skill

Build interfaces that feel like they belong on the user's computer — not websites crammed into a window.

## Core Philosophy

A native app is not a destination. It is a **system tool** that lives where the user needs it. Design every interaction around this principle: appear when needed, get out of the way immediately after.

## Two Rules That Beat Everything Else

1. **Prefer system components and conventions** over bespoke UI — the fastest path to "feels right on Mac".
2. **If you customize bars, backgrounds, borders, or control chrome**: stop and justify it.

## Before You Code

Read these references based on what you're building:

- **All macOS apps** → Read `references/layout-and-composition.md` (required)
- **Apps with keyboard shortcuts, panels, toasts, popovers** → Read `references/interaction-patterns.md`
- **Light/dark mode, color, typography, Liquid Glass** → Read `references/visual-design.md`

## Quick-Start Checklist: Mac Citizen Checklist

Use this as a pre-flight checklist before writing or committing any frontend code:

| Area | Requirement |
|------|-------------|
| **Layout** | Top bar/toolbar for global actions, sidebar for navigation, center/right for content. Include integrated traffic lights. |
| **Menu Bar / Header** | Standard layout (App/File/Edit/View/Window/Help or logical equivalent), `⌘,` for Settings. |
| **Keyboard** | Every primary command reachable via keyboard, standard shortcuts work (`⌘S` to save, `⌘F` to search, `Esc` to close). |
| **Windows** | Resize fluidly, support multiple windows/tabs, respect fullscreen/minimize, and ensure top ~50px is a draggable zone. |
| **Sidebars** | Top-level navigation, scannable items, content extends behind, collapsible, native row height (`28-32px`). |
| **Toolbars** | Group by function/frequency, demote secondary actions to "more" menu, standard height (`48-52px`). |
| **Text & Typography** | Use system font stack (`-apple-system`), tight letter-spacing, standard editing behaviors, 13px base body text. |
| **Accessibility** | VoiceOver/screen-reader labels, full keyboard navigation (focus rings), Reduced Motion (`prefers-reduced-motion`) support. |
| **Light & Dark Mode** | Design both modes independently. Never directly invert colors. Respect system settings (`prefers-color-scheme`). |
| **Empty States & Disclosure** | Show clear empty states. Progressive disclosure — only reveal advanced UI when it becomes useful. |
| **Drag and Drop** | Support dragging content in AND out of the app. Essential for native utility feel. |
| **Micro-animations** | State changes get transition and feedback. Use GSAP for physics-based fluid transitions. No jumpy animations. |

## Implementation Notes

When building as a web artifact (React/HTML):
- Simulate the macOS window chrome (title bar, traffic light dots, rounded corners)
- Use `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text"` font stack
- Use `backdrop-filter: saturate(180%) blur(20px)` for native vibrancy/translucency effects (sidebars, headers, panels)
- Rounded corners: 10px for windows, 12px for modals/panels, 8px for cards, 6px for buttons/inputs, 14px for toggles (pills)
- Shadows must be subtle and layered, including the essential `0 0 0 0.5px` border shadow for sharp native definition
- Respect `prefers-color-scheme` media query for automatic light/dark switching

When building with Electron, Tauri, or native frameworks:
- Use system title bar integration where possible
- Respect system accent color and appearance settings
- Use native drag-and-drop APIs, not polyfills

