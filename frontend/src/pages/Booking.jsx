import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { services, timeSlots } from "../data/mock";
import AnimatedSection from "../components/AnimatedSection";
import LoadingSpinner from "../components/LoadingSpinner";

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [servicesList, setServicesList] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    // Busca os serviços reais do backend
    fetch("http://localhost:8000/api/services")
      .then((res) => res.json())
      .then((data) => setServicesList(data))
      .catch(() => {
        // Fallback para todos os serviços do mock
        setServicesList(services);
      });
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      setLoadingSlots(true);
      
      fetch(`http://localhost:8000/api/appointments/available-slots?appointment_date=${selectedDate}&service_id=${selectedService.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Backend error');
          return res.json();
        })
        .then((data) => {
          setAvailableSlots(data.filter(slot => slot.available).map(slot => slot.time));
          setLoadingSlots(false);
        })
        .catch((error) => {
          console.log('Backend não disponível, usando mock:', error.message);
          setAvailableSlots(timeSlots);
          setLoadingSlots(false);
        });
    } else {
      setAvailableSlots([]);
    }
  }, [selectedService, selectedDate]);

  const steps = [
    { number: 1, title: "Escolha o Serviço", icon: User },
    { number: 2, title: "Data e Horário", icon: Calendar },
    { number: 3, title: "Seus Dados", icon: Phone },
    { number: 4, title: "Confirmação", icon: CheckCircle2 }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateTimeSelect = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Selecione data e horário");
      return;
    }
    setCurrentStep(3);
  };

  const handleCustomerSubmit = () => {
    if (!customerData.name || !customerData.phone) {
      toast.error("Preencha nome e telefone");
      return;
    }
    setCurrentStep(4);
  };

  const handleFinalBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerData.name || !customerData.phone) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      // Ajuste: payload deve ter os campos exatamente como o backend espera
      const payload = {
        customer_name: customerData.name,
        customer_phone: customerData.phone,
        service: String(selectedService.id), // Garante string
        date_time: `${selectedDate}T${selectedTime}:00`, // ISO completo
      };
      if (customerData.notes && customerData.notes.trim() !== "") {
        payload.notes = customerData.notes;
      }
      const response = await fetch("http://localhost:8000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Agendamento confirmado! Você receberá um lembrete no WhatsApp.");
        setTimeout(() => {
          setCurrentStep(1);
          setSelectedService(null);
          setSelectedDate("");
          setSelectedTime("");
          setCustomerData({ name: "", phone: "", email: "", notes: "" });
        }, 3000);
      } else {
        // Exibe mensagem amigável do backend (inclusive para erro 422)
        toast.error(data.detail || "Erro ao agendar. Tente novamente.");
      }
    } catch (err) {
      toast.error("Erro de conexão com o servidor.");
    }
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Corte": "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/20",
      "Barba": "bg-[var(--color-gold)]/10 text-[var(--color-text-gold)] border-[var(--color-gold)]/20",
      "Combo": "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/20",
      "Premium": "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/20",
      "Sobrancelha": "bg-[var(--color-gold)]/10 text-[var(--color-text-gold)] border-[var(--color-gold)]/20",
      "Acabamento": "bg-[var(--color-gold)]/10 text-[var(--color-text-gold)] border-[var(--color-gold)]/20"
    };
    return colors[category] || "bg-[var(--color-bg-secondary)]/10 text-[var(--color-text-main)] border-[var(--color-border)]";
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Header />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-gold)] mb-4 hover-glow">
                Faça seu <span className="text-[var(--color-gold)] animate-float">Agendamento</span>
              </h1>
              <p className="text-[var(--color-text-main)] text-lg">
                Processo rápido e fácil. Você receberá confirmação por WhatsApp.
              </p>
            </div>
          </AnimatedSection>

          {/* Progress Steps */}
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;
                  
                  return (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover-lift ${
                        isActive ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)] animate-pulse-glow" : 
                        isCompleted ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]" : 
                        "bg-[var(--color-bg-secondary)] text-[var(--color-text-main)]"
                      }`} style={{animationDelay: `${index * 100}ms`}}>
                        <Icon className="w-5 h-5" />
                        <span className="hidden sm:block text-sm font-medium">{step.title}</span>
                        <span className="sm:hidden text-sm font-medium">{step.number}</span>
                      </div>
                      {step.number < steps.length && (
                        <ArrowRight className="w-4 h-4 text-gray-500 mx-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Step Content */}
          <AnimatedSection animation="fadeInUp" delay={250}>
            <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover-glow">
              <CardHeader>
                <CardTitle className="text-[var(--color-text-gold)] text-2xl hover-glow">
                  {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <p className="text-[var(--color-text-main)]">Escolha o serviço desejado:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(servicesList.length > 0 ? servicesList : []).map((service) => (
                      <Card 
                        key={service.id} 
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 hover-lift hover-glow ${
                          selectedService?.id === service.id 
                            ? "bg-[var(--color-gold)]/20 border-[var(--color-gold)] animate-pulse-glow" 
                            : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)]/50"
                        }`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge className={getCategoryColor(service.category)}>
                                {service.category}
                              </Badge>
                              <div className="text-lg font-bold text-[var(--color-gold)]">
                                R$ {service.price}
                              </div>
                            </div>
                            <h3 className="text-[var(--color-text-gold)] font-semibold text-sm leading-tight">
                              {service.name}
                            </h3>
                            <div className="flex items-center text-[var(--color-text-main)] text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration} min
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-lg p-4">
                    <h3 className="text-[var(--color-gold)] font-semibold mb-2">Serviço Selecionado:</h3>
                    <p className="text-[var(--color-text-gold)]">{selectedService?.name}</p>
                    <p className="text-[var(--color-text-main)] text-sm">
                      Duração: {selectedService?.duration} min • Valor: R$ {selectedService?.price}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div>
                      <Label className="text-[var(--color-text-gold)] text-lg mb-4 block">Escolha a Data:</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {generateAvailableDates().map((date) => (
                          <Button
                            key={date}
                            variant={selectedDate === date ? "default" : "outline"}
                            className={`p-3 h-auto ${
                              selectedDate === date
                                ? "bg-[var(--color-gold)] text-[var(--color-bg-main)]"
                                : "border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-gold)]"
                            }`}
                            onClick={() => setSelectedDate(date)}
                          >
                            <div className="text-center">
                              <div className="font-semibold">
                                {new Date(date).toLocaleDateString('pt-BR', { 
                                  day: '2-digit', 
                                  month: '2-digit' 
                                })}
                              </div>
                              <div className="text-xs">
                                {new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <Label className="text-[var(--color-text-gold)] text-lg mb-4 block">Escolha o Horário:</Label>
                      {loadingSlots ? (
                        <div className="flex justify-center py-8">
                          <LoadingSpinner text="Carregando horários disponíveis..." />
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.length === 0 && (
                            <div className="col-span-3 text-[var(--color-text-main)]">Nenhum horário disponível</div>
                          )}
                          {availableSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              className={`transition-all duration-300 hover-lift hover-glow ${
                                selectedTime === time
                                  ? "bg-[var(--color-gold)] text-[var(--color-bg-main)] animate-pulse-glow"
                                  : "border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-gold)]"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-gold)]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleDateTimeSelect}
                      className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)]"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Customer Data */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-lg p-4">
                    <h3 className="text-[var(--color-gold)] font-semibold mb-2">Resumo do Agendamento:</h3>
                    <p className="text-[var(--color-text-gold)]">{selectedService?.name}</p>
                    <p className="text-[var(--color-text-main)] text-sm">
                      {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[var(--color-text-gold)]">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                        className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-main)]"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[var(--color-text-gold)]">Telefone/WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                        className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-main)]"
                        placeholder="(21) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[var(--color-text-gold)]">E-mail (opcional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-main)]"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-[var(--color-text-gold)]">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={customerData.notes}
                      onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                      className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-main)]"
                      placeholder="Alguma preferência ou observação especial..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                      className="border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-gold)]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleCustomerSubmit}
                      className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)]"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-lg p-6">
                    <h3 className="text-[var(--color-gold)] font-semibold text-xl mb-4 flex items-center">
                      <CheckCircle2 className="w-6 h-6 mr-2" />
                      Confirme seu Agendamento
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-[var(--color-text-gold)] font-medium mb-2">Serviço:</h4>
                          <p className="text-[var(--color-text-main)]">{selectedService?.name}</p>
                          <p className="text-[var(--color-gold)] font-bold text-lg">R$ {selectedService?.price}</p>
                        </div>
                        <div>
                          <h4 className="text-[var(--color-text-gold)] font-medium mb-2">Data e Horário:</h4>
                          <p className="text-[var(--color-text-main)]">
                            {new Date(selectedDate).toLocaleDateString('pt-BR', { 
                              weekday: 'long',
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-[var(--color-gold)] font-bold">{selectedTime}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-[var(--color-text-gold)] font-medium mb-2">Cliente:</h4>
                        <p className="text-[var(--color-text-main)]">{customerData.name}</p>
                        <p className="text-[var(--color-text-main)]">{customerData.phone}</p>
                        {customerData.email && <p className="text-[var(--color-text-main)]">{customerData.email}</p>}
                      </div>

                      {customerData.notes && (
                        <div>
                          <h4 className="text-[var(--color-text-gold)] font-medium mb-2">Observações:</h4>
                          <p className="text-[var(--color-text-main)]">{customerData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[var(--color-text-gold)]/10 border border-[var(--color-text-gold)]/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-[var(--color-text-gold)] mt-1" />
                      <div>
                        <h4 className="text-[var(--color-text-gold)] font-medium mb-1">Lembrete WhatsApp</h4>
                        <p className="text-[var(--color-text-main)] text-sm">
                          Você receberá uma confirmação e lembretes automáticos no WhatsApp 
                          cadastrado. Não esqueça de verificar suas mensagens!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(3)}
                      className="border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-gold)]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleFinalBooking}
                      className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-bold px-8"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Confirmar Agendamento
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;