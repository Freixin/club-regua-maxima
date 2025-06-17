import React, { useState } from "react";
import { services } from "../data/mock";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Scissors, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Corte", "Barba", "Combo", "Premium"];
  
  const filteredServices = selectedCategory === "Todos" 
    ? services.slice(0, 8) // Show first 8 services
    : services.filter(service => service.category === selectedCategory).slice(0, 6);

  const getCategoryColor = (category) => {
    const colors = {
      "Corte": "bg-blue-500/10 text-blue-400 border-blue-500/20",
      "Barba": "bg-orange-500/10 text-orange-400 border-orange-500/20",
      "Combo": "bg-purple-500/10 text-purple-400 border-purple-500/20",
      "Premium": "bg-green-500/10 text-green-400 border-green-500/20",
      "Sobrancelha": "bg-pink-500/10 text-pink-400 border-pink-500/20",
      "Acabamento": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };
    return colors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-green-400">Serviços</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Do corte clássico aos tratamentos mais modernos, oferecemos uma gama completa 
            de serviços para realçar sua personalidade.
          </p>
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
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredServices.map((service) => (
            <Card key={service.id} className="bg-slate-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Scissors className="w-5 h-5 text-green-400 group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className={getCategoryColor(service.category)}>
                    {service.category}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg leading-tight">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      R$ {service.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">4.9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link to="/agendamento">
              Ver Todos os Serviços & Agendar
            </Link>
          </Button>
        </div>

        {/* Special Offers */}
        <div className="mt-16 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎉 Ofertas Especiais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-2">
                  Combo Completo
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Corte + Barba + Sobrancelha por apenas
                </p>
                <div className="text-3xl font-bold text-white">
                  R$ 65 <span className="text-sm text-gray-400 line-through">R$ 75</span>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-400 mb-2">
                  Cliente Fidelidade
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Na 5ª visita, ganhe desconto de 20%
                </p>
                <div className="text-3xl font-bold text-white">
                  -20%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;