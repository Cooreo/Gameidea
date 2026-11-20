import type { CaseDocument, DocBlock } from '../game/types';
import { caseFile } from '../game/case';
import { CloseIcon } from './Icons';

interface Props {
  document: CaseDocument;
  onClose: () => void;
}

function renderBlock(
  block: DocBlock,
  index: number,
  markNumbers: Map<number, number>,
) {
  switch (block.type) {
    case 'heading':
      return (
        <h3 className="doc__heading" key={index}>
          {block.text}
        </h3>
      );
    case 'para':
      return (
        <p className="doc__para" key={index}>
          {block.text}
        </p>
      );
    case 'mark':
      return (
        <p className="doc__para doc__para--mark" key={index}>
          <mark className="doc__mark">{block.text}</mark>
          <sup className="doc__ref">{markNumbers.get(index)}</sup>
        </p>
      );
    case 'kv':
      return (
        <dl className="doc__kv" key={index}>
          {block.rows.map(([key, value]) => (
            <div key={key + value}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      );
    case 'table':
      return (
        <div className="doc__table-wrap" key={index}>
          <table className="doc__table">
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'note':
      return (
        <p className="doc__note hand" key={index}>
          {block.text}
        </p>
      );
    case 'stamp':
      return (
        <div className="doc__stamp-wrap" key={index}>
          <span className={`stamp ${block.tone === 'ink' ? 'stamp--ink' : ''}`}>{block.text}</span>
        </div>
      );
    case 'divider':
      return <div className="doc__divider" key={index} />;
    case 'signature':
      return (
        <div className="doc__signature" key={index}>
          <p className="doc__signature-name hand">{block.name}</p>
          <p className="doc__signature-role">{block.role}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function DocumentSheet({ document, onClose }: Props) {
  const marks = document.blocks
    .map((block, index) => ({ block, index }))
    .filter((entry): entry is { block: Extract<DocBlock, { type: 'mark' }>; index: number } =>
      entry.block.type === 'mark',
    );
  const markNumbers = new Map<number, number>();
  marks.forEach((entry, order) => markNumbers.set(entry.index, order + 1));

  const exhibitIndex = caseFile.documents.findIndex((doc) => doc.id === document.id);

  return (
    <div className="doc-sheet-wrap">
      <article className="doc-sheet paper" aria-labelledby="doc-title">
        <button className="doc-sheet__close" onClick={onClose} aria-label="Close document">
          <CloseIcon />
        </button>

        <div className="doc-sheet__top mono">
          <span>CASE 14/11-MG-07</span>
          <span>EXHIBIT {String.fromCharCode(65 + exhibitIndex)}</span>
          <span>{document.documentId}</span>
        </div>

        <header className="doc-sheet__head">
          <p className="doc-sheet__subtitle">{document.subtitle}</p>
          <h2 className="doc-sheet__title display" id="doc-title">
            {document.title}
          </h2>
        </header>

        <div className="doc-sheet__body">
          {document.blocks.map((block, index) => renderBlock(block, index, markNumbers))}
        </div>

        {marks.length > 0 && (
          <section className="doc-sheet__notes" aria-label="Margin notes">
            <p className="doc-sheet__notes-label">Margin notes</p>
            <ol>
              {marks.map((entry, order) => (
                <li key={entry.index}>
                  <span className="mono">{order + 1}</span>
                  <p>{entry.block.note}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <footer className="doc-sheet__foot mono">
          <span>Filed in case 14/11-MG-07</span>
          <span>{document.stampDate}</span>
        </footer>
        <span className="doc-sheet__paperclip" aria-hidden="true" />
      </article>
    </div>
  );
}
