import { useEffect, useRef, useState } from "react";
import useRecuperarPizzas from "../hooks/useRecuperarPizzas";
import Pizza from "../interfaces/Pizza";
import { useFavoritos } from "../hooks/useFavoritos";
import { useNavigate } from "react-router-dom";
import heartFill from "../assets/skin/heart-fill.svg";

interface PizzCarrinho {
  idPizza: number;
  quantidade: number;
}

const FavoritosPage = () => {
  const { favoritos, toggleFavorito } = useFavoritos();
  const { data: todasPizzas, isLoading, error } = useRecuperarPizzas();
  const [carrinho, setCarrinho] = useState<PizzCarrinho[]>([]);
  const [quantidadesInput, setQuantidadesInput] = useState<{ [key: number]: string }>({});
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const navigate = useNavigate();

  // Carrega carrinho salvo
  useEffect(() => {
    const salvo = localStorage.getItem("carrinho");
    if (salvo) {
      setCarrinho(JSON.parse(salvo));
    }
  }, []);

  // Sincroniza localStorage e os inputs
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    const novasQuantidades: { [key: number]: string } = {};
    carrinho.forEach((item) => {
      novasQuantidades[item.idPizza] = item.quantidade.toString();
    });
    setQuantidadesInput(novasQuantidades);
  }, [carrinho]);

  const isNotANumber = (value: string) => value.trim() === "" || isNaN(parseInt(value));

  const alterarQuantidade = (idPizza: number, quantidadeStr: string) => {
    setQuantidadesInput((prev) => ({ ...prev, [idPizza]: quantidadeStr }));

    if (isNotANumber(quantidadeStr)) return;
    const quantidade = parseInt(quantidadeStr);

    if (quantidade <= 0) {
      setCarrinho((prev) => prev.filter((item) => item.idPizza !== idPizza));
      setQuantidadesInput((prev) => {
        const copia = { ...prev };
        delete copia[idPizza];
        return copia;
      });
    } else {
      setCarrinho((prev) => {
        const jaExiste = prev.find((item) => item.idPizza === idPizza);
        if (jaExiste) {
          return prev.map((item) =>
            item.idPizza === idPizza ? { ...item, quantidade } : item
          );
        } else {
          return [...prev, { idPizza, quantidade }];
        }
      });
    }
  };

  const adicionarPizza = (pizza: Pizza) => {
    const existente = carrinho.find((item) => item.idPizza === pizza.id);
    alterarQuantidade(pizza.id, ((existente?.quantidade || 0) + 1).toString());
  };

  const subtrairPizza = (pizza: Pizza) => {
    const existente = carrinho.find((item) => item.idPizza === pizza.id);
    if (existente) {
      alterarQuantidade(pizza.id, (existente.quantidade - 1).toString());
    }
  };

  const handleBlur = (idPizza: number) => {
    const valor = quantidadesInput[idPizza];
    if (isNotANumber(valor)) {
      inputRefs.current[idPizza]?.focus();
    }
  };

  if (isLoading) return <p>Carregando pizzas...</p>;
  if (error) return <p>Erro ao carregar pizzas 😢</p>;

  const pizzasFavoritas = todasPizzas?.filter((p) => favoritos.includes(p.id)) || [];

  return (
    <div className="container mt-4">
      <h2>Suas Pizzas Favoritas</h2>
      {pizzasFavoritas.length === 0 && (
        <p className="text-muted">Nenhuma pizza favoritada ainda ❤️</p>
      )}

      <div className="row">
        {pizzasFavoritas.map((pizza) => {
          const itemNoCarrinho = carrinho.find((item) => item.idPizza === pizza.id);

          return (
            <div key={pizza.id} className="col-md-4 mb-4">
              <div className="card h-100 position-relative">
                <button
                  onClick={() => toggleFavorito(pizza.id)}
                  className="btn position-absolute"
                  style={{ top: 8, right: 8, background: "transparent", border: "none" }}
                >
                  <img src={heartFill} alt="Remover dos favoritos" width={20} height={20} />
                </button>

                <img src={pizza.imagem} className="card-img-top" alt={pizza.nome} />
                <div className="card-body">
                  <h5 className="card-title">{pizza.nome}</h5>
                  <p className="card-text">R$ {pizza.preco.toFixed(2)}</p>

                  {itemNoCarrinho ? (
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => subtrairPizza(pizza)}
                      >
                        -
                      </button>
                      <input
                        ref={(el) => {
                          inputRefs.current[pizza.id] = el;
                        }}
                        type="text"
                        value={quantidadesInput[pizza.id] || ""}
                        onChange={(e) => alterarQuantidade(pizza.id, e.target.value)}
                        onBlur={() => handleBlur(pizza.id)}
                        style={{ width: "50px", textAlign: "center", margin: "0 5px" }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => adicionarPizza(pizza)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-success w-100"
                      onClick={() => adicionarPizza(pizza)}
                    >
                      Comprar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritosPage;
