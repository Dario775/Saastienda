from fastapi import FastAPI
from fastapi.testclient import TestClient
from src.modules.tiendas.router import router
from src.modules.auth.router import get_current_user

app = FastAPI()
app.include_router(router)

client = TestClient(app)

# Mock user for authentication
def mock_get_current_user_owner():
    return {"id": 1, "email": "owner@test.com"}

def mock_get_current_user_other():
    return {"id": 2, "email": "other@test.com"}

def test_registrar_dominio_success():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    payload = {"nombre_dominio": "mitienda.com"}
    response = client.post("/tiendas/1/dominio", json=payload)
    
    assert response.status_code == 202
    data = response.json()
    assert data["mensaje"] == "Dominio registrado. Validación en curso."
    assert data["estado"] == "PENDIENTE"
    
    app.dependency_overrides = {}

def test_registrar_dominio_forbidden():
    app.dependency_overrides[get_current_user] = mock_get_current_user_other
    
    payload = {"nombre_dominio": "mitienda.com"}
    response = client.post("/tiendas/1/dominio", json=payload)
    
    assert response.status_code == 403
    
    app.dependency_overrides = {}

def test_obtener_estado_dominio_success():
    # Primero registramos el dominio
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    client.post("/tiendas/1/dominio", json={"nombre_dominio": "mitienda.com"})
    
    response = client.get("/tiendas/1/dominio")
    
    assert response.status_code == 200
    data = response.json()
    assert data["dominio"] == "mitienda.com"
    assert data["estado"] == "PENDIENTE"
    
    app.dependency_overrides = {}

def test_obtener_estado_dominio_not_found():
    # Reiniciamos la "DB" simulada (esto es un hack porque la variable es global en el módulo)
    from src.modules.tiendas.router import fake_domains_db
    fake_domains_db.clear()
    
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    response = client.get("/tiendas/1/dominio")
    
    assert response.status_code == 404
    
    app.dependency_overrides = {}
