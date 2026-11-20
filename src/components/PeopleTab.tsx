import { caseFile } from '../game/case';
import type { GameState } from '../game/engine';
import { SpeechIcon } from './Icons';
import Portrait from './Portrait';

interface Props {
  state: GameState;
  onInterview: (personId: string) => void;
}

export default function PeopleTab({ state, onInterview }: Props) {
  return (
    <div className="view people">
      <header className="view__head">
        <div>
          <p className="kicker">Persons of interest</p>
          <h1 className="view__title display">People</h1>
          <p className="view__sub">
            Three people stayed behind after the guests left. One of them is
            telling you a story they can live with.
          </p>
        </div>
        <span className="chip">{caseFile.people.length} statements on record</span>
      </header>

      <div className="people-grid">
        {caseFile.people.map((person, index) => {
          const interview = state.interviews[person.id];
          const met = Boolean(interview?.met);
          const contradictions =
            interview?.transcript.filter((entry) => entry.contradiction).length ?? 0;
          const statements = caseFile.statements.filter(
            (statement) =>
              statement.personId === person.id &&
              state.discoveredClueIds.includes(statement.id),
          ).length;

          return (
            <article
              className="person-card"
              key={person.id}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="person-card__portrait">
                <Portrait portrait={person.portrait} />
                <span className={`person-card__status ${met ? 'is-met' : ''}`}>
                  {met ? 'interviewed' : 'not yet spoken to'}
                </span>
                {contradictions > 0 && (
                  <span className="person-card__contradictions stamp stamp--dark">
                    {contradictions} contradiction{contradictions === 1 ? '' : 's'}
                  </span>
                )}
              </div>

              <div className="person-card__body">
                <p className="kicker">0{index + 1} · {person.role}</p>
                <h2 className="person-card__name display">{person.name}</h2>
                <p className="person-card__short">{person.short}</p>

                <dl className="person-card__facts">
                  <div>
                    <dt>Age</dt>
                    <dd>{person.age}</dd>
                  </div>
                  <div>
                    <dt>Statements</dt>
                    <dd>{statements}</dd>
                  </div>
                  <div>
                    <dt>Contradictions</dt>
                    <dd>{contradictions}</dd>
                  </div>
                </dl>

                <div className="person-card__alibi">
                  <span className="eyebrow">Their account</span>
                  <p>{person.alibi}</p>
                </div>

                <details className="person-card__bio">
                  <summary>Background</summary>
                  <p>{person.bio}</p>
                </details>

                <button
                  className="btn btn--small person-card__cta"
                  onClick={() => onInterview(person.id)}
                >
                  <SpeechIcon />
                  {met ? 'Continue the interview' : 'Question them'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="photos__note">
        <p>
          <strong>Present evidence, don’t guess.</strong> In an interview you can
          put a card on the table. The right card makes a story change; the wrong
          one makes someone patient with you.
        </p>
      </footer>
    </div>
  );
}
