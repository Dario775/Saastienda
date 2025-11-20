import React, { useEffect } from 'react';
import useMetricsApi from '../../lib/services/useMetricsApi';

const KpisDashboard = () => {
    const { getMetricsDashboard, data, isLoading, error } = useMetricsApi();

    useEffect(() => {
        getMetricsDashboard();
    }, []);

    if (isLoading) {
        return (
            <div className="p-4 bg-white shadow rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p>Error al cargar métricas: {error}</p>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">MRR (Ingreso Recurrente Mensual)</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                    ${data.mrr.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Churn Rate (Tasa de Cancelación)</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                    {(data.churnRate * 100).toFixed(1)}%
                </p>
            </div>
        </div>
    );
};

export default KpisDashboard;
