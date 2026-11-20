import type {
  CaseData,
  Clue,
  DeductionRule,
  PresentationRule,
  TheoryQuestion,
  TheoryRequirement,
} from '../types';
import { photos } from './photos';
import { documents } from './documents';
import { people, statements } from './people';

const authoredClues: Clue[] = [
  // ── Photograph observations ────────────────────────────────────────────
  {
    id: 'clue_frame_nick',
    kind: 'observation',
    title: 'A chip in the gilt frame',
    summary:
      'In the 19:12 press shot, the frame’s lower-right corner has an old chip showing pale gesso.',
    detail:
      'The lower-right corner of the frame carries a dark loss about two centimetres across, with raw white gesso beneath the gold. The moulding around it is worn smooth: old damage, not fresh. The gallery’s own director later describes this chip as “the painting’s fingerprint”.',
    source: 'Photograph · East Room · 19:12',
    photoId: 'p_east_room',
    key: true,
  },
  {
    id: 'clue_wall_label',
    kind: 'observation',
    title: 'Wall label, 71 × 52 cm',
    summary:
      'The wall label records the canvas size — and the painting is on loan from a private collection.',
    detail:
      'ELIAS WREN, The Last Light, 1903. Oil on canvas, 71 × 52 cm. On loan from a private collection, Antwerp. The dimensions will matter if you ever need to know what a packing crate was built to hold.',
    source: 'Photograph · East Room · 19:12',
    photoId: 'p_east_room',
  },
  {
    id: 'clue_frame_intact',
    kind: 'observation',
    title: 'An unmarked corner',
    summary:
      'The frame in the 21:04 corridor still has no chip. Same moulding — different condition.',
    detail:
      'At 21:04 the exposed lower-right corner of the carried frame is a clean, continuous gilt edge. The moulding profile matches the press shot, the gold reads flatter under the corridor light — but there is no chip and no pale gesso. Whatever left through the corridor, it was not the painting photographed on the wall.',
    source: 'CCTV still · Service corridor · 21:04',
    photoId: 'p_corridor',
    key: true,
  },
  {
    id: 'clue_renn_vest',
    kind: 'observation',
    title: 'A hi-vis under the coat',
    summary:
      'Reflective banding crosses the corridor figure’s shoulders — the kind of vest the AV crew wear.',
    detail:
      'Two reflective bands run across the shoulders beneath the grey coat. It is a hi-vis waistcoat, of the sort issued to contractors. It is not, by itself, a name.',
    source: 'CCTV still · Service corridor · 21:04',
    photoId: 'p_corridor',
  },
  {
    id: 'clue_bangle',
    kind: 'observation',
    title: 'Gold at the wrist',
    summary:
      'The hand steadying the frame wears a thin gold bangle that catches the exit sign.',
    detail:
      'A narrow gold band at the wrist, not a watch: the hand is turned the wrong way for a dial. It is the only warm colour in the frame. Someone with a gold bangle was handling the painting at 21:04.',
    source: 'CCTV still · Service corridor · 21:04',
    photoId: 'p_corridor',
  },
  {
    id: 'clue_brooch_storage',
    kind: 'observation',
    title: 'The moth on the crate',
    summary:
      'A silver moth brooch with a snapped clasp lies on the crate lid at 20:58.',
    detail:
      'A silver brooch in the shape of a moth lies on the lid of the open travel crate, wings spread, next to the loose strapping. The clasp has snapped. Nobody has reported it lost, and it is not part of the gallery’s collection.',
    source: 'Photograph · Storage room · 20:58',
    photoId: 'p_storage',
    key: true,
  },
  {
    id: 'clue_crate_insert',
    kind: 'observation',
    title: 'Lined for a canvas',
    summary:
      'The crate’s foam is cut with a canvas-shaped recess and a felt sleeve. It was never an empty box.',
    detail:
      'Dense grey foam with a rectangular recess the size of a 71 × 52 canvas; a felt sleeve folded beside it. The recess is empty at 20:58. Crates are cut for what they carry — and this one was declared empty at the border that morning.',
    source: 'Photograph · Storage room · 20:58',
    photoId: 'p_storage',
    key: true,
  },
  {
    id: 'clue_crate_bay',
    kind: 'observation',
    title: 'The crate, still in the bay',
    summary:
      'At 18:20 the travel crate is in the loading bay. By 20:58 it is in the storage room.',
    detail:
      'Stencilled for Hallow Fine Art and strapped to a pallet under the bay lamp. It did not walk downstairs by itself, and only two people were in the service areas before the doors opened.',
    source: 'Door camera · Loading bay · 18:20',
    photoId: 'p_loading_bay',
  },
  {
    id: 'clue_renn_van',
    kind: 'observation',
    title: 'Renn Audio-Visual van',
    summary:
      'The contractor’s van, nose-out with a ladder on the rack, parked in the loading bay.',
    detail:
      'White panel van, RENN AUDIO-VISUAL in red on the flank. Parked nose-out, ready to leave. Consistent with a contractor who wanted to be gone — not, on its own, with anything else.',
    source: 'Door camera · Loading bay · 18:20',
    photoId: 'p_loading_bay',
  },
  {
    id: 'clue_brooch_worn',
    kind: 'observation',
    title: 'Worn at 19:40',
    summary:
      'The same moth brooch is pinned to Voss’s lapel in a photograph posted at 19:44.',
    detail:
      'Silver moth, wings spread, high on Margit Voss’s left lapel. The image comes from the gallery’s own account and was posted at 19:44, four minutes after it was taken — a timestamp with a public receipt.',
    source: 'Gallery post · Cloakroom · 19:40',
    photoId: 'p_cloakroom',
    key: true,
  },
  {
    id: 'clue_bangle_worn',
    kind: 'observation',
    title: 'The same gold bangle',
    summary:
      'Voss wears a thin gold bangle on her left wrist at 19:40.',
    detail:
      'A narrow gold band with a small dark stone, sitting above the wrist bone. It is the same shape and the same place as the gold at the wrist in the corridor still.',
    source: 'Gallery post · Cloakroom · 19:40',
    photoId: 'p_cloakroom',
  },
  {
    id: 'clue_vest_rail',
    kind: 'observation',
    title: 'A hi-vis on the rail',
    summary:
      'A contractor’s hi-vis hangs among the guests’ coats at 19:40. Anyone could take it.',
    detail:
      'A hi-vis waistcoat with reflective banding hangs on the cloakroom rail behind the director’s shoulder. No name is visible from this angle. It makes the vest in the corridor evidence of a wardrobe, not a person.',
    source: 'Gallery post · Cloakroom · 19:40',
    photoId: 'p_cloakroom',
  },

  // ── Documents ──────────────────────────────────────────────────────────
  {
    id: 'doc_incident',
    kind: 'document',
    title: 'Incident memo 14/11-MG-07',
    summary:
      'The case as it was handed to you: an empty wall, an open service door, no forced entry.',
    detail:
      'Reported at 21:18 by Margit Voss. No forced entry, no struggle, alarm on standby for a private event. Eleven guests, three staff, one contractor. The painting is insured for €1.4 million and the memo wants a conclusion by Monday.',
    source: 'Document · Art & Property Unit',
    documentId: 'd_incident',
  },
  {
    id: 'doc_delivery',
    kind: 'document',
    title: 'Delivery docket 11-2214',
    summary:
      'A foam-lined crate arrived at 08:40 declared EMPTY, signed for by Voss, sealed by her at 21:50, collected at 23:10.',
    detail:
      'Delivered from Kardel Fine Art Storage, Antwerp, at 08:40; declared empty with no commercial value. Received by M. Voss. Collected at 23:10, sealed at 21:50 by M. Voss with two nylon straps. The seal went on thirty-two minutes after she reported a theft.',
    source: 'Document · Hallow Fine Art Logistics',
    documentId: 'd_delivery',
    key: true,
  },
  {
    id: 'doc_restoration',
    kind: 'document',
    title: 'Kardel receipt 8841',
    summary:
      'The painting was conserved in September and returned in October. The crate stayed behind in Antwerp.',
    detail:
      'Collected 8 September for surface cleaning; returned 2 October with the historic chip at the lower corner left exactly as found. The packing crate was retained at the Kardel depot. That crate arrived at the gallery on the morning of 14 November, declared empty.',
    source: 'Document · A. Kardel Restorations',
    documentId: 'd_restoration',
  },
  {
    id: 'doc_insurance',
    kind: 'document',
    title: 'Insurance endorsement, 12 August',
    summary:
      'The painting was insured for €1.4m — raised from €900,000 at the insured’s request.',
    detail:
      'Northway Fine Art raised the sum insured from €900,000 to €1,400,000 on 12 August at the insured’s request, citing a market revaluation. Theft cover requires notification within 24 hours and written notice of any out-of-hours transit.',
    source: 'Document · Northway Fine Art',
    documentId: 'd_insurance',
  },
  {
    id: 'doc_removal',
    kind: 'document',
    title: 'Night security log',
    summary:
      'After the alarm, one sealed crate left the building at 23:10. The courtyard skip was not collected.',
    detail:
      'Night log: guests out at 21:30, police at 21:52, catering van at 22:55, Hallow Freight at 23:02. At 23:10 one sealed travel crate was loaded, declared EMPTY. At 23:20 the courtyard skip was not collected because the gate was locked.',
    source: 'Document · Meridian Gallery',
    documentId: 'd_removal',
    key: true,
  },

  // ── Conclusions (added by the deduction board) ─────────────────────────
  {
    id: 'i_substitute',
    kind: 'insight',
    title: 'The frame that changed',
    summary:
      'The painting carried out at 21:04 was not the one photographed on the wall at 19:12.',
    detail:
      'The 19:12 press photograph shows an old chip in the frame’s lower-right corner. The 21:04 corridor still shows the same moulding with a clean corner. Two versions of one painting were in the building: the real one, and a substitute. A theft looks like something being taken. This looks like something being exchanged — and then reported.',
    source: 'Deduction · Deduction board',
    key: true,
  },
  {
    id: 'i_voss_storage',
    kind: 'insight',
    title: 'The brooch in the storage room',
    summary:
      'Voss was in the storage room between 19:40 and 20:58, whatever she says.',
    detail:
      'At 19:40 the moth brooch is pinned to her lapel. At 20:58 it is lying on the crate lid in the storage room, clasp snapped. A brooch does not walk downstairs. Her statement that she never went near the storage room is false, and the false statement covers the window in which the paintings changed places.',
    source: 'Deduction · Deduction board',
    key: true,
  },
  {
    id: 'i_crate_lie',
    kind: 'insight',
    title: 'A crate that was never empty',
    summary:
      'The docket calls the crate empty; its foam is cut for a canvas. The paperwork is lying.',
    detail:
      'A 212 cm travel crate arrived declared EMPTY, with no commercial value, on the morning of the event. The storage photograph shows dense foam cut to a 71 × 52 canvas with a felt sleeve. A crate is lined for what it carries. Then it was sealed at 21:50 — after the alarm — and collected, sealed, at 23:10. The one large container to leave the building was never opened again.',
    source: 'Deduction · Deduction board',
    key: true,
  },
  {
    id: 'i_vest',
    kind: 'insight',
    title: 'A vest anyone could wear',
    summary:
      'The hi-vis in the corridor identifies a coat rail, not a contractor.',
    detail:
      'A contractor’s vest hangs on the cloakroom rail at 19:40; the corridor figure wears one at 21:04. Renn’s own vest has his company name across the back and was left on that rail. The vest points at a wardrobe available to everyone in the building.',
    source: 'Deduction · Deduction board',
  },
];

