import { useState } from 'react';

const useProductosApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const crearProducto = async (tiendaId, datosProducto) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Obtener token de localStorage (o donde se guarde)
            const token = localStorage.getItem('authToken');

            const response = await fetch(`/api/v1/tiendas/${tiendaId}/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosProducto),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear el producto');
            }

            setSuccess(true);
            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        crearProducto,
        isLoading,
        error,
        success,
    };
};

export default useProductosApi;
