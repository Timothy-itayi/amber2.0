Nice, this is exactly the right moment to formalize it.
Below is your **updated GDD**, with the **Feature Board + visual transformation system** integrated cleanly into the existing structure, without bloating scope.

I’ve:

* kept your tone and structure
* added the new visual/gameplay layer
* avoided tech or implementation detail
* preserved MVP focus

You can drop this straight into `doc/AMBER-GDD.md`.

---

# AMBER — Game Design Document

**Version:** 0.2
**Last updated:** 2026-01-28
**Status:** Pre-production / MVP scoping

---

## 1. Vision & positioning

### One-liner

**AMBER** is a fast-paced narrative interface game where you operate a futuristic tech support system that “fixes” broken reality by turning faults into features. You don’t repair; you reinterpret.

### Elevator pitch

You’re an operator on the helpdesk for a clearly broken system. Tickets show up as absurd “bugs in the world”: pigeons delivering invoices, shadows freelancing, lemon shortages only on Tuesdays. Your job is to inspect each ticket, pick a tool, apply a fix—and watch the system reframe whatever happens as a feature.

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

1. **Ticket arrives** — A “reality bug” appears as a card/ticket.
2. **Inspect** — Player opens details.
3. **Apply tool** — Player selects a tool and applies it.
4. **Transformation** — The ticket visually transforms into a system artifact.
5. **Log** — Terminal-style line reframes the bug as a feature.
6. **Next ticket** — Loop continues.

Progression is shown visually through accumulation of system features.

---

### “Turning Problems Into Features” as mechanic

When the player:

* Ignores a bug
* Misroutes a ticket
* Uses the “wrong” fix

The system **reframes it as a feature**.

There are no fail states—only new interpretations.

**Examples:**

| Apparent bug                  | Reframed feature                |
| ----------------------------- | ------------------------------- |
| Printer only prints “HELP”    | Emergency Messaging Device      |
| Door opens randomly           | Surprise Entry System           |
| Pigeons delivering invoices   | Avian Logistics Integration     |
| Shadow won’t stop freelancing | Autonomous Shadow Labour Module |

Mechanics, humour, and narrative all stem from this reframe.

---

### Tickets (content type)

*(unchanged)*

---

### Tools (player actions)

Tools do not “solve” bugs.
They determine **how the system transforms them**.

Each tool maps to a **type of system artifact**:

| Tool     | Meaning             | Visual outcome              |
| -------- | ------------------- | --------------------------- |
| FIX      | Declare as feature  | Feature Module installed    |
| ROUTE    | Send elsewhere      | Data Packet / Routed Module |
| DEFER    | Preserve for later  | Archived / Capsule Module   |
| ESCALATE | Promote to priority | Critical / Alert Module     |

Tools can be reflavoured (e.g. “Reality Calibration,” “Feature Mapper”), but these meanings remain consistent.

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

### New: Feature Board

A secondary in-world interface panel showing installed “features”.

* Appears as a slide-out panel or brief cutaway.
* Contains multiple **module slots**.
* Starts mostly empty.
* Fills over time with visual modules created from resolved tickets.

This board is the main visual representation of:

* progress
* escalation
* narrative absurdity

---

### Flow of one ticket

1. Ticket appears
   “Pigeons delivering invoices again.”

2. Player chooses tool (e.g. FIX)

3. Ticket animates

4. Feature Board appears:

   * A new module installs into a slot
   * Label appears:

     > AVIAN LOGISTICS INTEGRATION — ACTIVE

5. Return to Ticket Console

---

## 6. Narrative framing

### Fiction

The player is **Operator OP-7734**, provisional clearance, on the Reality Support desk for AMBER Industries. Tickets are genuine in-world complaints; fixes are whatever the AMBER system does and then labels as a feature.

AMBER never doubts itself.
Every outcome is “by design”.

### Voice

*(unchanged)*

---

## 7. Art & audio direction

### Visual

* **Existing:** 90s terminal aesthetic (amber/green phosphor, scanlines), device-frame UI, pixel dissolve, boot/CRT feel.
* **Ticket cards:** Clear hierarchy; optional glitch for escalation.
* **Feature Board:**

  * Mechanical, sci-fi control panel
  * CRTs, dials, toggles, LEDs
  * Module slots that fill with:

    * Feature modules
    * Routed packets
    * Archived capsules
    * Critical alerts

Modules are symbolic UI objects, not literal world representations.

### Audio

*(unchanged)*

---

## 8. Tech stack (existing)

*(unchanged)*

---

## 9. Scope summary

### In scope for MVP

* Ticket Console
* Feature Board
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

---

*Document lives in `doc/AMBER-GDD.md`. Update this file as mechanics, scope, or brand details change.*

