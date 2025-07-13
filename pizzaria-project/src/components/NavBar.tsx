import { NavLink } from "react-router-dom";
import pizza_logo from "../assets/pizza-logo.png";
import useUsuarioStore from "../store/UsuarioStore";
import Pizza from "../interfaces/Pizza";
import usePizzaStore from "../store/PizzaStore";
const NavBar = () => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
  const setPizzaSelecionado = usePizzaStore((s) => s.setPizzaSelecionado);
  
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src={pizza_logo}
            alt="logo da pizzaria"
            style={{ width: "50px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrinho">
                Carrinho
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favoritos">
                Favoritos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pizzas">
                Pizzas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={() => setPizzaSelecionado({} as Pizza)} className="nav-link" to="/cadastrar-pizza">
                Cadastrar Pizza
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cadastro">
                Cadastro
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrinho">
                Carrinho
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                {usuarioLogado ? "Sair" : "Entrar"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
