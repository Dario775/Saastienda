import React from 'react';
import AuthGuard from '../../../components/auth/AuthGuard';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import GraficaVentas from '../../../components/dashboard/GraficaVentas';

const AnaliticaPage = () => {
    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Analítica de Ventas</h1>
                    <div className="grid grid-cols-1 gap-6">
                        <GraficaVentas />
                    </div>
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default AnaliticaPage;
