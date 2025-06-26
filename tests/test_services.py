import requests
import uuid
from datetime import datetime, timedelta

def test_get_services():
    response = requests.get("http://localhost:8000/api/services")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_service_by_id():
    # Pegue o primeiro serviço da lista
    services = requests.get("http://localhost:8000/api/services").json()
    assert services, "Nenhum serviço cadastrado para testar"
    service_id = services[0]["id"]
    response = requests.get(f"http://localhost:8000/api/services/{service_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == service_id

def test_create_appointment():
    services = requests.get("http://localhost:8000/api/services").json()
    assert services, "Nenhum serviço cadastrado para testar"
    service_id = services[0]["id"]

    # Gera um horário futuro único para evitar conflito
    now = datetime.now() + timedelta(days=1)
    date_time = now.replace(hour=14, minute=0, second=0, microsecond=0)
    data = {
        "customer_name": "Teste Automatizado",
        "customer_phone": "11999999999",
        "service": service_id,
        "date_time": date_time.isoformat(),
        "notes": "Agendamento criado pelo teste automatizado"
    }

    response = requests.post("http://localhost:8000/api/appointments", json=data)
    print(response.json())
    assert response.status_code == 200 or response.status_code == 201
    resp_json = response.json()
    assert resp_json["customer_name"] == data["customer_name"]
    assert resp_json["service_id"] == data["service"]
    if "appointment_date" in resp_json and "appointment_time" in resp_json:
        assert resp_json["appointment_date"] == data["date_time"].split("T")[0]
        assert resp_json["appointment_time"] == data["date_time"].split("T")[1]
    if "notes" in resp_json:
        assert resp_json["notes"] == data["notes"]

def test_create_appointment_missing_fields():
    data = {}
    response = requests.post("http://localhost:8000/api/appointments", json=data)
    assert response.status_code == 422
    detail = response.json()["detail"]
    required_fields = {"customer_name", "customer_phone", "service", "date_time"}
    missing = {err["loc"][-1] for err in detail}
    assert required_fields.issubset(missing)