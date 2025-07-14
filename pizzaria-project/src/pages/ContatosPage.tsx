// src/pages/ContatosPage.tsx
import { useState } from "react";

export default function ContatosPage() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    // Aqui você pode adicionar lógica de envio, API, etc.
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Fale Conosco</h2>
      <div className="row">
        {/* Formulário */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite seu nome completo"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Digite seu e-mail"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensagem</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Escreva sua mensagem ou sugestão"
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Enviar
            </button>
          </form>
        </div>

        {/* Mapa + horário */}
        <div className="col-md-6">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://maps.google.com/maps?q=pizzaria&output=embed"
              title="Mapa da pizzaria"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="alert alert-info mt-3">
            <h5>Horário de Atendimento</h5>
            <p>Terça a Domingo: 18h às 23h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
