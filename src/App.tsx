import { useCallback, useEffect, useRef, useState } from 'react';
import MainMenu from './components/MainMenu';
import CaseFolder, { type TabId } from './components/CaseFolder';
import Briefing from './components/Briefing';
import PhotosTab from './components/PhotosTab';
import PhotoViewer from './components/PhotoViewer';
import DocumentsTab from './components/DocumentsTab';
import DocumentSheet from './components/DocumentSheet';
import PeopleTab from './components/PeopleTab';
import InterviewsTab from './components/InterviewsTab';
import BoardTab from './components/BoardTab';
import TheoryTab from './components/TheoryTab';
import Resolution from './components/Resolution';
import ClueModal from './components/ClueModal';
import HowToPlay from './components/HowToPlay';
import Toasts, { type Toast } from './components/Toasts';
import { caseFile } from './game/case';
import {
  addBoardNode,
  askTopic,
  caseProgress,
  clearSave,
  createInitialState,
  examineDocument,
  getClue,
  hasSave,
  inspectHotspot,
  linkBoardNodes,
  loadGame,
  moveBoardNode,
  openPhoto,
  presentEvidence,
  removeBoardLink,
  removeBoardNode,
  saveGame,
  startInterview,
  submitTheory,
  unreadCounts,
  usePhotoHint,
  viewClue,
  type GameState,
  type InspectResult,
  type PresentationOutcome,
  type LinkResult,
} from './game/engine';
import type { CaseDocument, Clue, Photo } from './game/types';

interface ToastSeed {
  title: string;
  text: string;
  tone?: 'amber' | 'red' | 'gold';
  clueId?: string;
}

