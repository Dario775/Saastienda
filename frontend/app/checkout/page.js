import React from 'react';
import ComponenteCheckout from '../../components/ordenes/ComponenteCheckout';

const CheckoutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Finalizar Compra</h1>
                </div>
                <ComponenteCheckout />
            </div>
        </div>
    );
};

export default CheckoutPage;
