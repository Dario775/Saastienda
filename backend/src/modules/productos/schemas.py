from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductoCreate(BaseModel):
    nombre: str
    precio: float
    stock: int
    descripcion: Optional[str] = None

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None
    descripcion: Optional[str] = None

class ProductoOut(ProductoCreate):
    id: int
    creado_en: datetime

    class Config:
        orm_mode = True
