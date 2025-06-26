import asyncio
from services.database import database

async def list_all_appointments():
    print("Listando TODOS os agendamentos existentes no banco de dados...")
    
    await database.connect()
    
    # Buscar todos os agendamentos sem filtros
    appointments = await database.appointments.find().to_list(1000)
    
    if not appointments:
        print("Nenhum agendamento encontrado no banco de dados!")
    else:
        print(f"Encontrados {len(appointments)} agendamentos:")
        for i, appointment in enumerate(appointments, 1):
            print(f"\n--- Agendamento {i} ---")
            print(f"ID: {appointment.get('_id')}")
            print(f"Cliente: {appointment.get('customer_name')}")
            print(f"Telefone: {appointment.get('customer_phone')}")
            print(f"Serviço: {appointment.get('service_name')}")
            print(f"Data: {appointment.get('appointment_date')}")
            print(f"Hora: {appointment.get('appointment_time')}")
            print(f"Status: {appointment.get('status')}")
    
    await database.disconnect()

if __name__ == "__main__":
    asyncio.run(list_all_appointments())