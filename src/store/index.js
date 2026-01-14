import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import adminReducer from './slices/AdminSlice';

// Export store + actions for easier imports
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    admin: adminReducer,
  },
  // Optional: add middleware, devTools config, etc. later
});

// Re-export actions (optional but recommended pattern)
export { setTheme, toggleTheme, initTheme } from './slices/themeSlice';