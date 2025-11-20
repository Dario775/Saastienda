import { useState } from 'react';

const useNotificacionesApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getNotificaciones = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/v1/notificaciones', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener notificaciones');
            }

            setData(responseData);
            return { success: true, data: responseData };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const marcarComoLeida = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/v1/notificaciones/${id}/leer`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Error al marcar notificación como leída');
            }

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getNotificaciones,
        marcarComoLeida,
        isLoading,
        error,
        data
    };
};

export default useNotificacionesApi;
