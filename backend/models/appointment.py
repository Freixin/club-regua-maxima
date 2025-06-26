from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date, time
from enum import Enum
import uuid

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"

class AppointmentCreate(BaseModel):
    customer_name: str
    customer_phone: str
    service: str
    date_time: datetime
    notes: Optional[str] = None


class Appointment(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    customer_id: str = Field(..., description="Customer ID reference")
    service_id: str = Field(..., description="Service ID reference")
    appointment_date: date = Field(..., description="Date of the appointment")
    appointment_time: time = Field(..., description="Time of the appointment")
    status: AppointmentStatus = Field(default=AppointmentStatus.PENDING)
    notes: Optional[str] = Field(None, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    whatsapp_sent: bool = Field(default=False)
    reminder_sent: bool = Field(default=False)
    
    # Embedded customer and service data for easier queries
    customer_name: str = Field(..., description="Customer name for quick access")
    customer_phone: str = Field(..., description="Customer phone for quick access")
    service_name: str = Field(..., description="Service name for quick access")
    service_price: float = Field(..., description="Service price for quick access")
    service_duration: int = Field(..., description="Service duration for quick access")

class AppointmentUpdate(BaseModel):
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    status: Optional[AppointmentStatus] = None
    notes: Optional[str] = Field(None, max_length=500)

class AppointmentResponse(BaseModel):
    id: str
    customer_name: str
    customer_phone: str
    service_name: str
    service_price: float
    service_duration: int
    appointment_date: date
    appointment_time: time
    status: AppointmentStatus
    notes: Optional[str]
    created_at: datetime
    whatsapp_sent: bool
    reminder_sent: bool

class TimeSlot(BaseModel):
    time: str
    available: bool
    appointment_id: Optional[str] = None

async def get_appointment_details(appointment_id: str):
    appointment_data = await database.appointments.find_one({"_id": appointment_id})
    if not appointment_data:
        return None
    
    service = await database.services.find_one({"id": appointment_data.service})
    appointment_date = appointment_data.date_time.date()
    appointment_time = appointment_data.date_time.time()

    appointment = Appointment(
        customer_id=str(uuid.uuid4()),  # ou lógica para buscar/criar customer
        service_id=appointment_data.service,
        appointment_date=appointment_data.date_time.date(),
        appointment_time=appointment_data.date_time.time(),
        notes=getattr(appointment_data, "notes", None),
        customer_name=appointment_data.customer_name,
        customer_phone=appointment_data.customer_phone,
        service_name=service["name"],
        service_price=service["price"],
        service_duration=service["duration"]
    )

    logger.info(f"Appointment dict: {appointment.dict(by_alias=True)}")

    result = await database.appointments.insert_one(appointment.dict(by_alias=True))
    appointment.id = str(result.inserted_id)

    return AppointmentResponse(
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