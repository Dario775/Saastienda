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
