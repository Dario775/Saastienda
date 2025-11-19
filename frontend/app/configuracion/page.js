import React from 'react';
import ConfiguracionTienda from '../../components/tiendas/ConfiguracionTienda';

const ConfiguracionPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Placeholder Layout Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Panel de Dueño</h1>
                </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 bg-white">
                            <ConfiguracionTienda />
                        </div>
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    );
};

export default ConfiguracionPage;