const statementClues: Clue[] = statements.map((statement) => {
  const person = people.find((p) => p.id === statement.personId);
  return {
    id: statement.id,
    kind: 'statement',
    title: statement.title,
    summary: statement.summary,
    detail: `“${statement.text}” — ${statement.context}`,
    quote: statement.text,
    source: `Statement · ${person?.name ?? 'Interview'}`,
    personId: statement.personId,
    key: statement.key,
  };
});

const clues: Clue[] = [...authoredClues, ...statementClues];

const presentations: PresentationRule[] = [
  // ── Voss ───────────────────────────────────────────────────────────────
  {
    id: 'pr_voss_brooch',
    personId: 'voss',
    evidenceId: 'clue_brooch_storage',
    requiresClues: ['clue_brooch_worn'],
    contradiction: true,
    unlockTopicIds: ['voss_brooch_lie'],
    statementId: 'st_voss_brooch_lent',
    lines: [
      {
        kind: 'you',
        text: 'This is the storage room at 20:58. That is your brooch on the crate lid.',
      },
      { kind: 'say', text: 'That could be anything. A clip —' },
      {
        kind: 'you',
        text: 'You are wearing it at 19:40. Unless it walked downstairs by itself.',
      },
      {
        kind: 'say',
        text: '...The clasp was loose. I lent it to Nadia at the toast. That is all this is.',
      },
      {
        kind: 'thought',
        text: 'She has an answer for the brooch. She does not have an answer for why it is downstairs.',
      },
    ],
    repeatLines: [
      { kind: 'say', text: 'I lent it to Nadia. We have established that.' },
      { kind: 'thought', text: 'We have established nothing of the kind.' },
    ],
  },
  {
    id: 'pr_voss_crate',
    personId: 'voss',
    evidenceId: 'clue_crate_insert',
    requiresClues: ['doc_delivery'],
    contradiction: true,
    unlockTopicIds: ['voss_crate_lie'],
    statementId: 'st_voss_crate_sealed',
    lines: [
      {
        kind: 'you',
        text: 'The docket says empty. The crate has foam cut to the size of a seventy-one by fifty-two canvas.',
      },
      { kind: 'say', text: 'It came from Antwerp lined. That is how travel crates are made.' },
      { kind: 'you', text: 'Then it did not arrive empty, did it.' },
      {
        kind: 'say',
        text: 'It arrived empty of anything I was required to declare. I sealed it for the van. Do you know what it costs to store a crate in this city?',
      },
      {
        kind: 'thought',
        text: 'No. But I know what it costs to fill one.',
      },
    ],
    repeatLines: [
      { kind: 'say', text: 'It was lined when it arrived. I have said so.' },
    ],
  },
  {
    id: 'pr_voss_substitute',
    personId: 'voss',
    evidenceId: 'i_substitute',
    contradiction: true,
    unlockTopicIds: ['voss_frame'],
    lines: [
      {
        kind: 'you',
        text: 'The painting in the corridor had no chip in its frame. The painting on your wall at 19:12 did. Someone swapped them.',
      },
      { kind: 'say', text: '“Someone.”' },
      {
        kind: 'you',
        text: 'You told me the chip was the painting’s fingerprint. I think it just identified a forgery.',
      },
      {
        kind: 'say',
        text: 'Then find me a second painting, or charge someone, or leave my gallery.',
      },
      {
        kind: 'thought',
        text: 'She is not asking how I know. She is asking whether I can prove it. That is a different question.',
      },
    ],
    repeatLines: [
      { kind: 'say', text: 'Find me a second painting. Then we will talk.' },
    ],
  },
  {
    id: 'pr_voss_insurance',
    personId: 'voss',
    evidenceId: 'doc_insurance',
    lines: [
      {
        kind: 'say',
        text: 'That endorsement was the lender’s condition, not my idea. If you are going to accuse me of fraud, do it with something better than a premium.',
      },
      { kind: 'thought', text: 'She is right about the endorsement. It is a reason, not a proof.' },
    ],
  },
  {
    id: 'pr_voss_restoration',
    personId: 'voss',
    evidenceId: 'doc_restoration',
    lines: [
      {
        kind: 'say',
        text: 'Kardel return everything they are sent. Two containers for one painting is not a mystery, it is a conservator with a van.',
      },
      { kind: 'thought', text: 'Then why does the receipt say the crate stayed in Antwerp — and why is it here?' },
    ],
  },
  {
    id: 'pr_voss_nick',
    personId: 'voss',
    evidenceId: 'clue_frame_intact',
    lines: [
      {
        kind: 'say',
        text: 'You cannot identify a frame from a still at that distance. I have seen the thing in better light than your camera ever will.',
      },
      {
        kind: 'thought',
        text: 'She is wearing white gold rings today. On her left wrist, the gold bangle is absent.',
      },
    ],
  },
  {
    id: 'pr_voss_bangle',
    personId: 'voss',
    evidenceId: 'clue_bangle',
    lines: [
      { kind: 'say', text: 'Half the women in that room wear gold. Half of Antwerp wears gold.' },
      { kind: 'thought', text: 'She has not asked to see the photograph. She already knows what is in it.' },
    ],
  },
  {
    id: 'pr_voss_vest',
    personId: 'voss',
    evidenceId: 'clue_renn_vest',
    lines: [
      { kind: 'say', text: 'Then you have your man. I told you where to look and you looked.' },
      { kind: 'thought', text: 'She is almost pleased. It is not the reaction of a woman protecting a secret.' },
    ],
  },
  {
    id: 'pr_voss_renn_admission',
    personId: 'voss',
    evidenceId: 'st_renn_admission',
    lines: [
      {
        kind: 'say',
        text: 'Dawid moved it? Then Dawid had his hands on it, and that is the end of it. Charge him and let me open on Saturday.',
      },
    ],
  },
  {
    id: 'pr_voss_delivery',
    personId: 'voss',
    evidenceId: 'doc_delivery',
    lines: [
      {
        kind: 'say',
        text: 'I signed what the driver put in front of me. People do that all day, in every doorway in this city.',
      },
    ],
  },

  // ── Renn ───────────────────────────────────────────────────────────────
  {
    id: 'pr_renn_crate',
    personId: 'renn',
    evidenceId: 'clue_crate_bay',
    requiresClues: ['clue_crate_insert'],
    contradiction: true,
    unlockTopicIds: ['renn_time'],
    statementId: 'st_renn_admission',
    lines: [
      {
        kind: 'you',
        text: 'The crate was in the loading bay at 18:20. At 20:58 it is downstairs. Somebody moved it.',
      },
      { kind: 'say', text: 'Somebody did.' },
      {
        kind: 'you',
        text: 'You were the only contractor with a trolley and a reason to be in that corridor.',
      },
      {
        kind: 'say',
        text: '...Fine. Ten to seven, she asks me to run it down to storage. Fifty euros cash, no paperwork.',
      },
      { kind: 'say', text: 'I never opened it. I never even looked at the lid.' },
      {
        kind: 'thought',
        text: 'A lie, then — but a smaller one than stealing a painting. He lied about the crate to protect his licence.',
      },
    ],
    repeatLines: [
      { kind: 'say', text: 'I already told you about the crate and the fifty euros.' },
    ],
  },
  {
    id: 'pr_renn_vest',
    personId: 'renn',
    evidenceId: 'clue_renn_vest',
    lines: [
      {
        kind: 'say',
        text: 'That’s not my vest. Mine’s on the cloakroom rail — took it off at half six, left my name across the back of it.',
      },
      {
        kind: 'say',
        text: 'And before you ask: I’m not insured to move art. That’s not the same as stealing it.',
      },
    ],
  },
  {
    id: 'pr_renn_bangle',
    personId: 'renn',
    evidenceId: 'clue_bangle',
    lines: [
      { kind: 'say', text: 'Gold? I weld in a plastic watch, mate. That’s not my arm.' },
      { kind: 'thought', text: 'It is a surprisingly specific thing to be sure of.' },
    ],
  },
  {
    id: 'pr_renn_frame',
    personId: 'renn',
    evidenceId: 'clue_frame_intact',
    lines: [
      {
        kind: 'say',
        text: 'That’s not the painting from the wall. The one I rigged around had a chunk out of the corner — I nearly put a clamp through it at six o’clock.',
      },
      {
        kind: 'say',
        text: 'Frames aren’t my job. But I know what I nearly broke.',
      },
      {
        kind: 'thought',
        text: 'He is not lying. And he has just told me that the painting in the corridor never hung on that wall.',
      },
    ],
  },
  {
    id: 'pr_renn_alibi',
    personId: 'renn',
    evidenceId: 'st_voss_alibi',
    lines: [
      {
        kind: 'say',
        text: 'She says she never went down there? She’s the one who told me to take the crate down. Make of that what you like.',
      },
    ],
  },

  // ── Nadia ──────────────────────────────────────────────────────────────
  {
    id: 'pr_nadia_brooch',
    personId: 'nadia',
    evidenceId: 'st_voss_brooch_lent',
    contradiction: true,
    unlockTopicIds: ['nadia_silver'],
    statementId: 'st_nadia_never_wore',
    lines: [
      { kind: 'you', text: 'Ms Voss says she lent you her brooch at the toast.' },
      { kind: 'say', text: 'Me? No. I can’t wear silver — it burns.' },
      {
        kind: 'say',
        text: 'And I was behind the bar until ten. She knows that. She knows I can’t wear it.',
      },
      {
        kind: 'thought',
        text: 'Two years of working beside someone, and she got the one detail wrong that her assistant would never forget.',
      },
    ],
    repeatLines: [
      { kind: 'say', text: 'I told you. I can’t wear silver. She knows I can’t.' },
    ],
  },
  {
    id: 'pr_nadia_crate',
    personId: 'nadia',
    evidenceId: 'doc_delivery',
    unlockTopicIds: ['nadia_after'],
    statementId: 'st_nadia_strap',
    lines: [
      { kind: 'you', text: 'The docket says the crate left sealed. Who sealed it?' },
      {
        kind: 'say',
        text: 'She did. After the alarm. She asked me to hold the torch while she did the straps — ten to ten, maybe.',
      },
      {
        kind: 'thought',
        text: 'The painting is “stolen” at 21:18. At 21:50 she is packing.',
      },
    ],
    repeatLines: [
      { kind: 'say', text: 'She strapped it herself. I only held the torch.' },
    ],
  },
  {
    id: 'pr_nadia_bangle',
    personId: 'nadia',
    evidenceId: 'clue_bangle',
    lines: [
      {
        kind: 'say',
        text: 'That’s what I saw on the stairs — gold at the wrist. It was the only shiny thing in that stairwell.',
      },
      { kind: 'thought', text: 'She has just put a wrist in the corridor and a time on it.' },
    ],
  },
  {
    id: 'pr_nadia_storage',
    personId: 'nadia',
    evidenceId: 'clue_brooch_storage',
    lines: [
      {
        kind: 'say',
        text: 'That’s my photo — I didn’t even see the brooch when I took it. I was trying to make the shelving look less like a morgue.',
      },
    ],
  },
  {
    id: 'pr_nadia_substitute',
    personId: 'nadia',
    evidenceId: 'i_substitute',
    lines: [
      {
        kind: 'say',
        text: 'A copy? She used Kardel for years. She went out to Antwerp twice in September, which I only remember because I had to reschedule a viewing both times.',
      },
      { kind: 'thought', text: 'Twice in September. One painting came back in October.' },
    ],
  },
];

