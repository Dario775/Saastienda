import React, { useEffect, useState } from 'react';
import useNotificacionesApi from '../../lib/services/useNotificacionesApi';

const ListaNotificaciones = () => {
    const { getNotificaciones, marcarComoLeida, isLoading, error } = useNotificacionesApi();
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        cargarNotificaciones();
    }, []);

    const cargarNotificaciones = async () => {
        const result = await getNotificaciones();
        if (result.success) {
            setNotificaciones(result.data);
        }
    };

    const handleMarcarLeida = async (id) => {
        const result = await marcarComoLeida(id);
        if (result.success) {
            // Refrescar la lista después de marcar como leída
            await cargarNotificaciones();
        } else {
            alert('Error al marcar notificación: ' + result.error);
        }
    };

    if (isLoading && notificaciones.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    if (error && notificaciones.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-red-600 text-center">Error al cargar notificaciones: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Notificaciones</h2>
            </div>

            <div className="divide-y divide-gray-200">
                {notificaciones.length > 0 ? (
                    notificaciones.map((notificacion) => (
                        <div
                            key={notificacion.id}
                            className={`p-4 hover:bg-gray-50 transition-colors ${!notificacion.leida ? 'bg-blue-50' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {!notificacion.leida && (
                                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                        )}
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${notificacion.tipo === 'orden'
                                                    ? 'bg-green-100 text-green-800'
                                                    : notificacion.tipo === 'inventario'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-purple-100 text-purple-800'
                                                }`}
                                        >
                                            {notificacion.tipo}
                                        </span>
                                    </div>
                                    <p className="text-gray-800 font-medium">{notificacion.mensaje}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(notificacion.creado_en).toLocaleString('es-ES', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                {!notificacion.leida && (
                                    <button
                                        onClick={() => handleMarcarLeida(notificacion.id)}
                                        disabled={isLoading}
                                        className="ml-4 px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors disabled:opacity-50"
                                    >
                                        Marcar como leída
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No hay notificaciones disponibles.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListaNotificaciones;
