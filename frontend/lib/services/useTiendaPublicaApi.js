import { useState } from 'react';

const useTiendaPublicaApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getProductosPublicos = async (tiendaSlug) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/v1/tienda/${tiendaSlug}/productos`);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener productos de la tienda');
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

    const getDetalleProducto = async (tiendaSlug, productoId) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/v1/tienda/${tiendaSlug}/productos/${productoId}`);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al obtener el detalle del producto');
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
        getProductosPublicos,
        getDetalleProducto,
        isLoading,
        error,
        data
    };
};

export default useTiendaPublicaApi;
