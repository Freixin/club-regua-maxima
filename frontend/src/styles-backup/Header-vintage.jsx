import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Agendamento", href: "/agendamento" },
    { name: "Portfólio", href: "/portfolio" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-main)] border-b border-[var(--color-gold)]/30 transition-transform duration-500 ease-in-out backdrop-blur-sm ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-[118px] h-[118px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 text-shadow ${
                  isActive(item.href)
                    ? "text-[var(--color-gold)] bg-[var(--color-gold)]/10"
                    : "text-[var(--color-text-main)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
            </nav>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              asChild
              variant="ghost"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-[#F8F8F2] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-gray-600 hover:scale-105 ${
                location.pathname === '/agendamento' ? 'text-[#D4AF37] bg-[#D4AF37]/10' : ''
              }`}
            >
              <Link to="/agendamento">Agendar Agora</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#D4AF37] text-[#F8F8F2] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Link to="/cancelar">Cancelar Agendamento</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#F8F8F2] hover:text-[#D4AF37]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#18332F] rounded-lg mt-2 border border-[#D4AF37]/30">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-[#D4AF37] bg-[#D4AF37]/10"
                      : "text-[#F8F8F2] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-[#F8F8F2] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 border border-gray-600 hover:scale-105 ${
                    location.pathname === '/agendamento' ? 'text-[#D4AF37] bg-[#D4AF37]/10' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/agendamento">Agendar Agora</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#D4AF37] text-[#F8F8F2] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/cancelar">Cancelar Agendamento</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;