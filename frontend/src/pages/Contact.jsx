import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { barberInfo } from "../data/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Clock, Phone, Instagram, MessageCircle, Mail, Navigation, Star } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Mock form submission
    toast.success("Mensagem enviada! Responderemos em breve.");
    
    // Mock WhatsApp redirect for contact
    const whatsappMessage = `Olá! Meu nome é ${formData.name}. ${formData.message}`;
    console.log("Mock contact form:", formData);
    console.log("WhatsApp message:", whatsappMessage);
    
    // Reset form
    setFormData({
      name: "", email: "", phone: "", subject: "", message: ""
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone/WhatsApp",
      info: barberInfo.phone,
      description: "Ligue ou mande mensagem",
      action: () => {
        window.open(`https://wa.me/5521999999999?text=Olá! Gostaria de mais informações sobre a barbearia.`, '_blank');
      },
      color: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      icon: Instagram,
      title: "Instagram",
      info: barberInfo.instagram,
      description: "Siga para ver nossos trabalhos",
      action: () => {
        window.open('https://instagram.com/vinicius.clubreguamaxima', '_blank');
      },
      color: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    },
    {
      icon: MapPin,
      title: "Localização",
      info: barberInfo.address,
      description: "Venha nos visitar",
      action: () => {
        window.open(`https://maps.google.com/?q=${encodeURIComponent(barberInfo.address)}`, '_blank');
      },
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }
  ];

  const businessHours = [
    { day: "Segunda-feira", hours: barberInfo.hours.monday },
    { day: "Terça-feira", hours: barberInfo.hours.tuesday },
    { day: "Quarta-feira", hours: barberInfo.hours.wednesday },
    { day: "Quinta-feira", hours: barberInfo.hours.thursday },
    { day: "Sexta-feira", hours: barberInfo.hours.friday },
    { day: "Sábado", hours: barberInfo.hours.saturday },
    { day: "Domingo", hours: barberInfo.hours.sunday }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Entre em <span className="text-green-400">Contato</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Tem alguma dúvida ou precisa de mais informações? 
              Estamos aqui para ajudar! Entre em contato conosco.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Fale Conosco
              </h2>
              
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card 
                    key={index} 
                    className={`${method.color} cursor-pointer transition-all duration-300 hover:scale-105`}
                    onClick={method.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-current/20 p-3 rounded-full">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {method.title}
                          </h3>
                          <p className="font-medium mb-1">
                            {method.info}
                          </p>
                          <p className="text-sm opacity-80">
                            {method.description}
                          </p>
                        </div>
                        <Navigation className="w-5 h-5 opacity-60" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Business Hours */}
              <Card className="bg-slate-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-400" />
                    Horário de Funcionamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          {schedule.day}
                        </span>
                        <span className={`text-sm font-medium ${
                          schedule.hours === "Fechado" 
                            ? "text-red-400" 
                            : "text-green-400"
                        }`}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Summary */}
              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-1">4.9/5</div>
                  <div className="text-gray-300 text-sm">200+ avaliações</div>
                  <div className="text-green-400 text-xs mt-2 font-medium">
                    ⭐ Altamente recomendado
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Envie uma Mensagem
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Preencha o formulário abaixo e responderemos o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          Nome Completo *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-slate-800 border-gray-600 text-white"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">
                          E-mail *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-slate-800 border-gray-600 text-white"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-slate-800 border-gray-600 text-white"
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-white">
                          Assunto
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="bg-slate-800 border-gray-600 text-white"
                          placeholder="Qual o assunto?"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">
                        Mensagem *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-slate-800 border-gray-600 text-white min-h-[120px]"
                        placeholder="Escreva sua mensagem aqui..."
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 transition-all duration-300 hover:scale-105"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          const message = formData.message || "Gostaria de mais informações sobre a barbearia.";
                          window.open(`https://wa.me/5521999999999?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-semibold px-8 py-3 transition-all duration-300 hover:scale-105"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp Direto
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="bg-slate-900/50 border-gray-700 mb-16">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-green-400" />
                Nossa Localização
              </CardTitle>
              <CardDescription className="text-gray-400">
                Estamos localizados em Belford Roxo, RJ. Venha nos visitar!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Address Info */}
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-green-400 font-semibold text-lg mb-4">
                      Endereço Completo
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">
                            {barberInfo.address}
                          </p>
                          <p className="text-gray-400 text-sm">
                            (Local temporário)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h3 className="text-blue-400 font-semibold text-lg mb-4">
                      Como Chegar
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Próximo ao centro de Belford Roxo</li>
                      <li>• Fácil acesso por transporte público</li>
                      <li>• Estacionamento disponível na região</li>
                      <li>• Ponto de referência: Centro da cidade</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => {
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(barberInfo.address)}`, '_blank');
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Abrir no Google Maps
                  </Button>
                </div>

                {/* Map Placeholder */}
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
                  <div className="aspect-square lg:aspect-auto lg:h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Localização no Mapa
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Clique no botão acima para ver no Google Maps
                        </p>
                      </div>
                      <div className="text-green-400 text-sm">
                        📍 {barberInfo.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-slate-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Perguntas Frequentes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Tire suas dúvidas principais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "Preciso agendar?",
                    answer: "Sim, trabalhamos apenas com agendamento para garantir o melhor atendimento."
                  },
                  {
                    question: "Qual forma de pagamento?",
                    answer: "Aceitamos dinheiro, PIX, cartão de débito e crédito."
                  },
                  {
                    question: "Fazem corte infantil?",
                    answer: "Sim! Temos corte kids com preço especial e muito carinho."
                  },
                  {
                    question: "Como cancelar agendamento?",
                    answer: "Pelo WhatsApp com pelo menos 2 horas de antecedência."
                  },
                  {
                    question: "Fazem domicílio?",
                    answer: "Atualmente atendemos apenas na barbearia."
                  },
                  {
                    question: "Primeira vez tem desconto?",
                    answer: "Entre em contato pelo WhatsApp e confira nossas promoções!"
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-green-400 font-semibold mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;