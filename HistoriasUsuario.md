# Historias de Usuario: Configuración Inicial de la Tienda

Este documento detalla las historias de usuario para el módulo de configuración inicial, enfocadas en la experiencia del Dueño de la Tienda.

## 1. Configurar Nombre de la Tienda
**Como** Dueño de la Tienda,
**Quiero** establecer el nombre oficial de mi negocio,
**Para** que mis clientes puedan identificar mi marca claramente.

**Criterios de Aceptación:**
- El campo de nombre es obligatorio.
- Debe permitir caracteres alfanuméricos y espacios.
- El sistema debe validar que el nombre no esté vacío.
- Al guardar, el nombre debe actualizarse en el encabezado de la tienda inmediatamente.

## 2. Configurar Dominio/Slug Personalizado
**Como** Dueño de la Tienda,
**Quiero** definir una URL personalizada (slug) para mi tienda (ej. `mitienda.saas.com`),
**Para** compartir un enlace fácil de recordar con mis clientes.

**Criterios de Aceptación:**
- El slug debe ser único en toda la plataforma.
- Solo se permiten letras minúsculas, números y guiones.
- El sistema debe verificar la disponibilidad del slug en tiempo real.
- Si el slug ya existe, se debe mostrar un error claro.

## 3. Configurar Métodos de Pago
**Como** Dueño de la Tienda,
**Quiero** seleccionar y conectar mis pasarelas de pago (ej. Stripe, PayPal),
**Para** poder recibir dinero de las ventas que realice.

**Criterios de Aceptación:**
- Debe mostrar una lista de pasarelas soportadas.
- Al seleccionar una pasarela, debe solicitar las claves de API necesarias (Public/Private Keys).
- Debe permitir activar o desactivar métodos de pago con un interruptor (toggle).
- El sistema debe validar que las credenciales ingresadas sean correctas (conexión de prueba).

## 4. Configurar Información de Contacto
**Como** Dueño de la Tienda,
**Quiero** ingresar mi email de soporte, teléfono y dirección física,
**Para** que los clientes puedan contactarme si tienen dudas sobre sus pedidos.

**Criterios de Aceptación:**
- Campos para Email (validación de formato), Teléfono y Dirección.
- Opción para decidir qué datos son visibles públicamente en el pie de página de la tienda.
- El email de soporte puede ser diferente al email de la cuenta de administrador.

## 5. Configurar Moneda y Región
**Como** Dueño de la Tienda,
**Quiero** definir la moneda principal (ej. USD, EUR, MXN) y la zona horaria de mi tienda,
**Para** que los precios y las fechas de las órdenes se muestren correctamente a mi audiencia local.

**Criterios de Aceptación:**
- Selector de moneda con las opciones soportadas por la plataforma.
- Selector de zona horaria estándar.
- Al cambiar la moneda, se debe mostrar una advertencia sobre el impacto en los precios de productos existentes (si aplica).
