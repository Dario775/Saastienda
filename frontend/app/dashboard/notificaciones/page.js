import React from 'react';
import AuthGuard from '../../../components/auth/AuthGuard';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import ListaNotificaciones from '../../../components/dashboard/ListaNotificaciones';

const NotificacionesPage = () => {
    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Notificaciones</h1>
                    <ListaNotificaciones />
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default NotificacionesPage;
