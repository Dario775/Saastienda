# Referencia de API

Esta documentación detalla los endpoints disponibles en la plataforma SaaS.

## Tiendas

### Crear Producto

Permite al dueño de una tienda agregar un nuevo producto a su catálogo.

- **URL**: `/api/v1/tiendas/{tienda_id}/productos`
- **Método**: `POST`
- **Autenticación**: Requiere `Bearer Token` del usuario dueño de la tienda.

#### Parámetros (JSON Body)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `nombre` | string | Sí | Nombre del producto. |
| `descripcion` | string | No | Descripción detallada del producto. |
| `precio` | float | Sí | Precio unitario del producto. |
| `stock` | integer | Sí | Cantidad inicial disponible en inventario. |

#### Respuestas Posibles

**201 Created**

El producto fue creado exitosamente.

```json
{
  "id": 101,
  "nombre": "Camiseta Vintage",
  "descripcion": "Camiseta de algodón 100% estilo retro.",
  "precio": 25.99,
  "stock": 50,
  "creado_en": "2023-10-27T10:00:00Z"
}
```

**400 Bad Request**

Faltan campos requeridos o los datos son inválidos.

```json
{
  "error": "Bad Request",
  "mensaje": "El campo 'precio' es obligatorio."
}
```

**403 Forbidden**

El usuario autenticado no tiene permisos para crear productos en esta tienda (no es el dueño).

```json
{
  "error": "Forbidden",
  "mensaje": "No tienes permisos para realizar esta acción en la tienda especificada."
}
```

### Listar Productos

Permite listar todos los productos de la tienda del usuario logueado.

- **URL**: `/api/v1/productos`
- **Método**: `GET`
- **Autenticación**: Requiere `Bearer Token` del usuario dueño de la tienda.

#### Respuestas Posibles

**200 OK**

Lista de productos recuperada exitosamente.

```json
[
  {
    "id": 101,
    "nombre": "Camiseta Vintage",
    "precio": 25.99,
    "stock": 50
  },
  {
    "id": 102,
    "nombre": "Pantalón Denim",
    "precio": 45.50,
    "stock": 30
  }
]
```

### Actualizar Producto

Permite actualizar los datos de un producto existente.

- **URL**: `/api/v1/productos/{id}`
- **Método**: `PUT`
- **Autenticación**: Requiere `Bearer Token` del usuario dueño de la tienda.

#### Parámetros (JSON Body)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `nombre` | string | No | Nuevo nombre del producto. |
| `precio` | float | No | Nuevo precio. |
| `stock` | integer | No | Nuevo stock. |

#### Respuestas Posibles

**200 OK**

Producto actualizado exitosamente.

```json
{
  "id": 101,
  "nombre": "Camiseta Vintage Edición Limitada",
  "precio": 29.99,
  "stock": 45
}
```

### Eliminar Producto

Permite eliminar un producto existente.

- **URL**: `/api/v1/productos/{id}`
- **Método**: `DELETE`
- **Autenticación**: Requiere `Bearer Token` del usuario dueño de la tienda.

#### Respuestas Posibles

**204 No Content**

Producto eliminado exitosamente.

### Registrar Dominio Personalizado

Permite al dueño de la tienda registrar un dominio personalizado.

- **URL**: `/api/v1/tiendas/{id}/dominio`
- **Método**: `POST`
- **Autenticación**: Requiere `Bearer Token` del usuario dueño de la tienda.

#### Parámetros (JSON Body)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `nombre_dominio` | string | Sí | El nombre de dominio a registrar (ej: `mitienda.com`). |

#### Respuestas Posibles

**202 Accepted**

La solicitud de registro de dominio ha sido aceptada y la validación está en curso.

```json
{
  "mensaje": "Dominio registrado. Validación en curso.",
  "estado": "PENDIENTE"
}
```

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

**403 Forbidden**

El usuario no es el dueño de la tienda.

```json
{
  "error": "Forbidden",
  "mensaje": "No tienes permisos para modificar esta tienda."
}
```

### Obtener Estado de Dominio

Obtiene el estado de la verificación del dominio personalizado.

- **URL**: `/api/v1/tiendas/{id}/dominio`
- **Método**: `GET`
- **Autenticación**: Requiere `Bearer Token` del usuario dueño de la tienda.

#### Respuestas Posibles

**200 OK**

Estado del dominio recuperado exitosamente.

```json
{
  "dominio": "mitienda.com",
  "estado": "VERIFICADO"
}
```

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

**403 Forbidden**

El usuario no es el dueño de la tienda.

```json
{
  "error": "Forbidden",
  "mensaje": "No tienes permisos para ver esta información."
}
```

## Ordenes

### Crear Orden

Permite a un cliente crear una nueva orden de compra.

- **URL**: `/api/v1/ordenes`
- **Método**: `POST`
- **Autenticación**: Requiere `Bearer Token` del usuario cliente.

