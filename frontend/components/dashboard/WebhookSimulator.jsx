import React, { useState } from 'react';
import useWebhooksApi from '../../lib/services/useWebhooksApi';

const WebhookSimulator = () => {
    const { sendPaymentWebhook, isLoading } = useWebhooksApi();
    const [ordenId, setOrdenId] = useState('');
    const [estado, setEstado] = useState('PAGADO');
    const [mensaje, setMensaje] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);

        if (!ordenId) {
            setMensaje({ type: 'error', text: 'Por favor ingresa un ID de orden.' });
            return;
        }

        const result = await sendPaymentWebhook(ordenId, estado);

        if (result.success) {
            setMensaje({ type: 'success', text: result.data.mensaje || 'Webhook enviado exitosamente.' });
        } else {
            setMensaje({ type: 'error', text: result.error || 'Error al enviar el webhook.' });
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Simulador de Webhooks de Pago
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="ordenId" className="block text-sm font-medium text-gray-700">
                        ID de Orden
                    </label>
                    <input
                        type="text"
                        id="ordenId"
                        value={ordenId}
                        onChange={(e) => setOrdenId(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: 5001"
                    />
                </div>
                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                        Estado del Pago
                    </label>
                    <select
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="PAGADO">PAGADO</option>
                        <option value="FALLIDO">FALLIDO</option>
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Enviando...' : 'Enviar Webhook'}
                    </button>
                </div>
            </form>
            {mensaje && (
                <div className={`mt-4 p-4 rounded-md ${mensaje.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mensaje.text}
                </div>
            )}
        </div>
    );
};

export default WebhookSimulator;
