# The Last Light

An offline, image-led detective case file that runs entirely in the browser. One case, five photographs, five documents, three people and a wall of red thread. Roughly 10–20 minutes.

Everything is authored: the clues, the dialogue, the contradiction rules and the solution live in typed data under `src/game/case/`. There is no AI, no API, no server and no case generation at runtime — the build is a static folder that works from `file://`, a USB stick or GitHub Pages.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm test         # 38 tests, including a full cold-start walkthrough
```

Requires Node 20+.

## The case

**Thursday 14 November, Meridian Gallery, 23:40.** Elias Wren's *The Last Light* (1903) was reported stolen at 21:18, during an eight-minute power cut. The crate it supposedly left in was declared empty. The insurance policy requires a conclusion by midnight.

You have a folder, five photographs, five documents, three people and a cork board. Find the substitute, find the original, name the person who staged the theft.

## How it plays

- **Overview** — the briefing, the incident summary and a running progress line.
- **Photographs** — open a still full size, zoom in, and click what looks wrong. Details are not marked; hovering gives a faint hint of what is examinable, and the *inspect* button dims everything except unexamined areas if you get stuck. Each find writes an observation into the case file.
- **Documents** — dockets, the conservator's report, the policy schedule. Every document yields an evidence card.
- **People** — who was where, what they say, and what they are not saying.
- **Interviews** — choose a topic, or present a piece of evidence. The right evidence to the right person produces a contradiction, a new statement and a new topic. Wrong evidence gets a deflecting line, not a game over.
- **Board** — pin evidence and statements, drag them around, and connect them with *supports* or *contradicts*. Only four connections are validated; the rest are yours to arrange. Conclusions are filed as dark cards, distinct from the evidence that produced them.
- **Theory** — once the three key conclusions are on the board, name the culprit and answer four questions. Wrong answers are explained and can be retried.

Progress (clues, interview transcripts, board layout and links, verdict) is saved to `localStorage` after every action. **Continue** resumes it; **New Case** offers to reset.

A few conveniences: `Esc` closes the viewer/sheet/overlay, `1`–`5` zoom the open photograph when the viewer has focus, and the tab rail shows unread counts for new material.

## Project structure

```
src/
  game/
    types.ts          the data model (photos, documents, people, rules, theory)
    case/
      photos.ts       five scenes, their hotspots, observations and clues
      documents.ts    docket, condition report, policy, incident log…
      people.ts       suspects, witnesses, topics and dialogue
      index.ts        the assembled case: clues, deductions, theory, resolution
    engine.ts         pure state transitions — clues, interviews, board, verdict
    engine.test.ts    discovery, contradiction, board and persistence tests
    caseData.test.ts  invariants over the authored case (ids, gating, anchors)
    walkthrough.test.ts  a cold start solved through player actions only
  components/
    scenes/           hand-drawn SVG scenes (no raster assets anywhere)
    …                 menu, folder, viewer, transcripts, board, theory, resolution
  styles/             base + one stylesheet per surface
```

The engine never touches React and the components never mutate case data. All view state that matters is in `GameState`, which is why the board survives navigation and reloads.

## Art and assets

Every illustration is hand-authored SVG or CSS: five scenes, portraits, the moth brooch, the gallery mark. No remote images, fonts, scripts or analytics. The page works with the network switched off; the only external request is the bundle itself.

## Deployment

`.github/workflows/deploy.yml` builds and tests on every push to `main` (and on demand), then publishes `dist/` to GitHub Pages. Vite is configured with a relative base, so the same build works at a project URL, a custom domain or from disk.

## Known limitations

- One case. The engine and data format could hold more, but there is only one authored file.
- The scenes are stylised vector drawings, not photographs; the hotspot coordinates are tuned to those drawings. Reworking a scene means re-checking its anchors (a test verifies they land inside the frame, not on the right detail).
- Hotspots are found by eye and by hover affordance; there is no full keyboard traversal *inside* a scene image, only the guided-inspect fallback and the evidence list.
- The board is mouse/touch-first: drag to place, click-click to connect. There is no multi-select.
- No audio, no localisation, no difficulty settings.
- Save data is versioned; a save from a different case version is discarded rather than migrated.
