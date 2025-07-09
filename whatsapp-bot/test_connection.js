import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function testConnection() {
  try {
    const response = await axios.get(`${API_URL}/status`);
    console.log('Status da conexão:', response.data);
  } catch (error) { 
    console.error('Erro ao verificar status:', error.message);
  }
}

testConnection();
