from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..auth.router import get_current_user
from .schemas import VentaMensual

router = APIRouter(prefix="/analitica", tags=["Analítica"])

# Base de datos simulada de ventas históricas
fake_analytics_db = [
    {"mes": "Enero", "total_ventas": 1500.00, "fk_tienda": 1},
    {"mes": "Febrero", "total_ventas": 2300.50, "fk_tienda": 1},
    {"mes": "Marzo", "total_ventas": 1800.00, "fk_tienda": 1},
    {"mes": "Abril", "total_ventas": 2100.00, "fk_tienda": 1},
    {"mes": "Mayo", "total_ventas": 2500.00, "fk_tienda": 1},
    {"mes": "Junio", "total_ventas": 3000.00, "fk_tienda": 1},
]

@router.get("/ventas_mensuales", response_model=List[VentaMensual])
async def get_ventas_mensuales(current_user: dict = Depends(get_current_user)):
    """
    Obtiene el historial de ventas mensuales para la tienda del usuario autenticado.
    """
    # Simulación: Verificar que el usuario es dueño de una tienda
    # En este mock, asumimos que el usuario con ID 1 es dueño de la tienda 1.
    # Cualquier otro usuario no tendría acceso a estos datos.
    if current_user["id"] != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para ver las analíticas de esta tienda"
        )

    tienda_id = 1 # ID de tienda simulado asociado al usuario 1
    
    # Filtrar ventas por tienda
    ventas = [venta for venta in fake_analytics_db if venta["fk_tienda"] == tienda_id]
    
    return ventas