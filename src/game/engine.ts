import type {
  CaseData,
  Clue,
  Line,
  Person,
  TheoryQuestion,
  Topic,
} from './types';
import { caseFile } from './case';

export const SAVE_KEY = 'lastlight.save.v1';
export const SAVE_VERSION = 1;
export const MAX_INSPECTIONS_PER_PHOTO = 2;

export interface TranscriptEntry {
  id: string;
  kind: 'greeting' | 'topic' | 'presentation';
  topicId?: string;
  evidenceId?: string;
  ruleId?: string;
  contradiction: boolean;
  lines: Line[];
}

export interface InterviewState {
  met: boolean;
  askedTopicIds: string[];
  unlockedTopicIds: string[];
  firedRuleIds: string[];
  presentedEvidenceIds: string[];
  transcript: TranscriptEntry[];
}

export interface BoardNode {
  clueId: string;
  x: number;
  y: number;
}

export interface BoardLink {
  id: string;
  a: string;
  b: string;
  label: 'supports' | 'contradicts';
}

export interface BoardState {
  nodes: BoardNode[];
  links: BoardLink[];
  insights: string[];
}

export interface TheoryResult {
  answers: Record<string, string>;
  results: { questionId: string; correct: boolean }[];
  allCorrect: boolean;
}

export interface TheoryState {
  attempts: number;
  solved: boolean;
  solvedAt?: number;
  answers?: Record<string, string>;
  lastResult?: TheoryResult;
}

export interface GameState {
  version: number;
  started: boolean;
  startedAt: number;
  updatedAt: number;
  discoveredClueIds: string[];
  viewedClueIds: string[];
  discoveredHotspots: string[];
  hintUse: Record<string, number>;
  guidedPhotos: string[];
  photosOpened: string[];
  documentsOpened: string[];
  interviews: Record<string, InterviewState>;
  board: BoardState;
  theory: TheoryState;
  totalHints: number;
  onboardingDismissed: boolean;
  sequence: number;
}

const now = () => Date.now();

const pushUnique = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list : [...list, value];

const emptyInterview = (): InterviewState => ({
  met: false,
  askedTopicIds: [],
  unlockedTopicIds: [],
  firedRuleIds: [],
  presentedEvidenceIds: [],
  transcript: [],
});

export function createInitialState(at = now()): GameState {
  return {
    version: SAVE_VERSION,
    started: true,
    startedAt: at,
    updatedAt: at,
    discoveredClueIds: [],
    viewedClueIds: [],
    discoveredHotspots: [],
    hintUse: {},
    guidedPhotos: [],
    photosOpened: [],
    documentsOpened: [],
    interviews: {},
    board: { nodes: [], links: [], insights: [] },
    theory: { attempts: 0, solved: false },
    totalHints: 0,
    onboardingDismissed: false,
    sequence: 0,
  };
}

// ── Lookups ────────────────────────────────────────────────────────────────

export function getClue(clueId: string, data: CaseData = caseFile): Clue | undefined {
  return data.clues.find((clue) => clue.id === clueId);
}

export function getPerson(personId: string, data: CaseData = caseFile): Person | undefined {
  return data.people.find((person) => person.id === personId);
}

export function getTopic(person: Person, topicId: string): Topic | undefined {
  return person.topics.find((topic) => topic.id === topicId);
}

export function hotspotKey(photoId: string, hotspotId: string): string {
  return `${photoId}:${hotspotId}`;
}

export function isHotspotFound(
  state: GameState,
  photoId: string,
  hotspotId: string,
): boolean {
  return state.discoveredHotspots.includes(hotspotKey(photoId, hotspotId));
}

/** Level 0 = no hint, 1 = text hint, 2 = guide rings. */
export function hintLevel(state: GameState, photoId: string): number {
  return state.hintUse[photoId] ?? 0;
}

