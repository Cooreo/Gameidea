import type { Photo } from '../types';

/**
 * Five photographs from the case file. Every hotspot corresponds to something
 * that is actually drawn in the corresponding SVG scene.
 */
export const photos: Photo[] = [
  {
    id: 'p_east_room',
    title: 'East Room, before the toast',
    timestamp: '19:12',
    place: 'Meridian Gallery — East Room',
    credit: 'Press photograph, N. Pell',
    caption:
      'The Wren hanging on the east wall, twenty minutes before the lights went down.',
    description:
      'A warm, shallow room. The Last Light is lit from above; the rest of the gallery falls away into brown shadow.',
    scene: 'eastRoom',
    width: 1200,
    height: 800,
    hints: [
      'The painting is documented from more than one angle in this file. Look at the frame itself, not the canvas.',
      'Follow the gilt frame down to its lower-right corner, close to the wall label.',
    ],
    hotspots: [
      {
        id: 'hs_nick',
        label: 'Lower-right corner of the gilt frame',
        cx: 760,
        cy: 476,
        r: 42,
        clueId: 'clue_frame_nick',
        observation:
          'A dark chip in the frame’s lower-right corner, about two centimetres across, with pale raw gesso showing beneath the gold. Old damage; the moulding around it is worn smooth.',
      },
      {
        id: 'hs_label',
        label: 'Wall label beside the painting',
        cx: 879,
        cy: 450,
        r: 46,
        clueId: 'clue_wall_label',
        observation:
          'The wall label gives the canvas size: 71 × 52 cm. Useful, if you ever need to know what fits inside a travel crate.',
      },
    ],
  },
  {
    id: 'p_corridor',
    title: 'Service corridor camera, frame 4417',
    timestamp: '21:04',
    place: 'Meridian Gallery — service corridor',
    credit: 'CCTV still, camera SVC-02',
    caption:
      'A figure carrying a wrapped painting towards the courtyard door, six minutes after the toast ended.',
    description:
      'Low-light camera, badly compressed. The courtyard door is open; the exit sign washes everything green.',
    scene: 'corridor',
    width: 1200,
    height: 800,
    hints: [
      'This still is evidence for two different questions: who is in it, and what exactly are they carrying.',
      'Look at the visible corner of the wrapped painting — the lower-right of the gilt frame — and at the bare hand holding it.',
    ],
    hotspots: [
      {
        id: 'hs_corner_intact',
        label: 'Exposed corner of the frame',
        cx: 854,
        cy: 651,
        r: 34,
        clueId: 'clue_frame_intact',
        observation:
          'The corner of the gilt frame is smooth and unbroken. Same moulding profile as the press shot — but no chip, no pale gesso. The gold reads flatter under the corridor light.',
      },
      {
        id: 'hs_vest',
        label: 'Reflective banding at the shoulders',
        cx: 640,
        cy: 430,
        r: 58,
        clueId: 'clue_renn_vest',
        observation:
          'Two reflective bands across the back of the coat: a hi-vis waistcoat, worn over it. The sort of vest issued to contractors — and left on the cloakroom rail.',
      },
      {
        id: 'hs_bangle',
        label: 'Wrist of the hand supporting the frame',
        cx: 724,
        cy: 512,
        r: 22,
        clueId: 'clue_bangle',
        observation:
          'At the wrist, a thin gold band catches the exit sign. A bangle, not a watch — the gesture of the hand is wrong for a watch.',
      },
    ],
  },
  {
    id: 'p_storage',
    title: 'Storage room, backstage post',
    timestamp: '20:58',
    place: 'Meridian Gallery — storage room',
    credit: 'Phone photograph, N. Pell',
    caption:
      'A backstage shot for the gallery’s social feed. The crate has been opened and re-strapped.',
    description:
      'Flash-lit and cold. Shelving on the left, the travel crate on the right; a shutter door at the back.',
    scene: 'storage',
    width: 1200,
    height: 800,
    hints: [
      'The crate is the largest object in the file. What is missing from it is as telling as what is in it.',
      'Look at the top of the crate lid and at the foam inside the crate.',
    ],
    hotspots: [
      {
        id: 'hs_brooch',
        label: 'Silver moth brooch on the crate lid',
        cx: 465,
        cy: 300,
        r: 33,
        clueId: 'clue_brooch_storage',
        observation:
          'A silver moth brooch lies on the crate lid, wings spread, its clasp snapped. It was not there when the crate arrived, and nobody has logged it as lost.',
      },
      {
        id: 'hs_foam',
        label: 'Foam lining inside the open crate',
        cx: 780,
        cy: 450,
        r: 54,
        clueId: 'clue_crate_insert',
        observation:
          'Dense grey foam cut with a canvas-shaped recess, a folded felt sleeve beside it. The crate is lined for exactly the kind of painting it was declared not to contain.',
      },
    ],
  },
  {
    id: 'p_loading_bay',
    title: 'Loading bay, door camera',
    timestamp: '18:20',
    place: 'Meridian Gallery — loading bay',
    credit: 'Door camera still, west entrance',
    caption:
      'The travel crate still on its pallet in the bay, an hour before the doors opened.',
    description:
      'Wet asphalt, one working lamp. A delivery truck has backed into the far bay; a white van is parked with its nose out.',
    scene: 'loadingBay',
    width: 1200,
    height: 800,
    hints: [
      'The crate is documented in two rooms tonight, at two different times. Establish where it started.',
      'The crate is on the pallet under the lamp; the van carries the contractor’s name.',
    ],
    hotspots: [
      {
        id: 'hs_crate_bay',
        label: 'Travel crate on the pallet',
        cx: 582,
        cy: 510,
        r: 82,
        clueId: 'clue_crate_bay',
        observation:
          'The crate is stencilled for Hallow Fine Art and strapped to a pallet. At 18:20 it is in the bay. At 20:58 it is downstairs in the storage room.',
      },
      {
        id: 'hs_renn_van',
        label: 'White van with company lettering',
        cx: 950,
        cy: 480,
        r: 80,
        clueId: 'clue_renn_van',
        observation:
          'RENN AUDIO-VISUAL, in red on the flank, with a ladder on the rack and the driver’s door unlocked. Parked nose-out.',
      },
    ],
  },
  {
    id: 'p_cloakroom',
    title: 'Cloakroom, gallery post',
    timestamp: '19:40',
    place: 'Meridian Gallery — cloakroom',
    credit: 'Gallery social photograph, posted 19:44',
    caption:
      'The director, mid-toast, beside the coat rail. Posted to the gallery account before the alarm.',
    description:
      'A close, over-warm photograph. Chandelier light, blurred guests, and a coat rail behind the director’s shoulder.',
    scene: 'cloakroom',
    width: 1200,
    height: 800,
    hints: [
      'There are three small details in this photograph, all of them about what a person was wearing at 19:40.',
      'Look at her left lapel, at her wrist, and at the coat rail behind her shoulder.',
    ],
    hotspots: [
      {
        id: 'hs_brooch_worn',
        label: 'Moth brooch on the director’s lapel',
        cx: 604,
        cy: 420,
        r: 31,
        clueId: 'clue_brooch_worn',
        observation:
          'The silver moth brooch, pinned high on her left lapel. The photograph was posted at 19:44, so the timestamp is not just the gallery’s word.',
      },
      {
        id: 'hs_bangle_worn',
        label: 'Gold bangle at the director’s wrist',
        cx: 816,
        cy: 548,
        r: 26,
        clueId: 'clue_bangle_worn',
        observation:
          'A thin gold bangle with a dark stone, on her left wrist. The same band of gold as the wrist in the corridor still.',
      },
      {
        id: 'hs_vest_rail',
        label: 'Hi-vis waistcoat on the coat rail',
        cx: 1008,
        cy: 400,
        r: 42,
        clueId: 'clue_vest_rail',
        observation:
          'A hi-vis waistcoat hangs on the cloakroom rail among the guests’ coats. No name is visible from this angle — anyone could have taken it.',
      },
    ],
  },
];
