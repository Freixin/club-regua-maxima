import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar as CalendarIcon, Users, MessageSquare, TrendingUp, Clock, Phone, Mail, CheckCircle, XCircle, Eye } from "lucide-react";
import AdminCalendar from "../components/AdminCalendar";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, appointmentsRes, messagesRes] = await Promise.all([
        axios.get('http://localhost:8000/api/admin/stats'),
        axios.get('http://localhost:8000/api/admin/appointments'),
        axios.get('http://localhost:8000/api/admin/messages')
      ]);
      
      setStats(statsRes.data.data);
      setAppointments(appointmentsRes.data.data);
      setMessages(messagesRes.data.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };



  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "appointments", label: "Agendamentos", icon: CalendarIcon },
    { id: "calendar", label: "Calendário", icon: CalendarIcon },
    { id: "messages", label: "Mensagens", icon: MessageSquare },
    { id: "clients", label: "Clientes", icon: Users }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-text-main)] text-sm">Hoje</p>
                <p className="text-2xl font-bold text-[var(--color-gold)]">{stats.todayAppointments}</p>
                <p className="text-[var(--color-text-main)] text-xs">agendamentos</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-text-main)] text-sm">Total</p>
                <p className="text-2xl font-bold text-[var(--color-gold)]">{stats.totalClients}</p>
                <p className="text-[var(--color-text-main)] text-xs">clientes</p>
              </div>
              <Users className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-text-main)] text-sm">Este Mês</p>
                <p className="text-2xl font-bold text-[var(--color-gold)]">R$ {stats.monthlyRevenue}</p>
                <p className="text-[var(--color-text-main)] text-xs">faturamento</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-text-main)] text-sm">Pendentes</p>
                <p className="text-2xl font-bold text-[var(--color-gold)]">{stats.pendingMessages}</p>
                <p className="text-[var(--color-text-main)] text-xs">mensagens</p>
              </div>
              <MessageSquare className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--color-text-gold)]">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)]">
              Novo Agendamento
            </Button>
            <Button variant="outline" className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)]">
              Ver Mensagens
            </Button>
            <Button 
              variant="outline" 
              className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)]"
              onClick={async () => {
                try {
                  await axios.post('http://localhost:8000/api/admin/populate-services');
                  alert('Serviços populados com sucesso!');
                } catch (error) {
                  alert('Erro ao popular serviços');
                }
              }}
            >
              Popular Serviços
            </Button>
            <Button variant="outline" className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)]">
              Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppointments = () => (
    <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
      <CardHeader>
        <CardTitle className="text-[var(--color-text-gold)]">Agendamentos de Hoje</CardTitle>
        <CardDescription className="text-[var(--color-text-main)]">
          Gerencie os agendamentos do dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-[var(--color-bg-main)] rounded-lg border border-[var(--color-border)]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-[var(--color-text-gold)] font-medium">{appointment.time}</span>
                </div>
                <div>
                  <p className="text-[var(--color-text-gold)] font-medium">{appointment.client}</p>
                  <p className="text-[var(--color-text-main)] text-sm">{appointment.service}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} 
                       className={appointment.status === "confirmed" ? "bg-[var(--color-gold)] text-[var(--color-bg-main)]" : ""}>
                  {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                </Badge>
                <Button size="sm" variant="outline" className="border-[var(--color-gold)] text-[var(--color-gold)]">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)]">
                  {appointment.status === "confirmed" ? <CheckCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderMessages = () => (
    <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
      <CardHeader>
        <CardTitle className="text-[var(--color-text-gold)]">Mensagens Recebidas</CardTitle>
        <CardDescription className="text-[var(--color-text-main)]">
          Mensagens do formulário de contato
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="p-4 bg-[var(--color-bg-main)] rounded-lg border border-[var(--color-border)]">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[var(--color-text-gold)] font-medium">{message.name}</p>
                  <p className="text-[var(--color-text-main)] text-sm">{message.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={message.status === "new" ? "default" : "secondary"}
                         className={message.status === "new" ? "bg-[var(--color-gold)] text-[var(--color-bg-main)]" : ""}>
                    {message.status === "new" ? "Nova" : message.status === "read" ? "Lida" : "Respondida"}
                  </Badge>
                  <span className="text-[var(--color-text-main)] text-xs">{message.time}</span>
                </div>
              </div>
              <p className="text-[var(--color-text-gold)] font-medium text-sm mb-1">{message.subject}</p>
              <p className="text-[var(--color-text-main)] text-sm">{message.message}</p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)]">
                  <Mail className="w-4 h-4 mr-1" />
                  Responder
                </Button>
                <Button size="sm" variant="outline" className="border-[var(--color-gold)] text-[var(--color-gold)]">
                  Marcar como Lida
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderClients = () => (
    <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
      <CardHeader>
        <CardTitle className="text-[var(--color-text-gold)]">Clientes</CardTitle>
        <CardDescription className="text-[var(--color-text-main)]">
          Lista de clientes cadastrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-4" />
          <p className="text-[var(--color-text-main)]">Funcionalidade em desenvolvimento</p>
        </div>
      </CardContent>
    </Card>
  );

  // Estado para os agendamentos do calendário
  const [calendarAppointments, setCalendarAppointments] = useState([]);

  // Buscar dados do calendário quando a aba for selecionada
  useEffect(() => {
    if (activeTab === "calendar") {
      axios.get('http://localhost:8000/api/admin/calendar')
        .then(response => {
          if (response.data.success) {
            setCalendarAppointments(response.data.data);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar dados do calendário:', error);
        });
    }
  }, [activeTab]);

  // Renderizar o calendário
  const renderCalendar = () => {
    return <AdminCalendar appointments={calendarAppointments} />;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard();
      case "appointments": return renderAppointments();
      case "calendar": return renderCalendar();
      case "messages": return renderMessages();
      case "clients": return renderClients();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-[var(--color-text-gold)] mb-6">Admin Panel</h1>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-[var(--color-gold)] text-[var(--color-bg-main)]"
                        : "text-[var(--color-text-main)] hover:bg-[var(--color-bg-main)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-text-gold)] mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className="text-[var(--color-text-main)]">
              Gerencie sua barbearia de forma eficiente
            </p>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;