import React from 'react';
import Link from 'next/link';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-600">SaaS Tienda</h1>
                </div>
                <nav className="mt-6">
                    <Link href="/dashboard/metrics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700">
                        Métricas
                    </Link>
                    <Link href="/dashboard/products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700">
                        Productos
                    </Link>
                    <Link href="/dashboard/orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700">
                        Órdenes
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
