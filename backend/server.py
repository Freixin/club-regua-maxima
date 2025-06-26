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
    try:
        # Buscar o serviço pelo ID informado
        service = await database.services.find_one({"id": appointment_data.service})
        if not service:
            raise HTTPException(status_code=404, detail="Serviço não encontrado.")

        # Extrair data e hora do campo date_time
        appointment_date = appointment_data.date_time.date()
        appointment_time = appointment_data.date_time.time()

        # Verificar se já existe agendamento para o mesmo horário e serviço
        existing_appointment = await database.appointments.find_one({
            "appointment_date": appointment_date.isoformat(),
            "appointment_time": appointment_time.isoformat(),
            "service_id": appointment_data.service,
            "status": {"$in": ["pending", "confirmed"]}
        })
        if existing_appointment:
            raise HTTPException(status_code=409, detail="Horário já reservado para este serviço.")

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
        appointment_dict["appointment_time"] = appointment_dict["appointment_time"].isoformat()
        # Remover _id se for None para evitar erro de duplicidade
        if appointment_dict.get("_id") is None:
            appointment_dict.pop("_id")

        # Inserir no banco
        result = await database.appointments.insert_one(appointment_dict)
        appointment.id = str(result.inserted_id)

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
        await whatsapp_service.send_appointment_confirmation(response)

        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to create appointment")

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