const deductions: DeductionRule[] = [
  {
    id: 'd_nick',
    a: 'clue_frame_nick',
    b: 'clue_frame_intact',
    label: 'contradicts',
    insightId: 'i_substitute',
    feedback:
      'The frame settles it. A chipped corner at 19:12; a clean one at 21:04. One of those paintings is a substitute, which makes the theft a performance.',
  },
  {
    id: 'd_brooch',
    a: 'clue_brooch_worn',
    b: 'clue_brooch_storage',
    label: 'contradicts',
    insightId: 'i_voss_storage',
    feedback:
      'Worn at 19:40. On a crate in the storage room at 20:58. A brooch does not walk downstairs — Voss did.',
  },
  {
    id: 'd_crate',
    a: 'doc_delivery',
    b: 'clue_crate_insert',
    label: 'contradicts',
    insightId: 'i_crate_lie',
    feedback:
      'A crate declared empty, lined for a canvas. The paperwork is not describing the object in the room.',
  },
  {
    id: 'd_vest',
    a: 'clue_vest_rail',
    b: 'clue_renn_vest',
    label: 'supports',
    insightId: 'i_vest',
    feedback:
      'An identical vest on a public coat rail. The hi-vis identifies a wardrobe, not a man.',
  },
];

const theoryRequirements: TheoryRequirement[] = [
  { insightId: 'i_substitute', label: 'What was carried out of the gallery' },
  { insightId: 'i_voss_storage', label: 'Where the director really was' },
  { insightId: 'i_crate_lie', label: 'What happened to the original' },
];

