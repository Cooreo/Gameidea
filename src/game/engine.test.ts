import { describe, expect, it } from 'vitest';
import {
  MAX_INSPECTIONS_PER_PHOTO,
  addClue,
  addBoardNode,
  askTopic,
  boardWhispers,
  clearSave,
  createInitialState,
  hasSave,
  hintLevel,
  inspectHotspot,
  isHotspotFound,
  isHotspotGuided,
  linkBoardNodes,
  loadGame,
  presentEvidence,
  saveGame,
  startInterview,
  submitTheory,
  theoryReadiness,
  unreadCounts,
  usePhotoHint,
  type GameState,
  type StorageLike,
} from './engine';
import { caseFile } from './case';

const settle = (state: GameState, ids: string[]): GameState =>
  ids.reduce((next, id) => addClue(next, id), state);

function readyBoard(): GameState {
  let state = settle(createInitialState(1000), [
    'clue_frame_nick',
    'clue_frame_intact',
    'clue_brooch_worn',
    'clue_brooch_storage',
    'doc_delivery',
    'clue_crate_insert',
  ]);
  for (const id of [
    'clue_frame_nick',
    'clue_frame_intact',
    'clue_brooch_worn',
    'clue_brooch_storage',
    'doc_delivery',
    'clue_crate_insert',
  ]) {
    state = addBoardNode(state, id, 100, 100);
  }
  state = linkBoardNodes(state, 'clue_frame_nick', 'clue_frame_intact', 'contradicts').state;
  state = linkBoardNodes(state, 'clue_brooch_worn', 'clue_brooch_storage', 'contradicts').state;
  state = linkBoardNodes(state, 'doc_delivery', 'clue_crate_insert', 'contradicts').state;
  return state;
}

const correctAnswers = Object.fromEntries(
  caseFile.theoryQuestions.map((question) => [question.id, question.correct]),
);

describe('clue discovery', () => {
  it('adds the clue behind a hotspot and records the hotspot', () => {
    const result = inspectHotspot(createInitialState(1), 'p_east_room', 'hs_nick');
    expect(result.clueId).toBe('clue_frame_nick');
    expect(result.state.discoveredClueIds).toContain('clue_frame_nick');
    expect(isHotspotFound(result.state, 'p_east_room', 'hs_nick')).toBe(true);
    expect(result.alreadyFound).toBe(false);
  });

  it('is idempotent when the same hotspot is clicked twice', () => {
    const first = inspectHotspot(createInitialState(1), 'p_east_room', 'hs_nick');
    const second = inspectHotspot(first.state, 'p_east_room', 'hs_nick');
    expect(second.alreadyFound).toBe(true);
    expect(
      second.state.discoveredClueIds.filter((id) => id === 'clue_frame_nick'),
    ).toHaveLength(1);
  });

  it('ignores hotspots that do not exist', () => {
    const state = createInitialState(1);
    const result = inspectHotspot(state, 'p_east_room', 'nope');
    expect(result.state).toBe(state);
    expect(result.state.discoveredClueIds).toHaveLength(0);
  });

  it('marks freshly discovered clues as unread until viewed', () => {
    const result = inspectHotspot(createInitialState(1), 'p_east_room', 'hs_nick');
    expect(unreadCounts(result.state).photos).toBe(1);
    expect(unreadCounts(result.state).total).toBe(1);
  });
});

describe('scene inspection hints', () => {
  it('allows two inspections per photograph and then stops', () => {
    let state = createInitialState(1);
    state = usePhotoHint(state, 'p_east_room');
    expect(hintLevel(state, 'p_east_room')).toBe(1);
    expect(state.totalHints).toBe(1);
    expect(isHotspotGuided(state, 'p_east_room', 'hs_nick')).toBe(true);
    expect(isHotspotGuided(state, 'p_east_room', 'hs_label')).toBe(false);

    state = usePhotoHint(state, 'p_east_room');
    expect(hintLevel(state, 'p_east_room')).toBe(2);
    expect(isHotspotGuided(state, 'p_east_room', 'hs_label')).toBe(true);

    state = usePhotoHint(state, 'p_east_room');
    expect(hintLevel(state, 'p_east_room')).toBe(MAX_INSPECTIONS_PER_PHOTO);
    expect(state.totalHints).toBe(2);
  });

  it('keeps hint counters separate between photographs', () => {
    let state = usePhotoHint(createInitialState(1), 'p_east_room');
    state = usePhotoHint(state, 'p_storage');
    expect(hintLevel(state, 'p_east_room')).toBe(1);
    expect(hintLevel(state, 'p_storage')).toBe(1);
  });
});

