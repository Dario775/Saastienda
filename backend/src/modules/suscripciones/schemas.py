from pydantic import BaseModel

class SuscripcionActivar(BaseModel):
    plan_id: int

class SuscripcionResponse(BaseModel):
    mensaje: str
    plan_id: int
    estado: str