const theoryQuestions: TheoryQuestion[] = [
  {
    id: 'q_who',
    prompt: 'Who arranged the theft?',
    hint: 'Renn had the crate in his hands for a minute. Nadia photographed a room she had no reason to lie about. Ask who needed that wall to be empty.',
    options: [
      { id: 'voss', label: 'Margit Voss, the director' },
      { id: 'renn', label: 'Dawid Renn, the AV contractor' },
      { id: 'nadia', label: 'Nadia Pell, the event assistant' },
      { id: 'outsider', label: 'Someone who came in from outside' },
    ],
    correct: 'voss',
    feedback:
      'Voss had the motive, the crate, the code, the coat and the only story that needed a second version.',
  },
  {
    id: 'q_carried',
    prompt: 'What was the figure carrying through the service corridor at 21:04?',
    hint: 'Compare the lower corner of the frame in the corridor still with the press photograph from 19:12.',
    options: [
      { id: 'copy', label: 'A substitute painting' },
      { id: 'original', label: 'The original painting' },
      { id: 'frame', label: 'The empty frame' },
      { id: 'crate', label: 'The packing crate' },
    ],
    correct: 'copy',
    feedback:
      'A clean gilt corner where the original had a chip. The corridor carried the copy that had been hanging on the wall since the toast.',
  },
  {
    id: 'q_original',
    prompt: 'Where was the original painting when the police arrived?',
    hint: 'Count what left the building after the alarm, and how it was declared.',
    options: [
      { id: 'crate', label: 'Inside the sealed crate collected at 23:10' },
      { id: 'wall', label: 'Still hanging on the east wall' },
      { id: 'van', label: 'In Renn’s van' },
      { id: 'skip', label: 'In the courtyard skip' },
    ],
    correct: 'crate',
    feedback:
      'The only large container to leave the building was the crate Voss sealed at 21:50 and declared EMPTY. The skip held the copy.',
  },
  {
    id: 'q_detail',
    prompt: 'Which single detail proves the substitution?',
    hint: 'The hood, the gloves and the timestamp are atmosphere. One thing is a measuring instrument.',
    options: [
      { id: 'chip', label: 'The missing chip in the frame’s lower corner' },
      { id: 'hood', label: 'The hood pulled over the figure’s face' },
      { id: 'timestamp', label: 'The 21:04 camera timestamp' },
      { id: 'gloves', label: 'The gloved hand on the wrapping' },
    ],
    correct: 'chip',
    feedback:
      'The chip is the painting’s fingerprint, as Voss herself said. At 21:04 the fingerprint was missing.',
  },
  {
    id: 'q_motive',
    prompt: 'What was the point of it?',
    hint: 'The motive is in the paperwork, not the interviews.',
    options: [
      { id: 'insurance', label: 'An insurance payout while keeping the original to sell' },
      { id: 'grudge', label: 'To frame Renn over an old grudge' },
      { id: 'cover', label: 'To cover a mistake Nadia had made' },
      { id: 'collector', label: 'A commission from a private collector' },
    ],
    correct: 'insurance',
    feedback:
      'A failed refinancing, a personal guarantee, and a policy raised from €900,000 to €1.4m two months before the event.',
  },
];

