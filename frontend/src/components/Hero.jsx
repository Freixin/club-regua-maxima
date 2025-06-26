import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Star, MapPin, Clock, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-main)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/hero-background.jpg"
          alt="Club Régua Máxima"
          className="w-full h-full object-cover opacity-20"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-main)] via-[var(--color-bg-main)]/90 to-[var(--color-bg-main)]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Rating */}
          <AnimatedSection animation="fadeInUp" delay={300}>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[var(--color-gold)] fill-current" style={{animationDelay: `${i * 200}ms`}} />
              ))}
              <span className="text-[var(--color-gold-dark)] ml-2">5.0 • 200+ clientes satisfeitos</span>
            </div>
          </AnimatedSection>

          {/* Main Heading */}
          <AnimatedSection animation="fadeInUp" delay={600}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-gold)] leading-tight hover-glow">
              <span className="text-white drop-shadow-2xl font-extrabold">Club Régua</span>
              <br />
              <span className="text-white drop-shadow-2xl font-extrabold">Máxima</span>
            </h1>
          </AnimatedSection>

          {/* Subtitle */}
          <AnimatedSection animation="fadeInUp" delay={900}>
            <p className="text-xl md:text-2xl text-[var(--color-text-main)] max-w-3xl mx-auto leading-relaxed">
              Transforme seu visual com o melhor barbeiro de
              <span className="text-[var(--color-gold)] font-semibold hover-glow"> Belford Roxo</span>.
              Cortes modernos, barba impecável e atendimento personalizado.
            </p>
          </AnimatedSection>

          {/* Info Cards */}
          <AnimatedSection animation="fadeInUp" delay={1200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-[var(--color-bg-main)]/80 backdrop-blur-sm border border-[var(--color-gold-dark)] rounded-lg p-4 flex items-center space-x-3 hover-lift hover-glow transition-all duration-300">
                <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
                <span className="text-[var(--color-text-main)]">Belford Roxo, RJ</span>
              </div>
              <div className="bg-[var(--color-bg-main)]/80 backdrop-blur-sm border border-[var(--color-gold-dark)] rounded-lg p-4 flex items-center space-x-3 hover-lift hover-glow transition-all duration-300">
                <Clock className="w-5 h-5 text-[var(--color-gold)]" />
                <span className="text-[var(--color-text-main)]">Seg-Sáb: 9h às 19h</span>
              </div>
              <div className="bg-[var(--color-bg-main)]/80 backdrop-blur-sm border border-[var(--color-gold-dark)] rounded-lg p-4 flex items-center space-x-3 hover-lift hover-glow transition-all duration-300">
                <Phone className="w-5 h-5 text-[var(--color-gold)]" />
                <span className="text-[var(--color-text-main)]">(21) 99999-9999</span>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="fadeInUp" delay={1500}>
            <div className="flex justify-center items-center pt-8">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)] font-semibold px-8 py-4 rounded-lg text-lg"
              >
                <Link to="/agendamento">Agendar Agora</Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* Trust Indicators */}
          <AnimatedSection animation="fadeInUp" delay={1800}>
            <div className="pt-8 text-center">
              <p className="text-[var(--color-text-gold)] text-sm mb-4">Confie em quem é referência!</p>
              <div className="flex justify-center items-center space-x-8 text-[var(--color-text-gold)]">
                <div className="flex items-center space-x-2 hover-lift cursor-pointer">
                  <span className="text-2xl font-bold text-[var(--color-gold)] hover-glow">500+</span>
                  <span className="text-sm">Clientes</span>
                </div>
                <div className="flex items-center space-x-2 hover-lift cursor-pointer">
                  <span className="text-2xl font-bold text-[var(--color-gold)] hover-glow">3+</span>
                  <span className="text-sm">Anos</span>
                </div>
                <div className="flex items-center space-x-2 hover-lift cursor-pointer">
                  <span className="text-2xl font-bold text-[var(--color-gold)] hover-glow">50+</span>
                  <span className="text-sm">Serviços</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--color-gold)]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[var(--color-text-gold)]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;