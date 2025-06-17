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

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
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

class AppointmentCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=100)
    customer_phone: str = Field(..., min_length=10, max_length=20)
    customer_email: Optional[str] = None
    service_id: str = Field(..., description="Service ID")
    appointment_date: date = Field(..., description="Date of the appointment")
    appointment_time: time = Field(..., description="Time of the appointment")
    notes: Optional[str] = Field(None, max_length=500)

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