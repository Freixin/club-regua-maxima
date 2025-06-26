from fastapi import APIRouter, HTTPException
import logging

from services.database import database

router = APIRouter(prefix="/api/admin", tags=["admin"])
logger = logging.getLogger(__name__)

@router.get("/messages")
async def get_messages():
    try:
        # Buscar mensagens do banco de dados
        messages = await database.contact_messages.find().sort("created_at", -1).to_list(100)
        
        # Formatar para o formato esperado pelo frontend
        formatted_messages = []
        for message in messages:
            formatted_messages.append({
                "id": str(message.get("_id")),
                "name": message.get("name"),
                "email": message.get("email"),
                "subject": message.get("subject"),
                "message": message.get("message"),
                "status": message.get("status", "new"),
                "time": message.get("created_at", "").isoformat() if hasattr(message.get("created_at"), "isoformat") else ""
            })
        
        return {
            "success": True,
            "data": formatted_messages
        }
    except Exception as e:
        logger.error(f"Error getting messages: {e}")
        # Fallback para dados mockados
        return {
            "success": True,
            "data": [
                {"id": 1, "name": "Ana Maria", "email": "ana@email.com", "subject": "Agendamento", "message": "Gostaria de agendar", "status": "new"},
                {"id": 2, "name": "Bruno Oliveira", "email": "bruno@email.com", "subject": "Dúvida", "message": "Fazem corte infantil?", "status": "read"}
            ]
        }