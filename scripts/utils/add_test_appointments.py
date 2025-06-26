import asyncio
from datetime import datetime, date, timedelta
from services.database import database

async def add_test_appointments():
    print("Adicionando agendamentos de teste...")
    
    await database.connect()
    
    # Obter data atual
    today = date.today()
    
    # Criar agendamentos para hoje e os próximos 7 dias
    appointments = []
    
    # Nomes e serviços para variedade
    clients = [
        {"name": "João Silva", "phone": "(21) 99999-1111"},
        {"name": "Maria Oliveira", "phone": "(21) 99999-2222"},
        {"name": "Pedro Santos", "phone": "(21) 99999-3333"},
        {"name": "Ana Costa", "phone": "(21) 99999-4444"},
        {"name": "Carlos Souza", "phone": "(21) 99999-5555"}
    ]
    
    services = [
        {"id": "1", "name": "Corte Masculino", "price": 25, "duration": 30},
        {"id": "2", "name": "Barba Completa", "price": 20, "duration": 25},
        {"id": "3", "name": "Corte + Barba", "price": 40, "duration": 45},
        {"id": "4", "name": "Sobrancelha", "price": 15, "duration": 15},
        {"id": "5", "name": "Combo Premium", "price": 65, "duration": 60}
    ]
    
    # Horários disponíveis
    times = ["09:00:00", "10:00:00", "11:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"]
    
    # Status possíveis
    statuses = ["confirmed", "pending"]
    
    # Criar agendamentos para cada dia
    for day_offset in range(8):  # Hoje + 7 dias
        current_date = today + timedelta(days=day_offset)
        date_str = current_date.isoformat()
        
        # 2-3 agendamentos por dia
        for i in range(min(3, len(times))):
            if i >= len(times):
                break
                
            client = clients[i % len(clients)]
            service = services[i % len(services)]
            status = statuses[i % len(statuses)]
            
            appointment = {
                "customer_name": client["name"],
                "customer_phone": client["phone"],
                "service_id": service["id"],
                "service_name": service["name"],
                "service_price": service["price"],
                "service_duration": service["duration"],
                "appointment_date": date_str,
                "appointment_time": times[i],
                "status": status,
                "created_at": datetime.now(),
                "notes": f"Agendamento de teste para {date_str}"
            }
            
            appointments.append(appointment)
    
    # Limpar agendamentos existentes
    await database.appointments.delete_many({})
    
    # Inserir novos agendamentos
    if appointments:
        result = await database.appointments.insert_many(appointments)
        print(f"Adicionados {len(result.inserted_ids)} agendamentos de teste!")
    
    # Listar os agendamentos criados
    print("\nAgendamentos criados:")
    all_appointments = await database.appointments.find().to_list(1000)
    for i, app in enumerate(all_appointments, 1):
        print(f"{i}. {app['customer_name']} - {app['service_name']} - {app['appointment_date']} às {app['appointment_time']} - {app['status']}")
    
    await database.disconnect()
    print("\nConcluído!")

if __name__ == "__main__":
    asyncio.run(add_test_appointments())