#### Parámetros (JSON Body)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `fk_tienda` | integer | Sí | ID de la tienda donde se realiza la compra. |
| `fk_usuario_cliente` | integer | Sí | ID del usuario que realiza la compra. |
| `productos` | array | Sí | Lista de productos a comprar. |

**Estructura de `productos`:**

```json
[
  {
    "id_producto": 101,
    "cantidad": 2
  }
]
```

#### Respuestas Posibles

**201 Created**

La orden fue creada exitosamente.

```json
{
  "id": 5001,
  "fk_tienda": 1,
  "fk_usuario_cliente": 20,
  "total": 51.98,
  "estado": "pagado",
  "creado_en": "2023-10-27T10:05:00Z"
}
```

**400 Bad Request**

Inventario insuficiente o datos inválidos.

```json
{
  "error": "Bad Request",
  "mensaje": "Stock insuficiente para el producto 'Camiseta Vintage' (ID: 101)."
}
```

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

### Listar Ordenes

Permite al administrador obtener una lista de todas las órdenes asociadas a su tienda.

- **URL**: `/api/v1/ordenes`
- **Método**: `GET`
- **Autenticación**: Requiere `Bearer Token` del usuario administrador.

#### Respuestas Posibles

**200 OK**

Lista de órdenes recuperada exitosamente.

```json
[
  {
    "id": 5001,
    "fk_tienda": 1,
    "fk_usuario_cliente": 20,
    "total": 51.98,
    "estado": "pagado",
    "creado_en": "2023-10-27T10:05:00Z"
  },
  {
    "id": 5002,
    "fk_tienda": 1,
    "fk_usuario_cliente": 25,
    "total": 120.50,
    "estado": "enviado",
    "creado_en": "2023-10-28T14:30:00Z"
  }
]
```

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

## Autenticación

### Registrar Usuario

Permite crear una nueva cuenta de usuario en la plataforma.

- **URL**: `/api/v1/auth/register`
- **Método**: `POST`
- **Autenticación**: Pública.

#### Parámetros (JSON Body)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `email` | string | Sí | Correo electrónico del usuario. |
| `password` | string | Sí | Contraseña segura. |

#### Respuestas Posibles

**201 Created**

Usuario registrado exitosamente.

```json
{
  "id": 20,
  "email": "usuario@ejemplo.com",
  "creado_en": "2023-10-27T10:10:00Z"
}
```

### Iniciar Sesión

Permite autenticar a un usuario y obtener un token de acceso.

- **URL**: `/api/v1/auth/login`
- **Método**: `POST`
- **Autenticación**: Pública.

#### Parámetros (JSON Body)

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `email` | string | Sí | Correo electrónico del usuario. |
| `password` | string | Sí | Contraseña del usuario. |

#### Respuestas Posibles

**200 OK**

Autenticación exitosa. Devuelve el token de acceso.

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Analítica

### Ventas Mensuales

Obtiene datos históricos de ventas mensuales para la tienda del usuario.

- **URL**: `/api/v1/analitica/ventas_mensuales`
- **Método**: `GET`
- **Autenticación**: Requiere `Bearer Token` del usuario administrador.

#### Respuestas Posibles

**200 OK**

Datos de ventas recuperados exitosamente.

```json
[
  {
    "mes": "Enero",
    "total_ventas": 1500.00
  },
  {
    "mes": "Febrero",
    "total_ventas": 2300.50
  },
  {
    "mes": "Marzo",
    "total_ventas": 1800.00
  }
]
```

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

## Notificaciones

### Listar Notificaciones

Obtiene una lista de notificaciones recientes para la tienda del usuario autenticado.

- **URL**: `/api/v1/notificaciones`
- **Método**: `GET`
- **Autenticación**: Requiere `Bearer Token` del usuario administrador.

#### Respuestas Posibles

**200 OK**

Lista de notificaciones recuperada exitosamente.

```json
[
  {
    "id": 1,
    "mensaje": "Nueva orden recibida #5001",
    "tipo": "orden",
    "leida": false,
    "creado_en": "2023-10-27T10:05:00Z"
  },
  {
    "id": 2,
    "mensaje": "Stock bajo en producto 'Camiseta Vintage'",
    "tipo": "inventario",
    "leida": true,
    "creado_en": "2023-10-26T15:30:00Z"
  }
]
```

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

### Marcar Notificación como Leída

Marca una notificación específica como leída.

- **URL**: `/api/v1/notificaciones/{id}/leer`
- **Método**: `POST`
- **Autenticación**: Requiere `Bearer Token` del usuario administrador.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | integer | ID de la notificación a marcar como leída. |

#### Respuestas Posibles

**204 No Content**

Notificación marcada como leída exitosamente.

**401 Unauthorized**

El usuario no está autenticado.

```json
{
  "error": "Unauthorized",
  "mensaje": "Token de autenticación inválido o ausente."
}
```

**404 Not Found**

La notificación no existe.

```json
{
  "error": "Not Found",
  "mensaje": "Notificación no encontrada."
}
```
