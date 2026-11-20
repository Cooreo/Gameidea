import { caseFile } from '../game/case';
import type { GameState } from '../game/engine';
import { getClue, hintLevel, isHotspotFound } from '../game/engine';
import Scene from './scenes/Scene';
import { CheckIcon, SearchIcon } from './Icons';

interface Props {
  state: GameState;
  onOpenPhoto: (photoId: string) => void;
  onOpenClue: (clueId: string) => void;
}

export default function PhotosTab({ state, onOpenPhoto, onOpenClue }: Props) {
  const totalFound = state.discoveredHotspots.length;
  const totalHotspots = caseFile.photos.reduce(
    (sum, photo) => sum + photo.hotspots.length,
    0,
  );

  return (
    <div className="view photos">
      <header className="view__head">
        <div>
          <p className="kicker">Exhibits A–E</p>
          <h1 className="view__title display">Photographs</h1>
          <p className="view__sub">
            {totalFound} of {totalHotspots} details noticed. Open a photograph and
            click what looks wrong — nothing is marked for you.
          </p>
        </div>
        <div className="photos__legend">
          <span className="chip">
            <SearchIcon /> click to examine
          </span>
          <span className="chip">two inspections per image</span>
        </div>
      </header>

      <div className="photo-grid">
        {caseFile.photos.map((photo, index) => {
          const found = photo.hotspots.filter((hotspot) =>
            isHotspotFound(state, photo.id, hotspot.id),
          );
          const unread = found
            .map((hotspot) => getClue(hotspot.clueId))
            .filter((clue) => clue && !state.viewedClueIds.includes(clue.id));
          const usedHints = hintLevel(state, photo.id);
          const complete = found.length === photo.hotspots.length;
          return (
            <article
              key={photo.id}
              className={`photo-card ${complete ? 'is-complete' : ''}`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <button
                className="photo-card__frame"
                onClick={() => onOpenPhoto(photo.id)}
                aria-label={`Open photograph: ${photo.title}`}
              >
                <svg
                  viewBox={`0 0 ${photo.width} ${photo.height}`}
                  className="photo-card__svg"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <Scene scene={photo.scene} />
                </svg>
                <span className="photo-card__time mono">{photo.timestamp}</span>
                <span className="photo-card__zoom">
                  <SearchIcon /> examine
                </span>
                {unread.length > 0 && <span className="badge photo-card__new">{unread.length}</span>}
                <span className="photo-card__corner" aria-hidden="true" />
              </button>

              <div className="photo-card__body">
                <div className="photo-card__meta">
                  <span className="eyebrow">Exhibit {String.fromCharCode(65 + index)}</span>
                  <span className="photo-card__place">{photo.place.split('—').pop()?.trim()}</span>
                </div>
                <h2 className="photo-card__title display">{photo.title}</h2>
                <p className="photo-card__caption">{photo.caption}</p>

                <div className="photo-card__foot">
                  <span className={`photo-card__count ${complete ? 'is-done' : ''}`}>
                    {complete ? <CheckIcon /> : null}
                    {found.length} of {photo.hotspots.length} details noticed
                  </span>
                  {usedHints > 0 && (
                    <span className="photo-card__hints mono">{usedHints}/2 inspections</span>
                  )}
                </div>

                {found.length > 0 && (
                  <div className="photo-card__found">
                    {found.map((hotspot) => {
                      const clue = getClue(hotspot.clueId);
                      if (!clue) return null;
                      return (
                        <button
                          key={hotspot.id}
                          className="photo-card__found-chip"
                          onClick={() => onOpenClue(clue.id)}
                        >
                          {clue.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <footer className="photos__note">
        <p>
          <strong>A note on looking.</strong> The camera sees everything at once.
          Compare the same object across two photographs and the file starts to
          argue with itself.
        </p>
      </footer>
    </div>
  );
}
