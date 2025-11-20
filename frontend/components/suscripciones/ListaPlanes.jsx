import React, { useEffect, useState } from 'react';
import useSuscripcionesApi from '../../lib/services/useSuscripcionesApi';

const ListaPlanes = () => {
    const { getPlanes, isLoading, error, data } = useSuscripcionesApi();
    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        const fetchPlanes = async () => {
            const result = await getPlanes();
            if (result.success) {
                setPlanes(result.data);
            }
        };
        fetchPlanes();
    }, []);

    const handleSubscribe = (planId) => {
        console.log(`Suscribiéndose al plan ${planId}`);
        // Aquí iría la lógica de redirección a checkout o modal de pago
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-6 bg-red-50 rounded-lg">
                <p className="text-red-600">Error al cargar planes: {error}</p>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Planes de Suscripción
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Elige el plan perfecto para tu negocio
                    </p>
                </div>

                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                    {planes && planes.length > 0 ? (
                        planes.map((plan) => (
                            <div key={plan.id} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white flex flex-col">
                                <div className="p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.nombre}</h3>
                                    <p className="mt-4 text-sm text-gray-500">{plan.descripcion}</p>
                                    <p className="mt-8">
                                        <span className="text-4xl font-extrabold text-gray-900">${plan.precio}</span>
                                        <span className="text-base font-medium text-gray-500">/mes</span>
                                    </p>
                                </div>
                                <div className="pt-6 pb-8 px-6 flex-1 flex flex-col justify-end">
                                    <ul className="mt-6 space-y-4">
                                        {plan.caracteristicas && plan.caracteristicas.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <p className="ml-3 text-base text-gray-700">{feature}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8">
                                        <button
                                            onClick={() => handleSubscribe(plan.id)}
                                            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                        >
                                            Suscribirse
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">
                            No hay planes disponibles en este momento.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListaPlanes;
