import { useState } from 'react';

const useMetricsApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getMetricsDashboard = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulación de llamada a API
            // const response = await fetch('/api/v1/metrics/dashboard', {
            //   headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            //   }
            // });

            // Simulación de delay de red
            await new Promise(resolve => setTimeout(resolve, 800));

            // Datos simulados
            const simulatedData = {
                mrr: 15500.50,
                churnRate: 0.04,
                activeCustomers: 1250,
                newCustomers: 45
            };

            setData(simulatedData);
            return { success: true, data: simulatedData };

        } catch (err) {
            setError(err.message || 'Error al cargar métricas');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getMetricsDashboard,
        isLoading,
        error,
        data
    };
};

export default useMetricsApi;
