import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CarouselDePizzas from "../components/CarouselDePizzas";

const HomePage = () => {
  return (
    <>

      <div className="container" style={{ paddingTop: "70px", minHeight: "80vh" }}>
        {/* ALERTA PROMOÇÃO */}
        <div className="alert alert-warning alert-dismissible fade show rounded-4 shadow-sm mt-3" role="alert">
          <strong>Promoção da Semana:</strong> Todas as pizzas grandes com 20% de desconto nas terças!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        </div>

        <CarouselDePizzas />
        
        <div className="row mt-4">
        {/* Promoção do Dia */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Promoção do Dia</h5>
              <p className="card-text">2 Pizzas Grandes + Refri por R$ 79,90</p>
              <a href="/cardapio" className="btn btn-danger">Peça Agora</a>
            </div>
          </div>
        </div>

        {/* Horário de Funcionamento */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Horário de Funcionamento</h5>
              <p className="card-text">Terça a Domingo: 18h às 23h</p>
            </div>
          </div>
        </div>
      </div>
        <Outlet />
      </div>

    </>
  );
};

export default HomePage;
