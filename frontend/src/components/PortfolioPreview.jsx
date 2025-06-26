import React from "react";
import { portfolioImages } from "../data/mock";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioPreview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-main)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-gold)] mb-4">
            Nosso <span className="text-[var(--color-gold)]">Portfólio</span>
          </h2>
          <p className="text-[var(--color-text-main)] text-lg max-w-2xl mx-auto">
            Veja algumas das nossas transformações mais incríveis. 
            Cada corte é uma obra de arte personalizada.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {portfolioImages.map((item) => (
            <Card key={item.id} className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                {/* Before/After Images */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.before}
                        alt="Antes"
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/30">
                          Antes
                        </Badge>
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={item.after}
                        alt="Depois"
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/30">
                          Depois
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <Button
                        size="sm"
                        className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-semibold"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--color-text-gold)] mb-1">
                    {item.service}
                  </h3>
                  <p className="text-[var(--color-text-main)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-gold)] mb-2">500+</div>
              <div className="text-[var(--color-text-main)]">Transformações</div>
            </CardContent>
          </Card>
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-gold)] mb-2">100%</div>
              <div className="text-[var(--color-text-main)]">Satisfação</div>
            </CardContent>
          </Card>
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-gold)] mb-2">3+</div>
              <div className="text-[var(--color-text-main)]">Anos Experiência</div>
            </CardContent>
          </Card>
          <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[var(--color-gold)] mb-2">50+</div>
              <div className="text-[var(--color-text-main)]">Técnicas</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link to="/agendamento">
              Agendar agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;