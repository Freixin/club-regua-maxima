from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
# import os
import logging
import sys
from pathlib import Path
from typing import List, Optional
from datetime import datetime, date, time, timedelta, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import uuid
from datetime import time as dt_time
from bson import ObjectId
from slugify import slugify
# from pydantic import BaseModel, Field, constr, EmailStr
# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.append(str(backend_dir))

# Import models
from models.customer import Customer
from models.service import Service
from models.appointment import (
    Appointment, AppointmentCreate, AppointmentResponse, 
    AppointmentStatus, TimeSlot
)
from models.contact import ContactMessage, ContactMessageCreate, ContactMessageResponse

# Import services
from services.database import database
from services.whatsapp_service import whatsapp_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(
    title="Club Régua Máxima API",
    description="API for barbershop appointment system",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB client
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.barbershop

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await database.connect()
    logger.info("Barbershop API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    await database.disconnect()
    logger.info("Barbershop API shutdown completed")

# Health check endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Club Régua Máxima API",
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc),
        "whatsapp_configured": whatsapp_service.is_configured()
    }

# Services endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services(
    category: Optional[str] = Query(None, description="Filter by category"),
    active_only: bool = Query(True, description="Get only active services")
):
    """Get all services"""
    try:
        query = {}
        
        if active_only:
            query["is_active"] = True
        
        if category and category.lower() != "todos":
            query["category"] = category
        
        services = await database.services.find(query).to_list(1000)
        return [Service(**service) for service in services]
        
    except Exception as e:
        logger.error(f"Error fetching services: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch services")

