# 🚀 Guia de Deploy - Club Régua Máxima

Este guia te ajudará a colocar seu projeto online gratuitamente!

## 📋 Pré-requisitos

- [x] Projeto commitado no GitHub
- [x] Conta no GitHub
- [ ] Conta na Vercel (gratuita)
- [ ] MongoDB Atlas (gratuito)

## 🌐 Opção 1: Deploy Completo na Vercel (RECOMENDADO)

### 1️⃣ Configurar MongoDB Atlas (Banco de Dados)

1. **Acesse**: https://www.mongodb.com/cloud/atlas
2. **Crie uma conta** gratuita
3. **Crie um cluster** (M0 - Free)
4. **Configure**:
   - Database Access → Add User
   - Network Access → Add IP (0.0.0.0/0 para permitir qualquer IP)
5. **Copie a Connection String**:
   - Connect → Connect to Application
   - Copie algo como: `mongodb+srv://user:password@cluster.xyz.mongodb.net/barbershop`

### 2️⃣ Deploy na Vercel

1. **Acesse**: https://vercel.com
2. **Entre com GitHub**
3. **Import Project** → Selecione seu repositório
4. **Configure Environment Variables**:
   ```
   MONGODB_URL=sua_connection_string_aqui
   JWT_SECRET=sua_chave_secreta_aqui_123
   ```
5. **Deploy!**

### 3️⃣ Configurar Domínio Personalizado (Opcional)

1. **Na Vercel** → Settings → Domains
2. **Adicione seu domínio** ou use o gratuito: `projeto.vercel.app`

## 🌐 Opção 2: Deploy Separado (Frontend + Backend)

### Frontend na Netlify:
1. **Build Command**: `cd frontend && npm run build`
2. **Publish Directory**: `frontend/build`

### Backend na Railway:
1. **Conecte GitHub**
2. **Selecione pasta**: `backend/`
3. **Configure variáveis** de ambiente

## 🔧 Configurações Necessárias

### Variáveis de Ambiente:
```env
# MongoDB
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/barbershop

# JWT
JWT_SECRET=sua_chave_secreta_super_forte_aqui

# Cors (para produção)
FRONTEND_URL=https://seu-projeto.vercel.app
```

### WhatsApp Bot:
Para o WhatsApp funcionar em produção, você precisará:
1. **Servidor dedicado** (VPS/Railway) para manter a sessão
2. **Ou adaptar** para webhook do WhatsApp Business API

## 📱 URLs Finais:

Após o deploy, você terá:
- **Site Principal**: `https://seu-projeto.vercel.app`
- **API**: `https://seu-projeto.vercel.app/api`
- **Admin**: `https://seu-projeto.vercel.app/admin`

## 🎯 Checklist de Deploy:

- [ ] MongoDB Atlas configurado
- [ ] Variáveis de ambiente definidas
- [ ] Build do frontend funcionando
- [ ] API respondendo
- [ ] Domínio personalizado (opcional)
- [ ] SSL habilitado (automático)
- [ ] WhatsApp bot adaptado para produção

## 🆘 Problemas Comuns:

### Build Error:
- Verifique se todas as dependências estão no package.json
- Execute `npm run build` localmente primeiro

### API Error:
- Confirme as variáveis de ambiente
- Verifique connection string do MongoDB

### CORS Error:
- Configure FRONTEND_URL corretamente
- Adicione domínio nas configurações de CORS

## 🚀 Deploy Rápido (5 minutos):

1. **MongoDB Atlas** → Criar cluster → Copiar connection string
2. **Vercel** → Import GitHub repo → Add env vars → Deploy
3. **Testar** → Abrir URL → Verificar funcionamento

Seu projeto estará online em menos de 10 minutos! 🎉