export default function App() {
  const [state, setState] = useState<GameState | null>(() => loadGame());
  const [screen, setScreen] = useState<'menu' | 'case'>('menu');
  const [tab, setTab] = useState<TabId>('briefing');
  const [selectedPerson, setSelectedPerson] = useState('voss');

  const [photoOpen, setPhotoOpen] = useState<string | null>(null);
  const [docOpen, setDocOpen] = useState<string | null>(null);
  const [clueOpen, setClueOpen] = useState<string | null>(null);
  const [howTo, setHowTo] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);
  const [resolutionOpen, setResolutionOpen] = useState(false);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastSeq = useRef(0);
  const knownClues = useRef<Set<string>>(new Set(state?.discoveredClueIds ?? []));
  const saveExists = hasSave() || Boolean(state);

  const pushToast = useCallback((seed: ToastSeed) => {
    const id = `toast_${toastSeq.current + 1}`;
    toastSeq.current += 1;
    setToasts((current) => [...current.slice(-3), { id, ...seed }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 7200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  // Autosave every state change.
  useEffect(() => {
    if (state) saveGame(state);
  }, [state]);

  // Newly discovered material becomes a toast.
  useEffect(() => {
    if (!state) return;
    const fresh = state.discoveredClueIds.filter((id) => !knownClues.current.has(id));
    if (fresh.length === 0) return;
    fresh.forEach((id) => knownClues.current.add(id));
    const labels: Record<Clue['kind'], string> = {
      observation: 'Evidence added',
      document: 'Document filed',
      statement: 'Statement recorded',
      insight: 'Conclusion formed',
    };
    fresh.slice(0, 2).forEach((id) => {
      const clue = getClue(id);
      if (!clue) return;
      pushToast({
        title: labels[clue.kind],
        text: clue.title,
        clueId: id,
        tone: clue.kind === 'insight' ? 'gold' : clue.kind === 'statement' ? 'red' : 'amber',
      });
    });
    if (fresh.length > 2) {
      pushToast({
        title: 'More filed',
        text: `${fresh.length - 2} more items were added to the case file.`,
        tone: 'amber',
      });
    }
  }, [state, pushToast]);

  const progress = state ? caseProgress(state) : { found: 0, total: 0 };
  const badges = state ? unreadCounts(state) : { photos: 0, documents: 0, interviews: 0, board: 0, total: 0 };

  const update = useCallback((updater: (current: GameState) => GameState) => {
    setState((current) => (current ? updater(current) : current));
  }, []);

  const startFresh = useCallback(() => {
    clearSave();
    const next = createInitialState();
    knownClues.current = new Set();
    setState(next);
    setScreen('case');
    setTab('briefing');
    setSelectedPerson('voss');
    setPhotoOpen(null);
    setDocOpen(null);
    setClueOpen(null);
    setResolutionOpen(false);
    setConfirmNew(false);
    pushToast({
      title: 'Case opened',
      text: '14/11-MG-07 · Meridian Gallery. Start with the photographs.',
      tone: 'amber',
    });
  }, [pushToast]);

  const handleNewCase = useCallback(() => {
    if (state) {
      setConfirmNew(true);
      return;
    }
    startFresh();
  }, [state, startFresh]);

  const openClue = useCallback(
    (clueId: string) => {
      setClueOpen(clueId);
      update((current) => viewClue(current, clueId));
    },
    [update],
  );

  const handleOpenPhoto = useCallback(
    (photoId: string) => {
      setPhotoOpen(photoId);
      update((current) => openPhoto(current, photoId));
    },
    [update],
  );

  const handleOpenDocument = useCallback(
    (documentId: string) => {
      update((current) => examineDocument(current, documentId));
      setDocOpen(documentId);
    },
    [update],
  );

  const handleInspect = useCallback(
    (photoId: string, hotspotId: string): InspectResult | null => {
      if (!state) return null;
      const result = inspectHotspot(state, photoId, hotspotId);
      setState(result.state);
      return result;
    },
    [state],
  );

  const handleHint = useCallback(
    (photoId: string) => {
      update((current) => usePhotoHint(current, photoId));
    },
    [update],
  );

  const handleStartInterview = useCallback(
    (personId: string) => {
      update((current) => startInterview(current, personId));
    },
    [update],
  );

  const handleAsk = useCallback(
    (personId: string, topicId: string) => {
      update((current) => askTopic(current, personId, topicId));
    },
    [update],
  );

  const handlePresent = useCallback(
    (personId: string, evidenceId: string): PresentationOutcome | null => {
      if (!state) return null;
      const outcome = presentEvidence(state, personId, evidenceId);
      setState(outcome.state);
      return outcome;
    },
    [state],
  );

  const handleLink = useCallback(
    (a: string, b: string, label: 'supports' | 'contradicts'): LinkResult | null => {
      if (!state) return null;
      const result = linkBoardNodes(state, a, b, label);
      setState(result.state);
      return result;
    },
    [state],
  );

  const handlePinClue = useCallback(
    (clueId: string) => {
      if (!state) return;
      const total = state.board.nodes.length;
      const x = 140 + (total % 4) * 250;
      const y = 120 + Math.floor(total / 4) * 210;
      setState(addBoardNode(state, clueId, x, y));
      const clue = getClue(clueId);
      if (clue) {
        pushToast({ title: 'Pinned to board', text: clue.title, tone: 'amber' });
      }
    },
    [state, pushToast],
  );

  const handleAddNode = useCallback(
    (clueId: string, x: number, y: number) => {
      update((current) => addBoardNode(current, clueId, x, y));
    },
    [update],
  );

  const handleMoveNode = useCallback(
    (clueId: string, x: number, y: number) => {
      update((current) => moveBoardNode(current, clueId, x, y));
    },
    [update],
  );

  const handleRemoveNode = useCallback(
    (clueId: string) => {
      update((current) => removeBoardNode(current, clueId));
    },
    [update],
  );

  const handleSubmitTheory = useCallback(
    (answers: Record<string, string>) => {
      if (!state) return null;
      const outcome = submitTheory(state, answers);
      setState(outcome.state);
      if (outcome.solved) {
        setResolutionOpen(true);
        pushToast({
          title: 'Case closed',
          text: 'The file is complete. Read what happened.',
          tone: 'gold',
        });
      }
      return outcome;
    },
    [state, pushToast],
  );

  const handleGoToInterview = useCallback((personId: string) => {
    setSelectedPerson(personId);
    setTab('interviews');
    setPhotoOpen(null);
    setDocOpen(null);
  }, []);

  // Escape closes the topmost layer.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (clueOpen) {
        setClueOpen(null);
      } else if (docOpen) {
        setDocOpen(null);
      } else if (photoOpen) {
        setPhotoOpen(null);
      } else if (resolutionOpen) {
        setResolutionOpen(false);
      } else if (howTo) {
        setHowTo(false);
      } else if (confirmNew) {
        setConfirmNew(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [clueOpen, docOpen, photoOpen, resolutionOpen, howTo, confirmNew]);

  const openPhotoData: Photo | undefined = photoOpen
    ? caseFile.photos.find((photo) => photo.id === photoOpen)
    : undefined;
  const openDocData: CaseDocument | undefined = docOpen
    ? caseFile.documents.find((doc) => doc.id === docOpen)
    : undefined;
  const openClueData: Clue | undefined = clueOpen ? getClue(clueOpen) : undefined;

  const handleDismissOnboarding = useCallback(() => {
    update((current) => ({ ...current, onboardingDismissed: true }));
  }, [update]);

  let content = null;
  if (state) {
    switch (tab) {
      case 'briefing':
        content = (
          <Briefing
            state={state}
            found={progress.found}
            total={progress.total}
            onOpenTab={setTab}
            onOpenClue={openClue}
            onOpenPhoto={handleOpenPhoto}
            onDismissOnboarding={handleDismissOnboarding}
            onOpenResolution={() => setResolutionOpen(true)}
          />
        );
        break;
      case 'photos':
        content = (
          <PhotosTab state={state} onOpenPhoto={handleOpenPhoto} onOpenClue={openClue} />
        );
        break;
      case 'documents':
        content = (
          <DocumentsTab state={state} onOpenDocument={handleOpenDocument} />
        );
        break;
      case 'people':
        content = (
          <PeopleTab state={state} onInterview={handleGoToInterview} />
        );
        break;
      case 'interviews':
        content = (
          <InterviewsTab
            state={state}
            selectedPersonId={selectedPerson}
            onSelectPerson={setSelectedPerson}
            onStart={handleStartInterview}
            onAsk={handleAsk}
            onPresent={handlePresent}
            onOpenClue={openClue}
          />
        );
        break;
      case 'board':
        content = (
          <BoardTab
            state={state}
            onAddNode={handleAddNode}
            onMoveNode={handleMoveNode}
            onRemoveNode={handleRemoveNode}
            onLink={handleLink}
            onRemoveLink={(linkId) =>
              setState((current) => (current ? removeBoardLink(current, linkId) : current))
            }
            onOpenClue={openClue}
            onOpenTheory={() => setTab('theory')}
          />
        );
        break;
      case 'theory':
        content = (
          <TheoryTab
            state={state}
            onSubmit={handleSubmitTheory}
            onOpenClue={openClue}
            onOpenBoard={() => setTab('board')}
            onOpenResolution={() => setResolutionOpen(true)}
          />
        );
        break;
    }
  }

  return (
    <>
      {screen === 'menu' || !state ? (
        <MainMenu
          hasSave={saveExists}
          solved={Boolean(state?.theory.solved)}
          savedAt={state?.updatedAt}
          found={progress.found}
          total={progress.total}
          onNew={handleNewCase}
          onContinue={() => setScreen('case')}
          onHowTo={() => setHowTo(true)}
        />
      ) : (
        <div className="screen screen--case">
          <CaseFolder
            state={state}
            tab={tab}
            badges={badges}
            found={progress.found}
            total={progress.total}
            onTab={setTab}
            onMenu={() => {
              setScreen('menu');
              setClueOpen(null);
              setPhotoOpen(null);
              setDocOpen(null);
            }}
            onHowTo={() => setHowTo(true)}
          >
            {content}
          </CaseFolder>
        </div>
      )}

      {openPhotoData && state && (
        <PhotoViewer
          photo={openPhotoData}
          state={state}
          onClose={() => setPhotoOpen(null)}
          onInspect={handleInspect}
          onHint={handleHint}
          onOpenClue={openClue}
        />
      )}

      {openDocData && (
        <div className="overlay overlay--doc" role="dialog" aria-modal="true" aria-label={openDocData.title}>
          <DocumentSheet document={openDocData} onClose={() => setDocOpen(null)} />
        </div>
      )}

      {openClueData && state && (
        <ClueModal
          clue={openClueData}
          state={state}
          onClose={() => setClueOpen(null)}
          onPin={handlePinClue}
          onOpenPhoto={(photoId) => {
            setClueOpen(null);
            handleOpenPhoto(photoId);
          }}
          onOpenDocument={(documentId) => {
            setClueOpen(null);
            handleOpenDocument(documentId);
          }}
        />
      )}

      {howTo && <HowToPlay onClose={() => setHowTo(false)} />}

      {confirmNew && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-new-title">
          <div className="overlay__panel confirm">
            <div className="sheet">
              <p className="sheet__kicker">New case</p>
              <h2 className="sheet__title" id="confirm-new-title">
                Start over?
              </h2>
              <p className="sheet__body" style={{ marginTop: '0.8rem' }}>
                A case is already in progress, with {state?.discoveredClueIds.length ?? 0}{' '}
                items filed and{' '}
                {state ? Object.keys(state.interviews).filter((id) => state.interviews[id]?.met).length : 0}{' '}
                interviews started. Opening a new case will erase all of it from this browser.
              </p>
              <div className="sheet__foot">
                <button className="btn btn--primary" onClick={startFresh}>
                  Erase and start
                </button>
                <button className="btn" onClick={() => setConfirmNew(false)}>
                  Keep my case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {resolutionOpen && state && (
        <Resolution
          state={state}
          onClose={() => setResolutionOpen(false)}
          onOpenClue={openClue}
          onBackToMenu={() => {
            setResolutionOpen(false);
            setScreen('menu');
          }}
        />
      )}

      <Toasts
        toasts={toasts}
        onDismiss={dismissToast}
        onOpenClue={(clueId) => {
          openClue(clueId);
        }}
      />
    </>
  );
}

