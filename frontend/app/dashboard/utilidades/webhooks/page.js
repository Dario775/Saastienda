import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import AuthGuard from '../../../../components/auth/AuthGuard';
import WebhookSimulator from '../../../../components/dashboard/WebhookSimulator';

const WebhooksPage = () => {
    return (
        <AuthGuard>
            <DashboardLayout>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Simulador de Webhooks</h1>
                    <p className="mb-6 text-gray-600">
                        Utiliza esta herramienta para simular eventos de pago y probar la integración de webhooks.
                    </p>
                    <WebhookSimulator />
                </div>
            </DashboardLayout>
        </AuthGuard>
    );
};

export default WebhooksPage;