export function isHotspotGuided(
  state: GameState,
  photoId: string,
  hotspotId: string,
): boolean {
  const level = hintLevel(state, photoId);
  if (level >= 2) return true;
  if (level !== 1) return false;
  const photo = caseFile.photos.find((p) => p.id === photoId);
  if (!photo) return false;
  const firstUnfound = photo.hotspots.find(
    (spot) => !isHotspotFound(state, photoId, spot.id),
  );
  return firstUnfound?.id === hotspotId;
}

// ── Discovery ──────────────────────────────────────────────────────────────

export function addClue(state: GameState, clueId: string, data: CaseData = caseFile): GameState {
  if (!data.clues.some((clue) => clue.id === clueId)) return state;
  if (state.discoveredClueIds.includes(clueId)) return state;
  return {
    ...state,
    discoveredClueIds: [...state.discoveredClueIds, clueId],
    updatedAt: now(),
  };
}

export function viewClue(state: GameState, clueId: string): GameState {
  if (!state.discoveredClueIds.includes(clueId)) return state;
  if (state.viewedClueIds.includes(clueId)) return state;
  return {
    ...state,
    viewedClueIds: [...state.viewedClueIds, clueId],
    updatedAt: now(),
  };
}

export function examineDocument(
  state: GameState,
  documentId: string,
  data: CaseData = caseFile,
): GameState {
  const document = data.documents.find((doc) => doc.id === documentId);
  if (!document) return state;
  let next: GameState = {
    ...state,
    documentsOpened: pushUnique(state.documentsOpened, documentId),
    updatedAt: now(),
  };
  next = addClue(next, document.clueId, data);
  next = viewClue(next, document.clueId);
  return next;
}

export function openPhoto(state: GameState, photoId: string): GameState {
  return {
    ...state,
    photosOpened: pushUnique(state.photosOpened, photoId),
    updatedAt: now(),
  };
}

export interface InspectResult {
  state: GameState;
  clueId?: string;
  observation?: string;
  alreadyFound: boolean;
}

export function inspectHotspot(
  state: GameState,
  photoId: string,
  hotspotId: string,
  data: CaseData = caseFile,
): InspectResult {
  const photo = data.photos.find((p) => p.id === photoId);
  const spot = photo?.hotspots.find((h) => h.id === hotspotId);
  if (!photo || !spot) return { state, alreadyFound: false };

  const alreadyFound = isHotspotFound(state, photoId, hotspotId);
  let next: GameState = {
    ...state,
    discoveredHotspots: pushUnique(
      state.discoveredHotspots,
      hotspotKey(photoId, hotspotId),
    ),
    photosOpened: pushUnique(state.photosOpened, photoId),
    updatedAt: now(),
  };
  next = addClue(next, spot.clueId, data);
  return {
    state: next,
    clueId: spot.clueId,
    observation: spot.observation,
    alreadyFound,
  };
}

export function usePhotoHint(state: GameState, photoId: string): GameState {
  const used = hintLevel(state, photoId);
  if (used >= MAX_INSPECTIONS_PER_PHOTO) return state;
  const nextLevel = used + 1;
  return {
    ...state,
    hintUse: { ...state.hintUse, [photoId]: nextLevel },
    guidedPhotos:
      nextLevel >= 2 ? pushUnique(state.guidedPhotos, photoId) : state.guidedPhotos,
    totalHints: state.totalHints + 1,
    updatedAt: now(),
  };
}

// ── Interviews ─────────────────────────────────────────────────────────────

function absorbStatements(
  state: GameState,
  lines: Line[],
  data: CaseData,
): GameState {
  let next = state;
  for (const line of lines) {
    if (line.statementId) next = addClue(next, line.statementId, data);
  }
  return next;
}

function withEntry(
  state: GameState,
  personId: string,
  entry: Omit<TranscriptEntry, 'id'>,
  data: CaseData,
  patch: Partial<InterviewState> = {},
): GameState {
  const current = state.interviews[personId] ?? emptyInterview();
  const id = `entry_${state.sequence + 1}`;
  const updated: InterviewState = {
    ...current,
    ...patch,
    transcript: [...current.transcript, { ...entry, id }],
  };
  let next: GameState = {
    ...state,
    interviews: { ...state.interviews, [personId]: updated },
    sequence: state.sequence + 1,
    updatedAt: now(),
  };
  next = absorbStatements(next, entry.lines, data);
  return next;
}

