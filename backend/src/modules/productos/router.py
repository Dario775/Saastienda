from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from .schemas import ProductoCreate, ProductoOut
from datetime import datetime

router = APIRouter()

# Simulación de dependencia de autenticación
def get_current_user(token: str = "mock_token"):
    # En un caso real, esto validaría el token JWT
    return {"id": 1, "username": "dueno_tienda"}

# Simulación de base de datos
fake_products_db = []
fake_stores_db = {
    1: {"id": 1, "owner_id": 1, "name": "Mi Tienda"}
}

@router.post("/tiendas/{tienda_id}/productos", response_model=ProductoOut, status_code=status.HTTP_201_CREATED)
def create_product(
    tienda_id: int,
    producto: ProductoCreate,
    current_user: dict = Depends(get_current_user)
):
    # 1. Verificar si la tienda existe
    if tienda_id not in fake_stores_db:
        raise HTTPException(status_code=404, detail="Tienda no encontrada")

    store = fake_stores_db[tienda_id]

    # 2. Verificar autorización (si el usuario es dueño de la tienda)
    if store["owner_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para agregar productos a esta tienda")

    # 3. Crear el producto (Simulación de inserción en DB)
    new_product_id = len(fake_products_db) + 101
    new_product = {
        "id": new_product_id,
        **producto.dict(),
        "creado_en": datetime.now()
    }
    fake_products_db.append(new_product)

    return new_product

@router.get("/productos", response_model=List[ProductoOut])
def list_products(current_user: dict = Depends(get_current_user)):
    # 1. Identificar la tienda del usuario (Simulación: usuario 1 es dueño de tienda 1)
    # En un caso real, buscaríamos la tienda asociada al usuario
    tienda_id = 1 
    if fake_stores_db[tienda_id]["owner_id"] != current_user["id"]:
         return [] # O lanzar error si no tiene tienda

    # 2. Filtrar productos de esa tienda (Simulación: todos los productos en fake_products_db son de la tienda 1 para este ejemplo, 
    # pero en realidad deberíamos tener un fk_tienda en el producto. 
    # Para este ejercicio asumiremos que fake_products_db es global pero filtraremos si tuvieramos el campo, 
    # como no lo tenemos en el schema original, devolveremos todos los de la DB simulada asumiendo que son de él).
    # *Corrección*: El endpoint POST anterior no guardaba fk_tienda en el producto. 
    # Para ser consistentes con la solicitud, devolveremos la lista completa simulada.
    return fake_products_db

@router.put("/productos/{product_id}", response_model=ProductoOut)
def update_product(
    product_id: int,
    producto_update: ProductoCreate, # Usamos Create para simplificar o el nuevo Update si se prefiere parcial
    current_user: dict = Depends(get_current_user)
):
    # 1. Buscar el producto
    product_index = next((index for (index, p) in enumerate(fake_products_db) if p["id"] == product_id), None)
    
    if product_index is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    # 2. Verificar propiedad (Simulación: usuario 1 es dueño de todo)
    if current_user["id"] != 1:
        raise HTTPException(status_code=403, detail="No tienes permisos para editar este producto")

    # 3. Actualizar
    current_product = fake_products_db[product_index]
    updated_data = producto_update.dict(exclude_unset=True)
    updated_product = {**current_product, **updated_data}
    
    fake_products_db[product_index] = updated_product
    return updated_product

@router.delete("/productos/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    current_user: dict = Depends(get_current_user)
):
    # 1. Buscar el producto
    product_index = next((index for (index, p) in enumerate(fake_products_db) if p["id"] == product_id), None)
    
    if product_index is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    # 2. Verificar propiedad
    if current_user["id"] != 1:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar este producto")

    # 3. Eliminar
    fake_products_db.pop(product_index)
    return None

@router.get("/tienda/{slug}/productos/buscar", response_model=List[ProductoOut])
def search_products(slug: str, query: str):
    # 1. Validar tienda (Simulación: solo aceptamos "mi-tienda" o "tienda-prueba")
    # En un caso real, buscaríamos la tienda por slug en la DB
    if slug not in ["mi-tienda", "tienda-prueba"]:
         raise HTTPException(status_code=404, detail="Tienda no encontrada")

    # 2. Filtrar productos
    # Buscamos coincidencias en nombre o descripción (case-insensitive)
    query_lower = query.lower()
    filtered_products = [
        p for p in fake_products_db
        if query_lower in p["nombre"].lower() or (p.get("descripcion") and query_lower in p["descripcion"].lower())
    ]

    return filtered_products
