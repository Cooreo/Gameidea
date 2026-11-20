import MenuArt from './MenuArt';
import { ArrowLeftIcon, FolderIcon, QuestionIcon } from './Icons';

interface Props {
  hasSave: boolean;
  solved: boolean;
  savedAt?: number;
  found?: number;
  total?: number;
  onNew: () => void;
  onContinue: () => void;
  onHowTo: () => void;
}

function lastSeen(timestamp?: number): string {
  if (!timestamp) return '';
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} h ago`;
  return new Date(timestamp).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  });
}

export default function MainMenu({
  hasSave,
  solved,
  savedAt,
  found = 0,
  total = 0,
  onNew,
  onContinue,
  onHowTo,
}: Props) {
  return (
    <main className="menu">
      <div className="menu__glow" aria-hidden="true" />
      <div className="menu__inner">
        <div className="menu__art-wrap">
          <MenuArt />
          <div className="menu__art-caption">
            <span className="menu__art-line" />
            <span>
              Meridian Gallery · 14 November · 21:18
            </span>
          </div>
        </div>

        <div className="menu__panel">
          <p className="menu__case-no">
            <span className="menu__case-dot" aria-hidden="true" />
            Art &amp; Property Unit — case 14/11-MG-07
          </p>

          <h1 className="menu__title display">
            The Last
            <span className="menu__title-em">Light</span>
          </h1>

          <p className="menu__tagline">
            One painting. Eleven witnesses. One detail nobody looked at twice.
          </p>

          <p className="menu__blurb">
            You are the consultant they call when a room is full of honest people
            and one of them is lying. Examine the photographs. Read the paperwork.
            Put two things side by side until a story breaks.
          </p>

          <nav className="menu__actions" aria-label="Main menu">
            <button className="btn btn--primary menu__action" onClick={onNew}>
              <FolderIcon />
              New Case
              {hasSave && <span className="menu__action-note">replaces current progress</span>}
            </button>

            <button
              className="btn menu__action"
              onClick={onContinue}
              disabled={!hasSave}
              title={hasSave ? 'Return to the open case' : 'No case in progress'}
            >
              <ArrowLeftIcon />
              Continue
              {hasSave ? (
                <span className="menu__action-note">
                  {solved ? 'case closed' : `${found} of ${total} items filed`} ·{' '}
                  {lastSeen(savedAt)}
                </span>
              ) : (
                <span className="menu__action-note">no case in progress</span>
              )}
            </button>

            <button className="btn menu__action" onClick={onHowTo}>
              <QuestionIcon />
              How to Play
              <span className="menu__action-note">ten minutes, no tutorial screens</span>
            </button>
          </nav>

          <p className="menu__meta">
            An authored case. Everything in the file was written by hand — no
            network, no AI, no account. Your progress is stored in this browser.
          </p>
        </div>
      </div>

      <footer className="menu__footer">
        <span>THE MERIDIAN GALLERY</span>
        <span className="menu__footer-dot" aria-hidden="true" />
        <span>OFFLINE EXHIBITION · BUILD 1.0</span>
      </footer>
    </main>
  );
}
