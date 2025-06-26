from motor.motor_asyncio import AsyncIOMotorClient
from models.service import Service, SERVICES_DATA
import os
import logging

logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self):
        self.client = None
        self.db = None
    
    async def connect(self):
        """Connect to MongoDB"""
        try:
            mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
            db_name = os.environ.get('DB_NAME', 'barbershop')
            
            self.client = AsyncIOMotorClient(mongo_url)
            self.db = self.client[db_name]
            
            # Test connection
            await self.client.admin.command('ping')
            logger.info("Successfully connected to MongoDB")
            
            # Initialize services if empty
            await self.initialize_services()
            
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise
    
    async def disconnect(self):
        """Disconnect from MongoDB"""
        if self.client:
            self.client.close()
            logger.info("Disconnected from MongoDB")
    
    async def initialize_services(self):
        """Initialize services collection with predefined data"""
        try:
            services_count = await self.db.services.count_documents({})
            
            if services_count == 0:
                logger.info("Initializing services collection...")
                
                services = []
                for service_data in SERVICES_DATA:
                    service = Service(**service_data)
                    services.append(service.dict())
                
                await self.db.services.insert_many(services)
                logger.info(f"Inserted {len(services)} services")
            else:
                logger.info(f"Services collection already has {services_count} documents")
                
        except Exception as e:
            logger.error(f"Failed to initialize services: {e}")
    
    # Collections accessors
    @property
    def customers(self):
        return self.db.customers
    
    @property
    def services(self):
        return self.db.services
    
    @property
    def appointments(self):
        return self.db.appointments
    
    @property
    def contact_messages(self):
        return self.db.contact_messages

# Global database instance
database = DatabaseService()