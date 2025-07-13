import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useRecuperarPizzasPorSlugCategoriaComPaginacao from "../hooks/useRecuperarPizzasPorSlugCategoriaComPaginacao";
import Pizza from "../interfaces/Pizza";
import usePizzaStore from "../store/PizzaStore";
import CardsPlaceholderPage from "./CardsPlaceholderPage";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFavoritos } from "../hooks/useFavoritos";

export interface PizzCarrinho {
  idPizza: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const tamanho = usePizzaStore((s) => s.tamanho);

  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  console.log("carrinho = ", carrinho);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarPizza = (pizza: Pizza) => {
    setCarrinho((prevCarrinho: PizzCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idPizza === pizza.id);
      if (existe) {
        // existe.quantidade = existe.quantidade + 1;  Isso não funciona
        // return prevCarrinho;
        const novoCarrinho: PizzCarrinho[] = prevCarrinho.map(
          (item: PizzCarrinho) =>
            item.idPizza === pizza.id
              ? { idPizza: item.idPizza, quantidade: item.quantidade + 1 }
              : item
        );
        return novoCarrinho;
      } else {
        return [...prevCarrinho, { idPizza: pizza.id, quantidade: 1 }];
      }
    });
  };

  const subtrairPizza = (pizza: Pizza) => {
    setCarrinho((prevCarrinho: PizzCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idPizza === pizza.id);
      if (existe) {
        // existe.quantidade = existe.quantidade + 1;  Isso não funciona
        // return prevCarrinho;
        const novoCarrinho: PizzCarrinho[] = prevCarrinho.map(
          (item: PizzCarrinho) =>
            item.idPizza === pizza.id
              ? { idPizza: item.idPizza, quantidade: item.quantidade - 1 }
              : item
        );
        return novoCarrinho.filter((item) => item.quantidade > 0);
      } else {
        throw new Error("Erro ao subtrair 1 de pizza no carrinho.");
      }
    });
  };

  const { slugCategoria } = useParams();
  const { favoritos, toggleFavorito, isFavorito } = useFavoritos();
  console.log("Favoritos atuais no CardsPorSlugCategoriaPage:", favoritos);
  const {
    data,
    isPending: carregandoPizzas,
    error: errorPizzas,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRecuperarPizzasPorSlugCategoriaComPaginacao({
    tamanho: tamanho.toString(),
    slugCategoria: slugCategoria ? slugCategoria : "",
  });

  if (carregandoPizzas) return <CardsPlaceholderPage />;
  if (errorPizzas) throw errorPizzas;

  const pizzasNoCarrinho: (PizzCarrinho | null)[] = [];
  data.pages.forEach((page) => {
    page.itens.forEach((pizza) => {
      const pizzCarrinho = carrinho.find(
        (item: PizzCarrinho) => item.idPizza === pizza.id
      );
      pizzasNoCarrinho.push(pizzCarrinho ? pizzCarrinho : null);
    });
  });

  console.log("pizzas no carrinho = ", pizzasNoCarrinho);

  return (
    <InfiniteScroll
      style={{ overflowX: "hidden" }}
      dataLength={data.pages.reduce(
        (total, page) => total + page.totalDeItens,
        0
      )}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<h6>Carregando...</h6>}
    >
      <h5>
        {slugCategoria
          ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1)
          : "Pizzas"}
      </h5>
      <div className="row">
        {data.pages.map((page, pagina) =>
          page.itens.map((pizza, index) => (
            <div key={pizza.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
              <Card
                pizza={pizza}
                pizzaNoCarrinho={pizzasNoCarrinho[pagina * tamanho + index]}
                adicionarPizza={adicionarPizza}
                subtrairPizza={subtrairPizza}
                isFavorito={isFavorito}
                toggleFavorito={toggleFavorito}
              />
            </div>
          ))
        )}
      </div>
      {/* {hasNextPage && (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => fetchNextPage()}
            className="btn btn btn-outline-success mb-5 w-50"
          >
            {isFetchingNextPage ? "Recuperando..." : "Recuperar mais..."}
          </button>
        </div>
      )} */}
    </InfiniteScroll>
  );
};
export default CardsPorSlugCategoriaPage;
