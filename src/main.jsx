import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store, initTheme } from './store';
import { ToastProvider } from 'toasticom';
import App from './App.jsx';
import './index.css';

// GSAP registration
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply saved or system theme on first render
    dispatch(initTheme());

    // Listen to system preference changes (when user toggles OS dark mode)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      dispatch(initTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  return null;
}

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ToastProvider
        config={{
          duration: 4000,
          position: 'top-right',
          showCloseButton: true,
          toastStyle: {
            fontSize: '0.95rem',
            fontWeight: 500,
          },
        }}
      >
        <ThemeInitializer />
        <App />
      </ToastProvider>
    </Provider>
);