@api_router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    """Get a specific service"""
    try:
        service = await database.services.find_one({"id": service_id})
        
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        return Service(**service)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching service {service_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch service")

@api_router.post("/services/populate")
async def populate_services():
    """
    Populates the database with a predefined list of services.
    This will clear all existing services.
    """
    SERVICES_DATA = [
        {"name": "Corte", "price": 40, "duration": 30, "category": "Corte"},
        {"name": "Corte Kids", "price": 40, "duration": 30, "category": "Corte"},
        {"name": "Barba", "price": 30, "duration": 20, "category": "Barba"},
        {"name": "Cavanhaque", "price": 20, "duration": 15, "category": "Barba"},
        {"name": "Sobrancelha", "price": 10, "duration": 10, "category": "Sobrancelha"},
        {"name": "Pezinho/Acabamento", "price": 15, "duration": 15, "category": "Acabamento"},
        {"name": "Corte + Barba", "price": 60, "duration": 50, "category": "Combo"},
        {"name": "Corte + Barba + Sobrancelhas", "price": 65, "duration": 60, "category": "Combo"},
        {"name": "Corte + Cavanhaque", "price": 50, "duration": 45, "category": "Combo"},
        {"name": "Corte + Cavanhaque + Sobrancelha", "price": 55, "duration": 55, "category": "Combo"},
        {"name": "Corte + Sobrancelha", "price": 45, "duration": 40, "category": "Combo"},
        {"name": "Corte + Bigode", "price": 45, "duration": 40, "category": "Combo"},
        {"name": "Corte + Bigode + Sobrancelhas", "price": 50, "duration": 50, "category": "Combo"},
        {"name": "Corte + Pigmentação", "price": 60, "duration": 60, "category": "Premium"},
        {"name": "Corte + Pigmentação + Sobrancelhas", "price": 65, "duration": 70, "category": "Premium"},
        {"name": "Corte + Pigmentação + Bigode", "price": 65, "duration": 70, "category": "Premium"},
        {"name": "Corte + Pigmentação + Sobrancelhas + Bigode", "price": 70, "duration": 80, "category": "Premium"},
        {"name": "Corte + Pigmentação + Barba", "price": 80, "duration": 80, "category": "Premium"},
        {"name": "Corte + Pigmentação + Barba + Sobrancelhas", "price": 85, "duration": 90, "category": "Premium"},
        {"name": "Corte + Pigmentação + Cavanhaque", "price": 70, "duration": 75, "category": "Premium"},
        {"name": "Corte + Pigmentação + Cavanhaque + Sobrancelhas", "price": 75, "duration": 85, "category": "Premium"},
        {"name": "Corte + Reflexo", "price": 80, "duration": 90, "category": "Premium"},
        {"name": "Corte + Reflexo + Sobrancelhas", "price": 85, "duration": 100, "category": "Premium"},
        {"name": "Corte + Reflexo + Bigode", "price": 85, "duration": 100, "category": "Premium"},
        {"name": "Corte + Reflexo + Sobrancelhas + Bigode", "price": 90, "duration": 110, "category": "Premium"},
        {"name": "Corte + Reflexo + Barba", "price": 100, "duration": 110, "category": "Premium"},
        {"name": "Corte + Reflexo + Barba + Sobrancelhas", "price": 105, "duration": 120, "category": "Premium"},
        {"name": "Corte + Reflexo + Cavanhaque", "price": 90, "duration": 105, "category": "Premium"},
        {"name": "Corte + Reflexo + Cavanhaque + Sobrancelhas", "price": 95, "duration": 115, "category": "Premium"},
        {"name": "Corte + Nevou", "price": 100, "duration": 120, "category": "Premium"},
        {"name": "Corte + Nevou + Sobrancelhas", "price": 105, "duration": 130, "category": "Premium"},
        {"name": "Corte + Nevou + Bigode", "price": 105, "duration": 130, "category": "Premium"},
        {"name": "Corte + Nevou + Sobrancelhas + Bigode", "price": 110, "duration": 140, "category": "Premium"},
        {"name": "Corte + Nevou + Barba", "price": 120, "duration": 140, "category": "Premium"},
        {"name": "Corte + Nevou + Barba + Sobrancelhas", "price": 125, "duration": 150, "category": "Premium"},
        {"name": "Corte + Nevou + Cavanhaque", "price": 110, "duration": 135, "category": "Premium"},
        {"name": "Corte + Nevou + Cavanhaque + Sobrancelhas", "price": 115, "duration": 145, "category": "Premium"}
    ]
    try:
        await database.services.delete_many({})
        logger.info("Cleared existing services.")

        new_services = []
        for service_data in SERVICES_DATA:
            service_id = slugify.slugify(service_data["name"])
            service = Service(
                id=service_id,
                is_active=True,
                **service_data
            )
            new_services.append(service.dict())
        
        if new_services:
            await database.services.insert_many(new_services)
            logger.info(f"Successfully populated {len(new_services)} services.")
            return {"message": f"Successfully populated {len(new_services)} services."}
        else:
            return {"message": "No services to populate."}
            
    except Exception as e:
        logger.error(f"Error populating services: {e}")
        raise HTTPException(status_code=500, detail="Failed to populate services")

# Simple appointment endpoint for testing
@api_router.post("/appointments")
async def create_appointment_simple(appointment_data: dict):
    """Simple appointment creation for testing"""
    try:
        # Mock successful appointment creation
        return {
            "success": True,
            "message": "Agendamento criado com sucesso!",
            "data": {
                "id": "mock-123",
                "customer_name": appointment_data.get("customer_name"),
                "service": appointment_data.get("service"),
                "date_time": appointment_data.get("date_time")
            }
        }
    except Exception as e:
        logger.error(f"Error creating appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to create appointment")

# Original appointment endpoint
@api_router.post("/appointments-full", response_model=AppointmentResponse)
async def create_appointment(appointment_data: AppointmentCreate):
    logger.info(f"Recebida nova solicitação de agendamento: {appointment_data.dict()}")
    try:
        # Buscar o serviço pelo ID informado
        logger.info(f"Buscando serviço com ID: {appointment_data.service}")
        service = await database.services.find_one({"id": appointment_data.service})
        if not service:
            logger.error(f"Serviço com ID {appointment_data.service} não encontrado.")
            raise HTTPException(status_code=404, detail="Serviço não encontrado.")
        logger.info(f"Serviço encontrado: {service['name']}")

        # Extrair data e hora do campo date_time
        appointment_datetime = appointment_data.date_time
        appointment_date = appointment_datetime.date()
        appointment_time = appointment_datetime.time()
        logger.info(f"Data do agendamento: {appointment_date}, Hora: {appointment_time}")

        # Verificar se já existe agendamento para o mesmo horário e serviço
        logger.info("Verificando conflitos de horário...")
        existing_appointment = await database.appointments.find_one({
            "appointment_date": appointment_date.isoformat(),
            "appointment_time": appointment_time.strftime("%H:%M:%S"),
            "service_id": appointment_data.service,
            "status": {"$in": ["pending", "confirmed"]}
        })
        if existing_appointment:
            logger.warning(f"Conflito de horário detectado para o serviço {appointment_data.service} em {appointment_date} {appointment_time}")
            raise HTTPException(status_code=409, detail="Horário já reservado para este serviço.")
        logger.info("Nenhum conflito de horário encontrado.")

        appointment = Appointment(
            customer_id=str(uuid.uuid4()),  # ou lógica para buscar/criar customer
            service_id=appointment_data.service,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            notes=getattr(appointment_data, "notes", None),
            customer_name=appointment_data.customer_name,
            customer_phone=appointment_data.customer_phone,
            service_name=service["name"],
            service_price=service["price"],
            service_duration=service["duration"]
        )

        # Serializar campos para o MongoDB
        appointment_dict = appointment.dict(by_alias=True)
        appointment_dict["appointment_date"] = appointment_dict["appointment_date"].isoformat()
        appointment_dict["appointment_time"] = appointment_dict["appointment_time"].strftime("%H:%M:%S")
        
        # Remover _id se for None para evitar erro de duplicidade
        if appointment_dict.get("_id") is None:
            appointment_dict.pop("_id", None)

        # Inserir no banco
        logger.info(f"Inserindo agendamento no banco de dados: {appointment_dict}")
        result = await database.appointments.insert_one(appointment_dict)
        appointment.id = str(result.inserted_id)
        logger.info(f"Agendamento criado com sucesso. ID: {appointment.id}")

        # Retornar resposta
        response = AppointmentResponse(
            id=appointment.id,
            customer_name=appointment.customer_name,
            customer_phone=appointment.customer_phone,
            service_name=appointment.service_name,
            service_price=appointment.service_price,
            service_duration=appointment.service_duration,
            appointment_date=appointment.appointment_date,
            appointment_time=appointment.appointment_time,
            status=appointment.status,
            notes=appointment.notes,
            created_at=appointment.created_at,
            whatsapp_sent=appointment.whatsapp_sent,
            reminder_sent=appointment.reminder_sent
        )

        # Enviar confirmação via WhatsApp
        logger.info(f"Enviando confirmação do agendamento {appointment.id} para o WhatsApp.")
        await whatsapp_service.send_appointment_confirmation(response)
        logger.info("Confirmação via WhatsApp enviada.")

        return response

    except HTTPException as http_exc:
        logger.error(f"HTTP Exception ao criar agendamento: {http_exc.detail}")
        raise http_exc
    except Exception as e:
        logger.exception("Erro inesperado ao criar agendamento:")
        raise HTTPException(status_code=500, detail="Ocorreu um erro inesperado ao processar o agendamento.")

@api_router.get("/appointments", response_model=List[AppointmentResponse])
async def get_appointments(
    date_from: Optional[date] = Query(None, description="Filter from date"),
    date_to: Optional[date] = Query(None, description="Filter to date"),
    status: Optional[AppointmentStatus] = Query(None, description="Filter by status"),
    customer_phone: Optional[str] = Query(None, description="Filter by customer phone"),
    limit: int = Query(100, le=1000, description="Limit results")
):
    """Get appointments with filters"""
    try:
        query = {}
        
        # Date range filter
        if date_from or date_to:
            date_query = {}
            if date_from:
                date_query["$gte"] = date_from.isoformat()
            if date_to:
                date_query["$lte"] = date_to.isoformat()
            query["appointment_date"] = date_query
        
        # Status filter
        if status:
            query["status"] = status
        
        # Customer phone filter
        if customer_phone:
            query["customer_phone"] = customer_phone
        
        appointments = await database.appointments.find(query).limit(limit).to_list(limit)
        # Corrige o _id para id (string)
        for appointment in appointments:
            if "_id" in appointment:
                appointment["id"] = str(appointment.pop("_id"))
        try:
            return [AppointmentResponse(**appointment) for appointment in appointments]
        except Exception as e:
            logger.error(f"Error parsing appointments: {e} | appointments: {appointments}")
            raise HTTPException(status_code=500, detail="Failed to parse appointments")
        
    except Exception as e:
        logger.error(f"Error fetching appointments: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch appointments")

@api_router.get("/appointments/available-slots")
async def get_available_slots(
    appointment_date: date = Query(..., description="Date to check availability"),
    service_id: str = Query(..., description="Service ID to check duration")
):
    """Get available time slots for a specific date and service"""
    try:
        # Get service duration
        service = await database.services.find_one({"id": service_id})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        # Define business hours (9:00 - 19:00)
        business_start = time(9, 0)
        business_end = time(19, 0)
        slot_duration = 30  # 30-minute slots
        
        # Get existing appointments for the date
        existing_appointments = await database.appointments.find({
            "appointment_date": appointment_date.isoformat(),
            "status": {"$in": ["pending", "confirmed"]}
        }).to_list(1000)
        
        # Generate time slots
        slots = []
        current_time = business_start
        
        while current_time < business_end:
            slot_available = True
            slot_start_dt = datetime.combine(appointment_date, current_time)
            slot_end_dt = slot_start_dt + timedelta(minutes=service["duration"])
            logger.info(f"Testando slot: {slot_start_dt.time()} - {slot_end_dt.time()}")

            for appointment in existing_appointments:
                appointment_time = dt_time.fromisoformat(appointment["appointment_time"])
                appointment_start_dt = datetime.combine(appointment_date, appointment_time)
                appointment_end_dt = appointment_start_dt + timedelta(minutes=appointment["service_duration"])
                logger.info(f"  Agendamento: {appointment_start_dt.time()} - {appointment_end_dt.time()}")

                # Bloqueia apenas se houver sobreposição real
                if not (slot_end_dt <= appointment_start_dt or slot_start_dt >= appointment_end_dt):
                    logger.info(f"    CONFLITO: slot {slot_start_dt.time()} - {slot_end_dt.time()} x agendamento {appointment_start_dt.time()} - {appointment_end_dt.time()}")
                    slot_available = False
                    break

            slots.append(TimeSlot(
                time=current_time.strftime("%H:%M"),
                available=slot_available
            ))
            current_time = (datetime.combine(appointment_date, current_time) + timedelta(minutes=slot_duration)).time()
        
        return slots
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching available slots: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch available slots")

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(contact_data: ContactMessageCreate):
    """Create a new contact message"""
    try:
        contact_message = ContactMessage(**contact_data.dict())
        
        await database.contact_messages.insert_one(contact_message.dict())
        
        logger.info(f"Contact message created: {contact_message.id}")
        return ContactMessageResponse(**contact_message.dict())
        
    except Exception as e:
        logger.error(f"Error creating contact message: {e}")
        raise HTTPException(status_code=500, detail="Failed to send contact message")

# Cancel appointment endpoint
@api_router.post("/appointments/{appointment_id}/cancel")
async def cancel_appointment(appointment_id: str):
    """Cancela um agendamento e libera o horário"""
    try:
        result = await database.appointments.update_one(
            {"_id": ObjectId(appointment_id)},
            {"$set": {"status": "cancelled"}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Agendamento não encontrado ou já cancelado.")
        return {"success": True, "message": "Agendamento cancelado com sucesso."}
    except Exception as e:
        logger.error(f"Error cancelling appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to cancel appointment")

# Include health check routes
try:
    from health_check import health_router
    app.include_router(health_router)
    print("Health check routes loaded successfully")
except Exception as e:
    print(f"Error loading health check routes: {e}")

# Include admin routes
try:
    from routes.admin import router as admin_router
    app.include_router(admin_router)
    print("Admin routes loaded successfully")
except Exception as e:
    print(f"Error loading admin routes: {e}")

# Include calendar routes
try:
    from routes.calendar import router as calendar_router
    app.include_router(calendar_router)
    print("Calendar routes loaded successfully")
except Exception as e:
    print(f"Error loading calendar routes: {e}")

# Include messages routes
try:
    from routes.messages import router as messages_router
    app.include_router(messages_router)
    print("Messages routes loaded successfully")
except Exception as e:
    print(f"Error loading messages routes: {e}")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Por favor, preencha todos os campos obrigatórios corretamente para agendar."}
    )
