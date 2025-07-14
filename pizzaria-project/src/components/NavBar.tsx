import { NavLink } from "react-router-dom";
import pizza_logo from "../assets/pizza-logo.png";
import useUsuarioStore from "../store/UsuarioStore";
import Pizza from "../interfaces/Pizza";
import usePizzaStore from "../store/PizzaStore";

const NavBar = () => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
  const setPizzaSelecionado = usePizzaStore((s) => s.setPizzaSelecionado);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top" style={{ transition: "background-color 0.3s ease" }}>
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={pizza_logo}
            alt="logo da pizzaria"
            style={{ width: "50px", marginRight: "0.5rem" }}
          />
          Pizzaria Delícia
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(255,255,255,0.5)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/cardapio"
              >
                Cardápio
              </NavLink>
            </li>

            {Boolean(usuarioLogado) &&(
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to="/carrinho"
                  >
                    Carrinho
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to="/favoritos"
                  >
                    Favoritos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to="/tabeladepizzas"
                  >
                    Tabela de Pizzas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={() => setPizzaSelecionado({} as Pizza)}
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to="/cadastrar-pizza"
                  >
                    Cadastrar Pizza
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/cadastro"
              >
                Cadastro
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/contatos"
              >
                Contatos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/sobre"
              >
                Sobre Nós
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                {usuarioLogado ? "Sair" : "Entrar"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Hover effect para navbar */}
      <style>{`
        nav.navbar:hover {
          background-color: #c82333 !important;
          transition: background-color 0.3s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: #f8d7da !important;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
