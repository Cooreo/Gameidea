import { caseFile } from '../game/case';
import type { GameState } from '../game/engine';
import { getClue, theoryReadiness } from '../game/engine';
import type { TabId } from './CaseFolder';
import {
  ArrowLeftIcon,
  BoardIcon,
  DocumentIcon,
  PersonIcon,
  PhotoIcon,
  ScalesIcon,
  SpeechIcon,
  CheckIcon,
} from './Icons';

interface Props {
  state: GameState;
  found: number;
  total: number;
  onOpenTab: (tab: TabId) => void;
  onOpenClue: (clueId: string) => void;
  onOpenPhoto: (photoId: string) => void;
  onDismissOnboarding: () => void;
  onOpenResolution: () => void;
}

export default function Briefing({
  state,
  found,
  total,
  onOpenTab,
  onOpenClue,
  onOpenPhoto,
  onDismissOnboarding,
  onOpenResolution,
}: Props) {
  const observationsFound = state.discoveredHotspots.length;
  const observationsTotal = caseFile.photos.reduce(
    (sum, photo) => sum + photo.hotspots.length,
    0,
  );
  const interviewsStarted = Object.values(state.interviews).filter((i) => i.met).length;
  const contradictions = Object.values(state.interviews).reduce(
    (count, interview) =>
      count + interview.transcript.filter((entry) => entry.contradiction).length,
    0,
  );
  const readiness = theoryReadiness(state);
  const latest = [...state.discoveredClueIds]
    .reverse()
    .map((id) => getClue(id))
    .filter((clue): clue is NonNullable<typeof clue> => Boolean(clue))
    .slice(0, 4);

  return (
    <div className="briefing view">
      <header className="view__head">
        <div>
          <p className="kicker">Case overview</p>
          <h1 className="view__title display">A wall, a crate, a story</h1>
          <p className="view__sub">
            {caseFile.dateLabel} · {caseFile.location}. Reported at 21:18.
          </p>
        </div>
        <div className="briefing__head-chips">
          <span className="chip chip--amber">{caseFile.caseNumber}</span>
          <span className="chip">Theft reported</span>
          <span className="chip">Insured €1.4m</span>
        </div>
      </header>

      {state.theory.solved && (
        <button className="briefing__solved" onClick={onOpenResolution}>
          <span className="stamp stamp--dark">CASE CLOSED</span>
          <span>
            <strong>The file is complete.</strong> Read how the pieces fit together.
          </span>
          <ArrowLeftIcon className="briefing__solved-arrow" />
        </button>
      )}

      {!state.onboardingDismissed && (
        <aside className="onboard" aria-label="Getting started">
          <div className="onboard__mark" aria-hidden="true">
            <PhotoIcon />
          </div>
          <div className="onboard__body">
            <p className="onboard__title">Start with the photographs.</p>
            <p className="onboard__text">
              Open an image and click what looks wrong. Nothing is highlighted for
              you. If you get stuck, each photograph allows two inspections — hints
              that cost you nothing but pride.
            </p>
          </div>
          <div className="onboard__actions">
            <button
              className="btn btn--primary btn--small"
              onClick={() => onOpenTab('photos')}
            >
              Open photographs
            </button>
            <button className="btn btn--bare btn--small" onClick={onDismissOnboarding}>
              Got it
            </button>
          </div>
        </aside>
      )}

      <div className="briefing__grid">
        <article className="memo paper">
          <div className="memo__head">
            <div>
              <p className="memo__unit">METROPOLITAN ART &amp; PROPERTY UNIT</p>
              <h2 className="memo__subject">Incident memorandum</h2>
            </div>
            <div className="memo__meta mono">
              <span>{caseFile.caseNumber}</span>
              <span>14 / 11</span>
            </div>
          </div>

          <div className="memo__rule" />

          {caseFile.briefing.map((paragraph, index) => (
            <p key={index} className={`memo__para ${index === 0 ? 'memo__para--lead' : ''}`}>
              {paragraph}
            </p>
          ))}

          <div className="memo__sign">
            <p className="memo__sign-name hand">{caseFile.supervisor.name}</p>
            <p className="memo__sign-role">{caseFile.supervisor.role}</p>
          </div>
          <span className="memo__stamp stamp">Consultant attached</span>
          <div className="memo__clip" aria-hidden="true" />
        </article>

        <div className="briefing__side">
          <div className="file-cards">
            <button className="file-card" onClick={() => onOpenTab('photos')}>
              <span className="file-card__icon">
                <PhotoIcon />
              </span>
              <span className="file-card__body">
                <span className="file-card__title">Photographs</span>
                <span className="file-card__meta">
                  {observationsFound} of {observationsTotal} details noticed
                </span>
              </span>
              <span className="file-card__badge" aria-hidden="true">
                {caseFile.photos.length}
              </span>
            </button>

            <button className="file-card" onClick={() => onOpenTab('documents')}>
              <span className="file-card__icon">
                <DocumentIcon />
              </span>
              <span className="file-card__body">
                <span className="file-card__title">Documents</span>
                <span className="file-card__meta">
                  {state.documentsOpened.length} of {caseFile.documents.length} read
                </span>
              </span>
              <span className="file-card__badge" aria-hidden="true">
                {caseFile.documents.length}
              </span>
            </button>

            <button className="file-card" onClick={() => onOpenTab('people')}>
              <span className="file-card__icon">
                <PersonIcon />
              </span>
              <span className="file-card__body">
                <span className="file-card__title">People</span>
                <span className="file-card__meta">
                  {interviewsStarted} of {caseFile.people.length} interviewed
                </span>
              </span>
            </button>

            <button className="file-card" onClick={() => onOpenTab('interviews')}>
              <span className="file-card__icon">
                <SpeechIcon />
              </span>
              <span className="file-card__body">
                <span className="file-card__title">Interviews</span>
                <span className="file-card__meta">
                  {contradictions} contradiction{contradictions === 1 ? '' : 's'} found
                </span>
              </span>
              {contradictions > 0 && <span className="badge">{contradictions}</span>}
            </button>

            <button className="file-card" onClick={() => onOpenTab('board')}>
              <span className="file-card__icon">
                <BoardIcon />
              </span>
              <span className="file-card__body">
                <span className="file-card__title">Deduction board</span>
                <span className="file-card__meta">
                  {state.board.nodes.length} cards pinned ·{' '}
                  {state.board.insights.length} conclusion
                  {state.board.insights.length === 1 ? '' : 's'}
                </span>
              </span>
            </button>
          </div>

          <div className="theory-card">
            <div className="theory-card__head">
              <ScalesIcon />
              <div>
                <p className="theory-card__title">Your theory</p>
                <p className="theory-card__sub">
                  {found} of {total} items in the file
                </p>
              </div>
            </div>
            <ul className="theory-card__list">
              {caseFile.theoryRequirements.map((requirement) => {
                const done = readiness.satisfied.includes(requirement.insightId);
                return (
                  <li key={requirement.insightId} className={done ? 'is-done' : ''}>
                    <span className="theory-card__check" aria-hidden="true">
                      {done ? <CheckIcon /> : null}
                    </span>
                    {requirement.label}
                  </li>
                );
              })}
            </ul>
            <button
              className={`btn ${readiness.ready ? 'btn--primary' : ''} btn--small`}
              onClick={() => onOpenTab(readiness.ready ? 'theory' : 'board')}
            >
              {readiness.ready ? 'Set out your theory' : 'Open the deduction board'}
            </button>
          </div>

          {latest.length > 0 && (
            <div className="latest">
              <p className="latest__label">Latest in the file</p>
              <div className="latest__list">
                {latest.map((clue) => (
                  <button
                    key={clue.id}
                    className={`latest__item latest__item--${clue.kind}`}
                    onClick={() =>
                      clue.photoId ? onOpenPhoto(clue.photoId) : onOpenClue(clue.id)
                    }
                  >
                    <span className="latest__kind">
                      {clue.kind === 'observation'
                        ? 'Detail'
                        : clue.kind === 'document'
                          ? 'Document'
                          : clue.kind === 'statement'
                            ? 'Statement'
                            : 'Conclusion'}
                    </span>
                    <span className="latest__title">{clue.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="briefing__foot">
        <p>
          <span className="eyebrow">Remember</span> The file distinguishes what you
          have found from what you have concluded. Photographs and documents are
          evidence. Cards with a gold seal are your own deductions.
        </p>
      </footer>
    </div>
  );
}
