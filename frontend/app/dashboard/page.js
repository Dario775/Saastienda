import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bienvenido al Dashboard</h2>
                <p className="text-gray-600">Aquí se verán los KPIs (MRR, Churn Rate)</p>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
