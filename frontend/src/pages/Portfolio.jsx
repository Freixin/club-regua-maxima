import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { portfolioImages } from "../data/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Eye, Star, Calendar, Award, Users, TrendingUp } from "lucide-react";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["Todos", "Corte", "Barba", "Combo", "Premium"];

  // Expand portfolio images for demo
  const expandedPortfolio = [
    ...portfolioImages,
    ...portfolioImages.map(item => ({
      ...item,
      id: item.id + 10,
      service: item.service + " Premium",
      description: item.description + " com acabamento especial"
    })),
    ...portfolioImages.map(item => ({
      ...item,
      id: item.id + 20,
      service: "Corte Social",
      description: "Corte clássico para ambientes corporativos"
    }))
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Clientes Satisfeitos" },
    { icon: Calendar, value: "1500+", label: "Serviços Realizados" },
    { icon: Award, value: "4.9/5", label: "Avaliação Média" },
    { icon: TrendingUp, value: "95%", label: "Taxa de Retorno" }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Header />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-gold)] mb-4">
              Nosso <span className="text-[var(--color-gold)]">Portfólio</span>
            </h1>
            <p className="text-[var(--color-text-main)] text-lg max-w-3xl mx-auto">
              Cada corte é uma obra de arte única. Veja algumas das nossas 
              transformações mais impressionantes e inspire-se para seu próximo visual.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden text-center">
                  <CardContent className="p-6">
                    <div className="bg-[var(--color-gold)]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[var(--color-gold)]" />
                    </div>
                    <div className="text-2xl font-bold text-[var(--color-gold)] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[var(--color-text-main)] text-sm">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`
                  transition-all duration-300 hover:scale-105
                  ${selectedCategory === category 
                    ? "bg-[var(--color-gold)] text-[var(--color-bg-main)] hover:bg-[var(--color-gold-dark)]" 
                    : "border-[var(--color-gold-dark)] text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)]"}
              `}
            >
              {category}
            </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {expandedPortfolio.map((item) => (
              <Card key={item.id} className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  {/* Before/After Images */}
                  <div className="relative">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={`${item.before}&v=${item.id}`}
                          alt="Antes"
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold-dark)]">
                            Antes
                          </Badge>
                        </div>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={`${item.after}&v=${item.id}`}
                          alt="Depois"
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold-dark)]">
                            Depois
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 w-full">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="w-full bg-[var(--color-gold)]/10 backdrop-blur-sm text-[var(--color-gold)] border-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-main)]"
                              onClick={() => setSelectedImage(item)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#222d26] border-[#232a25] max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-[var(--color-text-gold)] text-xl">
                                {item.service}
                              </DialogTitle>
                              <DialogDescription className="text-[var(--color-text-main)]">
                                {item.description}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-[var(--color-text-gold)] font-medium">Antes</h4>
                                  <img
                                    src={`${item.before}&v=${item.id}`}
                                    alt="Antes"
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <h4 className="text-[var(--color-text-gold)] font-medium">Depois</h4>
                                  <img
                                    src={`${item.after}&v=${item.id}`}
                                    alt="Depois"
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                </div>
                              </div>
                              <div className="bg-[var(--color-gold)]/10 border border-[var(--color-gold-dark)] rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                  <Star className="w-5 h-5 text-[var(--color-gold)] fill-current" />
                                  <span className="text-[var(--color-text-gold)] font-medium">Avaliação do Cliente:</span>
                                </div>
                                <p className="text-[var(--color-text-main)] text-sm mt-2">
                                  "Ficou perfeito! Superou todas as minhas expectativas. 
                                  Profissional muito técnico e atencioso."
                                </p>
                                <div className="flex items-center space-x-1 mt-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-[var(--color-gold)] fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-text-gold)] mb-1 text-sm">
                      {item.service}
                    </h3>
                    <p className="text-[var(--color-text-main)] text-xs leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[var(--color-gold)] fill-current" />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs border-[var(--color-gold-dark)] text-[var(--color-gold)]">
                        Verificado
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="bg-[var(--color-gold)]/10 border border-[var(--color-gold-dark)] rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[var(--color-text-gold)] mb-4">
                Depoimentos dos Clientes
              </h2>
              <p className="text-[var(--color-text-main)]">
                Veja o que nossos clientes falam sobre nosso trabalho
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Carlos Silva",
                  comment: "Melhor corte que já fiz na vida! Vinícius é um verdadeiro artista.",
                  rating: 5,
                  service: "Corte + Barba"
                },
                {
                  name: "João Santos", 
                  comment: "Ambiente top, atendimento nota 10. Virei cliente fiel!",
                  rating: 5,
                  service: "Corte + Pigmentação"
                },
                {
                  name: "Pedro Oliveira",
                  comment: "Sempre saio de lá me sentindo renovado. Recomendo muito!",
                  rating: 5,
                  service: "Corte + Reflexo"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[var(--color-gold)] fill-current" />
                      ))}
                    </div>
                    <p className="text-[var(--color-text-main)] text-sm mb-4 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[var(--color-text-gold)] font-medium text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-[var(--color-text-main)] text-xs">
                          {testimonial.service}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs border-[var(--color-gold-dark)] text-[var(--color-gold)]">
                        Verificado
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 group overflow-hidden max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[var(--color-text-gold)] mb-4">
                  Pronto para sua transformação?
                </h2>
                <p className="text-[var(--color-text-main)] mb-6">
                  Agende seu horário e faça parte do nosso portfólio de sucessos
                </p>
                <Button
                  size="lg"
                  className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-[var(--color-bg-main)] font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Agendar Meu Horário
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Portfolio;