import React, { useState } from 'react';
import useTiendasApi from '../../lib/services/useTiendasApi';

const ConfiguracionTienda = () => {
    const [nombreTienda, setNombreTienda] = useState('');
    const [slug, setSlug] = useState('');
    const { crearTienda, loading } = useTiendasApi();
    const [mensaje, setMensaje] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);

        const resultado = await crearTienda({ nombre: nombreTienda, url_slug: slug });

        if (resultado.success) {
            setMensaje({ type: 'success', text: '¡Tienda creada con éxito!' });
            console.log('Tienda creada:', resultado.data);
        } else {
            setMensaje({ type: 'error', text: `Error: ${resultado.error}` });
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Configuración de Tienda</h1>

            {mensaje && (
                <div className={`p-3 mb-4 rounded ${mensaje.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mensaje.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre de la Tienda
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombreTienda}
                        onChange={(e) => setNombreTienda(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        placeholder="Ej. Mi Tienda Genial"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                        URL Slug
                    </label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        placeholder="ej. mi-tienda-genial"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </form>
        </div>
    );
};

export default ConfiguracionTienda;
