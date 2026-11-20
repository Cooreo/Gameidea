import type { Person, Statement } from '../types';

export const statements: Statement[] = [
  {
    id: 'st_voss_alibi',
    personId: 'voss',
    title: '“Never near the storage room”',
    summary:
      'Voss says she stayed in the East Room all evening and did not enter the storage room after the caterers arrived.',
    text:
      'I was in the East Room the entire evening. I never went near the storage room — not after the caterers arrived.',
    context:
      'Said in her office at 10:40 on 15 November, with her solicitor on the phone and not in the room.',
    key: true,
  },
  {
    id: 'st_voss_crate',
    personId: 'voss',
    title: '“An empty crate”',
    summary:
      'Voss insists the travel crate arrived empty and left empty, and that her signature means nothing more.',
    text: 'It arrived empty. I signed for an empty crate; that’s all my signature means.',
    context: 'She answered before the question was finished.',
    key: true,
  },
  {
    id: 'st_voss_renn',
    personId: 'voss',
    title: '“Take his name”',
    summary:
      'Voss points the investigation at the AV contractor, who had the run of the service corridor.',
    text:
      'Dawid had the run of the service corridor. He was supposed to leave at eight. If you want a name, take his.',
    context: 'The first thing she said when the contractor was mentioned.',
  },
  {
    id: 'st_voss_brooch_lent',
    personId: 'voss',
    title: '“I lent it to Nadia”',
    summary:
      'Confronted with her brooch on the storage-room crate, Voss says she gave it to her assistant at the toast.',
    text: 'The clasp was loose. I lent it to Nadia at the toast — she admired it.',
    context: 'Her second version of the evening. There will be a third.',
    key: true,
  },
  {
    id: 'st_voss_crate_sealed',
    personId: 'voss',
    title: '“Routine housekeeping”',
    summary:
      'Voss admits sealing the crate at 21:50, after the alarm, and calls it routine.',
    text:
      'It came from Antwerp lined. I sealed it at ten to ten for the return van. Routine housekeeping.',
    context:
      'The seal was applied thirty-two minutes after she reported a theft, with the building full of police.',
    key: true,
  },
  {
    id: 'st_renn_leave',
    personId: 'renn',
    title: '“Left at eight”',
    summary: 'Renn claims he left the gallery at eight, maybe ten past.',
    text: 'Eight. Maybe ten past. I had a load-in at ten.',
    context: 'He looks at the door when he says it, not at me.',
  },
  {
    id: 'st_renn_crate',
    personId: 'renn',
    title: '“Never touched the crate”',
    summary: 'Renn denies any contact with the travel crate.',
    text: 'Not mine. I do lights. I never touched that thing.',
    context: 'Said with both hands flat on his knees, which is not how anyone sits.',
    key: true,
  },
  {
    id: 'st_renn_admission',
    personId: 'renn',
    title: '“Fifty euros, cash”',
    summary:
      'Renn admits Voss paid him cash to move the crate to the storage room at 18:55 — the lie behind his first statement.',
    text:
      'Fine. Ten to seven she asks me to run it down to storage. Fifty euros cash, no paperwork. I never opened it.',
    context:
      'He is not insured to handle art and did not want it on an invoice. A small lie, and a different one.',
    key: true,
  },
  {
    id: 'st_nadia_toast',
    personId: 'nadia',
    title: '“Eight minutes of dark”',
    summary:
      'The lights were down for eight minutes during the toast — long enough to move a painting.',
    text:
      'The lights went down at 19:34 and stayed down for eight minutes. It’s a very boring film.',
    context: 'The dimmer was set to a timer by the AV contractor.',
    key: true,
  },
  {
    id: 'st_nadia_photo',
    personId: 'nadia',
    title: '“I took them both”',
    summary:
      'Nadia took the 19:12 press photograph and the 20:58 storage photograph and posted the second at 21:00.',
    text:
      'The press shot is mine, 19:12. The storage one is mine too — 20:58. I posted it at 21:00, look: 412 likes.',
    context: 'The post is still live. Whatever the storage photo shows was there before the alarm.',
  },
  {
    id: 'st_nadia_never_wore',
    personId: 'nadia',
    title: '“Silver burns”',
    summary:
      'Nadia cannot wear silver and was behind the bar at the toast — so Voss could not have lent her the brooch.',
    text:
      'Me? No. I can’t wear silver, it burns. And I was behind the bar until ten. She knows that.',
    context: 'A reaction to silver is not a detail you forget about a colleague of two years.',
    key: true,
  },
  {
    id: 'st_nadia_strap',
    personId: 'nadia',
    title: '“Holding the torch”',
    summary:
      'After the alarm, Voss asked Nadia to hold a torch while she strapped the crate shut.',
    text:
      'She asked me to hold the torch while she strapped it. Ten to ten, maybe. I remember thinking: we’ve just lost a painting, why are we packing?',
    context: 'Nadia is crying by the end of the sentence, which she apologises for.',
    key: true,
  },
];