export function startInterview(
  state: GameState,
  personId: string,
  data: CaseData = caseFile,
): GameState {
  const person = getPerson(personId, data);
  if (!person) return state;
  const current = state.interviews[personId];
  if (current?.met) return state;
  const base = current ?? emptyInterview();
  return withEntry(
    state,
    personId,
    {
      kind: 'greeting',
      contradiction: false,
      lines: person.greeting,
    },
    data,
    {
      met: true,
      transcript: base.transcript,
      askedTopicIds: base.askedTopicIds,
      unlockedTopicIds: base.unlockedTopicIds,
      firedRuleIds: base.firedRuleIds,
      presentedEvidenceIds: base.presentedEvidenceIds,
    },
  );
}

export function isTopicAvailable(
  state: GameState,
  person: Person,
  topic: Topic,
): boolean {
  const interview = state.interviews[person.id];
  if (interview?.unlockedTopicIds.includes(topic.id)) return true;
  if (!topic.requiresClues?.length) return true;
  return topic.requiresClues.every((id) => state.discoveredClueIds.includes(id));
}

export function availableTopics(state: GameState, person: Person): Topic[] {
  return person.topics.filter((topic) => isTopicAvailable(state, person, topic));
}

export function askTopic(
  state: GameState,
  personId: string,
  topicId: string,
  data: CaseData = caseFile,
): GameState {
  const person = getPerson(personId, data);
  const topic = person ? getTopic(person, topicId) : undefined;
  if (!person || !topic) return state;
  if (!isTopicAvailable(state, person, topic)) return state;
  const interview = state.interviews[personId] ?? emptyInterview();
  if (interview.askedTopicIds.includes(topicId)) return state;
  return withEntry(
    state,
    personId,
    {
      kind: 'topic',
      topicId,
      contradiction: false,
      lines: topic.lines,
    },
    data,
    {
      askedTopicIds: [...interview.askedTopicIds, topicId],
    },
  );
}

export interface PresentationOutcome {
  state: GameState;
  contradiction: boolean;
  matched: boolean;
  ruleId?: string;
  statementId?: string;
}

export function presentEvidence(
  state: GameState,
  personId: string,
  evidenceId: string,
  data: CaseData = caseFile,
): PresentationOutcome {
  const person = getPerson(personId, data);
  const clue = getClue(evidenceId, data);
  if (!person || !clue) return { state, contradiction: false, matched: false };
  if (!state.discoveredClueIds.includes(evidenceId)) {
    return { state, contradiction: false, matched: false };
  }

  const interview = state.interviews[personId] ?? emptyInterview();
  const rule = data.presentations.find(
    (candidate) =>
      candidate.personId === personId &&
      candidate.evidenceId === evidenceId &&
      (candidate.requiresClues ?? []).every((id) =>
        state.discoveredClueIds.includes(id),
      ),
  );

  if (!rule) {
    const tailored = person.deflectionRules?.find(
      (entry) => entry.evidenceId === evidenceId,
    );
    const text =
      tailored?.text ??
      person.deflect[
        Math.abs(
          [...evidenceId].reduce((sum, char) => sum + char.charCodeAt(0), 0),
        ) % person.deflect.length
      ];
    const next = withEntry(
      state,
      personId,
      {
        kind: 'presentation',
        evidenceId,
        contradiction: false,
        lines: [{ kind: 'say', text }],
      },
      data,
      {
        presentedEvidenceIds: pushUnique(interview.presentedEvidenceIds, evidenceId),
      },
    );
    return { state: next, contradiction: false, matched: false };
  }

  const alreadyFired = interview.firedRuleIds.includes(rule.id);
  const lines = alreadyFired
    ? (rule.repeatLines ?? [
        { kind: 'say', text: 'We have been through this.' } as Line,
      ])
    : rule.lines;

  const next = withEntry(
    state,
    personId,
    {
      kind: 'presentation',
      evidenceId,
      ruleId: rule.id,
      contradiction: !alreadyFired && Boolean(rule.contradiction),
      lines,
    },
    data,
    {
      presentedEvidenceIds: pushUnique(interview.presentedEvidenceIds, evidenceId),
      firedRuleIds: alreadyFired
        ? interview.firedRuleIds
        : pushUnique(interview.firedRuleIds, rule.id),
      unlockedTopicIds: alreadyFired
        ? interview.unlockedTopicIds
        : [
            ...interview.unlockedTopicIds,
            ...(rule.unlockTopicIds ?? []).filter(
              (id) => !interview.unlockedTopicIds.includes(id),
            ),
          ],
    },
  );

  let finalState = next;
  if (!alreadyFired && rule.statementId) {
    finalState = addClue(finalState, rule.statementId, data);
  }

  return {
    state: finalState,
    contradiction: !alreadyFired && Boolean(rule.contradiction),
    matched: true,
    ruleId: rule.id,
    statementId: rule.statementId,
  };
}

