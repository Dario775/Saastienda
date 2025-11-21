import React, { useEffect, useState } from 'react';
import useAnaliticaApi from '../../lib/services/useAnaliticaApi';

const GraficaVentas = () => {
    const { getVentasMensuales, isLoading, error } = useAnaliticaApi();
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const fetchVentas = async () => {
            const result = await getVentasMensuales();
            if (result.success) {
                setVentas(result.data);
            }
        };
        fetchVentas();
    }, []);

    if (isLoading) {
        return (
            <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center h-80">
                <p className="text-red-600">Error al cargar datos de ventas: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Ventas Mensuales
            </h3>
            <div className="h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center p-4 overflow-y-auto">
                <p className="text-gray-500 mb-4 font-medium">Visualización de Gráfica (Simulada)</p>
                <div className="w-full space-y-3">
                    {ventas.length > 0 ? (
                        ventas.map((venta, index) => (
                            <div key={index} className="flex items-center text-sm">
                                <span className="w-20 font-medium text-gray-600">{venta.mes}</span>
                                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="bg-indigo-500 h-full rounded-full"
                                        style={{ width: `${Math.min((venta.total_ventas / 3000) * 100, 100)}%` }}
                                        title={`$${venta.total_ventas}`}
                                    ></div>
                                </div>
                                <span className="w-20 text-right font-semibold text-gray-900">${venta.total_ventas}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 italic text-center">No hay datos disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GraficaVentas;
