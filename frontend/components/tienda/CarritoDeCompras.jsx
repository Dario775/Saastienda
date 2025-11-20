import React from 'react';
import { useCart } from '../../context/CartProvider';

const CarritoDeCompras = () => {
    const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();

    const handleCheckout = () => {
        // Placeholder for checkout logic
        console.log('Iniciando checkout...');
        alert('¡Gracias por tu compra! (Simulación)');
        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
                <a href="../" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                    Volver a la tienda
                </a>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Tu Carrito</h2>
            </div>

            <div className="p-6">
                <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <li key={item.product.id} className="py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{item.product.nombre}</h3>
                                    <p className="text-gray-500 text-sm">Precio unitario: ${item.product.precio}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4 text-gray-600 font-medium">Cant: {item.quantity}</span>
                                <span className="mr-6 text-lg font-bold text-gray-900">
                                    ${(item.product.precio * item.quantity).toFixed(2)}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 border-t border-gray-200 pt-6 flex justify-between items-center">
                    <div>
                        <a href="../" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            &larr; Seguir comprando
                        </a>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600 mb-1">Total General</p>
                        <p className="text-3xl font-bold text-indigo-600">${getCartTotal().toFixed(2)}</p>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors shadow-md"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarritoDeCompras;
