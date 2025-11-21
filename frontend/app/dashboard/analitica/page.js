import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AuthGuard from '../../../components/auth/AuthGuard';
import GraficaVentas from '../../../components/dashboard/GraficaVentas';

const AnaliticaPage = () => {
    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analítica de Ventas</h1>
                    <p className="mb-6 text-gray-600">
                        Visualiza el rendimiento de tu tienda a lo largo del tiempo.
                    </p>
                    <GraficaVentas />
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default AnaliticaPage;
