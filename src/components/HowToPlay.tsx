import { CloseIcon, PinIcon, SearchIcon, SpeechIcon, ScalesIcon, PhotoIcon } from './Icons';

export default function HowToPlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="howto-title">
      <div className="overlay__panel howto">
        <button className="overlay__close" onClick={onClose} aria-label="Close how to play">
          <CloseIcon />
        </button>
        <div className="sheet">
          <p className="sheet__kicker">How to play</p>
          <h2 className="sheet__title" id="howto-title">
            Look, ask, connect, commit.
          </h2>
          <p className="sheet__body" style={{ marginTop: '0.6rem' }}>
            You are a civilian consultant with an unreasonable eye for detail. There
            is no timer and no fail state. Progress is saved automatically in this
            browser.
          </p>

          <ol className="howto__steps">
            <li>
              <span className="howto__icon"><PhotoIcon /></span>
              <div>
                <h3>Examine the photographs</h3>
                <p>
                  Open an image, zoom in, and click what looks wrong. Nothing glows
                  before you find it. Each photograph allows two “inspect scene”
                  nudges if you are stuck.
                </p>
              </div>
            </li>
            <li>
              <span className="howto__icon"><SearchIcon /></span>
              <div>
                <h3>Read the paperwork</h3>
                <p>
                  Dockets, receipts and logs. Margin notes appear on documents; they
                  are prompts, not answers.
                </p>
              </div>
            </li>
            <li>
              <span className="howto__icon"><SpeechIcon /></span>
              <div>
                <h3>Interview people</h3>
                <p>
                  Choose questions, then present evidence. The right card makes a
                  story change and files a statement. The wrong card gets a patient
                  look.
                </p>
              </div>
            </li>
            <li>
              <span className="howto__icon"><PinIcon /></span>
              <div>
                <h3>Pin and connect</h3>
                <p>
                  On the deduction board, pin cards and link them with “supports” or
                  “contradicts”. A few connections tighten into a formal conclusion.
                  Your arrangement is kept.
                </p>
              </div>
            </li>
            <li>
              <span className="howto__icon"><ScalesIcon /></span>
              <div>
                <h3>Present your theory</h3>
                <p>
                  When the three key deductions are on the board, answer five concrete
                  questions. Wrong answers are explained and you can try again.
                </p>
              </div>
            </li>
          </ol>

          <div className="howto__keys">
            <span><kbd>Esc</kbd> close layers</span>
            <span><kbd>Tab</kbd> move between visible details</span>
            <span><kbd>Scroll</kbd> zoom a photograph</span>
          </div>

          <p className="howto__credit">
            East-room artwork: Johan Christian Dahl, <em>Clouds at Sunset</em> —
            public domain, via Wikimedia Commons. The gallery, the photographs and
            every other illustration were drawn for this case.
          </p>

          <div className="sheet__foot">
            <button className="btn btn--primary" onClick={onClose}>
              Back to the case
            </button>
            <span className="tiny muted">
              Authored content only — no AI, no network, no account.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