export function contradictionCount(state: GameState): number {
  return Object.values(state.interviews).reduce(
    (total, interview) =>
      total + interview.transcript.filter((entry) => entry.contradiction).length,
    0,
  );
}

// ── Deduction board ────────────────────────────────────────────────────────

export function isOnBoard(state: GameState, clueId: string): boolean {
  return state.board.nodes.some((node) => node.clueId === clueId);
}

export function addBoardNode(
  state: GameState,
  clueId: string,
  x: number,
  y: number,
): GameState {
  if (!state.discoveredClueIds.includes(clueId)) return state;
  if (isOnBoard(state, clueId)) return state;
  return {
    ...state,
    board: {
      ...state.board,
      nodes: [...state.board.nodes, { clueId, x, y }],
    },
    updatedAt: now(),
  };
}

export function moveBoardNode(
  state: GameState,
  clueId: string,
  x: number,
  y: number,
): GameState {
  return {
    ...state,
    board: {
      ...state.board,
      nodes: state.board.nodes.map((node) =>
        node.clueId === clueId ? { ...node, x, y } : node,
      ),
    },
    updatedAt: now(),
  };
}

export function removeBoardNode(state: GameState, clueId: string): GameState {
  return {
    ...state,
    board: {
      ...state.board,
      nodes: state.board.nodes.filter((node) => node.clueId !== clueId),
      links: state.board.links.filter(
        (link) => link.a !== clueId && link.b !== clueId,
      ),
    },
    updatedAt: now(),
  };
}

export function removeBoardLink(state: GameState, linkId: string): GameState {
  return {
    ...state,
    board: {
      ...state.board,
      links: state.board.links.filter((link) => link.id !== linkId),
    },
    updatedAt: now(),
  };
}

export interface LinkResult {
  state: GameState;
  validation?: {
    insightId: string;
    feedback: string;
    insightIsNew: boolean;
  };
  error?: 'duplicate' | 'same' | 'missing';
}

export function linkBoardNodes(
  state: GameState,
  a: string,
  b: string,
  label: 'supports' | 'contradicts',
  data: CaseData = caseFile,
): LinkResult {
  if (a === b) return { state, error: 'same' };
  if (!isOnBoard(state, a) || !isOnBoard(state, b)) {
    return { state, error: 'missing' };
  }
  const duplicate = state.board.links.some(
    (link) =>
      link.label === label &&
      ((link.a === a && link.b === b) || (link.a === b && link.b === a)),
  );
  if (duplicate) return { state, error: 'duplicate' };

  const link: BoardLink = {
    id: `link_${state.sequence + 1}`,
    a,
    b,
    label,
  };

  let next: GameState = {
    ...state,
    board: { ...state.board, links: [...state.board.links, link] },
    sequence: state.sequence + 1,
    updatedAt: now(),
  };

  const rule = data.deductions.find(
    (candidate) =>
      candidate.label === label &&
      ((candidate.a === a && candidate.b === b) ||
        (candidate.a === b && candidate.b === a)),
  );
  if (!rule) return { state: next };

  const insightIsNew = !next.discoveredClueIds.includes(rule.insightId);
  next = addClue(next, rule.insightId, data);
  next = viewClue(next, rule.insightId);
  next = {
    ...next,
    board: {
      ...next.board,
      insights: pushUnique(next.board.insights, rule.insightId),
    },
  };

  if (insightIsNew && !isOnBoard(next, rule.insightId)) {
    const nodeA = next.board.nodes.find((node) => node.clueId === a);
    const nodeB = next.board.nodes.find((node) => node.clueId === b);
    if (nodeA && nodeB) {
      const x = Math.round((nodeA.x + nodeB.x) / 2);
      const y = Math.round((nodeA.y + nodeB.y) / 2 + 150);
      next = {
        ...next,
        board: {
          ...next.board,
          nodes: [...next.board.nodes, { clueId: rule.insightId, x, y }],
        },
      };
    }
  }

  return {
    state: next,
    validation: {
      insightId: rule.insightId,
      feedback: rule.feedback,
      insightIsNew,
    },
  };
}

