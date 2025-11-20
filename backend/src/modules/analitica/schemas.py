from pydantic import BaseModel

class VentaMensual(BaseModel):
    mes: str
    total_ventas: float