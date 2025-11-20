import { useState } from 'react';

const useOrdenesApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const crearOrden = async (datosOrden) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('authToken') || 'mock_token_cliente';

            const response = await fetch('/api/v1/ordenes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosOrden),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al procesar la orden');
            }

            setSuccess(true);
            return { success: true, data };
        } catch (err) {
            console.error('API Error:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        crearOrden,
        isLoading,
        error,
        success,
    };
};

export default useOrdenesApi;
