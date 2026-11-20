import { caseFile } from '../game/case';
import type { GameState } from '../game/engine';
import { elapsedLabel, getClue } from '../game/engine';
import { CloseIcon } from './Icons';

interface Props {
  state: GameState;
  onClose: () => void;
  onOpenClue: (clueId: string) => void;
  onBackToMenu: () => void;
}

export default function Resolution({ state, onClose, onOpenClue, onBackToMenu }: Props) {
  const contradictions = Object.values(state.interviews).reduce(
    (count, interview) =>
      count + interview.transcript.filter((entry) => entry.contradiction).length,
    0,
  );
  const evidenceCount = state.discoveredClueIds.filter((id) => {
    const kind = getClue(id)?.kind;
    return kind && kind !== 'insight';
  }).length;

  return (
    <div
      className="overlay overlay--resolution"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resolution-title"
    >
      <div className="resolution">
        <button className="overlay__close resolution__close" onClick={onClose} aria-label="Close resolution">
          <CloseIcon />
        </button>

        <article className="resolution__paper paper">
          <header className="resolution__top mono">
            <span>METROPOLITAN ART &amp; PROPERTY UNIT</span>
            <span>FINAL REPORT · 14/11-MG-07</span>
            <span>CONFIDENTIAL</span>
          </header>

          <div className="resolution__head">
            <p className="kicker">Case closed</p>
            <h1 className="resolution__title display" id="resolution-title">
              {caseFile.resolution.headline}
            </h1>
            <p className="resolution__standfirst">
              The Meridian Gallery, 14 November. What the cameras, the paperwork and
              the people in the room could not agree on.
            </p>
            <span className="resolution__stamp stamp">CASE CLOSED</span>
          </div>

          <div className="resolution__body">
            {caseFile.resolution.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'is-lead' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          <section className="resolution__proof">
            <h2 className="resolution__section-title">How the file proves it</h2>
            <ol>
              {caseFile.resolution.proofPoints.map((point, index) => {
                const clue = getClue(point.evidenceId);
                if (!clue) return null;
                return (
                  <li key={point.evidenceId}>
                    <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                    <p>{point.text}</p>
                    <button onClick={() => onOpenClue(clue.id)}>{clue.title}</button>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="resolution__aftermath">
            <h2 className="resolution__section-title">The morning after</h2>
            <p>{caseFile.resolution.aftermath}</p>
          </section>

          <section className="resolution__verdict">
            {caseFile.theoryQuestions.map((question) => (
              <div key={question.id}>
                <p className="eyebrow">{question.prompt}</p>
                <p className="resolution__answer">
                  {question.options.find(
                    (option) => option.id === (state.theory.answers ?? {})[question.id],
                  )?.label ?? '—'}
                </p>
              </div>
            ))}
          </section>

          <footer className="resolution__foot">
            <div className="resolution__stats">
              <div>
                <span className="mono">{evidenceCount}</span>
                <p>items filed</p>
              </div>
              <div>
                <span className="mono">{contradictions}</span>
                <p>contradictions</p>
              </div>
              <div>
                <span className="mono">{state.totalHints}</span>
                <p>inspections used</p>
              </div>
              <div>
                <span className="mono">{state.theory.attempts}</span>
                <p>theories presented</p>
              </div>
              <div>
                <span className="mono">{elapsedLabel(state)}</span>
                <p>on the file</p>
              </div>
            </div>
            <div className="resolution__sign">
              <p className="hand">{caseFile.supervisor.name}</p>
              <p>{caseFile.supervisor.role}</p>
            </div>
          </footer>
        </article>

        <div className="resolution__actions">
          <button className="btn btn--primary" onClick={onClose}>
            Return to the file
          </button>
          <button className="btn" onClick={onBackToMenu}>
            Main menu
          </button>
        </div>
      </div>
    </div>
  );
}
