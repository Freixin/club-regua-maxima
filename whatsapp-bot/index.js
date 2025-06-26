// WhatsApp bot com Baileys + API HTTP para envio de mensagens
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys'
import express from 'express'
import { Boom } from '@hapi/boom'
import qrcode from 'qrcode-terminal'
import cors from 'cors'

const PORT = 3001
const app = express()
app.use(express.json())
app.use(cors()) // Habilitar CORS para todas as rotas

let sock = null

let connectionRetries = 0;
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 10000; // 10 segundos

async function startSock() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      defaultQueryTimeoutMs: 60_000,
      syncFullHistory: false,
      connectTimeoutMs: 60000,
      keepAliveIntervalMs: 25000,
      retryRequestDelayMs: 5000
    })

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update
      
      if (qr) {
        qrcode.generate(qr, { small: true })
        console.log('Escaneie o QR Code acima com o WhatsApp!')
        console.log('Após escanear, aguarde a mensagem de conexão...')
      }
      
      if (connection === 'close') {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        console.log(`Conexão fechada. Código: ${statusCode || 'desconhecido'}`)
        
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut
        
        if (shouldReconnect && connectionRetries < MAX_RETRIES) {
          connectionRetries++;
          console.log(`Tentando reconectar (${connectionRetries}/${MAX_RETRIES})...`)
          setTimeout(() => {
            startSock()
          }, RETRY_INTERVAL)
        } else if (connectionRetries >= MAX_RETRIES) {
          console.error('Número máximo de tentativas de reconexão atingido.')
          console.log('Execute o script novamente para tentar reconectar.')
        }
      }
      
      if (connection === 'open') {
        connectionRetries = 0; // Resetar contador de tentativas
        console.log('✅ WhatsApp conectado!')
        console.log(`ID do usuário: ${sock.user?.id || 'desconhecido'}`)
      }
    })
    
    // Adicionar tratamento de erros
    sock.ev.on('messages.update', () => {
      // Manter a conexão ativa
    })
  } catch (error) {
    console.error('Erro ao iniciar conexão:', error)
    if (connectionRetries < MAX_RETRIES) {
      connectionRetries++;
      console.log(`Tentando reconectar após erro (${connectionRetries}/${MAX_RETRIES})...`)
      setTimeout(() => {
        startSock()
      }, RETRY_INTERVAL)
    }
  }
}
}

startSock()

// API para enviar mensagem
// Endpoint para verificar status do serviço
app.get('/status', (req, res) => {
  const statusData = {
    status: (sock && sock.user) ? 'connected' : 'disconnected',
    user: (sock && sock.user) ? sock.user.id : null,
    connected: !!(sock && sock.user),
    timestamp: new Date().toISOString()
  };
  
  // Suporte a JSONP
  const callback = req.query.callback;
  if (callback) {
    return res.type('text/javascript').send(`${callback}(${JSON.stringify(statusData)})`);
  }
  
  // Resposta JSON padrão
  res.json(statusData);
})

app.post('/send', async (req, res) => {
  const { to, message } = req.body
  if (!to || !message) {
    return res.status(400).json({ error: 'to e message são obrigatórios' })
  }
  
  // Verificar se o WhatsApp está conectado
  if (!sock || !sock.user) {
    console.log('WhatsApp não está conectado. Tentando reconectar...')
    // Tentar reconectar
    startSock()
    return res.status(503).json({ 
      error: 'WhatsApp não está conectado', 
      message: 'Tentando reconectar. Tente novamente em alguns segundos.' 
    })
  }
  
  try {
    // Garante formato internacional (ex: 5511999999999@s.whatsapp.net)
    let jid = to.replace(/\D/g, '')
    if (!jid.endsWith('@s.whatsapp.net')) {
      jid = jid + '@s.whatsapp.net'
    }
    
    console.log(`Enviando mensagem para ${jid}...`)
    const result = await sock.sendMessage(jid, { text: message })
    console.log('Mensagem enviada com sucesso!')
    res.json({ success: true, messageId: result?.key?.id })
  } catch (err) {
    console.error(`Erro ao enviar mensagem: ${err.message}`)
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`API WhatsApp rodando em http://localhost:${PORT}`)
})
