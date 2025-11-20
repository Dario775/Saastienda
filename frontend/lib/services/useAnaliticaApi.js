import { useState } from 'react';

const useAnaliticaApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getVentasMensuales = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/v1/analitica/ventas_mensuales', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener ventas mensuales');
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
        getVentasMensuales,
        isLoading,
        error,
        data
    };
};

export default useAnaliticaApi;
