'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useTiendaPublicaApi from '../../../../../lib/services/useTiendaPublicaApi';
import DetalleProducto from '../../../../../components/tienda/DetalleProducto';

const ProductoPage = () => {
    const params = useParams();
    const { slug, id } = params;
    const { getDetalleProducto, isLoading, error } = useTiendaPublicaApi();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        if (slug && id) {
            const fetchProducto = async () => {
                const result = await getDetalleProducto(slug, id);
                if (result.success) {
                    setProducto(result.data);
                }
            };
            fetchProducto();
        }
    }, [slug, id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-center p-6 bg-white shadow rounded-lg">
                    <p className="text-red-600">Error al cargar el producto: {error}</p>
                </div>
            </div>
        );
    }

    if (!producto) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <DetalleProducto producto={producto} />
            </div>
        </div>
    );
};

export default ProductoPage;
