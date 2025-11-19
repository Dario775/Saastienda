from fastapi.testclient import TestClient
from fastapi import FastAPI, status, HTTPException
from backend.src.modules.productos.router import router, get_current_user
import pytest

# Setup minimal app for testing
app = FastAPI()
app.include_router(router)

client = TestClient(app)

# Mock overrides
def mock_get_current_user_owner():
    return {"id": 1, "username": "dueno_tienda"}

def mock_get_current_user_not_owner():
    return {"id": 2, "username": "otro_usuario"}

def mock_get_current_user_no_auth():
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

def test_create_producto_success():
    # Override dependency to simulate authenticated owner
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    payload = {
        "nombre": "Producto Test",
        "precio": 100.0,
        "stock": 10,
        "descripcion": "Descripcion test"
    }
    
    # Tienda ID 1 exists in the router's mock DB
    response = client.post("/tiendas/1/productos", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["nombre"] == payload["nombre"]
    assert data["precio"] == payload["precio"]
    assert "id" in data
    assert "creado_en" in data
    
    # Clean up
    app.dependency_overrides = {}

def test_create_producto_no_auth():
    # Override dependency to simulate missing auth
    app.dependency_overrides[get_current_user] = mock_get_current_user_no_auth
    
    payload = {
        "nombre": "Producto Anonimo",
        "precio": 10.0,
        "stock": 1
    }
    
    response = client.post("/tiendas/1/productos", json=payload)
    
    assert response.status_code == 401
    
    app.dependency_overrides = {}

def test_create_producto_not_owner():
    # Override dependency to simulate authenticated but wrong user
    app.dependency_overrides[get_current_user] = mock_get_current_user_not_owner
    
    payload = {
        "nombre": "Producto Intruso",
        "precio": 50.0,
        "stock": 5
    }
    
    response = client.post("/tiendas/1/productos", json=payload)
    
    assert response.status_code == 403
    assert response.json()["detail"] == "No tienes permisos para agregar productos a esta tienda"
    
    app.dependency_overrides = {}
