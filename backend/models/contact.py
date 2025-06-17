from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr = Field(..., description="Contact email")
    phone: Optional[str] = Field(None, max_length=20)
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=1000)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    responded: bool = Field(default=False)
    response_date: Optional[datetime] = None

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr = Field(..., description="Contact email")
    phone: Optional[str] = Field(None, max_length=20)
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=1000)

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    subject: Optional[str]
    message: str
    created_at: datetime
    responded: bool