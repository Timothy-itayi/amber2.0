# AMBER — Game Design Document

**Version:** 0.3
**Last updated:** 2026-01-28
**Status:** Pre-production / MVP scoping

---

## 1. Vision & positioning

### One-liner

**AMBER** is a fast-paced narrative interface game where you operate a futuristic tech support system that "fixes" broken reality by turning faults into features. You don't repair; you reinterpret.

### Elevator pitch

You're an operator on the helpdesk for a clearly broken system. Tickets show up as absurd "bugs in the world": pigeons delivering invoices, shadows freelancing, lemon shortages only on Tuesdays. Your job is to inspect each ticket, pick a tool, apply a fix—and watch the system reframe whatever happens as a feature.

Crucially, bugs do not disappear.
They are **transformed into visible system components**.

Tone: quirky, playful, chaotic.
The slogan is the mechanic: **Turning Problems Into Features.**

### Platform & format

* **Platform:** Mobile-first (iOS/Android via Expo), optionally web.
* **Format:** Short-session, single-player. Sessions are built around a ticket queue and tool use, with strong audiovisual feedback and light progression (unlockable tools, escalation states).

---

## 2. Brand & identity

*(unchanged)*

---

## 3. Core loop & mechanics

### MVP loop (per ticket)

1. **Ticket arrives** — A "reality bug" appears as a card/ticket.
2. **Inspect** — Player opens details.
3. **Apply tool** — Player selects a tool and applies it.
4. **Transformation** — The ticket visually transforms into a system artifact.
5. **Log** — Terminal-style line reframes the bug as a feature.
6. **Next ticket** — Loop continues.

Progression is shown visually through accumulation of system features.

---

### "Turning Problems Into Features" as mechanic

When the player:

* Ignores a bug
* Misroutes a ticket
* Uses the "wrong" fix

The system **reframes it as a feature**.

There are no fail states—only new interpretations.

**Examples:**

| Apparent bug                  | Reframed feature                |
| ----------------------------- | ------------------------------- |
| Printer only prints "HELP"    | Emergency Messaging Device      |
| Door opens randomly           | Surprise Entry System           |
| Pigeons delivering invoices   | Avian Logistics Integration     |
| Shadow won't stop freelancing | Autonomous Shadow Labour Module |

Mechanics, humour, and narrative all stem from this reframe.

---

### Tickets (content type)

*(unchanged)*

---

### Tools (player actions)

Tools do not "solve" bugs.
They determine **how the system transforms them**.

Each tool maps to a **type of system artifact**:

| Tool     | Meaning             | Visual outcome              |
| -------- | ------------------- | --------------------------- |
| FIX      | Declare as feature  | Feature Module installed    |
| ROUTE    | Send elsewhere      | Data Packet / Routed Module |
| DEFER    | Preserve for later  | Archived / Capsule Module   |
| ESCALATE | Promote to priority | Critical / Alert Module     |

Tools can be reflavoured (e.g. "Reality Calibration," "Feature Mapper"), but these meanings remain consistent.

---

### Escalation & progression

* **Escalation:** Represented as UI corruption, blinking indicators, and more unstable feature modules.
* **Progression:** The system fills with more features, making the interface denser and stranger over time.

The player is effectively building a dysfunctional operating system out of mistakes.

---

## 4. Controls & UX

*(unchanged except for new screen below)*

---

## 5. Screens & flows

### Existing

1. **Menu**
2. **Boot / Logo / Onboarding**
3. **Ticket Console** — main play screen

### New: System Map Visualization

When a ticket is "fixed," the player sees a **visual manifestation of the system integrating the new feature** — not just a UI widget appearing.

The System Map is:

* A network diagram showing the AMBER system's current state
* Nodes represent installed features (color-coded by type)
* Lines connect features to the system core
* New features animate into existence with scan sweep + path draw

This visualization serves as:

* **The transformation beat** — the moment between bug and feature
* **Visual proof** that the system has changed
* **Accumulating evidence** of the player's impact

Design principle:
> **Features must be seen operating, not just named.**

Visual references: Hacknet, FTL, Mini Metro, Inscryption Act 3.

---

### Feature Board (Registry View)

A secondary panel for reviewing installed modules.

* Shows module counts by type (Feature, Routed, Archived, Critical)
* Displays system load and capacity indicators
* Accessible via the console's FEATURES latch

---

### Flow of one ticket

1. Ticket appears
   "Pigeons delivering invoices again."

2. Player chooses tool (e.g. FIX)

3. **System Map Visualization plays:**
   * Screen transitions to dark network view
   * Scan sweep passes across the display
   * Connection line draws from system core to new node position
   * Node pulses into existence with glow
   * Label fades in:

     > AVIAN LOGISTICS INTEGRATION — ACTIVE

4. Return to Ticket Console

The player *sees* the feature being integrated, not just a button appearing.

---

## 6. Narrative framing

### Fiction

The player is **Operator OP-7734**, provisional clearance, on the Reality Support desk for AMBER Industries. Tickets are genuine in-world complaints; fixes are whatever the AMBER system does and then labels as a feature.

AMBER never doubts itself.
Every outcome is "by design".

### Voice

*(unchanged)*

---

## 7. Art & audio direction

### Visual

* **Existing:** 90s terminal aesthetic (amber/green phosphor, scanlines), device-frame UI, pixel dissolve, boot/CRT feel.
* **Ticket cards:** Clear hierarchy; optional glitch for escalation.
* **System Map Visualization:**

  * Dark background with subtle grid
  * Amber/colored glowing nodes and connection lines
  * Scan sweep animation for "classification" feel
  * Node types distinguished by color:
    * Feature (green)
    * Routed (blue)
    * Archived (purple)
    * Critical (red)

* **Feature Board:**

  * Mechanical, sci-fi control panel aesthetic
  * CRTs, dials, toggles, LEDs
  * Module counts and system status displays

### Audio

*(unchanged)*

---

## 8. Tech stack (existing)

*(unchanged)*

---

## 9. Scope summary

### In scope for MVP

* Ticket Console
* System Map Visualization (transformation animation)
* Feature Board (registry view)
* 4 module templates:

  * Feature
  * Routed
  * Archived
  * Critical
* 5–10 tickets
* 3–5 tools
* Terminal log
* Haptics and visual feedback

### Out of scope for MVP

*(unchanged)*

### Possible next steps

*(unchanged)*

---

## 10. Design law

**Reality breaks.
AMBER rebrands it.
The interface mutates.**

**Features must be seen operating, not just named.**

---

*Document lives in `doc/AMBER-GDD.md`. Update this file as mechanics, scope, or brand details change.*
