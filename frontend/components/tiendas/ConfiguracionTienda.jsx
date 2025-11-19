import React, { useState } from 'react';

const ConfiguracionTienda = () => {
  const [nombreTienda, setNombreTienda] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guardando configuración para:', nombreTienda);
    // Aquí iría la lógica de llamada a la API (services/tiendas.js)
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Configuración de Tienda</h1>
      
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

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ConfiguracionTienda;
