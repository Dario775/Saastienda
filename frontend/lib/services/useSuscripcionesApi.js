import { useState } from 'react';

const useSuscripcionesApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getPlanes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/v1/suscripcion/planes');
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener planes');
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

    const activarPlan = async (planId) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/v1/suscripcion/activar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ plan_id: planId }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al activar el plan');
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

    return {
        getPlanes,
        activarPlan,
        isLoading,
        error,
        data
    };
};

export default useSuscripcionesApi;
