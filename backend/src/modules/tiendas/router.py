from fastapi import APIRouter, Depends, HTTPException, status
from ..auth.router import get_current_user
from .schemas import DominioCreate, DominioResponse, DominioStatus

router = APIRouter(prefix="/tiendas", tags=["Tiendas"])

# Base de datos simulada de dominios
# Mapea tienda_id -> {dominio, estado}
fake_domains_db = {}

@router.post("/{tienda_id}/dominio", status_code=status.HTTP_202_ACCEPTED, response_model=DominioResponse)
async def registrar_dominio(tienda_id: int, dominio_data: DominioCreate, current_user: dict = Depends(get_current_user)):
    """
    Permite al dueño de la tienda registrar un dominio personalizado.
    """
    # Simulación: Verificar que el usuario es dueño de la tienda
    # Asumimos que el usuario con ID 1 es dueño de la tienda 1.
    if current_user["id"] != 1 or tienda_id != 1:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para modificar esta tienda"
        )

    # Simular registro
    fake_domains_db[tienda_id] = {
        "dominio": dominio_data.nombre_dominio,
        "estado": "PENDIENTE"
    }

    return {
        "mensaje": "Dominio registrado. Validación en curso.",
        "estado": "PENDIENTE"
    }

@router.get("/{tienda_id}/dominio", response_model=DominioStatus)
async def obtener_estado_dominio(tienda_id: int, current_user: dict = Depends(get_current_user)):
    """
    Obtiene el estado de la verificación del dominio personalizado.
    """
    # Simulación: Verificar que el usuario es dueño de la tienda
    if current_user["id"] != 1 or tienda_id != 1:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para ver esta información"
        )

    domain_info = fake_domains_db.get(tienda_id)
    
    if not domain_info:
        # Si no hay dominio registrado, podríamos devolver 404 o un estado vacío.
        # Para este caso, simularemos que si no existe, devolvemos un estado "NO_REGISTRADO" o similar,
        # pero el requerimiento dice devolver 'VERIFICADO' o 'PENDIENTE'.
        # Vamos a simular que si no está en la DB, devolvemos 404 para ser consistentes.
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se ha registrado un dominio para esta tienda."
        )

    return {
        "dominio": domain_info["dominio"],
        "estado": domain_info["estado"]
    }
