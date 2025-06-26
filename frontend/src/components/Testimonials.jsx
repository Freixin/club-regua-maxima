import React from "react";
import { testimonials } from "../data/mock";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-gold)] mb-4">
            O que nossos <span className="text-[var(--color-gold)]">clientes</span> dizem
          </h2>
          <p className="text-[var(--color-text-main)] text-lg max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. <br />Veja alguns depoimentos reais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-[var(--color-bg-main)] border border-[var(--color-border-gold)] hover:border-[var(--color-gold)] transition-all duration-300 hover:scale-105 group shadow-lg">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-[var(--color-gold)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[var(--color-gold)] fill-[var(--color-gold)]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[var(--color-text-main)] text-sm mb-4 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[var(--color-gold)]/80 to-[var(--color-text-main)]/80 rounded-full flex items-center justify-center border-2 border-[var(--color-gold)] shadow">
                    <span className="text-[var(--color-bg-main)] font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[var(--color-gold)] font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[var(--color-text-gold)] text-xs">
                      Cliente verificado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;