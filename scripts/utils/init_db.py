import asyncio
from datetime import datetime, date, timedelta
from services.database import database

async def init_db():
    print("Inicializando banco de dados...")
    
    # Limpar coleções existentes
    await database.connect()
    await database.services.delete_many({})
    await database.appointments.delete_many({})
    await database.contact_messages.delete_many({})
    
    # Inserir serviços
    services = [
        {"id": "1", "name": "Corte Masculino", "category": "Corte", "price": 25, "duration": 30, "is_active": True},
        {"id": "2", "name": "Barba Completa", "category": "Barba", "price": 20, "duration": 25, "is_active": True},
        {"id": "3", "name": "Corte + Barba", "category": "Combo", "price": 40, "duration": 45, "is_active": True},
        {"id": "4", "name": "Sobrancelha", "category": "Sobrancelha", "price": 15, "duration": 15, "is_active": True},
        {"id": "5", "name": "Combo Premium", "category": "Premium", "price": 65, "duration": 60, "is_active": True}
    ]
    
    for service in services:
        await database.services.update_one(
            {"id": service["id"]},
            {"$set": service},
            upsert=True
        )
    
    # Inserir agendamentos
    today = date.today()
    appointments = [
        {
            "customer_name": "João Silva",
            "customer_phone": "(21) 99999-1111",
            "service_id": "3",
            "service_name": "Corte + Barba",
            "service_price": 40,
            "service_duration": 45,
            "appointment_date": today.isoformat(),
            "appointment_time": "09:00:00",
            "status": "confirmed",
            "created_at": datetime.now(),
            "notes": "Cliente regular"
        },
        {
            "customer_name": "Pedro Santos",
            "customer_phone": "(21) 99999-2222",
            "service_id": "1",
            "service_name": "Corte Masculino",
            "service_price": 25,
            "service_duration": 30,
            "appointment_date": today.isoformat(),
            "appointment_time": "10:30:00",
            "status": "pending",
            "created_at": datetime.now(),
            "notes": "Primeira vez"
        },
        {
            "customer_name": "Maria Oliveira",
            "customer_phone": "(21) 99999-3333",
            "service_id": "4",
            "service_name": "Sobrancelha",
            "service_price": 15,
            "service_duration": 15,
            "appointment_date": (today + timedelta(days=1)).isoformat(),
            "appointment_time": "14:00:00",
            "status": "confirmed",
            "created_at": datetime.now()
        },
        {
            "customer_name": "Carlos Souza",
            "customer_phone": "(21) 99999-4444",
            "service_id": "2",
            "service_name": "Barba Completa",
            "service_price": 20,
            "service_duration": 25,
            "appointment_date": (today + timedelta(days=2)).isoformat(),
            "appointment_time": "11:00:00",
            "status": "confirmed",
            "created_at": datetime.now()
        }
    ]
    
    for appointment in appointments:
        await database.appointments.insert_one(appointment)
    
    # Inserir mensagens
    messages = [
        {
            "name": "Ana Maria",
            "email": "ana@email.com",
            "subject": "Agendamento",
            "message": "Gostaria de agendar um horário para corte e barba no próximo sábado.",
            "status": "new",
            "created_at": datetime.now() - timedelta(hours=2)
        },
        {
            "name": "Bruno Oliveira",
            "email": "bruno@email.com",
            "subject": "Dúvida",
            "message": "Vocês fazem corte infantil? Qual o valor?",
            "status": "read",
            "created_at": datetime.now() - timedelta(days=1)
        },
        {
            "name": "Carla Mendes",
            "email": "carla@email.com",
            "subject": "Horário especial",
            "message": "Vocês atendem fora do horário comercial?",
            "status": "new",
            "created_at": datetime.now() - timedelta(hours=5)
        }
    ]
    
    for message in messages:
        await database.contact_messages.insert_one(message)
    
    print("Banco de dados inicializado com sucesso!")
    await database.disconnect()

if __name__ == "__main__":
    asyncio.run(init_db())