describe('interviews and contradiction unlocks', () => {
  it('records the greeting once per witness', () => {
    let state = startInterview(createInitialState(1), 'voss');
    const again = startInterview(state, 'voss');
    expect(state.interviews.voss.transcript).toHaveLength(1);
    expect(again).toBe(state);
  });

  it('collects statement cards from spoken lines', () => {
    let state = startInterview(createInitialState(1), 'voss');
    state = askTopic(state, 'voss', 'voss_evening');
    expect(state.discoveredClueIds).toContain('st_voss_alibi');
    expect(state.interviews.voss.askedTopicIds).toContain('voss_evening');
  });

  it('does not unlock the brooch contradiction until both halves are known', () => {
    let state = startInterview(createInitialState(1), 'voss');
    state = addClue(state, 'clue_brooch_storage');

    const early = presentEvidence(state, 'voss', 'clue_brooch_storage');
    expect(early.matched).toBe(false);
    expect(early.contradiction).toBe(false);
    expect(early.state.discoveredClueIds).not.toContain('st_voss_brooch_lent');

    state = addClue(state, 'clue_brooch_worn');
    const hit = presentEvidence(state, 'voss', 'clue_brooch_storage');
    expect(hit.matched).toBe(true);
    expect(hit.contradiction).toBe(true);
    expect(hit.state.discoveredClueIds).toContain('st_voss_brooch_lent');
    expect(hit.state.interviews.voss.unlockedTopicIds).toContain('voss_brooch_lie');
    expect(hit.state.interviews.voss.transcript.at(-1)?.contradiction).toBe(true);
  });

  it('does not fire the same contradiction twice', () => {
    let state = settle(createInitialState(1), ['clue_brooch_storage', 'clue_brooch_worn']);
    state = startInterview(state, 'voss');
    const first = presentEvidence(state, 'voss', 'clue_brooch_storage');
    const second = presentEvidence(first.state, 'voss', 'clue_brooch_storage');
    expect(first.contradiction).toBe(true);
    expect(second.contradiction).toBe(false);
    expect(second.state.interviews.voss.transcript.at(-1)?.lines).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: 'say' })]),
    );
  });

  it('reveals a hidden topic only after the prerequisite topic is asked', () => {
    let state = settle(createInitialState(1), ['clue_brooch_storage', 'clue_brooch_worn']);
    state = startInterview(state, 'voss');
    expect(state.interviews.voss.unlockedTopicIds).not.toContain('voss_brooch_lie');
    const hit = presentEvidence(state, 'voss', 'clue_brooch_storage');
    state = askTopic(hit.state, 'voss', 'voss_brooch_lie');
    expect(state.interviews.voss.askedTopicIds).toContain('voss_brooch_lie');
  });

  it('answers irrelevant evidence with a sensible deflection instead of breaking', () => {
    let state = settle(createInitialState(1), ['doc_incident']);
    state = startInterview(state, 'renn');
    const out = presentEvidence(state, 'renn', 'doc_incident');
    expect(out.matched).toBe(false);
    expect(out.contradiction).toBe(false);
    expect(out.state.interviews.renn.transcript).toHaveLength(2);
    expect(out.state.interviews.renn.presentedEvidenceIds).toContain('doc_incident');
  });

  it('requires the crate photograph before Renn admits moving it', () => {
    let state = startInterview(createInitialState(1), 'renn');
    state = addClue(state, 'clue_crate_bay');
    const early = presentEvidence(state, 'renn', 'clue_crate_bay');
    expect(early.matched).toBe(false);

    state = addClue(state, 'clue_crate_insert');
    const hit = presentEvidence(state, 'renn', 'clue_crate_bay');
    expect(hit.contradiction).toBe(true);
    expect(hit.state.discoveredClueIds).toContain('st_renn_admission');
    expect(hit.state.interviews.renn.unlockedTopicIds).toContain('renn_time');
  });

  it('cascades Voss’s brooch story into Nadia’s contradiction', () => {
    let state = settle(createInitialState(1), ['clue_brooch_worn']);
    state = startInterview(state, 'voss');
    state = startInterview(state, 'nadia');
    state = addClue(state, 'clue_brooch_storage');
    const vossHit = presentEvidence(state, 'voss', 'clue_brooch_storage');
    const nadiaHit = presentEvidence(
      vossHit.state,
      'nadia',
      'st_voss_brooch_lent',
    );
    expect(nadiaHit.contradiction).toBe(true);
    expect(nadiaHit.state.discoveredClueIds).toContain('st_nadia_never_wore');
    expect(nadiaHit.state.interviews.nadia.unlockedTopicIds).toContain('nadia_silver');
  });
});

