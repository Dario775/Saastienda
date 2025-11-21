'use client';

import React, { useEffect, useState } from 'react';
import useTiendaPublicaApi from '../../../lib/services/useTiendaPublicaApi';
import TarjetaProducto from '../../../components/tienda/TarjetaProducto';
import BarraDeBusqueda from '../../../components/tienda/BarraDeBusqueda';

const TiendaPage = ({ params }) => {
    const { slug } = params;
    const { getProductosPublicos, isLoading, error, data } = useTiendaPublicaApi();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (slug) {
            const cargarProductos = async () => {
                const result = await getProductosPublicos(slug);
                if (result.success) {
                    setProductos(result.data);
                }
            };
            cargarProductos();
        }
    }, [slug]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Simulado */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">Tienda: {slug}</h1>
                    <nav>
                        <a href="/" className="text-gray-500 hover:text-gray-700">Volver al Inicio</a>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <BarraDeBusqueda />
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 py-8">
                        <p>Error al cargar la tienda: {error}</p>
                    </div>
                ) : productos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productos.map((producto) => (
                            <TarjetaProducto key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>No hay productos disponibles en esta tienda.</p>
                    </div>
                )}
            </main>

            {/* Footer Simulado */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} SaasTienda. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default TiendaPage;
