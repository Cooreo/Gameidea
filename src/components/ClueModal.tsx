import type { Clue } from '../game/types';
import type { GameState } from '../game/engine';
import { getPerson } from '../game/engine';
import {
  CloseIcon,
  DocumentIcon,
  PinIcon,
  SpeechIcon,
  CheckIcon,
} from './Icons';

interface Props {
  clue: Clue;
  state: GameState;
  onClose: () => void;
  onPin: (clueId: string) => void;
  onOpenPhoto: (photoId: string) => void;
  onOpenDocument: (documentId: string) => void;
}

const kindNames: Record<Clue['kind'], string> = {
  observation: 'Observation',
  document: 'Document',
  statement: 'Statement',
  insight: 'Conclusion',
};

export default function ClueModal({
  clue,
  state,
  onClose,
  onPin,
  onOpenPhoto,
  onOpenDocument,
}: Props) {
  const pinned = state.board.nodes.some((node) => node.clueId === clue.id);
  const person = clue.personId ? getPerson(clue.personId) : undefined;
  const isInsight = clue.kind === 'insight';

  return (
    <div className="overlay overlay--clue" role="dialog" aria-modal="true" aria-labelledby="clue-title">
      <div className={`clue-modal paper clue-modal--${clue.kind}`}>
        <button className="clue-modal__close" onClick={onClose} aria-label="Close card">
          <CloseIcon />
        </button>

        <div className="clue-modal__band">
          <span className={`kind-mark kind-mark--${clue.kind}`} />
          <span className="clue-modal__kind">
            {isInsight ? 'Conclusion — drawn by you' : `${kindNames[clue.kind]} — in the file`}
          </span>
          <span className="clue-modal__source mono">{clue.source}</span>
        </div>

        <h2 className="clue-modal__title display" id="clue-title">
          {clue.title}
        </h2>

        {clue.kind === 'statement' && clue.quote && (
          <blockquote className="clue-modal__quote">
            <p>“{clue.quote}”</p>
            {person && <cite>— {person.name}, {person.role}</cite>}
          </blockquote>
        )}

        <p className="clue-modal__summary">{clue.summary}</p>
        <p className="clue-modal__detail">{clue.detail}</p>

        {isInsight && (
          <p className="clue-modal__seal">
            <span className="stamp">Deduction</span>
            <span>
              This is not evidence. It is what you concluded from the evidence — and
              it is what the theory rests on.
            </span>
          </p>
        )}

        <div className="clue-modal__foot">
          {clue.photoId && (
            <button className="btn btn--paper btn--small" onClick={() => onOpenPhoto(clue.photoId!)}>
              <DocumentIcon /> View photograph
            </button>
          )}
          {clue.documentId && (
            <button className="btn btn--paper btn--small" onClick={() => onOpenDocument(clue.documentId!)}>
              <DocumentIcon /> Open document
            </button>
          )}
          {clue.kind === 'statement' && person && (
            <span className="clue-modal__person mono">
              <SpeechIcon /> {person.name}
            </span>
          )}
          <span className="spacer" />
          <button
            className="btn btn--small"
            onClick={() => onPin(clue.id)}
            disabled={pinned}
          >
            {pinned ? <CheckIcon /> : <PinIcon />}
            {pinned ? 'On the board' : 'Pin to board'}
          </button>
        </div>
      </div>
    </div>
  );
}
