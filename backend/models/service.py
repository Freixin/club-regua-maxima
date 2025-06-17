from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    price: float = Field(..., gt=0)
    duration: int = Field(..., gt=0, description="Duration in minutes")
    category: str = Field(..., min_length=2, max_length=50)
    description: Optional[str] = Field(None, max_length=500)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    price: float = Field(..., gt=0)
    duration: int = Field(..., gt=0, description="Duration in minutes")
    category: str = Field(..., min_length=2, max_length=50)
    description: Optional[str] = Field(None, max_length=500)

class ServiceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    price: Optional[float] = Field(None, gt=0)
    duration: Optional[int] = Field(None, gt=0)
    category: Optional[str] = Field(None, min_length=2, max_length=50)
    description: Optional[str] = Field(None, max_length=500)
    is_active: Optional[bool] = None

# Predefined services data
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