describe('deduction board', () => {
  it('validates the frame deduction and files the conclusion', () => {
    let state = addClue(createInitialState(1), 'clue_frame_nick');
    state = addClue(state, 'clue_frame_intact');
    expect(state.board.insights).toHaveLength(0);
    state = addBoardNode(state, 'clue_frame_nick', 100, 100);
    state = addBoardNode(state, 'clue_frame_intact', 600, 100);

    const result = linkBoardNodes(state, 'clue_frame_nick', 'clue_frame_intact', 'contradicts');
    expect(result.validation?.insightId).toBe('i_substitute');
    expect(result.state.board.insights).toContain('i_substitute');
    expect(result.state.discoveredClueIds).toContain('i_substitute');
    expect(
      result.state.board.nodes.some((node) => node.clueId === 'i_substitute'),
    ).toBe(true);
  });

  it('accepts the pair in either order', () => {
    let state = settle(createInitialState(1), ['clue_brooch_worn', 'clue_brooch_storage']);
    state = addBoardNode(state, 'clue_brooch_worn', 10, 10);
    state = addBoardNode(state, 'clue_brooch_storage', 20, 20);
    const result = linkBoardNodes(state, 'clue_brooch_storage', 'clue_brooch_worn', 'contradicts');
    expect(result.validation?.insightId).toBe('i_voss_storage');
  });

  it('lets the player make unsolved connections without nagging', () => {
    let state = settle(createInitialState(1), ['clue_frame_nick', 'doc_insurance']);
    state = addBoardNode(state, 'clue_frame_nick', 10, 10);
    state = addBoardNode(state, 'doc_insurance', 20, 20);
    const result = linkBoardNodes(state, 'clue_frame_nick', 'doc_insurance', 'supports');
    expect(result.validation).toBeUndefined();
    expect(result.state.board.links).toHaveLength(1);
  });

  it('refuses duplicate links, self links and nodes that are not pinned', () => {
    let state = settle(createInitialState(1), ['clue_frame_nick', 'clue_frame_intact']);
    state = addBoardNode(state, 'clue_frame_nick', 10, 10);
    state = addBoardNode(state, 'clue_frame_intact', 20, 20);
    expect(linkBoardNodes(state, 'clue_frame_nick', 'clue_frame_nick', 'supports').error).toBe('same');
    const linked = linkBoardNodes(state, 'clue_frame_nick', 'clue_frame_intact', 'supports');
    expect(linked.state.board.links).toHaveLength(1);
    expect(linkBoardNodes(linked.state, 'clue_frame_nick', 'clue_frame_intact', 'supports').error).toBe('duplicate');
    expect(linkBoardNodes(state, 'doc_insurance', 'clue_frame_nick', 'supports').error).toBe('missing');
  });

  it('offers a whisper when two related cards sit unconnected on the board', () => {
    let state = settle(createInitialState(1), ['clue_frame_nick', 'clue_frame_intact']);
    state = addBoardNode(state, 'clue_frame_nick', 10, 10);
    state = addBoardNode(state, 'clue_frame_intact', 20, 20);
    expect(boardWhispers(state)).toHaveLength(1);
    state = linkBoardNodes(state, 'clue_frame_nick', 'clue_frame_intact', 'contradicts').state;
    expect(boardWhispers(state)).toHaveLength(0);
  });

  it('keeps board positions and links across a reload', () => {
    const state = readyBoard();
    const storage = memoryStorage();
    saveGame(state, storage);
    const loaded = loadGame(storage);
    expect(loaded?.board.nodes).toHaveLength(state.board.nodes.length);
    expect(loaded?.board.links).toHaveLength(3);
    expect(loaded?.board.insights).toHaveLength(3);
  });
});

