import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";

const BookingCTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <div className="bg-[var(--color-bg-main)] border border-[var(--color-border-gold)] rounded-2xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-gold)] mb-4">
            Pronto para uma <span className="text-[var(--color-gold)]">transformação</span>?
          </h2>
          <p className="text-[var(--color-text-main)] text-lg mb-8 max-w-2xl mx-auto">
            Agende seu horário e experimente o melhor da barbearia moderna. <br />Profissional qualificado, ambiente acolhedor e resultado garantido.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[var(--color-gold)]/20 p-3 rounded-full border border-[var(--color-gold)]/60">
                <Calendar className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <span className="text-[var(--color-text-gold)] font-medium">Agendamento Fácil</span>
              <span className="text-[var(--color-text-main)] text-sm">Sistema online</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[var(--color-gold)]/20 p-3 rounded-full border border-[var(--color-gold)]/60">
                <Clock className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <span className="text-[var(--color-text-gold)] font-medium">Lembrete WhatsApp</span>
              <span className="text-[var(--color-text-main)] text-sm">Nunca esqueça</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[var(--color-gold)]/20 p-3 rounded-full border border-[var(--color-gold)]/60">
                <MapPin className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <span className="text-[var(--color-text-gold)] font-medium">Localização Central</span>
              <span className="text-[var(--color-text-main)] text-sm">Belford Roxo</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[var(--color-gold)]/20 p-3 rounded-full border border-[var(--color-gold)]/60">
                <Phone className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <span className="text-[var(--color-text-gold)] font-medium">Suporte Total</span>
              <span className="text-[var(--color-text-main)] text-sm">Atendimento 5★</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link to="/agendamento">Agendar Horário</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)] font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <a href="tel:+5521999999999">Falar com a Barbearia</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;