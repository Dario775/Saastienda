from fastapi.testclient import TestClient
from fastapi import FastAPI
from backend.src.modules.auth.router import router, fake_users_db
import pytest

# Setup minimal app for testing
app = FastAPI()
app.include_router(router)

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_db():
    # Limpiar la base de datos simulada antes de cada test
    fake_users_db.clear()
    yield

def test_register_success():
    payload = {
        "email": "test@example.com",
        "password": "securepassword123"
    }
    response = client.post("/register", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "mensaje" in data
    
    # Verificar que se guardó en la DB simulada
    assert "test@example.com" in fake_users_db

def test_login_success():
    # 1. Registrar usuario primero
    client.post("/register", json={
        "email": "user@login.com",
        "password": "mypassword"
    })
    
    # 2. Intentar login
    payload = {
        "email": "user@login.com",
        "password": "mypassword"
    }
    response = client.post("/login", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_failure_wrong_credentials():
    # 1. Registrar usuario
    client.post("/register", json={
        "email": "user@fail.com",
        "password": "correctpassword"
    })
    
    # 2. Intentar login con password incorrecto
    payload = {
        "email": "user@fail.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=payload)
    
    assert response.status_code == 400
    assert response.json()["detail"] == "Email o contraseña incorrectos"

def test_login_failure_user_not_found():
    payload = {
        "email": "nonexistent@example.com",
        "password": "any"
    }
    response = client.post("/login", json=payload)
    
    assert response.status_code == 400
    assert response.json()["detail"] == "Email o contraseña incorrectos"