/** Which required deductions have been made, and which are still open. */
export function theoryReadiness(
  state: GameState,
  data: CaseData = caseFile,
): { ready: boolean; satisfied: string[]; missing: string[] } {
  const satisfied = data.theoryRequirements
    .filter((requirement) => state.board.insights.includes(requirement.insightId))
    .map((requirement) => requirement.insightId);
  const missing = data.theoryRequirements
    .filter((requirement) => !state.board.insights.includes(requirement.insightId))
    .map((requirement) => requirement.insightId);
  return { ready: missing.length === 0, satisfied, missing };
}

// ── Board hints (gentle nudges, never answers) ─────────────────────────────

export interface BoardWhisper {
  id: string;
  text: string;
}

export function boardWhispers(state: GameState): BoardWhisper[] {
  const whispers: BoardWhisper[] = [];
  const linked = (a: string, b: string) =>
    state.board.links.some(
      (link) =>
        (link.a === a && link.b === b) || (link.a === b && link.b === a),
    );

  const pairs: [string, string, string][] = [
    ['clue_frame_nick', 'clue_frame_intact', 'Two photographs of the same corner. Do they agree?'],
    ['clue_brooch_worn', 'clue_brooch_storage', 'Something worn early. The same thing found late.'],
    ['doc_delivery', 'clue_crate_insert', 'The docket calls it empty. The room disagrees.'],
    ['clue_vest_rail', 'clue_renn_vest', 'A vest on a rail, a vest in a corridor.'],
  ];

  for (const [a, b, text] of pairs) {
    const bothOnBoard = isOnBoard(state, a) && isOnBoard(state, b);
    if (bothOnBoard && !linked(a, b)) whispers.push({ id: `${a}_${b}`, text });
  }
  return whispers;
}

// ── Theory ─────────────────────────────────────────────────────────────────

export interface SubmitTheoryResult {
  state: GameState;
  result: TheoryResult;
  solved: boolean;
  /** True when the required deductions are missing and nothing was judged. */
  blocked?: boolean;
}

export function submitTheory(
  state: GameState,
  answers: Record<string, string>,
  data: CaseData = caseFile,
): SubmitTheoryResult {
  if (!theoryReadiness(state, data).ready) {
    return {
      state,
      result: { answers, results: [], allCorrect: false },
      solved: false,
      blocked: true,
    };
  }
  const results = data.theoryQuestions.map((question: TheoryQuestion) => ({
    questionId: question.id,
    correct: answers[question.id] === question.correct,
  }));
  const allCorrect = results.every((entry) => entry.correct);
  const result: TheoryResult = { answers, results, allCorrect };

  if (allCorrect && !state.theory.solved) {
    return {
      state: {
        ...state,
        theory: {
          attempts: state.theory.attempts + 1,
          solved: true,
          solvedAt: now(),
          answers,
          lastResult: result,
        },
        updatedAt: now(),
      },
      result,
      solved: true,
    };
  }

  return {
    state: {
      ...state,
      theory: {
        ...state.theory,
        attempts: state.theory.attempts + 1,
        answers,
        lastResult: result,
      },
      updatedAt: now(),
    },
    result,
    solved: allCorrect,
  };
}

// ── Badges ─────────────────────────────────────────────────────────────────

export interface UnreadCounts {
  photos: number;
  documents: number;
  interviews: number;
  board: number;
  total: number;
}

export function unreadCounts(state: GameState, data: CaseData = caseFile): UnreadCounts {
  const unreadOfKind = (kind: Clue['kind']) =>
    data.clues.filter(
      (clue) =>
        clue.kind === kind &&
        state.discoveredClueIds.includes(clue.id) &&
        !state.viewedClueIds.includes(clue.id),
    ).length;
  const photos = unreadOfKind('observation');
  const documents = unreadOfKind('document');
  const interviews = unreadOfKind('statement');
  const board = unreadOfKind('insight');
  return {
    photos,
    documents,
    interviews,
    board,
    total: photos + documents + interviews + board,
  };
}

export function caseProgress(
  state: GameState,
  data: CaseData = caseFile,
): { found: number; total: number } {
  const totalClues = data.clues.filter((clue) => clue.kind !== 'insight').length;
  const found = state.discoveredClueIds.filter(
    (id) => getClue(id, data)?.kind !== 'insight',
  ).length;
  return { found, total: totalClues };
}

export function elapsedLabel(state: GameState): string {
  const end = state.theory.solvedAt ?? state.updatedAt;
  const seconds = Math.max(0, Math.round((end - state.startedAt) / 1000));
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

// ── Persistence ────────────────────────────────────────────────────────────

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function browserStorage(): StorageLike | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

export function saveGame(
  state: GameState,
  storage: StorageLike | null = browserStorage(),
): void {
  if (!storage) return;
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — the game still plays, it just won't persist */
  }
}

function normalise(raw: unknown): GameState | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as Partial<GameState>;
  if (candidate.version !== SAVE_VERSION) return null;
  const base = createInitialState(candidate.startedAt ?? now());
  const state: GameState = {
    ...base,
    ...candidate,
    version: SAVE_VERSION,
    discoveredClueIds: Array.isArray(candidate.discoveredClueIds)
      ? candidate.discoveredClueIds
      : [],
    viewedClueIds: Array.isArray(candidate.viewedClueIds)
      ? candidate.viewedClueIds
      : [],
    discoveredHotspots: Array.isArray(candidate.discoveredHotspots)
      ? candidate.discoveredHotspots
      : [],
    hintUse: candidate.hintUse && typeof candidate.hintUse === 'object' ? candidate.hintUse : {},
    guidedPhotos: Array.isArray(candidate.guidedPhotos) ? candidate.guidedPhotos : [],
    photosOpened: Array.isArray(candidate.photosOpened) ? candidate.photosOpened : [],
    documentsOpened: Array.isArray(candidate.documentsOpened)
      ? candidate.documentsOpened
      : [],
    interviews:
      candidate.interviews && typeof candidate.interviews === 'object'
        ? candidate.interviews
        : {},
    board:
      candidate.board &&
      Array.isArray(candidate.board.nodes) &&
      Array.isArray(candidate.board.links)
        ? {
            nodes: candidate.board.nodes,
            links: candidate.board.links,
            insights: Array.isArray(candidate.board.insights)
              ? candidate.board.insights
              : [],
          }
        : base.board,
    theory:
      candidate.theory && typeof candidate.theory === 'object'
        ? {
            ...candidate.theory,
            attempts: candidate.theory.attempts ?? 0,
            solved: candidate.theory.solved ?? false,
          }
        : base.theory,
    sequence: typeof candidate.sequence === 'number' ? candidate.sequence : 0,
  };
  return state;
}

export function loadGame(storage: StorageLike | null = browserStorage()): GameState | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (!raw) return null;
    return normalise(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function hasSave(storage: StorageLike | null = browserStorage()): boolean {
  return loadGame(storage) !== null;
}

export function clearSave(storage: StorageLike | null = browserStorage()): void {
  if (!storage) return;
  try {
    storage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}
