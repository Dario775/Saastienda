from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from .schemas import OrdenCreate, OrdenOut
from datetime import datetime

router = APIRouter()

# Simulación de dependencia de autenticación
def get_current_user(token: str = "mock_token"):
    # En un caso real, esto validaría el token JWT
    return {"id": 20, "username": "cliente_usuario"}

# Simulación de base de datos
fake_orders_db = []
fake_products_db = {
    101: {"id": 101, "nombre": "Camiseta Vintage", "precio": 25.99, "stock": 50}
}

@router.post("/ordenes", response_model=OrdenOut, status_code=status.HTTP_201_CREATED)
def create_orden(
    orden: OrdenCreate,
    current_user: dict = Depends(get_current_user)
):
    total = 0.0
    
    # 1. Verificar stock y calcular total
    for item in orden.productos:
        if item.id_producto not in fake_products_db:
            raise HTTPException(status_code=400, detail=f"Producto ID {item.id_producto} no encontrado")
        
        producto = fake_products_db[item.id_producto]
        
        if producto["stock"] < item.cantidad:
            raise HTTPException(
                status_code=400, 
                detail=f"Stock insuficiente para el producto '{producto['nombre']}' (ID: {item.id_producto})."
            )
        
        total += producto["precio"] * item.cantidad

    # 2. Simular procesamiento de pago (éxito)
    # ... lógica de pago ...

    # 3. Crear la orden
    new_order_id = len(fake_orders_db) + 5001
    new_order = {
        "id": new_order_id,
        "fk_tienda": orden.fk_tienda,
        "fk_usuario_cliente": orden.fk_usuario_cliente,
        "total": round(total, 2),
        "estado": "pagado",
        "creado_en": datetime.now()
    }
    
    # 4. Actualizar stock (simulado)
    for item in orden.productos:
        fake_products_db[item.id_producto]["stock"] -= item.cantidad

    fake_orders_db.append(new_order)

    return new_order
@router.get("/ordenes", response_model=List[OrdenOut])
def get_ordenes(current_user: dict = Depends(get_current_user)):
    # Simulación: Asumimos que el usuario autenticado es dueño de la tienda con ID 1
    # En una implementación real, obtendríamos el ID de la tienda del perfil del usuario
    tienda_id_usuario = 1
    
    # Filtrar la base de datos simulada para obtener solo las órdenes de esta tienda
    ordenes_tienda = [
        orden for orden in fake_orders_db 
        if orden["fk_tienda"] == tienda_id_usuario
    ]
    
    return ordenes_tienda