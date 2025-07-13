import { useEffect, useState, useRef } from "react";
import Pizza from "../interfaces/Pizza";
import useRecuperarPizzas from "../hooks/useRecuperarPizzas";
import { useNavigate } from "react-router-dom";

interface PizzCarrinho {
  idPizza: number;
  quantidade: number;
}

const CarrinhoPage = () => {
  const [carrinho, setCarrinho] = useState<PizzCarrinho[]>([]);
  const [quantidadesInput, setQuantidadesInput] = useState<{ [key: number]: string }>({});
  const { data: todasPizzas, isLoading, error } = useRecuperarPizzas();
  const navigate = useNavigate();

  // Ref para focar input no onBlur se necessário
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      const carrinhoParse: PizzCarrinho[] = JSON.parse(carrinhoSalvo);
      setCarrinho(carrinhoParse);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Sincroniza os inputs com o carrinho, atualizando para as quantidades atuais
    const novoQuantidades: { [key: number]: string } = {};
    carrinho.forEach((item) => {
      novoQuantidades[item.idPizza] = item.quantidade.toString();
    });
    setQuantidadesInput(novoQuantidades);
  }, [carrinho]);

  const isNotANumber = (value: string) => {
    if (value.trim() === "") return true; // vazio é inválido
    return isNaN(parseInt(value));
  };

  // Só atualiza o carrinho se o valor for válido
  const alterarQuantidade = (idPizza: number, quantidadeStr: string) => {
    setQuantidadesInput((prev) => ({
      ...prev,
      [idPizza]: quantidadeStr,
    }));

    if (isNotANumber(quantidadeStr)) return;

    const quantidade = parseInt(quantidadeStr);

    if (quantidade <= 0) {
      setCarrinho((carrinhoAtual) =>
        carrinhoAtual.filter((item) => item.idPizza !== idPizza)
      );
      // Limpa input do item removido
      setQuantidadesInput((prev) => {
        const copia = { ...prev };
        delete copia[idPizza];
        return copia;
      });
    } else {
      setCarrinho((carrinhoAtual) =>
        carrinhoAtual.map((item) =>
          item.idPizza === idPizza ? { ...item, quantidade } : item
        )
      );
    }
  };

  const adicionarPizza = (pizza: Pizza) => {
    const itemExistente = carrinho.find((item) => item.idPizza === pizza.id);
    if (itemExistente) {
      alterarQuantidade(pizza.id, (itemExistente.quantidade + 1).toString());
    } else {
      setCarrinho([...carrinho, { idPizza: pizza.id, quantidade: 1 }]);
    }
  };

  const subtrairPizza = (pizza: Pizza) => {
    const itemExistente = carrinho.find((item) => item.idPizza === pizza.id);
    if (!itemExistente) return;
    alterarQuantidade(pizza.id, (itemExistente.quantidade - 1).toString());
  };

  const handleQuantidadeBlur = (idPizza: number) => {
    const valor = quantidadesInput[idPizza];
    if (isNotANumber(valor)) {
      // Força foco no input se valor inválido
      inputRefs.current[idPizza]?.focus();
    }
  };

  const removerPizza = (idPizza: number) => {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => item.idPizza !== idPizza)
    );
    // Limpa input do item removido
    setQuantidadesInput((prev) => {
      const copia = { ...prev };
      delete copia[idPizza];
      return copia;
    });
  };

  if (isLoading) return <p>Carregando pizzas...</p>;
  if (error) return <p>Erro ao carregar pizzas 😢</p>;

  const pizzasNoCarrinho = carrinho.filter((item) => item.quantidade >= 1);

  const totalCarrinho = pizzasNoCarrinho.reduce((acc, item) => {
    const pizza = todasPizzas?.find((p) => p.id === item.idPizza);
    if (!pizza) return acc;
    return acc + pizza.preco * item.quantidade;
  }, 0);

  return (
    <div className="container mt-4">
      <h2>Seu Carrinho</h2>

      {pizzasNoCarrinho.length === 0 && (
        <p className="text-muted">Você ainda não adicionou nenhuma pizza 🍕</p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço Unit.</th>
            <th>Quantidade</th>
            <th>Preço Total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {pizzasNoCarrinho.map((item) => {
            const pizza = todasPizzas?.find((p) => p.id === item.idPizza);
            if (!pizza) return null;

            return (
              <tr key={pizza.id}>
                <td>
                  <img
                    src={pizza.imagem}
                    alt={pizza.nome}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{pizza.nome}</td>
                <td>R$ {pizza.preco.toFixed(2)}</td>
                <td>
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
                      style={{ width: "50px", textAlign: "center", margin: "0 5px" }}
                      onChange={(e) => alterarQuantidade(pizza.id, e.target.value)}
                      onBlur={() => handleQuantidadeBlur(pizza.id)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => adicionarPizza(pizza)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>R$ {(pizza.preco * item.quantidade).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removerPizza(pizza.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pizzasNoCarrinho.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4>Total: R$ {totalCarrinho.toFixed(2)}</h4>

          <div>
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate("/")}
            >
              Voltar às compras
            </button>
            <button className="btn btn-primary" onClick={() => {}}>
              Fechar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarrinhoPage;
