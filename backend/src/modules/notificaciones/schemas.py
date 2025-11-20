from pydantic import BaseModel
from datetime import datetime

class NotificacionOut(BaseModel):
    id: int
    mensaje: str
    tipo: str
    leida: bool
    creado_en: datetime