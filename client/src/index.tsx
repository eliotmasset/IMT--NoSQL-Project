import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './imports/ui/App.tsx';

const container = document.querySelector('#app')!;
const root = createRoot(container);
root.render(<App />);