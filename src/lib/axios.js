// src/lib/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api', // change to your real backend
    timeout: 10000, // 10 seconds - reasonable for admin panel
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Optional: Add request interceptor (e.g. attach auth token)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or your auth method (zustand/context/etc)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Response interceptor (handle common errors globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Common error handling patterns for admin panels
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const status = error.response.status;

            if (status === 401) {
                // Unauthorized → usually logout + redirect to login
                localStorage.removeItem('token');
                window.location.href = '/login';
                // Or better: use your router/navigate function
            }

            if (status === 403) {
                console.error('Forbidden - you do not have permission');
                // show toast/notification
            }

            if (status === 500) {
                console.error('Server error occurred');
                // show error toast
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error - no response received');
            // show offline toast / retry button etc.
        }

        return Promise.reject(error);
    }
);

export default api;