import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import AuthGuard from '../../../../components/auth/AuthGuard';
import ConfiguracionDominio from '../../../../components/dashboard/ConfiguracionDominio';

const DominioPage = () => {
    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Configuración de Dominio</h1>
                    <ConfiguracionDominio />
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default DominioPage;
