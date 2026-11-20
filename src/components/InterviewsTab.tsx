import { useEffect, useMemo, useRef, useState } from 'react';
import { caseFile } from '../game/case';
import type { GameState, PresentationOutcome } from '../game/engine';
import {
  availableTopics,
  getClue,
  getPerson,
} from '../game/engine';
import type { Clue, Line, Person } from '../game/types';
import Portrait from './Portrait';
import {
  CheckIcon,
  CloseIcon,
  DocumentIcon,
  PinIcon,
  SearchIcon,
  SpeechIcon,
} from './Icons';

interface Props {
  state: GameState;
  selectedPersonId: string;
  onSelectPerson: (personId: string) => void;
  onStart: (personId: string) => void;
  onAsk: (personId: string, topicId: string) => void;
  onPresent: (personId: string, evidenceId: string) => PresentationOutcome | null;
  onOpenClue: (clueId: string) => void;
}

type EvidenceFilter = 'all' | 'observation' | 'document' | 'statement' | 'insight';

function lineClass(line: Line) {
  return `line line--${line.kind}`;
}

function speakerName(person: Person) {
  return person.name.split(' ')[0];
}

export default function InterviewsTab({
  state,
  selectedPersonId,
  onSelectPerson,
  onStart,
  onAsk,
  onPresent,
  onOpenClue,
}: Props) {
  const person = getPerson(selectedPersonId) ?? caseFile.people[0];
  const interview = state.interviews[person.id];
  const transcript = interview?.transcript ?? [];
  const topics = availableTopics(state, person);
  const asked = interview?.askedTopicIds ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [presentOpen, setPresentOpen] = useState(false);
  const [filter, setFilter] = useState<EvidenceFilter>('all');
  const [presentMessage, setPresentMessage] = useState<string | null>(null);
  const [contradiction, setContradiction] = useState<{ title: string; statementId?: string } | null>(
    null,
  );

  useEffect(() => {
    if (!interview?.met) onStart(person.id);
    // Only when switching people.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person.id]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [transcript.length, person.id]);

  useEffect(() => {
    if (!contradiction) return;
    const timeout = window.setTimeout(() => setContradiction(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [contradiction]);

  useEffect(() => {
    if (!presentOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPresentOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [presentOpen]);

  const contradictions = transcript.filter((entry) => entry.contradiction).length;

  const evidence = useMemo(
    () =>
      state.discoveredClueIds
        .map((id) => getClue(id))
        .filter((clue): clue is Clue => Boolean(clue))
        .filter((clue) => filter === 'all' || clue.kind === filter)
        .sort((a, b) => {
          const order = { observation: 0, document: 1, statement: 2, insight: 3 };
          return order[a.kind] - order[b.kind];
        }),
    [state.discoveredClueIds, filter],
  );

  const handlePresent = (clueId: string) => {
    const outcome = onPresent(person.id, clueId);
    setPresentOpen(false);
    const clue = getClue(clueId);
    if (!outcome) return;
    if (outcome.contradiction) {
      const statement = outcome.statementId ? getClue(outcome.statementId) : undefined;
      setContradiction({ title: statement?.title ?? clue?.title ?? 'A statement changes', statementId: outcome.statementId });
    } else if (outcome.matched) {
      setPresentMessage(`${person.name} considers it. ${clue ? `“${clue.title}” ` : ''}does not get you what you wanted.`);
      window.setTimeout(() => setPresentMessage(null), 4200);
    }
  };

  return (
    <div className="view interviews">
      <header className="view__head">
        <div>
          <p className="kicker">Statements on record</p>
          <h1 className="view__title display">Interviews</h1>
          <p className="view__sub">
            Ask what you like. When you have something that contradicts an account,
            put it on the table.
          </p>
        </div>
        <span className="chip">
          <SpeechIcon /> {contradictions} contradiction{contradictions === 1 ? '' : 's'} in this room
        </span>
      </header>

      <div className="interview">
        <aside className="interview__people" aria-label="Witnesses">
          {caseFile.people.map((candidate) => {
            const current = state.interviews[candidate.id];
            const active = candidate.id === person.id;
            const count =
              current?.transcript.filter((entry) => entry.contradiction).length ?? 0;
            return (
              <button
                key={candidate.id}
                className={`witness ${active ? 'is-active' : ''}`}
                onClick={() => onSelectPerson(candidate.id)}
                aria-pressed={active}
              >
                <span className="witness__portrait">
                  <Portrait portrait={candidate.portrait} />
                </span>
                <span className="witness__body">
                  <span className="witness__name">{candidate.name}</span>
                  <span className="witness__role">{candidate.role}</span>
                </span>
                {count > 0 && <span className="badge">{count}</span>}
                {current?.met && <span className="witness__dot" aria-hidden="true" />}
              </button>
            );
          })}
          <p className="interview__people-note">
            Contradictions are saved automatically as statement cards in the case
            file.
          </p>
        </aside>

        <section className="interview__room" aria-label={`Interview with ${person.name}`}>
          <header className="interview__room-head">
            <div className="interview__room-person">
              <span className="interview__room-portrait">
                <Portrait portrait={person.portrait} />
              </span>
              <div>
                <p className="kicker">In the room · {person.role}</p>
                <h2 className="interview__room-name display">{person.name}</h2>
                <p className="interview__room-alibi">{person.alibi}</p>
              </div>
            </div>
            <button
              className="btn btn--primary btn--small"
              onClick={() => setPresentOpen(true)}
            >
              <SearchIcon />
              Present evidence
            </button>
          </header>

          <div className="transcript" ref={scrollRef}>
            {transcript.length === 0 && (
              <p className="transcript__empty">
                She has not said anything yet. Choose a question below.
              </p>
            )}

            {transcript.map((entry) => {
              const topic = person.topics.find((item) => item.id === entry.topicId);
              const presented = entry.evidenceId ? getClue(entry.evidenceId) : undefined;
              return (
                <div key={entry.id} className={`entry ${entry.contradiction ? 'entry--contradiction' : ''}`}>
                  {topic && (
                    <p className="entry__prompt">
                      <span className="entry__prompt-you">You</span>
                      {topic.label}
                    </p>
                  )}
                  {entry.kind === 'presentation' && (
                    <div className="entry__present">
                      <span className="entry__present-label">You put it on the table</span>
                      {presented ? (
                        <button className="entry__present-card" onClick={() => onOpenClue(presented.id)}>
                          <span className={`kind-mark kind-mark--${presented.kind}`} />
                          <span>{presented.title}</span>
                        </button>
                      ) : (
                        <span>Evidence</span>
                      )}
                    </div>
                  )}

                  {entry.lines.map((line, index) => (
                    <div key={index} className={lineClass(line)}>
                      {line.kind === 'say' && (
                        <span className="line__who">{speakerName(person)}</span>
                      )}
                      {line.kind === 'you' && <span className="line__who">You</span>}
                      <p>{line.text}</p>
                      {line.statementId && state.discoveredClueIds.includes(line.statementId) && (
                        <button
                          className="line__statement"
                          onClick={() => onOpenClue(line.statementId!)}
                        >
                          <PinIcon /> Statement card saved
                        </button>
                      )}
                    </div>
                  ))}

                  {entry.contradiction && (
                    <div className="entry__contradiction">
                      <span className="stamp stamp--dark">Contradiction</span>
                      <p>
                        A version of the evening just stopped working. New question
                        unlocked, statement filed.
                      </p>
                      {presentMessage && <p className="entry__muted">{presentMessage}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {contradiction && (
            <div className="contradiction-flash" role="status">
              <span className="contradiction-flash__stamp">CONTRADICTION</span>
              <p>{contradiction.title}</p>
              {contradiction.statementId && (
                <button
                  className="btn btn--paper btn--small"
                  onClick={() => onOpenClue(contradiction.statementId!)}
                >
                  Open statement
                </button>
              )}
            </div>
          )}

          <div className="interview__composer">
            <div className="interview__composer-head">
              <p className="eyebrow">Ask about</p>
              <span className="interview__composer-count">
                {asked.length}/{person.topics.length} asked
              </span>
            </div>
            <div className="topics">
              {topics.map((topic) => {
                const isAsked = asked.includes(topic.id);
                const isNew =
                  interview?.unlockedTopicIds.includes(topic.id) && !isAsked;
                return (
                  <button
                    key={topic.id}
                    className={`topic ${isAsked ? 'is-asked' : ''} ${isNew ? 'is-new' : ''}`}
                    disabled={isAsked}
                    onClick={() => onAsk(person.id, topic.id)}
                  >
                    <span className="topic__mark">{isAsked ? <CheckIcon /> : <SpeechIcon />}</span>
                    <span>{topic.label}</span>
                    {isNew && <span className="topic__new">new</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {presentOpen && (
        <div className="overlay overlay--present" role="dialog" aria-modal="true" aria-labelledby="present-title">
          <div className="overlay__panel present">
            <button
              className="overlay__close"
              onClick={() => setPresentOpen(false)}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            <div className="sheet">
              <p className="sheet__kicker">Present evidence</p>
              <h2 className="sheet__title" id="present-title">
                Put it in front of {person.name.split(' ')[0]}.
              </h2>
              <p className="sheet__body" style={{ marginTop: '0.5rem' }}>
                The right card makes a story change. The wrong one wastes everyone’s
                patience.
              </p>

              <div className="present__filters" role="group" aria-label="Filter evidence">
                {(
                  [
                    ['all', 'All'],
                    ['observation', 'Details'],
                    ['document', 'Documents'],
                    ['statement', 'Statements'],
                    ['insight', 'Conclusions'],
                  ] as [EvidenceFilter, string][]
                ).map(([value, label]) => (
                  <button
                    key={value}
                    className={`present__filter ${filter === value ? 'is-active' : ''}`}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="present__list">
                {evidence.length === 0 && (
                  <p className="present__empty">
                    Nothing filed yet. Close the folder, find something out there,
                    then come back.
                  </p>
                )}
                {evidence.map((clue) => {
                  const wasPresented =
                    state.interviews[person.id]?.presentedEvidenceIds.includes(clue.id) ?? false;
                  return (
                    <button
                      key={clue.id}
                      className="present__item"
                      onClick={() => handlePresent(clue.id)}
                    >
                      <span className={`kind-mark kind-mark--${clue.kind}`} />
                      <span className="present__item-body">
                        <span className="present__item-title">{clue.title}</span>
                        <span className="present__item-summary">{clue.summary}</span>
                      </span>
                      {wasPresented && <span className="present__seen">shown</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {presentMessage && !contradiction && (
        <div className="interview__toast" role="status">
          {presentMessage}
        </div>
      )}

      <span className="visually-hidden">
        <DocumentIcon />
      </span>
    </div>
  );
}
