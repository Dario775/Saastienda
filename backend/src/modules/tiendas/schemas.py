from pydantic import BaseModel

class DominioCreate(BaseModel):
    nombre_dominio: str

class DominioResponse(BaseModel):
    mensaje: str
    estado: str

class DominioStatus(BaseModel):
    dominio: str
    estado: str
