import React, { useState } from 'react';

// Simulación del hook useCart (en una app real, esto vendría de un contexto)
const useCart = () => {
    const addToCart = (producto, cantidad) => {
        console.log(`Producto añadido al carrito: ${producto.nombre}, Cantidad: ${cantidad}`);
        alert(`Producto "${producto.nombre}" añadido al carrito.`);
    };
    return { addToCart };
};

const DetalleProducto = ({ producto }) => {
    const { addToCart } = useCart();
    const [cantidad, setCantidad] = useState(1);

    if (!producto) {
        return <div className="text-center py-10">Cargando producto...</div>;
    }

    const handleAddToCart = () => {
        addToCart(producto, cantidad);
    };

    const stockStatus = producto.stock > 0
        ? { text: 'En Stock', color: 'text-green-600', bg: 'bg-green-100' }
        : { text: 'Agotado', color: 'text-red-600', bg: 'bg-red-100' };

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-2xl leading-6 font-bold text-gray-900">
                    {producto.nombre}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {producto.categoria || 'Categoría General'}
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Precio
                        </dt>
                        <dd className="mt-1 text-2xl font-semibold text-gray-900 sm:mt-0 sm:col-span-2">
                            ${producto.precio}
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Descripción
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {producto.descripcion || 'Sin descripción disponible.'}
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Disponibilidad
                        </dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                                {stockStatus.text} ({producto.stock} disponibles)
                            </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                        <dt className="text-sm font-medium text-gray-500">
                            Cantidad
                        </dt>
                        <dd className="mt-1 sm:mt-0 sm:col-span-2 flex items-center space-x-3">
                            <button
                                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                disabled={cantidad <= 1}
                            >
                                -
                            </button>
                            <span className="text-gray-900 font-medium">{cantidad}</span>
                            <button
                                onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                                disabled={cantidad >= producto.stock}
                            >
                                +
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-end">
                <button
                    onClick={handleAddToCart}
                    disabled={producto.stock === 0}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${producto.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                    {producto.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
            </div>
        </div>
    );
};

export default DetalleProducto;
