# Estructura del Frontend (Next.js)

Este documento define la estructura de carpetas de alto nivel para el frontend de nuestro SaaS, diseñada para escalabilidad y mantenimiento.

## Carpetas Esenciales

### `pages/` (Rutas)
Contiene las vistas de la aplicación que corresponden a rutas URL específicas. En Next.js, la estructura de archivos aquí define el enrutamiento.
- **Propósito SaaS**: Separar claramente las páginas públicas (Landing, Login) de las privadas (Dashboard, Configuración).
- *Ejemplo*: `pages/dashboard/index.jsx` -> `/dashboard`.

### `components/` (Componentes Reutilizables)
Almacena los bloques de construcción de la interfaz de usuario. Se organiza por dominios o funcionalidad.
- **Propósito SaaS**: Mantener la consistencia visual y reducir la duplicación de código. Los componentes deben ser agnósticos de la lógica de negocio compleja cuando sea posible.
- *Ejemplo*: `components/tiendas/ConfiguracionTienda.jsx`, `components/ui/Button.jsx`.

### `styles/` (Hojas de Estilo)
Contiene archivos CSS globales, módulos CSS o configuraciones de librerías de estilos (como Tailwind o Sass).
- **Propósito SaaS**: Centralizar la definición de temas (colores, tipografía) para facilitar el "whitelabeling" o cambios de marca futuros.

### `hooks/` (Lógica de Estado Personalizada)
Hooks de React personalizados para encapsular lógica de estado compleja y reutilizable.
- **Propósito SaaS**: Abstraer la lógica de negocio del UI. Por ejemplo, un hook `useStore` que maneje la carga de datos de la tienda y el estado de carga.

### `lib/` o `services/` (Lógica de Llamadas a API)
Funciones y clases para interactuar con el Backend (API REST).
- **Propósito SaaS**: Desacoplar los componentes de la implementación específica de la red. Aquí se configuran los clientes HTTP (Axios/Fetch) y se manejan los tokens de autenticación.
