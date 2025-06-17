import os
import requests
import logging
from typing import Optional
from datetime import datetime
from models.appointment import AppointmentResponse

logger = logging.getLogger(__name__)

class WhatsAppService:
    def __init__(self):
        self.access_token = os.environ.get('WHATSAPP_ACCESS_TOKEN')
        self.phone_number_id = os.environ.get('WHATSAPP_PHONE_NUMBER_ID')
        self.api_version = os.environ.get('WHATSAPP_API_VERSION', 'v21.0')
        self.base_url = f"https://graph.facebook.com/{self.api_version}"
        
    def is_configured(self) -> bool:
        """Check if WhatsApp is properly configured"""
        return bool(self.access_token and self.phone_number_id)
    
    async def send_appointment_confirmation(self, appointment: AppointmentResponse) -> bool:
        """Send appointment confirmation message"""
        if not self.is_configured():
            logger.warning("WhatsApp not configured - using mock confirmation")
            return await self._mock_confirmation(appointment)
        
        try:
            # Clean phone number (remove non-digits)
            phone = ''.join(filter(str.isdigit, appointment.customer_phone))
            
            # Ensure phone starts with country code
            if not phone.startswith('55'):
                phone = '55' + phone
            
            message = self._format_confirmation_message(appointment)
            
            response = await self._send_message(phone, message)
            
            if response:
                logger.info(f"Confirmation sent to {appointment.customer_phone}")
                return True
            else:
                logger.error(f"Failed to send confirmation to {appointment.customer_phone}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending WhatsApp confirmation: {e}")
            return False
    
    async def send_reminder(self, appointment: AppointmentResponse) -> bool:
        """Send appointment reminder message"""
        if not self.is_configured():
            logger.warning("WhatsApp not configured - using mock reminder")
            return True
        
        try:
            phone = ''.join(filter(str.isdigit, appointment.customer_phone))
            if not phone.startswith('55'):
                phone = '55' + phone
            
            message = self._format_reminder_message(appointment)
            
            response = await self._send_message(phone, message)
            
            if response:
                logger.info(f"Reminder sent to {appointment.customer_phone}")
                return True
            else:
                logger.error(f"Failed to send reminder to {appointment.customer_phone}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending WhatsApp reminder: {e}")
            return False
    
    async def _send_message(self, phone: str, message: str) -> Optional[dict]:
        """Send message via WhatsApp Business API"""
        url = f"{self.base_url}/{self.phone_number_id}/messages"
        
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            "messaging_product": "whatsapp",
            "to": phone,
            "type": "text",
            "text": {
                "body": message
            }
        }
        
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"WhatsApp API error: {e}")
            return None
    
    def _format_confirmation_message(self, appointment: AppointmentResponse) -> str:
        """Format appointment confirmation message"""
        date_str = appointment.appointment_date.strftime('%d/%m/%Y')
        time_str = appointment.appointment_time.strftime('%H:%M')
        
        message = f"""🎉 *Agendamento Confirmado!* 

*Club Régua Máxima*

👤 *Cliente:* {appointment.customer_name}
✂️ *Serviço:* {appointment.service_name}
💰 *Valor:* R$ {appointment.service_price:.2f}
📅 *Data:* {date_str}
🕐 *Horário:* {time_str}

📍 *Local:* Belford Roxo, RJ

💬 *Observações:* {appointment.notes or 'Nenhuma'}

Para alterações ou cancelamentos, responda esta mensagem.

Obrigado pela preferência! ✨"""
        
        return message
    
    def _format_reminder_message(self, appointment: AppointmentResponse) -> str:
        """Format appointment reminder message"""
        date_str = appointment.appointment_date.strftime('%d/%m/%Y')
        time_str = appointment.appointment_time.strftime('%H:%M')
        
        message = f"""🔔 *Lembrete de Agendamento*

*Club Régua Máxima*

Olá {appointment.customer_name}! 

Lembrando que você tem um agendamento:

✂️ *Serviço:* {appointment.service_name}
📅 *Amanhã:* {date_str}
🕐 *Horário:* {time_str}
📍 *Local:* Belford Roxo, RJ

Nos vemos em breve! 😊

Para cancelar, responda esta mensagem."""
        
        return message
    
    async def _mock_confirmation(self, appointment: AppointmentResponse) -> bool:
        """Mock WhatsApp confirmation for testing"""
        date_str = appointment.appointment_date.strftime('%d/%m/%Y')
        time_str = appointment.appointment_time.strftime('%H:%M')
        
        mock_message = f"""
MOCK WHATSAPP CONFIRMATION:
========================
Para: {appointment.customer_phone}
Cliente: {appointment.customer_name}
Serviço: {appointment.service_name}
Data: {date_str}
Horário: {time_str}
Valor: R$ {appointment.service_price:.2f}
========================
"""
        
        logger.info(mock_message)
        return True

# Global WhatsApp service instance
whatsapp_service = WhatsAppService()