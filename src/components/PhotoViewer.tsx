import { useEffect, useRef, useState } from 'react';
import type { Photo } from '../game/types';
import type { GameState, InspectResult } from '../game/engine';
import {
  MAX_INSPECTIONS_PER_PHOTO,
  getClue,
  hintLevel,
  isHotspotFound,
  isHotspotGuided,
} from '../game/engine';
import Scene from './scenes/Scene';
import {
  CheckIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from './Icons';

interface Props {
  photo: Photo;
  state: GameState;
  onClose: () => void;
  onInspect: (photoId: string, hotspotId: string) => InspectResult | null;
  onHint: (photoId: string) => void;
  onOpenClue: (clueId: string) => void;
}

const clampZoom = (value: number) => Math.min(3.2, Math.max(1, value));

export default function PhotoViewer({
  photo,
  state,
  onClose,
  onInspect,
  onHint,
  onOpenClue,
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [observation, setObservation] = useState<
    { clueId: string; text: string; already: boolean } | null
  >(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number; moved: boolean } | null>(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setObservation(null);
  }, [photo.id]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setZoom((current) => clampZoom(current - Math.sign(event.deltaY) * 0.22));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, []);

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      px: pan.x,
      py: pan.y,
      moved: false,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) current.moved = true;
    setPan({ x: current.px + dx, y: current.py + dy });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const inspect = (hotspotId: string) => {
    if (drag.current?.moved) return;
    const result = onInspect(photo.id, hotspotId);
    if (!result?.observation) return;
    setObservation({
      clueId: result.clueId ?? '',
      text: result.observation,
      already: result.alreadyFound,
    });
  };

  const level = hintLevel(state, photo.id);
  const hintsLeft = MAX_INSPECTIONS_PER_PHOTO - level;
  const foundCount = photo.hotspots.filter((spot) =>
    isHotspotFound(state, photo.id, spot.id),
  ).length;
  const allFound = foundCount === photo.hotspots.length;
  const foundDetails = photo.hotspots
    .filter((spot) => isHotspotFound(state, photo.id, spot.id))
    .map((spot) => ({ spot, clue: getClue(spot.clueId) }))
    .filter((entry) => entry.clue);

  return (
    <div
      className="overlay overlay--photo"
      role="dialog"
      aria-modal="true"
      aria-label={`Examining photograph: ${photo.title}`}
    >
      <div className="viewer">
        <header className="viewer__bar">
          <div className="viewer__heading">
            <p className="kicker">
              {photo.timestamp} · {photo.place}
            </p>
            <h2 className="viewer__title display">{photo.title}</h2>
          </div>

          <div className="viewer__tools">
            <div className="viewer__zoom-controls" role="group" aria-label="Zoom">
              <button
                className="btn btn--bare btn--small"
                onClick={() => setZoom((z) => clampZoom(z - 0.3))}
                disabled={zoom <= 1}
                aria-label="Zoom out"
              >
                <MinusIcon />
              </button>
              <span className="viewer__zoom-value mono">{Math.round(zoom * 100)}%</span>
              <button
                className="btn btn--bare btn--small"
                onClick={() => setZoom((z) => clampZoom(z + 0.3))}
                disabled={zoom >= 3.2}
                aria-label="Zoom in"
              >
                <PlusIcon />
              </button>
              <button
                className="btn btn--bare btn--small"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                reset
              </button>
            </div>
            <button className="overlay__close viewer__close" onClick={onClose} aria-label="Close photograph">
              <CloseIcon />
            </button>
          </div>
        </header>

        <div className="viewer__main">
          <div
            className={`viewer__stage ${zoom > 1 ? 'is-zoomed' : ''}`}
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className="viewer__zoom"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <svg
                viewBox={`0 0 ${photo.width} ${photo.height}`}
                className="viewer__svg"
                role="img"
                aria-label={photo.description}
              >
                <Scene scene={photo.scene} />
                <g>
                  {photo.hotspots.map((hotspot) => {
                    const found = isHotspotFound(state, photo.id, hotspot.id);
                    const guided = isHotspotGuided(state, photo.id, hotspot.id);
                    return (
                      <g
                        key={hotspot.id}
                        className={`hotspot ${found ? 'is-found' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label={hotspot.label}
                        onClick={() => inspect(hotspot.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            inspect(hotspot.id);
                          }
                        }}
                      >
                        <circle
                          cx={hotspot.cx}
                          cy={hotspot.cy}
                          r={Math.max(24, hotspot.r)}
                          className="hotspot__hit"
                        />
                        {guided && !found && (
                          <circle
                            cx={hotspot.cx}
                            cy={hotspot.cy}
                            r={hotspot.r + 12}
                            className="hotspot__guide"
                          />
                        )}
                        {found && (
                          <>
                            <circle
                              cx={hotspot.cx}
                              cy={hotspot.cy}
                              r={hotspot.r + 4}
                              className="hotspot__found-ring"
                            />
                            <circle
                              cx={hotspot.cx}
                              cy={hotspot.cy}
                              r={4}
                              className="hotspot__found-dot"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
            <div className="viewer__stage-vignette" aria-hidden="true" />
            {zoom > 1 && (
              <p className="viewer__pan-note mono">drag to pan · scroll to zoom</p>
            )}
          </div>

          <aside className="viewer__panel">
            <div className="viewer__panel-head">
              <div className="row row--wrap">
                <span className="chip chip--amber">{photo.timestamp}</span>
                <span className="chip chip--paper">{foundCount}/{photo.hotspots.length} noticed</span>
              </div>
              <p className="viewer__credit mono">{photo.credit}</p>
              <p className="viewer__caption">{photo.caption}</p>
              <p className="viewer__desc">{photo.description}</p>
            </div>

            <div className="viewer__inspect">
              <button
                className="btn btn--small"
                onClick={() => onHint(photo.id)}
                disabled={hintsLeft <= 0 || allFound}
              >
                <SearchIcon />
                {hintsLeft > 0 ? `Inspect scene · ${hintsLeft} left` : 'Inspections used'}
              </button>
              <p className="viewer__inspect-note">
                {allFound
                  ? 'Every detail noted. Open a card to file it.'
                  : 'Hover nothing, expect nothing. Click what looks wrong; two guided inspections are yours if you need them.'}
              </p>
              {level >= 1 && (
                <div className="viewer__hint">
                  <span className="viewer__hint-label mono">Inspection {level}/2</span>
                  <p>{photo.hints[Math.min(level, 2) - 1]}</p>
                </div>
              )}
            </div>

            {observation && (
              <div className={`observation ${observation.already ? 'is-repeat' : ''}`}>
                <p className="observation__label">
                  {observation.already ? 'Already in the file' : 'You notice'}
                </p>
                <p className="observation__text">{observation.text}</p>
                {observation.clueId && (
                  <button
                    className="btn btn--paper btn--small"
                    onClick={() => onOpenClue(observation.clueId)}
                  >
                    Open evidence card
                  </button>
                )}
              </div>
            )}

            <div className="viewer__found">
              <p className="eyebrow">Details noticed</p>
              {foundDetails.length === 0 ? (
                <p className="viewer__empty">
                  Nothing yet. The painting, the frame, the floor — start with the
                  frame.
                </p>
              ) : (
                <ul className="viewer__found-list">
                  {foundDetails.map(({ spot, clue }) => (
                    <li key={spot.id}>
                      <button onClick={() => onOpenClue(clue!.id)}>
                        <span className="viewer__found-icon">
                          <CheckIcon />
                        </span>
                        <span>
                          <strong>{clue!.title}</strong>
                          <span>{clue!.summary}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
