import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AuthGuard from '../../components/auth/AuthGuard';
import KpisDashboard from '../../components/dashboard/KpisDashboard';

const DashboardPage = () => {
    return (
        <AuthGuard>
            <DashboardLayout>
                <KpisDashboard />
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bienvenido al Dashboard</h2>
                    <p className="text-gray-600">Aquí podrás gestionar tu tienda.</p>
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default DashboardPage;
