from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, date, time, timedelta

# Import models
from models.customer import Customer, CustomerCreate
from models.service import Service
from models.appointment import (
    Appointment, AppointmentCreate, AppointmentResponse, 
    AppointmentUpdate, AppointmentStatus, TimeSlot
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
        "timestamp": datetime.utcnow(),
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

# Appointments endpoints
@api_router.post("/appointments", response_model=AppointmentResponse)
async def create_appointment(appointment_data: AppointmentCreate):
    """Create a new appointment"""
    try:
        # Validate service exists
        service = await database.services.find_one({"id": appointment_data.service_id})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        # Check if time slot is available
        existing_appointment = await database.appointments.find_one({
            "appointment_date": appointment_data.appointment_date.isoformat(),
            "appointment_time": appointment_data.appointment_time.isoformat(),
            "status": {"$in": ["pending", "confirmed"]}
        })
        
        if existing_appointment:
            raise HTTPException(status_code=400, detail="Time slot is already booked")
        
        # Create or get customer
        customer_query = {"phone": appointment_data.customer_phone}
        customer_doc = await database.customers.find_one(customer_query)
        
        if customer_doc:
            customer = Customer(**customer_doc)
            # Update customer info if needed
            customer.name = appointment_data.customer_name
            if appointment_data.customer_email:
                customer.email = appointment_data.customer_email
            customer.total_appointments += 1
            
            await database.customers.update_one(
                {"id": customer.id},
                {"$set": customer.dict()}
            )
        else:
            # Create new customer
            customer = Customer(
                name=appointment_data.customer_name,
                phone=appointment_data.customer_phone,
                email=appointment_data.customer_email,
                total_appointments=1
            )
            await database.customers.insert_one(customer.dict())
        
        # Create appointment
        appointment = Appointment(
            customer_id=customer.id,
            service_id=appointment_data.service_id,
            appointment_date=appointment_data.appointment_date,
            appointment_time=appointment_data.appointment_time,
            notes=appointment_data.notes,
            customer_name=appointment_data.customer_name,
            customer_phone=appointment_data.customer_phone,
            service_name=service["name"],
            service_price=service["price"],
            service_duration=service["duration"]
        )
        
        # Save appointment
        await database.appointments.insert_one(appointment.dict())
        
        # Send WhatsApp confirmation
        appointment_response = AppointmentResponse(**appointment.dict())
        whatsapp_sent = await whatsapp_service.send_appointment_confirmation(appointment_response)
        
        # Update WhatsApp status
        if whatsapp_sent:
            await database.appointments.update_one(
                {"id": appointment.id},
                {"$set": {"whatsapp_sent": True, "status": "confirmed"}}
            )
            appointment.whatsapp_sent = True
            appointment.status = AppointmentStatus.CONFIRMED
        
        logger.info(f"Appointment created: {appointment.id}")
        return AppointmentResponse(**appointment.dict())
        
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
        return [AppointmentResponse(**appointment) for appointment in appointments]
        
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
            
            # Check if slot conflicts with existing appointments
            for appointment in existing_appointments:
                appointment_time = datetime.fromisoformat(appointment["appointment_time"]).time()
                appointment_duration = appointment["service_duration"]
                
                # Check for overlap
                slot_end = (datetime.combine(appointment_date, current_time) + 
                           timedelta(minutes=service["duration"])).time()
                app_end = (datetime.combine(appointment_date, appointment_time) + 
                          timedelta(minutes=appointment_duration)).time()
                
                if (current_time < app_end and slot_end > appointment_time):
                    slot_available = False
                    break
            
            slots.append(TimeSlot(
                time=current_time.strftime("%H:%M"),
                available=slot_available
            ))
            
            # Move to next slot
            current_time = (datetime.combine(appointment_date, current_time) + 
                           timedelta(minutes=slot_duration)).time()
        
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
