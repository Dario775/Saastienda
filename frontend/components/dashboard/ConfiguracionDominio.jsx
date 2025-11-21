import React, { useState, useEffect } from 'react';
import useTiendasApi from '../../lib/services/useTiendasApi';

const ConfiguracionDominio = () => {
    const [nombreDominio, setNombreDominio] = useState('');
    const [estadoDominio, setEstadoDominio] = useState('PENDIENTE'); // PENDIENTE, VERIFICADO, FALLIDO
    const { registerDominio, getDominioStatus, isLoading, error, data } = useTiendasApi();
    const tiendaId = 1; // Simulación: ID de la tienda actual

    useEffect(() => {
        const fetchStatus = async () => {
            const result = await getDominioStatus(tiendaId);
            if (result.success && result.data.dominio) {
                setNombreDominio(result.data.dominio);
                setEstadoDominio(result.data.estado);
            }
        };
        fetchStatus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerDominio(tiendaId, nombreDominio);
        if (result.success) {
            setEstadoDominio(result.data.estado);
            alert('Dominio registrado correctamente. Estado: ' + result.data.estado);
        } else {
            setEstadoDominio('FALLIDO');
            alert('Error al registrar dominio: ' + result.error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'VERIFICADO': return 'text-green-600 bg-green-100';
            case 'FALLIDO': return 'text-red-600 bg-red-100';
            default: return 'text-yellow-600 bg-yellow-100';
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Configuración de Dominio Personalizado
            </h3>
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Conecta tu propio dominio a tu tienda (ej. mitienda.com).
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="dominio" className="block text-sm font-medium text-gray-700">
                        Nombre del Dominio
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            https://
                        </span>
                        <input
                            type="text"
                            id="dominio"
                            value={nombreDominio}
                            onChange={(e) => setNombreDominio(e.target.value)}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="www.ejemplo.com"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="mr-2 text-sm text-gray-700">Estado:</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(estadoDominio)}`}>
                            {estadoDominio}
                        </span>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {isLoading ? 'Procesando...' : 'Guardar Dominio'}
                    </button>
                </div>
                {error && (
                    <div className="text-red-600 text-sm mt-2">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ConfiguracionDominio;
