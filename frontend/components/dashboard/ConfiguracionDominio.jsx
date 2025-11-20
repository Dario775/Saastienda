import React, { useState, useEffect } from 'react';
import useTiendasApi from '../../lib/services/useTiendasApi';

const ConfiguracionDominio = ({ tiendaId = 1 }) => {
    const [dominioInput, setDominioInput] = useState('');
    const [estadoDominio, setEstadoDominio] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const { registerDominio, getDominioStatus, isLoading, error } = useTiendasApi();

    useEffect(() => {
        cargarEstadoDominio();
    }, [tiendaId]);

    const cargarEstadoDominio = async () => {
        const result = await getDominioStatus(tiendaId);
        if (result.success) {
            setEstadoDominio(result.data);
            if (result.data.dominio) {
                setDominioInput(result.data.dominio);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        const result = await registerDominio(tiendaId, dominioInput);

        if (result.success) {
            setMensaje(result.data.mensaje);
            setEstadoDominio({
                dominio: dominioInput,
                estado: result.data.estado
            });
        } else {
            setMensaje('Error al registrar el dominio.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'VERIFICADO': return 'text-green-600 bg-green-100';
            case 'PENDIENTE': return 'text-yellow-600 bg-yellow-100';
            case 'FALLIDO': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dominio Personalizado</h3>

            <div className="mb-6">
                <p className="text-sm text-gray-500 mb-4">
                    Conecta tu propio dominio (ej. mitienda.com) a tu tienda SaaS.
                </p>

                {estadoDominio && estadoDominio.estado && (
                    <div className={`p-4 rounded-md mb-4 flex items-center justify-between ${getStatusColor(estadoDominio.estado)}`}>
                        <div>
                            <span className="font-bold block">Estado: {estadoDominio.estado}</span>
                            <span className="text-sm">Dominio: {estadoDominio.dominio}</span>
                        </div>
                        {estadoDominio.estado === 'PENDIENTE' && (
                            <button
                                onClick={cargarEstadoDominio}
                                className="text-sm underline hover:text-yellow-800"
                            >
                                Actualizar estado
                            </button>
                        )}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="dominio" className="block text-sm font-medium text-gray-700">
                        Nombre de Dominio
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            https://
                        </span>
                        <input
                            type="text"
                            name="dominio"
                            id="dominio"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="www.ejemplo.com"
                            value={dominioInput}
                            onChange={(e) => setDominioInput(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                )}

                {mensaje && (
                    <div className="text-green-600 text-sm">{mensaje}</div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Procesando...' : 'Guardar Dominio'}
                </button>
            </form>
        </div>
    );
};

export default ConfiguracionDominio;
