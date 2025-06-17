// Mock data for Club Régua Máxima
export const services = [
  { id: 1, name: "Corte", price: 40, duration: 30, category: "Corte" },
  { id: 2, name: "Corte Kids", price: 40, duration: 30, category: "Corte" },
  { id: 3, name: "Barba", price: 30, duration: 20, category: "Barba" },
  { id: 4, name: "Cavanhaque", price: 20, duration: 15, category: "Barba" },
  { id: 5, name: "Sobrancelha", price: 10, duration: 10, category: "Sobrancelha" },
  { id: 6, name: "Pezinho/Acabamento", price: 15, duration: 15, category: "Acabamento" },
  { id: 7, name: "Corte + Barba", price: 60, duration: 50, category: "Combo" },
  { id: 8, name: "Corte + Barba + Sobrancelhas", price: 65, duration: 60, category: "Combo" },
  { id: 9, name: "Corte + Cavanhaque", price: 50, duration: 45, category: "Combo" },
  { id: 10, name: "Corte + Cavanhaque + Sobrancelha", price: 55, duration: 55, category: "Combo" },
  { id: 11, name: "Corte + Sobrancelha", price: 45, duration: 40, category: "Combo" },
  { id: 12, name: "Corte + Bigode", price: 45, duration: 40, category: "Combo" },
  { id: 13, name: "Corte + Bigode + Sobrancelhas", price: 50, duration: 50, category: "Combo" },
  { id: 14, name: "Corte + Pigmentação", price: 60, duration: 60, category: "Premium" },
  { id: 15, name: "Corte + Pigmentação + Sobrancelhas", price: 65, duration: 70, category: "Premium" },
  { id: 16, name: "Corte + Pigmentação + Bigode", price: 65, duration: 70, category: "Premium" },
  { id: 17, name: "Corte + Pigmentação + Sobrancelhas + Bigode", price: 70, duration: 80, category: "Premium" },
  { id: 18, name: "Corte + Pigmentação + Barba", price: 80, duration: 80, category: "Premium" },
  { id: 19, name: "Corte + Pigmentação + Barba + Sobrancelhas", price: 85, duration: 90, category: "Premium" },
  { id: 20, name: "Corte + Pigmentação + Cavanhaque", price: 70, duration: 75, category: "Premium" },
  { id: 21, name: "Corte + Pigmentação + Cavanhaque + Sobrancelhas", price: 75, duration: 85, category: "Premium" },
  { id: 22, name: "Corte + Reflexo", price: 80, duration: 90, category: "Premium" },
  { id: 23, name: "Corte + Reflexo + Sobrancelhas", price: 85, duration: 100, category: "Premium" },
  { id: 24, name: "Corte + Reflexo + Bigode", price: 85, duration: 100, category: "Premium" },
  { id: 25, name: "Corte + Reflexo + Sobrancelhas + Bigode", price: 90, duration: 110, category: "Premium" },
  { id: 26, name: "Corte + Reflexo + Barba", price: 100, duration: 110, category: "Premium" },
  { id: 27, name: "Corte + Reflexo + Barba + Sobrancelhas", price: 105, duration: 120, category: "Premium" },
  { id: 28, name: "Corte + Reflexo + Cavanhaque", price: 90, duration: 105, category: "Premium" },
  { id: 29, name: "Corte + Reflexo + Cavanhaque + Sobrancelhas", price: 95, duration: 115, category: "Premium" },
  { id: 30, name: "Corte + Nevou", price: 100, duration: 120, category: "Premium" },
  { id: 31, name: "Corte + Nevou + Sobrancelhas", price: 105, duration: 130, category: "Premium" },
  { id: 32, name: "Corte + Nevou + Bigode", price: 105, duration: 130, category: "Premium" },
  { id: 33, name: "Corte + Nevou + Sobrancelhas + Bigode", price: 110, duration: 140, category: "Premium" },
  { id: 34, name: "Corte + Nevou + Barba", price: 120, duration: 140, category: "Premium" },
  { id: 35, name: "Corte + Nevou + Barba + Sobrancelhas", price: 125, duration: 150, category: "Premium" },
  { id: 36, name: "Corte + Nevou + Cavanhaque", price: 110, duration: 135, category: "Premium" },
  { id: 37, name: "Corte + Nevou + Cavanhaque + Sobrancelhas", price: 115, duration: 145, category: "Premium" }
];

export const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

export const portfolioImages = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
    service: "Corte + Barba",
    description: "Transformação completa com corte moderno e barba bem definida"
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
    service: "Corte + Pigmentação",
    description: "Corte estiloso com pigmentação para destacar o visual"
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
    service: "Corte + Reflexo",
    description: "Visual jovem com reflexos que dão movimento ao cabelo"
  },
  {
    id: 4,
    before: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
    service: "Corte Kids",
    description: "Corte especial para crianças com muito carinho e cuidado"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    rating: 5,
    comment: "Excelente profissional! Sempre saio satisfeito com o resultado. Recomendo!"
  },
  {
    id: 2,
    name: "João Santos",
    rating: 5,
    comment: "Melhor barbearia da região! Atendimento nota 10 e preço justo."
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    rating: 5,
    comment: "Vinícius é um artista! Meu cabelo nunca esteve tão bem cuidado."
  },
  {
    id: 4,
    name: "Ricardo Costa",
    rating: 5,
    comment: "Ambiente acolhedor e serviço de qualidade. Virei cliente fiel!"
  }
];

export const barberInfo = {
  name: "Club Régua Máxima",
  barber: "Vinícius",
  address: "Belford Roxo, RJ",
  phone: "(21) 99999-9999",
  whatsapp: "5521999999999",
  hours: {
    monday: "9:00 - 19:00",
    tuesday: "9:00 - 19:00", 
    wednesday: "9:00 - 19:00",
    thursday: "9:00 - 19:00",
    friday: "9:00 - 19:00",
    saturday: "8:00 - 18:00",
    sunday: "Fechado"
  },
  instagram: "@vinicius.clubreguamaxima"
};

// Mock booking data
export const mockBookings = [
  {
    id: 1,
    customerName: "João Silva",
    customerPhone: "(21) 98765-4321",
    service: "Corte + Barba",
    date: "2025-06-18",
    time: "14:00",
    price: 60,
    status: "Confirmado"
  },
  {
    id: 2,
    customerName: "Pedro Santos",
    customerPhone: "(21) 98765-4322",
    service: "Corte + Pigmentação",
    date: "2025-06-18",
    time: "15:30",
    price: 60,
    status: "Pendente"
  }
];