from pydantic import BaseModel
from typing import List
from datetime import datetime

class ProductoOrden(BaseModel):
    id_producto: int
    cantidad: int

class OrdenCreate(BaseModel):
    fk_tienda: int
    fk_usuario_cliente: int
    productos: List[ProductoOrden]

class OrdenOut(BaseModel):
    id: int
    fk_tienda: int
    fk_usuario_cliente: int
    total: float
    estado: str
    creado_en: datetime

    class Config:
        orm_mode = True
