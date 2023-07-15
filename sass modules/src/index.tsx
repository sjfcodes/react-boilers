import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

const App = lazy(() => import('./App'));

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <Suspense fallback={<p>loading</p>}>
      <App />
    </Suspense>
  </StrictMode>,
);
