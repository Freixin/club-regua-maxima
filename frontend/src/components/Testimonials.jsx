import React from "react";
import { testimonials } from "../data/mock";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#222d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#f5f5dc] mb-4 tracking-tight">
            O que nossos{" "}
            <span className="text-[#D4AF37]">clientes</span> dizem
          </h2>
          <p className="text-[#e5e5c7] text-lg max-w-2xl mx-auto font-light">
            A satisfação dos nossos clientes é nossa maior conquista. <br />Veja
            alguns depoimentos reais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-[#222d26] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 group shadow-lg"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-[#D4AF37] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#f5f5dc] text-sm mb-4 leading-relaxed font-light italic">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37]/80 to-[#f5f5dc]/80 rounded-full flex items-center justify-center border-2 border-[#D4AF37] shadow">
                    <span className="text-[#222d26] font-bold text-sm font-serif">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#D4AF37] font-semibold text-sm font-serif">
                      {testimonial.name}
                    </p>
                    <p className="text-[#e5e5c7] text-xs font-light">
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