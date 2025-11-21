import React, { useState } from 'react';
import useTiendaPublicaApi from '../../lib/services/useTiendaPublicaApi';
import TarjetaProducto from './TarjetaProducto';
import { useParams } from 'next/navigation';

const BarraDeBusqueda = () => {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const { buscarProductos, isLoading, error } = useTiendaPublicaApi();
    const params = useParams();
    const tiendaSlug = params.slug;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const result = await buscarProductos(tiendaSlug, query);
        if (result.success) {
            setResultados(result.data);
        } else {
            setResultados([]);
        }
        setBusquedaRealizada(true);
    };

    return (
        <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && (
                <div className="text-red-600 mb-4">
                    Error: {error}
                </div>
            )}

            {busquedaRealizada && (
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Resultados de búsqueda: {resultados.length} encontrados
                    </h3>
                    {resultados.length > 0 ? (
                        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {resultados.map((producto) => (
                                <TarjetaProducto key={producto.id} producto={producto} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BarraDeBusqueda;
