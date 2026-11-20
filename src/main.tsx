import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/menu.css';
import './styles/folder.css';
import './styles/photos.css';
import './styles/interviews.css';
import './styles/board.css';
import './styles/theory.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
