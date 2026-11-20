import { CloseIcon } from './Icons';

export interface Toast {
  id: string;
  title: string;
  text: string;
  tone?: 'amber' | 'red' | 'gold';
  clueId?: string;
}

interface Props {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  onOpenClue: (clueId: string) => void;
}

export default function Toasts({ toasts, onDismiss, onOpenClue }: Props) {
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((toast) => {
        const toneClass =
          toast.tone === 'red'
            ? 'toast--red'
            : toast.tone === 'gold'
              ? 'toast--gold'
              : '';
        const canOpen = Boolean(toast.clueId);
        return (
          <div
            key={toast.id}
            className={`toast ${toneClass}`}
            role={canOpen ? 'button' : undefined}
            tabIndex={canOpen ? 0 : undefined}
            onClick={() => {
              if (toast.clueId) onOpenClue(toast.clueId);
            }}
            onKeyDown={(event) => {
              if (!toast.clueId) return;
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpenClue(toast.clueId);
              }
            }}
          >
            <div className="toast__body">
              <p className="toast__title">{toast.title}</p>
              <p className="toast__text">{toast.text}</p>
            </div>
            <button
              className="toast__x"
              onClick={(event) => {
                event.stopPropagation();
                onDismiss(toast.id);
              }}
              aria-label="Dismiss notification"
            >
              <CloseIcon width={14} height={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
