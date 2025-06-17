import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Star, MapPin, Clock, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop"
          alt="Barbershop"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Rating */}
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-300 ml-2">5.0 • 200+ clientes satisfeitos</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Club Régua
            </span>
            <br />
            <span className="text-white">Máxima</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforme seu visual com o melhor barbeiro de{" "}
            <span className="text-green-400 font-semibold">Belford Roxo</span>.
            Cortes modernos, barba impecável e atendimento personalizado.
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Belford Roxo, RJ</span>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Seg-Sáb: 9h às 19h</span>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">(21) 99999-9999</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link to="/agendamento">Agendar Agora</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link to="/portfolio">Ver Portfólio</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">Confie em quem é referência</p>
            <div className="flex justify-center items-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">500+</span>
                <span className="text-sm">Clientes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">3+</span>
                <span className="text-sm">Anos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">50+</span>
                <span className="text-sm">Serviços</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;