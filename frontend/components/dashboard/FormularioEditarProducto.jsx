import React, { useState, useEffect } from 'react';
import useProductosApi from '../../lib/services/useProductosApi';

const FormularioEditarProducto = ({ producto, onCancel, onSuccess }) => {
    const { updateProducto, deleteProducto, isLoading, error } = useProductosApi();

    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });

    useEffect(() => {
        if (producto) {
            setFormData({
                nombre: producto.nombre || '',
                precio: producto.precio || '',
                stock: producto.stock || ''
            });
        }
    }, [producto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateProducto(producto.id, {
            ...formData,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock)
        });
        if (result.success) {
            if (onSuccess) onSuccess();
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            const result = await deleteProducto(producto.id);
            if (result.success) {
                if (onSuccess) onSuccess();
            }
        }
    };

    if (!producto) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Editar Producto</h3>
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                        Precio
                    </label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        step="0.01"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-150 ease-in-out"
                        >
                            {isLoading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-150 ease-in-out"
                        >
                            {isLoading ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormularioEditarProducto;
