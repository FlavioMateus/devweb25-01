import React from 'react';

export default function SobrePage() {
  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Nossa História</h2>

      {/* Imagem e Texto */}
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="mb-4">
            <img
              src="/src/assets/forno.jpg"
              alt="Nosso Forno"
              className="img-fluid rounded"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="mt-3">
            <p className="lead">Há mais de 20 anos trazendo o melhor da pizza tradicional...</p>
            <p>
              Nossa paixão por pizzas artesanais começou em 2003 com um pequeno forno a lenha.
              Hoje mantemos a mesma tradição com ingredientes selecionados e receitas familiares.
            </p>
          </div>
        </div>
      </div>

      {/* Equipe */}
      <div className="row mt-5 justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card text-center">
            <img
              src="/src/assets/chef.jpg"
              alt="Chef"
              className="card-img-top"
              style={{
                height: '150px',
                width: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                margin: '0 auto',
                marginTop: '1rem'
              }}
            />
            <div className="card-body">
              <h5 className="card-title">João Silva</h5>
              <p className="card-text">Chef Principal</p>
            </div>
          </div>
        </div>
        {/* Adicione mais cards aqui se quiser */}
      </div>

      {/* FAQ */}
      <div className="accordion mt-5" id="accordionFAQ">
        <div className="accordion-item">
          <h2 className="accordion-header" id="faq-heading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq-collapse"
              aria-expanded="true"
              aria-controls="faq-collapse"
            >
              Temos entregas?
            </button>
          </h2>
          <div
            id="faq-collapse"
            className="accordion-collapse collapse show"
            aria-labelledby="faq-heading"
            data-bs-parent="#accordionFAQ"
          >
            <div className="accordion-body">
              Entregamos em toda a região num raio de 5km. Tempo médio de entrega: 40 minutos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
