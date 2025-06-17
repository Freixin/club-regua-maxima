import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamento" element={<Booking />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;