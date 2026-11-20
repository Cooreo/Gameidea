import { useMemo, useRef, useState } from 'react';
import { caseFile } from '../game/case';
import type { BoardLink, GameState, LinkResult } from '../game/engine';
import {
  boardWhispers,
  getClue,
  isOnBoard,
  theoryReadiness,
} from '../game/engine';
import type { Clue } from '../game/types';
import {
  CheckIcon,
  CloseIcon,
  LinkIcon,
  PinIcon,
  ScalesIcon,
  TrashIcon,
} from './Icons';

interface Props {
  state: GameState;
  onAddNode: (clueId: string, x: number, y: number) => void;
  onMoveNode: (clueId: string, x: number, y: number) => void;
  onRemoveNode: (clueId: string) => void;
  onLink: (a: string, b: string, label: 'supports' | 'contradicts') => LinkResult | null;
  onRemoveLink: (linkId: string) => void;
  onOpenClue: (clueId: string) => void;
  onOpenTheory: () => void;
}

const NODE_WIDTH = 224;
const NODE_HEIGHT = 136;
const CANVAS_WIDTH = 2400;
const CANVAS_HEIGHT = 1500;

const kindLabel: Record<Clue['kind'], string> = {
  observation: 'Detail',
  document: 'Document',
  statement: 'Statement',
  insight: 'Conclusion',
};

const kindOrder: Clue['kind'][] = ['observation', 'document', 'statement', 'insight'];

interface DragState {
  clueId: string;
  pointerX: number;
  pointerY: number;
  originX: number;
  originY: number;
  x: number;
  y: number;
  moved: boolean;
}

