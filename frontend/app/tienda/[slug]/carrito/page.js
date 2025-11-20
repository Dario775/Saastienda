'use client';

import React from 'react';
import CarritoDeCompras from '../../../../components/tienda/CarritoDeCompras';

const CarritoPage = ({ params }) => {
    const { slug } = params;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">Tienda: {slug}</h1>
                    <nav>
                        <a href={`/tienda/${slug}`} className="text-gray-500 hover:text-gray-700">Volver a Productos</a>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <CarritoDeCompras />
            </main>
        </div>
    );
};

export default CarritoPage;
