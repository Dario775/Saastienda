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
