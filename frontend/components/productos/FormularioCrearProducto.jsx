import React, { useState } from 'react';
import useProductosApi from '../../lib/services/useProductosApi';

const FormularioCrearProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const { crearProducto, isLoading, error, success } = useProductosApi();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulación de ID de tienda (esto vendría de params o context)
        const tiendaId = 1;

        const datosProducto = {
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            descripcion
        };

        await crearProducto(tiendaId, datosProducto);
    };

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Agregar Nuevo Producto
            </h3>

            {success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">¡Éxito!</strong>
                    <span className="block sm:inline"> Producto creado correctamente.</span>
                </div>
            )}

            {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre del Producto
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                        Precio
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            name="precio"
                            id="precio"
                            required
                            min="0"
                            step="0.01"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock Inicial
                    </label>
                    <div className="mt-1">
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            required
                            min="0"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            rows={3}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {isLoading ? 'Guardando...' : 'Crear Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCrearProducto;
