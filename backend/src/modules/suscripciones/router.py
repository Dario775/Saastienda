from fastapi import APIRouter, Depends, HTTPException, status
from ..auth.router import get_current_user
from .schemas import SuscripcionActivar, SuscripcionResponse

router = APIRouter(prefix="/suscripcion", tags=["Suscripciones"])

# Mock database of plans
FAKE_PLANS_DB = {
    1: {"nombre": "Básico", "precio": 9.99},
    2: {"nombre": "Pro", "precio": 29.99},
    3: {"nombre": "Enterprise", "precio": 99.99}
}

# Mock database of store subscriptions (store_id -> plan_id)
fake_store_subscriptions = {}

@router.post("/activar", response_model=SuscripcionResponse)
async def activar_suscripcion(suscripcion: SuscripcionActivar, current_user: dict = Depends(get_current_user)):
    """
    Activa un plan de suscripción para la tienda del usuario.
    """
    # Validate plan_id
    if suscripcion.plan_id not in FAKE_PLANS_DB:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Plan de suscripción no válido."
        )

    # Simulate getting store_id from current_user (assuming user 1 owns store 1)
    # In a real app, we would look up the store associated with the user.
    tienda_id = 1 
    
    # Verify user is owner (mock logic)
    # For simplicity in this mock, we assume the logged in user is authorized if they have an ID.
    # But to match the prompt "verificar que el usuario sea el dueño", we can check the ID.
    if current_user.get("id") != 1: 
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para gestionar la suscripción de esta tienda."
        )

    # Update subscription
    fake_store_subscriptions[tienda_id] = suscripcion.plan_id

    return {
        "mensaje": "Plan activado exitosamente.",
        "plan_id": suscripcion.plan_id,
        "estado": "activo"
    }
