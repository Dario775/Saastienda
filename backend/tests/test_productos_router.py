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

def test_update_producto_success():
    # 1. Setup: Create a product first (or assume one exists from previous tests/mock DB)
    # Since the mock DB persists in memory during the test session if not cleared, 
    # we should ensure a known state. The router has `fake_products_db` global.
    # Ideally we'd reset it, but for this simple test we can just create one.
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    # Create a product to update
    create_payload = {"nombre": "To Update", "precio": 10.0, "stock": 5}
    create_res = client.post("/tiendas/1/productos", json=create_payload)
    product_id = create_res.json()["id"]
    
    # 2. Update the product
    update_payload = {"nombre": "Updated Name", "precio": 20.0}
    response = client.put(f"/productos/{product_id}", json=update_payload)
    
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == "Updated Name"
    assert data["precio"] == 20.0
    assert data["stock"] == 5 # Should remain unchanged
    
    app.dependency_overrides = {}

def test_update_producto_forbidden():
    # 1. Setup: Create a product as owner
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    create_res = client.post("/tiendas/1/productos", json={"nombre": "My Product", "precio": 10, "stock": 1})
    product_id = create_res.json()["id"]
    
    # 2. Try to update as another user
    app.dependency_overrides[get_current_user] = mock_get_current_user_not_owner
    
    update_payload = {"nombre": "Hacked"}
    response = client.put(f"/productos/{product_id}", json=update_payload)
    
    assert response.status_code == 403
    
    app.dependency_overrides = {}

def test_delete_producto_success():
    # 1. Setup: Create a product
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    create_res = client.post("/tiendas/1/productos", json={"nombre": "To Delete", "precio": 10, "stock": 1})
    product_id = create_res.json()["id"]
    
    # 2. Delete the product
    response = client.delete(f"/productos/{product_id}")
    
    assert response.status_code == 204
    
    # 3. Verify it's gone (optional but good)
    # We can try to update it and expect 404
    response = client.put(f"/productos/{product_id}", json={"nombre": "Ghost"})
    assert response.status_code == 404
    
    app.dependency_overrides = {}
