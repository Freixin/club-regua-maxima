import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";

const BookingCTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500/10 to-green-600/10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para uma <span className="text-green-400">transformação</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Agende seu horário e experimente o melhor da barbearia moderna. 
            Profissional qualificado, ambiente acolhedor e resultado garantido.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-500/20 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white font-medium">Agendamento Fácil</span>
              <span className="text-gray-400 text-sm">Sistema online</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-500/20 p-3 rounded-full">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white font-medium">Lembrete WhatsApp</span>
              <span className="text-gray-400 text-sm">Nunca esqueça</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-500/20 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white font-medium">Localização Central</span>
              <span className="text-gray-400 text-sm">Belford Roxo</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-500/20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white font-medium">Suporte Total</span>
              <span className="text-gray-400 text-sm">Atendimento 5⭐</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link to="/agendamento">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Agora
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 text-lg"
            >
              <a 
                href="https://wa.me/5521999999999?text=Olá! Gostaria de agendar um horário no Club Régua Máxima"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div>
                <span className="text-green-400 font-medium">Horário:</span>
                <br />
                Seg-Sex: 9h às 19h
                <br />
                Sáb: 8h às 18h
              </div>
              <div>
                <span className="text-green-400 font-medium">Localização:</span>
                <br />
                Belford Roxo, RJ
                <br />
                (Local temporário)
              </div>
              <div>
                <span className="text-green-400 font-medium">Contato:</span>
                <br />
                (21) 99999-9999
                <br />
                @vinicius.clubreguamaxima
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900/30 border border-green-500/20 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">
              Sistema seguro • Dados protegidos • Cancelamento gratuito
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;