import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarIcon, Clock, User, Phone } from 'lucide-react';

const SimpleAdminCalendar = ({ appointments = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week'); // 'day', 'week', 'month'

  useEffect(() => {
    // Buscar agendamentos do backend se não foram fornecidos como prop
    const fetchAppointments = async () => {
      if (appointments.length === 0) {
        try {
          const response = await axios.get('http://localhost:8000/api/admin/calendar');
          if (response.data.success && response.data.data) {
            setEvents(response.data.data);
          }
        } catch (error) {
          console.error('Erro ao buscar agendamentos:', error);
        }
      } else {
        setEvents(appointments);
      }
    };
    
    fetchAppointments();
  }, [appointments]);

  // Funções para navegação no calendário
  const goToToday = () => setCurrentDate(new Date());
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') newDate.setDate(newDate.getDate() - 1);
    else if (view === 'week') newDate.setDate(newDate.getDate() - 7);
    else if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') newDate.setDate(newDate.getDate() + 1);
    else if (view === 'week') newDate.setDate(newDate.getDate() + 7);
    else if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Formatar data para exibição
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Filtrar eventos para a data atual
  const getEventsForCurrentView = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      
      if (view === 'day') {
        return eventDate.toDateString() === currentDate.toDateString();
      } else if (view === 'week') {
        // Calcular início e fim da semana
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      } else if (view === 'month') {
        return eventDate.getMonth() === currentDate.getMonth() && 
               eventDate.getFullYear() === currentDate.getFullYear();
      }
      return false;
    });
  };

  // Renderizar título do calendário
  const renderCalendarTitle = () => {
    if (view === 'day') {
      return formatDate(currentDate);
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('pt-BR')} - ${endOfWeek.toLocaleDateString('pt-BR')}`;
    } else if (view === 'month') {
      return currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    }
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
          <div className="mb-4 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={goToPrevious}
              className="border-[var(--color-gold)] text-[var(--color-gold)]"
            >
              Anterior
            </Button>
            <h3 className="text-xl font-semibold text-[var(--color-text-gold)]">
              {renderCalendarTitle()}
            </h3>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={goToToday}
                className="border-[var(--color-gold)] text-[var(--color-gold)]"
              >
                Hoje
              </Button>
              <Button 
                variant="outline" 
                onClick={goToNext}
                className="border-[var(--color-gold)] text-[var(--color-gold)]"
              >
                Próximo
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            {getEventsForCurrentView().length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-4" />
                <p className="text-[var(--color-text-main)]">Nenhum agendamento encontrado para este período</p>
              </div>
            ) : (
              getEventsForCurrentView().map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-4 bg-[var(--color-bg-main)] rounded-lg border border-[var(--color-border)]"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center justify-center bg-[var(--color-gold)]/10 p-2 rounded-lg">
                      <span className="text-[var(--color-text-gold)] font-medium">
                        {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="text-[var(--color-gold)] font-bold">{event.time}</span>
                    </div>
                    <div>
                      <p className="text-[var(--color-text-gold)] font-medium">{event.client}</p>
                      <div className="flex items-center text-[var(--color-text-main)] text-sm">
                        <Clock className="w-4 h-4 mr-1 text-[var(--color-gold)]" />
                        {event.service} ({event.duration} min)
                      </div>
                      <div className="flex items-center text-[var(--color-text-main)] text-sm mt-1">
                        <Phone className="w-4 h-4 mr-1 text-[var(--color-gold)]" />
                        {event.phone}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Badge 
                      className={event.status === 'confirmed' ? 
                        'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 
                        'bg-gray-500 text-white'}
                    >
                      {event.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleAdminCalendar;