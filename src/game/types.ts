/**
 * Types for the authored case. Everything the player can read, find or connect
 * lives in `case.ts`; the UI only renders it.
 */

export type ClueKind = 'observation' | 'document' | 'statement' | 'insight';

export interface Clue {
  id: string;
  kind: ClueKind;
  title: string;
  /** One or two lines shown on the card face. */
  summary: string;
  /** Longer text shown when the card is opened. */
  detail: string;
  /** Provenance line, e.g. "Photograph · East Room · 19:12". */
  source: string;
  photoId?: string;
  documentId?: string;
  personId?: string;
  key?: boolean;
  /** For statements: the exact words, quoted in the card. */
  quote?: string;
}

export interface Hotspot {
  id: string;
  /** Screen-reader label; invisible in the picture itself. */
  label: string;
  cx: number;
  cy: number;
  r: number;
  observation: string;
  clueId: string;
}

export type PhotoScene =
  | 'eastRoom'
  | 'corridor'
  | 'storage'
  | 'loadingBay'
  | 'cloakroom';

export interface Photo {
  id: string;
  title: string;
  timestamp: string;
  place: string;
  credit: string;
  caption: string;
  description: string;
  scene: PhotoScene;
  width: number;
  height: number;
  hotspots: Hotspot[];
  /** Two staged hints; using one consumes an "inspection". */
  hints: [string, string];
}

export type DocBlock =
  | { type: 'heading'; text: string }
  | { type: 'para'; text: string }
  | { type: 'mark'; text: string; note: string }
  | { type: 'kv'; rows: [string, string][] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'note'; text: string }
  | { type: 'stamp'; text: string; tone?: 'red' | 'ink' }
  | { type: 'divider' }
  | { type: 'signature'; name: string; role: string };

export interface CaseDocument {
  id: string;
  title: string;
  subtitle: string;
  documentId: string;
  stampDate: string;
  clueId: string;
  blocks: DocBlock[];
}

export type LineKind = 'say' | 'you' | 'thought';

export interface Line {
  kind: LineKind;
  text: string;
  /** Statement card created by this line. */
  statementId?: string;
}

export interface Topic {
  id: string;
  label: string;
  lines: Line[];
  /** Topic only appears once every clue in this list is known. */
  requiresClues?: string[];
  /** Topic only appears once a contradiction / insight flag is set. */
  requiresFlag?: string;
}

export interface PresentationRule {
  id: string;
  personId: string;
  evidenceId: string;
  /** All of these clues must be known before the rule can fire. */
  requiresClues?: string[];
  lines: Line[];
  contradiction?: boolean;
  unlockTopicIds?: string[];
  /** Statement card added (and pinned) automatically. */
  statementId?: string;
  /** Used when the same evidence is presented again. */
  repeatLines?: Line[];
}

export interface Person {
  id: string;
  name: string;
  role: string;
  age: number;
  portrait: 'voss' | 'renn' | 'nadia';
  short: string;
  bio: string;
  alibi: string;
  /** First meeting, before any topic is chosen. */
  greeting: Line[];
  topics: Topic[];
  /** Generic responses when presenting something irrelevant. */
  deflect: string[];
  /** Optional tailored reaction when a specific card is irrelevant. */
  deflectionRules?: { evidenceId: string; text: string }[];
}

export type EvidenceCategory = 'photos' | 'documents' | 'interviews';

export interface Statement {
  id: string;
  personId: string;
  title: string;
  summary: string;
  text: string;
  /** Extra context shown on the card. */
  context: string;
  key?: boolean;
}

export interface DeductionRule {
  id: string;
  a: string;
  b: string;
  label: 'supports' | 'contradicts';
  insightId: string;
  /** Feedback shown when the connection is first made. */
  feedback: string;
}

export interface TheoryRequirement {
  insightId: string;
  label: string;
}

export interface TheoryOption {
  id: string;
  label: string;
}

export interface TheoryQuestion {
  id: string;
  prompt: string;
  hint: string;
  options: TheoryOption[];
  correct: string;
  feedback: string;
}

export interface CaseData {
  id: string;
  title: string;
  subtitle: string;
  caseNumber: string;
  dateLabel: string;
  location: string;
  tagline: string;
  briefing: string[];
  supervisor: { name: string; role: string };
  photos: Photo[];
  documents: CaseDocument[];
  people: Person[];
  clues: Clue[];
  statements: Statement[];
  deductions: DeductionRule[];
  presentations: PresentationRule[];
  theoryRequirements: TheoryRequirement[];
  theoryQuestions: TheoryQuestion[];
  resolution: {
    headline: string;
    paragraphs: string[];
    proofPoints: { evidenceId: string; text: string }[];
    aftermath: string;
  };
}
