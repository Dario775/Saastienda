import { useState } from 'react';

const useTiendasApi = () => {
    const [loading, setLoading] = useState(false);

    const crearTienda = async (datos) => {
        setLoading(true);
        try {
            // Simulación de obtención de token (ej. desde localStorage o Context)
            const token = localStorage.getItem('authToken') || 'mock_token_123';

            const response = await fetch('/api/v1/tiendas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datos),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear la tienda');
            }

            return { success: true, data };
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        crearTienda,
        loading,
    };
};

export default useTiendasApi;
