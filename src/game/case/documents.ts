import type { CaseDocument } from '../types';

export const documents: CaseDocument[] = [
  {
    id: 'd_incident',
    title: 'Incident memorandum',
    subtitle: 'Art & Property Unit — internal',
    documentId: '14/11-MG-07',
    stampDate: '15 NOV',
    clueId: 'doc_incident',
    blocks: [
      { type: 'heading', text: 'METROPOLITAN ART & PROPERTY UNIT' },
      { type: 'para', text: 'Incident memorandum — theft reported, Meridian Gallery.' },
      {
        type: 'kv',
        rows: [
          ['Case', '14/11-MG-07'],
          ['Reported', 'Thu 14 Nov, 21:18, by M. Voss (director)'],
          ['Object', '“The Last Light”, Elias Wren, 1903. Oil on canvas, 71 × 52 cm, gilt frame.'],
          ['Insured', '€1,400,000 (Northway Fine Art)'],
          ['Scene', 'East Room. Wall empty. No forced entry. Alarm on standby for a private event.'],
        ],
      },
      { type: 'divider' },
      {
        type: 'para',
        text: 'The director states that the painting was in place when the event began and was noticed missing at 21:18. The service door to the courtyard was found open. The corridor camera was recording.',
      },
      {
        type: 'para',
        text: 'Eleven guests, three gallery staff and one outside contractor (AV) were on site. Guests were escorted out at 21:30. No inventory discrepancy has been reported besides the painting.',
      },
      {
        type: 'mark',
        text: 'No forced entry; alarm on standby',
        note: 'A locked room that everyone could walk into. Start with the people who had a reason to.',
      },
      { type: 'stamp', text: 'OPEN — CONSULTANT ATTACHED', tone: 'red' },
      {
        type: 'note',
        text: 'Everyone here is telling a story they can live with. Find the detail that makes their story impossible.',
      },
      { type: 'signature', name: 'I. Brandt', role: 'Det. Sgt., Art & Property' },
    ],
  },
  {
    id: 'd_delivery',
    title: 'Delivery docket 11-2214',
    subtitle: 'Hallow Fine Art Logistics',
    documentId: '11-2214',
    stampDate: '14 NOV',
    clueId: 'doc_delivery',
    blocks: [
      { type: 'heading', text: 'HALLOW FINE ART LOGISTICS' },
      { type: 'para', text: 'Dock docket — Meridian Gallery · contract 88-C · Thu 14 Nov' },
      {
        type: 'table',
        columns: ['Time', 'Movement', 'Detail'],
        rows: [
          ['08:40', 'DELIVERED', '1 travel crate, 212 × 92 × 74 cm, foam lined'],
          ['08:41', 'CONSIGNOR', 'Kardel Fine Art Storage, Antwerp (return)'],
          ['08:42', 'DECLARED', 'EMPTY — return crate, no commercial value'],
          ['08:44', 'RECEIVED BY', 'M. VOSS (signature on file)'],
          ['23:10', 'COLLECTED', '1 travel crate, sealed, consigned to Kardel'],
          ['21:50', 'SEALED BY', 'M. VOSS, two nylon straps'],
        ],
      },
      {
        type: 'mark',
        text: 'DECLARED: EMPTY',
        note: 'A crate that size, shipped across a border as “empty”, still costs money. Somebody wanted it here.',
      },
      {
        type: 'para',
        text: 'Driver note: crate not opened on site. No seal fitted on arrival. Crate to remain sealed until weighed at depot.',
      },
      {
        type: 'mark',
        text: 'SEALED BY M. VOSS, 21:50',
        note: 'The alarm was raised at 21:18. Thirty-two minutes later she straps a crate shut.',
      },
      { type: 'stamp', text: 'RECEIVED', tone: 'ink' },
    ],
  },
  {
    id: 'd_restoration',
    title: 'Conservation receipt',
    subtitle: 'A. Kardel Restorations, Antwerp',
    documentId: '8841',
    stampDate: '04 OCT',
    clueId: 'doc_restoration',
    blocks: [
      { type: 'heading', text: 'A. KARDEL RESTORATIONS' },
      { type: 'para', text: 'Conservation and transit — account: Meridian Gallery.' },
      {
        type: 'kv',
        rows: [
          ['08 SEP', 'Collected: “The Last Light”, E. Wren, in frame. Surface cleaning.'],
          ['02 OCT', 'Returned: 1 painting (cleaned), in frame; 1 travel case.'],
          ['04 OCT', 'Invoice 8841 settled by transfer.'],
        ],
      },
      { type: 'divider' },
      {
        type: 'mark',
        text: 'Historic chip at lower-right frame corner left as found',
        note: 'The chip is documented, deliberate, and still on the painting when it came home.',
      },
      {
        type: 'para',
        text: 'Corners re-touched where the gesso had lifted. The old loss at the lower-right corner was retained at the director’s instruction. No other losses noted.',
      },
      {
        type: 'mark',
        text: 'Packing crate retained at our depot for future transit',
        note: 'One painting went out. One painting came back. The crate stayed behind in Antwerp.',
      },
      { type: 'signature', name: 'A. Kardel', role: 'Conservator' },
    ],
  },
  {
    id: 'd_insurance',
    title: 'Insurance endorsement',
    subtitle: 'Northway Fine Art — certificate',
    documentId: 'NW-2211-04',
    stampDate: '12 AUG',
    clueId: 'doc_insurance',
    blocks: [
      { type: 'heading', text: 'NORTHWAY FINE ART' },
      { type: 'para', text: 'Certificate of insurance — schedule of insured items.' },
      {
        type: 'kv',
        rows: [
          ['Insured', 'Meridian Gallery Ltd.'],
          ['Item', '“The Last Light”, E. Wren, 1903. 71 × 52 cm.'],
          ['Location', 'Meridian Gallery, East Room, alarmed wall.'],
          ['Cover', 'Theft, transit, and removal by force. €1,400,000.'],
        ],
      },
      { type: 'divider' },
      {
        type: 'mark',
        text: 'Endorsement 12 AUG: sum insured increased €900,000 → €1,400,000',
        note: 'Raised at the insured’s request, two months before the event.',
      },
      {
        type: 'para',
        text: 'Increase requested following a market revaluation. Theft cover requires notification within 24 hours and a written statement of removal. Out-of-hours transit requires written notice to the insurer.',
      },
      { type: 'stamp', text: 'ENDORSED', tone: 'ink' },
      {
        type: 'note',
        text: 'Ask whether anyone told the insurer the crate went out on the night van.',
      },
    ],
  },
  {
    id: 'd_removal',
    title: 'Night security log',
    subtitle: 'Meridian Gallery — duty officer',
    documentId: 'SEC-14/11',
    stampDate: '15 NOV',
    clueId: 'doc_removal',
    blocks: [
      { type: 'heading', text: 'MERIDIAN GALLERY — NIGHT LOG' },
      { type: 'para', text: 'Duty officer R. Sowa · Thursday 14 November · all times local.' },
      {
        type: 'table',
        columns: ['Time', 'Entry'],
        rows: [
          ['21:18', 'Alarm raised by M. VOSS — East Room.'],
          ['21:30', 'Building secured. Guests escorted out via foyer.'],
          ['21:52', 'Police attend. Corridor camera still seized.'],
          ['22:55', 'Catering van departs; interior checked by R. Sowa.'],
          ['23:02', 'Hallow Freight flatbed at courtyard gate.'],
          ['23:10', 'One sealed travel crate loaded. Declared EMPTY.'],
          ['23:20', 'Courtyard recycling skip not collected — gate locked; contractor to return Monday.'],
          ['23:40', 'M. VOSS leaves by taxi.'],
        ],
      },
      {
        type: 'mark',
        text: 'One sealed travel crate loaded. Declared EMPTY.',
        note: 'The only large container to leave the building after the alarm — and it left sealed.',
      },
      {
        type: 'mark',
        text: 'Courtyard skip not collected',
        note: 'Whatever went into the skip is still sitting in the courtyard.',
      },
      { type: 'signature', name: 'R. Sowa', role: 'Duty officer' },
    ],
  },
];
