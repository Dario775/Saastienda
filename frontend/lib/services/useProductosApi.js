import { useState } from 'react';

const useProductosApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [data, setData] = useState(null);

    const crearProducto = async (tiendaId, datosProducto) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/v1/tiendas/${tiendaId}/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosProducto),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al crear el producto');
            }

            setSuccess(true);
            return { success: true, data: responseData };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const getProductos = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/v1/productos', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseData = await response.json();
            if (!response.ok) throw new Error(responseData.message || 'Error al obtener productos');
            setData(responseData);
            return { success: true, data: responseData };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const updateProducto = async (id, datos) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/v1/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datos),
            });
            const responseData = await response.json();
            if (!response.ok) throw new Error(responseData.message || 'Error al actualizar producto');
            setSuccess(true);
            return { success: true, data: responseData };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProducto = async (id) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/v1/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Error al eliminar producto');
            setSuccess(true);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        crearProducto,
        getProductos,
        updateProducto,
        deleteProducto,
        isLoading,
        error,
        success,
        data
    };
};

export default useProductosApi;
