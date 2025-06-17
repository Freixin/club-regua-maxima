import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import PortfolioPreview from "../components/PortfolioPreview";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import BookingCTA from "../components/BookingCTA";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />
      <Hero />
      <Services />
      <PortfolioPreview />
      <Testimonials />
      <BookingCTA />
      <Footer />
    </div>
  );
};

export default Home;