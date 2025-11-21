import { useState } from 'react';

const useWebhooksApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const sendPaymentWebhook = async (ordenId, estado) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch('/api/v1/webhooks/pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orden_id: ordenId, estado: estado }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Error al enviar el webhook');
            }

            setSuccess(true);
            return { success: true, data: responseData };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        sendPaymentWebhook,
        isLoading,
        error,
        success
    };
};

export default useWebhooksApi;
