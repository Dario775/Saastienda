import React, { useState } from 'react';
import useOrdenesApi from '../../lib/services/useOrdenesApi';

const ComponenteCheckout = () => {
    // Simulación de carrito
    const [carrito] = useState([
        { id_producto: 101, nombre: 'Camiseta Vintage', precio: 25.99, cantidad: 2 },
        { id_producto: 102, nombre: 'Pantalón Denim', precio: 45.00, cantidad: 1 },
    ]);

    const { crearOrden, isLoading, error, success } = useOrdenesApi();

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
    };

    const handlePagar = async () => {
        const orden = {
            fk_tienda: 1, // Simulado
            fk_usuario_cliente: 20, // Simulado
            productos: carrito.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad
            }))
        };

        await crearOrden(orden);
    };

    if (success) {
        return (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-2">¡Pago Exitoso!</h2>
                <p className="text-green-600">Tu orden ha sido procesada correctamente.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Resumen de Compra</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Revisa tus productos antes de pagar.</p>
            </div>

            <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {carrito.map((item) => (
                        <li key={item.id_producto} className="px-4 py-4 sm:px-6 flex justify-between">
                            <div>
                                <p className="text-sm font-medium text-indigo-600">{item.nombre}</p>
                                <p className="text-sm text-gray-500">Cant: {item.cantidad} x ${item.precio}</p>
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                                ${(item.precio * item.cantidad).toFixed(2)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total: ${calcularTotal()}</span>

                <button
                    onClick={handlePagar}
                    disabled={isLoading}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                    {isLoading ? 'Procesando...' : 'Pagar Ahora'}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-t border-red-200">
                    <p className="text-sm text-red-600">Error: {error}</p>
                </div>
            )}
        </div>
    );
};

export default ComponenteCheckout;
