from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from ..auth.router import get_current_user
from .schemas import NotificacionOut

router = APIRouter(prefix="/notificaciones", tags=["Notificaciones"])

# Base de datos simulada de notificaciones
fake_notifications_db = [
    {
        "id": 1,
        "mensaje": "Nueva orden recibida #5001",
        "tipo": "orden",
        "leida": False,
        "creado_en": datetime(2023, 10, 27, 10, 5, 0),
        "fk_tienda": 1
    },
    {
        "id": 2,
        "mensaje": "Stock bajo en producto 'Camiseta Vintage'",
        "tipo": "inventario",
        "leida": True,
        "creado_en": datetime(2023, 10, 26, 15, 30, 0),
        "fk_tienda": 1
    },
    {
        "id": 3,
        "mensaje": "Nuevo cliente registrado",
        "tipo": "cliente",
        "leida": False,
        "creado_en": datetime(2023, 10, 25, 9, 15, 0),
        "fk_tienda": 1
    },
]

@router.get("", response_model=List[NotificacionOut])
async def get_notificaciones(current_user: dict = Depends(get_current_user)):
    """
    Obtiene la lista de notificaciones para la tienda del usuario autenticado.
    """
    # Simulación: Verificar que el usuario es dueño de una tienda
    # En este mock, asumimos que el usuario con ID 1 es dueño de la tienda 1.
    if current_user["id"] != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para ver las notificaciones de esta tienda"
        )

    tienda_id = 1  # ID de tienda simulado asociado al usuario 1
    
    # Filtrar notificaciones por tienda
    notificaciones = [n for n in fake_notifications_db if n["fk_tienda"] == tienda_id]
    
    return notificaciones

@router.post("/{id}/leer", status_code=status.HTTP_204_NO_CONTENT)
async def marcar_notificacion_leida(id: int, current_user: dict = Depends(get_current_user)):
    """
    Marca una notificación específica como leída.
    """
    # Verificar que el usuario está autenticado
    if current_user["id"] != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para modificar esta notificación"
        )
    
    # Buscar la notificación
    notificacion = next((n for n in fake_notifications_db if n["id"] == id), None)
    
    if not notificacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notificación no encontrada"
        )
    
    # Verificar que la notificación pertenece a la tienda del usuario
    if notificacion["fk_tienda"] != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para modificar esta notificación"
        )
    
    # Marcar como leída
    notificacion["leida"] = True
    
    return None