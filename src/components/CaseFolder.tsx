import type { ReactNode } from 'react';
import type { GameState, UnreadCounts } from '../game/engine';
import { caseFile } from '../game/case';
import {
  BoardIcon,
  DocumentIcon,
  FolderIcon,
  PersonIcon,
  PhotoIcon,
  QuestionIcon,
  ScalesIcon,
  SpeechIcon,
} from './Icons';

export type TabId =
  | 'briefing'
  | 'photos'
  | 'documents'
  | 'people'
  | 'interviews'
  | 'board'
  | 'theory';

interface Props {
  state: GameState;
  tab: TabId;
  badges: UnreadCounts;
  found: number;
  total: number;
  onTab: (tab: TabId) => void;
  onMenu: () => void;
  onHowTo: () => void;
  children: ReactNode;
}

const tabs: {
  id: TabId;
  label: string;
  short: string;
  icon: typeof FolderIcon;
  badge?: keyof UnreadCounts;
}[] = [
  { id: 'briefing', label: 'Briefing', short: 'Brief', icon: FolderIcon },
  { id: 'photos', label: 'Photographs', short: 'Photos', icon: PhotoIcon, badge: 'photos' },
  { id: 'documents', label: 'Documents', short: 'Docs', icon: DocumentIcon, badge: 'documents' },
  { id: 'people', label: 'People', short: 'People', icon: PersonIcon },
  { id: 'interviews', label: 'Interviews', short: 'Talks', icon: SpeechIcon, badge: 'interviews' },
  { id: 'board', label: 'Deduction board', short: 'Board', icon: BoardIcon, badge: 'board' },
  { id: 'theory', label: 'Your theory', short: 'Theory', icon: ScalesIcon },
];

export default function CaseFolder({
  state,
  tab,
  badges,
  found,
  total,
  onTab,
  onMenu,
  onHowTo,
  children,
}: Props) {
  const contradictions = Object.values(state.interviews).reduce(
    (count, interview) =>
      count + interview.transcript.filter((entry) => entry.contradiction).length,
    0,
  );
  const readiness = state.board.insights.length >= 3;

  return (
    <div className="folder">
      <header className="folder__top">
        <button className="folder__brand" onClick={onMenu} title="Save and return to the main menu">
          <span className="folder__back" aria-hidden="true">
            <FolderIcon />
          </span>
          <span className="folder__brand-text">
            <span className="folder__brand-kicker">Case file · {caseFile.caseNumber}</span>
            <span className="folder__brand-title display">{caseFile.title}</span>
          </span>
        </button>

        <div className="folder__status">
          <span className="folder__saved" title="Progress is saved in this browser">
            <span className="folder__saved-dot" aria-hidden="true" />
            Saved
          </span>
          <span className="folder__stat">
            <span className="folder__stat-label">Items filed</span>
            <span className="folder__stat-value">
              {found}
              <span className="folder__stat-total">/{total}</span>
            </span>
          </span>
          <span className={`folder__stat ${contradictions ? 'folder__stat--hot' : ''}`}>
            <span className="folder__stat-label">Contradictions</span>
            <span className="folder__stat-value">{contradictions}</span>
          </span>
          {readiness && (
            <button className="chip chip--amber folder__ready" onClick={() => onTab('theory')}>
              theory ready
            </button>
          )}
          <button className="folder__help btn btn--bare" onClick={onHowTo} title="How to play">
            <QuestionIcon />
          </button>
        </div>
      </header>

      <div className="folder__progress" aria-hidden="true">
        <span style={{ width: `${total ? Math.min(100, (found / total) * 100) : 0}%` }} />
      </div>

      <div className="folder__body">
        <nav className="folder__rail" aria-label="Case sections">
          <p className="folder__rail-label">Sections</p>
          {tabs.map((item) => {
            const Icon = item.icon;
            const badgeCount = item.badge ? badges[item.badge] : 0;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                className={`folder__tab ${active ? 'is-active' : ''}`}
                onClick={() => onTab(item.id)}
                aria-current={active ? 'page' : undefined}
              >
                <span className="folder__tab-icon">
                  <Icon />
                </span>
                <span className="folder__tab-label">
                  <span className="folder__tab-full">{item.label}</span>
                  <span className="folder__tab-short">{item.short}</span>
                </span>
                {badgeCount > 0 && <span className="badge">{badgeCount}</span>}
                {item.id === 'theory' && readiness && <span className="dot-pulse" aria-hidden="true" />}
              </button>
            );
          })}

          <div className="folder__rail-foot">
            <span>Offline case</span>
            <span className="folder__rail-line" />
            <span>v1.0</span>
          </div>
        </nav>

        <main className="folder__content" key={tab}>
          {children}
        </main>
      </div>
    </div>
  );
}