export const caseFile: CaseData = {
  id: 'the-last-light',
  title: 'The Last Light',
  subtitle: 'Case 14/11-MG-07 · Meridian Gallery',
  caseNumber: '14/11-MG-07',
  dateLabel: 'Thursday, 14 November',
  location: 'Meridian Gallery, Riverside Quarter',
  tagline: 'One painting. Eleven witnesses. One detail nobody looked at twice.',
  briefing: [
    'At 21:18 on Thursday 14 November, Margit Voss reported that “The Last Light” — a late Wren landscape — had been taken from the East Room during a private closing-night event. The wall was empty. The service door to the courtyard stood open. The alarm was on standby for the evening.',
    'There was no forced entry and no sign of a struggle. Eleven guests, three gallery staff and one outside lighting contractor were on site. The director has asked us to treat it as an inside job, and has already named her suspect.',
    'The painting is insured for one and a half million euros. The policy requires a conclusion within twenty-four hours. The gallery requires the same, for its own reasons.',
    'You have the photographs, the documents and the run of the building. Interview whom you like. Nothing here is a trick of the light — but one thing is not what it claims to be.',
  ],
  supervisor: { name: 'Ilse Brandt', role: 'Detective Sergeant, Art & Property' },
  photos,
  documents,
  people,
  statements,
  clues,
  deductions,
  presentations,
  theoryRequirements,
  theoryQuestions,
  resolution: {
    headline: 'The Last Light, recovered.',
    paragraphs: [
      'Margit Voss did not lose a painting on 14 November. She exchanged one.',
      'While the lights were down for the Wren film, between 19:34 and 19:42, she took the original from the East Room wall and carried it down to the storage room. She brought up a copy and hung it in the original’s place. The copy had arrived that morning in the foam-lined crate from Antwerp, declared EMPTY, signed for by her own hand.',
      'At 20:56 she went back down to check the crate and change into a catering coat. The clasp of her moth brooch caught on the strapping and snapped. She did not notice. At 20:58, Nadia Pell photographed the storage room for the gallery’s social account. The brooch was on the crate lid, and the photograph was on the internet before the alarm.',
      'At 21:02 Voss lifted the copy from the wall and carried it through the service corridor. The camera caught her at 21:04: hood up, a borrowed hi-vis waistcoat, and a gold bangle at the wrist. She left the copy in the courtyard skip and returned through the service door. At 21:18 she reported a theft.',
      'The rest is housekeeping. At 21:50 she strapped the crate containing the original shut. At 23:10 Hallow Freight collected it, sealed and declared empty, for the run back to Antwerp. It was the only large container to leave the building, and it left with the painting still inside it.',
      'Dawid Renn lied about a crate he was paid fifty euros in cash to move, because he is not insured to handle art. Nadia Pell held a torch while the crate was sealed, because she was told to. Neither of them arranged anything. Only one person in that building needed the wall to be empty, and only one person was photographed wearing the evidence.',
    ],
    proofPoints: [
      {
        evidenceId: 'clue_frame_nick',
        text: 'The 19:12 press photograph puts the original on the wall, complete with the old chip.',
      },
      {
        evidenceId: 'clue_frame_intact',
        text: 'The 21:04 still shows the same moulding with no chip: the painting in the corridor was a substitute.',
      },
      {
        evidenceId: 'clue_brooch_storage',
        text: 'The brooch on the crate at 20:58 had been on Voss’s lapel at 19:40, breaking her “never went downstairs” account.',
      },
      {
        evidenceId: 'doc_delivery',
        text: 'The docket records the crate arriving empty and leaving sealed at 23:10, sealed by Voss 32 minutes after the alarm.',
      },
      {
        evidenceId: 'clue_crate_insert',
        text: 'The crate’s foam was cut for a 71 × 52 canvas. It could carry exactly the painting it was said not to contain.',
      },
      {
        evidenceId: 'doc_insurance',
        text: 'The policy had been raised from €900,000 to €1.4m in August, at Voss’s request.',
      },
      {
        evidenceId: 'st_renn_admission',
        text: 'Renn’s smaller lie explains his contact with the crate without putting him in the corridor at 21:04.',
      },
    ],
    aftermath:
      'At 00:40 the Hallow depot opened crate 11-2214 before it left for Antwerp. “The Last Light” was inside, wrapped in felt, the chip in its frame intact. At 01:10 officers recovered the substitute from the courtyard skip: modern canvas, no signature, a clean gilt corner. Margit Voss was arrested at 02:05. The gallery reopened on Saturday, with one wall left bare on purpose.',
  },
};
