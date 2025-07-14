import Pizza from "../interfaces/Pizza";
import { PizzCarrinho } from "../pages/CardsPorSlugCategoriaPage";
import heart from '../assets/skin/heart.svg';
import heartFill from '../assets/skin/heart-fill.svg';
import { useFavoritos } from '../hooks/useFavoritos';
import useUsuarioStore from "../store/UsuarioStore";

interface Props {
  pizza: Pizza;
  pizzaNoCarrinho: PizzCarrinho | null;
  adicionarPizza: (pizza: Pizza) => void;
  subtrairPizza: (pizza: Pizza) => void;
  isFavorito: (id: number) => boolean;
  toggleFavorito: (id: number) => void;
}

const Card = ({
  pizza,
  adicionarPizza,
  subtrairPizza,
  pizzaNoCarrinho,
  isFavorito,
  toggleFavorito,
}: Props) => {
  
  const { usuarioLogado } = useUsuarioStore();

  return (
    <div className="card h-100 border-0 position-relative">
      {usuarioLogado > 0 &&(<button
        onClick={() => toggleFavorito(pizza.id)}
        className="btn position-absolute"
        style={{
          top: 8,
          right: 8,
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.7)", // fundo branco semi-transparente
          border: "none",
          borderRadius: "50%", // botão redondo
          padding: "4px",
        }}
      >
        <img
          src={isFavorito(pizza.id) ? heartFill : heart}
          alt="Favoritar"
          width={20}
          height={20}
        />
      </button>)}
      
      <img src={`/assets/${pizza.imagem}`} className="card-img-top" alt={pizza.nome} />
      <div className="card-body">
        <h5 className="card-title">{pizza.nome}</h5>
        <p className="card-text">{pizza.descricao}</p>
        <p className="card-text fw-bold" style={{color: "rgb(220,60,60)"}}>
          R${" "}
          {pizza.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}
        </p>
      </div>
      <div className="card-footer p-0 mb-4">
        <div style={pizzaNoCarrinho ? {display: "block"} : {display: "none"}} >
          <div className="btn-group w-100">
            <button onClick={() => subtrairPizza(pizza)} type="button" className="btn btn-secondary btn-sm">-</button>
            <button type="button" className="btn btn-secondary btn-sm">{pizzaNoCarrinho?.quantidade}</button>
            <button onClick={() => adicionarPizza(pizza)} type="button" className="btn btn-secondary btn-sm">+</button>
          </div>
        </div>
        <button style={pizzaNoCarrinho ? {display: "none"} : {display: "block"}} onClick={() => adicionarPizza(pizza)} type="button" className="btn btn-success btn-sm w-100">Comprar</button>
      </div>
    </div>
  );
  
};
export default Card;
