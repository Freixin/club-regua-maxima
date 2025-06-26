import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminCalendar.css';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Badge } from "./ui/badge";
import { Clock, User, Phone, Calendar as CalendarIcon, X } from 'lucide-react';

// Configurar localização para português
moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const AdminCalendar = ({ appointments = [] }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState('week');

  // Função para formatar agendamentos para o calendário
  const formatAppointments = (appointmentsData) => {
    return appointmentsData.map(appointment => {
      // Tratar diferentes formatos de data/hora
      let startDate;
      try {
        if (appointment.date && appointment.time) {
          // Formato: date="2025-06-25" time="09:00:00" ou "09:00"
          const timeStr = appointment.time.includes(':') ? appointment.time.split(':').slice(0, 2).join(':') : appointment.time;
          startDate = new Date(`${appointment.date}T${timeStr}:00`);
        } else {
          // Fallback para data atual
          startDate = new Date();
        }
      } catch (error) {
        console.error('Erro ao processar data/hora:', error, appointment);
        startDate = new Date();
      }
      
      const duration = appointment.duration || appointment.service_duration || 30;
      const endDate = new Date(startDate.getTime() + duration * 60000);
      
      return {
        id: appointment.id,
        title: `${appointment.client} - ${appointment.service}`,
        start: startDate,
        end: endDate,
        client: appointment.client,
        service: appointment.service,
        phone: appointment.phone,
        status: appointment.status || 'pending',
        resource: appointment
      };
    });
  };
  
  useEffect(() => {
    // Buscar agendamentos do backend se não foram fornecidos como prop
    const fetchAppointments = async () => {
      if (appointments.length === 0) {
        try {
          const response = await axios.get('http://localhost:8000/api/admin/calendar');
          if (response.data.success && response.data.data) {
            const formattedEvents = formatAppointments(response.data.data);
            setEvents(formattedEvents);
          }
        } catch (error) {
          console.error('Erro ao buscar agendamentos:', error);
        }
      } else {
        const formattedEvents = formatAppointments(appointments);
        setEvents(formattedEvents);
      }
    };
    
    fetchAppointments();
  }, [appointments]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#666'; // Padrão para pendente
    
    if (event.status === 'confirmed') {
      backgroundColor = '#D4AF37'; // Dourado para confirmado
    } else if (event.status === 'pending') {
      backgroundColor = '#FF8C00'; // Laranja para pendente
    } else if (event.status === 'cancelled') {
      backgroundColor = '#DC143C'; // Vermelho para cancelado
    }
    
    let style = {
      backgroundColor,
      borderRadius: '4px',
      color: '#fff',
      border: 'none',
      display: 'block',
      fontSize: '12px',
      padding: '2px 4px'
    };
    return { style };
  };

  return (
    <div className="h-full">
      <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[var(--color-text-gold)]">Calendário de Agendamentos</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant={view === 'month' ? 'default' : 'outline'} 
              onClick={() => setView('month')}
              className={view === 'month' ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 'border-[var(--color-gold)] text-[var(--color-gold)]'}
            >
              Mês
            </Button>
            <Button 
              variant={view === 'week' ? 'default' : 'outline'} 
              onClick={() => setView('week')}
              className={view === 'week' ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 'border-[var(--color-gold)] text-[var(--color-gold)]'}
            >
              Semana
            </Button>
            <Button 
              variant={view === 'day' ? 'default' : 'outline'} 
              onClick={() => setView('day')}
              className={view === 'day' ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 'border-[var(--color-gold)] text-[var(--color-gold)]'}
            >
              Dia
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventStyleGetter}
              view={view}
              onView={setView}
              messages={{
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                agenda: 'Agenda',
                date: 'Data',
                time: 'Hora',
                event: 'Evento',
                allDay: 'Dia Inteiro',
                previous: 'Anterior',
                next: 'Próximo',
                today: 'Hoje',
                showMore: total => `+ ${total} agendamentos`
              }}
              formats={{
                dayHeaderFormat: date => moment(date).format('dddd, D [de] MMMM'),
                dayRangeHeaderFormat: ({ start, end }) => 
                  `${moment(start).format('D [de] MMMM')} - ${moment(end).format('D [de] MMMM')}`,
                timeGutterFormat: date => moment(date).format('HH:mm'),
                eventTimeRangeFormat: ({ start, end }) => 
                  `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de detalhes do agendamento */}
      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-main)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--color-text-gold)]">Detalhes do Agendamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[var(--color-gold)]" />
                <div>
                  <Label className="text-[var(--color-text-gold)]">Cliente</Label>
                  <p className="text-[var(--color-text-main)]">{selectedEvent.client}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[var(--color-gold)]" />
                <div>
                  <Label className="text-[var(--color-text-gold)]">Telefone</Label>
                  <p className="text-[var(--color-text-main)]">{selectedEvent.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-[var(--color-gold)]" />
                <div>
                  <Label className="text-[var(--color-text-gold)]">Serviço</Label>
                  <p className="text-[var(--color-text-main)]">{selectedEvent.service}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[var(--color-gold)]" />
                <div>
                  <Label className="text-[var(--color-text-gold)]">Horário</Label>
                  <p className="text-[var(--color-text-main)]">
                    {moment(selectedEvent.start).format('DD/MM/YYYY [às] HH:mm')} - 
                    {moment(selectedEvent.end).format(' HH:mm')}
                  </p>
                </div>
              </div>
              
              <div>
                <Label className="text-[var(--color-text-gold)]">Status</Label>
                <Badge className={selectedEvent.status === 'confirmed' ? 
                  'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 
                  'bg-gray-500 text-white'}>
                  {selectedEvent.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                </Badge>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={handleCloseDialog}
                className="border-[var(--color-gold)] text-[var(--color-gold)]"
              >
                <X className="w-4 h-4 mr-2" />
                Fechar
              </Button>
              <Button 
                className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)]"
              >
                {selectedEvent.status === 'confirmed' ? 'Cancelar Agendamento' : 'Confirmar Agendamento'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminCalendar;