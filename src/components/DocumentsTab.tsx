import { caseFile } from '../game/case';
import type { GameState } from '../game/engine';
import { getClue } from '../game/engine';
import { CheckIcon, DocumentIcon } from './Icons';

interface Props {
  state: GameState;
  onOpenDocument: (documentId: string) => void;
}

export default function DocumentsTab({ state, onOpenDocument }: Props) {
  return (
    <div className="view documents">
      <header className="view__head">
        <div>
          <p className="kicker">Paper trail</p>
          <h1 className="view__title display">Documents</h1>
          <p className="view__sub">
            {state.documentsOpened.length} of {caseFile.documents.length} read.
            Dockets, receipts and endorsements — the parts of the evening nobody
            remembers writing down.
          </p>
        </div>
        <div className="documents__legend">
          <span className="chip">
            <DocumentIcon /> filed under 14/11-MG-07
          </span>
        </div>
      </header>

      <div className="doc-grid">
        {caseFile.documents.map((document, index) => {
          const clue = getClue(document.clueId);
          const read = state.documentsOpened.includes(document.id);
          return (
            <button
              key={document.id}
              className={`doc-card ${read ? 'is-read' : ''}`}
              onClick={() => onOpenDocument(document.id)}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="doc-card__paper">
                <span className="doc-card__stamp mono">{document.stampDate}</span>
                <span className="doc-card__id mono">{document.documentId}</span>
                <span className="doc-card__seal" aria-hidden="true">
                  {read ? <CheckIcon /> : <DocumentIcon />}
                </span>
                <span className="doc-card__lines" aria-hidden="true" />
                <span className="doc-card__title display">{document.title}</span>
                <span className="doc-card__sub">{document.subtitle}</span>
              </div>
              <div className="doc-card__meta">
                <span className="eyebrow">
                  {read ? 'Read' : 'Not yet read'} · Exhibit {String.fromCharCode(65 + index)}
                </span>
                <p>{clue?.summary}</p>
              </div>
            </button>
          );
        })}
      </div>

      <footer className="photos__note">
        <p>
          <strong>Read the small print.</strong> A signature, a timestamp and a
          declared value are all somebody’s decision, written down. Decide whether
          you believe them.
        </p>
      </footer>
    </div>
  );
}
