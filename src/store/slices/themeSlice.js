import { createSlice } from '@reduxjs/toolkit';

const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialState = () => {
    const saved = localStorage.getItem('theme');
    const mode = saved && ['light', 'dark', 'system'].includes(saved) ? saved : 'system';

    return {
        mode,
        current: mode === 'system' ? getSystemTheme() : mode,
    };
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: getInitialState(),

    reducers: {
        // Set specific theme mode
        setTheme: (state, action) => {
            const newMode = action.payload; // 'light' | 'dark' | 'system'

            state.mode = newMode;

            if (newMode === 'system') {
                state.current = getSystemTheme();
            } else {
                state.current = newMode;
            }

            // Apply to document
            document.documentElement.classList.toggle('dark', state.current === 'dark');

            // Persist
            localStorage.setItem('theme', newMode);
        },

        // Toggle between light ↔ dark (respects system when switching back)
        toggleTheme: (state) => {
            if (state.mode === 'system') {
                // If currently following system → switch to explicit opposite
                state.mode = state.current === 'dark' ? 'light' : 'dark';
                state.current = state.mode;
            } else {
                // Normal toggle
                state.mode = state.current === 'dark' ? 'light' : 'dark';
                state.current = state.mode;
            }

            document.documentElement.classList.toggle('dark', state.current === 'dark');
            localStorage.setItem('theme', state.mode);
        },

        // Initialize / sync on app load
        initTheme: (state) => {
            const saved = localStorage.getItem('theme');
            const mode = saved && ['light', 'dark', 'system'].includes(saved) ? saved : 'system';

            state.mode = mode;
            state.current = mode === 'system' ? getSystemTheme() : mode;

            document.documentElement.classList.toggle('dark', state.current === 'dark');
        },
    },
});

export const { setTheme, toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;