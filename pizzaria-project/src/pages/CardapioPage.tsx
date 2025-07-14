import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CardapioPage = () => {
  return (
    <>

      <div className="container-fluid" style={{ paddingTop: "70px", minHeight: "80vh" }}>
        <div className="row">
          {/* Sidebar categorias */}
          <aside className="col-lg-2 border-end">
            <nav className="nav nav-pills d-flex flex-column mt-3">
              <h5>Categorias</h5>
              <NavLink className="nav-link" to="/cardapio" end>
                Todos
              </NavLink>
              <NavLink className="nav-link" to="/cardapio/tradicional">
                Tradicional
              </NavLink>
              <NavLink className="nav-link" to="/cardapio/especiais">
                Especiais
              </NavLink>
              <NavLink className="nav-link" to="/cardapio/doces">
                Doces
              </NavLink>
              <NavLink className="nav-link" to="/cardapio/vegetarianas">
                Vegetarianas
              </NavLink>
              <NavLink className="nav-link" to="/cardapio/premium">
                Premium
              </NavLink>
            </nav>
          </aside>

          {/* Área principal de conteúdo */}
          <main className="col-lg-10 mt-3">
            <Outlet />
          </main>
        </div>
      </div>

    </>
  );
};

export default CardapioPage;
