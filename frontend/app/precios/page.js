import React from 'react';
import ListaPlanes from '../../components/suscripciones/ListaPlanes';

const PreciosPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <a href="/" className="text-2xl font-bold text-indigo-600">SaasTienda</a>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <a href="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Iniciar Sesión</a>
                            <a href="/register" className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Registrarse</a>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <ListaPlanes />
            </main>
        </div>
    );
};

export default PreciosPage;
