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
      color: "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/20"
    },
    {
      icon: Instagram,
      title: "Instagram",
      info: barberInfo.instagram,
      description: "Siga para ver nossos trabalhos",
      action: () => {
        window.open('https://instagram.com/vinicius.clubreguamaxima', '_blank');
      },
      color: "bg-[var(--color-text-gold)]/10 text-[var(--color-text-gold)] border-[var(--color-text-gold)]/20"
    },
    {
      icon: MapPin,
      title: "Localização",
      info: barberInfo.address,
      description: "Venha nos visitar",
      action: () => {
        window.open(`https://maps.google.com/?q=${encodeURIComponent(barberInfo.address)}`, '_blank');
      },
      color: "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/20"
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
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Header />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-gold)] mb-4">
              Entre em <span className="text-[var(--color-gold)]">Contato</span>
            </h1>
            <p className="text-[var(--color-text-main)] text-lg max-w-3xl mx-auto">
              Tem alguma dúvida ou precisa de mais informações? 
              Estamos aqui para ajudar! Entre em contato conosco.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-[var(--color-text-gold)] mb-6">
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
              <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text-gold)] flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[var(--color-gold)]" />
                    Horário de Funcionamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-[var(--color-text-main)] text-sm">
                          {schedule.day}
                        </span>
                        <span className={`text-sm font-medium ${
                          schedule.hours === "Fechado" 
                            ? "text-[var(--color-text-gold)]" 
                            : "text-[var(--color-gold)]"
                        }`}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Summary */}
              <Card className="bg-[var(--color-gold)]/10 border-[var(--color-gold)]/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--color-gold)] fill-current" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-gold)] mb-1">4.9/5</div>
                  <div className="text-[var(--color-text-main)] text-sm">200+ avaliações</div>
                  <div className="text-[var(--color-gold)] text-xs mt-2 font-medium">
                    ⭐ Altamente recomendado
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text-gold)] text-2xl">
                    Envie uma Mensagem
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-main)]">
                    Preencha o formulário abaixo e responderemos o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-[var(--color-text-gold)]">
                          Nome Completo *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-[var(--color-bg-main)] border-[var(--color-border)] text-[var(--color-text-main)]"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-[var(--color-text-gold)]">
                          E-mail *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-[var(--color-bg-main)] border-[var(--color-border)] text-[var(--color-text-main)]"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-[var(--color-text-gold)]">
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-[var(--color-bg-main)] border-[var(--color-border)] text-[var(--color-text-main)]"
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-[var(--color-text-gold)]">
                          Assunto
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="bg-[var(--color-bg-main)] border-[var(--color-border)] text-[var(--color-text-main)]"
                          placeholder="Qual o assunto?"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[var(--color-text-gold)]">
                        Mensagem *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-[var(--color-bg-main)] border-[var(--color-border)] text-[var(--color-text-main)] min-h-[120px]"
                        placeholder="Escreva sua mensagem aqui..."
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-semibold px-8 py-3"
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
                        className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)] font-semibold px-8 py-3"
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
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] mb-16">
            <CardHeader>
              <CardTitle className="text-[var(--color-text-gold)] text-2xl flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-[var(--color-gold)]" />
                Nossa Localização
              </CardTitle>
              <CardDescription className="text-[var(--color-text-main)]">
                Estamos localizados em Belford Roxo, RJ. Venha nos visitar!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Address Info */}
                <div className="space-y-6">
                  <div className="bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-lg p-6">
                    <h3 className="text-[var(--color-gold)] font-semibold text-lg mb-4">
                      Endereço Completo
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
                        <div>
                          <p className="text-[var(--color-text-gold)] font-medium">
                            {barberInfo.address}
                          </p>
                          <p className="text-[var(--color-text-main)] text-sm">
                            (Local temporário)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--color-text-gold)]/10 border border-[var(--color-text-gold)]/20 rounded-lg p-6">
                    <h3 className="text-[var(--color-text-gold)] font-semibold text-lg mb-4">
                      Como Chegar
                    </h3>
                    <ul className="space-y-2 text-[var(--color-text-main)] text-sm">
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
                    className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-semibold py-3"
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Abrir no Google Maps
                  </Button>
                </div>

                {/* Map Placeholder */}
                <div className="bg-[var(--color-bg-main)] rounded-lg overflow-hidden border border-[var(--color-border)]">
                  <div className="aspect-square lg:aspect-auto lg:h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="bg-[var(--color-gold)]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="w-8 h-8 text-[var(--color-gold)]" />
                      </div>
                      <div>
                        <h3 className="text-[var(--color-text-gold)] font-semibold text-lg">
                          Localização no Mapa
                        </h3>
                        <p className="text-[var(--color-text-main)] text-sm">
                          Clique no botão acima para ver no Google Maps
                        </p>
                      </div>
                      <div className="text-[var(--color-gold)] text-sm">
                        📍 {barberInfo.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)]">
            <CardHeader>
              <CardTitle className="text-[var(--color-text-gold)] text-2xl">
                Perguntas Frequentes
              </CardTitle>
              <CardDescription className="text-[var(--color-text-main)]">
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
                  <div key={index} className="bg-[var(--color-bg-main)] rounded-lg p-4 border border-[var(--color-border)]">
                    <h4 className="text-[var(--color-gold)] font-semibold mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-[var(--color-text-main)] text-sm">
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