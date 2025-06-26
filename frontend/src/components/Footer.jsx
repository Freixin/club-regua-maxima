import React from "react";
import { Link } from "react-router-dom";
import { Scissors, MapPin, Clock, Phone, Instagram, Star } from "lucide-react";
import { barberInfo } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#18332F] border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-[#b79060] tracking-wide uppercase" style={{letterSpacing: '0.08em'}}>
                Club Régua Máxima
              </span>
            </div>
            <p className="text-[#F8F8F2] text-sm leading-relaxed">
              A melhor barbearia de Belford Roxo. Tradição, qualidade e 
              atendimento personalizado para realçar seu estilo único.
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
              ))}
              <span className="text-[#b79060] text-sm ml-2">4.9/5 • 200+ avaliações</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#b79060] font-semibold text-lg">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/agendamento" className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200">
                  Agendamento
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-[#b79060] font-semibold text-lg">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-[#F8F8F2]">Corte Masculino</li>
              <li className="text-[#F8F8F2]">Barba & Bigode</li>
              <li className="text-[#F8F8F2]">Sobrancelha</li>
              <li className="text-[#F8F8F2]">Pigmentação</li>
              <li className="text-[#F8F8F2]">Reflexos</li>
              <li className="text-[#F8F8F2]">Tratamentos Premium</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-[#b79060] font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <div className="text-[#F8F8F2] text-sm">
                  <div>{barberInfo.address}</div>
                  <div className="text-xs text-[#b79060]">(Local temporário)</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <a 
                  href={`tel:${barberInfo.phone}`}
                  className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200 text-sm"
                >
                  {barberInfo.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <div className="text-[#F8F8F2] text-sm">
                  <div>Seg-Sex: 9h às 19h</div>
                  <div>Sáb: 8h às 18h</div>
                  <div className="text-[#b79060]">Dom: Fechado</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-[#D4AF37]" />
                <a 
                  href="https://instagram.com/vinicius.clubreguamaxima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200 text-sm"
                >
                  {barberInfo.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#b79060]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#F8F8F2] text-sm">
              © {currentYear} Club Régua Máxima. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a 
                href="https://wa.me/5521999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200"
              >
                WhatsApp
              </a>
              <a 
                href="https://instagram.com/vinicius.clubreguamaxima"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8F8F2] hover:text-[#D4AF37] transition-colors duration-200"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;