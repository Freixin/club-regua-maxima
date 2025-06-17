import React from "react";
import { testimonials } from "../data/mock";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O que nossos <span className="text-green-400">clientes</span> dizem
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja alguns depoimentos reais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-slate-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-green-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Cliente verificado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-2xl p-8 border border-green-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">4.9/5</div>
              <div className="text-gray-300">Avaliação Média</div>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">200+</div>
              <div className="text-gray-300">Avaliações</div>
              <div className="text-sm text-gray-400">100% recomendação</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">95%</div>
              <div className="text-gray-300">Clientes Retornam</div>
              <div className="text-sm text-gray-400">Fidelização alta</div>
            </div>
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-slate-900/50 border border-gray-700 rounded-lg px-6 py-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-6 h-6"
              />
              <span className="text-white font-medium">Google Reviews</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-300 ml-2">4.9 (200+ avaliações)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;