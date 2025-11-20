import React from 'react';

const TarjetaProducto = ({ producto }) => {
    const handleAddToCart = () => {
        // Placeholder for add to cart logic
        console.log('Añadir al carrito:', producto.nombre);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Imagen simulada */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">📷</span>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{producto.nombre}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{producto.descripcion || 'Sin descripción disponible.'}</p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-indigo-600">${producto.precio}</span>
                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarjetaProducto;