export const people: Person[] = [
  {
    id: 'voss',
    name: 'Margit Voss',
    role: 'Director, Meridian Gallery',
    age: 48,
    portrait: 'voss',
    short:
      'Ran the event. Reported the theft. Has already decided who did it — and it is not her.',
    bio:
      'Sixteen years at the Meridian. Raised the painting’s insurance in August. The gallery’s refinancing collapsed in October; her personal guarantee is reported at €380,000. Wears a silver moth brooch on her left lapel.',
    alibi: '“In the East Room the entire evening. Never near the storage room.”',
    greeting: [
      { kind: 'say', text: 'You must be the consultant. Ilse said you’d want the evening again.' },
      {
        kind: 'say',
        text: 'I have eleven guests who drank my champagne and watched my painting disappear. Ask what you like, but ask it once.',
      },
      {
        kind: 'thought',
        text: 'She has arranged the chairs so that I have to sit facing the empty wall.',
      },
    ],
    topics: [
      {
        id: 'voss_evening',
        label: 'Walk me through the evening.',
        lines: [
          {
            kind: 'say',
            text: 'Doors at seven. Champagne, a very short speech, and the lights down at half past for the Wren film — six minutes of the painter’s diaries which nobody watched.',
          },
          {
            kind: 'say',
            text: 'At twenty past nine I went to bring a guest to the East Room. The wall was empty. The frame, the canvas, the whole thing.',
          },
          { kind: 'you', text: 'And between seven and then?' },
          {
            kind: 'say',
            text: 'In the East Room, or the foyer. Where a director is supposed to be. I never went near the storage room — not after the caterers arrived.',
            statementId: 'st_voss_alibi',
          },
        ],
      },
      {
        id: 'voss_crate',
        label: 'Tell me about the crate in the storage room.',
        lines: [
          {
            kind: 'say',
            text: 'A return crate from Antwerp. It came up empty — Kardel sends them back rather than pay storage. Hallow left it in the bay and I had it brought down.',
          },
          { kind: 'you', text: 'Why keep an empty crate in the building?' },
          {
            kind: 'say',
            text: 'Because it was going out with the night van. It’s cheaper than a second trip. I signed for an empty crate; that’s all my signature means.',
            statementId: 'st_voss_crate',
          },
        ],
      },
      {
        id: 'voss_renn',
        label: 'You’ve pointed us at the contractor.',
        lines: [
          {
            kind: 'say',
            text: 'I’ve pointed you at the only man in the building who wasn’t on my payroll. He had the run of the service corridor and a van outside.',
          },
          {
            kind: 'say',
            text: 'He was supposed to leave at eight. I have no idea when he actually did. If your sergeant wants a name, take his.',
            statementId: 'st_voss_renn',
          },
        ],
      },
      {
        id: 'voss_painting',
        label: 'Tell me about the painting.',
        lines: [
          {
            kind: 'say',
            text: 'Elias Wren, 1903. Seventy-one by fifty-two centimetres. The last thing he finished before the winter he died.',
          },
          {
            kind: 'say',
            text: 'The frame is original. There’s a chip in the lower corner — you can see it in Nadia’s press photograph. I refused to have it filled. It’s the painting’s fingerprint, in a way.',
          },
          {
            kind: 'thought',
            text: 'She says it almost fondly. She is also telling me exactly what to look at.',
          },
        ],
      },
      {
        id: 'voss_insurance',
        label: 'The policy was increased in August.',
        lines: [
          {
            kind: 'say',
            text: 'Every gallery insures its collection. We raised the sum because the market did, and because the lender required it.',
          },
          { kind: 'you', text: 'A lender?' },
          {
            kind: 'say',
            text: 'A refinancing. It fell through. That is not a crime, consultant.',
          },
          { kind: 'thought', text: 'No. But it is a reason.' },
        ],
      },
      {
        id: 'voss_brooch_lie',
        label: 'Your brooch was in the storage room.',
        lines: [
          {
            kind: 'say',
            text: 'I told you. The clasp was loose. I lent it to Nadia at the toast — she admired it.',
          },
          {
            kind: 'thought',
            text: 'She says it without blinking. Either she believes it, or she has said it before.',
          },
        ],
      },
      {
        id: 'voss_crate_lie',
        label: 'The crate was lined for a painting.',
        lines: [
          {
            kind: 'say',
            text: 'It came lined. They all come lined. I sealed it at ten to ten for the return van — routine housekeeping, and I won’t be lectured on how to pack a crate.',
          },
          {
            kind: 'thought',
            text: 'Two explanations now. Neither of them explains why she remembers the exact minute.',
          },
        ],
      },
      {
        id: 'voss_frame',
        label: 'The painting in the corridor had no chip.',
        lines: [
          {
            kind: 'say',
            text: 'You are inventing a second painting to explain a bad photograph. Do you know what a camera does to gold leaf at that distance? It eats it.',
          },
          {
            kind: 'say',
            text: 'Find me a second painting. Then we will talk about who carried it.',
          },
          {
            kind: 'thought',
            text: 'She didn’t ask how I knew. She asked whether I could prove it.',
          },
        ],
      },
    ],
    deflect: [
      'I have given you the evening twice. I won’t give it a third time for a photograph of a crate.',
      'No. That has nothing to do with a stolen painting, and you know it.',
      'If you want to arrest someone, arrest someone. Otherwise let me open my gallery.',
    ],
  },
  {
    id: 'renn',
    name: 'Dawid Renn',
    role: 'Lighting contractor, Renn Audio-Visual',
    age: 41,
    portrait: 'renn',
    short:
      'Rigged the East Room lighting. Was paid in cash, is not insured for art handling, and would like to keep his licence.',
    bio:
      'Has worked the Meridian’s opening nights for four years. Left the van in the loading bay, nose-out, according to the door camera. Claims he was gone by eight.',
    alibi: '“Eight. Maybe ten past. I had a load-in at ten.”',
    greeting: [
      { kind: 'say', text: 'You’ve got ten minutes. I’ve got a rig to strike in Mokotów.' },
      {
        kind: 'thought',
        text: 'He is sitting on an upturned flight case, which is somehow more comfortable than the chairs in this building.',
      },
    ],
    topics: [
      {
        id: 'renn_job',
        label: 'What did you do here tonight?',
        lines: [
          {
            kind: 'say',
            text: 'Lighting. Six rigs, two bars, cable through the east room. Walked the floor with the director at six, finished at seven, packed the van, gone.',
          },
          {
            kind: 'say',
            text: 'The dimmer was on a timer for the toast. Six-minute cue, film playback, back up. That’s the only thing that touched that room after I left.',
          },
        ],
      },
      {
        id: 'renn_leave',
        label: 'What time did you leave?',
        lines: [
          {
            kind: 'say',
            text: 'Eight. Maybe ten past. I had a load-in at ten.',
            statementId: 'st_renn_leave',
          },
          { kind: 'thought', text: 'He looks at the door when he says it, not at me.' },
        ],
      },
      {
        id: 'renn_crate',
        label: 'Did you touch the travel crate?',
        lines: [
          {
            kind: 'say',
            text: 'Not mine. I do lights. I never touched that thing.',
            statementId: 'st_renn_crate',
          },
          {
            kind: 'thought',
            text: 'Both hands flat on his knees. Nobody sits like that unless they are keeping their hands still on purpose.',
          },
        ],
      },
      {
        id: 'renn_voss',
        label: 'What is Margit Voss like to work for?',
        lines: [
          {
            kind: 'say',
            text: 'Tight. Paid me cash for the night — no invoice, which tells you how tight.',
          },
          { kind: 'you', text: 'Did you have keys to the service corridor?' },
          {
            kind: 'say',
            text: 'Code, not keys. Her birthday. Zero-four-one-one, April eleventh. She told the caterers at eight so they could reach the dishwasher.',
          },
          {
            kind: 'thought',
            text: 'So the code was not a secret held only by the contractor.',
          },
        ],
      },
      {
        id: 'renn_vest',
        label: 'The hi-vis in the corridor footage.',
        lines: [
          {
            kind: 'say',
            text: 'Not my vest. Mine’s the one on the cloakroom rail — took it off at half six, left my name across the back of it. Anyone could have picked up a vest from that rail.',
          },
          {
            kind: 'say',
            text: 'And before you ask: I’m not insured to move art. That’s not the same as stealing it.',
          },
        ],
      },
      {
        id: 'renn_time',
        label: 'What time did you actually leave?',
        lines: [
          {
            kind: 'say',
            text: 'Ten past seven. I was at Klub Oko by eight; the bar staff know me. The fifty euros was for the crate, not for staying.',
          },
          { kind: 'you', text: 'Why lie about a crate?' },
          {
            kind: 'say',
            text: 'Because I’m not insured to move art, and because cash in hand doesn’t go on an invoice. She knew that when she asked me.',
          },
          {
            kind: 'thought',
            text: 'A smaller lie, then. The kind people tell to keep their licence, not to keep a painting.',
          },
        ],
      },
    ],
    deflect: [
      'I do lights, not paintings. Ask me about cable and I’ll write you a book.',
      'Mate, I don’t know what that is. Is it expensive? It looks expensive.',
      'You’re asking the wrong man. Try the one who signs the cheques.',
    ],
  },
  {
    id: 'nadia',
    name: 'Nadia Pell',
    role: 'Event assistant, Meridian Gallery',
    age: 24,
    portrait: 'nadia',
    short:
      'Worked the room, the bar and the gallery account. Took two of the photographs in this file.',
    bio:
      'Two years at the Meridian. Runs the gallery’s social accounts; the storage-room photograph is still on them. Cannot wear silver. Was behind the bar from 19:30 until the alarm.',
    alibi: '“Behind the bar until ten. Ask anyone who wanted a drink.”',
    greeting: [
      {
        kind: 'say',
        text: 'Sorry — the account is still posting. Margit wants... wanted... the gallery to look normal.',
      },
      {
        kind: 'thought',
        text: 'She has been crying, but not, I think, about the painting.',
      },
    ],
    topics: [
      {
        id: 'nadia_evening',
        label: 'What were you doing during the event?',
        lines: [
          {
            kind: 'say',
            text: 'Photos, guest list, the bar when the caterer disappeared. Doors at seven. Press shot at ten past. The toast at half seven — lights down for eight minutes for the Wren film.',
          },
          { kind: 'you', text: 'Eight minutes is a long time.' },
          {
            kind: 'say',
            text: 'It’s a very boring film.',
            statementId: 'st_nadia_toast',
          },
        ],
      },
      {
        id: 'nadia_photos',
        label: 'You took the photographs in the file.',
        lines: [
          {
            kind: 'say',
            text: 'Two of them. The press shot is 19:12; the backstage one is 20:58. I posted that at 21:00 — it’s still up. Four hundred and twelve likes, if you’re wondering.',
            statementId: 'st_nadia_photo',
          },
          {
            kind: 'thought',
            text: 'Before the alarm. Whatever is in that photograph was there before anyone started lying.',
          },
        ],
      },
      {
        id: 'nadia_corridor',
        label: 'Did you see anyone near the service corridor?',
        lines: [
          {
            kind: 'say',
            text: 'About nine. I was taking glasses back and someone came up the service stairs. Grey coat, hood. I thought it was catering — they’d been up and down all night.',
          },
          { kind: 'you', text: 'Did you see their hands?' },
          {
            kind: 'say',
            text: 'No. Just the coat, and something gold at the wrist when they took the handrail. I remember because it was the only shiny thing in that stairwell.',
          },
        ],
      },
      {
        id: 'nadia_voss',
        label: 'How is Ms Voss taking it?',
        lines: [
          {
            kind: 'say',
            text: 'She’s been sleeping here. The refinancing fell through in October, and banks don’t care about opening nights.',
          },
          {
            kind: 'say',
            text: 'She’s not a bad person. She’s just... already spent the money, if you know what I mean.',
          },
          { kind: 'thought', text: 'I do.' },
        ],
      },
      {
        id: 'nadia_after',
        label: 'What happened after the alarm?',
        lines: [
          {
            kind: 'say',
            text: 'She had me hold the torch while she strapped the crate. Ten to ten. She said the van was coming and it had to be closed properly. I remember thinking: we’ve just lost a painting, why are we packing?',
            statementId: 'st_nadia_strap',
          },
        ],
      },
      {
        id: 'nadia_silver',
        label: 'Would you have accepted the brooch?',
        lines: [
          {
            kind: 'say',
            text: 'Never. I’ve worked for her two years; she knows my wrists go red if I so much as try on a silver bracelet.',
          },
          {
            kind: 'say',
            text: 'She was thinking fast. That’s all that was.',
          },
          {
            kind: 'thought',
            text: 'Fast, and badly. Which is how most true things come out.',
          },
        ],
      },
    ],
    deflect: [
      'I’m sorry — I really don’t know about that.',
      'Should I be writing this down? Because I can, I just don’t see how it helps.',
      'That was before my shift, or after it. I was on the bar for most of the night.',
    ],
  },
];
