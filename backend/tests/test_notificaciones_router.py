from fastapi.testclient import TestClient
from src.main import app
from src.modules.auth.router import get_current_user

client = TestClient(app)

# Mock user for authentication
def mock_get_current_user_owner():
    return {"id": 1, "email": "owner@test.com"}

def test_get_notificaciones_success():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    response = client.get("/notificaciones")
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "mensaje" in data[0]
    assert "tipo" in data[0]
    assert "leida" in data[0]
    assert "creado_en" in data[0]
    
    app.dependency_overrides = {}

def test_get_notificaciones_unauthorized():
    # Ensure no override is active
    app.dependency_overrides = {}
    
    response = client.get("/notificaciones")
    
    assert response.status_code == 401

def test_marcar_notificacion_leida_success():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    # Marcar notificación con ID 1 como leída
    response = client.post("/notificaciones/1/leer")
    
    assert response.status_code == 204
    
    app.dependency_overrides = {}

def test_marcar_notificacion_leida_unauthorized():
    # Ensure no override is active
    app.dependency_overrides = {}
    
    response = client.post("/notificaciones/1/leer")
    
    assert response.status_code == 401

def test_marcar_notificacion_leida_not_found():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    # Intentar marcar una notificación que no existe
    response = client.post("/notificaciones/9999/leer")
    
    assert response.status_code == 404
    
    app.dependency_overrides = {}
