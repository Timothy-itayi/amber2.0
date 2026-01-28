# System Map Visualization — Feature Specification

**Version:** 1.0
**Created:** 2026-01-28
**Status:** Implemented
**Parent Document:** AMBER-GDD.md

---

## Overview

The System Map Visualization is the core visual feedback system for AMBER's "Turning Problems Into Features" mechanic. When a player processes a ticket, they don't just see a label appear — they watch the system **integrate** the new feature into a living network diagram.

### Design Principle

> **Features must be seen operating, not just named.**

The player should be able to describe what they *saw*, not just what they *read*.

---

## Components

### 1. SystemMapVisualization (Animation)

**File:** `components/game/SystemMapVisualization.tsx`

The full-screen animation that plays when a ticket is transformed into a feature.

#### Animation Sequence (3.8 seconds total)

| Phase | Timing | Description |
|-------|--------|-------------|
| Fade In | 0-400ms | Existing nodes and grid fade into view |
| Scan Sweep | 200-900ms | Horizontal scan line passes across display |
| Line Draw | 900-1800ms | Connection line draws from core to new node position |
| Node Appear | 1600-2200ms | Node pulses into existence with burst effect |
| Label Fade | 2100-2800ms | Feature name and type badge fade in |
| Hold | 2800-3800ms | Player has time to register before return |

#### Visual Elements

- **Grid Background:** Subtle amber grid lines establish the "system space"
- **Core Node:** Central pulsing amber node (the AMBER system itself)
- **Existing Nodes:** Previously installed features shown as smaller nodes
- **Connection Lines:** Lines from core to each node (amber for existing, colored for new)
- **New Node:** Animated appearance with triple-ring burst effect
- **Label:** Type badge + feature name + status

#### Node Colors by Tool Type

| Tool | Module Type | Color | Hex |
|------|-------------|-------|-----|
| FIX | feature | Green | `#4ade80` |
| ROUTE | routed | Blue | `#60a5fa` |
| DEFER | archived | Purple | `#a78bfa` |
| ESCALATE | critical | Red | `#f87171` |

---

### 2. SystemMap (Static/Interactive)

**File:** `components/game/SystemMap.tsx`

A reusable component for displaying the accumulated node network.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `modules` | `InstalledModule[]` | Array of installed modules to display |
| `width` | `number` | Container width |
| `height` | `number` | Container height |
| `showGrid` | `boolean` | Whether to show grid background |
| `showLabels` | `boolean` | Whether to show tooltips on tap |
| `onNodePress` | `(module) => void` | Callback when node is tapped |
| `selectedModuleId` | `string \| null` | Currently selected node for highlighting |

#### Features

- **Interactive Nodes:** Tap to see module details
- **Selection State:** Selected node shows highlight ring and tooltip
- **Critical Pulse:** Critical-type nodes pulse continuously
- **Core Animation:** Central node has subtle breathing animation
- **Empty State:** Shows message when no modules installed

#### Node Positioning

Nodes are placed in a spiral pattern around the center core:
- First 5 nodes form inner ring (72° apart)
- Subsequent nodes form outer rings
- Deterministic based on index (same position every time)

---

### 3. FeatureBoard (Hybrid Layout)

**File:** `components/game/FeatureBoard.tsx`

The persistent view where players review their accumulated features.

#### Layout

```
┌─────────────────────────────────────┐
│  SYSTEM MAP          ◀ CONSOLE     │  ← Header
│  FEATURE TOPOLOGY                   │
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │   SYSTEM MAP    │         │  ← Interactive Map
│         │    (nodes)      │         │
│         │                 │         │
│         └─────────────────┘         │
│       TAP NODES FOR DETAILS         │
├─────────────────────────────────────┤
│  [FIX:2] [ROUTE:1] [DEFER:0] [ESC:1]│  ← Category Counts
├─────────────────────────────────────┤
│  PROCESSED: 4   MODULES: 4   LOAD   │  ← Status Indicators
├─────────────────────────────────────┤
│  AMBER SYSTEM TOPOLOGY v2.0  OP-7734│  ← Footer
└─────────────────────────────────────┘
```

#### Design Rationale

The "hybrid" layout preserves the industrial control panel aesthetic while making the System Map the hero element. Players can:

1. See their accumulated network at a glance
2. Tap nodes to review individual features
3. Check category counts and system status
4. Return to console when ready

---

## Game Flow Integration

### Ticket Processing Flow

```
1. Player sees ticket on console
2. Player selects tool (FIX/ROUTE/DEFER/ESCALATE)
3. Player applies tool (toggle switch)
4. Screen transitions to SystemMapVisualization
5. Animation plays (3.8 seconds)
6. Screen returns to console
7. Player can view FeatureBoard anytime via FEATURES latch
```

### State Management

**In `app/index.tsx`:**

- `installedModules: InstalledModule[]` — Accumulated features
- `pendingModule: InstalledModule | null` — Module being animated
- `currentScreen: 'console' | 'featureBoard' | 'transforming'`

---

## Technical Implementation

### Dependencies

- `react-native-svg` — SVG rendering for grid and lines
- `react-native-reanimated` — Smooth 60fps animations
- `expo-linear-gradient` — Gradient effects

### Shared Utilities

**`mapColors`** — Consistent color palette across components
**`getNodePosition(index, width, height)`** — Deterministic node placement
**`getNodeColor(type)`** — Color mapping for module types

### Performance Considerations

- Grid lines are memoized (don't recalculate on re-render)
- Node positions are memoized based on module count
- SVG layer is static; animations use native driver via Reanimated
- Tooltips render conditionally only when node selected

---

## Visual References

### Inspiration

- **Hacknet** — System changes visualized as network diagrams
- **FTL** — Ship systems as interconnected nodes
- **Mini Metro** — Abstract networks with clean visual language
- **Inscryption Act 3** — Logic made visible through display screens

### Key Visual Principles

1. **Abstract, not literal** — Nodes represent concepts, not physical objects
2. **Color = meaning** — Each tool type has a distinct, consistent color
3. **Motion = attention** — Animation draws focus to new elements
4. **Accumulation = progress** — The map fills over time as proof of player impact

---

## Future Enhancements (Out of Scope for MVP)

- [ ] Pan/zoom for larger maps
- [ ] Node clustering when count exceeds threshold
- [ ] Connection lines between related features (not just to core)
- [ ] Escalation visual effects (node instability, line flickering)
- [ ] Sound design integration (beeps, whooshes, confirmation tones)
- [ ] Haptic feedback on node tap

---

## Changelog

### v1.0 (2026-01-28)

- Initial implementation
- SystemMapVisualization with 5-phase animation
- SystemMap reusable component with interactive nodes
- FeatureBoard hybrid layout with map center
- Tool-based color coding (green/blue/purple/red)
- Extended animation timing (3.8s total)
- Node burst effect with triple-ring animation

---

*This document supplements the main AMBER-GDD.md with detailed specifications for the visualization system.*
