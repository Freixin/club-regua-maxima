import React, { useState } from "react";
import { services } from "../data/mock";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Scissors, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Corte", "Barba", "Combo", "Premium"];
  
  const filteredServices = selectedCategory === "Todos" 
    ? services.slice(0, 8) // Show first 8 services
    : services.filter(service => service.category === selectedCategory).slice(0, 6);

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-main)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-gold)] mb-4 hover-glow">
              Nossos <span className="text-[var(--color-gold)] animate-float">Serviços</span>
            </h2>
            <p className="text-[var(--color-text-main)] text-lg max-w-2xl mx-auto">
              Do corte clássico aos tratamentos mais modernos, oferecemos uma gama completa 
              de serviços para realçar sua personalidade.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection animation="fadeInUp" delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300 hover:scale-105 hover-glow"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredServices.map((service, index) => (
            <AnimatedSection key={service.id} animation="fadeInUp" delay={150 + (index * 30)}>
              <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden hover-lift hover-glow" >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Scissors className="w-5 h-5 text-[var(--color-gold)] group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-[var(--color-gold)] text-[var(--color-bg-main)] border-none font-semibold" />
                </div>
                <CardTitle className="text-[var(--color-text-gold)] text-lg leading-tight">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[var(--color-text-main)] text-sm">
                      <Clock className="w-4 h-4 mr-1 text-[var(--color-gold)]" />
                      {service.duration} min
                    </div>
                    <div className="text-2xl font-bold text-[var(--color-gold)]">
                      R$ {service.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[var(--color-gold)] fill-current" />
                    ))}
                    <span className="text-[var(--color-gold-dark)] text-xs ml-1">4.9</span>
                  </div>
                </div>
              </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection animation="fadeInUp" delay={250}>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover-glow animate-pulse-glow border-none"
            >
              <Link to="/agendamento">
                Ver Todos os Serviços & Agendar
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Special Offers */}
        <AnimatedSection animation="fadeInUp" delay={300}>
          <div className="mt-16 bg-[var(--color-gold)]/10 border border-[var(--color-gold-dark)] rounded-2xl p-8 hover-lift hover-glow">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[var(--color-text-gold)] mb-4 animate-float">
                🎉 Ofertas Especiais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--color-bg-main)] rounded-lg p-6 border border-[var(--color-gold-dark)] hover-lift hover-glow transition-all duration-300">
                  <h4 className="text-lg font-semibold text-[var(--color-gold)] mb-2">
                    Combo Completo
                  </h4>
                  <p className="text-[var(--color-text-main)] text-sm mb-3">
                    Corte + Barba + Sobrancelha por apenas
                  </p>
                  <div className="text-3xl font-bold text-[var(--color-text-gold)]">
                    R$ 65 <span className="text-sm text-[var(--color-text-main)] line-through">R$ 75</span>
                  </div>
                </div>
                <div className="bg-[var(--color-bg-main)] rounded-lg p-6 border border-[var(--color-gold-dark)] hover-lift hover-glow transition-all duration-300">
                  <h4 className="text-lg font-semibold text-[var(--color-gold)] mb-2">
                    Cliente Fidelidade
                  </h4>
                  <p className="text-[var(--color-text-main)] text-sm mb-3">
                    Na 5ª visita, ganhe desconto de 20%
                  </p>
                  <div className="text-3xl font-bold text-[var(--color-text-gold)]">
                    -20%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;