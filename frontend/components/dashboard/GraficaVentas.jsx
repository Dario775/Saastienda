import React, { useEffect, useState } from 'react';
import useAnaliticaApi from '../../lib/services/useAnaliticaApi';

const GraficaVentas = () => {
    const { getVentasMensuales, isLoading, error, data } = useAnaliticaApi();
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const cargarVentas = async () => {
            const result = await getVentasMensuales();
            if (result.success) {
                setVentas(result.data);
            }
        };
        cargarVentas();
    }, []);

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-64">
                <p className="text-red-600">Error al cargar datos de ventas: {error}</p>
            </div>
        );
    }

    // Encontrar el valor máximo para escalar las barras
    const maxVentas = ventas.length > 0 ? Math.max(...ventas.map(v => v.total_ventas)) : 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Ventas Mensuales</h3>

            {ventas.length > 0 ? (
                <div className="flex items-end justify-between h-64 space-x-2">
                    {ventas.map((venta, index) => {
                        // Calcular altura relativa (mínimo 10% para visibilidad)
                        const heightPercentage = maxVentas > 0 ? (venta.total_ventas / maxVentas) * 100 : 0;
                        const displayHeight = Math.max(heightPercentage, 5);

                        return (
                            <div key={index} className="flex flex-col items-center flex-1 group">
                                <div className="relative flex flex-col justify-end w-full h-full">
                                    {/* Tooltip simulado */}
                                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 w-full text-center transition-opacity duration-200">
                                        <span className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                                            ${venta.total_ventas.toLocaleString()}
                                        </span>
                                    </div>
                                    {/* Barra */}
                                    <div
                                        className="w-full bg-indigo-500 rounded-t hover:bg-indigo-600 transition-all duration-300"
                                        style={{ height: `${displayHeight}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600 mt-2 truncate w-full text-center">{venta.mes}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64 text-gray-500">
                    No hay datos de ventas disponibles.
                </div>
            )}
        </div>
    );
};

export default GraficaVentas;