describe('final theory', () => {
  it('is locked until the three key deductions are on the board', () => {
    let state = settle(createInitialState(1), [
      'clue_frame_nick',
      'clue_frame_intact',
    ]);
    state = addBoardNode(state, 'clue_frame_nick', 10, 10);
    state = addBoardNode(state, 'clue_frame_intact', 20, 20);
    state = linkBoardNodes(state, 'clue_frame_nick', 'clue_frame_intact', 'contradicts').state;

    expect(theoryReadiness(state).ready).toBe(false);
    const blocked = submitTheory(state, correctAnswers);
    expect(blocked.blocked).toBe(true);
    expect(blocked.solved).toBe(false);
    expect(blocked.state.theory.attempts).toBe(0);
  });

  it('unlocks when all three deductions are made and accepts the correct theory', () => {
    const state = readyBoard();
    const readiness = theoryReadiness(state);
    expect(readiness.ready).toBe(true);
    expect(readiness.missing).toHaveLength(0);

    const attempt = submitTheory(state, correctAnswers);
    expect(attempt.blocked).toBeUndefined();
    expect(attempt.solved).toBe(true);
    expect(attempt.state.theory.solved).toBe(true);
    expect(attempt.state.theory.solvedAt).toBeGreaterThan(0);
    expect(attempt.state.theory.attempts).toBe(1);
  });

  it('allows a retry after a wrong answer and reports which questions failed', () => {
    const state = readyBoard();
    const wrong = { ...correctAnswers, q_who: 'renn' };
    const first = submitTheory(state, wrong);
    expect(first.solved).toBe(false);
    expect(first.result.results.find((r) => r.questionId === 'q_who')?.correct).toBe(false);
    expect(first.result.results.filter((r) => r.correct)).toHaveLength(4);
    expect(first.state.theory.attempts).toBe(1);
    expect(first.state.theory.solved).toBe(false);

    const second = submitTheory(first.state, correctAnswers);
    expect(second.solved).toBe(true);
    expect(second.state.theory.attempts).toBe(2);
  });

  it('rejects the crate answer when the original is placed elsewhere', () => {
    const state = readyBoard();
    const wrong = { ...correctAnswers, q_original: 'skip' };
    const attempt = submitTheory(state, wrong);
    expect(attempt.solved).toBe(false);
    expect(attempt.result.results.find((r) => r.questionId === 'q_original')?.correct).toBe(false);
  });
});

describe('persistence', () => {
  it('round-trips a save including interviews, hints and viewed cards', () => {
    let state = createInitialState(1000);
    state = inspectHotspot(state, 'p_storage', 'hs_foam').state;
    state = usePhotoHint(state, 'p_storage');
    state = startInterview(state, 'nadia');
    state = askTopic(state, 'nadia', 'nadia_photos');
    const storage = memoryStorage();
    saveGame(state, storage);

    expect(hasSave(storage)).toBe(true);
    const loaded = loadGame(storage);
    expect(loaded?.discoveredClueIds).toContain('clue_crate_insert');
    expect(loaded?.hintUse.p_storage).toBe(1);
    expect(loaded?.interviews.nadia.met).toBe(true);
    expect(loaded?.interviews.nadia.askedTopicIds).toContain('nadia_photos');
  });

  it('ignores saves from an incompatible version or corrupt JSON', () => {
    const storage = memoryStorage();
    storage.setItem(
      'lastlight.save.v1',
      JSON.stringify({ ...createInitialState(1), version: 99 }),
    );
    expect(loadGame(storage)).toBeNull();
    storage.setItem('lastlight.save.v1', '{not json');
    expect(loadGame(storage)).toBeNull();
  });

  it('clears a save', () => {
    const storage = memoryStorage();
    saveGame(createInitialState(1), storage);
    clearSave(storage);
    expect(hasSave(storage)).toBe(false);
  });
});

// ── helpers ────────────────────────────────────────────────────────────────

function memoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, value),
    removeItem: (key) => void map.delete(key),
  };
}
