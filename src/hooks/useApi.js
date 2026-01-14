// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import api from '../lib/axios';
import { toast } from 'toasticom';  // ← changed here

export const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = useCallback(() => setError(null), []);

    const request = useCallback(async (method, endpoint, options = {}) => {
        const {
            query = {},
            body = null,
            contentType = 'json',
            showSuccessToast = ['post', 'put', 'patch', 'delete'].includes(method.toLowerCase()),
            successMessage = 'Operation completed successfully',
        } = options;

        setIsLoading(true);
        setError(null);

        try {
            const config = {
                params: method.toLowerCase() === 'get' ? query : undefined,
                headers: {},
            };

            if (contentType === 'form-data' || contentType === 'multipart') {
                config.headers['Content-Type'] = 'multipart/form-data';
            } else if (contentType === 'json') {
                config.headers['Content-Type'] = 'application/json';
            }

            let response;
            const lowerMethod = method.toLowerCase();

            switch (lowerMethod) {
                case 'get':
                    response = await api.get(endpoint, config);
                    break;
                case 'post':
                    response = await api.post(endpoint, body, config);
                    break;
                case 'put':
                    response = await api.put(endpoint, body, config);
                    break;
                case 'patch':
                    response = await api.patch(endpoint, body, config);
                    break;
                case 'delete':
                    response = await api.delete(endpoint, { ...config, data: body });
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }

            // Success toast
            if (showSuccessToast) {
                const msg = successMessage || response.data?.message || 'Success';
                toast('success', msg);
            }

            return {
                data: response.data,
                status: response.status,
                headers: response.headers,
            };
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'An error occurred';

            setError({
                message: errorMessage,
                status: err.response?.status,
                data: err.response?.data,
            });

            // Error toast
            toast('error', errorMessage);

            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        clearError,
        get: (endpoint, query = {}, options = {}) =>
            request('get', endpoint, { ...options, query }),
        post: (endpoint, body, options = {}) =>
            request('post', endpoint, { ...options, body }),
        put: (endpoint, body, options = {}) =>
            request('put', endpoint, { ...options, body }),
        patch: (endpoint, body, options = {}) =>
            request('patch', endpoint, { ...options, body }),
        delete: (endpoint, body = null, options = {}) =>
            request('delete', endpoint, { ...options, body }),
        request, // raw access if needed
    };
};