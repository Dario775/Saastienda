from fastapi.testclient import TestClient
from src.main import app
from src.modules.auth.router import get_current_user

client = TestClient(app)

# Mock user for authentication
def mock_get_current_user_owner():
    return {"id": 1, "email": "owner@test.com"}

def test_get_ventas_mensuales_success():
    app.dependency_overrides[get_current_user] = mock_get_current_user_owner
    
    response = client.get("/analitica/ventas_mensuales")
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "mes" in data[0]
    assert "total_ventas" in data[0]
    
    app.dependency_overrides = {}

def test_get_ventas_mensuales_unauthorized():
    # Ensure no override is active
    app.dependency_overrides = {}
    
    response = client.get("/analitica/ventas_mensuales")
    
    assert response.status_code == 401
