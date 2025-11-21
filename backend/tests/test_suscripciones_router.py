from fastapi import FastAPI
from fastapi.testclient import TestClient
from src.modules.suscripciones.router import router
from src.modules.auth.router import get_current_user

app = FastAPI()
app.include_router(router)

client = TestClient(app)

# Mock user for authentication
def mock_get_current_user_owner():
    return {"id": 1, "email": "owner@test.com"}

def mock_get_current_user_other():
    return {"id": 2, "email": "other@test.com"}

def test_activar_suscripcion_success():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    payload = {"plan_id": 2}
    response = client.post("/suscripcion/activar", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    assert data["mensaje"] == "Plan activado exitosamente."
    assert data["plan_id"] == 2
    assert data["estado"] == "activo"
    
    app.dependency_overrides = {}

def test_activar_suscripcion_invalid_plan():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    payload = {"plan_id": 999} # Plan no existente
    response = client.post("/suscripcion/activar", json=payload)
    
    assert response.status_code == 400
    
    app.dependency_overrides = {}

def test_activar_suscripcion_forbidden():
    app.dependency_overrides[get_current_user] = mock_get_current_user_other
    
    payload = {"plan_id": 1}
    response = client.post("/suscripcion/activar", json=payload)
    
    assert response.status_code == 403
    
    app.dependency_overrides = {}
