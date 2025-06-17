import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { services, timeSlots } from "../data/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

  const handleFinalBooking = () => {
    // Mock booking confirmation
    toast.success("Agendamento confirmado! Você receberá um lembrete no WhatsApp.");
    
    // Mock WhatsApp message
    const message = `Olá! Seu agendamento foi confirmado:
    
Serviço: ${selectedService.name}
Data: ${new Date(selectedDate).toLocaleDateString('pt-BR')}
Horário: ${selectedTime}
Valor: R$ ${selectedService.price}
    
Club Régua Máxima - Belford Roxo, RJ`;
    
    console.log("Mock WhatsApp message:", message);
    
    // Reset form
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedService(null);
      setSelectedDate("");
      setSelectedTime("");
      setCustomerData({ name: "", phone: "", email: "", notes: "" });
    }, 3000);
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
      "Corte": "bg-blue-500/10 text-blue-400 border-blue-500/20",
      "Barba": "bg-orange-500/10 text-orange-400 border-orange-500/20",
      "Combo": "bg-purple-500/10 text-purple-400 border-purple-500/20",
      "Premium": "bg-green-500/10 text-green-400 border-green-500/20",
      "Sobrancelha": "bg-pink-500/10 text-pink-400 border-pink-500/20",
      "Acabamento": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };
    return colors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Faça seu <span className="text-green-400">Agendamento</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Processo rápido e fácil. Você receberá confirmação por WhatsApp.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-green-500/20 text-green-400" : 
                      isCompleted ? "bg-green-500/10 text-green-500" : 
                      "bg-slate-800 text-gray-400"
                    }`}>
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

          {/* Step Content */}
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <p className="text-gray-300">Escolha o serviço desejado:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Card 
                        key={service.id} 
                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedService?.id === service.id 
                            ? "bg-green-500/20 border-green-500" 
                            : "bg-slate-800 border-gray-600 hover:border-green-500/50"
                        }`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge className={getCategoryColor(service.category)}>
                                {service.category}
                              </Badge>
                              <div className="text-lg font-bold text-green-400">
                                R$ {service.price}
                              </div>
                            </div>
                            <h3 className="text-white font-semibold text-sm leading-tight">
                              {service.name}
                            </h3>
                            <div className="flex items-center text-gray-400 text-xs">
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
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h3 className="text-green-400 font-semibold mb-2">Serviço Selecionado:</h3>
                    <p className="text-white">{selectedService?.name}</p>
                    <p className="text-gray-300 text-sm">
                      Duração: {selectedService?.duration} min • Valor: R$ {selectedService?.price}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div>
                      <Label className="text-white text-lg mb-4 block">Escolha a Data:</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {generateAvailableDates().map((date) => (
                          <Button
                            key={date}
                            variant={selectedDate === date ? "default" : "outline"}
                            className={`p-3 h-auto ${
                              selectedDate === date
                                ? "bg-green-500 text-white"
                                : "border-gray-600 text-gray-300 hover:border-green-500"
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
                      <Label className="text-white text-lg mb-4 block">Escolha o Horário:</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`${
                              selectedTime === time
                                ? "bg-green-500 text-white"
                                : "border-gray-600 text-gray-300 hover:border-green-500"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="border-gray-600 text-gray-300 hover:border-green-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleDateTimeSelect}
                      className="bg-green-500 hover:bg-green-600 text-white"
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
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h3 className="text-green-400 font-semibold mb-2">Resumo do Agendamento:</h3>
                    <p className="text-white">{selectedService?.name}</p>
                    <p className="text-gray-300 text-sm">
                      {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                        className="bg-slate-800 border-gray-600 text-white"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Telefone/WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                        className="bg-slate-800 border-gray-600 text-white"
                        placeholder="(21) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">E-mail (opcional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      className="bg-slate-800 border-gray-600 text-white"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={customerData.notes}
                      onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                      className="bg-slate-800 border-gray-600 text-white"
                      placeholder="Alguma preferência ou observação especial..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                      className="border-gray-600 text-gray-300 hover:border-green-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleCustomerSubmit}
                      className="bg-green-500 hover:bg-green-600 text-white"
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
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-green-400 font-semibold text-xl mb-4 flex items-center">
                      <CheckCircle2 className="w-6 h-6 mr-2" />
                      Confirme seu Agendamento
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Serviço:</h4>
                          <p className="text-gray-300">{selectedService?.name}</p>
                          <p className="text-green-400 font-bold text-lg">R$ {selectedService?.price}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Data e Horário:</h4>
                          <p className="text-gray-300">
                            {new Date(selectedDate).toLocaleDateString('pt-BR', { 
                              weekday: 'long',
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-green-400 font-bold">{selectedTime}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">Cliente:</h4>
                        <p className="text-gray-300">{customerData.name}</p>
                        <p className="text-gray-300">{customerData.phone}</p>
                        {customerData.email && <p className="text-gray-300">{customerData.email}</p>}
                      </div>

                      {customerData.notes && (
                        <div>
                          <h4 className="text-white font-medium mb-2">Observações:</h4>
                          <p className="text-gray-300">{customerData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <h4 className="text-blue-400 font-medium mb-1">Lembrete WhatsApp</h4>
                        <p className="text-gray-300 text-sm">
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
                      className="border-gray-600 text-gray-300 hover:border-green-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button 
                      onClick={handleFinalBooking}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-8"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Confirmar Agendamento
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;