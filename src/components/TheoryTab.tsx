import { useMemo, useState } from 'react';
import { caseFile } from '../game/case';
import type { GameState, SubmitTheoryResult } from '../game/engine';
import { getClue, theoryReadiness } from '../game/engine';
import {
  ArrowLeftIcon,
  CheckIcon,
  CloseIcon,
  ScalesIcon,
} from './Icons';

interface Props {
  state: GameState;
  onSubmit: (answers: Record<string, string>) => SubmitTheoryResult | null;
  onOpenClue: (clueId: string) => void;
  onOpenBoard: () => void;
  onOpenResolution: () => void;
}

export default function TheoryTab({
  state,
  onSubmit,
  onOpenClue,
  onOpenBoard,
  onOpenResolution,
}: Props) {
  const readiness = theoryReadiness(state);
  const [answers, setAnswers] = useState<Record<string, string>>(
    state.theory.answers ?? {},
  );
  const [nudged, setNudged] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<SubmitTheoryResult | null>(null);

  const answeredCount = caseFile.theoryQuestions.filter((question) => answers[question.id]).length;
  const allAnswered = answeredCount === caseFile.theoryQuestions.length;
  const lastResults = state.theory.lastResult?.results ?? [];
  const lastAnswers = state.theory.lastResult?.answers ?? {};

  const correctCount = useMemo(
    () =>
      caseFile.theoryQuestions.filter((question) => {
        const result = lastResults.find((entry) => entry.questionId === question.id);
        return result?.correct && lastAnswers[question.id] === answers[question.id];
      }).length,
    [answers, lastAnswers, lastResults],
  );

  const select = (questionId: string, optionId: string) => {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
    setFeedback(null);
  };

  const submit = () => {
    if (!allAnswered || !readiness.ready) return;
    const result = onSubmit(answers);
    if (result) setFeedback(result);
  };

  const solved = state.theory.solved;

  return (
    <div className="view theory">
      <header className="view__head">
        <div>
          <p className="kicker">Closing statement</p>
          <h1 className="view__title display">Your theory</h1>
          <p className="view__sub">
            Answer five questions. The file will judge whether you can support them —
            not whether you guessed them.
          </p>
        </div>
        <div className="theory__head-actions">
          {solved && (
            <button className="btn btn--primary btn--small" onClick={onOpenResolution}>
              <ArrowLeftIcon /> Read the resolution
            </button>
          )}
          <span className="chip">attempt {state.theory.attempts}</span>
        </div>
      </header>

      {solved && (
        <button className="theory__solved" onClick={onOpenResolution}>
          <span className="stamp stamp--dark">CASE CLOSED</span>
          <span>
            <strong>The Last Light was recovered.</strong> Your theory holds. Read the
            full account.
          </span>
        </button>
      )}

      <section className={`theory__gate ${readiness.ready ? 'is-ready' : ''}`}>
        <div className="theory__gate-head">
          <div>
            <p className="eyebrow">What the file needs</p>
            <p className="theory__gate-sub">
              {readiness.ready
                ? 'Three key deductions are on the board. You can put a theory now.'
                : 'Three deductions are still missing. A theory without them is a guess.'}
            </p>
          </div>
          {!readiness.ready && (
            <button className="btn btn--small" onClick={onOpenBoard}>
              Open the board
            </button>
          )}
        </div>
        <ul className="theory__requirements">
          {caseFile.theoryRequirements.map((requirement) => {
            const done = readiness.satisfied.includes(requirement.insightId);
            const clue = getClue(requirement.insightId);
            return (
              <li key={requirement.insightId} className={done ? 'is-done' : ''}>
                <span className="theory__req-mark">{done ? <CheckIcon /> : <span />}</span>
                <span className="theory__req-body">
                  <strong>{requirement.label}</strong>
                  <span>{done ? clue?.title : 'Not yet established'}</span>
                </span>
                {done && clue && (
                  <button className="btn btn--bare btn--small" onClick={() => onOpenClue(clue.id)}>
                    read
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <ol className="questions">
        {caseFile.theoryQuestions.map((question, index) => {
          const selected = answers[question.id];
          const result = lastResults.find((entry) => entry.questionId === question.id);
          const showResult = Boolean(result) && lastAnswers[question.id] === selected;
          const tooMany = state.theory.attempts >= 2;
          const showHint = nudged[question.id] || (showResult && !result?.correct) || tooMany;
          return (
            <li
              className={`question ${showResult ? (result?.correct ? 'is-correct' : 'is-wrong') : ''}`}
              key={question.id}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="question__head">
                <span className="question__number mono">0{index + 1}</span>
                <h2 className="question__prompt display">{question.prompt}</h2>
                {showResult && (
                  <span className={`question__verdict ${result?.correct ? 'ok' : 'bad'}`}>
                    {result?.correct ? <CheckIcon /> : <CloseIcon />}
                    {result?.correct ? 'holds' : 'does not hold'}
                  </span>
                )}
              </div>

              <div className="question__options" role="radiogroup" aria-label={question.prompt}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      className={`option ${isSelected ? 'is-selected' : ''}`}
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => select(question.id, option.id)}
                    >
                      <span className="option__letter mono">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span>{option.label}</span>
                      <span className="option__dot" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              <div className="question__foot">
                <button
                  className="question__nudge"
                  onClick={() => setNudged((current) => ({ ...current, [question.id]: !current[question.id] }))}
                >
                  {showHint ? 'Hide nudge' : 'Need a nudge?'}
                </button>
                {showHint && <p className="question__hint">{question.hint}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="theory__submit">
        <div>
          <p className="theory__submit-title">
            {solved
              ? 'Your theory is on record.'
              : allAnswered
                ? 'Ready to be tested.'
                : `${answeredCount} of ${caseFile.theoryQuestions.length} answered`}
          </p>
          <p className="theory__submit-sub">
            {readiness.ready
              ? 'A wrong answer will be explained, not punished. You can try again.'
              : 'The sergeant will not accept a theory until the key deductions are on the board.'}
          </p>
        </div>
        <button
          className="btn btn--primary theory__submit-btn"
          disabled={!allAnswered || !readiness.ready || solved}
          onClick={submit}
        >
          <ScalesIcon />
          {solved ? 'Case closed' : 'Present your theory'}
        </button>
      </div>

      {feedback && !feedback.solved && !feedback.blocked && (
        <div className={`theory__feedback ${correctCount >= 4 ? 'is-close' : ''}`} role="status">
          <div>
            <p className="kicker">The theory does not hold</p>
            <p className="theory__feedback-title">
              {correctCount} of {caseFile.theoryQuestions.length} parts hold up.
            </p>
            <p>
              {correctCount >= 4
                ? 'You are one answer away. The detail that settles it is in a photograph you have already examined.'
                : 'Read the questions marked “does not hold” again — the nudge under each one points at where to look.'}
            </p>
          </div>
          <div className="theory__feedback-actions">
            <button className="btn btn--small" onClick={onOpenBoard}>
              Review the board
            </button>
            <button className="btn btn--small" onClick={submit}>
              Try again
            </button>
          </div>
        </div>
      )}

      {state.theory.attempts === 0 && !solved && (
        <p className="theory__footnote">
          Evidence is not a vote. Five confident answers are worth nothing without
          the two or three details underneath them.
        </p>
      )}
    </div>
  );
}
