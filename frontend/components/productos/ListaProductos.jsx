import React, { useEffect, useState } from 'react';
import useProductosApi from '../../lib/services/useProductosApi';

const ListaProductos = () => {
    const { getProductos, deleteProducto, isLoading, error, data } = useProductosApi();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const result = await getProductos();
        if (result.success) {
            setProductos(result.data);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            const result = await deleteProducto(id);
            if (result.success) {
                // Recargar la lista o filtrar el estado local
                setProductos(productos.filter(p => p.id !== id));
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const handleEdit = (id) => {
        // Lógica de navegación a edición o apertura de modal
        console.log('Editar producto', id);
        // Ejemplo: router.push(`/productos/editar/${id}`);
    };

    const handleAdd = () => {
        // Lógica de navegación a creación
        console.log('Añadir producto');
        // Ejemplo: router.push('/productos/crear');
    };

    if (isLoading && productos.length === 0) {
        return <div className="p-4 text-center">Cargando productos...</div>;
    }

    if (error && productos.length === 0) {
        return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Inventario de Productos</h2>
                <button
                    onClick={handleAdd}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                    Añadir Producto
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {producto.nombre}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">${producto.precio}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span
                                            className={`relative inline-block px-3 py-1 font-semibold leading-tight ${producto.stock > 0 ? 'text-green-900' : 'text-red-900'
                                                }`}
                                        >
                                            <span
                                                aria-hidden
                                                className={`absolute inset-0 opacity-50 rounded-full ${producto.stock > 0 ? 'bg-green-200' : 'bg-red-200'
                                                    }`}
                                            ></span>
                                            <span className="relative">{producto.stock}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        <button
                                            onClick={() => handleEdit(producto.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(producto.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    No hay productos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaProductos;
