import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StandaloneMobilePage } from './@mobile/StandaloneMobilePage';
import './index.css';

const RootComponent: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    return path.startsWith('/mobile') || hash.startsWith('#/mobile') || search.includes('view=mobile');
  });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;
      setIsMobileView(path.startsWith('/mobile') || hash.startsWith('#/mobile') || search.includes('view=mobile'));
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  if (isMobileView) {
    return <StandaloneMobilePage />;
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
