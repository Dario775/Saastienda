from fastapi import APIRouter, HTTPException, status
from .schemas import UserRegister, UserLogin, Token
from typing import Dict

router = APIRouter()

# Simulación de base de datos de usuarios
# En memoria: { "email": { "email": "...", "hashed_password": "..." } }
fake_users_db: Dict[str, dict] = {}

def get_password_hash(password: str) -> str:
    # Simulación de hashing (en producción usar passlib/bcrypt)
    return f"hashed_{password}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Simulación de verificación
    return f"hashed_{plain_password}" == hashed_password

def create_access_token(data: dict) -> str:
    # Simulación de generación de JWT (en producción usar python-jose)
    # Estructura simulada: header.payload.signature
    return f"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{data['sub']}.signature_simulada"

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserRegister):
    if user.email in fake_users_db:
        raise HTTPException(
            status_code=400, 
            detail="El email ya está registrado"
        )
    
    hashed_password = get_password_hash(user.password)
    fake_users_db[user.email] = {
        "email": user.email,
        "hashed_password": hashed_password
    }
    
    return {"id": len(fake_users_db), "email": user.email, "mensaje": "Usuario creado exitosamente"}

@router.post("/login", response_model=Token)
def login(user: UserLogin):
    db_user = fake_users_db.get(user.email)
    if not db_user:
        raise HTTPException(
            status_code=400, 
            detail="Email o contraseña incorrectos"
        )
    
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=400, 
            detail="Email o contraseña incorrectos"
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}