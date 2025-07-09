import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function sendMessage(to, message) {
  try {
    const response = await axios.post(`${API_URL}/send`, { to, message });
    console.log('Resposta da API:', response.data);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response ? error.response.data : error.message);
  }
}

const to = process.argv[2];
const message = process.argv.slice(3).join(' ');

if (!to || !message) {
  console.log('Uso: node sendMessage.js <numero_destino> <mensagem>');
  console.log('Exemplo: node sendMessage.js 5521999999999 Olá, tudo bem?');
  process.exit(1);
}

sendMessage(to, message);