export default function BoardTab({
  state,
  onAddNode,
  onMoveNode,
  onRemoveNode,
  onLink,
  onRemoveLink,
  onOpenClue,
  onOpenTheory,
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const [pending, setPending] = useState<{ a: string; b: string } | null>(null);
  const [validation, setValidation] = useState<LinkResult['validation'] | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [whisperDismissed, setWhisperDismissed] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState<'all' | Clue['kind']>('all');

  const readiness = theoryReadiness(state);
  const nodes = state.board.nodes;
  const whispers = boardWhispers(state);
  const whisper = whispers[0];

  const unplaced = useMemo(
    () =>
      state.discoveredClueIds
        .map((id) => getClue(id))
        .filter((clue): clue is Clue => Boolean(clue))
        .filter((clue) => !isOnBoard(state, clue.id))
        .filter((clue) => paletteFilter === 'all' || clue.kind === paletteFilter),
    [state, paletteFilter],
  );

  const positionOf = (clueId: string) => {
    if (drag?.clueId === clueId) return { x: drag.x, y: drag.y };
    const node = nodes.find((entry) => entry.clueId === clueId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const findSlot = () => {
    const scroll = canvasRef.current;
    const baseX = (scroll?.scrollLeft ?? 0) + 60;
    const baseY = (scroll?.scrollTop ?? 0) + 60;
    for (let index = 0; index < 80; index += 1) {
      const x = baseX + (index % 5) * 250;
      const y = baseY + Math.floor(index / 5) * 165;
      const free = !nodes.some(
        (node) => Math.abs(node.x - x) < 200 && Math.abs(node.y - y) < 130,
      );
      if (free) return { x, y };
    }
    return { x: baseX, y: baseY };
  };

  const pin = (clueId: string) => {
    const slot = findSlot();
    onAddNode(clueId, slot.x, slot.y);
  };

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, clueId: string) => {
    event.preventDefault();
    const pos = positionOf(clueId);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    setDrag({
      clueId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      originX: pos.x,
      originY: pos.y,
      x: pos.x,
      y: pos.y,
      moved: false,
    });
  };

  const moveDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const dx = event.clientX - drag.pointerX;
    const dy = event.clientY - drag.pointerY;
    setDrag({
      ...drag,
      x: Math.max(0, Math.min(CANVAS_WIDTH - NODE_WIDTH, drag.originX + dx)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - NODE_HEIGHT, drag.originY + dy)),
      moved: drag.moved || Math.abs(dx) + Math.abs(dy) > 4,
    });
  };

  const endDrag = () => {
    if (!drag) return;
    if (drag.moved) onMoveNode(drag.clueId, drag.x, drag.y);
    setDrag(null);
  };

  const handleCardClick = (clueId: string) => {
    if (!connectFrom) {
      onOpenClue(clueId);
      return;
    }
    if (connectFrom === clueId) {
      setConnectFrom(null);
      return;
    }
    setPending({ a: connectFrom, b: clueId });
    setConnectFrom(null);
  };

  const chooseRelationship = (label: 'supports' | 'contradicts') => {
    if (!pending) return;
    const result = onLink(pending.a, pending.b, label);
    setPending(null);
    setLinkError(null);
    if (result?.error === 'duplicate') {
      setLinkError('Those two cards are already connected with that label.');
      return;
    }
    if (result?.validation) {
      setValidation(result.validation);
    }
  };

  const linkMidpoint = (link: BoardLink) => {
    const a = positionOf(link.a);
    const b = positionOf(link.b);
    return {
      a: { x: a.x + NODE_WIDTH / 2, y: a.y + NODE_HEIGHT / 2 },
      b: { x: b.x + NODE_WIDTH / 2, y: b.y + NODE_HEIGHT / 2 },
    };
  };

  return (
    <div className="view board-view">
      <header className="view__head">
        <div>
          <p className="kicker">Thinking space</p>
          <h1 className="view__title display">Deduction board</h1>
          <p className="view__sub">
            Drag by the pin. Click a card to read it. Use the chain to link two
            cards and label the thread.
          </p>
        </div>
        <div className="board-view__head-actions">
          <span className="chip">
            {nodes.length} pinned · {state.board.links.length} threads
          </span>
          {readiness.ready && (
            <button className="btn btn--primary btn--small" onClick={onOpenTheory}>
              <ScalesIcon /> Set out your theory
            </button>
          )}
        </div>
      </header>

      {whisper && !whisperDismissed && (
        <div className="board-whisper">
          <span className="board-whisper__mark" aria-hidden="true">
            <PinIcon />
          </span>
          <p>{whisper.text}</p>
          <button
            className="board-whisper__close"
            onClick={() => setWhisperDismissed(true)}
            aria-label="Dismiss hint"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {connectFrom && (
        <div className="board-connect-bar">
          <span className="dot-pulse" aria-hidden="true" />
          Connecting <strong>{getClue(connectFrom)?.title}</strong> — click the second
          card.
          <button className="btn btn--bare btn--small" onClick={() => setConnectFrom(null)}>
            Cancel
          </button>
        </div>
      )}

      {linkError && <p className="board-error">{linkError}</p>}

      <div className="board">
        <aside className="board-palette">
          <div className="board-palette__head">
            <p className="eyebrow">Case cards</p>
            <span className="board-palette__count">{unplaced.length} unpinned</span>
          </div>

          <div className="board-palette__filters" role="group" aria-label="Filter cards">
            <button
              className={paletteFilter === 'all' ? 'is-active' : ''}
              onClick={() => setPaletteFilter('all')}
            >
              All
            </button>
            {kindOrder.map((kind) => (
              <button
                key={kind}
                className={paletteFilter === kind ? 'is-active' : ''}
                onClick={() => setPaletteFilter(kind)}
              >
                {kindLabel[kind]}
              </button>
            ))}
          </div>

          <div className="board-palette__list">
            {unplaced.length === 0 && (
              <p className="board-palette__empty">
                Every card is on the board. Drag them around; make the file argue.
              </p>
            )}
            {unplaced.map((clue) => (
              <div key={clue.id} className={`palette-card palette-card--${clue.kind}`}>
                <span className={`kind-mark kind-mark--${clue.kind}`} />
                <button className="palette-card__body" onClick={() => onOpenClue(clue.id)}>
                  <span className="palette-card__kind">{kindLabel[clue.kind]}</span>
                  <span className="palette-card__title">{clue.title}</span>
                </button>
                <button
                  className="palette-card__pin"
                  onClick={() => pin(clue.id)}
                  aria-label={`Pin ${clue.title} to the board`}
                  title="Pin to board"
                >
                  <PinIcon />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <div className="board-canvas-wrap">
          <div className="board-canvas" ref={canvasRef}>
            <div
              className="board-canvas__inner"
              style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
            >
              <div className="board-canvas__grid" aria-hidden="true" />

              <svg
                className="board-links"
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                aria-hidden="true"
              >
                {state.board.links.map((link) => {
                  const { a, b } = linkMidpoint(link);
                  const bend = Math.max(30, Math.abs(b.x - a.x) * 0.22);
                  const d = `M ${a.x} ${a.y} C ${a.x + (b.x > a.x ? bend : -bend)} ${a.y}, ${b.x - (b.x > a.x ? bend : -bend)} ${b.y}, ${b.x} ${b.y}`;
                  return (
                    <g key={link.id} className={`board-link board-link--${link.label}`}>
                      <path d={d} className="board-link__halo" />
                      <path d={d} className="board-link__line" />
                      <circle cx={a.x} cy={a.y} r="4" className="board-link__end" />
                      <circle cx={b.x} cy={b.y} r="4" className="board-link__end" />
                    </g>
                  );
                })}
              </svg>

              {state.board.links.map((link) => {
                const { a, b } = linkMidpoint(link);
                return (
                  <button
                    key={`${link.id}-label`}
                    className={`board-link-label board-link-label--${link.label}`}
                    style={{
                      left: (a.x + b.x) / 2,
                      top: (a.y + b.y) / 2,
                    }}
                    onClick={() => onRemoveLink(link.id)}
                    title="Click to cut this thread"
                  >
                    {link.label}
                  </button>
                );
              })}

              {nodes.map((node) => {
                const clue = getClue(node.clueId);
                if (!clue) return null;
                const pos = positionOf(node.clueId);
                const isConnectSource = connectFrom === node.clueId;
                return (
                  <article
                    key={node.clueId}
                    className={`board-node board-node--${clue.kind} ${drag?.clueId === node.clueId ? 'is-dragging' : ''} ${isConnectSource ? 'is-source' : ''}`}
                    style={{ left: pos.x, top: pos.y, width: NODE_WIDTH, minHeight: NODE_HEIGHT }}
                  >
                    <button
                      className="board-node__handle"
                      onPointerDown={(event) => startDrag(event, node.clueId)}
                      onPointerMove={moveDrag}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                      title="Drag to move"
                      aria-label={`Move ${clue.title}`}
                    >
                      <PinIcon />
                    </button>

                    <button
                      className="board-node__body"
                      onClick={() => handleCardClick(node.clueId)}
                    >
                      <span className="board-node__meta">
                        <span className={`kind-mark kind-mark--${clue.kind}`} />
                        {kindLabel[clue.kind]}
                        {clue.kind === 'insight' && <span className="board-node__seal">✦</span>}
                      </span>
                      <span className="board-node__title">{clue.title}</span>
                      <span className="board-node__summary">
                        {clue.kind === 'statement' && clue.quote
                          ? `“${clue.quote}”`
                          : clue.summary}
                      </span>
                    </button>

                    <div className="board-node__actions">
                      <button
                        className="board-node__action"
                        onClick={() => {
                          setConnectFrom(node.clueId);
                          setLinkError(null);
                        }}
                        title="Link this card"
                        aria-label={`Link ${clue.title}`}
                      >
                        <LinkIcon />
                      </button>
                      <button
                        className="board-node__action board-node__action--remove"
                        onClick={() => onRemoveNode(node.clueId)}
                        title="Remove from board"
                        aria-label={`Remove ${clue.title} from the board`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </article>
                );
              })}

              {nodes.length === 0 && (
                <div className="board-empty">
                  <PinIcon />
                  <p className="board-empty__title">The board is empty.</p>
                  <p>
                    Pin cards from the left. Start with a photograph detail and a
                    piece of paperwork, then ask yourself how they sit together.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="board-foot">
        <p>
          <strong>Two labels, no scoring.</strong> “Supports” and “contradicts” are
          for your thinking, not a quiz. A few connections will tighten into a
          conclusion — the rest are yours to make.
        </p>
        <p className="board-foot__legend">
          <span className="chip chip--amber">thread = supports</span>
          <span className="chip chip--red">thread = contradicts</span>
          <span className="chip">{state.board.insights.length} of {caseFile.theoryRequirements.length} key conclusions</span>
        </p>
      </footer>

      {pending && (
        <div className="overlay overlay--clue" role="dialog" aria-modal="true" aria-labelledby="relation-title">
          <div className="overlay__panel relation">
            <div className="sheet">
              <p className="sheet__kicker">Connect two cards</p>
              <h2 className="sheet__title" id="relation-title">
                What is the relationship?
              </h2>
              <div className="relation__cards">
                <span>{getClue(pending.a)?.title}</span>
                <span className="relation__amp">and</span>
                <span>{getClue(pending.b)?.title}</span>
              </div>
              <div className="relation__choices">
                <button className="relation__choice relation__choice--supports" onClick={() => chooseRelationship('supports')}>
                  <CheckIcon />
                  <strong>Supports</strong>
                  <span>They agree, or one explains the other.</span>
                </button>
                <button className="relation__choice relation__choice--contradicts" onClick={() => chooseRelationship('contradicts')}>
                  <CloseIcon />
                  <strong>Contradicts</strong>
                  <span>They cannot both be true.</span>
                </button>
              </div>
              <button className="btn btn--bare btn--small" onClick={() => setPending(null)}>
                Leave it unconnected
              </button>
            </div>
          </div>
        </div>
      )}

      {validation && (
        <div className="overlay overlay--clue" role="dialog" aria-modal="true" aria-labelledby="moment-title">
          <div className="board-moment">
            <div className="board-moment__thread" aria-hidden="true">
              <svg viewBox="0 0 300 40">
                <path d="M4 20C70 2 110 38 160 18s90-12 136 6" />
              </svg>
            </div>
            <p className="kicker">A thread pulls tight</p>
            <h2 id="moment-title" className="board-moment__title display">
              {getClue(validation.insightId)?.title}
            </h2>
            <p className="board-moment__text">{validation.feedback}</p>
            <div className="board-moment__actions">
              <button
                className="btn btn--primary btn--small"
                onClick={() => {
                  onOpenClue(validation.insightId);
                  setValidation(null);
                }}
              >
                Read the conclusion
              </button>
              <button className="btn btn--small" onClick={() => setValidation(null)}>
                Stay with the board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
