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
