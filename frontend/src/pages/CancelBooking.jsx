import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

const CancelBooking = () => {
  const [phone, setPhone] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setAppointments([]);
    try {
      const res = await fetch(`http://localhost:8000/api/appointments?customer_phone=${phone}`);
      const data = await res.json();
      if (res.ok) {
        setAppointments(data.filter(a => a.status !== "cancelled" && new Date(a.appointment_date) >= new Date()));
        if (data.length === 0) toast.info("Nenhum agendamento encontrado para este telefone.");
      } else {
        toast.error(data.detail || "Erro ao buscar agendamentos.");
      }
    } catch {
      toast.error("Erro de conexão com o servidor.");
    }
    setLoading(false);
  };

  const handleCancel = async (id) => {
    setCancelingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/appointments/${id}/cancel`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        toast.success("Agendamento cancelado!");
        setAppointments(appointments.filter(a => a.id !== id));
      } else {
        toast.error(data.detail || "Erro ao cancelar.");
      }
    } catch {
      toast.error("Erro de conexão com o servidor.");
    }
    setCancelingId(null);
    setConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-20 px-2 sm:px-0 flex justify-center">
        <div className="w-full max-w-lg">
          <Card className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-none">
            <CardHeader>
              <CardTitle className="text-green-400 text-2xl font-semibold tracking-tight">Cancelar Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label className="text-neutral-200 block mb-2 text-base font-medium">Telefone usado no agendamento</label>
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(21) 99999-9999"
                  className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <Button onClick={fetchAppointments} className="mt-4 w-full bg-green-400 hover:bg-green-500 text-black font-semibold rounded-lg py-3 text-base transition-all">
                  Buscar Agendamentos
                </Button>
              </div>
              {loading && <div className="text-neutral-400 text-center">Carregando...</div>}
              {appointments.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-neutral-100 text-lg mb-4 font-medium">Seus agendamentos</h3>
                  <ul className="space-y-4">
                    {appointments.map(a => (
                      <li key={a.id} className="bg-neutral-800 rounded-xl p-5 flex flex-col gap-3 border border-neutral-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex flex-col gap-1">
                            <span className="text-green-400 font-semibold text-base">{a.service_name}</span>
                            <span className="text-neutral-300 text-sm">{new Date(a.appointment_date).toLocaleDateString('pt-BR')} às {a.appointment_time.slice(0,5)}</span>
                          </div>
                          <div className="flex flex-col items-end min-w-[120px]">
                            {confirmId !== a.id && (
                              <Button
                                onClick={() => setConfirmId(a.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-5 py-2 text-base w-full sm:w-auto"
                                disabled={cancelingId === a.id}
                              >
                                {cancelingId === a.id ? "Cancelando..." : "Cancelar"}
                              </Button>
                            )}
                            {confirmId === a.id && (
                              <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-1">
                                <span className="text-sm text-red-400 text-right">Tem certeza que deseja cancelar?</span>
                                <div className="flex gap-2 w-full sm:w-auto">
                                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-2 text-sm" onClick={() => handleCancel(a.id)} disabled={cancelingId === a.id}>Sim</Button>
                                  <Button size="sm" variant="outline" className="border border-neutral-600 text-white rounded-lg px-4 py-2 text-sm bg-transparent hover:bg-neutral-800" onClick={() => setConfirmId(null)}>Não</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CancelBooking;
