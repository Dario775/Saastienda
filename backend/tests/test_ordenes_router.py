from fastapi.testclient import TestClient
from fastapi import FastAPI, status, HTTPException
from backend.src.modules.ordenes.router import router, get_current_user, fake_products_db
import pytest

# Setup minimal app for testing
app = FastAPI()
app.include_router(router)

client = TestClient(app)

# Mock overrides
def mock_get_current_user_authenticated():
    return {"id": 20, "username": "cliente_usuario"}

def mock_get_current_user_no_auth():
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

def test_create_orden_success():
    # Override dependency to simulate authenticated user
    app.dependency_overrides[get_current_user] = mock_get_current_user_authenticated
    
    # Reset stock for testing
    fake_products_db[101]["stock"] = 50
    
    payload = {
        "fk_tienda": 1,
        "fk_usuario_cliente": 20,
        "productos": [
            {
                "id_producto": 101,
                "cantidad": 2
            }
        ]
    }
    
    response = client.post("/ordenes", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["fk_tienda"] == 1
    assert data["fk_usuario_cliente"] == 20
    assert data["estado"] == "pagado"
    assert "total" in data
    assert "id" in data
    assert "creado_en" in data
    
    # Clean up
    app.dependency_overrides = {}

def test_create_orden_no_auth():
    # Override dependency to simulate missing auth
    app.dependency_overrides[get_current_user] = mock_get_current_user_no_auth
    
    payload = {
        "fk_tienda": 1,
        "fk_usuario_cliente": 20,
        "productos": [
            {
                "id_producto": 101,
                "cantidad": 1
            }
        ]
    }
    
    response = client.post("/ordenes", json=payload)
    
    assert response.status_code == 401
    
    app.dependency_overrides = {}

def test_create_orden_insufficient_stock():
    # Override dependency to simulate authenticated user
    app.dependency_overrides[get_current_user] = mock_get_current_user_authenticated
    
    # Set stock to a low value
    fake_products_db[101]["stock"] = 1
    
    payload = {
        "fk_tienda": 1,
        "fk_usuario_cliente": 20,
        "productos": [
            {
                "id_producto": 101,
                "cantidad": 100  # Requesting more than available
            }
        ]
    }
    
    response = client.post("/ordenes", json=payload)
    
    assert response.status_code == 400
    assert "Stock insuficiente" in response.json()["detail"]
    
    # Reset stock
    fake_products_db[101]["stock"] = 50
    
    app.dependency_overrides = {}